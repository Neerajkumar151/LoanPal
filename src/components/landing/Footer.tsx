import { Bot, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[hsl(220,25%,5%)] text-white/40 border-t border-white/[0.04] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-lg shadow-accent/15 group-hover:shadow-accent/30 transition-all duration-500">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-lg font-display font-bold text-white tracking-tight">
                LoanPal
              </span>
            </div>
            <p className="text-caption leading-relaxed text-white/30">
              Autonomous algorithmic capital deployment. Redefining lending logic for the next generation.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Github, href: 'https://github.com/Neerajkumar151' },
                { icon: Twitter, href: 'https://x.com/neerajkumar1715' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/neerajkumar1517/' },
                { icon: Mail, href: 'mailto:thakurneerajkumar17@gmail.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-white flex items-center justify-center transition-all duration-300 border border-white/[0.06] hover:border-accent/20">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-overline text-white/50 uppercase tracking-[0.15em] mb-6">Architecture</h3>
            <ul className="space-y-3">
              {[
                { label: 'Terminal Home', href: '/' },
                { label: 'Initiate Logic', href: '/apply' },
                { label: 'EMI Computation', href: '/emi-calculator' },
                { label: 'Client Nexus', href: '/dashboard' },
              ].map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="text-caption text-white/30 hover:text-accent transition-colors duration-300">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-overline text-white/50 uppercase tracking-[0.15em] mb-6">Compliance</h3>
            <ul className="space-y-3">
              {[
                { label: 'RBI Filings', href: '/RBI-Compliance' },
                { label: 'Data Cryptography', href: '/Privacy-Policy' },
                { label: 'Service Parameters', href: '/Terms-of-Service' },
                { label: 'Intelligence Base', href: '/Help-Center' },
              ].map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="text-caption text-white/30 hover:text-accent transition-colors duration-300">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-overline text-white/50 uppercase tracking-[0.15em] mb-6">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:thakurneerajkumar017@gmail.com" className="text-caption text-white/30 hover:text-white transition-colors duration-300 break-all">
                  thakurneerajkumar017@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="tel:+918448275790" className="text-caption text-white/30 hover:text-white transition-colors duration-300">
                  +91 844.827.5790
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-caption text-white/30">Cyber Hub Node, Sector-49 Noida, India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-white/20 font-mono uppercase tracking-wider">
              © {new Date().getFullYear()} LoanPal Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-overline">
              <span className="text-accent/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></span>
                Systems Nominal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
