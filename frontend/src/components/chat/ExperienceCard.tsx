import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Check } from 'lucide-react';
import { ZoneRecommendation } from '../../types';

interface ExperienceCardProps {
  zone: ZoneRecommendation;
  onLockZone?: (zoneName: string) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ zone, onLockZone }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(true);
    onLockZone?.(`${zone.name} - ${zone.seating_name}`);
  };

  return (
    <div className="mt-4 bg-cream-50 rounded-2xl border border-vintageGold-500/40 overflow-hidden shadow-vintage p-5 flex flex-col sm:flex-row items-center gap-5">
      
      {/* Zone Thumbnail */}
      <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0 relative bg-espresso-900 border border-vintageGold-500/30">
        <img
          src={zone.image}
          alt={zone.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 to-transparent" />
        <div className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-vintageGold-300 uppercase tracking-widest truncate">
          {zone.tagline}
        </div>
      </div>

      {/* Zone Details */}
      <div className="flex-1 space-y-2 text-left">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-vintageGold-500/20 text-vintageGold-800 border border-vintageGold-500/30">
            Recommended Seating Sanctuary
          </span>
        </div>

        <h4 className="font-display font-bold text-lg text-espresso-950">
          {zone.name} <span className="text-vintageGold-600 font-serif text-sm">({zone.seating_name})</span>
        </h4>

        <p className="text-xs text-espresso-700 font-serif italic">
          "{zone.why_it_fits}"
        </p>

        <div className="text-[11px] text-espresso-600 flex items-center gap-1.5 pt-1">
          <Compass className="w-3.5 h-3.5 text-vintageGold-600 shrink-0" />
          <span><strong>Ambiance:</strong> {zone.ambiance}</span>
        </div>
      </div>

      {/* Select button */}
      <div className="w-full sm:w-auto shrink-0">
        <button
          onClick={handleSelect}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-serif text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm ${
            selected
              ? 'bg-vintageGold-600 text-cream-50'
              : 'bg-espresso-900 text-vintageGold-300 hover:bg-espresso-800 active:scale-95'
          }`}
        >
          {selected ? (
            <>
              <Check className="w-4 h-4" /> Reserved for Tray
            </>
          ) : (
            <>
              <MapPin className="w-3.5 h-3.5 text-vintageGold-400" /> Sit in this Nook
            </>
          )}
        </button>
      </div>

    </div>
  );
};
