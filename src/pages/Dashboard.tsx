"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Sparkles,
  Camera,
  Bot
} from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend, BarChart, Bar, CartesianGrid, ComposedChart, Line } from 'recharts';
import FloatingChatbot from '@/components/FloatingChatbot';

// Define the precise type for the profile
type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url?: string | null;
  [key: string]: any; // Allow generic property assignments temporarily if necessary
};

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
  const [disbursements, setDisbursements] = useState<any[]>([]);
  const [repayments, setRepayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [downloadingLetter, setDownloadingLetter] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

      const { data: disbData } = await (supabase as any)
        .from('loan_disbursements')
        .select('*')
        .eq('user_id', user.id);
      
      setDisbursements(disbData || []);

      if (disbData && disbData.length > 0) {
        const { data: repData } = await (supabase as any)
          .from('loan_repayments')
          .select('*')
          .in('loan_id', disbData.map((d: any) => d.loan_id));
        setRepayments(repData || []);
      } else {
        setRepayments([]);
      }

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

    // Repayment & Disbursement Overall Stats
    const totalDisbursedAmount = disbursements.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const totalPaidAmount = repayments.reduce((sum, r) => sum + Number(r.amount_paid || 0), 0);

    // Chart Data Preparation - Area Chart (Value over time)
    const sortedApps = [...applications].sort((a, b) => new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime());
    const chartData = sortedApps.map(app => {
        return {
            date: app.created_at ? new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Unknown',
            amount: app.loan_amount,
            status: app.ai_decision || 'pending'
        };
    });

    // Chart Data Preparation - Loan Progress (Bar Chart)
    const loanProgressData = disbursements.map((d, index) => {
        const app = applications.find(a => a.id === d.loan_id);
        const emi = app?.emi_amount || 0;
        const tenure = app?.loan_tenure || 12;
        const totalPayable = emi * tenure;
        const paidForThisLoan = repayments.filter(r => r.loan_id === d.loan_id).reduce((sum, r) => sum + Number(r.amount_paid), 0);
        const remaining = Math.max(0, totalPayable - paidForThisLoan);

        return {
            name: `Loan ${index + 1}`,
            paid: paidForThisLoan,
            remaining: remaining
        };
    }).filter(d => d.paid > 0 || d.remaining > 0);

    // Chart Data Preparation - Affordability (Composed Chart)
    const affordabilityData = sortedApps.map((app, index) => {
        return {
            name: `App ${index + 1}`,
            income: app.monthly_income,
            emi: app.emi_amount || 0
        };
    }).filter(d => d.income > 0);

    // Chart Data Preparation - Pie Chart (Status Distribution)
    const pieData = [
        { name: 'Approved', value: approved, color: '#10b981' }, // Green
        { name: 'Under Review', value: pending, color: '#f59e0b' }, // Amber
        { name: 'Rejected', value: rejected, color: '#ef4444' } // Red
    ].filter(d => d.value > 0);

    return { 
        total, approved, rejected, pending, totalAmount, approvedAmount, 
        avgCreditScore: Math.round(avgCreditScore), 
        totalDisbursedAmount, totalPaidAmount,
        chartData, loanProgressData, affordabilityData, pieData 
    };
  }, [applications, disbursements, repayments]);

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
      toast({
        title: "Profile Updated",
        description: "Your security configuration has been updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "An unprecedented error occurred.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      if (!event.target.files || event.target.files.length === 0 || !user) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      if (profile) {
        setProfile({ ...profile, avatar_url: publicUrl });
      }

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload Failed",
        description: error?.message || "Error uploading avatar.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
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

  if (!user) return null;
  
  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Loan Assistant</title>
        <meta name="description" content="Manage your profile, view loan history, and get AI-powered insights" />
      </Helmet>

      <div className="min-h-screen bg-background">
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
              <Button variant="ghost" size="icon" onClick={handleSignOut}><LogOut className="h-4 w-4" /></Button>
            </div>
          </div>
        </header>

        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />Back to Home
            </Button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <Avatar className="h-16 w-16 border-2 border-white/5 shadow-md">
                {profile?.avatar_url && <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />}
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {displayName.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">{profile?.email || user.email}</p>
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
                
                {/* Premium Stat Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-accent bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium mb-1">Total Applied</p>
                          <p className="text-3xl font-bold font-display">{stats.total}</p>
                        </div>
                        <div className="p-4 rounded-full bg-accent/10 shadow-inner"><FileText className="h-6 w-6 text-accent" /></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-green-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium mb-1">Approved</p>
                          <p className="text-3xl font-bold font-display text-green-600 dark:text-green-400">{stats.approved}</p>
                        </div>
                        <div className="p-4 rounded-full bg-green-500/10 shadow-inner"><CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-red-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium mb-1">Rejected</p>
                          <p className="text-3xl font-bold font-display text-red-600 dark:text-red-400">{stats.rejected}</p>
                        </div>
                        <div className="p-4 rounded-full bg-red-500/10 shadow-inner"><XCircle className="h-6 w-6 text-red-600 dark:text-red-400" /></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-yellow-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium mb-1">Pending Review</p>
                          <p className="text-3xl font-bold font-display text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                        </div>
                        <div className="p-4 rounded-full bg-yellow-500/10 shadow-inner"><Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" /></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Area */}
                <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                    
                  {/* Main Area Chart */}
                  <Card className="lg:col-span-2 shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-display flex items-center justify-between">
                        <span>Application Value Over Time</span>
                        <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent"></div> Loan Amount</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.chartData.length > 0 ? (
                            <div className="h-[300px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} dy={10} />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 12, fill: '#888888' }}
                                            tickFormatter={(value) => `₹${value >= 100000 ? (value/100000).toFixed(1) + 'L' : value}`}
                                            dx={-10}
                                        />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                            itemStyle={{ color: '#eab308', fontWeight: 'bold' }}
                                            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                                        />
                                        <Area type="monotone" dataKey="amount" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 6, strokeWidth: 0, fill: '#eab308' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground flex-col gap-2">
                                <BarChart3 className="h-10 w-10 opacity-20" />
                                <p>Not enough data to display chart</p>
                            </div>
                        )}
                    </CardContent>
                  </Card>

                  {/* Distribution Donut Chart */}
                  <Card className="shadow-md flex flex-col">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-display">Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                        {stats.pieData.length > 0 ? (
                            <div className="h-[250px] w-full mt-2 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {stats.pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8 text-center flex-col">
                                    <span className="text-3xl font-display font-bold text-foreground">{stats.total}</span>
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[250px] flex items-center justify-center text-muted-foreground flex-col gap-2">
                                <PieChart className="h-10 w-10 opacity-20" />
                                <p>No applications to distribute</p>
                            </div>
                        )}
                        
                        <Separator className="my-4" />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Funds</p>
                                <p className="font-bold text-lg text-foreground">₹{stats.totalAmount >= 100000 ? (stats.totalAmount/100000).toFixed(2) + 'L' : stats.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Avg. Credit</p>
                                <p className="font-bold text-lg text-foreground">{stats.avgCreditScore > 0 ? stats.avgCreditScore : 'N/A'}</p>
                            </div>
                        </div>

                    </CardContent>
                  </Card>
                </div>

                {/* Secondary Charts Area */}
                <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300 fill-mode-both">
                  
                  {/* Paid vs Remaining Stacked Bar Chart */}
                  <Card className="shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-display flex items-center justify-between">
                        <span>Repayment Progress</span>
                        <div className="flex items-center gap-4 text-xs font-normal text-muted-foreground">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Paid</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div> Remaining</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.loanProgressData.length > 0 ? (
                            <div className="h-[280px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.loanProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} tickFormatter={(val) => `₹${val/1000}k`} />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888', fontWeight: 500 }} width={60} />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                                        />
                                        <Bar dataKey="paid" stackId="a" fill="#10b981" radius={[4, 0, 0, 4]} />
                                        <Bar dataKey="remaining" stackId="a" fill="currentColor" className="fill-slate-200 dark:fill-slate-700" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[280px] flex items-center justify-center text-muted-foreground flex-col gap-2">
                                <BarChart3 className="h-10 w-10 opacity-20" />
                                <p>No active loan disbursements found</p>
                            </div>
                        )}
                    </CardContent>
                  </Card>

                  {/* Affordability Index (Income vs EMI) */}
                  <Card className="shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-display flex items-center justify-between">
                        <span>Affordability Index</span>
                        <div className="flex items-center gap-4 text-xs font-normal text-muted-foreground">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent"></div> Monthly Income</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> EMI Burden</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.affordabilityData.length > 0 ? (
                            <div className="h-[280px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={stats.affordabilityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} dy={10} />
                                        <YAxis 
                                            yAxisId="left"
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 12, fill: '#888888' }}
                                            tickFormatter={(val) => `₹${val/1000}k`}
                                            dx={-10}
                                        />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                                        />
                                        <Bar yAxisId="left" dataKey="income" barSize={40} fill="#eab308" radius={[4, 4, 0, 0]} />
                                        <Line yAxisId="left" type="monotone" dataKey="emi" stroke="#ef4444" strokeWidth={3} dot={{ r: 6, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[280px] flex items-center justify-center text-muted-foreground flex-col gap-2">
                                <TrendingDown className="h-10 w-10 opacity-20" />
                                <p>Apply for a loan to see affordability insights</p>
                            </div>
                        )}
                    </CardContent>
                  </Card>

                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="animate-in fade-in slide-in-from-right-8 duration-500">
                <Card className="shadow-lg border-t-4 border-t-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="pb-4 border-b border-border/50 bg-muted/20">
                    <CardTitle className="text-xl font-display flex items-center gap-2"><FileText className="h-5 w-5 text-accent" />Transaction Ledger</CardTitle>
                    <CardDescription>Comprehensive record of all applications and their current statuses</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {applications.length === 0 ? (
                      <div className="text-center py-16 text-muted-foreground bg-muted/5">
                        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 opacity-40" />
                        </div>
                        <p className="font-medium text-lg text-foreground">No transactions recorded</p>
                        <p className="text-sm mt-1 mb-6">You haven't applied for any loans yet.</p>
                        <Button onClick={() => navigate('/apply')} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">Apply for a Loan</Button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {applications.map((app, index) => (
                          <div 
                            key={app.id} 
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-all duration-300 gap-4 cursor-pointer hover:bg-muted/50 ${index !== applications.length - 1 ? 'border-b border-border/50' : ''}`}
                            onClick={() => { setSelectedApplication(app); setIsDetailOpen(true); }}
                          >
                            <div className="flex items-start gap-4 flex-1">
                                <div className="p-3 rounded-xl bg-primary/5 text-primary mt-1 hidden sm:block">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-lg font-display tracking-tight text-foreground">₹{app.loan_amount.toLocaleString()}</span>
                                        <Badge variant="outline" className="text-xs font-normal border-border/60">{app.loan_tenure} Months</Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(app.created_at)}</span>
                                        <span className="hidden sm:inline-block">|</span>
                                        <span className="font-mono text-xs opacity-70">ID: {app.id.slice(0, 8).toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:justify-end w-full sm:w-auto">
                              {getStatusBadge(app.status, app.ai_decision)}
                              {app.ai_decision === 'approved' && (
                                <Button variant="outline" size="sm" className="h-8 border-green-500/30 text-green-600 hover:bg-green-500/10 hover:text-green-700" onClick={(e) => { e.stopPropagation(); handleDownloadSanctionLetter(app); }} disabled={downloadingLetter}>
                                  <Download className="h-3.5 w-3.5 mr-1.5" />Letter
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full ml-auto sm:ml-0"><Eye className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="insights" className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                {!aiInsights ? (
                  <Card className="border-dashed border-2 bg-muted/10">
                    <CardContent className="py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                        <Brain className="h-10 w-10 text-muted-foreground opacity-50" />
                      </div>
                      <h3 className="text-2xl font-display font-semibold mb-2">Awaiting Data</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto mb-8">We need at least one completed loan application to generate personalized AI financial health insights.</p>
                      <Button onClick={() => navigate('/apply')} className="bg-accent text-accent-foreground hover:bg-accent/90">Run First Analysis</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Approval Probability Hero Card */}
                    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-accent/20 text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-1000 -translate-y-1/2 translate-x-1/3"></div>
                      
                      <CardHeader className="relative z-10 pb-2">
                        <CardTitle className="text-2xl font-display flex items-center gap-3 text-slate-100"><Sparkles className="h-6 w-6 text-accent" />Approval Intelligence</CardTitle>
                        <CardDescription className="text-slate-400">Real-time analysis based on your most recent profile parameters</CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10 pt-6">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                          {/* Radial Gauge */}
                          <div className="relative w-48 h-48 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                              <circle cx="96" cy="96" r="84" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="none" />
                              <circle 
                                cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="none" strokeLinecap="round"
                                strokeDasharray={`${aiInsights.probability * 5.27} 527`} 
                                className={`transition-all duration-1000 ease-out ${aiInsights.probability >= 70 ? 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]' : aiInsights.probability >= 50 ? 'text-accent drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]'}`} 
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-5xl font-display font-bold text-white">{aiInsights.probability}%</span>
                              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium mt-1">Viability</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                            <div className="space-y-1 border-l-2 border-slate-700 pl-4">
                              <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Calculated Score</p>
                              <p className="text-2xl font-bold font-display text-white">{aiInsights.creditScore}</p>
                            </div>
                            <div className="space-y-1 border-l-2 border-slate-700 pl-4">
                              <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Burden Ratio</p>
                              <p className={`text-2xl font-bold font-display ${Number(aiInsights.emiToIncome) > 40 ? 'text-red-400' : 'text-white'}`}>{aiInsights.emiToIncome}%</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Risk Factors */}
                      <Card className="border-t-4 border-t-red-500/80 shadow-md">
                        <CardHeader className="bg-red-500/5 pb-4">
                          <CardTitle className="flex items-center gap-2 text-lg font-display"><AlertTriangle className="h-5 w-5 text-red-500" />Identified Risks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          {aiInsights.risks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                                  <ShieldCheck className="h-6 w-6 text-green-600" />
                              </div>
                              <p className="font-medium text-foreground">Optimum Profile</p>
                              <p className="text-sm text-muted-foreground mt-1">No significant risk factors detected in your application parameters.</p>
                            </div>
                          ) : (
                            <ul className="space-y-4">
                              {aiInsights.risks.map((risk, i) => (
                                <li key={i} className="flex items-start gap-4 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                                  <div className="p-1.5 rounded-full bg-red-500/20 mt-0.5 flex-shrink-0">
                                      <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                                  </div>
                                  <span className="text-sm font-medium text-foreground">{risk}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                      </Card>

                      {/* AI Recommendations */}
                      <Card className="border-t-4 border-t-accent shadow-md">
                        <CardHeader className="bg-accent/5 pb-4">
                          <CardTitle className="flex items-center gap-2 text-lg font-display"><Lightbulb className="h-5 w-5 text-accent" />Strategic Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-4">
                            {aiInsights.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-4 p-3 rounded-lg bg-accent/5 border border-accent/10 transition-colors hover:bg-accent/10">
                                <div className="p-1.5 rounded-full bg-accent/20 mt-0.5 flex-shrink-0">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-foreground" />
                                </div>
                                <span className="text-sm font-medium text-foreground">{rec}</span>
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
              <TabsContent value="settings" className="animate-in fade-in slide-in-from-right-8 duration-700">
                <Card className="shadow-lg border-t-4 border-t-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-accent" /> Security Configuration</CardTitle>
                    <CardDescription>Master control panel for your identity settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleAvatarUpload} 
                      disabled={isUploading}
                    />

                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/60">
                      <div 
                        className="relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-border/50 transition-transform hover:scale-105"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Avatar className="h-full w-full rounded-none">
                          {profile?.avatar_url && <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />}
                          <AvatarFallback className="bg-gradient-to-br from-accent to-yellow-600 text-slate-900 font-bold text-3xl">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {isUploading ? (
                            <Loader2 className="h-6 w-6 text-accent animate-spin" />
                          ) : (
                            <Camera className="h-8 w-8 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-3xl font-display text-foreground tracking-tight">{displayName}</h3>
                        <p className="text-muted-foreground flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Verified Account</p>
                      </div>
                    </div>

                    <Separator className="opacity-50" />

                    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 max-w-4xl">
                      <div className="space-y-3">
                        <Label htmlFor="full_name" className="text-sm uppercase tracking-wider font-semibold text-muted-foreground ml-1">Legal Full Name</Label>
                        <Input 
                            id="full_name" 
                            placeholder="Enter your full name" 
                            value={formData.full_name} 
                            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))} 
                            className="h-12 bg-muted/40 border-border/60 focus:bg-background focus:ring-accent transition-all text-base px-4 rounded-xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm uppercase tracking-wider font-semibold text-muted-foreground ml-1">Registered Email Address</Label>
                        <div className="relative">
                            <Input 
                                id="email" 
                                value={profile.email} 
                                disabled 
                                className="h-12 bg-muted/30 border-none text-muted-foreground text-base px-4 rounded-xl cursor-not-allowed pr-12" 
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <ShieldCheck className="h-5 w-5 text-green-500 opacity-80" />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground ml-1">Email cannot be changed directly for security reasons.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button onClick={handleSaveProfile} disabled={saving} className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium shadow-md transition-all">
                        {saving ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Securing...</> : 'Save Configuration'}
                      </Button>
                      <Button variant="outline" onClick={handleSignOut} className="h-12 px-6 rounded-xl border-border/60 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all font-medium">
                        <LogOut className="h-4 w-4 mr-2" />Secure Sign Out
                      </Button>
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
