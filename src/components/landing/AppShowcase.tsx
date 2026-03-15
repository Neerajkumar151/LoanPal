import { ArrowRight, Bot, Cpu, Zap } from 'lucide-react';

export default function AppShowcase() {
  return (
    <section className="py-32 bg-[hsl(220,25%,6%)] relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(200,100%,62%)]/6 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-overline text-accent uppercase tracking-[0.2em] mb-4">Experience the Future</p>
          <h2 className="font-display text-display-md sm:text-display-lg text-white mb-6 tracking-tight">
            The LoanPal <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="text-body-lg text-white/40 max-w-2xl mx-auto">
            Where cutting-edge AI meets human-centric design. A financial interface built for the modern era.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Image */}
          <div className="relative group animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.06] shadow-[var(--shadow-card)] bg-white/[0.02] border-gradient">
              <img 
                src="/images/hero-app.png" 
                alt="App Interface" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,6%)]/50 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000 fill-mode-both">
            {[
              { icon: Bot, title: 'Intuitive AI Interaction', desc: 'Navigate your financial journey with a zero-friction interface. Our AI companion guides you through every step.' },
              { icon: Zap, title: 'Instant Feedback Loops', desc: 'Real-time updates on your application status. Complex financial data displayed with elegant simplicity.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start group/item">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover/item:border-accent/30 transition-all duration-500">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-heading text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-caption text-white/35 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features - reversed */}
          <div className="order-2 lg:order-1 space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
            {[
              { icon: Cpu, title: 'Algorithmic Decisioning', desc: 'Experience the power of our quantum-inspired logic. Millions of data points analyzed for the best financial outcomes.' },
              { icon: ArrowRight, title: 'Seamless Fund Delivery', desc: 'From approval to disbursement in seconds. Integrated payment rails ensure capital is exactly where you need it.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start group/item">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover/item:border-accent/30 transition-all duration-500">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-heading text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-caption text-white/35 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative group animate-in fade-in slide-in-from-right-12 duration-1000 fill-mode-both">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.06] shadow-[var(--shadow-card)] bg-white/[0.02] border-gradient">
              <img 
                src="/images/quantum-logic.png" 
                alt="AI Engine" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,6%)]/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
