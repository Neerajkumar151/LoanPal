import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Deep luxury ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 lg:p-20 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-accent/20 text-accent px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Decision Matrix Ready
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] font-display tracking-tight drop-shadow-xl">
            Acquire your capital. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-accent">Instantly.</span>
          </h2>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Our autonomous lending infrastructure is ready to process your parameters. Experience unprecedented speed, total transparency, and mathematical fairness.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => navigate('/apply')} className="group relative overflow-hidden bg-accent text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:shadow-[0_0_60px_rgba(250,204,21,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">Execute Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
            </button>

            <button onClick={() => navigate('/contact')} className="bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-semibold text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              Consult Concierge
            </button>
          </div>

          <div className="mt-14 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-10 text-slate-400 text-sm font-light uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Zero Credit Impact
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              AES-256 Vaulted
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Sub-second Logic
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
