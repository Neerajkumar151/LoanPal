import { Bot, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import TermsOfService from '@/pages/TermsOfService';
import RBICompliance from '@/pages/RBICompliance';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-background">
                LoanPal
              </span>
            </div>
            <p className="text-background/60 leading-relaxed">
              Your AI-powered personal loan assistant. Making loan approvals smarter, faster, and more transparent.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-background font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/apply" className="hover:text-primary transition-colors">Apply for Loan</a>
              </li>
              <li>
                <a href="/emi-calculator" className="hover:text-primary transition-colors">EMI Calculator</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="RBI-Compliance" className="hover:text-primary transition-colors">RBI Compilance</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-background font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="Help-Center" className="hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="FAQ" className="hover:text-primary transition-colors">FAQs</a>
              </li>
              <li>
                <a href="Privacy-Policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="Terms-of-Service" className="hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-background font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-background/60">Email</p>
                  <a href="mailto:thakurneerajkumar017@gmail.com" className="hover:text-primary transition-colors">
                    thakurneerajkumar017@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-background/60">Phone</p>
                  <a href="tel:+918448275790" className="hover:text-primary transition-colors">
                    8448275790
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-background/60">Address</p>
                  <p>Barola Sector-49 Noida, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2024 LoanPal. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="Privacy-Policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="Terms-of-Service" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="RBI-Compliance" className="hover:text-primary transition-colors">RBI Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
