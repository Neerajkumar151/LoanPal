import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage, ChatStep, LoanDetails, UploadedDocument, EligibilityResult } from '@/types/loan';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './useAuth';

interface ApplicationHistory {
  id: string;
  status: string | null;
  ai_reason: string | null;
  loan_amount: number;
  credit_score: number | null;
  created_at: string | null;
  emi_amount: number | null;
  loan_tenure: number;
}

interface ApplicationContext {
  hasExistingApplication: boolean;
  applicationStatus?: string;
  rejectionReason?: string;
  loanAmount?: number;
  creditScore?: number;
  applicationId?: string;
  applicationHistory: ApplicationHistory[];
}

interface IntentResponse {
  intent: string;
  confidence: number;
  suggestedResponse: string;
  shouldContinueFlow: boolean;
}

export function useLoanChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    name: null,
    amount: null,
    tenure: null,
    monthlyIncome: null,
  });
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [collectingField, setCollectingField] = useState<'name' | 'amount' | 'tenure' | 'income' | 'purpose' | null>(null);
  const [awaitingDocument, setAwaitingDocument] = useState<'salary_slip' | 'credit_score' | null>(null);
  const [applicationContext, setApplicationContext] = useState<ApplicationContext>({ hasExistingApplication: false, applicationHistory: [] });
  const [sanctionLetterData, setSanctionLetterData] = useState<{
    applicationId: string;
    customerName: string;
    loanAmount: number;
    tenure: number;
    interestRate: number;
    emiAmount: number;
    creditScore?: number;
    monthlyIncome?: number;
  } | null>(null);

  // User ID for saving applications - must be authenticated user
  const userId = user?.id;

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const message: ChatMessage = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  const saveChatMessage = useCallback(async (role: string, content: string) => {
    if (!user) return; // Only save if user is authenticated
    try {
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        application_id: applicationId,
        role,
        content,
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }, [user, applicationId]);

  // Fetch user's application history on mount (last 10 applications)
  const fetchApplicationHistory = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('id, status, ai_reason, loan_amount, credit_score, created_at, emi_amount, loan_tenure')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching application history:', error);
        return;
      }

      if (data && data.length > 0) {
        const latestApp = data[0];
        setApplicationContext({
          hasExistingApplication: true,
          applicationStatus: latestApp.status || 'pending',
          rejectionReason: latestApp.ai_reason || undefined,
          loanAmount: latestApp.loan_amount ? Number(latestApp.loan_amount) : undefined,
          creditScore: latestApp.credit_score || undefined,
          applicationId: latestApp.id,
          applicationHistory: data as ApplicationHistory[],
        });
      }
    } catch (error) {
      console.error('Error fetching application history:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchApplicationHistory();
  }, [fetchApplicationHistory]);

  const parseNumber = (text: string): number | null => {
    const cleaned = text.replace(/[₹$,\s]/g, '').replace(/lakh/gi, '00000').replace(/lac/gi, '00000').replace(/k/gi, '000');
    const match = cleaned.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const calculateEligibility = useCallback(async (
    creditScore: number,
    loanAmount: number,
    monthlyIncome: number,
    tenure: number
  ): Promise<EligibilityResult> => {
    const interestRate = 10.5;
    const monthlyRate = interestRate / 12 / 100;
    const emiAmount = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                      (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const preApprovedLimit = monthlyIncome * 12;
    const emiToIncomeRatio = emiAmount / monthlyIncome;

    if (creditScore < 700) {
      return {
        decision: 'rejected',
        reason: 'Credit score is below the required minimum of 700.',
        emiAmount,
        interestRate,
      };
    }

    if (loanAmount <= preApprovedLimit) {
      return {
        decision: 'approved',
        reason: 'Loan amount is within pre-approved limit.',
        emiAmount,
        interestRate,
      };
    }

    if (loanAmount <= 2 * preApprovedLimit && creditScore >= 700) {
      if (emiToIncomeRatio <= 0.5) {
        return {
          decision: 'approved',
          reason: 'EMI is within 50% of monthly income and credit score meets requirements.',
          emiAmount,
          interestRate,
        };
      }
      return {
        decision: 'rejected',
        reason: 'EMI exceeds 50% of monthly income.',
        emiAmount,
        interestRate,
      };
    }

    return {
      decision: 'rejected',
      reason: 'Loan amount exceeds maximum eligible amount.',
      emiAmount,
      interestRate,
    };
  }, []);

  // Call AI to detect intent
  const detectIntent = useCallback(async (userMessage: string): Promise<IntentResponse> => {
    try {
      const conversationHistory = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const currentDate = new Date().toLocaleDateString('en-IN', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
      });

      const { data, error } = await supabase.functions.invoke('chat-intent', {
        body: {
          userMessage,
          conversationHistory,
          applicationContext,
          currentStep,
          isCollectingField: collectingField !== null,
          currentDate,
        }
      });

      if (error) {
        console.error('Intent detection error:', error);
        return {
          intent: 'other',
          confidence: 0.5,
          suggestedResponse: '',
          shouldContinueFlow: true
        };
      }

      return data as IntentResponse;
    } catch (error) {
      console.error('Intent detection error:', error);
      return {
        intent: 'other',
        confidence: 0.5,
        suggestedResponse: '',
        shouldContinueFlow: true
      };
    }
  }, [messages, applicationContext, currentStep, collectingField]);

  const processUserMessage = useCallback(async (userMessage: string) => {
    addMessage('user', userMessage);
    await saveChatMessage('user', userMessage);
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    let response = '';

    // If collecting a field, first try to parse the response
    if (collectingField) {
      const num = parseNumber(userMessage);
      let handled = false;
      
      switch (collectingField) {
        case 'name':
          const trimmedName = userMessage.trim();
          if (trimmedName.length >= 2 && !trimmedName.match(/^\d+$/)) {
            setLoanDetails(prev => ({ ...prev, name: trimmedName }));
            setCollectingField('amount');
            response = `Nice to meet you, ${trimmedName}! 👋\n\nNow, how much loan amount would you like to apply for? Please enter the amount in rupees.`;
            handled = true;
          }
          break;
          
        case 'amount':
          if (num && num > 0) {
            setLoanDetails(prev => ({ ...prev, amount: num }));
            setCollectingField('tenure');
            response = `Great! ₹${num.toLocaleString('en-IN')} noted. 📝\n\nHow long would you like to repay this loan? Please tell me the tenure in months (e.g., 12, 24, 36, 48, or 60 months).`;
            handled = true;
          }
          break;
          
        case 'tenure':
          if (num && num > 0 && num <= 120) {
            setLoanDetails(prev => ({ ...prev, tenure: num }));
            setCollectingField('income');
            response = `Perfect, ${num} months it is! 👍\n\nNow, could you share your monthly income? This helps me calculate your eligibility and EMI.`;
            handled = true;
          }
          break;
          
        case 'income':
          if (num && num > 0) {
            setLoanDetails(prev => ({ ...prev, monthlyIncome: num }));
            setCollectingField(null);
            setCurrentStep('documents');
            setAwaitingDocument('salary_slip');
            response = `Wonderful! Monthly income of ₹${num.toLocaleString('en-IN')} recorded. ✅\n\n📄 **Document Upload Time**\n\nTo verify your application, I'll need to check:\n• Your **name** matches across documents\n• Your **monthly salary**\n• Your **CIBIL credit score**\n\n**Step 1:** Please upload your **salary slip** first.\n\nUse the upload button below to submit your salary slip (PDF, DOC, or image).`;
            handled = true;
          }
          break;
      }

      if (handled) {
        setIsTyping(false);
        addMessage('assistant', response);
        await saveChatMessage('assistant', response);
        return;
      }
      
      // If not handled as form response, use AI to understand intent
    }

    // Use AI to detect intent
    const intentResult = await detectIntent(userMessage);
    console.log('Intent detected:', intentResult);

    // Handle based on intent
    switch (intentResult.intent) {
      case 'gratitude':
  response = "You're most welcome! 😊 I'm glad I could help. Let me know if you need anything else."
  break;

      case 'greeting':
  // Only greet if this is the first user interaction
  if (messages.length <= 1) {
    response = "Hello! 👋 How can I help you today?"
  } else {
    response = intentResult.suggestedResponse || "How can I help you?"
  }
  break;


      case 'check_status':
        if (applicationContext.hasExistingApplication) {
          const statusEmoji = applicationContext.applicationStatus === 'approved' ? '✅' : 
                             applicationContext.applicationStatus === 'rejected' ? '❌' : '⏳';
          response = `${statusEmoji} **Application Status**\n\nYour most recent loan application${applicationContext.loanAmount ? ` for ₹${applicationContext.loanAmount.toLocaleString('en-IN')}` : ''} is currently: **${applicationContext.applicationStatus?.toUpperCase()}**\n\n${
            applicationContext.applicationStatus === 'rejected' 
              ? `If you'd like to know the reason for rejection, just ask "why was my loan rejected?"\n\nYou can also start a fresh application anytime!`
              : applicationContext.applicationStatus === 'approved'
              ? `Congratulations! Your loan has been approved. You should have received your sanction letter.`
              : `We're reviewing your application. You'll be notified once there's an update.`
          }`;
        } else {
          response = "I don't see any loan applications in your account yet. 📋\n\nWould you like to apply for a personal loan? I can guide you through the process - it only takes a few minutes!";
        }
        break;

      case 'rejection_reason':
        if (applicationContext.hasExistingApplication && applicationContext.applicationStatus === 'rejected') {
          response = `I understand you'd like to know why your application wasn't approved. 💙\n\n**Reason:** ${applicationContext.rejectionReason || 'The specific reason was not recorded.'}\n\n**Our eligibility criteria includes:**\n• Minimum credit score of 700\n• EMI should not exceed 50% of monthly income\n• Loan amount within eligible limits based on income\n• Valid document verification\n\n**Tips to improve your chances:**\n• Work on improving your credit score\n• Consider a smaller loan amount\n• Ensure all documents are clear and accurate\n\nWould you like to start a **new application**? Just say "apply" or "start application"!`;
        } else if (applicationContext.hasExistingApplication) {
          response = `Your application wasn't rejected - it's currently **${applicationContext.applicationStatus}**. 🙂\n\nIs there anything else I can help you with?`;
        } else {
          response = "I don't see any rejected applications in your account. 📋\n\nIf you'd like to apply for a loan, I'm here to help! Just say 'apply' to get started.";
        }
        break;

      case 'application_history':
        if (applicationContext.hasExistingApplication) {
          response = `📋 **Your Application History**\n\nMost recent application:\n• Status: **${applicationContext.applicationStatus?.toUpperCase()}**\n${applicationContext.loanAmount ? `• Amount: ₹${applicationContext.loanAmount.toLocaleString('en-IN')}\n` : ''}${applicationContext.creditScore ? `• Credit Score: ${applicationContext.creditScore}\n` : ''}\n\nWould you like more details or would you like to start a new application?`;
        } else {
          response = "You haven't applied for any loans with us yet. 📋\n\nWould you like to apply for a personal loan? The process is quick and easy!";
        }
        break;

      case 'apply_loan':
      case 'continue_application':
        setCurrentStep('details');
        setCollectingField('name');
        response = `Excellent! I'd be happy to help you with a personal loan. 🎯\n\nHere's how our quick process works:\n1. **Share basic details** - Loan amount, tenure, income\n2. **Upload documents** - Salary slip & credit score proof\n3. **Quick AI review** - We verify everything instantly\n4. **Get your decision** - Approval in minutes!\n\nLet's get started! 🚀\n\nFirst, what's your full name as it appears on your official documents?`;
        break;

      case 'loan_info':
        response = intentResult.suggestedResponse || `Great question! 🏦\n\nHere's what you should know about our personal loans:\n• **Interest Rate:** Starting from 10.5% p.a.\n• **Tenure:** 12 to 60 months\n• **Amount:** Based on your income and credit score\n• **EMI:** Calculated based on amount and tenure\n\n**Eligibility:**\n• Minimum credit score: 700\n• EMI should be ≤50% of monthly income\n\nWould you like to check your eligibility or apply now?`;
        break;

      case 'document_query':
        if (currentStep === 'documents') {
          response = awaitingDocument === 'salary_slip' 
            ? "📎 I'm waiting for your **salary slip**!\n\nPlease upload your latest salary slip using the upload button below. Accepted formats: PDF, DOC, DOCX, JPG, PNG."
            : "📎 I'm waiting for your **CIBIL credit report**!\n\nPlease upload your credit score document using the upload button below.";
        } else {
          response = "For loan verification, you'll need to upload:\n• **Salary Slip** - Your latest pay slip\n• **CIBIL Report** - Your credit score document\n\nThese help us verify your income and creditworthiness. Would you like to start an application?";
        }
        break;

      case 'help':
        response = `I'm here to help! 🙋‍♂️\n\nHere's what I can do for you:\n• **Apply for a loan** - Say "apply" or "start application"\n• **Check status** - Ask "what's my application status?"\n• **Understand rejection** - Ask "why was I rejected?"\n• **Loan information** - Ask about interest rates, EMI, eligibility\n\n${applicationContext.hasExistingApplication ? `I see you have a ${applicationContext.applicationStatus} application. ` : ''}What would you like to do?`;
        break;

      case 'form_response':
        // If we're collecting a field but couldn't parse it above, ask again
        if (collectingField === 'name') {
          response = "Please enter your full name (at least 2 characters, letters only).";
        } else if (collectingField === 'amount') {
          response = "I didn't quite catch that amount. Could you please enter the loan amount in numbers? For example: 500000 or 5 lakh.";
        } else if (collectingField === 'tenure') {
          response = "Please enter a valid tenure between 1-120 months. For example: 36 for a 3-year loan.";
        } else if (collectingField === 'income') {
          response = "Please enter a valid monthly income amount. For example: 50000 or 50k.";
        } else {
          response = intentResult.suggestedResponse || "I'm here to help! How can I assist you today?";
        }
        break;

      default:
        // Use AI-generated response if available, otherwise provide a helpful default
        if (intentResult.suggestedResponse && intentResult.confidence > 0.6) {
          response = intentResult.suggestedResponse;
        } else if (currentStep === 'documents') {
          response = awaitingDocument === 'salary_slip' 
            ? "I'm waiting for your **salary slip**! 📎\n\nPlease upload your latest salary slip using the upload button below."
            : awaitingDocument === 'credit_score'
            ? "Great! Now I need your **CIBIL credit report**. 📎\n\nPlease upload your credit score document using the upload button below."
            : "I'm waiting for your documents! 📎\n\nPlease upload using the button below.";
        } else if (currentStep === 'review') {
          response = "Your application is being reviewed. Please wait a moment... ⏳";
        } else if (currentStep === 'decision') {
          response = `Thanks for reaching out! 😊\n\nYour previous application has been processed (Status: **${applicationContext.applicationStatus}**).\n\nI can help you with:\n• Understanding your application result\n• Starting a new application\n• Answering any questions\n\nWhat would you like to know?`;
        } else {
          response = "I'm your friendly loan assistant! 🏦\n\nI can help you:\n• Apply for a personal loan\n• Check your application status\n• Answer questions about loans and eligibility\n\nHow can I assist you today?";
        }
    }

    setIsTyping(false);
    addMessage('assistant', response);
    await saveChatMessage('assistant', response);
  }, [addMessage, saveChatMessage, currentStep, collectingField, applicationContext, awaitingDocument, detectIntent]);

  const handleDocumentUpload = useCallback(async (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    setIsTyping(true);
    
    const docType = awaitingDocument || 
      (file.name.toLowerCase().includes('salary') || 
       file.name.toLowerCase().includes('payslip') ||
       file.name.toLowerCase().includes('slip') 
       ? 'salary_slip' : 'credit_score');
    
    addMessage('assistant', `Uploading and analyzing your ${docType === 'salary_slip' ? 'salary slip' : 'CIBIL report'}... 📄🔍`);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('documentType', docType);

      const uploadResponse = await fetch(
        `https://fyhnbmexusojuyrikxfm.supabase.co/functions/v1/upload-document`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Upload failed');
      }

      console.log('Upload result:', uploadResult);
      const filePath = uploadResult.filePath;

      const { data: parseResult, error: parseError } = await supabase.functions.invoke('parse-document', {
        body: { 
          filePath, 
          documentType: docType,
          fileName: file.name 
        }
      });

      if (parseError) {
        console.error('Parse function error:', parseError);
      }

      console.log('Parse result:', parseResult);

      const docId = uuidv4();
      const parsedData = parseResult?.parsedData || {
        extractedName: null,
        extractedSalary: null,
        creditScore: null,
        confidence: 'low',
      };

      const newDoc: UploadedDocument = {
        id: docId,
        documentType: docType,
        fileName: file.name,
        filePath,
        parsedData,
      };
      
      setDocuments(prev => [...prev, newDoc]);
      setIsTyping(false);

      if (docType === 'salary_slip') {
        let resultMsg = `✅ **Salary Slip Received!**\n\n`;
        if (parsedData.extractedName) resultMsg += `👤 Name: ${parsedData.extractedName}\n`;
        if (parsedData.extractedSalary) resultMsg += `💰 Monthly Salary: ₹${parsedData.extractedSalary.toLocaleString('en-IN')}\n`;
        resultMsg += `\n**Step 2:** Now please upload your **CIBIL credit score report**.`;
        
        addMessage('assistant', resultMsg);
        await saveChatMessage('assistant', resultMsg);
        setAwaitingDocument('credit_score');
      } else {
        let resultMsg = `✅ **CIBIL Report Received!**\n\n`;
        if (parsedData.extractedName) resultMsg += `👤 Name: ${parsedData.extractedName}\n`;
        if (parsedData.creditScore) resultMsg += `📊 Credit Score: ${parsedData.creditScore}\n`;
        resultMsg += `\nBoth documents received. Verifying your information...`;
        
        addMessage('assistant', resultMsg);
        await saveChatMessage('assistant', resultMsg);
        setAwaitingDocument(null);
        setCurrentStep('review');
        
        const allDocs = [...documents, newDoc];
        await processDocumentVerification(allDocs);
      }
    } catch (error) {
      console.error('Upload/parse error:', error);
      setIsTyping(false);
      addMessage('assistant', `⚠️ There was an issue uploading ${file.name}. Please try again.`);
    }
  }, [awaitingDocument, documents, addMessage, saveChatMessage]);

  const processDocumentVerification = useCallback(async (allDocs: UploadedDocument[]) => {
    const salaryDoc = allDocs.find(d => d.documentType === 'salary_slip');
    const creditDoc = allDocs.find(d => d.documentType === 'credit_score');

    if (salaryDoc && creditDoc) {
      const salaryName = salaryDoc.parsedData?.extractedName;
      const creditName = creditDoc.parsedData?.extractedName;
      const extractedSalary = salaryDoc.parsedData?.extractedSalary;
      const creditScore = creditDoc.parsedData?.creditScore;
      
      let verificationMessage = "📋 **Document Verification Results:**\n\n";
      
      if (salaryName) verificationMessage += `👤 **Name (Salary Slip):** ${salaryName}\n`;
      if (creditName) verificationMessage += `👤 **Name (Credit Report):** ${creditName}\n`;
      if (extractedSalary) verificationMessage += `💰 **Extracted Income:** ₹${extractedSalary.toLocaleString('en-IN')}/month\n`;
      if (creditScore) verificationMessage += `📊 **Credit Score:** ${creditScore}\n`;

      const declaredName = loanDetails.name?.toLowerCase() || '';
      const salaryNameLower = salaryName?.toLowerCase() || '';
      const creditNameLower = creditName?.toLowerCase() || '';
      
      const nameMatchesSalary = !salaryName || !declaredName || 
        salaryNameLower.includes(declaredName) || declaredName.includes(salaryNameLower);
      const nameMatchesCredit = !creditName || !declaredName || 
        creditNameLower.includes(declaredName) || declaredName.includes(creditNameLower);
      const namesMatchEachOther = !salaryName || !creditName || 
        salaryNameLower.includes(creditNameLower) || creditNameLower.includes(salaryNameLower);

      const incomeMatches = !extractedSalary || !loanDetails.monthlyIncome ||
        Math.abs(extractedSalary - loanDetails.monthlyIncome) <= loanDetails.monthlyIncome * 0.2;

      let hasIssues = false;

      if (!nameMatchesSalary || !nameMatchesCredit) {
        verificationMessage += `\n⚠️ **Name Mismatch:** Declared name "${loanDetails.name}" doesn't match documents.`;
        hasIssues = true;
      } else if (!namesMatchEachOther) {
        verificationMessage += "\n⚠️ **Note:** Names in salary slip and credit report don't match.";
        hasIssues = true;
      }
      
      if (!incomeMatches) {
        verificationMessage += `\n⚠️ **Income Mismatch:** Extracted income differs from declared income (₹${loanDetails.monthlyIncome?.toLocaleString('en-IN')}).`;
        hasIssues = true;
      }

      if (salaryDoc.parsedData?.confidence === 'low' || creditDoc.parsedData?.confidence === 'low' || hasIssues) {
        verificationMessage += "\n\n❌ **Application Rejected:** Your documents could not be verified successfully.";
        addMessage('assistant', verificationMessage);
        await saveChatMessage('assistant', verificationMessage);
        
        const appId = applicationId || uuidv4();
        const rejectionReason = 'Document verification failed - low confidence or data mismatch detected';
        
        if (userId) {
          try {
            await supabase.from('loan_applications').upsert({
              id: appId,
              user_id: userId,
              loan_amount: loanDetails.amount || 0,
              loan_tenure: loanDetails.tenure || 12,
              monthly_income: loanDetails.monthlyIncome || 0,
              credit_score: creditDoc?.parsedData?.creditScore || null,
              status: 'rejected',
              ai_decision: 'rejected',
              ai_reason: rejectionReason,
            });
            setApplicationId(appId);
            
            // Update application context
            setApplicationContext(prev => ({
              ...prev,
              hasExistingApplication: true,
              applicationStatus: 'rejected',
              rejectionReason,
              loanAmount: loanDetails.amount || undefined,
              creditScore: creditDoc?.parsedData?.creditScore || undefined,
              applicationId: appId,
            }));
          } catch (error) {
            console.error('Error saving rejected application:', error);
          }
        }
        
        setCurrentStep('decision');
        setIsTyping(false);
        
        const rejectionResponse = `I'm sorry, but your loan application has been **rejected**. 😔\n\n` +
          `**Reason:** Document verification failed due to:\n` +
          `${salaryDoc.parsedData?.confidence === 'low' ? '• Low confidence in salary slip data\n' : ''}` +
          `${creditDoc.parsedData?.confidence === 'low' ? '• Low confidence in credit report data\n' : ''}` +
          `${hasIssues ? '• Mismatch between declared and extracted information\n' : ''}\n` +
          `**What you can do:**\n` +
          `• Ensure documents are clear and legible\n` +
          `• Upload official documents only\n` +
          `• Make sure declared income matches your salary slip\n\n` +
          `Feel free to ask me "why was my loan rejected?" for more details, or say "apply again" to start fresh! 🙂`;
        
        addMessage('assistant', rejectionResponse);
        await saveChatMessage('assistant', rejectionResponse);
        return;
      } else {
        verificationMessage += "\n\n✅ All details verified successfully! Checking your eligibility...";
        addMessage('assistant', verificationMessage);
        await saveChatMessage('assistant', verificationMessage);
        setCurrentStep('review');
        await processEligibility(false, creditScore, extractedSalary);
      }
    } else {
      const missing = [];
      if (!salaryDoc) missing.push('salary slip');
      if (!creditDoc) missing.push('credit score report');
      addMessage('assistant', `Thanks for uploading! 📁\n\nI still need your ${missing.join(' and ')} to proceed. Please upload the remaining document(s).`);
    }
  }, [documents, userId, applicationId, loanDetails, addMessage, saveChatMessage]);

  const processEligibility = useCallback(async (
    forceManualReview: boolean = false,
    parsedCreditScore?: number,
    parsedIncome?: number
  ) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const creditDoc = documents.find(d => d.documentType === 'credit_score');
    const creditScore = parsedCreditScore || creditDoc?.parsedData?.creditScore || 720;
    const verifiedIncome = parsedIncome || loanDetails.monthlyIncome;
    
    if (!loanDetails.amount || !loanDetails.tenure || !verifiedIncome) {
      addMessage('assistant', "I'm missing some loan details. Let's start over - what loan amount would you like?");
      setIsTyping(false);
      return;
    }

    if (forceManualReview) {
      return;
    }

    const result = await calculateEligibility(
      creditScore,
      loanDetails.amount,
      verifiedIncome,
      loanDetails.tenure
    );

    const appId = applicationId || uuidv4();
    
    if (userId) {
      try {
        await supabase.from('loan_applications').upsert({
          id: appId,
          user_id: userId,
          loan_amount: loanDetails.amount,
          loan_tenure: loanDetails.tenure,
          monthly_income: loanDetails.monthlyIncome,
          credit_score: creditScore,
          emi_amount: Math.round(result.emiAmount || 0),
          status: result.decision,
          ai_decision: result.decision,
          ai_reason: result.reason,
        });

        await supabase.from('admin_decisions').insert({
          application_id: appId,
          admin_id: 'ai-system',
          decision: result.decision,
          reason: result.reason,
        });

        setApplicationId(appId);
        
        // Update application context
        setApplicationContext(prev => ({
          ...prev,
          hasExistingApplication: true,
          applicationStatus: result.decision,
          rejectionReason: result.decision === 'rejected' ? result.reason : undefined,
          loanAmount: loanDetails.amount,
          creditScore,
          applicationId: appId,
        }));
      } catch (error) {
        console.error('Error saving application:', error);
      }
    }

    setCurrentStep('decision');
    setIsTyping(false);

    let response = '';
    if (result.decision === 'approved') {
      response = `🎉 **Congratulations!** Your loan has been **APPROVED**!\n\n` +
        `📋 **Loan Details:**\n` +
        `• Amount: ₹${loanDetails.amount.toLocaleString('en-IN')}\n` +
        `• Tenure: ${loanDetails.tenure} months\n` +
        `• Interest Rate: ${result.interestRate}% p.a.\n` +
        `• EMI: ₹${Math.round(result.emiAmount || 0).toLocaleString('en-IN')}/month\n\n` +
        `Your sanction letter is being prepared. You can download it below once ready! 📄`;
      
      setTimeout(() => generateSanctionLetter(appId, result, creditScore), 500);
    } else if (result.decision === 'rejected') {
      response = `Thank you for your patience. 🙏\n\n` +
        `Unfortunately, we're unable to approve your loan at this time.\n\n` +
        `**Reason:** ${result.reason}\n\n` +
        `💡 **Tips to improve your chances:**\n` +
        `• Improve your credit score (aim for 750+)\n` +
        `• Consider a smaller loan amount\n` +
        `• Increase your income documentation\n\n` +
        `Feel free to ask me "why was I rejected?" for more details, or say "apply again" to try with updated information! 😊`;
    } else {
      response = `Your application looks good, but needs a quick human review. ⏳\n\n` +
        `**Status:** Under Manual Review\n\n` +
        `Don't worry - no action needed from you right now! Our team will review your documents and get back to you shortly. 😊`;
    }

    addMessage('assistant', response);
    await saveChatMessage('assistant', response);
  }, [documents, loanDetails, applicationId, userId, addMessage, saveChatMessage, calculateEligibility]);

  const generateSanctionLetter = (appId: string, result: EligibilityResult, creditScore: number) => {
    setSanctionLetterData({
      applicationId: appId,
      customerName: loanDetails.name || 'Valued Customer',
      loanAmount: loanDetails.amount!,
      tenure: loanDetails.tenure!,
      interestRate: result.interestRate || 10.5,
      emiAmount: result.emiAmount || 0,
      creditScore,
      monthlyIncome: loanDetails.monthlyIncome || undefined,
    });
  };

  // Initial greeting - always fresh
  useEffect(() => {
    const timer = setTimeout(async () => {
      addMessage('assistant', "Hi there! 👋\n\nI'm your personal loan assistant. I'm here to help you apply for a loan quickly and easily.\n\nHow can I assist you today? You can:\n• Apply for a new loan\n• Check your application status\n• Ask any loan-related questions");
    }, 500);
    return () => clearTimeout(timer);
  }, [addMessage]);

  return {
    messages,
    currentStep,
    isTyping,
    loanDetails,
    documents,
    sanctionLetterData,
    processUserMessage,
    handleDocumentUpload,
  };
}
