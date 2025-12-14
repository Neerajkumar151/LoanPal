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
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser ? "bg-primary" : "bg-secondary"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-secondary-foreground" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card text-card-foreground rounded-bl-md border border-border"
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content.split('\n').map((line, i) => {
            // Parse inline bold (**text**) and render properly
            const renderLine = (text: string) => {
              const parts = text.split(/(\*\*[^*]+\*\*)/g);
              return parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j}>{part.slice(2, -2)}</strong>;
                }
                return <span key={j}>{part}</span>;
              });
            };

            if (line.startsWith('• ') || line.startsWith('- ')) {
              return (
                <p key={i} className="ml-2">
                  {renderLine(line)}
                </p>
              );
            }
            if (line.match(/^\d+\./)) {
              return (
                <p key={i} className="ml-2">
                  {renderLine(line)}
                </p>
              );
            }
            return <p key={i}>{renderLine(line)}</p>;
          })}
        </div>
        <span
          className={cn(
            "text-[10px] mt-1 block",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
});

ChatBubble.displayName = 'ChatBubble';
