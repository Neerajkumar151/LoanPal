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
    <div className="border-t border-border bg-card p-4">
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-sm"
            >
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
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
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </>
        )}
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={
            selectedFiles.length > 0
              ? "Click send to upload files..."
              : showUpload
              ? "Upload documents or type a message..."
              : "Type your message..."
          }
          className="flex-1"
          disabled={isTyping}
        />
        
        <Button
          onClick={handleSend}
          disabled={(!message.trim() && selectedFiles.length === 0) || isTyping}
          className={cn(
            "flex-shrink-0",
            selectedFiles.length > 0 && "bg-success hover:bg-success/90"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {showUpload && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Accepted formats: PDF, DOC, DOCX, JPG, PNG
        </p>
      )}
    </div>
  );
}
