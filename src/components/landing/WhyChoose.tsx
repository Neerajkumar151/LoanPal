import { Clock, FileX, AlertCircle, MessagesSquare } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'Velocity redefined',
    description: 'Capital decisions executed in milliseconds. Eradicate waiting periods, queues, and traditional banking latency.',
    stat: '10x',
    statLabel: 'Faster processing',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
  },
  {
    icon: FileX,
    title: 'Frictionless logic',
    description: 'A pure digital ecosystem. Physical documentation is obsolete; our API does the heavy lifting instantly.',
    stat: '100%',
    statLabel: 'Digital workflow',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
  },
  {
    icon: AlertCircle,
    title: 'Absolute clarity',
    description: 'Black-box algorithms are a thing of the past. If denied, you receive exact parametric feedback for improvement.',
    stat: '100%',
    statLabel: 'Transparency',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
  },
  {
    icon: MessagesSquare,
    title: 'Humanized AI',
    description: 'A sophisticated NLP interface that understands intent. Eliminate complex forms in favor of natural conversation.',
    stat: '4.9/5',
    statLabel: 'Trust rating',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-3">The Paradigm Shift</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display tracking-tight">
            Why the Elite Choose LoanPal
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            By collapsing traditional financial constraints through code, we offer a lending experience that is mathematically superior.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const delay = index * 100;
            return (
              <div
                key={index}
                className="relative group animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 border border-white/10 group-hover:border-accent/30 flex flex-col h-full group/card">
                  {/* Deep Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={reason.image} 
                      alt={reason.title}
                      className="w-full h-full object-cover opacity-20 group-hover/card:scale-105 group-hover/card:opacity-30 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60 mix-blend-multiply"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full bg-slate-950/40 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-shadow">
                        <Icon className="w-8 h-8 text-slate-300 group-hover:text-accent transition-colors" />
                      </div>
                      <div className="text-right">
                          <span className="block text-4xl lg:text-5xl font-bold font-display text-white group-hover:text-accent transition-colors drop-shadow-sm">
                            {reason.stat}
                          </span>
                          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1 block">
                            {reason.statLabel}
                          </span>
                      </div>
                  </div>

                  <div className="flex-1 space-y-4 pt-4 border-t border-white/5">
                      <h3 className="text-2xl font-bold font-display text-white tracking-wide">
                        {reason.title}
                      </h3>
                      <p className="text-slate-400 font-light leading-relaxed">
                        {reason.description}
                      </p>
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 relative rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-500 fill-mode-both">
          {/* Deep dark gradient block */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-accent/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]"></div>
          
          <div className="relative p-12 lg:p-16 text-center z-10 border border-white/5 rounded-3xl">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-display">
              Capital deployment at scale
            </h3>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light">
              We are quietly powering the ambitions of tens of thousands, operating with precision, speed, and absolute reliability.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              <div>
                <div className="text-5xl font-bold font-display text-white mb-2 tracking-tight group-hover:text-accent transition-colors drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">50K+</div>
                <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">Active Portfolios</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-display text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">15m</div>
                <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">Avg Dispersal</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-display text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">99.9%</div>
                <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">Uptime Status</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-display text-accent mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">4.9</div>
                <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
