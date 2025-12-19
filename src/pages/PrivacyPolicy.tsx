import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            
            {/* Page Title Header */}
            <div className="border-b border-border pb-8 mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Privacy Policy
              </h1>
              <div className="flex items-center text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold mr-3">Effective Date</span>
                <span>January 1, 2025</span>
              </div>
            </div>

            <div className="space-y-12 text-muted-foreground leading-relaxed text-lg">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">1.0</span>
                  Introduction and Scope
                </h2>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p className="mb-6">
                    This Privacy Policy describes how we collect, use, store, share, and protect your personal information when you use our Platform to access loan services. The Platform operates as a technology service provider that connects users with registered lending institutions including banks and Non-Banking Financial Companies (NBFCs) licensed by the Reserve Bank of India.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-500 p-5 rounded-r-lg">
                    <p className="text-blue-900 dark:text-blue-100 text-base m-0">
                      By using our services, you consent to the collection and use of your information as described in this policy. We are committed to protecting your privacy and handling your data in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian laws.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">2.0</span>
                  Types of Data Collected
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="bg-muted/50 p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      2.1 Personal Information
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider font-semibold">We collect:</p>
                    <ul className="space-y-2 text-base list-disc list-inside marker:text-blue-500 dark:marker:text-blue-400">
                      <li>Full name, date of birth, gender, photograph</li>
                      <li>Contact details (mobile, email, address)</li>
                      <li>Government IDs (Aadhaar, PAN, etc.)</li>
                      <li>Employment & income details</li>
                      <li>Educational qualifications</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      2.2 Financial Information
                    </h3>
                    <ul className="space-y-2 text-base list-disc list-inside marker:text-green-500 dark:marker:text-green-400">
                      <li>Bank account details & statements</li>
                      <li>Credit history & scores</li>
                      <li>Transaction & payment records</li>
                      <li>IT returns & salary slips</li>
                      <li>Existing loans & liabilities</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                      2.3 Device & Technical Info
                    </h3>
                    <ul className="space-y-2 text-base list-disc list-inside marker:text-purple-500 dark:marker:text-purple-400">
                      <li>Device IDs, IP, browser, OS</li>
                      <li>Mobile model & unique ID</li>
                      <li>Location data (with consent)</li>
                      <li>App usage & interaction data</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                      2.4 Usage Information
                    </h3>
                    <ul className="space-y-2 text-base list-disc list-inside marker:text-orange-500 dark:marker:text-orange-400">
                      <li>Pages visited & time spent</li>
                      <li>Search queries & history</li>
                      <li>Support interactions & feedback</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">3.0</span>
                  Purpose of Data Collection
                </h2>
                <p className="mb-4 text-foreground font-medium">We collect and use your information for the following purposes:</p>
                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <ul className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 list-disc pl-5 marker:text-blue-500 dark:marker:text-blue-400 text-base">
                    <li>To verify your identity and prevent fraud</li>
                    <li>To assess creditworthiness & process loans</li>
                    <li>To facilitate communication with lenders</li>
                    <li>To comply with legal/KYC requirements</li>
                    <li>To improve services via data analysis</li>
                    <li>To send updates & promotions (with consent)</li>
                    <li>To provide support & resolve disputes</li>
                    <li>To detect & prevent technical issues</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">4.0</span>
                  AI and Automated Decision-Making
                </h2>
                <div className="prose prose-lg text-muted-foreground max-w-none space-y-4">
                  <p>
                    Our Platform uses artificial intelligence and machine learning algorithms to assess credit applications, determine loan eligibility, and recommend suitable loan products. These automated systems analyze various data points including your financial history, employment status, transaction patterns, and credit bureau information.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-4 rounded-r-lg">
                    <p className="text-amber-800 dark:text-amber-200 text-base font-medium m-0">
                      Note: While AI assists in the evaluation, final lending decisions are made by our partner banks and NBFCs. You have the right to request human intervention.
                    </p>
                  </div>
                  <p>
                    We regularly audit our AI systems to ensure fairness, accuracy, and compliance with applicable regulations. Our algorithms do not discriminate based on caste, religion, gender, or other protected characteristics.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">5.0</span>
                  Data Storage and Security
                </h2>
                <p className="mb-6">
                  We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start p-4 bg-background dark:bg-muted/20 border border-border rounded-lg shadow-sm">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4 text-blue-600 dark:text-blue-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">Encryption</h4>
                      <p className="text-sm text-muted-foreground">Data encrypted in transit & at rest using SSL/TLS.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-background dark:bg-muted/20 border border-border rounded-lg shadow-sm">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 text-green-600 dark:text-green-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">Audits & Backups</h4>
                      <p className="text-sm text-muted-foreground">Regular security audits, vulnerability assessments & secure backups.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-background dark:bg-muted/20 border border-border rounded-lg shadow-sm">
                     <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4 text-purple-600 dark:text-purple-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">Access Control</h4>
                      <p className="text-sm text-muted-foreground">Strict limitation of data access to authorized personnel only.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-background dark:bg-muted/20 border border-border rounded-lg shadow-sm">
                     <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-4 text-orange-600 dark:text-orange-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">Data Localization</h4>
                      <p className="text-sm text-muted-foreground">Indian user data stored exclusively on servers within India.</p>
                    </div>
                  </div>
                </div>
                
                <p>
                  While we strive to protect your data, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security but commit to promptly notifying you and relevant authorities in the event of any data breach.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">6.0</span>
                  Data Sharing and Disclosure
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-muted/50 p-5 rounded-lg border border-border">
                    <h3 className="font-bold text-foreground text-lg mb-2">6.1 Lending Partners</h3>
                    <p className="text-base text-muted-foreground">Shared with RBI-registered banks/NBFCs for loan processing, disbursement, and servicing.</p>
                  </div>
                  <div className="bg-muted/50 p-5 rounded-lg border border-border">
                     <h3 className="font-bold text-foreground text-lg mb-2">6.2 Credit Bureaus</h3>
                    <p className="text-base text-muted-foreground">Shared with CIBIL, Equifax, Experian, etc., for credit assessment and reporting.</p>
                  </div>
                  <div className="bg-muted/50 p-5 rounded-lg border border-border">
                     <h3 className="font-bold text-foreground text-lg mb-2">6.3 Service Providers</h3>
                    <p className="text-base text-muted-foreground">Shared with providers for KYC, payments, cloud hosting, analytics, and support.</p>
                  </div>
                  <div className="bg-muted/50 p-5 rounded-lg border border-border">
                     <h3 className="font-bold text-foreground text-lg mb-2">6.4 Legal & Business</h3>
                    <p className="text-base text-muted-foreground">Disclosed if required by law, or transferred during mergers/acquisitions.</p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">7.0</span>
                  User Rights
                </h2>
                <p className="mb-4 font-medium text-foreground">You have the following rights regarding your personal information:</p>
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <ul className="divide-y divide-border">
                    <li className="p-4 hover:bg-muted transition-colors flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1">✓</span>
                      <div>
                         <strong className="block text-foreground">Right to Access</strong>
                         <span className="text-sm text-muted-foreground">Request a copy of your personal data.</span>
                      </div>
                    </li>
                     <li className="p-4 hover:bg-muted transition-colors flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1">✓</span>
                      <div>
                         <strong className="block text-foreground">Right to Correction</strong>
                         <span className="text-sm text-muted-foreground">Update inaccurate information via settings or support.</span>
                      </div>
                    </li>
                     <li className="p-4 hover:bg-muted transition-colors flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1">✓</span>
                      <div>
                         <strong className="block text-foreground">Right to Deletion</strong>
                         <span className="text-sm text-muted-foreground">Request data deletion (subject to retention laws).</span>
                      </div>
                    </li>
                     <li className="p-4 hover:bg-muted transition-colors flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1">✓</span>
                      <div>
                         <strong className="block text-foreground">Right to Withdraw Consent</strong>
                         <span className="text-sm text-muted-foreground">Stop data processing at any time (may affect service).</span>
                      </div>
                    </li>
                  </ul>
                </div>
                 <p className="mt-4 text-sm text-muted-foreground italic">
                  To exercise these rights, please contact our grievance officer.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                 <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">8.0</span>
                  Cookies and Tracking Technologies
                </h2>
                <p className="mb-4">
                  We use cookies to enhance experience, analyze usage, and deliver personalized content.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border">Essential Cookies</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border">Performance Cookies</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border">Functional Cookies</span>
                   <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border">Advertising Cookies</span>
                </div>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of the Platform.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">9.0</span>
                  Data Retention Policy
                </h2>
                <p className="mb-4">We retain data as long as necessary or required by law.</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500 dark:marker:text-blue-400">
                  <li><strong>Active User Data:</strong> Duration of account + regulatory periods.</li>
                  <li><strong>Financial Records:</strong> Minimum 10 years (RBI guidelines).</li>
                  <li><strong>KYC Documents:</strong> At least 5 years after closure.</li>
                  <li><strong>Communication:</strong> Reasonable period for service improvement.</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">10.0</span>
                  Grievance Redressal
                </h2>
                 <p className="mb-6">
                  In accordance with the IT Act, 2000, we have appointed a Grievance Officer to address your privacy concerns.
                </p>
                <div className="bg-muted/50 p-6 rounded-xl border border-border shadow-sm">
                   <h3 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Grievance Officer Details</h3>
                   <div className="grid md:grid-cols-2 gap-4 text-base">
                      <div>
                        <p className="text-muted-foreground text-sm">Name</p>
                        <p className="font-medium text-foreground">Neeraj Kumar</p>
                      </div>
                       <div>
                        <p className="text-muted-foreground text-sm">Email</p>
                        <p className="font-medium text-blue-600 dark:text-blue-400">thakurneerajkumar017@gmail.com</p>
                      </div>
                       <div>
                        <p className="text-muted-foreground text-sm">Phone</p>
                        <p className="font-medium text-foreground">8448275790</p>
                      </div>
                       <div>
                        <p className="text-muted-foreground text-sm">Working Hours</p>
                        <p className="font-medium text-foreground">Mon-Fri, 10:00 AM - 6:00 PM IST</p>
                      </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                     Complaints acknowledged within 24 hours and resolved within 15 days.
                   </div>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                 <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center group">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded mr-4">11.0</span>
                  Updates to This Policy
                </h2>
                <div className="prose text-muted-foreground">
                  <p>
                    We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on the Platform and updating the "Effective Date". For significant changes, we will provide prominent notice. Your continued use constitutes acceptance.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="mb-6">
                  If you have questions regarding this Privacy Policy, please contact us at:
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-card p-6 rounded-xl border border-border text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-foreground mb-2">Privacy Inquiries</h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">thakurneerajkumar017@gmail.com</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-foreground mb-2">Customer Support</h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">thakurneerajkumar017@gmail.com</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-foreground mb-2">Registered Office</h4>
                    <p className="text-muted-foreground text-sm">Barola Sector-49 Noida, India</p>
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