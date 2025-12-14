import { Bot, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                LoanPal
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your AI-powered personal loan assistant. Making loan approvals smarter, faster, and more transparent.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#apply" className="hover:text-blue-400 transition-colors">Apply for Loan</a>
              </li>
              <li>
                <a href="#profile" className="hover:text-blue-400 transition-colors">My Profile</a>
              </li>
              <li>
                <a href="#eligibility" className="hover:text-blue-400 transition-colors">Check Eligibility</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="hover:text-blue-400 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:support@loanpal.in" className="hover:text-blue-400 transition-colors">
                    support@loanpal.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+911800123456" className="hover:text-blue-400 transition-colors">
                    1800-123-456
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 LoanPal. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#compliance" className="hover:text-blue-400 transition-colors">RBI Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
