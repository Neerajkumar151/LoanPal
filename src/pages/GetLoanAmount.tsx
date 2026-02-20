import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, DollarSign, Loader2, Home, ArrowLeft, AlertTriangle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as pdfjsLib from "pdfjs-dist";

// ⬇️ NEW: Import worker locally as a URL. This fixes the CDN error.
// We use .mjs because you are on a newer version (5.x)
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function GetLoanAmount() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false); // New state for parsing
  const [step, setStep] = useState(1); 
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [loanId, setLoanId] = useState<string | null>(null);
  const [loadingLoan, setLoadingLoan] = useState(true);
  const [sanctionLetterUrl, setSanctionLetterUrl] = useState<string>("");
  const [debugError, setDebugError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Get Application
        const { data: application, error: appError } = await supabase
          .from('loan_applications')
          .select('id, loan_amount')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (appError || !application) {
          setLoanAmount(null);
          setLoadingLoan(false);
          return;
        }

        setLoanId(application.id);
        setLoanAmount(application.loan_amount);

        // 2. Check for Existing Disbursement
        const { data: disbursement } = await supabase
          .from('loan_disbursements')
          .select('id')
          .eq('loan_id', application.id)
          .maybeSingle();

        if (disbursement) {
          setStep(3); // Already paid
        } else {
          setStep(1); // Not paid yet
        }

      } catch (err: any) {
        setDebugError(err.message);
      } finally {
        setLoadingLoan(false);
      }
    };

    fetchLoanDetails();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // 🔍 SMART PARSER FUNCTION
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = "";

    // Read first page only (Sanction details are usually on Pg 1)
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const strings = textContent.items.map((item: any) => item.str);
    fullText = strings.join(" ");
    
    return fullText;
  };

  const handleUploadAndVerify = async () => {
    if (!file || !loanAmount) {
      toast({ title: "Error", description: "Select a file first.", variant: "destructive" });
      return;
    }
    
    setUploading(true);
    setVerifying(true);
    setDebugError(null);

    try {
      // 🕵️ PHASE 1: SECURITY CHECK (Parse PDF)
      console.log("Starting Document Analysis...");
      const pdfText = await extractTextFromPDF(file);
      console.log("Extracted Text Preview:", pdfText.slice(0, 100));

      // 1. Check if it's actually a Sanction Letter
      if (!pdfText.toLowerCase().includes("sanction letter") && !pdfText.toLowerCase().includes("loan details")) {
        throw new Error("Invalid Document: This does not look like a Loan Sanction Letter.");
      }

      // 2. Clean the text to find numbers
      // Removes currency symbols, commas, and extra spaces
      const cleanText = pdfText.replace(/₹/g, '').replace(/,/g, '').replace(/\s+/g, ' ');

      // 3. Find the Loan Amount in text
      // We look for patterns like "Loan Amount 50000" or "Amount: 50000"
      // This regex looks for "Loan Amount" followed by digits
      const amountMatch = cleanText.match(/Loan Amount.*?(\d+)/i);
      
      if (!amountMatch) {
         throw new Error("Verification Failed: Could not read 'Loan Amount' from the document.");
      }

      const extractedAmount = parseInt(amountMatch[1]);
      console.log(`Verifying: Doc Amount (${extractedAmount}) vs Database (${loanAmount})`);

      // 4. STRICT MATCHING Logic (Allowing small parsing tolerance)
      if (extractedAmount !== loanAmount) {
         throw new Error(`Data Mismatch! Document says ₹${extractedAmount.toLocaleString()}, but your approved loan is ₹${loanAmount.toLocaleString()}. Upload the correct letter.`);
      }

      // ✅ PHASE 2: UPLOAD (Only if Phase 1 passes)
      toast({ title: "Verification Successful", description: "Document matches approved loan details." });

      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabase.storage.from('sanction-letters').upload(fileName, file);
      if (error) throw error;

      // Get URL
      const { data: publicUrlData } = supabase.storage.from('sanction-letters').getPublicUrl(fileName);
      setSanctionLetterUrl(publicUrlData.publicUrl);

      setTimeout(() => {
        setStep(2);
        setUploading(false);
        setVerifying(false);
        toast({ title: "Approved", description: "Ready for disbursement." });
      }, 1000);

    } catch (error: any) {
      console.error("Verification Error:", error);
      setDebugError(error.message);
      setUploading(false);
      setVerifying(false);
      toast({ variant: "destructive", title: "Verification Failed", description: "Document rejected." });
    }
  };

  const handleTransfer = async () => {
    if (!loanId || !loanAmount) return;
    setUploading(true);
    setDebugError(null);

    try {
       const user = (await supabase.auth.getUser()).data.user;
       if (!user) throw new Error("User not found");

       const { error } = await supabase.from('loan_disbursements').insert({
          user_id: user.id,
          loan_id: loanId,
          amount: loanAmount,
          sanction_letter_url: sanctionLetterUrl || "verified_doc_url",
          status: 'transferred'
       });

       if (error) throw error;

       setTimeout(() => {
          setStep(3);
          setUploading(false);
          toast({ title: "Success!", description: "Funds transferred.", className: "bg-green-500 text-white" });
       }, 1000);

    } catch (error: any) {
       setDebugError(`Database Error: ${error.message}`);
       setUploading(false);
    }
  };

  if (loadingLoan) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (!loanAmount && step !== 3) {
     return (
        <div className="container mx-auto p-6 max-w-xl text-center">
            <Card>
                <CardContent className="pt-10 space-y-4">
                    <h2 className="text-xl font-semibold">No Pending Approvals</h2>
                    <Button onClick={() => navigate("/")} variant="outline"><Home className="mr-2 h-4 w-4" /> Back to Home</Button>
                </CardContent>
            </Card>
        </div>
     )
  }

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <Button variant="ghost" className="mb-4 pl-0" onClick={() => navigate('/')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>

      {/* ERROR BOX */}
      {debugError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <strong className="font-bold">Verification Failed</strong>
              </div>
              <span className="block text-sm mt-1">{debugError}</span>
          </div>
      )}

      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="h-7 w-7 text-primary" /> 
            {step === 3 ? "Loan Disbursed" : "Get Loan Amount"}
          </CardTitle>
          <CardDescription>
             {step === 3 ? `Reference ID: #${loanId?.slice(0, 8)}` : `Approved Amount: ₹${loanAmount?.toLocaleString()}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-blue-700 flex gap-2">
                    <FileText className="h-5 w-5 shrink-0" />
                    <p>Security Check: The system will analyze your PDF to ensure the amount matches your approval (₹{loanAmount?.toLocaleString()}).</p>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="letter">Sanction Letter (PDF Only)</Label>
                    <Input id="letter" type="file" accept=".pdf" onChange={handleFileChange} />
                </div>
                <Button onClick={handleUploadAndVerify} disabled={uploading} className="w-full">
                    {uploading ? (verifying ? "Analyzing Document..." : "Uploading...") : "Verify & Upload"}
                </Button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-6 animate-in fade-in">
                <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-100 flex flex-col items-center justify-center gap-3">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                    <div>
                        <h3 className="font-bold text-lg">Verification Successful</h3>
                        <p className="text-sm opacity-90">Document matches approval record.</p>
                    </div>
                </div>
                <Button onClick={handleTransfer} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                    {uploading ? "Processing Transfer..." : "Transfer to Bank Account"}
                </Button>
            </div>
          )}

          {step === 3 && (
             <div className="text-center space-y-6 animate-in zoom-in duration-500">
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                        <DollarSign className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-green-700">₹{loanAmount?.toLocaleString()} Sent!</h3>
                        <p className="text-gray-500 mt-2">Funds credited successfully.</p>
                    </div>
                </div>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}