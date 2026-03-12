import { FileText, Upload, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: FileText,
    title: 'Profile Initialization',
    description: 'Provide basic identity and income parameters to establish your secure financial profile.',
  },
  {
    icon: Upload,
    title: 'Data Ingestion',
    description: 'Upload necessary cryptographic proofs of income and identity (KYC/Statements).',
  },
  {
    icon: Brain,
    title: 'Quantum AI Analysis',
    description: 'Our proprietary models assess 50+ alternative data points in milliseconds.',
  },
  {
    icon: CheckCircle,
    title: 'Capital Deployment',
    description: 'Instant algorithmic approval followed by immediate fund disbursement to your account.',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-3">Architected for Speed</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">
            The Intelligent Lending Flow
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Bypass the bureaucracy of traditional banking. Our four-stage algorithmic process is designed for maximum efficiency and transparency.
          </p>
        </div>

        <div className="relative">
          {/* Glowing connecting line */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent">
             <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse-slow"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group perspective-1000">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Node */}
                    <div className="relative z-10">
                        <div className="w-24 h-24 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] group-hover:border-accent/40">
                        <Icon className="w-10 h-10 text-slate-300 group-hover:text-accent transition-colors duration-500" />
                        
                        {/* Status Ping */}
                        <div className="absolute -top-2 -right-2">
                            <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 duration-1000"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-slate-900"></span>
                            </span>
                        </div>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 text-accent font-display font-bold text-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>

                    <h3 className="text-xl font-bold font-display text-white tracking-wide">
                      {step.title}
                    </h3>

                    <p className="text-slate-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
          <button onClick={() => navigate('/apply')} className="group relative overflow-hidden bg-accent text-accent-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:shadow-[0_0_50px_rgba(250,204,21,0.4)] hover:-translate-y-1 transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center gap-2">Initialize Flow <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
