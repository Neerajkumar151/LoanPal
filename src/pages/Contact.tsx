import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';

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

      <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-accent/5 pt-28 pb-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-4 shadow-sm border border-primary/10">
              <MessageSquare className="w-4 h-4" />
              Support & Help
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-display">
              We’re Here to Help
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about your loan application, rejection reasons, or sanction letter?
              Our support team is always ready to assist you.
            </p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl shadow-lg shadow-black/[0.04] border border-border/60 p-8">
                <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground">thakurneerajkumar017@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-muted-foreground">8448275790</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Office</p>
                      <p className="text-muted-foreground">
                        Barola sector-49 Noida, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
                  ⏱ Support Hours: Mon–Sat, 9:00 AM – 7:00 PM
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.06] border border-border/60 p-8">
              <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" className="bg-background border-input text-foreground placeholder:text-muted-foreground" />
                  <Input type="email" placeholder="Email Address" className="bg-background border-input text-foreground placeholder:text-muted-foreground" />
                </div>

                <Input placeholder="Subject (e.g. Loan Rejection Reason)" className="bg-background border-input text-foreground placeholder:text-muted-foreground" />

                <Textarea
                  placeholder="Describe your issue or question..."
                  className="min-h-[140px] bg-background border-input text-foreground placeholder:text-muted-foreground"
                />

                <Button className="w-full text-lg">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your information is secure and will only be used to assist you.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      <FloatingChatbot/>
    </>
  );
}
