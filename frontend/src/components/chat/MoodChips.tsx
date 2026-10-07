import React from 'react';

interface MoodChipsProps {
  onSelectMood: (chipText: string) => void;
  disabled?: boolean;
}

export const MoodChips: React.FC<MoodChipsProps> = ({ onSelectMood, disabled }) => {
  const chips = [
    { label: '☕ Cozy', text: "I'm feeling cozy and want something warm and gentle." },
    { label: '🌿 Calm', text: "I'm feeling calm and want to unwind peacefully." },
    { label: '✨ Happy', text: "I'm feeling happy today!" },
    { label: '⚡ Energetic', text: "I'm full of energy and want something bold." },
    { label: '🍰 Craving something sweet', text: "I'm craving something sweet but not too heavy." },
    { label: '📖 Want to relax & read', text: "I want to sit quietly, relax, and read." },
    { label: '🎉 Celebrating', text: "I feel like celebrating a special moment!" },
    { label: '🕰️ Feeling nostalgic', text: "I feel nostalgic. Give me something classic." },
    { label: '🥗 Vegetarian & Spicy', text: "I'm vegetarian and want something spicy." },
    { label: '🧊 Cold & Refreshing', text: "I want something cold and refreshing." },
    { label: '😴 Exhausted after college', text: "I'm exhausted after college." },
    { label: '☕ Coffee & Filling meal', text: "I want coffee and something filling." },
  ];

  return (
    <div className="w-full py-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-espresso-600">
          Suggested Moments:
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => onSelectMood(chip.text)}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-serif font-medium bg-cream-100/90 hover:bg-cream-200/90 text-espresso-900 border border-vintageGold-500/35 shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};
