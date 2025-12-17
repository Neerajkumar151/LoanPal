import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            
            {/* Page Title */}
            <div className="border-b border-border pb-8 mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Terms of Service
              </h1>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Last Updated: <span className="text-foreground">January 1, 2025</span>
              </p>
            </div>

            <div className="space-y-12 text-muted-foreground leading-relaxed text-lg">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">1.0</span>
                  Acceptance of Terms
                </h2>
                <p className="mb-6">
                  These Terms of Service constitute a legally binding agreement between you and the Platform governing your access to and use of our services. By registering an account, accessing our website or mobile application, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                </p>
                <p className="mb-6">
                  If you do not agree to these Terms, you must immediately cease using our Platform and services. These Terms apply to all users including visitors, registered users, borrowers, and any person or entity accessing our Platform.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-900 dark:text-blue-100 text-base">
                    These Terms should be read in conjunction with our Privacy Policy, which explains how we collect, use, and protect your personal information. By accepting these Terms, you also consent to our data practices as described in the Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">2.0</span>
                  Eligibility Criteria
                </h2>
                <p className="mb-6">To use our services, you must meet the following eligibility requirements:</p>

                <div className="space-y-6 pl-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Age Requirement</h3>
                    <p>
                      You must be at least 18 years of age or the age of majority in your jurisdiction, whichever is higher. By using our Platform, you represent and warrant that you meet this age requirement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Residency</h3>
                    <p>
                      You must be a resident of India and possess valid Indian identity documents. Our services are currently available only to Indian citizens and residents who maintain a permanent address in India.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Legal Capacity</h3>
                    <p>
                      You must have the legal capacity to enter into binding contracts under Indian law. You must not be declared insolvent, bankrupt, or subject to any legal disability that would prevent you from entering into financial agreements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">2.4 Additional Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2 marker:text-blue-500 dark:marker:text-blue-400">
                      <li>You must have a valid mobile number and email address for verification</li>
                      <li>You must possess government-issued identification documents (Aadhaar, PAN, etc.)</li>
                      <li>You must have a bank account in your name with an Indian bank</li>
                      <li>You must not have been previously banned from using our Platform</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">3.0</span>
                  Account Registration and Responsibility
                </h2>
                <p className="mb-6">
                  To access loan services, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials, including your username, password, and OTP codes.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-muted/50 p-5 rounded-xl border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-3">3.1 Account Security</h3>
                    <p className="text-base text-muted-foreground">
                      You agree to notify us immediately of any unauthorized access to or use of your account. You are solely responsible for all activities that occur under your account, whether authorized by you or not. We will not be liable for any loss or damage arising from your failure to maintain account security.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-5 rounded-xl border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-3">3.2 Accurate Information</h3>
                    <p className="text-base text-muted-foreground">
                      You must provide truthful, accurate, and complete information during registration and throughout your use of the Platform. You must promptly update your information if it changes. Providing false or misleading information may result in account suspension, loan rejection, legal action, or reporting to credit bureaus and law enforcement authorities.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Single Account Policy</h3>
                  <p>
                    You may maintain only one active account per individual. Creating multiple accounts to circumvent loan limits, hide credit history, or engage in fraudulent activities is strictly prohibited and will result in immediate termination of all accounts.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">4.0</span>
                  AI-Based Credit Assessment Disclaimer
                </h2>
                <p className="mb-6">
                  Our Platform utilizes artificial intelligence and machine learning algorithms to evaluate loan applications and assess creditworthiness. These automated systems analyze multiple data points including but not limited to your credit history, income, employment status, transaction patterns, and other financial indicators.
                </p>

                <div className="space-y-6 pl-4 border-l-2 border-border">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">4.1 Nature of AI Assessment</h3>
                    <p>
                      The AI-based assessment provides recommendations and preliminary evaluations to assist lending partners in their decision-making process. However, the final decision to approve or reject a loan application rests solely with our partner banks and NBFCs, which are registered and regulated by the Reserve Bank of India.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">4.2 No Guarantee of Approval</h3>
                    <p>
                      Using our Platform and completing a loan application does not guarantee approval. Credit decisions are based on multiple factors including lender-specific policies, risk appetite, regulatory requirements, and your individual financial profile. We do not influence, control, or override lending decisions made by our partner institutions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">4.3 Right to Review</h3>
                    <p>
                      If your application is rejected based on automated assessment, you have the right to request a manual review by contacting our customer support. We will work with the relevant lending partner to provide you with reasons for rejection and, where applicable, facilitate human intervention in the decision-making process.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">5.0</span>
                  Loan Application, Approval, and Rejection
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">5.1 Application Process</h3>
                    <p>
                      When you submit a loan application through our Platform, we facilitate the transmission of your information to one or more lending partners. The application process involves identity verification, credit assessment, income verification, and risk evaluation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">5.2 Conditional Approval</h3>
                    <p>
                      An approval indication or pre-approved offer displayed on the Platform is conditional and subject to final verification by the lending partner. The actual loan amount, interest rate, tenure, and terms may differ from the initial indication based on detailed assessment and lender policies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">5.3 Right to Reject</h3>
                    <p>
                      Lending partners reserve the right to reject any application at their sole discretion without providing detailed reasons. Common reasons for rejection include insufficient credit history, low credit score, high existing debt obligations, irregular income, or failure to meet lender-specific criteria.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">5.4 Credit Bureau Reporting</h3>
                    <p>
                      Your loan application and subsequent loan account will be reported to credit information companies. This includes information about loan disbursement, repayment history, defaults, and settlements. This reporting affects your credit score and future borrowing ability.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">6.0</span>
                  Interest Rates, Fees, and Repayment Obligations
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">6.1 Interest Rates</h3>
                    <p>
                      Interest rates are determined by the lending partner based on your credit profile, loan amount, tenure, and prevailing market conditions. The applicable interest rate will be clearly disclosed in the loan agreement before disbursement. Interest rates may be fixed or floating as specified in your loan terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">6.2 Fees and Charges</h3>
                    <p>
                      Loans may be subject to various fees including processing fees, documentation charges, prepayment penalties, late payment fees, and bounce charges. All applicable fees will be disclosed upfront in the loan agreement. No hidden charges will be levied without prior notification.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">6.3 EMI Obligations</h3>
                    <p>
                      You are obligated to repay the loan in equated monthly installments (EMIs) as per the agreed schedule. EMIs include both principal and interest components. You must ensure sufficient funds in your designated bank account on or before the EMI due date to avoid default and penalties.
                    </p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-100 dark:border-red-900/30">
                    <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-3">6.4 Consequences of Default</h3>
                    <p className="mb-3 text-red-900 dark:text-red-200">
                      Failure to repay EMIs on time constitutes default and may result in:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-red-800 dark:text-red-300 marker:text-red-500 dark:marker:text-red-400">
                      <li>Late payment fees and penalty charges</li>
                      <li>Negative impact on your credit score and credit report</li>
                      <li>Loss of access to future loans and credit facilities</li>
                      <li>Legal action including recovery proceedings under applicable laws</li>
                      <li>Reporting to credit bureaus and collection agencies</li>
                      <li>Communication with your employer or references for recovery purposes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">6.5 Prepayment and Foreclosure</h3>
                    <p>
                      You may prepay or foreclose your loan before the end of the tenure, subject to applicable prepayment charges as specified in the loan agreement. Prepayment terms and conditions are determined by the lending partner and may vary based on loan type and tenure.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">7.0</span>
                  Prohibited Activities
                </h2>
                <p className="mb-4">You agree not to engage in any of the following prohibited activities:</p>
                <ul className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 list-disc pl-5 marker:text-red-500 dark:marker:text-red-400">
                  <li>Providing false, misleading, or fraudulent information</li>
                  <li>Impersonating another person or entity</li>
                  <li>Using the Platform for money laundering</li>
                  <li>Creating multiple accounts to evade credit limits</li>
                  <li>Attempting to manipulate our AI algorithms</li>
                  <li>Accessing other users' accounts</li>
                  <li>Interfering with Platform security</li>
                  <li>Using bots or scripts to access the Platform</li>
                  <li>Violating applicable laws or regulations</li>
                  <li>Using loan amounts for prohibited purposes</li>
                  <li>Sharing account credentials</li>
                  <li>Circumventing security features</li>
                </ul>
                <p className="mt-6 text-sm bg-muted/50 p-3 rounded-lg text-muted-foreground border border-border">
                  <strong>Warning:</strong> Engaging in prohibited activities may result in immediate account termination, loan recall, legal action, and reporting to law enforcement and regulatory authorities.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">8.0</span>
                  Limitation of Liability
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">8.1 Platform Role</h3>
                    <p>
                      The Platform acts solely as a technology service provider and intermediary connecting borrowers with registered lending institutions. We do not lend money, disburse loans, or make credit decisions. All lending activities are conducted by RBI-registered banks and NBFCs, which are independent entities.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">8.2 No Warranty</h3>
                    <p>
                      The Platform and services are provided on an "as is" and "as available" basis without warranties of any kind, express or implied. We do not guarantee uninterrupted, timely, secure, or error-free service. We do not warrant that the Platform will meet your requirements or that any information provided will be accurate or complete.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">8.3 Limitation of Damages</h3>
                    <p>
                      To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, including but not limited to loss of profits, data, goodwill, or other intangible losses.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">8.4 Lending Partner Actions</h3>
                    <p>
                      We are not responsible for the actions, decisions, terms, or conduct of lending partners, including loan approval or rejection, interest rates charged, collection practices, or any disputes arising from the loan agreement. Any complaints regarding lending activities should be directed to the respective lending institution.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">9.0</span>
                  Account Suspension and Termination
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">9.1 Suspension by Platform</h3>
                    <p>
                      We reserve the right to suspend or terminate your account, with or without notice, if you violate these Terms, engage in prohibited activities, pose a security risk, or for any other reason we deem necessary to protect the Platform, our users, or our business interests.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">9.2 Voluntary Termination</h3>
                    <p>
                      You may request account closure at any time by contacting customer support. However, you must first settle all outstanding loan obligations before account closure will be processed. Account closure does not release you from any existing financial commitments or liabilities.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">9.3 Effect of Termination</h3>
                    <p>
                      Upon termination, your right to access and use the Platform immediately ceases. We may retain certain information as required by law or for legitimate business purposes. Termination does not affect any rights, obligations, or liabilities that accrued prior to termination.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">10.0</span>
                  Governing Law and Jurisdiction
                </h2>
                <div className="space-y-4">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes arising from or relating to these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts located in [City], India.
                  </p>
                  <p>
                    You agree to submit to the personal jurisdiction of these courts and waive any objection to the venue or inconvenience of such courts. This governing law clause does not affect your statutory rights as a consumer under applicable Indian consumer protection laws.
                  </p>
                  <p>
                    Before initiating legal proceedings, you agree to attempt resolution through our grievance redressal mechanism as outlined in our Privacy Policy and RBI Compliance disclosures.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">11.0</span>
                  Amendments to Terms
                </h2>
                <div className="space-y-4">
                  <p>
                    We reserve the right to modify, amend, or update these Terms at any time at our sole discretion. Changes may be necessary due to legal or regulatory requirements, changes in our services, or business considerations.
                  </p>
                  <p>
                    When we make material changes to these Terms, we will notify you by updating the "Last Updated" date at the top of this page and by sending notice through email, in-app notification, or prominent display on the Platform. We may also require you to affirmatively accept the updated Terms before continuing to use our services.
                  </p>
                  <p>
                    Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the revised Terms. If you do not agree to the updated Terms, you must stop using the Platform and may close your account, subject to settlement of any outstanding obligations.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold px-2.5 py-0.5 rounded mr-3">12.0</span>
                  Miscellaneous Provisions
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">12.1 Severability</h3>
                    <p>
                      If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">12.2 Entire Agreement</h3>
                    <p>
                      These Terms, together with our Privacy Policy and RBI Compliance disclosures, constitute the entire agreement between you and the Platform regarding your use of our services, superseding any prior agreements or understandings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">12.3 Assignment</h3>
                    <p>
                      You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations to any affiliated entity or successor in connection with a merger, acquisition, or sale of assets.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">12.4 Waiver</h3>
                    <p>
                      Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision or our right to enforce it in the future. Any waiver must be in writing and signed by an authorized representative.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 13 - Contact */}
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">13. Contact Information</h2>
                <p className="mb-6">
                  If you have questions, concerns, or need clarification regarding these Terms of Service, please contact us:
                </p>
                <div className="bg-muted/50 p-8 rounded-2xl border border-border shadow-sm">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="font-bold text-foreground uppercase tracking-wide text-xs mb-4">Customer Support</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="flex items-center">
                          <span className="w-20 font-medium text-foreground">Email:</span> 
                          support@[platform-domain].com
                        </p>
                        <p className="flex items-center">
                          <span className="w-20 font-medium text-foreground">Phone:</span> 
                          [Customer Support Number]
                        </p>
                        <p className="flex items-start">
                          <span className="w-20 font-medium text-foreground flex-shrink-0">Hours:</span> 
                          Monday to Saturday, 9:00 AM to 7:00 PM IST
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground uppercase tracking-wide text-xs mb-4">Registered Office</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        [Complete Registered Address]
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}