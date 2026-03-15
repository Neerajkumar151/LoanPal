import { useState } from 'react';
import { Download, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateSanctionLetterPDF } from '@/lib/generateSanctionLetterPDF';

interface SanctionLetterButtonProps {
  applicationId: string;
  customerName: string;
  loanAmount: number;
  tenure: number;
  interestRate: number;
  emiAmount: number;
  creditScore?: number;
  monthlyIncome?: number;
}

export function SanctionLetterButton({
  applicationId,
  customerName,
  loanAmount,
  tenure,
  interestRate,
  emiAmount,
  creditScore,
  monthlyIncome,
}: SanctionLetterButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      await generateSanctionLetterPDF({
        applicationId,
        customerName,
        loanAmount,
        tenure,
        interestRate,
        emiAmount,
        creditScore,
        monthlyIncome,
      });
      setIsDownloaded(true);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDownloaded) {
    return (
      <div className="flex justify-center my-4 animate-fade-in">
        <div className="flex items-center gap-2 text-success bg-success/10 px-4 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Sanction letter downloaded successfully!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4 animate-fade-in">
      <Button
        onClick={handleDownload}
        disabled={isLoading}
        className="bg-success hover:bg-success/90 text-accent-foreground gap-2"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        {isLoading ? 'Generating...' : 'Download Sanction Letter'}
        {!isLoading && <Download className="w-4 h-4" />}
      </Button>
    </div>
  );
}
