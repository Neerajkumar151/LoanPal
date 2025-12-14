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
  <div className="w-full bg-card border-b border-border py-4">
    {/* CENTER ONLY THE TRACKER */}
    <div className="flex justify-center">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => {
          const stepIndex = stepOrder.indexOf(step.id);
          const isActive = stepIndex <= currentIndex && currentStep !== 'greeting';
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              {/* STEP */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    isActive && !isCurrent && "bg-success text-accent-foreground",
                    !isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={cn(
                    "text-xs mt-1 font-medium transition-colors",
                    isCurrent && "text-primary",
                    isActive && !isCurrent && "text-success",
                    !isActive && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* CONNECTOR */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-8 h-1 rounded transition-colors",
                    "w-20 sm:w-32 md:w-40 lg:w-52",
                    stepIndex < currentIndex ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

}
