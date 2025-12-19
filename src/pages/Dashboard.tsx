import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { generateSanctionLetterPDF } from '@/lib/generateSanctionLetterPDF';
import { 
  Loader2, 
  ArrowLeft, 
  FileText, 
  Calendar, 
  IndianRupee,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Eye,
  AlertCircle,
  PartyPopper,
  User,
  Settings,
  BarChart3,
  Calculator,
  LogOut,
  TrendingUp,
  TrendingDown,
  Brain,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import FloatingChatbot from '@/components/FloatingChatbot';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
}

interface LoanApplication {
  id: string;
  loan_amount: number;
  loan_tenure: number;
  monthly_income: number;
  credit_score: number | null;
  emi_amount: number | null;
  status: string | null;
  ai_decision: string | null;
  ai_reason: string | null;
  extracted_name: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [downloadingLetter, setDownloadingLetter] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [formData, setFormData] = useState({
    full_name: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfileAndApplications();
    }
  }, [user]);

  const fetchProfileAndApplications = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      if (profileData) {
        setProfile(profileData);
        setFormData({ full_name: profileData.full_name || '' });
      }

      const { data: appsData, error: appsError } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      setApplications(appsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: 'Error', description: 'Failed to load data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = applications.length;
    const approved = applications.filter(a => a.ai_decision === 'approved').length;
    const rejected = applications.filter(a => a.ai_decision === 'rejected').length;
    const pending = applications.filter(a => !a.ai_decision || a.ai_decision === 'manual_review').length;
    const totalAmount = applications.reduce((sum, a) => sum + a.loan_amount, 0);
    const approvedAmount = applications.filter(a => a.ai_decision === 'approved').reduce((sum, a) => sum + a.loan_amount, 0);
    const avgCreditScore = applications.filter(a => a.credit_score).reduce((sum, a) => sum + (a.credit_score || 0), 0) / (applications.filter(a => a.credit_score).length || 1);

    return { total, approved, rejected, pending, totalAmount, approvedAmount, avgCreditScore: Math.round(avgCreditScore) };
  }, [applications]);

  const latestApp = applications[0];

  const aiInsights = useMemo(() => {
    if (!latestApp) return null;

    const creditScore = latestApp.credit_score || 650;
    const income = latestApp.monthly_income;
    const loanAmount = latestApp.loan_amount;
    const emi = latestApp.emi_amount || 0;
    const emiToIncome = emi / income * 100;

    // Calculate approval probability
    let probability = 50;
    if (creditScore >= 750) probability += 25;
    else if (creditScore >= 700) probability += 15;
    else if (creditScore >= 650) probability += 5;
    else probability -= 15;

    if (emiToIncome <= 30) probability += 15;
    else if (emiToIncome <= 40) probability += 5;
    else if (emiToIncome <= 50) probability -= 10;
    else probability -= 25;

    if (income >= 50000) probability += 10;
    else if (income >= 30000) probability += 5;

    probability = Math.min(95, Math.max(15, probability));

    const risks: string[] = [];
    const recommendations: string[] = [];

    if (creditScore < 700) risks.push('Credit score below optimal range');
    if (emiToIncome > 40) risks.push('High EMI-to-income ratio');
    if (income < 30000) risks.push('Income below preferred threshold');

    if (emiToIncome > 35) recommendations.push(`Increase tenure to reduce EMI by ₹${Math.round(emi * 0.15).toLocaleString()}/month`);
    if (creditScore < 750) recommendations.push('Pay existing dues to improve credit score by 50+ points');
    if (loanAmount > income * 24) recommendations.push(`Consider a smaller loan of ₹${(income * 20).toLocaleString()} for faster approval`);
    
    if (recommendations.length === 0) {
      recommendations.push('Your profile looks strong! Consider prepaying to save interest.');
    }

    return { probability, risks, recommendations, creditScore, emiToIncome: emiToIncome.toFixed(1) };
  }, [latestApp]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: formData.full_name || null })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => prev ? { ...prev, full_name: formData.full_name || null } : null);
      toast({ title: 'Success', description: 'Profile updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save profile', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDownloadSanctionLetter = async (app: LoanApplication) => {
    if (app.ai_decision !== 'approved') return;
    setDownloadingLetter(true);
    try {
      await generateSanctionLetterPDF({
        applicationId: app.id,
        customerName: app.extracted_name || profile?.full_name || 'Valued Customer',
        loanAmount: app.loan_amount,
        tenure: app.loan_tenure,
        interestRate: 10.5,
        emiAmount: app.emi_amount || 0,
        creditScore: app.credit_score || undefined,
        monthlyIncome: app.monthly_income,
      });
      toast({ title: 'Success', description: 'Sanction letter downloaded' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to generate letter', variant: 'destructive' });
    } finally {
      setDownloadingLetter(false);
    }
  };

  const getStatusBadge = (status: string | null, aiDecision: string | null) => {
    const decision = aiDecision || status;
    switch (decision?.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'manual_review':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground"><Clock className="h-3 w-3 mr-1" />{status || 'Pending'}</Badge>;
    }
  };

  const formatAmount = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString: string | null) => dateString ? new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!user || !profile) return null;

  const displayName = profile.full_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Loan Assistant</title>
        <meta name="description" content="Manage your profile, view loan history, and get AI-powered insights" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LoanPal
          </span>
        </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleSignOut}><LogOut className="h-4 w-4" /></Button>
            </div>
          </div>
        </header>

        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />Back to Home
            </Button>

            {/* User Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {displayName.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
              <Button onClick={() => navigate('/apply')} className="gap-2">
                <TrendingUp className="h-4 w-4" />Apply for Loan
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="overview" className="gap-2"><BarChart3 className="h-4 w-4 hidden sm:block" />Overview</TabsTrigger>
                <TabsTrigger value="history" className="gap-2"><FileText className="h-4 w-4 hidden sm:block" />History</TabsTrigger>
                <TabsTrigger value="insights" className="gap-2"><Brain className="h-4 w-4 hidden sm:block" />AI Insights</TabsTrigger>
                <TabsTrigger value="settings" className="gap-2"><Settings className="h-4 w-4 hidden sm:block" />Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
                        <div>
                          <p className="text-2xl font-bold">{stats.total}</p>
                          <p className="text-sm text-muted-foreground">Total Applications</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-500/10"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                          <p className="text-sm text-muted-foreground">Approved</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-red-500/10"><XCircle className="h-5 w-5 text-red-600" /></div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                          <p className="text-sm text-muted-foreground">Rejected</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-yellow-500/10"><Clock className="h-5 w-5 text-yellow-600" /></div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Applied</span>
                        <span className="font-semibold">{formatAmount(stats.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Approved Amount</span>
                        <span className="font-semibold text-green-600">{formatAmount(stats.approvedAmount)}</span>
                      </div>
                      {stats.avgCreditScore > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Avg. Credit Score</span>
                          <span className="font-semibold">{stats.avgCreditScore}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                      <Button variant="outline" onClick={() => navigate('/apply')} className="h-auto py-4 flex-col gap-2">
                        <TrendingUp className="h-5 w-5" /><span>New Application</span>
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/emi-calculator')} className="h-auto py-4 flex-col gap-2">
                        <Calculator className="h-5 w-5" /><span>EMI Calculator</span>
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab('history')} className="h-auto py-4 flex-col gap-2">
                        <FileText className="h-5 w-5" /><span>View History</span>
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab('insights')} className="h-auto py-4 flex-col gap-2">
                        <Brain className="h-5 w-5" /><span>AI Insights</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Loan Application History</CardTitle>
                    <CardDescription>View all your past and current loan applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {applications.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No loan applications yet</p>
                        <Button variant="outline" className="mt-4" onClick={() => navigate('/apply')}>Apply for a Loan</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors gap-4 cursor-pointer" onClick={() => { setSelectedApplication(app); setIsDetailOpen(true); }}>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <IndianRupee className="h-4 w-4 text-primary" />
                                <span className="font-semibold">{formatAmount(app.loan_amount)}</span>
                                <span className="text-sm text-muted-foreground">for {app.loan_tenure} months</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />Applied on {formatDate(app.created_at)}
                              </div>
                              <div className="text-xs text-muted-foreground font-mono">ID: {app.id.slice(0, 8).toUpperCase()}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(app.status, app.ai_decision)}
                              {app.ai_decision === 'approved' && (
                                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleDownloadSanctionLetter(app); }} disabled={downloadingLetter}>
                                  <Download className="h-3 w-3 mr-1" />Letter
                                </Button>
                              )}
                              <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                {!aiInsights ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="font-semibold mb-2">No Data Yet</h3>
                      <p className="text-muted-foreground mb-4">Apply for a loan to get AI-powered insights</p>
                      <Button onClick={() => navigate('/apply')}>Apply Now</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Approval Probability */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Approval Probability</CardTitle>
                        <CardDescription>Based on your latest application</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6">
                          <div className="relative w-32 h-32">
                            <svg className="w-32 h-32 transform -rotate-90">
                              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted" />
                              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" strokeDasharray={`${aiInsights.probability * 3.52} 352`} className={aiInsights.probability >= 70 ? 'text-green-500' : aiInsights.probability >= 50 ? 'text-yellow-500' : 'text-red-500'} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl font-bold">{aiInsights.probability}%</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Credit Score</span>
                              <span className="font-medium">{aiInsights.creditScore}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">EMI to Income</span>
                              <span className="font-medium">{aiInsights.emiToIncome}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Risk Factors */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-yellow-500" />Risk Factors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {aiInsights.risks.length === 0 ? (
                            <div className="flex items-center gap-3 text-green-600">
                              <ShieldCheck className="h-5 w-5" />
                              <span>No major risk factors detected!</span>
                            </div>
                          ) : (
                            <ul className="space-y-3">
                              {aiInsights.risks.map((risk, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{risk}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                      </Card>

                      {/* AI Recommendations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" />AI Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {aiInsights.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{displayName}</h3>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input id="full_name" placeholder="Enter your full name" value={formData.full_name} onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={profile.email} disabled className="bg-muted" />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile} disabled={saving}>
                        {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : 'Save Changes'}
                      </Button>
                      <Button variant="destructive" onClick={handleSignOut}><LogOut className="h-4 w-4 mr-2" />Sign Out</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Loan Application Details</DialogTitle>
            <DialogDescription>Application ID: {selectedApplication?.id.slice(0, 8).toUpperCase()}</DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {selectedApplication.ai_decision === 'approved' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <PartyPopper className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-700 dark:text-green-400">Congratulations! Your Loan is Approved</h3>
                      <p className="text-sm text-green-600 dark:text-green-500">Your sanction letter is ready for download</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedApplication.ai_decision === 'rejected' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-700 dark:text-red-400">Application Rejected</h3>
                      {selectedApplication.ai_reason && <p className="text-sm text-red-600 dark:text-red-500 mt-1">{selectedApplication.ai_reason}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><p className="text-sm text-muted-foreground">Loan Amount</p><p className="font-semibold">{formatAmount(selectedApplication.loan_amount)}</p></div>
                <div className="space-y-1"><p className="text-sm text-muted-foreground">Tenure</p><p className="font-semibold">{selectedApplication.loan_tenure} months</p></div>
                <div className="space-y-1"><p className="text-sm text-muted-foreground">Monthly Income</p><p className="font-semibold">{formatAmount(selectedApplication.monthly_income)}</p></div>
                <div className="space-y-1"><p className="text-sm text-muted-foreground">EMI Amount</p><p className="font-semibold">{selectedApplication.emi_amount ? formatAmount(selectedApplication.emi_amount) : 'N/A'}</p></div>
                {selectedApplication.credit_score && (
                  <div className="space-y-1"><p className="text-sm text-muted-foreground">Credit Score</p><p className="font-semibold">{selectedApplication.credit_score}</p></div>
                )}
                <div className="space-y-1"><p className="text-sm text-muted-foreground">Applied On</p><p className="font-semibold">{formatDate(selectedApplication.created_at)}</p></div>
              </div>

              {selectedApplication.ai_decision === 'approved' && (
                <Button className="w-full" onClick={() => handleDownloadSanctionLetter(selectedApplication)} disabled={downloadingLetter}>
                  {downloadingLetter ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</> : <><Download className="h-4 w-4 mr-2" />Download Sanction Letter</>}
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <FloatingChatbot/>
    </>
  );
}
