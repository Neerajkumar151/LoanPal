import { Shield, Lock, FileCheck, Award, Users, Landmark, CheckCircle2 } from 'lucide-react';

const trustBadges = [
  { icon: Shield, title: 'Strictly Compliant', description: 'Global and domestic banking regulation adherence.' },
  { icon: Lock, title: 'AES-256 Encryption', description: 'Mathematically impenetrable data states.' },
  { icon: FileCheck, title: 'ISO 27001 Certified', description: 'Zero-trust architecture data centers.' },
  { icon: Award, title: 'Industry Recognized', description: 'Awarded by premier fintech consortiums.' },
  { icon: Users, title: '50K+ Verified', description: 'Expanding secure client network.' },
  { icon: Landmark, title: 'Tier-1 Partners', description: 'Direct alignment with leading banks.' },
];

export default function Trust() {
  return (
    <section className="py-32 bg-[hsl(220,25%,6%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full text-overline mb-6 border-gradient">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="text-white/60 uppercase">Zero-Trust Architecture</span>
          </div>

          <h2 className="font-display text-display-md sm:text-display-lg text-white mb-6 tracking-tight">
            Security & Credibility
          </h2>
          <p className="text-body-lg text-white/40 max-w-xl mx-auto">
            Your financial data is encrypted within vaults. Privacy is a mathematical certainty.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 stagger-children">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center gap-4 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] hover:border-accent/20 transition-all duration-500 border-gradient"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(45_100%_51%/0.1)] transition-all duration-500">
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1.5 tracking-tight group-hover:text-accent transition-colors duration-500">
                    {badge.title}
                  </h3>
                  <p className="text-caption text-white/30 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security detail card */}
        <div className="bg-white/[0.02] rounded-3xl shadow-[var(--shadow-card)] border border-white/[0.06] overflow-hidden relative border-gradient animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="grid md:grid-cols-2 relative z-10">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <h3 className="font-display text-display-sm text-white mb-8 tracking-tight">
                Cryptographically Sealed.
              </h3>
              <div className="space-y-5 text-white/50">
                {[
                  { bold: 'End-to-end encryption', text: 'ensures parameters remain unreadable during transit and rest.' },
                  { bold: 'Zero unauthorized extraction.', text: 'Third-party analytics blocked without cryptographic consent.' },
                  { bold: 'Continuous audits', text: 'executed by elite cybersecurity red teams.' },
                  { bold: 'GDPR & DPDP mandated', text: 'workflows ensuring total user agency over records.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-caption leading-relaxed">
                      <strong className="text-white/80 font-medium">{item.bold}</strong> {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border-l border-white/[0.04] p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=800&fm=webp')] bg-cover bg-center opacity-[0.06]"></div>

              <div className="relative">
                <div className="absolute inset-0 bg-accent/15 rounded-full blur-[60px] animate-pulse-slow"></div>
                <div className="relative bg-[hsl(220,25%,8%)] border border-white/[0.1] rounded-full shadow-[var(--shadow-card)] h-44 w-44 flex flex-col items-center justify-center">
                  <Shield className="w-14 h-14 text-accent mb-3 drop-shadow-[0_0_15px_hsl(45_100%_51%/0.4)]" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-white">100%</div>
                    <div className="text-overline text-accent uppercase tracking-[0.15em]">Fortified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
