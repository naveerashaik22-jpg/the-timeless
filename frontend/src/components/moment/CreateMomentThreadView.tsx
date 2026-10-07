import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Check,
  RotateCcw,
  Coffee,
  ShoppingBag,
  Flame,
  Sun,
  ShieldCheck,
  Heart,
  Feather,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { fetchRecommendations } from '../../services/api';
import confetti from 'canvas-confetti';

interface CreateMomentThreadViewProps {
  initialPrompt?: string;
  userProfile?: { name: string; isGuest: boolean };
  onBackToLanding: () => void;
  onExploreMenu: () => void;
}

interface MomentFormulation {
  id: string;
  title: string;
  tagline: string;
  sentiment: string;
  sensoryTarget: string;
  heroDrink: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    shortSensoryNote: string;
    temperature: 'hot' | 'cold';
  };
  pairing: {
    id: string;
    name: string;
    price: number;
    image: string;
    harmony: string;
  };
  whyThis: string;
  sanctuaryZone: string;
}

const FORMULATIONS: MomentFormulation[] = [
  {
    id: 'quiet-reset',
    title: 'QUIET RESET',
    tagline: 'A gentle refuge for weary senses',
    sentiment: 'Restorative Fatigue → Comfort Sanctuary',
    sensoryTarget: 'Low Acidity • Steaming Warmth • Velvety Microfoam',
    heroDrink: {
      id: 'item-02',
      name: 'Cinnamon Vanilla Latte',
      category: 'HOT BEVERAGES',
      price: 220,
      image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1200&q=88',
      shortSensoryNote: 'Comforting. Familiar. Gently sweet.',
      temperature: 'hot'
    },
    pairing: {
      id: 'item-01',
      name: 'The Renaissance Waffle',
      price: 260,
      image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=85',
      harmony: 'Warm Ceylon cinnamon sugar & velvety vanilla mascarpone.'
    },
    whyThis: 'Chosen because your moment calls for gentle restoration. The toasted cinnamon warms sensory tension, while micro-foamed oat milk delivers a slow, sustained energy curve without a crash.',
    sanctuaryZone: 'The Tranquil Nook • Table 08 Veranda'
  },
  {
    id: 'celebratory-vitality',
    title: 'CELEBRATORY VITALITY',
    tagline: 'Vibrant effervescence to mark your triumph',
    sentiment: 'Celebratory Joy → High Energy',
    sensoryTarget: 'Botanical Fizz • Crisp Berry • Decadent Treat',
    heroDrink: {
      id: 'item-06',
      name: 'The Gatsby Botanical Cooler',
      category: 'COLD BEVERAGES',
      price: 210,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=88',
      shortSensoryNote: 'Sparkling. Botanical. Joyful.',
      temperature: 'cold'
    },
    pairing: {
      id: 'item-04',
      name: 'Dark Chocolate Shortbread',
      price: 180,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
      harmony: 'Artisan butter biscuit with Callebaut chocolate chips.'
    },
    whyThis: 'Celebration calls for brightness on the palate. Hand-muddled blackberries and botanical tonic spark endorphins, paired with dark melted chocolate richness.',
    sanctuaryZone: 'The Grand Salon • Table 12 Banquette'
  },
  {
    id: 'contemplative-focus',
    title: 'CONTEMPLATIVE FOCUS',
    tagline: 'Aromatic clarity for deep thought and reading',
    sentiment: 'Calm Mindfulness → Sustained Clarity',
    sensoryTarget: 'Single-Origin • Clean Spice • Lingering Aroma',
    heroDrink: {
      id: 'item-03',
      name: 'Heritage Samovar Chai',
      category: 'HOT BEVERAGES',
      price: 160,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=88',
      shortSensoryNote: 'Spiced. Grounding. Aromatic.',
      temperature: 'hot'
    },
    pairing: {
      id: 'item-05',
      name: 'Orange Blossom Shortbread',
      price: 180,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85',
      harmony: 'Crisp citrus florals balancing slow cardamom heat.'
    },
    whyThis: 'Engineered for slow contemplation over an hour. Fresh ginger and green cardamom stimulate cognitive focus while estate Assam tannins keep you anchored.',
    sanctuaryZone: 'Ink & Ember Sanctuary • Library Armchair 03'
  },
  {
    id: 'bold-adventure',
    title: 'BOLDER HORIZONS',
    tagline: 'An uncompromising single-origin sensory adventure',
    sentiment: 'Adventurous Curiosity → Rare Formulation',
    sensoryTarget: 'Intense Roast • Dark Cacao • Complex Acidity',
    heroDrink: {
      id: 'item-07',
      name: 'Estate Single-Origin Cortado',
      category: 'HOT BEVERAGES',
      price: 240,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=88',
      shortSensoryNote: 'Intense. Velvety. Dark Cacao.',
      temperature: 'hot'
    },
    pairing: {
      id: 'item-08',
      name: 'Smoked Sea Salt Caramel Tart',
      price: 280,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
      harmony: 'Mineral salt crystals cutting through deep roasted espresso.'
    },
    whyThis: 'Curated for palates seeking depth and contrast. The high-altitude washed Arabica reveals dark cacao and stone fruit notes, punctuated by rich salted caramel.',
    sanctuaryZone: 'Roaster Hearth • Table 02 High Top'
  }
];

export const CreateMomentThreadView: React.FC<CreateMomentThreadViewProps> = ({
  initialPrompt = "I've had a long day. Surprise me with something comforting...",
  userProfile,
  onBackToLanding,
  onExploreMenu,
}) => {
  const { addItem, openCart } = useCart();

  // Progress state:
  // stage: 1 = connecting "WHO I AM"
  // stage: 2 = weaving into "HOW I FEEL"
  // stage: 3 = weaving into "WHAT I WANT"
  // stage: 4 = revealed
  const [threadStage, setThreadStage] = useState<1 | 2 | 3 | 4>(1);
  const [formulationIndex, setFormulationIndex] = useState(0);
  const [orderedSuccess, setOrderedSuccess] = useState(false);
  const [diagnosticText, setDiagnosticText] = useState('Listening to your sensory prose...');
  const [backendFormulation, setBackendFormulation] = useState<MomentFormulation | null>(null);

  // Query FastAPI backend recommendation engine
  useEffect(() => {
    let isMounted = true;
    const loadBackendRecs = async () => {
      try {
        const lowerPrompt = (initialPrompt || '').toLowerCase();
        let targetMood = 'calm';
        if (lowerPrompt.includes('comfort') || lowerPrompt.includes('warm') || lowerPrompt.includes('tired')) targetMood = 'tired';
        else if (lowerPrompt.includes('focus') || lowerPrompt.includes('clarity') || lowerPrompt.includes('deep')) targetMood = 'focused';
        else if (lowerPrompt.includes('energ') || lowerPrompt.includes('invigorat') || lowerPrompt.includes('boost')) targetMood = 'energetic';
        else if (lowerPrompt.includes('social') || lowerPrompt.includes('friend') || lowerPrompt.includes('share')) targetMood = 'social';
        else if (lowerPrompt.includes('nostalg') || lowerPrompt.includes('childhood') || lowerPrompt.includes('chai')) targetMood = 'nostalgic';
        else if (lowerPrompt.includes('celebrat') || lowerPrompt.includes('joy') || lowerPrompt.includes('triumph')) targetMood = 'celebratory';
        else if (lowerPrompt.includes('curious') || lowerPrompt.includes('surprise') || lowerPrompt.includes('rare')) targetMood = 'curious';

        const res = await fetchRecommendations({ mood: targetMood });
        if (isMounted && res.recommendations && res.recommendations.length > 0) {
          const hero = res.recommendations[0].item;
          const pairingItem = res.recommendations.length > 1 ? res.recommendations[1].item : null;
          
          setBackendFormulation({
            id: `rec-${hero.id}`,
            title: `${targetMood.toUpperCase()} RESONANCE`,
            tagline: res.summary_message || 'Artisanal formulation tailored to your rhythm',
            sentiment: `${targetMood.toUpperCase()} → SENSORY HARMONY`,
            sensoryTarget: `${(hero.taste_tags || []).join(' • ').toUpperCase()} • ${hero.temperature.toUpperCase()}`,
            heroDrink: {
              id: hero.id,
              name: hero.name,
              category: hero.category,
              price: hero.price,
              image: hero.image,
              shortSensoryNote: res.recommendations[0].why_it_matches,
              temperature: hero.temperature === 'hot' ? 'hot' : 'cold'
            },
            pairing: {
              id: pairingItem ? pairingItem.id : 'item-01',
              name: pairingItem ? pairingItem.name : 'The Renaissance Waffle',
              price: pairingItem ? pairingItem.price : 260,
              image: pairingItem ? pairingItem.image : 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=85',
              harmony: pairingItem ? pairingItem.description : 'Warm Ceylon cinnamon sugar & velvety vanilla mascarpone.'
            },
            whyThis: res.recommendations[0].why_it_matches,
            sanctuaryZone: res.zone_recommendation ? `${res.zone_recommendation.name} • ${res.zone_recommendation.seating_name}` : 'The Timeless • Pendulum Lounge Table #7'
          });
        }
      } catch (e) {
        console.warn('Using offline sensory formulation fallback', e);
      }
    };
    loadBackendRecs();
    return () => { isMounted = false; };
  }, [initialPrompt]);

  const currentFormulation = backendFormulation || FORMULATIONS[formulationIndex % FORMULATIONS.length];

  // Automated cinematic thread progression
  useEffect(() => {
    const t1 = setTimeout(() => {
      setThreadStage(2);
      setDiagnosticText('Tracing emotional cadence & energy curve...');
    }, 1100);

    const t2 = setTimeout(() => {
      setThreadStage(3);
      setDiagnosticText('Harmonizing 24 vintage formulations with your palate...');
    }, 2300);

    const t3 = setTimeout(() => {
      setThreadStage(4);
      setDiagnosticText('Sensory resonance locked.');
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [formulationIndex, backendFormulation]);

  const handleOrderThis = () => {
    // Add drink
    addItem({
      id: currentFormulation.heroDrink.id,
      name: currentFormulation.heroDrink.name,
      price: currentFormulation.heroDrink.price,
      category: currentFormulation.heroDrink.category as any,
      description: currentFormulation.heroDrink.shortSensoryNote,
      image: currentFormulation.heroDrink.image,
      ingredients: [],
      dietary_tags: [],
      mood_tags: [],
      taste_tags: [],
      temperature: currentFormulation.heroDrink.temperature,
      sweetness_level: 2,
      spice_level: 1,
      heaviness: 'light',
      availability: true
    }, 1);

    // Add pairing
    addItem({
      id: currentFormulation.pairing.id,
      name: currentFormulation.pairing.name,
      price: currentFormulation.pairing.price,
      category: 'DESSERTS',
      description: currentFormulation.pairing.harmony,
      image: currentFormulation.pairing.image,
      ingredients: [],
      dietary_tags: [],
      mood_tags: [],
      taste_tags: [],
      temperature: 'hot',
      sweetness_level: 3,
      spice_level: 0,
      heaviness: 'medium',
      availability: true
    }, 1);

    setOrderedSuccess(true);
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#C5A059', '#DFBE74', '#9E4E39', '#FAF6EE']
    });

    setTimeout(() => {
      openCart();
      setOrderedSuccess(false);
    }, 1100);
  };

  const handleTryAnother = () => {
    setThreadStage(1);
    setFormulationIndex((prev) => prev + 1);
  };

  const handleMakeBolder = () => {
    setThreadStage(1);
    setFormulationIndex(3); // Switches directly to Bolder Horizons
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-[#FAF6EE] text-espresso-950 film-grain py-8 sm:py-14 px-4 sm:px-6 lg:px-12 selection:bg-vintageGold-500 selection:text-espresso-950 overflow-hidden font-sans">
      
      {/* Ambient Warm Golden Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-vintageGold-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between border-b border-espresso-900/15 pb-4">
          <button
            onClick={onBackToLanding}
            className="text-xs font-serif text-espresso-700 hover:text-espresso-950 transition-colors flex items-center gap-1.5"
          >
            <span>← Return to Sanctuary Overview</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-vintageGold-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-espresso-950">THE AVES THREAD ACTIVE</span>
          </div>
        </div>

        {/* =========================================================================
            THE SIGNATURE EXPERIENCE CANVAS:
            The AVES Thread visually weaves through WHO I AM -> HOW I FEEL -> WHAT I WANT
           ========================================================================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/40 shadow-vintage-lg space-y-8 relative overflow-hidden">
          
          {/* Thread Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-vintageGold-500/20 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-600 font-bold block mb-1">
                COMPUTATIONAL SENSORY WEAVING
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso-950">
                The AVES Thread
              </h2>
            </div>
            
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/90 border border-vintageGold-500/30 text-xs font-mono text-espresso-800">
              <span className="w-1.5 h-1.5 rounded-full bg-vintageGold-500 animate-ping" />
              <span>{diagnosticText}</span>
            </div>
          </div>

          {/* =========================================================================
              THE 3 VISUAL ANCHORS & ANIMATED CONNECTING THREAD (SVG)
             ========================================================================= */}
          <div className="relative">
            
            {/* The Animated Thread Line (Desktop & Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              
              {/* ANCHOR 1: WHO I AM (Visual Preference Objects) */}
              <div className={`p-5 rounded-2xl border-2 transition-all duration-500 space-y-3 relative ${
                threadStage >= 1
                  ? 'bg-cream-100/90 border-vintageGold-500 shadow-vintage ring-1 ring-vintageGold-400/40'
                  : 'bg-cream-50/50 border-espresso-900/10 opacity-60'
              }`}>
                {/* Node Status Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-vintageGold-700 font-bold">
                    01 • WHO I AM
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    threadStage >= 1 ? 'bg-vintageGold-500 text-espresso-950' : 'bg-cream-300 text-espresso-600'
                  }`}>
                    ✓
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-serif font-bold text-base text-espresso-950">
                    {userProfile?.name || 'Guest Traveler'}
                  </div>
                  <div className="text-xs text-espresso-600 font-sans">
                    Table 08 • The Veranda Nook
                  </div>
                </div>

                {/* Visual Preference Object Chips */}
                <div className="pt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-vintageGold-500/30 text-[11px] font-serif text-espresso-800">
                    <Coffee className="w-3 h-3 text-vintageGold-600" />
                    <span>Medium Roast</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-vintageGold-500/30 text-[11px] font-serif text-espresso-800">
                    <Sparkles className="w-3 h-3 text-vintageGold-600" />
                    <span>Low Acidity</span>
                  </div>
                </div>
              </div>

              {/* ANCHOR 2: HOW I FEEL (Animated Mood Environment) */}
              <div className={`p-5 rounded-2xl border-2 transition-all duration-500 space-y-3 relative ${
                threadStage >= 2
                  ? 'bg-cream-100/90 border-vintageGold-500 shadow-vintage ring-1 ring-vintageGold-400/40'
                  : 'bg-cream-50/50 border-espresso-900/10 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-vintageGold-700 font-bold">
                    02 • HOW I FEEL
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    threadStage >= 2 ? 'bg-vintageGold-500 text-espresso-950' : 'bg-cream-300 text-espresso-600'
                  }`}>
                    {threadStage >= 2 ? '✓' : '2'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-serif font-bold text-base text-espresso-950">
                    {threadStage >= 2 ? currentFormulation.sentiment : 'Listening...'}
                  </div>
                  <div className="font-handwriting text-lg text-espresso-700 leading-tight italic truncate">
                    “{initialPrompt}”
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-vintageGold-500/30 text-[11px] font-serif text-espresso-800">
                    <Flame className="w-3 h-3 text-terracotta-500" />
                    <span>Comfort Need</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-vintageGold-500/30 text-[11px] font-serif text-espresso-800">
                    <Sun className="w-3 h-3 text-vintageGold-600" />
                    <span>Pacing: Slow</span>
                  </div>
                </div>
              </div>

              {/* ANCHOR 3: WHAT I WANT (Visual Experience Categories) */}
              <div className={`p-5 rounded-2xl border-2 transition-all duration-500 space-y-3 relative ${
                threadStage >= 3
                  ? 'bg-cream-100/90 border-vintageGold-500 shadow-vintage ring-1 ring-vintageGold-400/40'
                  : 'bg-cream-50/50 border-espresso-900/10 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-vintageGold-700 font-bold">
                    03 • WHAT I WANT
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    threadStage >= 3 ? 'bg-vintageGold-500 text-espresso-950' : 'bg-cream-300 text-espresso-600'
                  }`}>
                    {threadStage >= 3 ? '✓' : '3'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-serif font-bold text-base text-espresso-950">
                    {threadStage >= 3 ? currentFormulation.sensoryTarget : 'Synthesizing targets...'}
                  </div>
                  <div className="text-xs text-espresso-600 font-sans">
                    Artisan drink + culinary companion
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-vintageGold-500/30 text-[11px] font-serif text-espresso-800">
                    <Feather className="w-3 h-3 text-vintageGold-600" />
                    <span>Micro-Foam</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-vintageGold-500/30 text-[11px] font-serif text-espresso-800">
                    <Bookmark className="w-3 h-3 text-vintageGold-600" />
                    <span>Mascarpone</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            SCREEN 3: THE MOMENT REVEAL (EXPERIENCE REVEAL)
            Reveals when thread reaches Stage 4 (or can be previewed immediately)
           ========================================================================= */}
        {threadStage < 4 ? (
          /* Visual Intelligence In-Flight State (Floating menu fragments & steam) */
          <div className="p-12 sm:p-20 rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/30 shadow-vintage-lg text-center space-y-6 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
            
            {/* Drifting Floating Culinary Fragments in Background */}
            <div className="absolute top-8 left-12 p-3 rounded-2xl bg-cream-100 border border-vintageGold-500/30 shadow-sm opacity-50 rotate-3 animate-float-slow pointer-events-none">
              <span className="font-serif text-xs text-espresso-900">Ceylon Cinnamon Drizzle</span>
            </div>
            <div className="absolute bottom-10 right-14 p-3 rounded-2xl bg-cream-100 border border-vintageGold-500/30 shadow-sm opacity-50 -rotate-2 animate-float-slow pointer-events-none">
              <span className="font-serif text-xs text-espresso-900">Single-Origin Arabica 88°C</span>
            </div>

            {/* Pulsing Luminous Thread Centerpiece */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-vintageGold-400/40 animate-ping opacity-60" />
              <div className="w-16 h-16 rounded-full bg-espresso-950 border-2 border-vintageGold-500 text-vintageGold-400 flex items-center justify-center shadow-gold-glow">
                <Compass className="w-7 h-7 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-vintageGold-700 font-bold block">
                THE AVES THREAD IS WEAVING
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-espresso-950">
                Crafting Your Sanctuary Moment
              </h3>
              <p className="font-editorial italic text-base text-espresso-700">
                “{initialPrompt}”
              </p>
            </div>

            <button
              onClick={() => setThreadStage(4)}
              className="text-xs font-serif text-vintageGold-700 hover:text-espresso-950 underline underline-offset-4 pt-2"
            >
              Skip to reveal →
            </button>
          </div>
        ) : (
          /* =========================================================================
              THE EXPERIENCE REVEAL:
              Large drink visual, Cinnamon Latte, Price, "Comforting. Familiar. Gently sweet.",
              Concise WHY THIS, Visual Action Buttons (ORDER, TRY ANOTHER, MAKE IT BOLDER)
             ========================================================================= */
          <div className="space-y-8 animate-fade-in">
            
            {/* Header Stamp */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintageGold-500/20 border border-vintageGold-500/40 text-[11px] font-mono uppercase tracking-widest text-vintageGold-800 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-vintageGold-700" />
                <span>YOUR AVES MOMENT</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="font-display text-4xl sm:text-6xl font-normal text-espresso-950 tracking-tight">
                  {currentFormulation.title}
                </h2>
                <span className="font-serif italic text-base sm:text-xl text-vintageGold-700 font-normal">
                  “{currentFormulation.tagline}”
                </span>
              </div>
            </div>

            {/* The Experience Reveal Masterpiece Card */}
            <div className="rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/50 shadow-vintage-lg overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Large Beautiful Drink Visual with Steam (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[460px] bg-espresso-950 overflow-hidden">
                  <img
                    src={currentFormulation.heroDrink.image}
                    alt={currentFormulation.heroDrink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent lg:hidden" />
                  
                  {/* Steam Wisps rising over the drink image */}
                  <div className="absolute bottom-28 left-1/3 pointer-events-none">
                    <div className="w-2 h-10 bg-white/40 blur-[2px] rounded-full animate-steam-wisp-1" />
                    <div className="w-2.5 h-12 bg-white/30 blur-[2.5px] rounded-full animate-steam-wisp-2 -mt-4 ml-3" />
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-espresso-950/90 backdrop-blur-md border border-vintageGold-500/50 text-vintageGold-300 font-serif font-bold text-base shadow-sm">
                    ₹{currentFormulation.heroDrink.price}
                  </div>

                  {/* Temperature Pill */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md border border-vintageGold-500/30 text-[10px] font-mono uppercase tracking-wider text-cream-100">
                    {currentFormulation.heroDrink.temperature === 'hot' ? '🔥 Steaming Brew' : '❄️ Chilled Extraction'}
                  </div>
                </div>

                {/* Drink Details & Pairing Vignette (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  
                  {/* Drink Identity & Short Sensory Note */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-vintageGold-700 font-bold">
                        SIGNATURE BREW FORMULATION
                      </span>
                      <span className="text-xs font-serif text-espresso-600">
                        {currentFormulation.heroDrink.category}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-espresso-950">
                      {currentFormulation.heroDrink.name}
                    </h3>

                    {/* Short sensory text as requested: "Comforting. Familiar. Gently sweet." */}
                    <div className="p-3.5 rounded-xl bg-cream-100/90 border border-vintageGold-500/30 font-editorial italic text-lg sm:text-xl text-espresso-900 font-normal">
                      “{currentFormulation.heroDrink.shortSensoryNote}”
                    </div>
                  </div>

                  {/* Visual Pairing Vignette with photo */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-cream-100 border border-vintageGold-500/35 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono uppercase tracking-wider text-terracotta-600 font-bold">
                        COMPLEMENTARY ARTISAN PAIRING
                      </span>
                      <span className="font-serif font-bold text-espresso-950">
                        ₹{currentFormulation.pairing.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-vintageGold-500/40 shadow-sm">
                        <img
                          src={currentFormulation.pairing.image}
                          alt={currentFormulation.pairing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-base text-espresso-950">
                          {currentFormulation.pairing.name}
                        </div>
                        <p className="text-xs text-espresso-700 font-sans leading-relaxed mt-0.5">
                          {currentFormulation.pairing.harmony}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Seating Sanctuary Zone */}
                  <div className="text-xs font-serif text-espresso-700 flex items-center gap-2 pt-1 border-t border-espresso-900/10">
                    <Coffee className="w-3.5 h-3.5 text-vintageGold-600 shrink-0" />
                    <span>Recommended Spot: <strong className="text-espresso-950">{currentFormulation.sanctuaryZone}</strong></span>
                  </div>

                </div>

              </div>
            </div>

            {/* =========================================================================
                CONCISE "WHY THIS?" SECTION
               ========================================================================= */}
            <div className="p-5 sm:p-7 rounded-2xl bg-cream-100/80 border border-vintageGold-500/35 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-vintageGold-700 font-bold">
                <Feather className="w-4 h-4 text-vintageGold-600" />
                <span>WHY THIS?</span>
              </div>
              <p className="font-serif text-sm sm:text-base text-espresso-900 leading-relaxed font-light">
                {currentFormulation.whyThis}
              </p>
            </div>

            {/* =========================================================================
                THE 3 VISUAL ACTIONS:
                1. ORDER
                2. TRY ANOTHER
                3. MAKE IT BOLDER
               ========================================================================= */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
              
              {/* ACTION 1: ORDER THIS */}
              <button
                onClick={handleOrderThis}
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-espresso-950 text-ivory-50 font-serif font-bold text-sm shadow-vintage-lg hover:bg-espresso-900 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-vintageGold-500/60 group"
              >
                <ShoppingBag className="w-4 h-4 text-vintageGold-400 group-hover:scale-110 transition-transform" />
                <span>
                  {orderedSuccess
                    ? 'Adding to Tray...'
                    : `ORDER THIS (₹${currentFormulation.heroDrink.price + currentFormulation.pairing.price})`}
                </span>
              </button>

              {/* ACTION 2: TRY ANOTHER */}
              <button
                onClick={handleTryAnother}
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-cream-200 hover:bg-cream-300 text-espresso-950 font-serif font-semibold text-sm border border-vintageGold-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-espresso-700" />
                <span>TRY ANOTHER</span>
              </button>

              {/* ACTION 3: MAKE IT BOLDER */}
              <button
                onClick={handleMakeBolder}
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-transparent hover:bg-cream-200/70 text-espresso-900 font-serif font-medium text-sm border border-espresso-950/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-vintageGold-600" />
                <span>MAKE IT BOLDER</span>
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
