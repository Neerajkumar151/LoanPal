import React, { useState } from 'react';
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingChatbot from '@/components/FloatingChatbot';

export default function HelpCenter() {
  // Simple state for FAQ accordion toggle
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I apply for a loan?",
      answer: "Applying is simple. Log in to your account, complete your KYC verification (Aadhaar/PAN), and go to the 'Apply Now' section. Our AI will assess your profile and show you available loan offers instantly."
    },
    {
      question: "Why was my loan application rejected?",
      answer: "Rejections can happen due to various reasons such as low credit score, insufficient income, unverifiable documents, or not meeting specific lender criteria. You can check the specific reason in your application status or contact support."
    },
    {
      question: "How long does disbursement take?",
      answer: "Once your loan is approved and the agreement is digitally signed, the amount is usually disbursed to your bank account within 2 to 24 hours, depending on the lending partner's processing time."
    },
    {
      question: "Is my personal data safe?",
      answer: "Yes, absolutely. We are ISO 27001 certified and compliant with RBI's digital lending guidelines. Your data is encrypted using 256-bit SSL and stored on secure servers located exclusively within India."
    },
    {
      question: "Can I prepay my loan?",
      answer: "Yes, you can prepay or foreclose your loan at any time. However, some lending partners may charge a nominal prepayment fee. Please check your Key Fact Statement (KFS) for specific terms."
    },
    {
      question: "What happens if I miss an EMI?",
      answer: "Missing an EMI may attract late payment charges and negatively impact your credit score. We recommend setting up auto-debit (eNACH) to avoid accidental misses. If you are facing financial difficulty, please contact us immediately."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          
          {/* Hero / Search Section */}
          <div className="bg-blue-600 dark:bg-blue-700 px-8 py-16 sm:px-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
               <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
               </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
              How can we help you today?
            </h1>
            <p className="text-blue-100 text-lg mb-8 relative z-10">
              Find answers to common questions about loans, repayments, and account security.
            </p>
            
            <div className="max-w-2xl mx-auto relative z-10">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for help (e.g., 'interest rate', 'KYC', 'repayment')"
                  className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg border-none focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800 bg-white"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-12 sm:px-12">
            
            {/* Quick Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { title: "Getting Started", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
                { title: "My Account", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { title: "Repayments", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
                { title: "Security", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
              ].map((cat, idx) => (
                <div key={idx} className={`${cat.bg} rounded-xl p-6 text-center cursor-pointer hover:shadow-md transition-shadow border border-transparent hover:border-border`}>
                  <div className={`${cat.color} w-10 h-10 mx-auto mb-3`}>
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon}></path></svg>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{cat.title}</h3>
                </div>
              ))}
            </div>

            {/* Frequently Asked Questions */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-xl overflow-hidden">
                    <button 
                      onClick={() => toggleSection(index)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center bg-card hover:bg-muted/50 transition-colors focus:outline-none"
                    >
                      <span className="font-semibold text-foreground text-lg">{faq.question}</span>
                      <svg 
                        className={`w-5 h-5 text-muted-foreground transform transition-transform duration-200 ${openSection === index ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {openSection === index && (
                      <div className="px-6 pb-6 pt-2 bg-muted/30 text-muted-foreground leading-relaxed border-t border-border">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Still Need Help? Contact Section */}
            <section className="bg-muted/50 rounded-2xl p-8 border border-border text-center">
              <h2 className="text-xl font-bold text-foreground mb-3">Still need help?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Our support team is available Monday to Saturday, 9:00 AM to 7:00 PM IST to assist you with any queries.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4 text-blue-600 dark:text-blue-400 shrink-0">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  </div>
  
  {/* Added 'flex-1' and 'min-w-0' to this wrapper div */}
  <div className="text-left flex-1 min-w-0">
    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">Email Support</p>
    
    {/* Added 'break-all' to the anchor tag */}
    <a href="mailto:thakurneerajkumar017@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all">
      thakurneerajkumar017@gmail.com
    </a>
  </div>
</div>

                <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4 text-green-600 dark:text-green-400">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">Call Us</p>
                    <p className="text-foreground font-semibold">+91 8448275790</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
      <FloatingChatbot/>
    </div>
  );
}