import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-secondary">
        <Bot className="w-4 h-4 text-secondary-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '200ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}
