import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, DollarSign, Loader2, Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function GetLoanAmount() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1); 
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [loanId, setLoanId] = useState<string | null>(null);
  const [loadingLoan, setLoadingLoan] = useState(true);
  const [sanctionLetterUrl, setSanctionLetterUrl] = useState<string>("");
  const [debugError, setDebugError] = useState<string | null>(null); // For debugging

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
          console.log("No application found or error:", appError);
          setLoanAmount(null);
          setLoadingLoan(false);
          return;
        }

        setLoanId(application.id);
        setLoanAmount(application.loan_amount);

        // 2. Check for Existing Disbursement
        const { data: disbursement, error: disbError } = await supabase
          .from('loan_disbursements')
          .select('id')
          .eq('loan_id', application.id)
          .maybeSingle();

        if (disbError) {
            console.error("Error checking disbursements:", disbError);
            setDebugError(`Table Check Error: ${disbError.message}`);
        }

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

  const handleUploadAndVerify = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please upload your sanction letter.", variant: "destructive" });
      return;
    }
    setUploading(true);
    setDebugError(null);

    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabase.storage.from('sanction-letters').upload(fileName, file);
      if (error) throw error;

      // Get URL
      const { data: publicUrlData } = supabase.storage.from('sanction-letters').getPublicUrl(fileName);
      setSanctionLetterUrl(publicUrlData.publicUrl);

      toast({ title: "Upload Successful", description: "Verifying..." });
      setTimeout(() => {
        setStep(2);
        setUploading(false);
        toast({ title: "Verified", description: "Sanction letter approved." });
      }, 2000);

    } catch (error: any) {
      setDebugError(`Upload Error: ${error.message}`);
      setUploading(false);
    }
  };

  const handleTransfer = async () => {
    if (!loanId || !loanAmount) return;
    setUploading(true);
    setDebugError(null);

    try {
       const user = (await supabase.auth.getUser()).data.user;
       if (!user) throw new Error("User not found");

       // ATTEMPT TO SAVE
       const { error } = await supabase.from('loan_disbursements').insert({
          user_id: user.id,
          loan_id: loanId,
          amount: loanAmount,
          sanction_letter_url: sanctionLetterUrl || "no_url_provided",
          status: 'transferred'
       });

       if (error) {
           throw error; // This will trigger the catch block below
       }

       // Success UI
       setTimeout(() => {
          setStep(3);
          setUploading(false);
          toast({ title: "Success!", description: "Funds transferred.", className: "bg-green-500 text-white" });
       }, 1000);

    } catch (error: any) {
       console.error("Transfer Error:", error);
       setDebugError(`Database Save Failed: ${error.message || error.details}`);
       setUploading(false);
       toast({ variant: "destructive", title: "Transfer Failed", description: "Could not save to database." });
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

      {/* ERROR BOX FOR DEBUGGING */}
      {debugError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Debug Error: </strong>
              <span className="block sm:inline">{debugError}</span>
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
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="letter">Sanction Letter (PDF/Image)</Label>
                    <Input id="letter" type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
                </div>
                <Button onClick={handleUploadAndVerify} disabled={uploading} className="w-full">
                    {uploading ? "Verifying..." : "Upload & Verify"}
                </Button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-6">
                <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-100 flex flex-col items-center justify-center gap-3">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                    <div><h3 className="font-bold text-lg">Verification Successful</h3></div>
                </div>
                <Button onClick={handleTransfer} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                    {uploading ? "Processing..." : "Transfer to Bank Account"}
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