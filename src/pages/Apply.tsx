import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { LoanChat } from '@/components/chat/LoanChat';
import { Loader2 } from 'lucide-react';

export default function Apply() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Apply for Loan - AI Loan Assistant</title>
        <meta name="description" content="Apply for a personal loan with our AI-powered assistant. Quick and easy application process." />
      </Helmet>
      <LoanChat />
    </>
  );
}
