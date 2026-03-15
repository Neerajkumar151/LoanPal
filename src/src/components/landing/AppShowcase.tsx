import { ArrowRight, Bot, Cpu, Zap } from 'lucide-react';

export default function AppShowcase() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-3">Experience the Future</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">
            The LoanPal <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">Digital Ecosystem</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Where cutting-edge AI meets human-centric design. Experience a financial interface built for the modern era.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Visual Side */}
          <div className="relative group p-4 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-slate-900">
              <img 
                src="/images/hero-app.png" 
                alt="App Interface" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            </div>
            {/* Decorative background glass */}
            <div className="absolute -inset-2 bg-white/5 backdrop-blur-3xl rounded-[3.5rem] -z-10 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
          </div>

          {/* Text Side */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000 fill-mode-both">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                <Bot className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">Intuitive AI Interaction</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Navigate your financial journey with a zero-friction interface. Our AI companion guides you through every step of the lending process.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                <Zap className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">Instant Feedback Loops</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Get real-time updates on your application status. Our system processes and displays complex financial data with elegant simplicity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Side - Reverse for desktop */}
          <div className="order-2 lg:order-1 space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                <Cpu className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">Algorithmic Decisioning</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Experience the power of our quantum-inspired logic. We analyze millions of data points to provide you with the best possible financial outcomes.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                <ArrowRight className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">Seamless Fund Delivery</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  From approval to disbursement in seconds. Our integrated payment rails ensure your capital is always exactly where you need it.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="order-1 lg:order-2 relative group p-4 animate-in fade-in slide-in-from-right-12 duration-1000 fill-mode-both">
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-slate-900">
              <img 
                src="/images/quantum-logic.png" 
                alt="AI Engine" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            </div>
            {/* Decorative background glass */}
            <div className="absolute -inset-2 bg-white/5 backdrop-blur-3xl rounded-[3.5rem] -z-10 -translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
