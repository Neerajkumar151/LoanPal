import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
export default function PrivacyPolicy() {
  return (
    <>
      <Header />
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <p className="text-sm text-gray-600 mb-6">
            <strong>Effective Date:</strong> January 1, 2025
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction and Scope</h2>
          <p className="mb-4">
            This Privacy Policy describes how we collect, use, store, share, and protect your personal information when you use our Platform to access loan services. The Platform operates as a technology service provider that connects users with registered lending institutions including banks and Non-Banking Financial Companies (NBFCs) licensed by the Reserve Bank of India.
          </p>
          <p>
            By using our services, you consent to the collection and use of your information as described in this policy. We are committed to protecting your privacy and handling your data in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Data Collected</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
          <p className="mb-4">We collect the following categories of personal information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Full name, date of birth, gender, and photograph</li>
            <li>Contact details including mobile number, email address, and residential address</li>
            <li>Government-issued identification documents (Aadhaar, PAN, Voter ID, Driving License, Passport)</li>
            <li>Employment information including employer name, designation, and income details</li>
            <li>Educational qualifications</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Financial Information</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Bank account details, IFSC codes, and account statements</li>
            <li>Credit history and credit scores obtained from credit bureaus</li>
            <li>Transaction history and payment records</li>
            <li>Income tax returns and salary slips</li>
            <li>Details of existing loans and liabilities</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Device and Technical Information</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Device identifiers, IP address, browser type, and operating system</li>
            <li>Mobile device information including model, manufacturer, and unique device ID</li>
            <li>Location data (with your consent)</li>
            <li>App usage patterns and interaction data</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.4 Usage Information</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Pages visited, features used, and time spent on the Platform</li>
            <li>Search queries and application history</li>
            <li>Customer support interactions and feedback</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Purpose of Data Collection</h2>
          <p className="mb-3">We collect and use your information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To verify your identity and prevent fraud</li>
            <li>To assess your creditworthiness and process loan applications</li>
            <li>To facilitate communication between you and lending partners</li>
            <li>To comply with legal and regulatory requirements including KYC norms</li>
            <li>To improve our services through data analysis and user behavior insights</li>
            <li>To send transactional notifications, service updates, and promotional communications (with your consent)</li>
            <li>To provide customer support and resolve disputes</li>
            <li>To detect, prevent, and address technical issues or fraudulent activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. AI and Automated Decision-Making</h2>
          <p className="mb-4">
            Our Platform uses artificial intelligence and machine learning algorithms to assess credit applications, determine loan eligibility, and recommend suitable loan products. These automated systems analyze various data points including your financial history, employment status, transaction patterns, and credit bureau information.
          </p>
          <p className="mb-4">
            While AI assists in the evaluation process, final lending decisions are made by our partner banks and NBFCs. You have the right to request human intervention and to contest any automated decision that significantly affects you. If your application is rejected based on automated assessment, you may contact our grievance officer for review.
          </p>
          <p>
            We regularly audit our AI systems to ensure fairness, accuracy, and compliance with applicable regulations. Our algorithms do not discriminate based on caste, religion, gender, or other protected characteristics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Storage and Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of sensitive data both in transit and at rest using SSL/TLS protocols</li>
            <li>Secure server infrastructure with regular security audits and vulnerability assessments</li>
            <li>Access controls limiting data access to authorized personnel only</li>
            <li>Regular backup and disaster recovery procedures</li>
            <li>Firewall protection and intrusion detection systems</li>
          </ul>
          <p className="mb-4">
            In compliance with RBI guidelines on data localization, all payment and financial data of Indian users is stored exclusively on servers located within India. Critical personal information is not transferred outside India without explicit consent and regulatory approval.
          </p>
          <p>
            While we strive to protect your data, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security but commit to promptly notifying you and relevant authorities in the event of any data breach.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Lending Partners</h3>
          <p className="mb-4">
            We share your information with RBI-registered banks and NBFCs for the purpose of loan processing, disbursement, and servicing. These institutions are bound by their own privacy policies and regulatory obligations.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Credit Bureaus</h3>
          <p className="mb-4">
            We may share your credit information with credit information companies such as CIBIL, Equifax, Experian, and CRIF High Mark as required for credit assessment and reporting purposes.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Service Providers</h3>
          <p className="mb-4">
            We engage third-party service providers for KYC verification, payment processing, SMS and email delivery, cloud hosting, data analytics, and customer support. These providers are contractually obligated to protect your data and use it only for specified purposes.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.4 Legal Requirements</h3>
          <p className="mb-4">
            We may disclose your information when required by law, court order, or government authority, or when necessary to protect our rights, property, or safety, or that of our users and the public.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.5 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections outlined in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Rights</h2>
          <p className="mb-3">You have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right to Access:</strong> You may request a copy of the personal information we hold about you</li>
            <li><strong>Right to Correction:</strong> You can update or correct inaccurate information through your account settings or by contacting us</li>
            <li><strong>Right to Deletion:</strong> You may request deletion of your data, subject to legal and regulatory retention requirements</li>
            <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for data processing at any time, which may affect service availability</li>
            <li><strong>Right to Data Portability:</strong> You may request your data in a structured, commonly used format</li>
            <li><strong>Right to Object:</strong> You can object to processing of your data for direct marketing purposes</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact our grievance officer using the details provided in Section 10.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. Cookies are small text files stored on your device that help us recognize you and remember your preferences.
          </p>
          <p className="mb-3">Types of cookies we use:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the Platform to function properly</li>
            <li><strong>Performance Cookies:</strong> Collect information about how you use our Platform</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Advertising Cookies:</strong> Deliver relevant advertisements (with your consent)</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention Policy</h2>
          <p className="mb-4">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Generally, we retain:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Active user data for the duration of your account plus regulatory retention periods</li>
            <li>Financial transaction records for a minimum of 10 years as per RBI guidelines</li>
            <li>KYC documents for at least 5 years after account closure</li>
            <li>Communication records and support tickets for a reasonable period for service improvement</li>
          </ul>
          <p className="mt-4">
            After the retention period expires, we securely delete or anonymize your information in accordance with our data deletion procedures.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Grievance Redressal</h2>
          <p className="mb-4">
            In accordance with the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, we have appointed a Grievance Officer to address your privacy concerns.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <p className="mb-2"><strong>Grievance Officer</strong></p>
            <p className="mb-1">Name: [To be designated by the Platform]</p>
            <p className="mb-1">Email: grievance@[platform-domain].com</p>
            <p className="mb-1">Phone: [Contact Number]</p>
            <p>Working Hours: Monday to Friday, 10:00 AM to 6:00 PM IST</p>
          </div>
          <p>
            The Grievance Officer will acknowledge your complaint within 24 hours and resolve it within 15 days from the date of receipt. If you are not satisfied with the resolution, you may escalate to the appropriate regulatory authority.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or business operations. We will notify you of material changes by posting the updated policy on the Platform and updating the "Effective Date" at the top of this page.
          </p>
          <p>
            For significant changes that affect your rights, we will provide prominent notice through email or in-app notifications. Your continued use of the Platform after such changes constitutes acceptance of the updated policy. We encourage you to review this policy regularly to stay informed about how we protect your information.
          </p>
        </section>

        <section className="border-t border-gray-300 pt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="mb-4">
            If you have questions, concerns, or feedback regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-1">Email: privacy@[platform-domain].com</p>
            <p className="mb-1">Customer Support: support@[platform-domain].com</p>
            <p>Address: [Registered Office Address]</p>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </>
    
  );
  
}
