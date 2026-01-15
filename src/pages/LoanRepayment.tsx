import { useState, useEffect } from "react";
import { useRazorpay } from "react-razorpay";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Download, Loader2, CheckCircle, History, Wallet, AlertCircle, ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoanRepayment() {
  const { Razorpay } = useRazorpay();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [userName, setUserName] = useState<string>("Valued Customer"); // Default fallback
  
  // Multi-Loan State
  const [allLoans, setAllLoans] = useState<any[]>([]);
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);

  // Current View Data
  const [loanDetails, setLoanDetails] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalPaid: 0, remaining: 0, progress: 0 });

  const INTEREST_RATE = 10.5;
  const LATE_FEE_FLAT = 500;
  const LATE_FEE_PERCENT = 0.02;

  // 1. Fetch ALL Active Loans & User Name
  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // --- FETCH USER NAME ---
        // Try to get name from metadata, or fallback to email
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (fullName) {
            setUserName(fullName);
        } else if (user.email) {
            // If no name, use the part before @ in email (e.g. "neeraj" from neeraj@gmail.com)
            const emailName = user.email.split('@')[0];
            setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
        }
        // -----------------------

        const { data: disbursements } = await supabase
          .from('loan_disbursements')
          .select('loan_id, amount, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!disbursements || disbursements.length === 0) {
            setLoading(false);
            return;
        }

        setAllLoans(disbursements);
        setSelectedLoanId(disbursements[0].loan_id);

      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLoans();
  }, []);

  // 2. Calculate Details for Selected Loan
  useEffect(() => {
    if (!selectedLoanId || allLoans.length === 0) return;

    const calculateSelectedLoan = async () => {
        setPaying(true);
        try {
            const disbursement = allLoans.find(l => l.loan_id === selectedLoanId);
            if (!disbursement) return;

            // Get Tenure
            const { data: application } = await supabase
                .from('loan_applications')
                .select('loan_tenure')
                .eq('id', selectedLoanId)
                .maybeSingle();

            const tenureMonths = application?.loan_tenure || 12;

            // EMI Math
            const principal = disbursement.amount;
            const monthlyRate = INTEREST_RATE / 12 / 100;
            const emiExact = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            const emiAmount = isFinite(emiExact) ? Math.round(emiExact) : Math.round(principal / tenureMonths);

            // Get History
            const { data: repayments } = await supabase
                .from('loan_repayments')
                .select('*')
                .eq('loan_id', selectedLoanId)
                .order('payment_date', { ascending: false });

            const pastPayments = repayments || [];
            setHistory(pastPayments);

            // Stats
            const totalPayableAmount = emiAmount * tenureMonths;
            const totalPaidSoFar = pastPayments.reduce((sum, item) => sum + Number(item.amount_paid), 0);
            const remainingBalance = totalPayableAmount - totalPaidSoFar;
            const progressPercentage = Math.min((totalPaidSoFar / totalPayableAmount) * 100, 100);

            // Due Date Logic
            let nextDate = new Date(disbursement.created_at);
            nextDate.setMonth(nextDate.getMonth() + pastPayments.length + 1);
            
            const isLate = new Date() > nextDate;
            let finalPayable = emiAmount;
            let penalty = 0;

            if (isLate && remainingBalance > 0) {
                penalty = Math.round(LATE_FEE_FLAT + (emiAmount * LATE_FEE_PERCENT));
                finalPayable = emiAmount + penalty;
            }

            setStats({ totalPaid: totalPaidSoFar, remaining: Math.max(remainingBalance, 0), progress: progressPercentage });
            setLoanDetails({
                id: selectedLoanId,
                totalAmount: totalPayableAmount,
                emi: emiAmount,
                finalPayable: finalPayable,
                penalty: penalty,
                isLate: isLate,
                nextDueDate: nextDate.toLocaleDateString(),
            });

        } catch (err) {
            console.error(err);
        } finally {
            setPaying(false);
        }
    };

    calculateSelectedLoan();
  }, [selectedLoanId, allLoans]);

  // 3. Generate Receipt PDF
  const generateSlip = (paymentId: string, amountPaid: number, date: string, currentBalance: number) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // --- Header ---
    doc.setFontSize(10);
    doc.text(`Ref No: TXN/${paymentId.slice(-8).toUpperCase()}`, 15, 20);
    doc.text(`Date: ${new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 60, 20);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT RECEIPT", pageWidth / 2, 35, { align: "center" });
    
    // --- Address Section ---
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("To,", 15, 50);
    
    // 🔥 HERE IS THE CHANGE: Uses real user name 🔥
    doc.text(userName, 15, 56); 
    
    doc.setFont("helvetica", "bold");
    doc.text("Subject: Acknowledgement of Loan Repayment", 15, 70);
    
    doc.setFont("helvetica", "normal");
    const bodyText = `Dear ${userName},\n\nWe acknowledge the receipt of your payment towards your personal loan account. The payment has been successfully processed and credited to your loan account. Please find the transaction details below:`;
    doc.text(bodyText, 15, 80, { maxWidth: 180 });

    // --- Table ---
    let y = 110;
    const rowHeight = 10;
    const col1X = 15;
    const col2X = 100;
    
    const drawRow = (label: string, value: string, isBold: boolean = false) => {
        doc.rect(col1X, y, 85, rowHeight); 
        doc.rect(col2X, y, 95, rowHeight); 
        
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.text(label, col1X + 5, y + 7);
        doc.text(value, col2X + 5, y + 7);
        y += rowHeight;
    };

    doc.setFillColor(240, 240, 240);
    doc.rect(col1X, y, 180, rowHeight, "F");
    drawRow("Description", "Details", true);

    drawRow("Transaction ID", paymentId);
    drawRow("Loan Account No", `#${loanDetails?.id.slice(0, 8)}`);
    drawRow("Payment Date", new Date(date).toLocaleDateString());
    drawRow("Payment Mode", "Razorpay / Online");
    drawRow("Amount Paid (EMI)", `Rs. ${amountPaid.toLocaleString('en-IN')}`, true);
    drawRow("Remaining Balance", `Rs. ${currentBalance.toLocaleString('en-IN')}`, true);

    // --- Footer ---
    y += 20;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("This is a computer-generated receipt and does not require a signature.", 15, y);
    doc.text("LoanPal Financial Services Pvt. Ltd.", 15, y + 6);
    
    doc.save(`Receipt_${paymentId}.pdf`);
  };

  const handlePayment = () => {
    if (!loanDetails) return;
    setPaying(true);
    
    const newRemainingBalance = Math.max(stats.remaining - loanDetails.finalPayable, 0);
    
    const options: any = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // ⚠️ REPLACE WITH YOUR KEY
      amount: loanDetails.finalPayable * 100, // Or 10000 for testing
      currency: "INR",
      name: "LoanPal Repayment",
      description: `EMI for Loan #${loanDetails.id.slice(0,6)}`,
      handler: async (response: any) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase.from('loan_repayments').insert({
                user_id: user.id,
                loan_id: loanDetails.id,
                amount_paid: loanDetails.finalPayable,
                razorpay_payment_id: response.razorpay_payment_id,
                status: 'success'
            });

            if (error) throw error;
            toast({ title: "Payment Successful!", description: "History updated." });
            
            const paid = loanDetails.finalPayable;
            
            setStats(prev => ({
                totalPaid: prev.totalPaid + paid,
                remaining: prev.remaining - paid,
                progress: ((prev.totalPaid + paid) / loanDetails.totalAmount) * 100
            }));
            
            setHistory(prev => [{ payment_date: new Date().toISOString(), amount_paid: paid, razorpay_payment_id: response.razorpay_payment_id }, ...prev]);
            
            setLoanDetails((prev: any) => ({ ...prev, isLate: false, penalty: 0, finalPayable: prev.emi, nextDueDate: "Next Month" }));
            
            generateSlip(response.razorpay_payment_id, paid, new Date().toISOString(), newRemainingBalance);

        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Payment failed to save." });
        } finally {
            setPaying(false);
        }
      },
      prefill: { email: "user@example.com", contact: "9999999999" },
      theme: { color: "#22c55e" },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (allLoans.length === 0) {
    return (
        <div className="container mx-auto p-6 max-w-xl text-center">
            <Card><CardContent className="pt-10"><p>No active loans found.</p><Button onClick={() => navigate("/")}>Home</Button></CardContent></Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <Button variant="ghost" className="mb-4 pl-0" onClick={() => navigate('/')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
      <Card className="shadow-lg border-t-4 border-t-green-500">
        <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    Loan Repayment
                </CardTitle>
                
                {allLoans.length > 1 && (
                    <div className="relative">
                        <select 
                            className="appearance-none bg-slate-100 border border-slate-300 text-slate-700 py-1 pl-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm font-medium"
                            value={selectedLoanId || ""}
                            onChange={(e) => setSelectedLoanId(e.target.value)}
                        >
                            {allLoans.map((loan) => (
                                <option key={loan.loan_id} value={loan.loan_id}>
                                    Loan (₹{loan.amount.toLocaleString()})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                )}
            </div>
            {loanDetails && <p className="text-sm text-gray-500">Viewing details for Loan #{loanDetails.id.slice(0, 8)}</p>}
        </CardHeader>
        
        {loanDetails ? (
            <CardContent className="space-y-6">
                
                {/* Balance Card */}
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">Outstanding Balance</p>
                            <h2 className="text-3xl font-bold">₹{Math.round(stats.remaining).toLocaleString()}</h2>
                        </div>
                        <div className="bg-slate-800 p-2 rounded-full">
                            <Wallet className="h-6 w-6 text-green-400" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                            <span>Paid: ₹{stats.totalPaid.toLocaleString()}</span>
                            <span>{Math.round(stats.progress)}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${stats.progress}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* EMI Box */}
                <div className={`flex flex-col gap-3 border p-4 rounded-lg ${loanDetails.isLate ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Standard EMI</p>
                            <p className="font-semibold text-lg text-slate-900">₹{loanDetails.emi.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Due Date</p>
                            <p className={`font-medium ${loanDetails.isLate ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                                {loanDetails.nextDueDate}
                            </p>
                        </div>
                    </div>
                    {loanDetails.isLate && (
                        <div className="flex items-start gap-2 text-red-600 bg-red-100 p-3 rounded-md text-sm mt-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <div><span className="font-bold">Overdue!</span> Late Fee of ₹{loanDetails.penalty} added.</div>
                        </div>
                    )}
                </div>

                <Button onClick={handlePayment} disabled={paying || stats.remaining <= 0} className={`w-full h-12 text-lg ${loanDetails.isLate ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                    {stats.remaining <= 0 ? "Loan Fully Paid! 🎉" : paying ? "Processing..." : `Pay ₹${loanDetails.finalPayable.toLocaleString()} Now`}
                </Button>

                {/* History - WITH DOWNLOAD BUTTON */}
                <div className="pt-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">
                        <History className="h-4 w-4" /> Payment History
                    </h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                        {history.map((payment, i) => (
                            <div key={i} className="bg-white border rounded-md p-3 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="h-4 w-4 text-green-600" /></div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900">₹{Number(payment.amount_paid).toLocaleString()}</p>
                                        <p className="text-xs text-slate-500">{new Date(payment.payment_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => generateSlip(payment.razorpay_payment_id || "TXN", payment.amount_paid, payment.payment_date, stats.remaining)}>
                                    <Download className="h-4 w-4 text-gray-400 hover:text-green-600" />
                                </Button>
                            </div>
                        ))}
                        {history.length === 0 && <p className="text-sm text-gray-400 text-center py-2">No payments made yet.</p>}
                    </div>
                </div>
                
            </CardContent>
        ) : (
            <div className="p-10 text-center text-gray-500">Loading loan details...</div>
        )}
      </Card>
    </div>
  );
}