import { FileText, Upload, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: FileText,
    title: 'Profile Init',
    description: 'Provide basic identity and income parameters to establish your secure financial profile.',
    num: '01',
  },
  {
    icon: Upload,
    title: 'Data Ingestion',
    description: 'Upload cryptographic proofs of income and identity — KYC, statements, salary slips.',
    num: '02',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our proprietary models assess 50+ alternative data points in milliseconds.',
    num: '03',
  },
  {
    icon: CheckCircle,
    title: 'Capital Deploy',
    description: 'Instant algorithmic approval followed by immediate fund disbursement.',
    num: '04',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-[hsl(220,25%,7%)] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-overline text-accent uppercase tracking-[0.2em] mb-4">Architected for Speed</p>
          <h2 className="font-display text-display-md sm:text-display-lg text-white mb-6 tracking-tight">
            The Intelligent Flow
          </h2>
          <p className="text-body-lg text-white/40 max-w-xl mx-auto">
            Bypass traditional banking bureaucracy. Four stages. Zero friction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-children mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative">
                <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/[0.06] hover:border-accent/20 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col border-gradient">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-overline text-accent/60 font-mono">{step.num}</span>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 group-hover:shadow-[0_0_20px_hsl(45_100%_51%/0.1)] transition-all duration-500">
                      <Icon className="w-5 h-5 text-white/50 group-hover:text-accent transition-colors duration-500" />
                    </div>
                  </div>

                  <h3 className="font-display text-heading text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-caption text-white/35 leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
          <button 
            onClick={() => navigate('/apply')} 
            className="group relative overflow-hidden bg-accent text-accent-foreground px-10 py-4 rounded-2xl font-display font-semibold text-base shadow-[var(--shadow-glow)] hover:shadow-[0_0_80px_-12px_hsl(45_100%_51%/0.4)] hover:-translate-y-0.5 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
