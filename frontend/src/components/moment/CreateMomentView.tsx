import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Snowflake,
  Sun,
  ShieldCheck,
  RotateCcw,
  Coffee,
  Heart,
  Compass,
  Check,
  Feather,
  Info
} from 'lucide-react';

interface CreateMomentViewProps {
  initialPrompt?: string;
  onSubmitMoment: (data: {
    message: string;
    temperature: 'hot' | 'cold' | 'any';
    dietary: string;
    craving: string;
    detectedMood: string;
  }) => void;
  onBackToLanding: () => void;
}

export const CreateMomentView: React.FC<CreateMomentViewProps> = ({
  initialPrompt = '',
  onSubmitMoment,
  onBackToLanding,
}) => {
  const [userThought, setUserThought] = useState(initialPrompt);
  const [temperature, setTemperature] = useState<'hot' | 'cold' | 'any'>('any');
  const [dietary, setDietary] = useState<string>('any');
  const [craving, setCraving] = useState<string>('balanced');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Sync if initial prompt arrives or changes
  useEffect(() => {
    if (initialPrompt) {
      setUserThought(initialPrompt);
    }
  }, [initialPrompt]);

  // Dynamic emotional sentiment simulation based on user prose
  const liveAnalysis = useMemo(() => {
    const text = userThought.toLowerCase();

    if (text.includes('exhaust') || text.includes('tired') || text.includes('fatigue') || text.includes('long day') || text.includes('stress')) {
      return {
        mood: 'Restorative Serenity',
        caffeine: 'Low Caffeine • Calming Herbal or Spiced Milk',
        pairingTone: 'Warm, grounding bakery bite to restore blood sugar',
        confidence: 94,
        accentBg: 'bg-amber-600/10 border-amber-600/30 text-amber-900',
        badge: 'Tired / Restorative'
      };
    } else if (text.includes('celebrat') || text.includes('happy') || text.includes('party') || text.includes('won') || text.includes('milestone')) {
      return {
        mood: 'Celebratory Vitality',
        caffeine: 'Elevated & Sparkling • Rich Decadence',
        pairingTone: 'Opulent dessert with gold flakes or rich truffle',
        confidence: 97,
        accentBg: 'bg-vintageGold-500/15 border-vintageGold-500/40 text-vintageGold-900',
        badge: 'Celebratory Joy'
      };
    } else if (text.includes('read') || text.includes('quiet') || text.includes('book') || text.includes('focus') || text.includes('work') || text.includes('calm')) {
      return {
        mood: 'Contemplative Calm',
        caffeine: 'Clean Sustained Focus • Single-Origin Pour-Over',
        pairingTone: 'Subtle biscuit or madeleine that leaves fingers clean',
        confidence: 92,
        accentBg: 'bg-emerald-700/10 border-emerald-700/30 text-emerald-900',
        badge: 'Calm & Deep Focus'
      };
    } else if (text.includes('curious') || text.includes('new') || text.includes('surprise') || text.includes('different') || text.includes('explore')) {
      return {
        mood: 'Adventurous Discovery',
        caffeine: 'Botanical Cold Extraction or Micro-Lot Harvest',
        pairingTone: 'Multi-layered artisanal spice pastry',
        confidence: 89,
        accentBg: 'bg-burgundy-600/10 border-burgundy-600/30 text-burgundy-900',
        badge: 'Curious & Exploratory'
      };
    }

    return {
      mood: 'Attuned Mindfulness',
      caffeine: 'Custom Harmonized Curve',
      pairingTone: 'Balanced artisanal pairing suited to current hour',
      confidence: 82,
      accentBg: 'bg-cream-200 border-vintageGold-500/30 text-espresso-950',
      badge: 'Listening Carefully'
    };
  }, [userThought]);

  // Catalyst Chips that inject expressive thoughts
  const catalystChips = [
    {
      label: 'Exhausted after an endless day',
      desc: 'Restorative & comforting warmth',
      fullText: "I'm exhausted after a long day. Need something gentle that comforts me without feeling heavy.",
      temp: 'hot' as const,
      crave: 'comforting'
    },
    {
      label: 'Quiet afternoon reading a book',
      desc: 'Slow, lingering single-origin notes',
      fullText: "I want to sit quietly in a sunlit corner and read. Looking for delicate, aromatic notes that linger.",
      temp: 'any' as const,
      crave: 'balanced'
    },
    {
      label: 'Celebrating a personal milestone',
      desc: 'Sparkling, vibrant & decadent',
      fullText: "I'm in a wonderful mood celebrating a milestone today! Treat me with something exquisite and celebratory.",
      temp: 'cold' as const,
      crave: 'sweet'
    },
    {
      label: 'Craving bold spice & comfort',
      desc: 'Savoury, spicy warmth',
      fullText: "Craving something savoury and a little spicy to wake up my palate with rich artisanal herbs.",
      temp: 'hot' as const,
      crave: 'spicy'
    },
    {
      label: 'Clean botanical recharge',
      desc: 'Iced, refreshing & zero guilt',
      fullText: "Want something crisp, cooling, and refreshing. 100% plant-based, light, and invigorating.",
      temp: 'cold' as const,
      crave: 'refreshing'
    }
  ];

  const handleApplyChip = (chip: typeof catalystChips[0]) => {
    setUserThought(chip.fullText);
    setTemperature(chip.temp);
    setCraving(chip.crave);
  };

  const handleTriggerSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userThought.trim() && !initialPrompt) {
      setUserThought("I'm looking for a quiet moment of comfort and delicious artisanal flavor.");
    }
    setIsSynthesizing(true);
    
    // Smooth transition handover
    setTimeout(() => {
      onSubmitMoment({
        message: userThought.trim() || "I'm looking for a quiet moment of comfort and delicious artisanal flavor.",
        temperature,
        dietary,
        craving,
        detectedMood: liveAnalysis.mood
      });
      setIsSynthesizing(false);
    }, 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] vintage-paper-bg py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Ambient Lighting Vignette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-vintageGold-500/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Breadcrumb & Step Navigation */}
        <div className="flex items-center justify-between border-b border-vintageGold-500/25 pb-4">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-xs font-serif text-espresso-700 hover:text-espresso-950 transition-colors"
          >
            <span>← Back to Overview</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-vintageGold-700">
            <span>Step 01 of 03</span>
            <span>•</span>
            <span className="font-bold text-espresso-950">Emotional Input</span>
          </div>
        </div>

        {/* Header Invitation */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200 border border-vintageGold-500/30 text-vintageGold-800 text-[11px] font-bold uppercase tracking-widest">
            <Feather className="w-3.5 h-3.5" />
            <span>The Sanctuary Canvas</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-950 leading-[1.1]">
            How are you feeling in this moment?
          </h1>
          
          <p className="font-serif italic text-base sm:text-lg text-espresso-700 leading-relaxed font-normal">
            Speak to us like an attentive barista. Tell us about your day, your energy level, or what sensation your palate is searching for.
          </p>
        </div>

        {/* =========================================================================
            PRIMARY FOCAL POINT: The Tactile Expression Pad
           ========================================================================= */}
        <form onSubmit={handleTriggerSubmission} className="space-y-8">
          
          <div className="p-6 sm:p-10 rounded-3xl bg-cream-50 border-2 border-vintageGold-500/40 shadow-vintage-lg space-y-6 relative overflow-hidden group focus-within:border-vintageGold-500 transition-colors">
            
            {/* Top row with helper and reset */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif italic text-espresso-600">
                Express yourself in natural prose:
              </span>
              {userThought && (
                <button
                  type="button"
                  onClick={() => setUserThought('')}
                  className="flex items-center gap-1 text-[11px] font-sans text-espresso-500 hover:text-espresso-900 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear canvas</span>
                </button>
              )}
            </div>

            {/* Prose Textarea */}
            <div className="relative">
              <textarea
                value={userThought}
                onChange={(e) => setUserThought(e.target.value)}
                rows={4}
                placeholder="“I've had a demanding afternoon and need something restorative... perhaps warm and spiced, not too sweet.”"
                className="w-full bg-transparent border-0 focus:ring-0 p-0 font-serif text-lg sm:text-2xl text-espresso-950 placeholder:text-espresso-400/50 leading-relaxed resize-none focus:outline-none"
              />
            </div>

            {/* Live Emotional Resonance Telemetry Bar */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${liveAnalysis.accentBg}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                    Live Sentiment Mapped
                  </div>
                  <div className="font-display font-bold text-sm sm:text-base">
                    {liveAnalysis.mood}
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70 block">
                  Anticipated Curve
                </span>
                <span className="font-medium">
                  {liveAnalysis.caffeine}
                </span>
              </div>
            </div>

          </div>

          {/* Emotional Catalyst Chips */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-espresso-600">
                Or choose an emotional catalyst:
              </span>
              <span className="text-[11px] text-espresso-500 font-serif italic">
                Tap to populate your canvas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catalystChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyChip(chip)}
                  className="p-3.5 rounded-2xl bg-cream-100 hover:bg-cream-200/90 border border-vintageGold-500/30 text-left transition-all active:scale-[0.98] group shadow-sm flex flex-col justify-between"
                >
                  <div className="font-serif font-bold text-sm text-espresso-950 group-hover:text-vintageGold-800 transition-colors">
                    {chip.label}
                  </div>
                  <div className="text-[11px] text-espresso-600 font-sans mt-1">
                    {chip.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================================
              TACTILE SENSORY DIALS: Progressive Nuance Filters
             ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-cream-100/70 border border-vintageGold-500/30 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-espresso-700">
              <Coffee className="w-4 h-4 text-vintageGold-700" />
              <span>Sensory Nuance Customization (Optional)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Dial 1: Temperature */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-espresso-800 flex items-center justify-between">
                  <span>Temperature Preference</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-cream-200/80 border border-vintageGold-500/30">
                  <button
                    type="button"
                    onClick={() => setTemperature('hot')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold flex items-center justify-center gap-1 transition-all ${
                      temperature === 'hot'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Steaming</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemperature('cold')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold flex items-center justify-center gap-1 transition-all ${
                      temperature === 'cold'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    <Snowflake className="w-3.5 h-3.5 text-sky-400" />
                    <span>Iced</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemperature('any')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold flex items-center justify-center gap-1 transition-all ${
                      temperature === 'any'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-vintageGold-500" />
                    <span>Open</span>
                  </button>
                </div>
              </div>

              {/* Dial 2: Dietary Safeguard */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-espresso-800 flex items-center justify-between">
                  <span>Dietary Safeguard</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-cream-200/80 border border-vintageGold-500/30">
                  <button
                    type="button"
                    onClick={() => setDietary('any')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                      dietary === 'any'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    All Recipes
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietary('vegetarian')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                      dietary === 'vegetarian'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    Vegetarian
                  </button>
                </div>
              </div>

              {/* Dial 3: Flavor Craving */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-espresso-800 flex items-center justify-between">
                  <span>Craving Spectrum</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-cream-200/80 border border-vintageGold-500/30">
                  <button
                    type="button"
                    onClick={() => setCraving('sweet')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                      craving === 'sweet'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    Sweet
                  </button>
                  <button
                    type="button"
                    onClick={() => setCraving('spicy')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                      craving === 'spicy'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    Spiced
                  </button>
                  <button
                    type="button"
                    onClick={() => setCraving('balanced')}
                    className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                      craving === 'balanced'
                        ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                        : 'text-espresso-800 hover:text-espresso-950'
                    }`}
                  >
                    Balanced
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Master Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-espresso-600 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Multi-criteria scoring model with strict dietary boundary verification.</span>
            </div>

            <button
              type="submit"
              disabled={isSynthesizing}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-espresso-950 text-vintageGold-300 font-serif font-bold text-base shadow-vintage hover:bg-espresso-900 active:scale-95 transition-all flex items-center justify-center gap-3 border border-vintageGold-500/60 disabled:opacity-50"
            >
              <span>{isSynthesizing ? 'Consulting The Barista...' : 'Curate My Moment'}</span>
              <ArrowRight className="w-4 h-4 text-vintageGold-400" />
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
