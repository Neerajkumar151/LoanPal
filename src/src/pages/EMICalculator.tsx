import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { UserMenu } from '@/components/UserMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calculator, IndianRupee, Percent, Calendar, TrendingUp, PiggyBank } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import Footer from '@/components/landing/Footer';
import { Bot } from 'lucide-react';
import FloatingChatbot from '@/components/FloatingChatbot';

export default function EMICalculator() {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(24);

  const calculations = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const n = tenure;

    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
      : principal / n;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    const principalPercentage = (principal / totalPayment) * 100;
    const interestPercentage = (totalInterest / totalPayment) * 100;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principalPercentage: principalPercentage.toFixed(1),
      interestPercentage: interestPercentage.toFixed(1),
    };
  }, [loanAmount, interestRate, tenure]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator - AI Loan Assistant</title>
        <meta name="description" content="Calculate your loan EMI instantly. Plan your finances with our easy-to-use EMI calculator." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-md shadow-accent/20">
            <Bot className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="text-2xl font-bold gradient-text">
            LoanPal
          </span>
        </div>

            <div className="flex items-center gap-2">
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">EMI Calculator</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Plan your loan repayment with our smart EMI calculator. Get instant estimates for your monthly payments.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Adjust the values to calculate your EMI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Loan Amount */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        Loan Amount
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
  type="number"
  value={loanAmount === 0 ? '' : loanAmount}
  onChange={(e) => setLoanAmount(e.target.value === '' ? 0 : Number(e.target.value))}
  className="w-40 pl-7 pr-8 text-left"
/>
                      </div>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={([value]) => setLoanAmount(value)}
                      min={50000}
                      max={5000000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹50K</span>
                      <span>₹50L</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-primary" />
                        Interest Rate (p.a.)
                      </Label>
                      <div className="relative">
                        <Input
  type="number"
  value={interestRate === 0 ? '' : interestRate}
  onChange={(e) => setInterestRate(e.target.value === '' ? 0 : Number(e.target.value))}
  className="w-24 text-right pr-8"
  step="0.1"
/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={([value]) => setInterestRate(value)}
                      min={5}
                      max={25}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>25%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="space-y-4">
  <div className="flex items-center justify-between">
    <Label className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-primary" />
      Loan Tenure
    </Label>
    <div className="relative">
      <Input
  type="number"
  value={tenure === 0 ? '' : tenure}
  onChange={(e) => setTenure(e.target.value === '' ? 0 : Number(e.target.value))}
  className="w-32 text-right pr-14"
/>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
        months
      </span>
    </div>
  </div>
  <Slider
    value={[tenure]}
    onValueChange={([value]) => setTenure(value)}
    min={6}
    max={84}
    step={1}
    className="w-full"
  />
  <div className="flex justify-between text-xs text-muted-foreground">
    <span>6 months</span>
    <span>84 months</span>
  </div>
</div>

                </CardContent>
              </Card>

              {/* Results Card */}
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                {/* EMI Display */}
                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-accent/20 text-white shadow-2xl relative overflow-hidden group">
                  {/* Decorative background circle */}
                  <div className="absolute -right-10 -top-10 h-40 w-40 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-all duration-700"></div>
                  
                  <CardContent className="pt-8 pb-8 relative z-10">
                    <div className="text-center">
                      <p className="text-slate-300 font-medium tracking-wide uppercase text-sm mb-3">Your Monthly EMI</p>
                      <p className="text-6xl font-display font-bold text-white tracking-tight"><span className="text-accent pr-1">₹</span>{calculations.emi.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Breakdown */}
                <Card className="shadow-lg border-t-4 border-t-accent bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                  <CardHeader className="pb-2 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-xl font-display">Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><div className="w-3 h-3 rounded-full bg-accent shadow-glow" /> Principal Amount</span>
                        <span className="font-bold text-lg mt-1 text-foreground pl-5">{formatAmount(loanAmount)}</span>
                      </div>
                      
                      <div className="flex flex-col text-right">
                        <span className="flex items-center justify-end gap-2 text-sm font-medium text-muted-foreground">Total Interest <div className="w-3 h-3 rounded-full bg-destructive shadow-sm" /></span>
                        <span className="font-bold text-lg mt-1 text-foreground pr-5">{formatAmount(calculations.totalInterest)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-border/50">
                      <span className="font-semibold text-muted-foreground uppercase tracking-wider text-sm">Total Payment</span>
                      <span className="font-bold font-display text-2xl text-foreground">{formatAmount(calculations.totalPayment)}</span>
                    </div>

                    {/* Interactive Pie Chart Breakdown instead of static bar */}
                    <div className="h-[220px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Principal', value: Number(calculations.principalPercentage), color: '#eab308' },
                                        { name: 'Interest', value: Number(calculations.interestPercentage), color: '#ef4444' }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    { [
                                        { name: 'Principal', value: Number(calculations.principalPercentage), color: '#eab308' },
                                        { name: 'Interest', value: Number(calculations.interestPercentage), color: '#ef4444' }
                                    ].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Share']}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <PiggyBank className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-sm">Money Saving Tip</p>
                        <p className="text-sm text-muted-foreground">
                          {tenure > 36 
                            ? "Consider a shorter tenure to save on interest. You could save up to " + formatAmount(Math.round(calculations.totalInterest * 0.3)) + " with a 24-month tenure."
                            : "Great choice! A shorter tenure means less interest paid overall."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full" size="lg" onClick={() => navigate('/apply')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Apply for Loan Now
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
      <FloatingChatbot/>
    </>
  );
}
