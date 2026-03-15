import { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChatStep } from '@/types/loan';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onUploadFiles: (files: FileList) => void;
  isTyping: boolean;
  currentStep: ChatStep;
}

export function ChatInput({ onSendMessage, onUploadFiles, isTyping, currentStep }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (selectedFiles.length > 0) {
      const dataTransfer = new DataTransfer();
      selectedFiles.forEach(file => dataTransfer.items.add(file));
      onUploadFiles(dataTransfer.files);
      setSelectedFiles([]);
      return;
    }

    if (!message.trim() || isTyping) return;
    onSendMessage(message.trim());
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const showUpload = currentStep === 'documents';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 bg-transparent mb-2">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-[2rem] p-3 transition-all focus-within:ring-2 focus-within:ring-accent/20">
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 px-2 pt-1">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm border border-white/5"
              >
                <span className="truncate max-w-[150px] font-medium text-slate-300">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {showUpload && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 rounded-full w-12 h-12 hover:bg-slate-800"
              >
                <Paperclip className="w-5 h-5 text-slate-400" />
              </Button>
            </>
          )}
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              selectedFiles.length > 0
                ? "Click send to upload documents..."
                : showUpload
                ? "Upload requested documents or type your query..."
                : "Type your message..."
            }
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-[15px] px-2 h-12 text-slate-200 placeholder:text-slate-500"
            disabled={isTyping}
          />
          
          <Button
            onClick={handleSend}
            disabled={(!message.trim() && selectedFiles.length === 0) || isTyping}
            className={cn(
              "flex-shrink-0 rounded-full w-12 h-12 transition-all p-0 shadow-md",
              (message.trim() || selectedFiles.length > 0)
                ? "bg-accent hover:bg-yellow-500 text-slate-900" 
                : "bg-slate-800 text-slate-500 shadow-none border border-white/5"
            )}
          >
            <Send className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
      
      {showUpload && (
        <div className="flex justify-center mt-3">
            <p className="text-xs text-slate-400 font-medium px-4 py-1.5 bg-slate-900/50 rounded-full backdrop-blur-sm shadow-sm inline-block border border-white/5">
                Secured Upload: PDF, DOC, DOCX, JPG, PNG
            </p>
        </div>
      )}
    </div>
  );
}
