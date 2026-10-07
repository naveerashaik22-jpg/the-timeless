import React from 'react';
import { Clock, User, Sparkles, AlertCircle, Heart } from 'lucide-react';
import { ChatMessage } from '../../types';
import { RecommendationCard } from './RecommendationCard';
import { ExperienceCard } from './ExperienceCard';

interface MessageBubbleProps {
  message: ChatMessage;
  onTellMeMore?: (itemName: string) => void;
  onShowAnother?: () => void;
  onSelectMoodChip?: (chipText: string) => void;
  onLockZone?: (zoneName: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onTellMeMore,
  onShowAnother,
  onSelectMoodChip,
  onLockZone,
}) => {
  const isUser = message.role === 'user';

  // Format simple markdown bolding and linebreaks
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-1" />;
          
          // Replace **text** with strong tag
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={i} className="leading-relaxed">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="font-semibold text-espresso-950 font-serif">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex gap-3 sm:gap-4 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-espresso-900 border border-vintageGold-500 flex items-center justify-center text-vintageGold-400 shrink-0 shadow-sm mt-1">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      )}

      <div className={`max-w-3xl ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        
        {/* Message Card Bubble */}
        <div
          className={`rounded-2xl p-4 sm:p-5 shadow-sm text-sm sm:text-base ${
            isUser
              ? 'bg-espresso-900 text-cream-50 rounded-br-none border border-vintageGold-500/30'
              : message.is_safety_redirect
              ? 'bg-amber-50/95 border-2 border-amber-500/50 text-espresso-900 rounded-bl-none shadow-vintage'
              : 'bg-cream-100/90 text-espresso-900 rounded-bl-none border border-vintageGold-500/30 shadow-vintage'
          }`}
        >
          {/* Detected Mood pill if available for assistant */}
          {!isUser && message.mood && (
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-espresso-600">
                Interpreted Moment:
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-vintageGold-500/20 text-espresso-900 border border-vintageGold-500/40">
                ✨ {message.mood}
              </span>
              {message.preferences?.dietary && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cream-200 text-espresso-800 border border-vintageGold-500/20">
                  🌱 {message.preferences.dietary}
                </span>
              )}
              {message.preferences?.taste && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cream-200 text-espresso-800 border border-vintageGold-500/20">
                  Taste: {message.preferences.taste}
                </span>
              )}
            </div>
          )}

          {/* Safety alert icon */}
          {message.is_safety_redirect && (
            <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-xs uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 text-burgundy-600" />
              Gentle Care Notice
            </div>
          )}

          {/* Body Content */}
          <div className="font-sans leading-relaxed text-xs sm:text-sm">
            {renderFormattedContent(message.content)}
          </div>

          {/* Timestamp */}
          <div className={`mt-2 text-[10px] ${isUser ? 'text-vintageGold-400/80 text-right' : 'text-espresso-500'}`}>
            {message.timestamp}
          </div>
        </div>

        {/* Follow-up question quick options */}
        {message.follow_up_question && (
          <div className="mt-3 p-3 rounded-xl bg-cream-50 border border-vintageGold-500/30 w-full">
            <p className="text-xs text-espresso-800 font-serif italic mb-2">
              "{message.follow_up_question}"
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onSelectMoodChip?.('I prefer something sweet.')}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 hover:bg-cream-300 text-espresso-900 border border-vintageGold-500/30"
              >
                🍰 Sweet
              </button>
              <button
                onClick={() => onSelectMoodChip?.('I prefer something savoury and warm.')}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 hover:bg-cream-300 text-espresso-900 border border-vintageGold-500/30"
              >
                🥪 Savoury
              </button>
              <button
                onClick={() => onSelectMoodChip?.('Something light is perfect.')}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 hover:bg-cream-300 text-espresso-900 border border-vintageGold-500/30"
              >
                🥗 Light
              </button>
            </div>
          </div>
        )}

        {/* Render Recommendation Cards Grid */}
        {message.recommendations && message.recommendations.length > 0 && (
          <div className="w-full mt-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-bold text-base text-espresso-950 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-vintageGold-600" />
                Curated Recommendations for You
              </h4>
              <span className="text-[11px] text-espresso-600 font-serif italic">
                Realistic Café Pricing (INR)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {message.recommendations.map((rec, idx) => (
                <RecommendationCard
                  key={idx}
                  rec={rec}
                  onTellMeMore={onTellMeMore}
                  onShowAnother={onShowAnother}
                />
              ))}
            </div>
          </div>
        )}

        {/* Render Paired Zone Experience */}
        {message.zone_recommendation && (
          <div className="w-full">
            <ExperienceCard zone={message.zone_recommendation} onLockZone={onLockZone} />
          </div>
        )}

      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-300 border border-vintageGold-500/60 flex items-center justify-center text-espresso-900 shrink-0 shadow-sm mt-1">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      )}

    </div>
  );
};
