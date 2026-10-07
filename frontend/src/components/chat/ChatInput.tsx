import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onResetConversation: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onResetConversation,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-cream-100/90 border-t border-vintageGold-500/30 p-3 sm:p-4 backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          
          {/* Textarea Input */}
          <div className="relative flex-1 bg-cream-50 rounded-2xl border-2 border-vintageGold-500/40 focus-within:border-vintageGold-600 focus-within:ring-2 focus-within:ring-vintageGold-500/20 shadow-sm transition-all">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me how you're feeling today... (e.g. exhausted after college, celebrating, cozy...)"
              disabled={isLoading}
              className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-espresso-950 placeholder-espresso-400 font-sans focus:outline-none resize-none max-h-32"
            />
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={onResetConversation}
            title="Start Fresh Conversation"
            className="p-3 rounded-2xl bg-cream-200/80 text-espresso-700 hover:text-espresso-950 hover:bg-cream-300 transition-colors border border-vintageGold-500/30"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-3.5 rounded-2xl bg-espresso-900 text-vintageGold-300 font-serif font-semibold text-xs tracking-wider uppercase shadow-vintage hover:bg-espresso-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-vintageGold-300 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">Send</span>
                <Send className="w-3.5 h-3.5 text-vintageGold-400" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-espresso-500/80 text-center mt-2 font-serif italic">
          Press Enter to share your moment. Shift + Enter for new line.
        </p>
      </div>
    </div>
  );
};
