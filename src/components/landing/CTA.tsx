import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-[hsl(220,25%,6%)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-accent/8 rounded-[100%] blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm rounded-[2.5rem] p-12 lg:p-20 shadow-[var(--shadow-card)] border-gradient">
          <div className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full text-overline mb-8 border-gradient">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-white/60 uppercase">Decision Matrix Ready</span>
          </div>

          <h2 className="font-display text-display-md sm:text-display-lg lg:text-display-xl text-white mb-8 tracking-tight leading-[1.05]">
            Acquire your capital.<br />
            <span className="gradient-text">Instantly.</span>
          </h2>

          <p className="text-body-lg text-white/35 mb-12 max-w-xl mx-auto leading-relaxed">
            Our autonomous lending infrastructure is ready. Unprecedented speed, total transparency, mathematical fairness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/apply')} 
              className="group relative overflow-hidden bg-accent text-accent-foreground px-10 py-4 rounded-2xl font-display font-semibold text-base shadow-[var(--shadow-glow)] hover:shadow-[0_0_80px_-12px_hsl(45_100%_51%/0.4)] hover:-translate-y-0.5 transition-all duration-500 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Execute Application 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform"></div>
            </button>

            <button 
              onClick={() => navigate('/contact')} 
              className="glass-dark text-white px-10 py-4 rounded-2xl font-display font-medium text-base hover:bg-white/10 transition-all duration-500 w-full sm:w-auto border-gradient"
            >
              Consult Concierge
            </button>
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.04] flex flex-wrap justify-center gap-8 text-white/25 text-overline uppercase">
            {['Zero Credit Impact', 'AES-256 Vaulted', 'Sub-second Logic'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
