import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Sparkles, Filter, RefreshCw, Coffee, Flame, Feather, Compass } from 'lucide-react';
import { MenuItem } from '../../types';
import { fetchMenu } from '../../services/api';
import { MenuItemCard } from './MenuItemCard';

interface MenuBrowserProps {
  onStartCompanionWithMood?: (moodPrompt?: string) => void;
}

// Visual Mood scenes for the Menu page
const MENU_MOOD_CHOICES = [
  {
    id: 'calm',
    label: 'CALM',
    tag: 'Soothing florals',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80',
    prompt: 'I want quiet stillness. Something soothing, delicate, and unhurried.'
  },
  {
    id: 'focus',
    label: 'FOCUS',
    tag: 'Dark roast clarity',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
    prompt: 'Sitting down for deep focus. Need clean clarity without a crash.'
  },
  {
    id: 'comfort',
    label: 'COMFORT',
    tag: 'Warm cinnamon spice',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=300&q=80',
    prompt: 'Surprise me with something warm, comforting, and familiar.'
  },
  {
    id: 'energy',
    label: 'ENERGY',
    tag: 'Citrus cold extraction',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80',
    prompt: 'Need an invigorating caffeine boost with vibrant citrus notes.'
  },
  {
    id: 'social',
    label: 'SOCIAL',
    tag: 'French press to share',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=300&q=80',
    prompt: 'Catching up with a companion. Something aromatic and easy to share.'
  },
  {
    id: 'nostalgic',
    label: 'NOSTALGIC',
    tag: 'Cardamom samovar chai',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80',
    prompt: 'Longing for traditional tea rituals. Spiced, authentic, and grounding.'
  },
  {
    id: 'curious',
    label: 'CURIOUS',
    tag: 'Botanical infusions',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80',
    prompt: 'Want something rare and exploratory from the roaster secret archive.'
  },
  {
    id: 'surprise',
    label: 'SURPRISE',
    tag: 'Mystery pairing',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=300&q=80',
    prompt: 'Surprise me completely with a bespoke formulation.'
  }
];

export const MenuBrowser: React.FC<MenuBrowserProps> = ({ onStartCompanionWithMood }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDietary, setSelectedDietary] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenu = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMenu({
        category: selectedCategory === 'ALL' ? undefined : selectedCategory,
        dietary: selectedDietary === 'ALL' ? undefined : selectedDietary,
        search: searchQuery.trim() || undefined,
      });
      setItems(data.items);
      if (categories.length === 0) {
        setCategories(['ALL', ...data.categories]);
      }
    } catch (err: any) {
      console.error(err);
      setError('Unable to load menu at this moment. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="py-10 sm:py-16 vintage-paper-bg min-h-screen text-espresso-950 font-sans selection:bg-vintageGold-500 selection:text-espresso-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* =========================================================================
            EDITORIAL HEADER
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-200/90 text-espresso-800 text-xs font-mono font-bold uppercase tracking-widest border border-vintageGold-500/30">
            <BookOpen className="w-3.5 h-3.5 text-vintageGold-600" />
            <span>EDITORIAL CAFÉ ARCHIVE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-normal text-espresso-950 tracking-tight">
            The Artisan Menu
          </h1>

          <p className="font-editorial italic text-lg sm:text-xl text-espresso-700">
            “24 vintage formulations, handcrafted brews, and comforting culinary companions.”
          </p>
        </div>

        {/* =========================================================================
            REQUIREMENT 8: VISUAL MOOD AREA (Replacing the generic black banner)
            Atmospheric composition with 8 visual mood choices!
           ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FCFAF6] border-2 border-vintageGold-500/40 shadow-vintage-lg space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-vintageGold-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-700 font-bold block">
                  SENSORY MOOD CURATION
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-espresso-950">
                  What's your mood today?
                </h3>
              </div>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-espresso-600 max-w-xs">
              Tap any atmosphere to have the AVES Thread synthesize your perfect dish.
            </p>
          </div>

          {/* Visual Mood Choices Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {MENU_MOOD_CHOICES.map((mood) => (
              <button
                key={mood.id}
                type="button"
                onClick={() => onStartCompanionWithMood && onStartCompanionWithMood(mood.prompt)}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] text-left border border-vintageGold-500/30 hover:border-vintageGold-500 shadow-sm hover:shadow-vintage transition-all duration-300 active:scale-95"
              >
                <img
                  src={mood.image}
                  alt={mood.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-85 group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-ivory-50">
                  <div className="font-display font-bold text-xs tracking-wider group-hover:text-vintageGold-300 transition-colors">
                    {mood.label}
                  </div>
                  <div className="text-[9px] text-ivory-300/80 font-sans line-clamp-1 leading-none mt-0.5">
                    {mood.tag}
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* =========================================================================
            SEARCH & CATEGORY FILTERS
           ========================================================================= */}
        <div className="bg-[#FCFAF6] rounded-2xl border border-vintageGold-500/30 p-5 shadow-vintage space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-espresso-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients (e.g. Vanilla Latte, Truffle, Cinnamon Waffle, Samovar Chai)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-cream-100/90 border border-vintageGold-500/35 text-xs sm:text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-vintageGold-600 font-serif"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'bg-espresso-950 text-vintageGold-300 border-vintageGold-500 shadow-sm'
                      : 'bg-cream-100/80 text-espresso-800 border-vintageGold-500/25 hover:bg-cream-200 hover:text-espresso-950'
                  }`}
                >
                  {cat === 'ALL' ? 'All Creations' : cat}
                </button>
              );
            })}
          </div>

          {/* Dietary Safeguards */}
          <div className="flex items-center justify-between pt-2 border-t border-espresso-900/10 text-xs">
            <div className="flex items-center gap-2 font-mono text-[11px] text-espresso-600">
              <Filter className="w-3.5 h-3.5 text-vintageGold-600" />
              <span>Dietary Filter:</span>
              {['ALL', 'vegetarian', 'vegan', 'gluten-free'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => setSelectedDietary(diet)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    selectedDietary === diet
                      ? 'bg-vintageGold-500 text-espresso-950 font-bold'
                      : 'text-espresso-700 hover:text-espresso-950'
                  }`}
                >
                  {diet === 'ALL' ? 'Any' : diet}
                </button>
              ))}
            </div>

            <div className="font-mono text-[11px] text-espresso-500">
              Showing {items.length} formulations
            </div>
          </div>

        </div>

        {/* =========================================================================
            MENU ITEMS GRID (Visual Editorial Cards)
           ========================================================================= */}
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-espresso-950 text-vintageGold-400 flex items-center justify-center mx-auto animate-spin">
              <Compass className="w-6 h-6" />
            </div>
            <p className="font-serif italic text-sm text-espresso-700">
              Opening the culinary archive...
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-4 p-8 rounded-3xl bg-cream-100 border border-burgundy-500/30">
            <p className="font-serif text-base text-burgundy-900">{error}</p>
            <button
              onClick={loadMenu}
              className="px-5 py-2.5 rounded-xl bg-espresso-950 text-vintageGold-300 text-xs font-serif font-bold shadow-sm inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Coffee className="w-10 h-10 text-vintageGold-500 mx-auto" />
            <h3 className="font-display font-bold text-xl text-espresso-950">
              No matching recipes found
            </h3>
            <p className="font-serif italic text-sm text-espresso-600">
              Try adjusting your search terms or dietary filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
