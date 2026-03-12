import { useState, useEffect } from "react";
import { useRazorpay } from "react-razorpay";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Download, Loader2, CheckCircle, History, Wallet, AlertCircle, ChevronDown, ArrowLeft, TrendingUp, Quote, ShieldCheck, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

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

    const handlePayment = async () => {
  if (!loanDetails || paying) return;
    setPaying(true);
    
    const newRemainingBalance = Math.max(stats.remaining - loanDetails.finalPayable, 0);
    
    // 1️⃣ Create order from Supabase backend
const { data: { session } } = await supabase.auth.getSession();

const orderRes = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`, // 🔥 THIS FIXES 401
    },
    body: JSON.stringify({
      amount: loanDetails.finalPayable
    }),
  }
);

if (!orderRes.ok) {
  setPaying(false);
  toast({
    variant: "destructive",
    title: "Order Creation Failed",
    description: "Could not initiate payment."
  });
  return;
}

const { orderId } = await orderRes.json();

// 2️⃣ Open Razorpay with order_id
const options: any = {
  key: import.meta.env.VITE_RAZORPAY_KEY,
  amount: loanDetails.finalPayable * 100,
  currency: "INR",
  order_id: orderId, // 🔥 THIS FIXES YOUR 401 ERROR
  name: "LoanPal Repayment",
  description: `EMI for Loan #${loanDetails.id.slice(0,6)}`,
  handler: async (response: any) => {
    // 👇 KEEP YOUR EXISTING SUCCESS CODE HERE
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
      setPaying(false);

    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Payment failed to save." });
    }
  }
};

options.modal = {
  ondismiss: () => {
    setPaying(false);
  }
};

const rzp = new Razorpay(options);
rzp.open();
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (allLoans.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-6xl min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="text-center max-w-md space-y-6">
          <div className="h-24 w-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
             <ShieldCheck className="h-12 w-12 text-accent" />
          </div>
          <h2 className="text-4xl font-display font-bold text-foreground">No Active Loans</h2>
          <p className="text-muted-foreground text-lg">You currently do not have any active loans that require repayment. Great job maintaining your financial freedom!</p>
          <Button onClick={() => navigate("/")} className="h-12 px-8 text-lg bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
            <Home className="mr-2 h-5 w-5" /> Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="container mx-auto p-6 max-w-6xl min-h-[80vh] flex flex-col justify-center py-12">
      <div className="w-full mb-8">
        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-accent transition-colors" onClick={() => navigate('/')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
      </div>

      {allLoans.length > 1 && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 relative z-20 w-full max-w-sm">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Select Account</label>
              <div className="relative">
                  <select 
                      className="appearance-none w-full bg-white dark:bg-slate-900 border border-border text-foreground py-3 pl-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base font-medium shadow-sm cursor-pointer"
                      value={selectedLoanId || ""}
                      onChange={(e) => setSelectedLoanId(e.target.value)}
                  >
                      {allLoans.map((loan) => (
                          <option key={loan.loan_id} value={loan.loan_id}>
                              Loan Account (₹{loan.amount.toLocaleString()})
                          </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                      <ChevronDown className="h-5 w-5" />
                  </div>
              </div>
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start w-full">
        {/* Left Column: The Dashboard / Action Area */}
        <div className="lg:col-span-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both relative order-2 lg:order-1">
          {/* Subtle background glow */}
          <div className="absolute -inset-1 bg-gradient-to-bl from-accent/10 to-transparent rounded-3xl blur-2xl opacity-50 -z-10"></div>
          
          <Card className="w-full shadow-2xl border-white/20 dark:border-white/5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md overflow-hidden relative border-t-4 border-t-accent">
            
            <CardHeader className="pb-4 pt-8 px-8 border-b border-border/50 bg-muted/10">
                <div className="flex items-center justify-between mb-2">
                    <CardTitle className="flex items-center gap-3 text-2xl font-display font-bold text-foreground">
                        <CreditCard className="h-7 w-7 text-accent" />
                        Repayment Portal
                    </CardTitle>
                </div>
                {loanDetails && <p className="text-sm text-muted-foreground font-medium">Viewing Account <span className="text-foreground">#{loanDetails.id.slice(0, 8).toUpperCase()}</span></p>}
            </CardHeader>
            
            {loanDetails ? (
                <CardContent className="space-y-8 p-8">
                    
                    {/* Premium Balance Card */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
                        {/* Decorative background circle */}
                        <div className="absolute -right-10 -top-10 h-40 w-40 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-all duration-700"></div>
                        
                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <div>
                                <p className="text-slate-300 text-sm mb-2 font-medium tracking-wide uppercase">Outstanding Balance</p>
                                <h2 className="text-5xl font-display font-bold tracking-tight text-white mb-1"><span className="text-accent">₹</span>{Math.round(stats.remaining).toLocaleString()}</h2>
                            </div>
                            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md shadow-inner border border-white/5">
                                <Wallet className="h-8 w-8 text-accent" />
                            </div>
                        </div>
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between text-sm font-medium text-slate-300">
                                <span>Paid: ₹{stats.totalPaid.toLocaleString()}</span>
                                <span className="text-accent">{Math.round(stats.progress)}%</span>
                            </div>
                            <div className="h-2.5 bg-slate-950/50 rounded-full w-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/5">
                                <div className="h-full bg-gradient-to-r from-accent/80 to-accent transition-all duration-1000 ease-out relative" style={{ width: `${stats.progress}%` }}>
                                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30 blur-[2px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EMI Box */}
                    <div className={`flex flex-col gap-4 border p-6 rounded-2xl transition-colors duration-300 ${loanDetails.isLate ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' : 'bg-muted/30 border-border hover:border-accent/40'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium mb-1">Standard EMI</p>
                                <p className="font-bold text-2xl text-foreground font-display tracking-tight">₹{loanDetails.emi.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground font-medium mb-1">Due Date</p>
                                <p className={`font-semibold text-lg ${loanDetails.isLate ? 'text-red-600 dark:text-red-400 font-bold' : 'text-foreground'}`}>
                                    {loanDetails.nextDueDate}
                                </p>
                            </div>
                        </div>
                        {loanDetails.isLate && (
                            <div className="flex items-start gap-3 text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 p-4 rounded-xl text-sm mt-2 border border-red-200 dark:border-red-800">
                                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                <div><span className="font-bold">Payment Overdue</span><br/>A late fee of ₹{loanDetails.penalty} has been applied to this cycle.</div>
                            </div>
                        )}
                    </div>

                    <Button onClick={handlePayment} disabled={paying || stats.remaining <= 0} className={`w-full h-16 text-xl shadow-xl transition-all duration-300 rounded-xl font-medium ${loanDetails.isLate ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 hover:shadow-red-600/30' : 'bg-primary hover:bg-primary/90 text-primary-foreground'} ${stats.remaining <= 0 ? 'bg-green-600 hover:bg-green-700 opacity-100' : ''}`}>
                        {stats.remaining <= 0 ? "Loan Fully Paid! 🎉" : paying ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Secure Payment...</> : `Pay ₹${loanDetails.finalPayable.toLocaleString()} Now`}
                    </Button>

                    {/* History - WITH DOWNLOAD BUTTON */}
                    <div className="pt-6 border-t border-border/50">
                        <div className="flex items-center justify-between mb-5">
                            <h4 className="text-base font-bold flex items-center gap-2 text-foreground font-display">
                                <History className="h-5 w-5 text-accent" /> Payment History
                            </h4>
                            <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded-md">{history.length} Transactions</span>
                        </div>
                        
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {history.map((payment, i) => (
                                <div key={i} className="bg-background border border-border/60 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 group">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full group-hover:scale-110 transition-transform"><CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /></div>
                                        <div>
                                            <p className="font-bold text-base text-foreground">₹{Number(payment.amount_paid).toLocaleString()}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{new Date(payment.payment_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => generateSlip(payment.razorpay_payment_id || "TXN", payment.amount_paid, payment.payment_date, stats.remaining)} className="opacity-70 hover:opacity-100 hover:bg-accent/10 hover:text-accent rounded-full">
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="text-center py-8 bg-muted/30 rounded-xl border border-dashed border-border">
                                    <p className="text-sm font-medium text-muted-foreground">No payments made on this account yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </CardContent>
            ) : (
                <div className="p-16 text-center text-muted-foreground flex flex-col items-center justify-center gap-4">
                   <Loader2 className="h-8 w-8 animate-spin text-accent" />
                   <p className="font-medium animate-pulse">Loading secure financial data...</p>
                </div>
            )}
          </Card>
        </div>
        
        {/* Right Column: Visuals & Financial Insights */}
        <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both order-1 lg:order-2">
            
            <div className="rounded-3xl p-8 bg-primary text-primary-foreground shadow-2xl relative overflow-hidden group">
                {/* Abstract background graphics */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp className="w-48 h-48 -rotate-12 transform translate-x-12 -translate-y-12" />
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 space-y-6">
                    <Quote className="h-10 w-10 text-accent opacity-50 mb-2" />
                    <h3 className="text-2xl font-display font-bold leading-snug">Consistent repayments build a golden credit profile.</h3>
                    <p className="text-primary-foreground/70 font-medium">
                        Each EMI you pay on time not only reduces your principal but also unlocks better interest rates for the future.
                    </p>
                    
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">Financial Health</p>
                            <p className="font-bold text-accent">Excellent Status</p>
                        </div>
                        <div className="h-12 w-12 rounded-full border-2 border-accent flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-accent" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl relative group h-64 ring-1 ring-border/50 bg-muted">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop" alt="Financial Tracking" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-20">
                 <p className="text-white/90 font-display font-medium text-lg leading-snug">Empowering your financial journey, one transparent transaction at a time.</p>
              </div>
            </div>
            
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
