import React, { useState } from 'react';
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingChatbot from '@/components/FloatingChatbot';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'eligibility', label: 'Eligibility & Documents' },
    { id: 'repayment', label: 'Repayment & EMIs' },
    { id: 'security', label: 'Security & Privacy' },
  ];

  const faqs = {
    general: [
      {
        question: "What is this platform?",
        answer: "We are a digital lending platform that connects borrowers with RBI-registered banks and NBFCs. We use technology to make loan applications faster, paperless, and transparent."
      },
      {
        question: "Is there a fee to apply for a loan?",
        answer: "No, applying for a loan on our platform is completely free. Processing fees are only applicable if your loan is approved and you choose to accept the offer. These fees are deducted from the disbursement amount."
      },
      {
        question: "How do I check my application status?",
        answer: "You can track your application status in real-time by logging into your account and visiting the 'Dashboard' or 'My Loans' section."
      }
    ],
    eligibility: [
      {
        question: "What are the eligibility criteria?",
        answer: "To apply, you must be an Indian citizen, aged between 21 and 60 years, with a monthly income of at least ₹15,000. You must also have a valid PAN card and Aadhaar card."
      },
      {
        question: "Do I need a high credit score?",
        answer: "While a credit score of 700+ is preferred, we also consider other factors like income stability and banking history. We have partners who cater to new-to-credit customers as well."
      },
      {
        question: "What documents are required?",
        answer: "You strictly need: 1) Identity Proof (PAN/Aadhaar), 2) Address Proof, 3) Bank Statements (last 3 months), and 4) A selfie for liveness check. All processes are digital."
      }
    ],
    repayment: [
      {
        question: "How do I repay my loan?",
        answer: "We recommend setting up e-NACH (auto-debit) for hassle-free repayments. You can also pay manually via UPI, Debit Card, or Net Banking through our app."
      },
      {
        question: "Can I prepay or foreclose my loan?",
        answer: "Yes, foreclosure is allowed. Depending on the lending partner, there might be a minimum lock-in period (usually 3-6 months) or a nominal foreclosure charge. Check your loan agreement for details."
      },
      {
        question: "What happens if I delay my EMI payment?",
        answer: "Delayed payments attract penal charges as per the policy of the lender. Additionally, it will negatively impact your credit score, reducing your chances of getting loans in the future."
      }
    ],
    security: [
      {
        question: "Is my personal data safe?",
        answer: "Absolutely. We use bank-grade 256-bit SSL encryption to protect your data. We are ISO 27001 certified and strictly adhere to RBI's data localization and privacy guidelines."
      },
      {
        question: "Do you share my data with third parties?",
        answer: "We only share your data with registered lending partners, credit bureaus, and verification agencies necessary to process your loan. We never sell your data to third-party marketers."
      }
    ]
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className="px-8 py-12 sm:px-12">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about our services, application process, and security.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenQuestion(null); }}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? "bg-blue-600 dark:bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                      : "bg-background text-muted-foreground border-border hover:bg-muted hover:border-muted-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4 min-h-[400px]">
              {faqs[activeCategory].map((item, index) => (
                <div 
                  key={index} 
                  className={`border rounded-xl transition-all duration-300 ${
                    openQuestion === index 
                      ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm" 
                      : "border-border bg-card hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className={`font-bold text-lg ${openQuestion === index ? "text-blue-800 dark:text-blue-300" : "text-foreground"}`}>
                      {item.question}
                    </span>
                    <div className={`ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all ${
                      openQuestion === index ? "bg-blue-600 border-blue-600 text-white rotate-180" : "bg-card border-border text-muted-foreground"
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openQuestion === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed border-t border-transparent">
                      <p className="pt-2">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 bg-slate-900 dark:bg-slate-950 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden border border-slate-800">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-slate-800 dark:bg-slate-900 rounded-full opacity-50 blur-2xl"></div>
               <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-900/50 rounded-full opacity-50 blur-2xl"></div>

               <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Can't find what you're looking for?</h3>
               <p className="text-slate-400 mb-8 relative z-10 max-w-lg mx-auto">
                 Our friendly support team is here to help you with any specific questions or technical issues.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                 <a href="mailto:support@platform.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-lg">
                   <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   Email Support
                 </a>
                 <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-lg text-white hover:bg-slate-800 transition-colors">
                   Contact Us
                 </a>
               </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <FloatingChatbot/>
    </div>
  );
}