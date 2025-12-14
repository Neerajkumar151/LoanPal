import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from '@/components/UserMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  PartyPopper
} from 'lucide-react';

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

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [downloadingLetter, setDownloadingLetter] = useState(false);
  
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
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      if (profileData) {
        setProfile(profileData);
        setFormData({
          full_name: profileData.full_name || '',
        });
      }

      // Fetch loan applications with all details
      const { data: appsData, error: appsError } = await supabase
        .from('loan_applications')
        .select('id, loan_amount, loan_tenure, monthly_income, credit_score, emi_amount, status, ai_decision, ai_reason, extracted_name, created_at, updated_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      
      setApplications(appsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name || null,
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile((prev) => prev ? { 
        ...prev, 
        full_name: formData.full_name || null,
      } : null);

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadSanctionLetter = async (app: LoanApplication) => {
    if (app.ai_decision !== 'approved') {
      toast({
        title: 'Not Available',
        description: 'Sanction letter is only available for approved loans',
        variant: 'destructive',
      });
      return;
    }

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
      toast({
        title: 'Success',
        description: 'Sanction letter downloaded successfully',
      });
    } catch (error) {
      console.error('Error generating sanction letter:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate sanction letter',
        variant: 'destructive',
      });
    } finally {
      setDownloadingLetter(false);
    }
  };

  const openApplicationDetail = (app: LoanApplication) => {
    setSelectedApplication(app);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string | null, aiDecision: string | null) => {
    const decision = aiDecision || status;
    
    switch (decision?.toLowerCase()) {
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'manual_review':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {status || 'Pending'}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const displayName = profile.full_name || user.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Profile - AI Loan Assistant</title>
        <meta name="description" content="Manage your profile and view loan application history" />
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
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="grid gap-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{displayName}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Loan Applications History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Loan Application History
                  </CardTitle>
                  <CardDescription>
                    View all your past and current loan applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No loan applications yet</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate('/apply')}
                      >
                        Apply for a Loan
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors gap-4 cursor-pointer"
                          onClick={() => openApplicationDetail(app)}
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <IndianRupee className="h-4 w-4 text-primary" />
                              <span className="font-semibold">
                                {formatAmount(app.loan_amount)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                for {app.loan_tenure} months
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              Applied on {formatDate(app.created_at)}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              ID: {app.id.slice(0, 8).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(app.status, app.ai_decision)}
                            {app.ai_decision === 'approved' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadSanctionLetter(app);
                                }}
                                disabled={downloadingLetter}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Letter
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Loan Application Details
            </DialogTitle>
            <DialogDescription>
              Application ID: {selectedApplication?.id.slice(0, 8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Status Banner */}
              {selectedApplication.ai_decision === 'approved' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <PartyPopper className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-700 dark:text-green-400">
                        Congratulations! Your Loan is Approved
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        Your sanction letter is ready for download
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedApplication.ai_decision === 'rejected' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-700 dark:text-red-400">
                        Application Rejected
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                        <strong>Reason:</strong> {selectedApplication.ai_reason || 'No specific reason provided'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedApplication.ai_decision === 'manual_review' && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">
                        Under Manual Review
                      </h3>
                      <p className="text-sm text-yellow-600 dark:text-yellow-500">
                        Your application is being reviewed by our team
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loan Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground">
                  Loan Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Loan Amount</p>
                    <p className="font-semibold">{formatAmount(selectedApplication.loan_amount)}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Tenure</p>
                    <p className="font-semibold">{selectedApplication.loan_tenure} months</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Monthly Income</p>
                    <p className="font-semibold">{formatAmount(selectedApplication.monthly_income)}</p>
                  </div>
                  {selectedApplication.emi_amount && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Monthly EMI</p>
                      <p className="font-semibold">{formatAmount(selectedApplication.emi_amount)}</p>
                    </div>
                  )}
                  {selectedApplication.credit_score && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Credit Score</p>
                      <p className="font-semibold">{selectedApplication.credit_score}</p>
                    </div>
                  )}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-1">
                      {getStatusBadge(selectedApplication.status, selectedApplication.ai_decision)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground">
                  Timeline
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Applied on:</span>
                    <span className="font-medium">{formatDate(selectedApplication.created_at)}</span>
                  </div>
                  {selectedApplication.updated_at && selectedApplication.updated_at !== selectedApplication.created_at && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last updated:</span>
                      <span className="font-medium">{formatDate(selectedApplication.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Button for Approved */}
              {selectedApplication.ai_decision === 'approved' && (
                <Button
                  className="w-full"
                  onClick={() => handleDownloadSanctionLetter(selectedApplication)}
                  disabled={downloadingLetter}
                >
                  {downloadingLetter ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Sanction Letter
                    </>
                  )}
                </Button>
              )}

              {/* Apply Again for Rejected */}
              {selectedApplication.ai_decision === 'rejected' && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsDetailOpen(false);
                    navigate('/apply');
                  }}
                >
                  Apply for a New Loan
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
