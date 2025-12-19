import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
// Removed duplicate/unused imports

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
}

interface FloatingChatRecord {
  id: string;
  user_id: string;
  role: string;
  content: string;
  created_at: string;
}

// --- Formatting Helpers ---
const formatMessageContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, lineIdx) => {
    // Handle bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-') || (line.trim().startsWith('*') && !line.trim().startsWith('**'))) {
      const bulletContent = line.replace(/^[\s]*[•\-\*]\s*/, '');
      return (
        <div key={lineIdx} className="flex gap-2 ml-2 my-1">
          <span>•</span>
          <span>{formatInlineText(bulletContent)}</span>
        </div>
      );
    }
    // Handle numbered lists
    const numberedMatch = line.match(/^(\d+[\.\)])\s*(.*)/);
    if (numberedMatch) {
      return (
        <div key={lineIdx} className="flex gap-2 ml-2 my-1">
          <span className="font-semibold">{numberedMatch[1]}</span>
          <span>{formatInlineText(numberedMatch[2])}</span>
        </div>
      );
    }
    // Handle headings
    if (line.trim().endsWith(':') && line.trim().length < 50 && !line.includes('http')) {
      return (
        <div key={lineIdx} className="font-bold text-sm mt-2 mb-1">
          {formatInlineText(line)}
        </div>
      );
    }
    // Regular line
    if (line.trim()) {
      return (
        <div key={lineIdx} className="my-0.5">
          {formatInlineText(line)}
        </div>
      );
    }
    // Empty line
    return <div key={lineIdx} className="h-2" />;
  });
};

const formatInlineText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};
// ----------------------------------------------

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  
  // Refs for scrolling and input
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  // 1. SCROLL TO BOTTOM HELPER
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  // 2. AUTH LISTENER
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setMessages([]); 
        setHasLoadedHistory(false);
        setInput('');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // 3. LOAD HISTORY ON LOGIN
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!user || hasLoadedHistory) return;
      
      try {
        const { data, error } = await (supabase
          .from('floating_chat_messages' as any)
          .select('id, role, content, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(50)) as { data: FloatingChatRecord[] | null; error: any };

        if (error) throw error;

        if (data && data.length > 0) {
          const loadedMessages: Message[] = data.map(msg => ({
            id: msg.id,
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          }));
          setMessages(loadedMessages);
        } else {
          setMessages([{
            role: 'assistant',
            content: `Hello! 👋 Welcome back to LoanPal. I'm your AI assistant. How can I help you today? 🏦`
          }]);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
        setMessages([{
          role: 'assistant',
          content: `Hello! 👋 Welcome to LoanPal. How can I help you?`
        }]);
      } finally {
        setHasLoadedHistory(true);
      }
    };

    if (isOpen && user) {
      loadChatHistory();
    }
  }, [user, isOpen, hasLoadedHistory]);

  // 4. GUEST WELCOME MESSAGE
  useEffect(() => {
    if (isOpen && !user && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `Hello! 👋 Welcome to LoanPal. I'm your AI assistant. I can help you with loan queries, EMI calculations, and credit score tips. How can I assist you today? 💬`
      }]);
    }
  }, [isOpen, user, messages.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  // Save message to Supabase
  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!user) return null;
    try {
      const { data } = await (supabase
        .from('floating_chat_messages' as any)
        .insert({ user_id: user.id, role, content })
        .select('id')
        .single()) as { data: { id: string } | null };
      return data?.id;
    } catch (err) {
      console.error('Failed to save message:', err);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // UI Update
    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    
    if (user) saveMessage('user', userMessage);
    
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-10);

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: userMessage,
          conversationHistory,
          includeUserContext: !!user
        }
      });

      if (error) throw error;

      const assistantContent = data.response || "I'm sorry, I couldn't process that. Please try again. 🙏";
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantContent
      }]);
      
      if (user) saveMessage('assistant', assistantContent);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. 🔄"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 5. ROBUST CLEAR HISTORY FUNCTION
  const clearChatHistory = async () => {
    if (!user) return;
    
    if (confirm("Are you sure you want to delete your entire chat history?")) {
      setIsLoading(true); 
      
      try {
        const { error } = await supabase
          .from('floating_chat_messages')
          .delete()
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setMessages([{
           role: 'assistant',
           content: `Chat history cleared! How can I help you now?`
        }]);
        
        setHasLoadedHistory(true); 
        
      } catch (err) {
        console.error("Failed to delete chat history:", err);
        alert("Could not delete history. Please check your connection.");
        setHasLoadedHistory(false); 
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-8 right-8 flex items-center justify-center gap-3 rounded-full shadow-lg bg-primary transition-all duration-300 hover:scale-110 z-50 px-6 py-7"
        >
          {/* Changed fixed inline style to Tailwind classes */}
          <Bot className="text-white" style={{ width: '30px', height: '30px' }} />
                    <span className="text-white font-semibold text-2xl">AI</span>
        </Button>
      )}

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 origin-bottom-right",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-10 pointer-events-none"
        )}
        style={{ height: '600px' }}
      >
        {/* Header - Stays Primary Color */}
        <div className="flex items-center gap-3 rounded-t-2xl bg-primary px-4 py-4 text-primary-foreground shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold leading-none">LoanPal Assistant</h3>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] uppercase tracking-wider opacity-90 font-medium">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Delete History Button */}
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10" 
                onClick={clearChatHistory} 
                title="Clear History"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}

            {/* Cancel (Close) Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        {/* Changed bg-slate-50 to bg-muted/20 to work in dark mode */}
        <ScrollArea className="flex-1 p-4 bg-muted/20">
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div
                key={msg.id || idx}
                className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
                  // Replaced bg-white with bg-card
                  msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                )}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    msg.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      // Replaced bg-white with bg-card and text-foreground
                      : "bg-card text-card-foreground border border-border rounded-tl-none"
                  )}
                >
                  {msg.role === 'assistant' ? formatMessageContent(msg.content) : msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card border border-border">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-card border border-border px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border rounded-b-2xl">
          <div className="flex items-center gap-2 bg-muted p-1 rounded-full border border-border focus-within:border-primary/50 transition-colors">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              disabled={isLoading}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full shadow-md"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}