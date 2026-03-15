import { Brain, Zap, Eye, FileCheck, Shield, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Cognitive Credit Analysis',
    description: 'Neural networks process 50+ non-traditional data markers to assess your true financial potential.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: Zap,
    title: 'Zero Latency Approvals',
    description: 'Bypass human bottlenecks. Binding decisions and capital commitments within milliseconds.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: Eye,
    title: 'Absolute Transparency',
    description: 'Every algorithmic decision demystified. View exact parameters that influenced your ceiling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: FileCheck,
    title: 'Cryptographic Sanctions',
    description: 'Digitally signed, verifiable sanction letters ready for immutable record keeping.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674dc9?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: Shield,
    title: 'Military-Grade Security',
    description: 'AES-256 encryption protocols. Your financial genome is mathematically impenetrable.',
    image: 'https://images.unsplash.com/photo-1510511459019-5d6450c28667?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
  {
    icon: MessageSquare,
    title: 'Intuitive Processing',
    description: 'Advanced Natural Language Processing engine for a friction-free application journey.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=60&w=800&fm=webp',
  },
];

export default function Features() {
  return (
    <section className="py-32 bg-[hsl(220,25%,6%)] relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="max-w-2xl mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-overline text-accent uppercase tracking-[0.2em] mb-4">Core Capabilities</p>
          <h2 className="font-display text-display-md sm:text-display-lg text-white mb-6 tracking-tight">
            Unfair <span className="gradient-text">Advantages.</span>
          </h2>
          <p className="text-body-lg text-white/40 leading-relaxed">
            We didn't just digitize lending — we reinvented the mathematics behind it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-accent/20 transition-all duration-500 hover:-translate-y-1 border-gradient"
              >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-[0.12] group-hover:scale-110 group-hover:opacity-[0.22] transition-all duration-1000 will-change-transform" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,6%)] via-[hsl(220,25%,6%)]/70 to-[hsl(220,25%,6%)]/30"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full p-8">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-8 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_hsl(45_100%_51%/0.1)] transition-all duration-500">
                    <Icon className="w-5 h-5 text-white/50 group-hover:text-accent transition-colors duration-500" />
                  </div>

                  <h3 className="font-display text-heading text-white mb-3 tracking-tight group-hover:text-accent transition-colors duration-500">
                    {feature.title}
                  </h3>

                  <p className="text-caption text-white/35 leading-relaxed flex-grow group-hover:text-white/50 transition-colors duration-500">
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
