import { Bot, Sparkles, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
        <div className="absolute top-[10%] left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-[20%] right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-50"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Copy */}
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-accent px-5 py-2.5 rounded-full text-sm font-semibold shadow-2xl">
              <Sparkles className="w-4 h-4" />
              <span className="text-slate-200">Next-Generation AI Finance</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] font-display tracking-tight drop-shadow-2xl">
              Decisions made <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent animate-pulse-slow">
                Brilliantly.
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-light">
              Experience the future of lending. Our quantum-inspired AI logic analyzes your financial footprint in milliseconds, unlocking capital with unprecedented clarity and speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button onClick={() => navigate('/apply')} className="group relative overflow-hidden bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:shadow-[0_0_60px_rgba(250,204,21,0.5)] hover:-translate-y-1 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">Initiate Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
              </button>
              
              <button onClick={() => navigate('/emi-calculator')} className="bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5 text-accent" />
                EMI Intelligence
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-white/10">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden"
                  >
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-accent mb-1">
                    {[1,2,3,4,5].map(star => <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-sm font-medium text-slate-300">Trusted by <span className="text-white font-bold">50,000+</span> visionaries</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Interface */}
          <div className="relative lg:h-[700px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
            {/* Abstract floating elements */}
            <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-accent to-yellow-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-tr from-primary to-indigo-600 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative w-full max-w-lg perspective-1000">
                {/* Main Glass Card */}
                <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center shadow-lg shadow-accent/20">
                                <Bot className="w-7 h-7 text-slate-900" />
                            </div>
                            <div>
                                <p className="font-display text-xl font-bold text-white">LoanPal Nexus</p>
                                <p className="text-sm text-accent font-medium flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                    </span>
                                    System Active
                                </p>
                            </div>
                        </div>
                        <ShieldCheck className="w-6 h-6 text-slate-400" />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-5 max-w-[90%] backdrop-blur-md transform transition-all hover:scale-[1.02]">
                            <p className="text-slate-300 leading-relaxed text-sm">Initiating financial genome sequencing. Analyzing 50+ alternative data points to maximize your approval potential.</p>
                        </div>

                        <div className="bg-gradient-to-r from-accent/90 to-yellow-500 text-slate-900 font-medium rounded-2xl rounded-tr-sm p-5 max-w-[85%] ml-auto shadow-lg shadow-accent/10 transform transition-all hover:scale-[1.02]">
                            <p className="text-sm">Optimizing limit for ₹5,00,000</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-6 max-w-[95%] backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Probability Score</p>
                                    <p className="text-3xl font-display font-bold text-white drop-shadow-md">98.4<span className="text-lg text-accent">%</span></p>
                                </div>
                                <div className="h-12 w-12 rounded-full border-4 border-slate-800 border-t-accent animate-spin" style={{ animationDuration: '3s' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>LATENCY: 12ms</span>
                        <span>ENCRYPTION: AES-256</span>
                    </div>
                </div>

                {/* Decorative background cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-white/5 translate-x-6 translate-y-6 z-10 transition-transform duration-700 hover:translate-x-8 hover:translate-y-8"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-white/5 translate-x-12 translate-y-12 z-0 transition-transform duration-700 hover:translate-x-14 hover:translate-y-14"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
