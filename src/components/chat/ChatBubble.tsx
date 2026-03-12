import { forwardRef } from 'react';
import { ChatMessage } from '@/types/loan';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(({ message }, ref) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform hover:scale-105",
          isUser 
            ? "bg-gradient-to-br from-accent to-yellow-600 shadow-accent/20" 
            : "bg-slate-800 border border-white/10"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-slate-900" />
        ) : (
          <Bot className="w-5 h-5 text-slate-300" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-[1.5rem] px-6 py-4 relative group transition-all",
          isUser
            ? "bg-accent text-slate-900 rounded-tr-md shadow-md shadow-accent/5"
            : "bg-slate-900 text-slate-200 rounded-tl-md border border-white/5 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.2)]"
        )}
      >
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed font-light">
          {message.content.split('\n').map((line, i) => {
            // Parse inline bold (**text**) and render properly
            const renderLine = (text: string) => {
              const parts = text.split(/(\*\*[^*]+\*\*)/g);
              return parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j} className={isUser ? "font-semibold text-slate-900 overflow-wrap-anywhere" : "font-semibold text-white"}>{part.slice(2, -2)}</strong>;
                }
                return <span key={j}>{part}</span>;
              });
            };

            if (line.startsWith('• ') || line.startsWith('- ')) {
              return (
                <p key={i} className="ml-4 relative before:content-[''] before:absolute before:left-[-12px] before:top-[8px] before:w-1.5 before:h-1.5 before:bg-current before:rounded-full before:opacity-60 my-1">
                  {renderLine(line.substring(2))}
                </p>
              );
            }
            if (line.match(/^\d+\./)) {
              return (
                <p key={i} className="ml-2 my-1">
                  {renderLine(line)}
                </p>
              );
            }
            return <p key={i} className={i > 0 ? "mt-2" : ""}>{renderLine(line)}</p>;
          })}
        </div>
        <span
          className={cn(
            "text-[11px] mt-2 block font-medium uppercase tracking-wider",
            isUser ? "text-slate-900/60" : "text-slate-400/60"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
});

ChatBubble.displayName = 'ChatBubble';
