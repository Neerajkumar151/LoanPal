import { FileText, Upload, Brain, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const steps = [
  {
    icon: FileText,
    title: 'Enter Basic Details',
    description: 'Share your personal and income information in just a few clicks',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Upload,
    title: 'Upload Documents',
    description: 'Securely upload required documents like ID, salary slips, and bank statements',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Brain,
    title: 'AI Reviews Application',
    description: 'Our AI instantly analyzes your profile and creditworthiness',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: CheckCircle,
    title: 'Instant Approval',
    description: 'Get instant approval or clear feedback on what to improve',
    color: 'from-blue-600 to-emerald-600',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your loan approved in 4 simple steps. Fast, transparent, and hassle-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative z-10 border border-border">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-secondary text-foreground font-bold flex items-center justify-center text-sm">
                      {index + 1}
                    </div>

                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Ready to get started?</p>
          <button onClick={() => navigate('/apply')} className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
}
