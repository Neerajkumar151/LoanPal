import { Brain, Zap, Eye, FileCheck, Shield, MessageSquare, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Cognitive Credit Analysis',
    description: 'Our neural networks process over 50 non-traditional data markers to comprehensively assess your true financial potential.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80',
  },
  {
    icon: Zap,
    title: 'Zero Latency Approvals',
    description: 'Bypass human bottlenecks. Receive binding decisions and capital commitments within milliseconds of submission.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
  },
  {
    icon: Eye,
    title: 'Absolute Transparency',
    description: 'Every algorithmic decision is demystified. View the exact parameters that influenced your approval ceiling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
  },
  {
    icon: FileCheck,
    title: 'Cryptographic Sanctions',
    description: 'Instantly download digitally signed, verifiable sanction letters ready for immutable record keeping.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674dc9?auto=format&fit=crop&q=80',
  },
  {
    icon: Shield,
    title: 'Military-Grade Security',
    description: 'Your financial genome is secured using AES-256 encryption protocols. Ultimate privacy, uncompromised.',
    image: 'https://images.unsplash.com/photo-1510511459019-5d6450c28667?auto=format&fit=crop&q=80',
  },
  {
    icon: MessageSquare,
    title: 'Intuitive Processing',
    description: 'Interact with our advanced Natural Language Processing engine for a friction-free application journey.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
  },
];

export default function Features() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Unfair <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">Advantages.</span>
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              We did not just digitize the loan process; we reinvented the mathematics behind lending, giving you unprecedented leverage.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            // Calculate a staggered delay based on index
            const delay = index * 100;
            return (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 animate-in fade-in slide-in-from-bottom-12 fill-mode-both group/card`}
                style={{ animationDelay: `${delay}ms` }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-20 group-hover/card:scale-110 group-hover/card:opacity-40 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/20"></div>
                </div>

                {/* Subtle gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover/card:from-accent/10 group-hover/card:to-transparent rounded-3xl transition-colors duration-500 z-0"></div>
                
                <div className="relative z-10 flex flex-col h-full bg-slate-950/20 backdrop-blur-[2px] p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-accent/50 group-hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-all duration-300">
                        <Icon className="w-7 h-7 text-white group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-accent/70 transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white mb-4 tracking-wide group-hover:text-accent transition-colors duration-300 drop-shadow-md">
                    {feature.title}
                  </h3>

                  <p className="text-slate-200 font-light leading-relaxed flex-grow group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
