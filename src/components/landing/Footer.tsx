import { Bot, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github, GithubIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-all duration-300">
                <Bot className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold font-display text-white tracking-wide">
                LoanPal
              </span>
            </div>
            <p className="font-light leading-relaxed">
              Autonomous algorithmic capital deployment. Redefining lending logic for the next generation.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/Neerajkumar151" target='blank' className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-accent/30">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/neerajkumar1715" target='blank' className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-accent/30">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/neerajkumar1517/" target='blank' className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-accent/30">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:thakurneerajkumar17@gmail.com" target='blank' className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-accent/30">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold font-display tracking-widest uppercase text-sm mb-6 opacity-80">Architecture</h3>
            <ul className="space-y-3 font-light">
              <li>
                <a href="/" className="hover:text-accent transition-colors duration-200">Terminal Home</a>
              </li>
              <li>
                <a href="/apply" className="hover:text-accent transition-colors duration-200">Initiate Logic</a>
              </li>
              <li>
                <a href="/emi-calculator" className="hover:text-accent transition-colors duration-200">EMI Computation</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-accent transition-colors duration-200">Client Nexus</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-display tracking-widest uppercase text-sm mb-6 opacity-80">Compliance</h3>
            <ul className="space-y-3 font-light">
              <li>
                <a href="/RBI-Compliance" className="hover:text-accent transition-colors duration-200">RBI Filings</a>
              </li>
              <li>
                <a href="/Privacy-Policy" className="hover:text-accent transition-colors duration-200">Data Cryptography</a>
              </li>
              <li>
                <a href="/Terms-of-Service" className="hover:text-accent transition-colors duration-200">Service Parameters</a>
              </li>
              <li>
                <a href="/Help-Center" className="hover:text-accent transition-colors duration-200">Intelligence Base</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-display tracking-widest uppercase text-sm mb-6 opacity-80">Connect</h3>
            <ul className="space-y-4 font-light">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:thakurneerajkumar017@gmail.com" className="hover:text-white transition-colors duration-200">
                    thakurneerajkumar017@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+918448275790" className="hover:text-white transition-colors duration-200">
                    +91 844.827.5790
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p>Cyber Hub Node, Sector-49 Noida, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">
              © {new Date().getFullYear()} LoanPal Inc. All structural rights reserved.
            </p>
            <div className="flex gap-6 text-sm font-light">
              <span className="text-accent flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> Systems Nominal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
