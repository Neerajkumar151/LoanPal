import jsPDF from 'jspdf';

interface SanctionLetterData {
  applicationId: string;
  customerName: string;
  loanAmount: number;
  tenure: number;
  interestRate: number;
  emiAmount: number;
  creditScore?: number;
  monthlyIncome?: number;
}

// Helper to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function generateSanctionLetterPDF(data: SanctionLetterData): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 25;

  // Load and register Roboto fonts for Unicode support (₹ symbol)
  try {
    const [regularResponse, boldResponse] = await Promise.all([
      fetch('/fonts/Roboto-Regular.ttf'),
      fetch('/fonts/Roboto-Bold.ttf')
    ]);

    if (regularResponse.ok && boldResponse.ok) {
      const regularBuffer = await regularResponse.arrayBuffer();
      const boldBuffer = await boldResponse.arrayBuffer();

      const regularBase64 = arrayBufferToBase64(regularBuffer);
      const boldBase64 = arrayBufferToBase64(boldBuffer);

      doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
      doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
      doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
      doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
    }
  } catch (error) {
    console.warn('Could not load Roboto fonts, falling back to helvetica:', error);
  }

  // Check if Roboto is available, otherwise use helvetica
  const fontFamily = doc.getFontList()['Roboto'] ? 'Roboto' : 'helvetica';

  // Helper functions
  const formatCurrency = (amount: number) => 
    `₹${amount.toLocaleString('en-IN')}`;

  const drawLine = (yPos: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  // Header
  doc.setFontSize(22);
  doc.setFont(fontFamily, 'bold');
  doc.setTextColor(33, 37, 41);
  doc.text('LOAN SANCTION LETTER', pageWidth / 2, y, { align: 'center' });
  y += 15;

  drawLine(y);
  y += 10;

  // Reference and Date
  doc.setFontSize(10);
  doc.setFont(fontFamily, 'normal');
  doc.setTextColor(100, 100, 100);
  
  const refNo = `SL/${data.applicationId.slice(0, 8).toUpperCase()}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  doc.text(`Ref No: ${refNo}`, margin, y);
  doc.text(`Date: ${currentDate}`, pageWidth - margin, y, { align: 'right' });
  y += 15;

  // Recipient
  doc.setFontSize(11);
  doc.setTextColor(33, 37, 41);
  doc.setFont(fontFamily, 'bold');
  doc.text('To,', margin, y);
  y += 6;
  doc.setFont(fontFamily, 'normal');
  doc.text(data.customerName, margin, y);
  y += 12;

  // Subject
  doc.setFont(fontFamily, 'bold');
  doc.text('Subject: Loan Sanction Approval', margin, y);
  y += 12;

  // Salutation and intro
  doc.setFont(fontFamily, 'normal');
  doc.setFontSize(10);
  doc.text(`Dear ${data.customerName},`, margin, y);
  y += 8;

  const introText = 'We are pleased to inform you that your Personal Loan application has been reviewed and approved. Based on the assessment of your credit profile and submitted financial documents, we are delighted to offer you a personal loan under the following terms and conditions:';
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, y);
  y += introLines.length * 5 + 10;

  // Loan Details Header
  doc.setFontSize(12);
  doc.setFont(fontFamily, 'bold');
  doc.text('LOAN DETAILS', pageWidth / 2, y, { align: 'center' });
  y += 10;

  // Calculate totals
  const totalPayable = data.emiAmount * data.tenure;
  const processingFee = Math.round(data.loanAmount * 0.02);
  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + 30);
  const validityStr = validityDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Table data
  const tableData = [
    ['Loan Amount', formatCurrency(data.loanAmount)],
    ['Tenure', `${data.tenure} Months`],
    ['Interest Rate', `${data.interestRate}% p.a.`],
    ['Monthly EMI', formatCurrency(data.emiAmount)],
    ['Total Payable', formatCurrency(totalPayable)],
    ['Processing Fee', `${formatCurrency(processingFee)} (2%)`],
    ['Validity', `Valid until ${validityStr}`],
  ];

  // Draw table with proper alignment
  const tableStartY = y;
  const rowHeight = 12; // Increased for better spacing
  const colWidth = contentWidth / 2;
  const cellPadding = 8;

  doc.setFontSize(10);
  
  tableData.forEach((row, index) => {
    const rowTopY = tableStartY + index * rowHeight;
    const textY = rowTopY + rowHeight / 2 + 3; // Proper vertical centering
    
    // Alternating background
    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250);
      doc.rect(margin, rowTopY, contentWidth, rowHeight, 'F');
    }
    
    // Draw outer border for the row
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.rect(margin, rowTopY, contentWidth, rowHeight);
    
    // Draw vertical divider between columns
    doc.line(margin + colWidth, rowTopY, margin + colWidth, rowTopY + rowHeight);
    
    // Label (bold) - left column
    doc.setFont(fontFamily, 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text(row[0], margin + cellPadding, textY);
    
    // Value (normal) - right column
    doc.setFont(fontFamily, 'normal');
    doc.setTextColor(33, 37, 41);
    doc.text(row[1], margin + colWidth + cellPadding, textY);
  });

  y = tableStartY + tableData.length * rowHeight + 15;

  // Terms and Conditions
  doc.setFontSize(11);
  doc.setFont(fontFamily, 'bold');
  doc.setTextColor(33, 37, 41);
  doc.text('Terms and Conditions:', margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont(fontFamily, 'normal');
  doc.setTextColor(60, 60, 60);

  const terms = [
    'This sanction letter is valid for 30 days from the date of issue.',
    'Loan disbursement is subject to successful completion of documentation.',
    'Interest rates are subject to RBI guidelines and lender policy.',
    'Prepayment charges of 2% apply before completion of 12 EMIs.',
    `Late payment attracts ${formatCurrency(500)} plus 2% interest on the overdue amount.`,
    'Borrower must maintain adequate life insurance coverage.',
    'Sanction is subject to verification of submitted documents.',
  ];

  terms.forEach((term, index) => {
    const termText = `${index + 1}. ${term}`;
    const termLines = doc.splitTextToSize(termText, contentWidth - 5);
    doc.text(termLines, margin + 3, y);
    y += termLines.length * 4 + 4;
  });

  y += 10;

  // Footer
  drawLine(y);
  y += 8;
  
  doc.setFontSize(9);
  doc.setFont(fontFamily, 'italic');
  doc.setTextColor(120, 120, 120);
  doc.text('This is a system-generated document and does not require a signature.', margin, y);
  y += 5;
  doc.text('For any assistance, please contact customer support.', margin, y);

  // Save PDF
  doc.save(`Sanction_Letter_${refNo.replace('/', '_')}.pdf`);
}
