import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

export default function RBICompliance() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            
            {/* Header Section */}
            <div className="border-b border-border pb-8 mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
                RBI Compliance & Regulatory Disclosure
              </h1>
              <div className="flex flex-wrap items-center text-sm font-medium text-muted-foreground gap-4">
                <div className="flex items-center bg-muted px-3 py-1 rounded-full">
                  <span className="font-bold text-foreground mr-2">Version:</span> 1.0
                </div>
                <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full">
                  <span className="font-bold mr-2">Effective Date:</span> January 1, 2025
                </div>
              </div>
            </div>

            <div className="space-y-12 text-muted-foreground leading-relaxed text-lg">
              
              {/* Important Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Important Notice</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-base">
                      This disclosure is provided in compliance with the Reserve Bank of India's Digital Lending Guidelines dated September 2, 2022, and subsequent circulars. All users are advised to read this document carefully before using our Platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">1.0</span>
                  Statement of Compliance with RBI Digital Lending Guidelines
                </h2>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p className="mb-4">
                    Our Platform is committed to full compliance with all applicable regulations issued by the Reserve Bank of India, particularly the Guidelines on Digital Lending dated September 2, 2022. We adhere to the principles of transparency, fairness, and consumer protection in all our operations.
                  </p>
                  <p className="mb-4 font-medium text-foreground">
                    We strictly follow the regulatory framework governing digital lending platforms, including:
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 list-disc pl-5 marker:text-blue-500 text-base bg-muted/50 p-6 rounded-xl border border-border">
                    <li>RBI Guidelines on Digital Lending (Sept 2, 2022)</li>
                    <li>Fair Practices Code for Lenders</li>
                    <li>Master Direction on KYC norms</li>
                    <li>Guidelines on IT Framework</li>
                    <li>Data storage & localization directions</li>
                    <li>Consumer protection & grievance redressal</li>
                  </ul>
                  <p className="mt-6 text-base italic text-muted-foreground">
                    We regularly review and update our policies and procedures to ensure ongoing compliance with evolving regulatory requirements and best practices in the digital lending ecosystem.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">2.0</span>
                  Role of the Platform
                </h2>
                
                <div className="space-y-8">
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                      2.1 Technology Service Provider
                    </h3>
                    <p className="mb-4 text-base">
                      This Platform functions exclusively as a technology service provider and lending facilitator. We provide a digital marketplace that connects prospective borrowers with registered lending institutions. Our role is limited to:
                    </p>
                    <ul className="space-y-2 text-base list-disc list-inside marker:text-blue-400 text-muted-foreground pl-2">
                      <li>Technology platform for loan applications</li>
                      <li>User authentication, verification & KYC</li>
                      <li>Data transmission to lending partners</li>
                      <li>AI-based credit assessment assistance</li>
                      <li>Communication facilitation</li>
                      <li>Loan servicing facilitation</li>
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                      2.2 Clear Distinction from Lending
                    </h3>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4 border border-red-100 dark:border-red-900/30">
                      <p className="text-red-800 dark:text-red-300 text-sm font-bold uppercase tracking-wide mb-1">Important Clarification</p>
                      <p className="text-red-900 dark:text-red-200 font-medium">We do not engage in any lending activities. We are not a lender, bank, NBFC, or financial institution.</p>
                    </div>
                    <p className="mb-3 font-semibold text-foreground">We DO NOT:</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-base list-disc list-inside marker:text-red-500 text-muted-foreground pl-2">
                      <li>Provide loans from own funds</li>
                      <li>Make credit decisions</li>
                      <li>Set interest rates or fees</li>
                      <li>Disburse loan amounts</li>
                      <li>Own loan receivables</li>
                      <li>Act as recovery agents</li>
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground border-t pt-4 border-border">
                      All lending decisions, loan disbursements, and recovery activities are conducted solely by our partner banks and NBFCs, independently regulated by the RBI.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">3.0</span>
                  Disclosure of Lending Partners
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">3.1 RBI-Registered Lending Institutions</h3>
                    <p>
                      All loans facilitated through our Platform are originated, approved, and disbursed exclusively by banks and Non-Banking Financial Companies (NBFCs) that are duly registered with and regulated by the Reserve Bank of India.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-6 rounded-xl border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">3.2 Lending Partner Details</h3>
                    <p className="mb-4 text-base">
                      Before you accept a loan offer, you will be provided with complete information about the lending institution, including:
                    </p>
                    <ul className="space-y-2 text-base text-muted-foreground">
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Name and registered address</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>RBI registration number/license details</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Customer service & grievance contacts</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Official website & communication channels</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Direct Loan Agreement</h3>
                    <p>
                      Your loan agreement is directly between you and the lending institution. While we facilitate the application and documentation process, the contractual relationship for the loan exists solely between you and the lender. All loan-related obligations, including repayment, are owed to the lending institution, not to the Platform.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">4.0</span>
                  No Unauthorized Lending or Deposit Acceptance
                </h2>

                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                     Statutory Declaration
                  </h3>
                  <div className="space-y-3 text-amber-800 dark:text-amber-200 text-base">
                    <p>
                      This Platform does not accept deposits of any kind from the public and does not engage in lending activities that require registration or licensing from the Reserve Bank of India.
                    </p>
                    <p>
                      We do not collect, pool, or accept money from users for the purpose of lending to others. Any payment received from users is solely for the purpose of platform fees (if applicable) or loan repayments on behalf of lending partners as a collection agent.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">4.1 Compliance with RBI</h3>
                    <p className="mb-3 text-sm text-muted-foreground">As a technology service provider, we ensure:</p>
                    <ul className="space-y-2 text-base list-disc list-inside marker:text-green-500 text-muted-foreground">
                      <li>Partners have valid RBI licenses</li>
                      <li>No representation as lender</li>
                      <li>No guaranteed approvals</li>
                      <li>Transparent regulatory disclosures</li>
                      <li>Tech & data regulation compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">4.2 User Protection</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Users are advised to verify the credentials of any lending institution before accepting a loan offer. You may check the RBI website or contact RBI directly to confirm the registration status of any bank or NBFC. We provide this information transparently on our Platform for your verification.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">5.0</span>
                  Transparent Disclosure of Interest Rates & Charges
                </h2>

                <div className="space-y-8">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">5.1 Key Fact Statement (KFS)</h3>
                    </div>
                    <p className="mb-4 text-base text-muted-foreground">In accordance with RBI guidelines, every loan offer includes a KFS disclosing:</p>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm font-medium text-foreground">
                      <div className="bg-muted/50 p-3 rounded">APR / Effective Interest Rate</div>
                      <div className="bg-muted/50 p-3 rounded">Total Payable Amount</div>
                      <div className="bg-muted/50 p-3 rounded">All Fees & Penalties</div>
                      <div className="bg-muted/50 p-3 rounded">EMI Amount & Schedule</div>
                      <div className="bg-muted/50 p-3 rounded">Late Payment Charges</div>
                      <div className="bg-muted/50 p-3 rounded">Cooling-off & Cancellation</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">5.2 No Hidden Charges</h3>
                      <p className="text-muted-foreground">
                        All charges are disclosed upfront. No hidden fees during tenure. Changes require prior notice and consent.
                      </p>
                    </div>
                    <div>
                       <h3 className="text-xl font-semibold text-foreground mb-2">5.3 Standardized Disclosure</h3>
                      <p className="text-muted-foreground">
                        Offers presented in standard format with annualized rates and total cost calculations for easy comparison.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">6.0</span>
                  Data Localization and Consent Practices
                </h2>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-muted/50 p-5 rounded-xl border border-border">
                    <h3 className="font-bold text-foreground mb-3 flex items-center">
                       <span className="text-2xl mr-2">🇮🇳</span> 6.1 Data Storage
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">All sensitive data stored exclusively on servers within India, including:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Payment transactions</li>
                      <li>Financial & Bank details</li>
                      <li>Credit & Repayment history</li>
                      <li>KYC & ID data</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-5 rounded-xl border border-border">
                    <h3 className="font-bold text-foreground mb-3 flex items-center">
                       <span className="text-2xl mr-2">✅</span> 6.2 Explicit Consent
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">We obtain explicit, informed consent compliant with RBI guidelines:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Clear explanation of data use</li>
                      <li>Identification of sharing parties</li>
                      <li>Purpose-specific consent</li>
                      <li>Simple, non-legal language</li>
                      <li>Option to withdraw consent</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-5 rounded-xl border border-border">
                    <h3 className="font-bold text-foreground mb-3 flex items-center">
                       <span className="text-2xl mr-2">🔒</span> 6.3 Sharing Protocols
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Shared only with authorized entities (lenders, bureaus, KYC agencies) via encrypted channels with strict data protection contracts.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">7.0</span>
                  Fair Practices Code Adherence
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">7.1 Commitment to Fair Practices</h3>
                    <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 marker:text-green-500 text-muted-foreground">
                      <li>Transparent disclosure of terms</li>
                      <li>Fair & ethical treatment</li>
                      <li>Non-discriminatory lending</li>
                      <li>Dignified recovery practices</li>
                      <li>Privacy protection</li>
                      <li>Responsive service</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">7.2 Prohibition of Unfair Practices</h3>
                    <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 marker:text-red-500 text-muted-foreground">
                      <li>No harassment or coercion</li>
                      <li>No unauthorized device access</li>
                      <li>No unauthorized data sharing</li>
                      <li>No undisclosed fees</li>
                      <li>No automatic renewals without consent</li>
                      <li>No misleading advertising</li>
                    </ul>
                  </div>

                   <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-2">7.3 Collection Practices</h3>
                    <p className="text-sm text-muted-foreground">
                      All recovery activities adhere to RBI guidelines. Communication is during reasonable hours via appropriate channels. Abusive or threatening practices are strictly prohibited.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">8.0</span>
                  Grievance Redressal Mechanism
                </h2>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                  {/* Tier 1 */}
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm text-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400 font-bold">1</div>
                    <h3 className="font-bold text-foreground mb-2">Customer Support</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>thakurneerajkumar017@gmail.com</p>
                      <p>8448275790</p>
                      <p className="font-medium text-green-600 dark:text-green-400 mt-2">Within 24 hours</p>
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">2</div>
                    <h3 className="font-bold text-foreground mb-2">Grievance Officer</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Neeraj Kumar</p>
                      <p>thakurneerajkumar17@gmail.com</p>
                      <p>8448275790</p>
                      <p className="font-medium text-green-600 dark:text-green-400 mt-2">Within 15 days</p>
                    </div>
                  </div>

                  {/* Tier 3 */}
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm text-center">
                    <div className="bg-gray-800 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">3</div>
                    <h3 className="font-bold text-foreground mb-2">Senior Management</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Chief Compliance Officer</p>
                      <p>thakurneerajkumar017@gmail.com</p>
                      <p className="font-medium text-orange-600 dark:text-orange-400 mt-2">After 15 days</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">8.2 Registration Channels</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                      <li>Online complaint form</li>
                      <li>Email to grievance address</li>
                      <li>Written letter to registered office</li>
                      <li>Phone call to helpline</li>
                    </ul>
                  </div>
                   <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">8.3 External Channels</h3>
                     <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                      <li>RBI CMS Portal: https://cms.rbi.org.in</li>
                      <li>Banking Ombudsman Scheme</li>
                      <li>NBFC Ombudsman</li>
                      <li>Consumer Forums</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">9.0</span>
                  RBI Consumer Awareness
                </h2>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Consumer Advisory from RBI
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-blue-800 dark:text-blue-200 font-medium">
                     <li>Borrow only from RBI-registered banks and NBFCs</li>
                     <li>Check credentials before accepting loans</li>
                     <li>Read all terms, interest rates, and fees carefully</li>
                     <li>Report unauthorized lending to RBI</li>
                  </ul>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2 text-sm">9.1 Verification</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>RBI Website (rbi.org.in)</li>
                      <li>List of registered NBFCs</li>
                      <li>RBI Grievance Dept</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2 text-sm">9.2 Fraud Protection</h4>
                     <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Never share OTPs/Passwords</li>
                      <li>Verify disbursement source</li>
                      <li>Beware of unsolicited offers</li>
                      <li>Report suspicious apps</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2 text-sm">9.3 Responsibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Borrow responsibly. Assess repayment capacity. Excessive borrowing impacts credit scores.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">10.0</span>
                  Regulatory Monitoring
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                   <div className="border border-border p-4 rounded-lg shadow-sm">
                     <h3 className="font-bold text-foreground mb-1">Ongoing Compliance</h3>
                     <p className="text-sm text-muted-foreground">Continuous monitoring of RBI circulars and updates.</p>
                   </div>
                   <div className="border border-border p-4 rounded-lg shadow-sm">
                     <h3 className="font-bold text-foreground mb-1">Disclosure Updates</h3>
                     <p className="text-sm text-muted-foreground">Material changes notified via email or platform.</p>
                   </div>
                   <div className="border border-border p-4 rounded-lg shadow-sm">
                     <h3 className="font-bold text-foreground mb-1">Coordination</h3>
                     <p className="text-sm text-muted-foreground">Full cooperation with audits, inquiries, and investigations.</p>
                   </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">11. Contact for Regulatory Matters</h2>
                <div className="bg-muted/50 border border-border rounded-2xl p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-foreground uppercase tracking-wide text-xs mb-4">Platform Compliance Officer</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <p><span className="font-medium text-foreground w-24 inline-block">Name:</span> Neeraj Kumar</p>
                        <p><span className="font-medium text-foreground w-24 inline-block">Designation:</span> Chief Compliance Officer</p>
                        <p><span className="font-medium text-foreground w-24 inline-block">Email:</span> thakurneerajkumar017@gmail.com</p>
                        <p><span className="font-medium text-foreground w-24 inline-block">Phone:</span> 8448275790</p>
                      </div>
                    </div>
                    <div>
                       <h4 className="font-bold text-foreground uppercase tracking-wide text-xs mb-4">Corporate Details</h4>
                       <div className="space-y-4">
                         <div>
                           <p className="text-sm font-medium text-muted-foreground mb-1">Registered Office Address</p>
                           <p className="text-foreground">Barola Sector-49 Noida, India</p>
                         </div>
                         <div>
                           <p className="text-sm font-medium text-muted-foreground mb-1">Corporate Identity Number (CIN)</p>
                           <p className="text-foreground font-mono">2201920130111</p>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Important Resources */}
              <section className="mt-8">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-4">Important RBI Resources</h3>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-amber-800 dark:text-amber-200">
                    <a href="https://www.rbi.org.in" className="hover:underline flex items-center">
                      <span className="mr-2">🔗</span> RBI Official Website
                    </a>
                    <a href="https://cms.rbi.org.in" className="hover:underline flex items-center">
                      <span className="mr-2">🔗</span> RBI Complaint Management System
                    </a>
                    <a href="https://sachet.rbi.org.in" className="hover:underline flex items-center">
                      <span className="mr-2">🔗</span> RBI SACHET Portal
                    </a>
                    <a href="#" className="hover:underline flex items-center">
                      <span className="mr-2">📄</span> RBI Digital Lending Guidelines
                    </a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChatbot/>
    </div>
  );
}