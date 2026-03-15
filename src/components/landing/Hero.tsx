import { Bot, Sparkles, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[hsl(220,30%,6%)] pt-20">
      {/* Layered background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=60&w=1920&fm=webp')] bg-cover bg-center opacity-[0.08]"></div>
      <div className="absolute inset-0 noise-overlay"></div>
      
      {/* Ambient orbs */}
      <div className="absolute top-[5%] left-[20%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[160px] animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-[hsl(200,100%,62%)]/10 rounded-full blur-[180px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,30%,6%)]/30 via-[hsl(220,30%,6%)]/70 to-[hsl(220,30%,6%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column */}
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2.5 glass-dark px-5 py-2.5 rounded-full text-overline border-gradient">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-white/70 uppercase">Next-Generation AI Finance</span>
            </div>

            <h1 className="font-display text-display-lg sm:text-display-xl leading-[1.05] tracking-tight">
              <span className="text-white">Decisions</span><br />
              <span className="text-white">made </span>
              <span className="gradient-text inline-block">
                Brilliantly.
              </span>
            </h1>

            <p className="text-body-lg text-white/50 max-w-lg leading-relaxed">
              Experience the future of lending. Our quantum-inspired AI analyzes your financial footprint in milliseconds, unlocking capital with unprecedented clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => navigate('/apply')} 
                className="group relative overflow-hidden bg-accent text-accent-foreground px-8 py-4 rounded-2xl font-display font-semibold text-base shadow-[var(--shadow-glow)] hover:shadow-[0_0_80px_-12px_hsl(45_100%_51%/0.4)] hover:-translate-y-0.5 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Initiate Application 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform"></div>
              </button>
              
              <button 
                onClick={() => navigate('/emi-calculator')} 
                className="glass-dark text-white px-8 py-4 rounded-2xl font-display font-medium text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-500 flex items-center justify-center gap-2.5 border-gradient"
              >
                <Calculator className="w-4 h-4 text-accent" />
                EMI Calculator
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[hsl(220,30%,6%)] bg-white/10 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/80?img=${i + 10}`} alt="User" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-accent mb-1">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-caption text-white/40">Trusted by <span className="text-white/80 font-medium">50,000+</span> visionaries</p>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Card */}
          <div className="relative lg:h-[650px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
            {/* Floating orbs */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-accent/30 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-5 w-28 h-28 bg-[hsl(200,100%,62%)]/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

            <div className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="relative glass-dark rounded-3xl p-8 border-gradient shadow-[var(--shadow-card)] z-20">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-lg shadow-accent/20">
                      <Bot className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold text-white tracking-tight">LoanPal Nexus</p>
                      <p className="text-xs text-accent font-medium flex items-center gap-2 font-mono">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                        </span>
                        SYSTEM ACTIVE
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-white/20" />
                </div>

                <div className="space-y-5">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-md p-5 max-w-[90%]">
                    <p className="text-white/60 text-sm leading-relaxed">Initiating financial genome sequencing. Analyzing 50+ alternative data points to maximize approval potential.</p>
                  </div>

                  <div className="bg-gradient-to-r from-accent to-amber-500 text-accent-foreground rounded-2xl rounded-tr-md p-5 max-w-[80%] ml-auto shadow-lg shadow-accent/10">
                    <p className="text-sm font-medium">Optimizing limit for ₹5,00,000</p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-md p-6 max-w-[95%] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-accent"></div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-overline text-white/30 uppercase mb-1">Probability Score</p>
                        <p className="text-3xl font-display font-bold text-white tracking-tight">98.4<span className="text-lg text-accent">%</span></p>
                      </div>
                      <div className="h-10 w-10 rounded-full border-[3px] border-white/10 border-t-accent animate-spin" style={{ animationDuration: '3s' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/20 font-mono uppercase tracking-widest">
                  <span>Latency: 12ms</span>
                  <span>AES-256</span>
                </div>
              </div>

              {/* Decorative stacked cards */}
              <div className="absolute inset-0 bg-white/[0.02] rounded-3xl border border-white/[0.04] translate-x-4 translate-y-4 z-10"></div>
              <div className="absolute inset-0 bg-white/[0.01] rounded-3xl border border-white/[0.02] translate-x-8 translate-y-8 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
