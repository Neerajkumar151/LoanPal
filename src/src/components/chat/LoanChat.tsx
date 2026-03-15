import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoanChat } from '@/hooks/useLoanChat';
import { ProgressTracker } from './ProgressTracker';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { SanctionLetterButton } from './SanctionLetterButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserMenu } from '@/components/UserMenu';
import { Bot, ArrowLeft } from 'lucide-react';

export function LoanChat() {
  const navigate = useNavigate();
  const {
    messages,
    currentStep,
    isTyping,
    sanctionLetterData,
    processUserMessage,
    handleDocumentUpload,
  } = useLoanChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="dark flex flex-col h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Fixed Premium Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 transition-all h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors mr-2"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer group flex-1" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6 text-slate-900" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold font-display text-white leading-tight">
                LoanPal Assistant
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Application Terminal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block"></div>
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20 flex-shrink-0" />

      {/* Progress Tracker */}
      <div className="w-full max-w-4xl mx-auto px-4 mt-6 z-10 relative">
        <ProgressTracker currentStep={currentStep} />
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-8 z-10">
        <div className="max-w-4xl mx-auto space-y-6 pb-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          {sanctionLetterData && (
            <SanctionLetterButton
              applicationId={sanctionLetterData.applicationId}
              customerName={sanctionLetterData.customerName}
              loanAmount={sanctionLetterData.loanAmount}
              tenure={sanctionLetterData.tenure}
              interestRate={sanctionLetterData.interestRate}
              emiAmount={sanctionLetterData.emiAmount}
              creditScore={sanctionLetterData.creditScore}
              monthlyIncome={sanctionLetterData.monthlyIncome}
            />
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="w-full z-20 pb-4 pt-2">
        <ChatInput
          onSendMessage={processUserMessage}
          onUploadFiles={handleDocumentUpload}
          isTyping={isTyping}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
}
