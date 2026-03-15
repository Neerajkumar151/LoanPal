import { ChatStep } from '@/types/loan';
import { FileText, FileCheck, Search, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressTrackerProps {
  currentStep: ChatStep;
}

const steps = [
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'documents', label: 'Documents', icon: FileCheck },
  { id: 'review', label: 'Review', icon: Search },
  { id: 'decision', label: 'Decision', icon: CheckCircle },
];

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  const stepOrder: ChatStep[] = ['greeting', 'details', 'documents', 'review', 'decision'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] pt-6 pb-6 shadow-sm">
      <div className="flex justify-center">
        <div className="flex items-center max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 pt-2 pb-8">
        {steps.map((step, index) => {
          const stepIndex = stepOrder.indexOf(step.id as ChatStep);
          const isActive = stepIndex <= currentIndex && currentStep !== 'greeting';
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              {/* STEP */}
              <div className="flex flex-col items-center relative z-10 w-20">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm",
                    isCurrent && "bg-primary dark:bg-accent text-primary-foreground dark:text-slate-900 ring-4 ring-primary/20 dark:ring-accent/20 scale-110 shadow-lg shadow-primary/20 dark:shadow-accent/20",
                    isActive && !isCurrent && "bg-success text-white dark:text-slate-900 shadow-md",
                    !isActive && "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/5"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isCurrent && "animate-pulse")} />
                </div>

                <span
                  className={cn(
                    "text-[11px] mt-2 font-semibold uppercase tracking-wider transition-colors absolute top-12 whitespace-nowrap",
                    isCurrent && "text-primary dark:text-accent font-bold",
                    isActive && !isCurrent && "text-success",
                    !isActive && "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* CONNECTOR */}
              {index < steps.length - 1 && (
                <div className="flex-1 px-2 z-0 relative -ml-6 -mr-6">
                  <div
                    className={cn(
                      "h-1 w-16 sm:w-24 md:w-32 lg:w-40 rounded-full transition-colors duration-500",
                      stepIndex < currentIndex 
                        ? "bg-success shadow-[0_0_10px_rgba(34,197,94,0.4)]" 
                        : "bg-slate-200 dark:bg-slate-800"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

}
