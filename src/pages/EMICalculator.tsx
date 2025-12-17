import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from '@/components/UserMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calculator, IndianRupee, Percent, Calendar, TrendingUp, PiggyBank } from 'lucide-react';

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
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-foreground">LoanAI</span>
            </button>

            <div className="flex items-center gap-2">
              <ThemeToggle />
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
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-32 pl-7 text-right"
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
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
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
                          value={tenure}
                          onChange={(e) => setTenure(Number(e.target.value))}
                          className="w-24 text-right pr-14"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">months</span>
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
              <div className="space-y-6">
                {/* EMI Display */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-primary-foreground/80 text-sm mb-2">Monthly EMI</p>
                      <p className="text-4xl font-bold">{formatAmount(calculations.emi)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">Principal Amount</span>
                      </div>
                      <span className="font-semibold">{formatAmount(loanAmount)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <span className="text-muted-foreground">Total Interest</span>
                      </div>
                      <span className="font-semibold">{formatAmount(calculations.totalInterest)}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between py-2">
                      <span className="font-semibold">Total Payment</span>
                      <span className="font-bold text-lg">{formatAmount(calculations.totalPayment)}</span>
                    </div>

                    {/* Visual Breakdown Bar */}
                    <div className="h-4 rounded-full overflow-hidden bg-muted flex">
                      <div 
                        className="bg-primary transition-all duration-300" 
                        style={{ width: `${calculations.principalPercentage}%` }}
                      />
                      <div 
                        className="bg-destructive transition-all duration-300" 
                        style={{ width: `${calculations.interestPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Principal ({calculations.principalPercentage}%)</span>
                      <span>Interest ({calculations.interestPercentage}%)</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-accent/50">
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
    </>
  );
}
