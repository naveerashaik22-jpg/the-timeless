import React, { useState } from 'react';
import {
  X,
  Compass,
  Coffee,
  Heart,
  Clock,
  Sparkles,
  BookOpen,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  Pause,
  Play,
  Check,
  User,
  LogOut,
  Feather,
  Flame,
  Sun,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const CURATED_MENU_CATALOGUE: Record<string, { id: string; name: string; category: string; price: number; image: string; sensoryNote: string }> = {
  'item-01': {
    id: 'item-01',
    name: 'The Renaissance Waffle',
    category: 'DESSERTS',
    price: 260,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    sensoryNote: 'Warm Ceylon cinnamon sugar & vanilla mascarpone glaze.'
  },
  'item-02': {
    id: 'item-02',
    name: "Shakespeare's Coffee",
    category: 'HOT BEVERAGES',
    price: 220,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    sensoryNote: 'Bourbon vanilla Arabica with velvety microfoam.'
  },
  'item-03': {
    id: 'item-03',
    name: 'Heritage Samovar Chai',
    category: 'HOT BEVERAGES',
    price: 160,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    sensoryNote: 'Cardamom & fresh ginger brewed in vintage samovars.'
  },
  'item-04': {
    id: 'item-04',
    name: "Jane Austen's Cookie",
    category: 'DESSERTS',
    price: 180,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    sensoryNote: 'Shortbread studded with dark chocolate & orange blossom.'
  },
  'item-06': {
    id: 'item-06',
    name: 'The Gatsby Botanical Cooler',
    category: 'COLD BEVERAGES',
    price: 210,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    sensoryNote: 'Wild blackberry cascara with sparkling botanical tonic.'
  }
};

export const ProfileJournalDrawer: React.FC = () => {
  const {
    currentUser,
    isProfileOpen,
    closeProfile,
    logout,
    updatePreferences,
    removeMemory,
    togglePausePersonalization,
    toggleFavorite
  } = useAuth();
  const { addItem, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<'preferences' | 'favourites' | 'orders' | 'discoveries' | 'memory'>('preferences');
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [flavorInput, setFlavorInput] = useState('');

  if (!isProfileOpen || !currentUser) return null;

  const handleAddFlavor = () => {
    if (!flavorInput.trim()) return;
    const currentFlavors = currentUser.preferences.favoriteFlavors;
    if (!currentFlavors.includes(flavorInput.trim())) {
      updatePreferences({
        favoriteFlavors: [...currentFlavors, flavorInput.trim()]
      });
    }
    setFlavorInput('');
  };

  const handleRemoveFlavor = (flavor: string) => {
    updatePreferences({
      favoriteFlavors: currentUser.preferences.favoriteFlavors.filter((f) => f !== flavor)
    });
  };

  const handleQuickAddOrderToTray = (order: typeof currentUser.previousOrders[0]) => {
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
    <div className="fixed inset-0 z-50 overflow-hidden font-sans selection:bg-vintageGold-500 selection:text-espresso-950">
      
      {/* Backdrop */}
      <div
        onClick={closeProfile}
        className="absolute inset-0 bg-[#0C0604]/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#FCFAF6] border-l-2 border-vintageGold-500/40 shadow-2xl flex flex-col justify-between overflow-y-auto film-grain text-espresso-950">
          
          {/* =========================================================================
              DRAWER HEADER: The Digital Café Journal Monogram
             ========================================================================= */}
          <div className="sticky top-0 z-20 bg-[#FCFAF6]/95 backdrop-blur-md border-b border-vintageGold-500/25 px-6 sm:px-8 py-5">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-espresso-950 border border-vintageGold-400 text-vintageGold-400 flex items-center justify-center shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl tracking-wider text-espresso-950">
                    MY AVES
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-vintageGold-700 font-mono block">
                    Digital Café Journal & Memory
                  </span>
                </div>
              </div>

              <button
                onClick={closeProfile}
                className="p-2.5 rounded-full text-espresso-700 hover:bg-cream-200/80 transition-colors"
                aria-label="Close Profile"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Profile Identity Bar */}
            <div className="mt-5 p-4 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-vintageGold-500 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-espresso-950 text-vintageGold-300 font-serif font-bold text-lg flex items-center justify-center border border-vintageGold-400">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg text-espresso-950">
                      {currentUser.name}
                    </h3>
                    {currentUser.isGuest ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest bg-amber-600/15 text-amber-900 border border-amber-600/30">
                        GUEST DINER
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest bg-emerald-600/15 text-emerald-900 border border-emerald-600/30">
                        VERIFIED PATRON
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-espresso-600 font-sans">{currentUser.email}</p>
                  <p className="text-[11px] font-serif italic text-vintageGold-700 mt-0.5">
                    {currentUser.memberSince}
                  </p>
                </div>
              </div>

              {/* Personalization Pause Toggle */}
              <button
                onClick={togglePausePersonalization}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
                  currentUser.personalizationPaused
                    ? 'bg-amber-100 text-amber-900 border-amber-400'
                    : 'bg-[#FCFAF6] text-espresso-800 border-vintageGold-500/40 hover:bg-cream-200'
                }`}
                title={currentUser.personalizationPaused ? 'Personalization Paused' : 'Personalization Active'}
              >
                {currentUser.personalizationPaused ? (
                  <>
                    <Play className="w-3 h-3 text-amber-700" />
                    <span>Resume AI</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-vintageGold-700" />
                    <span>Pause AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Navigation Tabs (Digital Scrapbook Sections) */}
            <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar text-xs font-serif font-semibold">
              <button
                onClick={() => setActiveTab('preferences')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'preferences'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm border border-vintageGold-500'
                    : 'text-espresso-700 hover:bg-cream-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Preferences</span>
              </button>

              <button
                onClick={() => setActiveTab('favourites')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'favourites'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm border border-vintageGold-500'
                    : 'text-espresso-700 hover:bg-cream-200'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Favourites ({currentUser.favorites.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'orders'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm border border-vintageGold-500'
                    : 'text-espresso-700 hover:bg-cream-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Previous Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('discoveries')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'discoveries'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm border border-vintageGold-500'
                    : 'text-espresso-700 hover:bg-cream-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Discoveries</span>
              </button>

              <button
                onClick={() => setActiveTab('memory')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'memory'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm border border-vintageGold-500'
                    : 'text-espresso-700 hover:bg-cream-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>AVES Memory ({currentUser.memories.length})</span>
              </button>
            </div>

          </div>

          {/* =========================================================================
              DRAWER BODY CONTENT
             ========================================================================= */}
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            
            {/* -----------------------------------------------------------------------
                TAB 1: MY PREFERENCES (Visual Taste Profile & Sensory Dials)
               ----------------------------------------------------------------------- */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                
                {/* Visual Barista Note */}
                <div className="p-5 rounded-2xl bg-[#1C0F0A] text-ivory-50 border border-vintageGold-500/40 relative shadow-md">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-400">
                    <Feather className="w-3.5 h-3.5" />
                    <span>BARISTA CALIBRATION RECORD</span>
                  </div>
                  <p className="font-handwriting text-xl sm:text-2xl text-cream-100 leading-snug mt-2">
                    “{currentUser.name} leans toward comforting warmth, single-origin Arabica, and velvety microfoam. Low acidity keeps the experience gentle.”
                  </p>
                </div>

                {/* Favourite Flavours Chips */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-espresso-700 font-bold flex items-center gap-2">
                      <Coffee className="w-3.5 h-3.5 text-vintageGold-600" />
                      FAVOURITE FLAVOURS & NOTES
                    </span>
                    <button
                      onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                      className="text-xs font-serif text-vintageGold-700 hover:text-espresso-950 underline underline-offset-2 font-semibold"
                    >
                      {isEditingPreferences ? 'Done Editing' : 'Edit Preferences'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentUser.preferences.favoriteFlavors.map((flavor, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream-100 border border-vintageGold-500/35 text-xs font-serif text-espresso-900 shadow-sm"
                      >
                        <Coffee className="w-3 h-3 text-vintageGold-600" />
                        <span>{flavor}</span>
                        {isEditingPreferences && (
                          <button
                            onClick={() => handleRemoveFlavor(flavor)}
                            className="ml-1 text-espresso-400 hover:text-burgundy-700 font-bold"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  {isEditingPreferences && (
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={flavorInput}
                        onChange={(e) => setFlavorInput(e.target.value)}
                        placeholder="Add flavor note (e.g. Lavender, Hazelnut, Honeycomb)..."
                        className="flex-1 px-3 py-2 rounded-xl bg-cream-100 border border-vintageGold-500/40 text-xs font-serif text-espresso-950 focus:outline-none focus:border-vintageGold-600"
                      />
                      <button
                        onClick={handleAddFlavor}
                        className="px-4 py-2 rounded-xl bg-espresso-950 text-vintageGold-300 text-xs font-serif font-bold shadow-sm hover:bg-espresso-900 transition-colors"
                      >
                        Add Note
                      </button>
                    </div>
                  )}
                </div>

                {/* Visual Preference Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Sweetness */}
                  <div className="p-4 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-800 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-vintageGold-600" />
                      SWEETNESS PREFERENCE
                    </span>
                    <div className="font-serif font-bold text-sm text-espresso-950">
                      {currentUser.preferences.sweetnessPreference}
                    </div>
                    <p className="text-[11px] text-espresso-600 font-sans">
                      Never cloying; natural agave or bourbon vanilla extract.
                    </p>
                  </div>

                  {/* Spice */}
                  <div className="p-4 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-800 font-bold flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-terracotta-600" />
                      SPICE PREFERENCE
                    </span>
                    <div className="font-serif font-bold text-sm text-espresso-950">
                      {currentUser.preferences.spicePreference}
                    </div>
                    <p className="text-[11px] text-espresso-600 font-sans">
                      Crushed green cardamom and single-origin Ceylon cinnamon.
                    </p>
                  </div>

                  {/* Dietary Preferences */}
                  <div className="p-4 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-800 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      DIETARY PREFERENCES
                    </span>
                    <div className="font-serif font-bold text-sm text-espresso-950">
                      {currentUser.preferences.dietaryPreferences.join(' • ')}
                    </div>
                    <p className="text-[11px] text-espresso-600 font-sans">
                      Filtered automatically across all moment formulations.
                    </p>
                  </div>

                  {/* Favourite Categories */}
                  <div className="p-4 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-800 font-bold flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-vintageGold-600" />
                      FAVOURITE CATEGORIES
                    </span>
                    <div className="font-serif font-bold text-sm text-espresso-950">
                      {currentUser.preferences.favoriteCategories.join(' & ')}
                    </div>
                    <p className="text-[11px] text-espresso-600 font-sans">
                      Artisan hot brews and handcrafted Parisian pastries.
                    </p>
                  </div>

                  {/* Other Saved Preferences */}
                  <div className="sm:col-span-2 p-4 rounded-2xl bg-cream-100/90 border border-vintageGold-500/30 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-800 font-bold flex items-center gap-1.5">
                      <Sun className="w-3 h-3 text-amber-600" />
                      OTHER SAVED PREFERENCES
                    </span>
                    <div className="font-serif font-bold text-sm text-espresso-950">
                      {currentUser.preferences.roastPreference} • Velvet Oat Microfoam • Quiet Veranda Nook
                    </div>
                    <p className="text-[11px] text-espresso-600 font-sans">
                      Single-origin medium roast with notes of hazelnut and stone fruit, served in ceramic tableware.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* -----------------------------------------------------------------------
                TAB 2: MY FAVOURITES (Visual Cards & Direct Reorder)
               ----------------------------------------------------------------------- */}
            {activeTab === 'favourites' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-espresso-700 font-bold">
                    FAVOURITE DISHES & DRINKS ({currentUser.favorites.length})
                  </span>
                  <span className="text-[11px] font-serif text-vintageGold-700 italic">
                    Tap heart on any menu item to pin here
                  </span>
                </div>

                {currentUser.favorites.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-cream-100/80 border border-vintageGold-500/30 space-y-3">
                    <Heart className="w-8 h-8 text-vintageGold-500 mx-auto stroke-1" />
                    <p className="font-serif text-espresso-800 text-sm">
                      No favourites pinned yet. Explore our Artisan Menu or Moments to collect your cherished formulations.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentUser.favorites.map((favId) => {
                      const item = CURATED_MENU_CATALOGUE[favId] || {
                        id: favId,
                        name: 'Specialty Selection',
                        category: 'HOT BEVERAGES',
                        price: 210,
                        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
                        sensoryNote: 'Handcrafted signature table specialty.'
                      };

                      return (
                        <div
                          key={favId}
                          className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/35 space-y-3 group hover:border-vintageGold-500 transition-all shadow-sm"
                        >
                          <div className="relative h-36 rounded-xl overflow-hidden bg-espresso-950">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-espresso-950/90 text-vintageGold-300 font-serif font-bold text-xs border border-vintageGold-500/30">
                              ₹{item.price}
                            </span>
                            <button
                              onClick={() => toggleFavorite(favId)}
                              className="absolute top-2 left-2 p-1.5 rounded-full bg-cream-100/90 text-burgundy-700 shadow-sm"
                              title="Remove from favourites"
                            >
                              <Heart className="w-3.5 h-3.5 fill-burgundy-700" />
                            </button>
                          </div>

                          <div>
                            <div className="font-serif font-bold text-base text-espresso-950">
                              {item.name}
                            </div>
                            <p className="text-xs text-espresso-600 font-sans line-clamp-1 mt-0.5">
                              {item.sensoryNote}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              addItem({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                category: item.category as any,
                                description: item.sensoryNote,
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
                            className="w-full py-2 px-3 rounded-xl bg-espresso-950 hover:bg-espresso-900 text-vintageGold-300 font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Tray</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* -----------------------------------------------------------------------
                TAB 3: MY ORDERS (Visual Order Timeline with Status & Reorder)
               ----------------------------------------------------------------------- */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-espresso-700 font-bold block">
                    PREVIOUS ORDERS ARCHIVE ({currentUser.previousOrders.length})
                  </span>
                  <span className="text-[11px] font-mono text-vintageGold-700">
                    TABLE ARCHIVE
                  </span>
                </div>

                {currentUser.previousOrders.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-cream-100/80 border border-vintageGold-500/30 space-y-2">
                    <Clock className="w-8 h-8 text-vintageGold-500 mx-auto stroke-1" />
                    <p className="font-serif text-espresso-800 text-sm">
                      No past orders recorded in this session. Orders made to your tray will be archived here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentUser.previousOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/30 flex items-center justify-between gap-4 hover:border-vintageGold-500 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={order.image}
                            alt={order.item}
                            className="w-16 h-16 rounded-xl object-cover border border-vintageGold-500/30 shrink-0"
                          />
                          <div>
                            <div className="font-serif font-bold text-sm sm:text-base text-espresso-950">
                              {order.item}
                            </div>
                            <div className="text-xs text-espresso-600 font-sans mt-0.5">
                              {order.cafe}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-mono text-espresso-500">
                                {order.date}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-emerald-600/15 text-emerald-900 border border-emerald-600/30">
                                {order.status || 'Served'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 space-y-2">
                          <div className="font-serif font-bold text-sm sm:text-base text-espresso-950">
                            ₹{order.price}
                          </div>
                          <button
                            onClick={() => handleQuickAddOrderToTray(order)}
                            className="px-3.5 py-1.5 rounded-lg bg-espresso-950 text-vintageGold-300 text-xs font-serif font-semibold hover:bg-espresso-900 transition-colors shadow-sm flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Reorder</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* -----------------------------------------------------------------------
                TAB 4: MY DISCOVERIES (Things Tried Through AVES AI Recommendations)
               ----------------------------------------------------------------------- */}
            {activeTab === 'discoveries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-espresso-700 font-bold block">
                    THINGS TRIED THROUGH AVES RECOMMENDATIONS ({currentUser.discoveries.length})
                  </span>
                  <span className="text-[11px] font-serif text-vintageGold-700 italic">
                    AI Curated Discoveries
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.discoveries.map((disc) => (
                    <div
                      key={disc.id}
                      className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/30 space-y-3 shadow-sm hover:border-vintageGold-500 transition-colors"
                    >
                      <div className="h-36 rounded-xl overflow-hidden bg-espresso-950">
                        <img
                          src={disc.image}
                          alt={disc.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-vintageGold-700 uppercase tracking-wider">
                          {disc.date}
                        </span>
                        <div className="font-serif font-bold text-base text-espresso-950 mt-0.5">
                          {disc.title}
                        </div>
                        <p className="text-xs text-espresso-700 font-sans leading-relaxed mt-1">
                          {disc.memoryNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -----------------------------------------------------------------------
                TAB 5: AVES MEMORY (What The System Remembers With Explicit Controls)
               ----------------------------------------------------------------------- */}
            {activeTab === 'memory' && (
              <div className="space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-vintageGold-700 font-bold block">
                      AVES MEMORY INTELLIGENCE
                    </span>
                    <h4 className="font-display font-bold text-lg text-espresso-950">
                      What THE AVES Remembers
                    </h4>
                  </div>
                  
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cream-200 border border-vintageGold-500/30 text-espresso-700 uppercase tracking-wider">
                    USER PRIVACY CONTROL
                  </span>
                </div>

                {/* EXPLICIT CONTROLS BAR: EDIT PREFERENCES | FORGET/REMOVE MEMORY | PAUSE PERSONALIZATION */}
                <div className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/40 space-y-3 shadow-sm">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-espresso-600 font-bold">
                    PERSONALIZATION CONTROLS
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* CONTROL 1: EDIT PREFERENCES */}
                    <button
                      onClick={() => {
                        setActiveTab('preferences');
                        setIsEditingPreferences(true);
                      }}
                      className="px-3 py-2 rounded-xl bg-espresso-950 text-vintageGold-300 text-xs font-serif font-bold flex items-center justify-center gap-1.5 hover:bg-espresso-900 transition-colors shadow-sm"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>EDIT PREFERENCES</span>
                    </button>

                    {/* CONTROL 2: FORGET / REMOVE MEMORY */}
                    <button
                      onClick={() => {
                        if (currentUser.memories.length > 0) {
                          // Remove the latest memory or clear
                          removeMemory(currentUser.memories[0].id);
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-[#FCFAF6] border border-burgundy-700/30 text-burgundy-800 text-xs font-serif font-bold flex items-center justify-center gap-1.5 hover:bg-burgundy-50 transition-colors"
                      title="Remove earliest memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>FORGET / REMOVE</span>
                    </button>

                    {/* CONTROL 3: PAUSE PERSONALIZATION */}
                    <button
                      onClick={togglePausePersonalization}
                      className={`px-3 py-2 rounded-xl border text-xs font-serif font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        currentUser.personalizationPaused
                          ? 'bg-amber-100 text-amber-900 border-amber-400'
                          : 'bg-[#FCFAF6] text-espresso-900 border-vintageGold-500/40 hover:bg-cream-200'
                      }`}
                    >
                      {currentUser.personalizationPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5 text-amber-700" />
                          <span>RESUME AI</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5 text-vintageGold-700" />
                          <span>PAUSE AI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {currentUser.personalizationPaused && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-amber-900 font-sans flex items-center gap-2">
                      <Pause className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Personalization is currently paused. AVES will recommend standard seasonal offerings without profiling your taste.</span>
                    </div>
                  )}
                </div>

                {/* MEMORIES LIST */}
                <div className="space-y-3">
                  {currentUser.memories.map((mem) => (
                    <div
                      key={mem.id}
                      className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/35 flex items-start justify-between gap-3 group hover:border-vintageGold-500 transition-colors shadow-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-vintageGold-800 font-bold">
                          {mem.category}
                        </span>
                        <p className="font-serif text-sm sm:text-base text-espresso-950 leading-relaxed">
                          “{mem.statement}”
                        </p>
                      </div>

                      <button
                        onClick={() => removeMemory(mem.id)}
                        className="p-2 rounded-lg text-espresso-400 hover:text-burgundy-700 hover:bg-cream-200/80 transition-colors shrink-0"
                        title="Forget / remove this memory"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Privacy Guarantee Note */}
                <div className="p-4 rounded-2xl bg-cream-100/60 border border-vintageGold-500/20 text-xs text-espresso-600 space-y-1.5 font-sans">
                  <div className="flex items-center gap-2 font-bold text-espresso-950">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Your Privacy Guarantee</span>
                  </div>
                  <p>
                    All memories are kept strictly within your private patron session. You have full control to edit preferences, forget individual memories, or pause personalization at any moment.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* =========================================================================
              DRAWER FOOTER: Sign Out / Switch Session
             ========================================================================= */}
          <div className="sticky bottom-0 z-20 bg-[#FCFAF6]/95 backdrop-blur-md border-t border-vintageGold-500/25 px-6 sm:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => {
                logout();
                closeProfile();
              }}
              className="text-xs font-serif text-espresso-700 hover:text-burgundy-700 flex items-center gap-1.5 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out / Switch Table</span>
            </button>

            <span className="font-mono text-[10px] text-vintageGold-700 tracking-wider">
              THE AVES PATRON SYSTEM
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
