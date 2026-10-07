import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Coffee,
  Compass,
  Feather,
  BookOpen,
  MapPin,
  Clock,
  RotateCcw,
  Flame,
  Sun,
  Moon,
  Wind,
  HeartHandshake,
  Music,
  Wine,
  Gift
} from 'lucide-react';

interface LandingEditorialViewProps {
  onStartMoment: (initialPrompt?: string) => void;
  onExploreMenu: () => void;
  userProfile?: { name: string; isGuest: boolean };
  onChangeTableOrSignOut: () => void;
}

// 8 Visual Mood Scenes with rich photographic identities
interface MoodScene {
  id: string;
  title: string;
  tagline: string;
  image: string;
  prompt: string;
  colorAura: string;
}

const MOOD_SCENES: MoodScene[] = [
  {
    id: 'calm',
    title: 'CALM',
    tagline: 'Misty morning stillness & delicate green florals',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80',
    prompt: 'I need quiet stillness. Something soothing, delicate, and unhurried to calm my thoughts.',
    colorAura: 'from-emerald-950/80'
  },
  {
    id: 'focus',
    title: 'FOCUS',
    tagline: 'Deep dark roast, clean clarity, no crash',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    prompt: 'Sitting down for deep creative focus and writing. Need razor-sharp clarity without a jittery crash.',
    colorAura: 'from-[#190D07]'
  },
  {
    id: 'comfort',
    title: 'COMFORT',
    tagline: 'Warm cinnamon latte & velvety vanilla mascarpone',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80',
    prompt: "I've had a long day. Surprise me with something comforting, warm, and gently sweet.",
    colorAura: 'from-[#2A150C]'
  },
  {
    id: 'energy',
    title: 'ENERGY',
    tagline: 'Chilled espresso tonic & sunlit blood orange',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80',
    prompt: 'Feeling sluggish. I need an invigorating, refreshing burst of caffeine with vibrant citrus notes.',
    colorAura: 'from-amber-950/80'
  },
  {
    id: 'social',
    title: 'SOCIAL',
    tagline: 'Shared French press & fresh warm berry scones',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    prompt: 'Catching up with a companion. Something joyful, easy to share, and full of pleasant aroma.',
    colorAura: 'from-rose-950/80'
  },
  {
    id: 'celebrate',
    title: 'CELEBRATE',
    tagline: 'Sparkling botanical cascara & dark chocolate tart',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
    prompt: 'Celebrating a meaningful milestone today. Make it sparkling, luxurious, and extraordinary.',
    colorAura: 'from-purple-950/80'
  },
  {
    id: 'nostalgia',
    title: 'NOSTALGIA',
    tagline: 'Copper samovar chai & spiced heirloom biscuits',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
    prompt: 'Longing for the warmth of childhood tea rituals. Something authentic, spiced, and deeply grounding.',
    colorAura: 'from-amber-950/90'
  },
  {
    id: 'surprise',
    title: 'SURPRISE',
    tagline: 'Bespoke roaster formulation chosen by the AI',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=700&q=80',
    prompt: 'Surprise me completely. Break my ordinary routine with a rare single-origin pairing.',
    colorAura: 'from-teal-950/80'
  }
];

export const LandingEditorialView: React.FC<LandingEditorialViewProps> = ({
  onStartMoment,
  onExploreMenu,
  userProfile,
  onChangeTableOrSignOut,
}) => {
  const [momentInput, setMomentInput] = useState('');
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartMoment(momentInput.trim() || undefined);
  };

  const handleSelectMoodScene = (scene: MoodScene) => {
    setSelectedMoodId(scene.id);
    setMomentInput(scene.prompt);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-[#FAF6EE] text-espresso-950 film-grain overflow-hidden flex flex-col justify-between selection:bg-vintageGold-500 selection:text-espresso-950">
      
      {/* Subtle Warm Lighting Gradients */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-vintageGold-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-terracotta-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14 w-full space-y-16">
        
        {/* =========================================================================
            SECTION 1: HERO VISUAL COMPOSITION (70% Visual Dominance)
            Large photography, realistic steam, handwritten notes, oversized prompt input
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (7 cols): Editorial Monogram, Prompt Centerpiece */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Table Context Bar */}
            <div className="flex items-center justify-between border-b border-espresso-900/15 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-vintageGold-600 font-bold">
                  THE AVES • VOL. 2026
                </span>
                <span className="text-espresso-300">•</span>
                <span className="text-xs font-serif text-espresso-800">
                  {userProfile?.name ? `Patron: ${userProfile.name}` : 'Guest Diner Session'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-espresso-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-semibold text-espresso-950">Table 08</span>
                <span className="hidden sm:inline text-espresso-500">• The Veranda</span>
                <button
                  onClick={onChangeTableOrSignOut}
                  className="ml-2 text-vintageGold-600 hover:text-espresso-950 underline underline-offset-2"
                >
                  Switch
                </button>
              </div>
            </div>

            {/* Headline Statement */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-vintageGold-700 font-bold block">
                COMPUTATIONAL HOSPITALITY
              </span>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal text-espresso-950 tracking-tight leading-[0.95]">
                Your café.<br />
                <span className="font-editorial italic font-normal text-vintageGold-600">
                  Your moment.
                </span>
              </h1>
            </div>

            {/* Handwritten Barista Annotation in Caveat */}
            <div className="flex items-center gap-3 text-espresso-700 font-handwriting text-2xl sm:text-3xl">
              <Feather className="w-5 h-5 text-vintageGold-500 shrink-0" />
              <span>“What kind of moment are you looking for today?”</span>
            </div>

            {/* =========================================================================
                THE CENTERPIECE: Oversized Natural Language Expression Input
               ========================================================================= */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-5 sm:p-7 rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/40 shadow-vintage-lg hover:border-vintageGold-500 focus-within:border-vintageGold-500 focus-within:shadow-gold-glow transition-all duration-300 relative group">
                
                {/* Floating Top Label with Reset */}
                <div className="flex items-center justify-between text-[11px] font-mono text-espresso-500 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5 text-vintageGold-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>YOUR PERSONAL PROMPT</span>
                  </span>
                  {momentInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setMomentInput('');
                        setSelectedMoodId(null);
                      }}
                      className="flex items-center gap-1 text-espresso-500 hover:text-espresso-900 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                <textarea
                  value={momentInput}
                  onChange={(e) => setMomentInput(e.target.value)}
                  rows={3}
                  placeholder="I've had a long day. Surprise me with something comforting..."
                  className="w-full bg-transparent border-0 focus:ring-0 p-0 font-serif text-xl sm:text-2xl text-espresso-950 placeholder:text-espresso-400/50 leading-relaxed resize-none focus:outline-none"
                />

                {/* Subtle bottom indicator */}
                <div className="pt-3 border-t border-espresso-900/10 flex items-center justify-between text-[11px] text-espresso-600 font-serif italic">
                  <span>Press "Create My Moment" to begin the AVES Thread.</span>
                  <span className="font-mono text-[10px] text-vintageGold-600 font-bold">
                    SENSORY HARMONY ACTIVE
                  </span>
                </div>
              </div>

              {/* Action Buttons: Primary + Secondary */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-9 py-4 rounded-full bg-espresso-950 text-ivory-50 font-serif font-semibold text-base shadow-vintage-lg hover:bg-espresso-900 active:scale-95 transition-all flex items-center justify-center gap-3 border border-vintageGold-500/50 group"
                >
                  <span>CREATE MY MOMENT</span>
                  <ArrowRight className="w-4 h-4 text-vintageGold-400 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-espresso-950 font-serif font-medium text-base hover:bg-cream-200/80 border border-espresso-950/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Coffee className="w-4 h-4 text-espresso-700" />
                  <span>EXPLORE MENU</span>
                </button>
              </div>

            </form>

          </div>

          {/* Right Column (5 cols): Atmospheric Café Composition with Steam & Books */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Editorial Image Frame with Steam Overlays */}
            <div className="relative rounded-3xl overflow-hidden shadow-vintage-lg border-2 border-vintageGold-500/35 bg-espresso-950 group">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=88"
                alt="Morning steam rising from freshly brewed coffee on antique wooden table beside books"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
              
              {/* Coffee Cup Realistic Steam Wisps */}
              <div className="absolute bottom-36 left-1/3 pointer-events-none">
                <div className="w-2 h-10 bg-white/40 blur-[2px] rounded-full animate-steam-wisp-1" />
                <div className="w-2.5 h-12 bg-white/30 blur-[2.5px] rounded-full animate-steam-wisp-2 -mt-4 ml-3" />
                <div className="w-2 h-9 bg-white/40 blur-[2px] rounded-full animate-steam-wisp-3 -mt-3 ml-6" />
              </div>

              {/* Floating Monogram Stamp */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-espresso-950/85 backdrop-blur-md border border-vintageGold-500/40 text-[10px] font-mono tracking-widest text-vintageGold-300 uppercase shadow-sm">
                ✦ AUTUMN ARCHIVE • FORMULATION 07
              </div>

              {/* Lower Atmospheric Barista Ledger Note */}
              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-espresso-950/85 backdrop-blur-md border border-vintageGold-500/30 text-ivory-50 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-vintageGold-400 block">
                  FROM THE BARISTA LEDGER
                </span>
                <p className="font-editorial italic text-base sm:text-lg leading-relaxed text-ivory-100 font-light">
                  “We do not ask what you wish to buy; we ask how you wish to feel.”
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-ivory-300/70 pt-1 border-t border-vintageGold-500/20">
                  <span>Table 08 • Veranda</span>
                  <span>THE AVES SYSTEM</span>
                </div>
              </div>
            </div>

            {/* Overlapping Tactile Vintage Badge */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 p-4 rounded-2xl bg-[#FCFAF6] border border-vintageGold-500/50 shadow-vintage max-w-xs z-10 transform rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center shrink-0">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-espresso-950">
                    Sensory Discovery
                  </div>
                  <div className="text-[11px] text-espresso-600 font-sans">
                    26 vintage formulations paired to human feeling
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            SECTION 2: EDITORIAL MOOD SELECTION (Visual Mood Scenes, Not Generic Buttons!)
            Rich imagery, evocative lighting, hover/tap animation
           ========================================================================= */}
        <div className="space-y-6 pt-6 border-t border-espresso-900/10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-600 font-bold block mb-1">
                SENSORY MOOD PANORAMA
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso-950">
                Choose Your Atmosphere
              </h2>
            </div>
            <p className="font-serif italic text-sm text-espresso-600 max-w-md">
              Tap any sensory scene to calibrate your prompt and awaken the recommendation.
            </p>
          </div>

          {/* 8 Visual Mood Scene Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
            {MOOD_SCENES.map((scene) => {
              const isSelected = selectedMoodId === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSelectMoodScene(scene)}
                  className={`group relative rounded-2xl overflow-hidden aspect-[4/5] text-left transition-all duration-300 active:scale-[0.98] border-2 shadow-vintage ${
                    isSelected
                      ? 'border-vintageGold-500 ring-2 ring-vintageGold-400/50 scale-[1.02]'
                      : 'border-vintageGold-500/30 hover:border-vintageGold-400 hover:-translate-y-1'
                  }`}
                >
                  {/* Scene Image */}
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-85 group-hover:brightness-95"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${scene.colorAura} via-espresso-950/30 to-transparent`} />
                  
                  {/* Top Badge Indicator */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                      isSelected
                        ? 'bg-vintageGold-500 text-espresso-950 border-vintageGold-300 font-bold'
                        : 'bg-espresso-950/70 text-vintageGold-300 border-vintageGold-500/30'
                    }`}>
                      {isSelected ? '✓ ACTIVE' : scene.id}
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-3 left-3 right-3 text-ivory-50 space-y-1">
                    <h3 className="font-display font-bold text-base sm:text-lg tracking-wider text-ivory-50 group-hover:text-vintageGold-300 transition-colors">
                      {scene.title}
                    </h3>
                    <p className="text-[10px] text-ivory-200/80 font-sans line-clamp-2 leading-tight">
                      {scene.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            SECTION 3: VISUAL PREFERENCE CHIPS WITH IMAGERY (Not text lists!)
           ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FCFAF6] border border-vintageGold-500/35 shadow-vintage space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-vintageGold-600 font-bold block">
                YOUR SENSORY COMPASS
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-espresso-950">
                Visual Preference Calibration
              </h3>
            </div>
            <span className="text-xs font-serif italic text-espresso-600 hidden sm:inline">
              Adjusts acidity, roast depth & companion pairings
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Preference Chip 1 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-100 border border-vintageGold-500/25 hover:border-vintageGold-400 transition-colors">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-vintageGold-500/30">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80"
                  alt="Arabica Bean Roast"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-espresso-950">Medium-Dark Roast</div>
                <div className="text-[10px] text-espresso-600 font-sans">Bourbon vanilla & oak</div>
              </div>
            </div>

            {/* Preference Chip 2 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-100 border border-vintageGold-500/25 hover:border-vintageGold-400 transition-colors">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-vintageGold-500/30">
                <img
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=150&q=80"
                  alt="Velvety Microfoam"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-espresso-950">Velvety Microfoam</div>
                <div className="text-[10px] text-espresso-600 font-sans">Oat or full-cream steam</div>
              </div>
            </div>

            {/* Preference Chip 3 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-100 border border-vintageGold-500/25 hover:border-vintageGold-400 transition-colors">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-vintageGold-500/30">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80"
                  alt="Artisan Pastry"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-espresso-950">Cinnamon & Mascarpone</div>
                <div className="text-[10px] text-espresso-600 font-sans">Low-sugar artisan pairings</div>
              </div>
            </div>

            {/* Preference Chip 4 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-100 border border-vintageGold-500/25 hover:border-vintageGold-400 transition-colors">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-vintageGold-500/30">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=150&q=80"
                  alt="Vintage Book Sanctuary"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-espresso-950">The Veranda Nook</div>
                <div className="text-[10px] text-espresso-600 font-sans">Soft natural daylight</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Editorial Masthead Footer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 border-t border-espresso-900/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-espresso-600 font-serif gap-2">
        <span>THE AVES — A sanctuary where technology stays quietly in the background.</span>
        <span className="font-mono text-[10px] text-vintageGold-700 tracking-wider">
          MOMENT CURATION ENGINE • 2026 EDITION
        </span>
      </div>

    </div>
  );
};
