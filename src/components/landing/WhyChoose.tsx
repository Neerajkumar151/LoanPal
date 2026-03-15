import { Clock, FileX, AlertCircle, MessagesSquare } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'Velocity redefined',
    description: 'Capital decisions in milliseconds. Eradicate waiting periods and traditional banking latency.',
    stat: '10x',
    statLabel: 'Faster',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: FileX,
    title: 'Frictionless logic',
    description: 'A pure digital ecosystem. Physical documentation is obsolete; our API does the heavy lifting.',
    stat: '100%',
    statLabel: 'Digital',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: AlertCircle,
    title: 'Absolute clarity',
    description: 'No black boxes. If denied, you receive exact parametric feedback for improvement.',
    stat: '100%',
    statLabel: 'Transparent',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: MessagesSquare,
    title: 'Humanized AI',
    description: 'Sophisticated NLP that understands intent. Natural conversation replaces complex forms.',
    stat: '4.9/5',
    statLabel: 'Rating',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-32 bg-[hsl(220,25%,7%)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-overline text-accent uppercase tracking-[0.2em] mb-4">The Paradigm Shift</p>
          <h2 className="font-display text-display-md sm:text-display-lg text-white mb-6 tracking-tight">
            Why the Elite Choose <span className="gradient-text">LoanPal</span>
          </h2>
          <p className="text-body-lg text-white/40 max-w-xl mx-auto">
            Mathematically superior lending through code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 pb-16 stagger-children">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="group relative">
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-accent/20 transition-all duration-500 hover:-translate-y-1 h-full border-gradient">
                  {/* Background */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={reason.image} 
                      alt={reason.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-[0.1] group-hover:scale-105 group-hover:opacity-[0.18] transition-all duration-700 will-change-transform" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,6%)] via-[hsl(220,25%,6%)]/80 to-[hsl(220,25%,6%)]/50"></div>
                  </div>

                  <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 transition-all duration-500">
                        <Icon className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors duration-500" />
                      </div>
                      <div className="text-right">
                        <span className="block text-display-sm font-display text-white group-hover:text-accent transition-colors duration-500">
                          {reason.stat}
                        </span>
                        <span className="text-overline text-white/25 uppercase mt-1 block">
                          {reason.statLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 pt-6 border-t border-white/[0.04]">
                      <h3 className="font-display text-heading text-white tracking-tight">
                        {reason.title}
                      </h3>
                      <p className="text-caption text-white/35 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-10 relative rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-500 fill-mode-both">
          <div className="absolute inset-0 bg-white/[0.02] border border-white/[0.06] rounded-3xl border-gradient"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-[100px]"></div>
          
          <div className="relative p-12 lg:p-16 text-center z-10">
            <h3 className="font-display text-display-sm text-white mb-4 tracking-tight">
              Capital deployment at scale
            </h3>
            <p className="text-body text-white/35 mb-14 max-w-xl mx-auto">
              Quietly powering tens of thousands of ambitions with precision, speed, and reliability.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {[
                { val: '50K+', label: 'Active Portfolios' },
                { val: '15m', label: 'Avg Dispersal' },
                { val: '99.9%', label: 'Uptime' },
                { val: '4.9', label: 'Rating', accent: true },
              ].map((s, i) => (
                <div key={i}>
                  <div className={`text-display-sm font-display mb-2 tracking-tight ${s.accent ? 'text-accent' : 'text-white'}`}>{s.val}</div>
                  <div className="text-overline text-white/25 uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
