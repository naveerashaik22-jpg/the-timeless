import React from 'react';
import { Compass, Sparkles, Coffee, BookOpen, Music, Users, Shield } from 'lucide-react';
import { ZoneItem } from '../../types';

interface ZoneShowcaseProps {
  onSelectZoneForChat?: (zoneName: string) => void;
}

export const ZoneShowcase: React.FC<ZoneShowcaseProps> = ({ onSelectZoneForChat }) => {
  const zones: ZoneItem[] = [
    {
      id: 'zone-timeless',
      name: 'The Timeless',
      tagline: 'Grand Vintage Café & Clockwork Lounge',
      description: 'The centerpiece lounge with restored pendulum clocks, espresso aromas, and artisanal mahogany seating.',
      ideal_moods: ['Happy', 'Celebratory', 'Social', 'Curious'],
      ambiance: 'Warm amber lighting, soft acoustic piano, gentle café hum',
      features: ['Handcrafted espresso bar', 'Community vintage tables', 'Bespoke pastry display'],
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'zone-ink-ember',
      name: 'Ink & Ember',
      tagline: 'Reading & Writing Sanctuary',
      description: 'A secluded library alcove wrapped in floor-to-ceiling vintage oak bookshelves, antique brass lamps, and leather armchairs.',
      ideal_moods: ['Calm', 'Focused', 'Nostalgic', 'Tired'],
      ambiance: 'Quiet fireplace glow, turn-of-the-page silence, soft rain acoustics',
      features: ['Curated literature library', 'Vintage typewriter stations', 'Personal book stands'],
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'zone-tranquil-nook',
      name: 'The Tranquil Nook',
      tagline: 'Botanical Mindful Retreat',
      description: 'A sun-drenched sanctuary bordered by hanging ferns and soft floor cushions for meditation and restful pauses.',
      ideal_moods: ['Calm', 'Low-Energy', 'Tired', 'Focused'],
      ambiance: 'Gentle water fountain trickle, botanical fragrances, natural skylight',
      features: ['Floor cushion seating', 'Noise-filtering acoustic drapery', 'Herbal infusion bar'],
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'zone-retro',
      name: 'Retro',
      tagline: 'Vinyl Lounge & 70s Nostalgia',
      description: 'Step into a golden-era salon with analog turntable listening stations, vintage vinyl records, and warm corduroy booths.',
      ideal_moods: ['Nostalgic', 'Social', 'Happy', 'Curious'],
      ambiance: 'Warm vinyl crackle, classic jazz & soul, warm walnut tones',
      features: ['Headphone listening stations', 'Vinyl crate browsing', 'Retro arcade booth'],
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'zone-tiny-tales',
      name: 'Tiny Tales',
      tagline: 'Intimate Stories & Connection Corner',
      description: 'Cozy semi-private round tables designed for close friends, romantic dates, and heartfelt catch-ups with shared platters.',
      ideal_moods: ['Social', 'Happy', 'Celebratory'],
      ambiance: 'Intimate table lamps, soft laughter, celebratory warmth',
      features: ['Prompt conversation cards', 'Polaroid memory guestbook', 'Tasting flights'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'zone-echo-booth',
      name: 'Echo Booth',
      tagline: 'Solo Contemplation & Deep Focus Pods',
      description: 'Ergonomically crafted individual wooden booths with high sound-dampening walls, dedicated task lighting, and power.',
      ideal_moods: ['Focused', 'Energetic', 'Calm'],
      ambiance: 'Targeted concentration white noise, zero distraction, focused glow',
      features: ['Noise-canceling headsets', 'High-speed wired power', 'Call-free solo zone'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 vintage-paper-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-espresso-800 text-[11px] font-bold uppercase tracking-widest border border-vintageGold-500/30 mb-3">
            <Compass className="w-3.5 h-3.5 text-vintageGold-600" />
            The Aves Experiential Ecosystem
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
            Six Sanctuaries for Every State of Mind
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-espresso-700 mt-3">
            More than just seating — each zone is architected to deepen your experience.
          </p>
        </div>

        {/* Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-cream-50 rounded-2xl overflow-hidden border border-vintageGold-500/35 shadow-vintage hover:shadow-vintage-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image with Tagline Badge */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-espresso-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-vintageGold-300 bg-espresso-900/90 px-2.5 py-0.5 rounded-full border border-vintageGold-500/40">
                      {zone.tagline}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-cream-50 mt-1">
                      {zone.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-sans">
                  {zone.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-vintageGold-500/20">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-espresso-900 uppercase">Ideal for:</span>
                    {zone.ideal_moods.map((m, i) => (
                      <span key={i} className="text-[10px] font-medium bg-cream-200 text-espresso-800 px-2 py-0.5 rounded-md border border-vintageGold-500/20">
                        {m}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-espresso-600/90 font-serif italic">
                    <span className="font-semibold text-vintageGold-700">Ambiance:</span> {zone.ambiance}
                  </p>
                </div>

                {onSelectZoneForChat && (
                  <button
                    onClick={() => onSelectZoneForChat(`I'd like to experience the ${zone.name} zone today.`)}
                    className="w-full py-2.5 rounded-xl bg-espresso-900 text-vintageGold-300 text-xs font-serif font-semibold hover:bg-espresso-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-vintageGold-400" />
                    Sit in {zone.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
