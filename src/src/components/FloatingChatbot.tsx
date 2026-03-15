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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
        <strong key={idx} className="font-bold text-accent">
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
    
    setIsLoading(true); 
    
    try {
      const { error } = await (supabase
        .from('floating_chat_messages' as any)
        .delete()
        .eq('user_id', user.id)) as any;

      if (error) {
        throw error;
      }

      setMessages([{
         role: 'assistant',
         content: `Chat history cleared! How can I help you now?`
      }]);
      
      setHasLoadedHistory(true); 
      toast.success("Chat history cleared successfully");
      
    } catch (err) {
      console.error("Failed to delete chat history:", err);
      toast.error("Could not delete history. Please check your connection.");
      setHasLoadedHistory(false); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark">
      {/* Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-8 right-8 flex items-center justify-center gap-3 rounded-[1.5rem] shadow-lg shadow-black/50 bg-slate-900 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 z-50 px-4 py-7 group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center shadow-md shadow-accent/20 group-hover:scale-110 transition-transform">
             <Bot className="text-slate-900 w-5 h-5" />
          </div>
          <span className="text-white font-bold text-lg font-display pr-2">Chat</span>
        </Button>
      )}

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 transition-all duration-300 origin-bottom-right overflow-hidden",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-10 pointer-events-none"
        )}
        style={{ height: '600px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-5 py-5 text-white shadow-md relative overflow-hidden">
           <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-accent/5 rounded-full blur-[40px] pointer-events-none"></div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-yellow-600 shadow-md shadow-accent/20">
            <Bot className="h-6 w-6 text-slate-900" />
          </div>
          <div className="flex-1 z-10">
            <h3 className="font-bold text-lg font-display tracking-wide">LoanPal Assistant</h3>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              <p className="text-[10px] uppercase tracking-wider opacity-90 font-medium text-slate-300">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 z-10">
            {/* Delete History Button */}
            {user && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
                    disabled={isLoading}
                    title="Clear History"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-900 border-white/10 text-white rounded-[2rem]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-display">Clear Chat History?</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-400">
                      This action cannot be undone. This will permanently delete your entire conversation history with LoanPal Assistant.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={clearChatHistory}
                      className="bg-accent text-slate-900 hover:bg-yellow-500 rounded-xl font-bold"
                    >
                      Delete History
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {/* Cancel (Close) Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-slate-950/50">
          <div className="flex flex-col gap-6 pt-2">
            {messages.map((msg, idx) => (
              <div
                key={msg.id || idx}
                className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm",
                  msg.role === 'user' ? "bg-gradient-to-br from-accent to-yellow-600 text-slate-900" : "bg-slate-800 border border-white/10 text-slate-300"
                )}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-[1.25rem] px-5 py-3 text-[14px] leading-relaxed shadow-sm font-light",
                    msg.role === 'user'
                      ? "bg-accent text-slate-900 rounded-tr-sm shadow-accent/5 font-medium"
                      : "bg-slate-900 text-slate-200 border border-white/5 rounded-tl-sm shadow-[0_4px_15px_-5px_rgba(0,0,0,0.2)]"
                  )}
                >
                  {msg.role === 'assistant' ? formatMessageContent(msg.content) : msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-white/10">
                  <Bot className="h-4 w-4 text-slate-300" />
                </div>
                <div className="flex items-center gap-1.5 rounded-[1.25rem] rounded-tl-sm bg-slate-900 border border-white/5 px-5 py-4">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-slate-950 border-t border-white/5">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-[1.5rem] border border-white/10 focus-within:border-accent/40 focus-within:ring-1 focus-within:ring-accent/20 transition-all duration-300 shadow-inner">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-slate-200 placeholder:text-slate-500 px-3"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className={cn(
                 "h-10 w-10 shrink-0 rounded-[1rem] transition-all",
                 input.trim() ? "bg-accent hover:bg-yellow-500 text-slate-900 shadow-md shadow-accent/20" : "bg-slate-800 text-slate-500 hover:bg-slate-700"
              )}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4 ml-0.5" />}
            </Button>
          </div>
           <div className="flex justify-center mt-3">
              <p className="text-[9px] text-slate-500 font-medium tracking-[0.15em] uppercase opacity-70">Secured with AES-256 Encryption</p>
           </div>
        </div>
      </div>
    </div>
  );
}