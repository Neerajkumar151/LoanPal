import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default function Contact() {
  return (
    <>
    <Header/>
      <Helmet>
        <title>Contact Support - LoanPal</title>
        <meta
          name="description"
          content="Contact LoanPal support for help with loan applications, approvals, or account issues."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-emerald-50 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              Support & Help
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              We’re Here to Help
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about your loan application, rejection reasons, or sanction letter?
              Our support team is always ready to assist you.
            </p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">support@loanpal.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">1800-123-456</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Office</p>
                      <p className="text-gray-600">
                        Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                  ⏱ Support Hours: Mon–Sat, 9:00 AM – 7:00 PM
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input type="email" placeholder="Email Address" />
                </div>

                <Input placeholder="Subject (e.g. Loan Rejection Reason)" />

                <Textarea
                  placeholder="Describe your issue or question..."
                  className="min-h-[140px]"
                />

                <Button className="w-full text-lg">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your information is secure and will only be used to assist you.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
