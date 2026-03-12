import { Shield, Lock, FileCheck, Award, Users, Landmark, CheckCircle2 } from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    title: 'Strictly Compliant',
    description: 'Adhering rigidly to global and domestic banking regulations.',
  },
  {
    icon: Lock,
    title: 'AES-256 Encryption',
    description: 'Cryptographic security ensuring mathematically impenetrable data states.',
  },
  {
    icon: FileCheck,
    title: 'ISO 27001 Certified',
    description: 'Operating exclusively within zero-trust architecture data centers.',
  },
  {
    icon: Award,
    title: 'Industry Recognized',
    description: 'Vetted and awarded by premier financial technology consortiums.',
  },
  {
    icon: Users,
    title: '50K+ Verified Profiles',
    description: 'A continually expanding secure network of approved clients.',
  },
  {
    icon: Landmark,
    title: 'Tier-1 Partnerships',
    description: 'Direct liquidity alignment with central and leading commercial banks.',
  },
];

export default function Trust() {
  return (
    <section className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-accent/20 text-accent px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-accent/5">
            <Shield className="w-4 h-4" />
            Zero-Trust Architecture
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">
            Security & Credibility
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            We isolate your financial data within encrypted vaults. Your privacy and systemic security are mathematical certainties, not just promises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            const delay = index * 50;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-300">
                  <Icon className="w-6 h-6 text-slate-300 group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 tracking-wide font-display group-hover:text-amber-100 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
          {/* Subtle accent glow behind the card */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid md:grid-cols-2 relative z-10">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-8 font-display">
                Your Data, Cryptographically Sealed.
              </h3>
              <div className="space-y-6 text-slate-300 font-light">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-medium">End-to-end encryption</strong> ensures your parameters remain unreadable during transit and rest.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-medium">Zero unauthorized extraction.</strong> We inherently block third-party analytics without explicit cryptographic consent.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-medium">Continuous systemic audits</strong> executed by elite objective cybersecurity red teams.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-medium">GDPR & DPDP mandated</strong> workflows ensuring total user agency over stored records.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border-l border-white/5 p-12 flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>

              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] animate-pulse"></div>
                <div className="relative bg-slate-900 border border-white/20 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] h-48 w-48 flex flex-col items-center justify-center backdrop-blur-xl">
                  <Shield className="w-16 h-16 text-accent mb-3 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                  <div className="text-center">
                    <div className="text-2xl font-bold font-display text-white">100%</div>
                    <div className="text-xs text-accent uppercase tracking-widest font-semibold">Fortified</div>
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
