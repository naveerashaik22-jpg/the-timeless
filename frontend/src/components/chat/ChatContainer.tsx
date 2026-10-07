import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Clock, Compass, ShieldAlert, ArrowLeft } from 'lucide-react';
import { ChatMessage, DetectedPreferences } from '../../types';
import { sendChatMessage } from '../../services/api';
import { MessageBubble } from './MessageBubble';
import { MoodChips } from './MoodChips';
import { ChatInput } from './ChatInput';

interface ChatContainerProps {
  initialPrompt?: string;
  onNavigateHome: () => void;
  onSelectZoneInCart?: (zoneName: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  initialPrompt,
  onNavigateHome,
  onSelectZoneInCart,
}) => {
  const initialBotMessage: ChatMessage = {
    id: 'msg-welcome',
    role: 'assistant',
    content: "Welcome to The Timeless. How are you feeling today?\n\nTell me in your own words — whether you are tired, happy, craving something sweet, or wishing for a quiet corner to read.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const [currentPreferences, setCurrentPreferences] = useState<DetectedPreferences>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSentRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If navigated with an initial prompt from landing page
  useEffect(() => {
    if (initialPrompt && !initialSentRef.current) {
      initialSentRef.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await sendChatMessage({
        message: text,
        session_id: 'session-main',
        current_preferences: currentPreferences,
      });

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: res.mood,
        preferences: res.preferences,
        recommendations: res.recommendations,
        zone_recommendation: res.zone_recommendation,
        follow_up_question: res.follow_up_question,
        is_faq: res.is_faq,
        is_safety_redirect: res.is_safety_redirect,
      };

      if (res.preferences) {
        setCurrentPreferences(res.preferences);
      }

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to reach café assistant. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content: "I apologize, our brewing clock encountered a brief hiccup. I am still here — please try saying that once more.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([initialBotMessage]);
    setCurrentPreferences({});
    setError(null);
  };

  const handleTellMeMore = (itemName: string) => {
    handleSendMessage(`Tell me more about ${itemName} and what makes it special.`);
  };

  const handleShowAnother = () => {
    handleSendMessage("Could you show me another alternative recommendation?");
  };

  const handleLockZone = (zoneName: string) => {
    onSelectZoneInCart?.(zoneName);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-5xl mx-auto w-full vintage-paper-bg border-x border-vintageGold-500/20 shadow-vintage">
      
      {/* Companion Top Bar */}
      <div className="px-4 sm:px-6 py-3 border-b border-vintageGold-500/30 bg-cream-100/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="p-1.5 rounded-lg text-espresso-700 hover:text-espresso-950 hover:bg-cream-200 transition-colors"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base text-espresso-950 uppercase tracking-widest">
                The Timeless
              </span>
              <span className="text-[10px] bg-vintageGold-500/20 text-espresso-900 px-2 py-0.5 rounded-full border border-vintageGold-500/30 font-semibold uppercase">
                Café Companion
              </span>
            </div>
            <p className="text-[11px] text-espresso-600 font-serif italic">
              "Tell us how you feel. We'll find something that fits your moment."
            </p>
          </div>
        </div>

        {/* Active Interpreted Preferences Tag Bar */}
        {currentPreferences.mood && (
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-espresso-500">Active Mood:</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-vintageGold-500 text-espresso-950 shadow-sm">
              ✨ {currentPreferences.mood}
            </span>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-2">
        
        {/* Mood quick chips at top */}
        <div className="mb-4">
          <MoodChips onSelectMood={handleSendMessage} disabled={isLoading} />
        </div>

        {/* Message stream */}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onTellMeMore={handleTellMeMore}
            onShowAnother={handleShowAnother}
            onSelectMoodChip={handleSendMessage}
            onLockZone={handleLockZone}
          />
        ))}

        {/* Loading typing indicator */}
        {isLoading && (
          <div className="flex gap-3 items-center text-espresso-700 text-xs font-serif italic py-2">
            <div className="w-8 h-8 rounded-full bg-espresso-900 text-vintageGold-400 flex items-center justify-center border border-vintageGold-500/40">
              <Clock className="w-4 h-4 animate-spin" />
            </div>
            <span>Listening closely to your moment and consulting our vintage menu...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onResetConversation={handleReset}
      />
    </div>
  );
};
