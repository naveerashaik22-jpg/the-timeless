import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onStartChatWithPrompt: (prompt?: string) => void;
  onExploreMenu: () => void;
  onExploreZones: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartChatWithPrompt,
  onExploreMenu,
  onExploreZones,
}) => {
  const [feelingInput, setFeelingInput] = useState('');

  const samplePrompts = [
    "I'm exhausted after college.",
    "I want something sweet but not too heavy.",
    "I'm happy and want to celebrate!",
    "I want to sit quietly and read.",
    "I want something cold and refreshing.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feelingInput.trim()) {
      onStartChatWithPrompt(feelingInput.trim());
    } else {
      onStartChatWithPrompt();
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 vintage-paper-bg">
      {/* Background ambient lighting overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vintageGold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top vintage badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200/90 border border-vintageGold-500/50 shadow-sm text-espresso-900 text-xs font-semibold uppercase tracking-[0.25em] mb-8 animate-gold-pulse">
          <Sparkles className="w-3.5 h-3.5 text-vintageGold-600" />
          The Experiential Café Sanctuary
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-espresso-950 leading-[1.1] mb-6">
          THE TIMELESS
        </h1>

        {/* Core Philosophy Quote */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-espresso-800 font-normal max-w-3xl mx-auto leading-relaxed mb-4">
          “Tell us how you feel.<br className="hidden sm:inline" /> We’ll find something that fits your moment.”
        </p>

        <p className="text-sm sm:text-base text-espresso-600/90 max-w-xl mx-auto mb-10 leading-relaxed">
          Technology stays quietly in the background, while your human moment takes center stage. An AI companion that transforms feelings into curated brews, artisan culinary bites, and tailored seating nooks.
        </p>

        {/* Interactive Feeling Input Box */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSubmit} className="relative shadow-vintage-lg rounded-2xl bg-cream-50 border-2 border-vintageGold-500/40 p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-2 transition-all focus-within:border-vintageGold-600 focus-within:ring-4 focus-within:ring-vintageGold-500/20">
            <input
              type="text"
              value={feelingInput}
              onChange={(e) => setFeelingInput(e.target.value)}
              placeholder="How are you feeling today? (e.g. exhausted, celebrating, cozy...)"
              className="w-full bg-transparent px-4 py-3 text-espresso-950 placeholder-espresso-400/80 font-serif text-base sm:text-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-espresso-900 text-vintageGold-300 font-serif font-semibold text-sm whitespace-nowrap shadow-vintage hover:bg-espresso-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Ask Companion</span>
              <ArrowRight className="w-4 h-4 text-vintageGold-400" />
            </button>
          </form>

          {/* Quick feeling suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-espresso-500 font-semibold mr-1">
              Try saying:
            </span>
            {samplePrompts.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onStartChatWithPrompt(prompt)}
                className="text-xs bg-cream-100/90 hover:bg-cream-200 text-espresso-800 px-3 py-1 rounded-full border border-vintageGold-500/30 transition-all active:scale-95 text-left"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Primary & Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onStartChatWithPrompt()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-espresso-900 text-vintageGold-300 font-serif font-bold text-base shadow-vintage-lg hover:bg-espresso-800 hover:shadow-gold-glow active:scale-95 transition-all flex items-center justify-center gap-3 border border-vintageGold-500"
          >
            <Sparkles className="w-5 h-5 text-vintageGold-400" />
            Enter The Timeless
          </button>

          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-cream-100 text-espresso-950 font-serif font-semibold text-base shadow-vintage hover:bg-cream-200 active:scale-95 transition-all flex items-center justify-center gap-2 border border-vintageGold-500/40"
          >
            <BookOpen className="w-5 h-5 text-vintageGold-600" />
            Explore Menu (INR)
          </button>
        </div>

      </div>
    </section>
  );
};
