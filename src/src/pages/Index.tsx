import { LoanChat } from '@/components/chat/LoanChat';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AI Loan Assistant - Quick Personal Loan Application</title>
        <meta name="description" content="Apply for a personal loan in minutes with our AI-powered loan assistant. Fast approvals, competitive rates, and a friendly chat experience." />
      </Helmet>
      <LoanChat />
    </>
  );
};

export default Index;
