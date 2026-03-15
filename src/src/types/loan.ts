export type ChatStep = 'greeting' | 'details' | 'documents' | 'review' | 'decision';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: DocumentAttachment[];
}

export interface DocumentAttachment {
  id: string;
  name: string;
  type: string;
  url?: string;
  status: 'uploading' | 'uploaded' | 'error';
}

export interface LoanDetails {
  name: string | null;
  amount: number | null;
  tenure: number | null;
  monthlyIncome: number | null;
  purpose?: string;
}

export interface ParsedDocumentData {
  extractedName?: string;
  extractedSalary?: number;
  creditScore?: number;
  confidence?: 'high' | 'medium' | 'low';
  rawDetails?: string;
}

export interface UploadedDocument {
  id: string;
  documentType: 'salary_slip' | 'credit_score';
  fileName: string;
  filePath: string;
  parsedData?: ParsedDocumentData;
}

export interface LoanApplication {
  id: string;
  userId: string;
  loanAmount: number;
  loanTenure: number;
  monthlyIncome: number;
  creditScore?: number;
  emiAmount?: number;
  status: 'pending' | 'approved' | 'rejected' | 'manual_review';
  aiDecision?: string;
  aiReason?: string;
}

export interface EligibilityResult {
  decision: 'approved' | 'rejected' | 'manual_review';
  reason: string;
  emiAmount?: number;
  interestRate?: number;
}
