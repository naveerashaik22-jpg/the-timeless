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
  Heart,
  ShoppingBag,
  ShieldCheck,
  Building2,
  X,
  Check,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { PastOrder } from '../../types';
import { handleImageError, getSafeImageUrl, VINTAGE_FALLBACKS } from '../../utils/imageFallback';

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

const DISCOVERY_ITEMS = [
  {
    id: 'disc-01',
    name: 'The Gatsby Botanical Cooler',
    category: 'COLD BEVERAGES',
    price: 210,
    tagline: 'Muddled wild berries, cascara botanical tonic, and garden mint',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    prompt: 'I want something cold, effervescent, and botanical with berries under ₹250.'
  },
  {
    id: 'disc-02',
    name: "Jane Austen's Cookie",
    category: 'DESSERTS',
    price: 180,
    tagline: 'Shortbread studded with dark chocolate & delicate orange blossom',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    prompt: 'I want an artisan dessert pairing that feels classic, buttery, and mildly sweet.'
  },
  {
    id: 'disc-03',
    name: "Estate Single-Origin Cortado",
    category: 'HOT BEVERAGES',
    price: 240,
    tagline: 'High-altitude washed Arabica with dark cacao and velvety microfoam',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    prompt: 'I want a bold, intense coffee with rich cacao notes and minimal sweetness.'
  }
];

export const LandingEditorialView: React.FC<LandingEditorialViewProps> = ({
  onStartMoment,
  onExploreMenu,
  userProfile,
  onChangeTableOrSignOut,
}) => {
  const { currentUser, openProfile } = useAuth();
  const { addItem, openCart } = useCart();
  const [momentInput, setMomentInput] = useState('');
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  const firstName = userProfile?.name
    ? userProfile.name.trim().split(' ')[0]
    : 'Guest';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartMoment(momentInput.trim() || undefined);
  };

  const handleSelectMoodScene = (scene: MoodScene) => {
    setSelectedMoodId(scene.id);
    setMomentInput(scene.prompt);
  };

  const handleReorder = (order: PastOrder) => {
    addItem({
      id: order.id,
      name: order.item,
      price: order.price,
      category: order.category as any,
      description: `Reordered from ${order.cafe}`,
      image: order.image,
      ingredients: [],
      dietary_tags: [],
      mood_tags: [],
      taste_tags: [],
      temperature: 'hot',
      sweetness_level: 2,
      spice_level: 0,
      heaviness: 'light',
      availability: true
    }, 1);
    openCart();
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-[#FAF6EE] text-espresso-950 film-grain overflow-hidden flex flex-col justify-between selection:bg-vintageGold-500 selection:text-espresso-950">
      
      {/* Subtle Warm Lighting Gradients */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-vintageGold-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-terracotta-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14 w-full space-y-20">
        
        {/* =========================================================================
            SECTION 1: HERO VISUAL COMPOSITION (70% Visual Dominance)
            Personalized welcome, authentic steam, handwritten notes, prompt input
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (7 cols): Editorial Monogram, Prompt Centerpiece */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Top Table Context & Personalized Greeting Bar */}
            <div className="flex items-center justify-between border-b border-espresso-900/15 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-vintageGold-700 font-bold">
                  THE AVES • VOL. 2026
                </span>
                <span className="text-espresso-300">•</span>
                <span className="text-xs font-serif text-espresso-800">
                  {userProfile?.name && !userProfile.isGuest ? `Verified Patron: ${userProfile.name}` : 'Tabletop Guest Preview'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-espresso-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-semibold text-espresso-950">Table 08</span>
                <span className="hidden sm:inline text-espresso-500">• Veranda</span>
                <button
                  onClick={onChangeTableOrSignOut}
                  className="ml-2 text-vintageGold-700 hover:text-espresso-950 underline underline-offset-2"
                >
                  Switch
                </button>
              </div>
            </div>

            {/* Personalized Headline Welcome Statement (Requirement 3) */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintageGold-500/15 border border-vintageGold-500/30 text-[10px] font-mono uppercase tracking-widest text-vintageGold-800 font-bold">
                <Sparkles className="w-3 h-3 text-vintageGold-600" />
                <span>COMPUTATIONAL HOSPITALITY</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-espresso-950 tracking-tight leading-[1.0]">
                {userProfile?.name && !userProfile.isGuest ? (
                  <>
                    Welcome back, <span className="font-editorial italic font-normal text-vintageGold-700">{firstName}</span>.<br />
                    <span className="text-3xl sm:text-5xl lg:text-6xl text-espresso-900 block mt-1">
                      Your next moment awaits.
                    </span>
                  </>
                ) : (
                  <>
                    Every visit deserves<br />
                    <span className="font-editorial italic font-normal text-vintageGold-700">
                      its own moment.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Handwritten Barista Annotation in Caveat */}
            <div className="flex items-center gap-3 text-espresso-700 font-handwriting text-2xl sm:text-3xl">
              <Feather className="w-5 h-5 text-vintageGold-600 shrink-0" />
              <span>“Describe how you feel, what you crave, or your budget.”</span>
            </div>

            {/* =========================================================================
                THE SIGNATURE CENTERPIECE: Create My Moment Natural Language Input
               ========================================================================= */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-5 sm:p-7 rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/40 shadow-vintage-lg hover:border-vintageGold-500 focus-within:border-vintageGold-500 focus-within:shadow-gold-glow transition-all duration-300 relative group">
                
                {/* Floating Top Label with Reset */}
                <div className="flex items-center justify-between text-[11px] font-mono text-espresso-500 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5 text-vintageGold-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CREATE MY MOMENT</span>
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
                  placeholder="e.g. I want something comforting, mildly sweet and under ₹300..."
                  className="w-full bg-transparent border-0 focus:ring-0 p-0 font-serif text-xl sm:text-2xl text-espresso-950 placeholder:text-espresso-400/50 leading-relaxed resize-none focus:outline-none"
                />

                {/* Subtle bottom indicator */}
                <div className="pt-3 border-t border-espresso-900/10 flex items-center justify-between text-[11px] text-espresso-600 font-serif italic">
                  <span>Press "Create My Moment" to weave the AVES Thread.</span>
                  <span className="font-mono text-[10px] text-vintageGold-700 font-bold">
                    AI SUGGESTS • YOU DECIDE
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
                  <span>EXPLORE THE MENU</span>
                </button>
              </div>

            </form>

          </div>

          {/* Right Column (5 cols): Atmospheric Café Composition with Steam & Books */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-vintage-lg border-2 border-vintageGold-500/35 bg-espresso-950 group">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=88"
                alt="Morning steam rising from freshly brewed coffee on antique wooden table beside books"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                onError={(e) => handleImageError(e, VINTAGE_FALLBACKS.cafeInterior)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
              
              {/* Coffee Cup Steam Wisps */}
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
                  FROM THE SANCTUARY LEDGER
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
                    Real Menu Grounding
                  </div>
                  <div className="text-[11px] text-espresso-600 font-sans">
                    Every suggestion maps directly to available café items
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            SECTION 2: EDITORIAL MOOD SELECTION (Visual Atmospheric Scenes)
           ========================================================================= */}
        <div className="space-y-6 pt-6 border-t border-espresso-900/10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-700 font-bold block mb-1">
                ATMOSPHERIC MOOD PANORAMA
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso-950">
                Calibrate Your Mood
              </h2>
            </div>
            <p className="font-serif italic text-sm text-espresso-600 max-w-md">
              Tap any sensory scene to calibrate your prompt and awaken the recommendation.
            </p>
          </div>

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
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-85 group-hover:brightness-95"
                    onError={(e) => handleImageError(e, VINTAGE_FALLBACKS.coffee)}
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t ${scene.colorAura} via-espresso-950/30 to-transparent`} />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                      isSelected
                        ? 'bg-vintageGold-500 text-espresso-950 border-vintageGold-300 font-bold'
                        : 'bg-espresso-950/70 text-vintageGold-300 border-vintageGold-500/30'
                    }`}>
                      {isSelected ? '✓ ACTIVE' : scene.id}
                    </span>
                  </div>

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
            SECTION 3: DISCOVER SOMETHING NEW (Requirement 3)
           ========================================================================= */}
        <div className="space-y-6 pt-6 border-t border-espresso-900/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-700 font-bold block mb-1">
                RARE ARCHIVE & SEASONAL SELECTIONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso-950">
                Discover Something New
              </h2>
            </div>
            <p className="font-serif italic text-sm text-espresso-600">
              Handpicked creations from our kitchen and roastery artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISCOVERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#FCFAF6] border border-vintageGold-500/35 overflow-hidden shadow-vintage hover:shadow-vintage-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-espresso-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    onError={(e) => handleImageError(e, VINTAGE_FALLBACKS.croissant)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-vintageGold-500/30 text-[10px] font-mono uppercase text-vintageGold-300">
                    {item.category}
                  </div>
                  
                  <div className="absolute bottom-3.5 left-3.5 px-3.5 py-1.5 rounded-2xl bg-espresso-950/90 backdrop-blur-md border border-vintageGold-500/50 text-vintageGold-300 font-serif font-bold text-base">
                    ₹{item.price}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-espresso-950 group-hover:text-vintageGold-800 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-vintageGold-500/20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onStartMoment(item.prompt)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-espresso-950 hover:bg-espresso-900 text-vintageGold-300 text-xs font-serif font-bold border border-vintageGold-500/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Create Moment</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          category: item.category as any,
                          description: item.tagline,
                          image: item.image,
                          ingredients: [],
                          dietary_tags: [],
                          mood_tags: [],
                          taste_tags: [],
                          temperature: 'hot',
                          sweetness_level: 2,
                          spice_level: 0,
                          heaviness: 'light',
                          availability: true
                        }, 1);
                        openCart();
                      }}
                      className="p-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-espresso-950 border border-vintageGold-500/30 transition-colors"
                      title="Add directly to tray"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: RECENT MOMENTS & FAVOURITES (Requirement 3 & 7)
            Rendered when real data exists!
           ========================================================================= */}
        {currentUser && (currentUser.previousOrders.length > 0 || currentUser.favorites.length > 0) && (
          <div className="space-y-6 pt-6 border-t border-espresso-900/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-700 font-bold block mb-1">
                  PATRON TASTE ARCHIVE
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso-950">
                  Your Saved Moments & Recent Visits
                </h2>
              </div>
              <button
                onClick={openProfile}
                className="text-xs font-serif text-vintageGold-700 hover:text-espresso-950 underline underline-offset-4 flex items-center gap-1"
              >
                <span>View Full Journal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentUser.previousOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-[#FCFAF6] border border-vintageGold-500/35 shadow-sm flex items-center justify-between gap-3 hover:border-vintageGold-500 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={getSafeImageUrl(order.image, order.category)}
                      alt={order.item}
                      className="w-12 h-12 rounded-xl object-cover border border-vintageGold-500/30 shrink-0"
                      onError={(e) => handleImageError(e, VINTAGE_FALLBACKS.coffee)}
                    />
                    <div className="overflow-hidden">
                      <div className="font-serif font-bold text-sm text-espresso-950 truncate">
                        {order.item}
                      </div>
                      <div className="text-[11px] text-espresso-600 font-mono">
                        {order.date} • ₹{order.price}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReorder(order)}
                    className="px-3 py-1.5 rounded-xl bg-espresso-950 text-vintageGold-300 text-xs font-serif font-bold hover:bg-espresso-900 border border-vintageGold-500/40 shrink-0 transition-colors"
                  >
                    Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 5: ABOUT THE AVES & SANCTUARY PHILOSOPHY (Requirement 9)
           ========================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/35 shadow-vintage-lg space-y-8 relative overflow-hidden">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-700 font-bold block">
              OUR FOUNDING PHILOSOPHY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-espresso-950">
              “AI suggests. You decide.”
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-espresso-700 leading-relaxed">
              THE AVES is an AI-powered customer experience layer designed for existing cafés. It combines your taste preferences, current emotional context, and authentic kitchen menu data to create quiet, deeply personal café moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-vintageGold-500/20">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-espresso-950">
                Grounding in Reality
              </h3>
              <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                We never fabricate items, prices, or dietary claims. Every recommendation is synthesized strictly from the café's authoritative kitchen catalog.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-espresso-950">
                Voluntary Taste Memory
              </h3>
              <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                Your memories belong entirely to you. You can review, correct, or delete individual memories, or pause personalization at any time with a single tap.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-espresso-950">
                Quiet Technology
              </h3>
              <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                No loud popups or neon AI dashboards. Just an unhurried digital journal that stays politely in the background while you savor your visit.
              </p>
            </div>
          </div>

          {/* Café Owners Entry Point Banner (Requirement 3 & 9) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-espresso-950 block">
                  Operate a Café Sanctuary?
                </span>
                <span className="text-xs text-espresso-600 font-sans">
                  Deploy THE AVES on your existing tables with zero kitchen disruption.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOwnerModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-espresso-950 text-vintageGold-300 text-xs font-serif font-bold border border-vintageGold-500/40 hover:bg-espresso-900 transition-colors shrink-0"
            >
              For Café Owners →
            </button>
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

      {/* For Café Owners Informational Modal */}
      {isOwnerModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-espresso-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFAF6] rounded-3xl border-2 border-vintageGold-500/40 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 film-grain relative">
            <button
              onClick={() => setIsOwnerModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-espresso-600 hover:text-espresso-950 hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-700 font-bold block">
                OPERATOR ARCHITECTURE
              </span>
              <h3 className="font-display font-bold text-2xl text-espresso-950">
                THE AVES for Café Owners
              </h3>
              <p className="font-serif italic text-sm text-espresso-700">
                The gentle digital layer atop physical hospitality.
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-espresso-800 font-sans leading-relaxed">
              <div className="p-3.5 rounded-xl bg-cream-100 border border-vintageGold-500/25 space-y-1">
                <span className="font-serif font-bold text-espresso-950 block">Plugs Into Existing Operations</span>
                <p>No POS replacement required. THE AVES ingests your menu via JSON or API and generates discreet brass QR code placards for table stands.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-vintageGold-500/25 space-y-1">
                <span className="font-serif font-bold text-espresso-950 block">Increases Average Check Value with Pairing</span>
                <p>By connecting human emotional needs with complementary pairings (e.g. Cinnamon Waffle + Shakespeare's Coffee), patrons naturally discover higher-margin culinary creations.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-vintageGold-500/25 space-y-1">
                <span className="font-serif font-bold text-espresso-950 block">Privacy-First Architecture</span>
                <p>No invasive surveillance. Customers voluntarily curate their taste ledger, building genuine loyalty and repeat visits.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsOwnerModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-espresso-950 text-vintageGold-300 font-serif font-bold text-xs hover:bg-espresso-900 border border-vintageGold-500/40 transition-colors"
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
