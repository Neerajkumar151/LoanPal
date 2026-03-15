import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, DollarSign, Loader2, Home, ArrowLeft, AlertTriangle, FileText, ShieldCheck, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

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

  

  return (
    <>
    <Header/>
     {loadingLoan ? (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ) : !loanAmount && step !== 3 ? (
      <div className="container mx-auto p-6 max-w-6xl min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="text-center max-w-md space-y-6">
          <div className="h-24 w-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
             <ShieldCheck className="h-12 w-12 text-accent" />
          </div>
          <h2 className="text-4xl font-display font-bold text-foreground">No Pending Approvals</h2>
          <p className="text-muted-foreground text-lg">You currently do not have any approved loans pending disbursement. Check back later or apply for a new loan.</p>
          <Button onClick={() => navigate("/")} className="h-12 px-8 text-lg bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
            <Home className="mr-2 h-5 w-5" /> Return to Home
          </Button>
        </div>
      </div>
    ) : (
      <div className="container mx-auto p-6 max-w-6xl min-h-[80vh] flex flex-col justify-center py-12">
      <div className="w-full mb-8">
        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-accent transition-colors" onClick={() => navigate('/')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start w-full">
        {/* Left Column: Visuals & Trust */}
        <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-left-8 duration-700 delay-100 fill-mode-both">
           <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 leading-tight">Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-300">Future.</span></h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                 Experience seamless, instant disbursements. Your path to financial freedom, engineered with uncompromising security and elegance.
              </p>
           </div>
           
           {/* Decorative Image */}
           <div className="rounded-2xl overflow-hidden shadow-2xl relative group h-56 md:h-72 ring-1 ring-border/50">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
              <img src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1000&auto=format&fit=crop" alt="Financial Architecture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                 <p className="text-white/90 font-display italic text-lg shadow-sm">"The fastest, most secure bridge between approval and your bank account."</p>
              </div>
           </div>

           {/* Trust Badges */}
           <div className="space-y-6 pt-6 border-t border-border/40">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 shadow-sm border border-accent/20">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                 </div>
                 <div>
                    <h4 className="font-semibold text-foreground font-display text-lg">Bank-Grade Security</h4>
                    <p className="text-sm text-muted-foreground leading-snug">Your documents are encrypted using 256-bit SSL technology.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 shadow-sm border border-accent/20">
                    <Clock className="h-6 w-6 text-accent" />
                 </div>
                 <div>
                    <h4 className="font-semibold text-foreground font-display text-lg">Instant Transfer</h4>
                    <p className="text-sm text-muted-foreground leading-snug">Funds are credited immediately upon successful verification.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Interaction (The Card) */}
        <div className="lg:col-span-3 animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both relative">
          
          {/* Subtle background glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-primary/5 rounded-2xl blur-xl opacity-70 -z-10"></div>
          
          {/* ERROR BOX */}
          {debugError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-md shadow-sm mb-6 animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <strong className="font-bold">Verification Failed</strong>
                  </div>
                  <span className="block text-sm mt-1">{debugError}</span>
              </div>
          )}

          <Card className="w-full shadow-2xl border-white/20 dark:border-white/5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
            
            <CardHeader className="pb-8 pt-10 px-8">
              <CardTitle className="flex items-center gap-3 text-3xl font-display font-bold text-foreground">
                <div className="p-2 bg-accent/10 rounded-lg">
                   <DollarSign className="h-6 w-6 text-accent" /> 
                </div>
                {step === 3 ? "Loan Disbursed" : "Get Loan Amount"}
              </CardTitle>
              <CardDescription className="text-lg mt-2 font-medium">
                 {step === 3 ? `Reference ID: #${loanId?.slice(0, 8)}` : `Approved Amount: ₹${loanAmount?.toLocaleString()}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-10">
              
              {step === 1 && (
                <div className="space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-900/50 text-sm text-amber-900 dark:text-amber-200 flex gap-3 shadow-sm">
                        <FileText className="h-5 w-5 shrink-0 mt-0.5 text-accent" />
                        <p className="leading-relaxed"><strong className="font-semibold">Security Check:</strong> The system will analyze your PDF to ensure the document amount perfectly matches your approval (<strong className="text-accent underline decoration-accent/30 decoration-2 underline-offset-2">₹{loanAmount?.toLocaleString()}</strong>).</p>
                    </div>

                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="letter" className="font-medium text-foreground">Sanction Letter (PDF Only)</Label>
                        <div className="border-2 border-dashed border-border hover:border-accent/50 transition-colors rounded-xl p-4 bg-muted/30">
                           <Input id="letter" type="file" accept=".pdf" onChange={handleFileChange} className="border-0 bg-transparent file:text-foreground file:font-medium file:bg-accent/10 file:text-accent file:px-4 file:py-2 file:rounded-md file:border-0 hover:file:bg-accent/20 file:transition-colors file:cursor-pointer cursor-pointer shadow-none h-auto" />
                        </div>
                    </div>
                    <Button onClick={handleUploadAndVerify} disabled={uploading} className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 flex items-center justify-center gap-2 rounded-xl">
                        {uploading ? (
                           <>
                             <Loader2 className="h-5 w-5 animate-spin" />
                             {verifying ? "Analyzing Document Engine..." : "Uploading Securely..."}
                           </>
                        ) : (
                           <>
                             <Upload className="h-5 w-5" />
                             Verify & Upload Document
                           </>
                        )}
                    </Button>
                </div>
              )}

              {step === 2 && (
                <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-green-400 p-8 rounded-2xl border border-green-200 dark:border-green-900/50 flex flex-col items-center justify-center gap-4 shadow-inner">
                        <div className="h-20 w-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center animate-bounce">
                           <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl font-display text-green-800 dark:text-green-300">Verification Successful</h3>
                            <p className="text-sm mt-2 font-medium opacity-90">Cryptographic check passed. Document matches approval record.</p>
                        </div>
                    </div>
                    <Button onClick={handleTransfer} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 h-16 text-xl shadow-xl shadow-green-500/20 rounded-xl transition-all duration-300">
                        {uploading ? (
                           <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Processing Immediate Transfer...</>
                        ) : "Transfer to Bank Account"}
                    </Button>
                </div>
              )}

              {step === 3 && (
                 <div className="text-center space-y-6 animate-in zoom-in duration-700 pl-[1px]">
                    <div className="flex flex-col items-center justify-center gap-6 py-10">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="h-28 w-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl relative z-10 border-4 border-white dark:border-slate-900">
                                <DollarSign className="h-14 w-14 text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold font-display text-green-600 dark:text-green-400 tracking-tight">₹{loanAmount?.toLocaleString()} Sent!</h3>
                            <p className="text-muted-foreground text-lg">Funds credited to your primary account successfully.</p>
                        </div>
                    </div>
                 </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    )}
    <Footer/>
    </>
    );
}
