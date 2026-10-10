import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, Flame, Snowflake, Heart } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { handleImageError, getSafeImageUrl } from '../../utils/imageFallback';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem } = useCart();
  const { currentUser, toggleFavorite } = useAuth();
  const [added, setAdded] = useState(false);

  // Check if item is an AVES Pick (signature or prominent curated formulation)
  const isAvesPick =
    item.category === 'SIGNATURE ITEMS' ||
    item.price >= 250 ||
    item.id === 'item-02' ||
    item.id === 'item-01' ||
    item.id === 'item-03';

  const isFavorite = currentUser?.favorites?.includes(item.id) || false;

  // Synthesize concise editorial sensory line (e.g. "Comforting · Mildly sweet")
  const sensoryFlavor = item.taste_tags.length > 0
    ? item.taste_tags[0].charAt(0).toUpperCase() + item.taste_tags[0].slice(1)
    : 'Comforting';
  
  const sweetnessText = item.sweetness_level === 0
    ? 'Unsweetened'
    : item.sweetness_level <= 2
    ? 'Mildly sweet'
    : 'Rich sweetness';

  const sensoryNote = `${sensoryFlavor} · ${sweetnessText}`;

  const handleAdd = () => {
    addItem(item, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group bg-[#FCFAF6] rounded-3xl overflow-hidden border border-vintageGold-500/35 shadow-vintage hover:shadow-vintage-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      
      {/* =========================================================================
          1. LARGE DRINK / FOOD PHOTOGRAPHY (Editorial Focal Point)
         ========================================================================= */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-espresso-950">
        <img
          src={getSafeImageUrl(item.image, item.category)}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
          loading="lazy"
          onError={(e) => handleImageError(e, getSafeImageUrl(null, item.category))}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-espresso-950/15 to-transparent pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          {/* AVES Pick or Category Badge */}
          {isAvesPick ? (
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-vintageGold-500 text-espresso-950 border border-vintageGold-300 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-espresso-950" />
              <span>AVES PICK</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-espresso-950/85 backdrop-blur-md text-cream-100 border border-vintageGold-500/30">
              {item.category}
            </span>
          )}

          <div className="flex items-center gap-2">
            {/* Temperature Tag */}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-espresso-950/85 backdrop-blur-md text-ivory-100 flex items-center gap-1 border border-vintageGold-500/30">
              {item.temperature === 'hot' ? (
                <>
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Steaming</span>
                </>
              ) : (
                <>
                  <Snowflake className="w-3 h-3 text-sky-400" />
                  <span>Chilled</span>
                </>
              )}
            </span>

            {/* Favorite toggle if logged in */}
            {currentUser && (
              <button
                type="button"
                onClick={() => toggleFavorite(item.id)}
                className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                  isFavorite
                    ? 'bg-burgundy-600 border-burgundy-400 text-ivory-50'
                    : 'bg-espresso-950/70 border-vintageGold-500/40 text-ivory-300 hover:text-vintageGold-300'
                }`}
                title={isFavorite ? 'Remove from Favourites' : 'Save to My AVES Favourites'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Image Overlay: Subtle Price Plaque */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10">
          <div className="px-3.5 py-1.5 rounded-2xl bg-espresso-950/90 backdrop-blur-md border border-vintageGold-500/50 text-vintageGold-300 font-serif font-bold text-lg shadow-sm">
            ₹{item.price}
          </div>

          {item.dietary_tags.length > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-cream-100/90 backdrop-blur-md text-espresso-900 border border-vintageGold-500/25 capitalize shadow-sm">
              {item.dietary_tags[0]}
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          2. EDITORIAL CAFÉ INFORMATION (Visuals Over Text)
          Name + Sensory Line + Action
         ========================================================================= */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-espresso-950 group-hover:text-vintageGold-800 transition-colors leading-tight">
            {item.name}
          </h3>
          
          {/* Concise Sensory Tagline: "Comforting · Mildly sweet" */}
          <p className="font-editorial italic text-base sm:text-lg text-espresso-700 font-normal">
            {sensoryNote}
          </p>
        </div>

        {/* Quick Add To Tray */}
        <div className="pt-2 border-t border-vintageGold-500/20">
          <button
            onClick={handleAdd}
            className={`w-full py-3 px-4 rounded-2xl font-serif font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95 ${
              added
                ? 'bg-emerald-800 text-ivory-50'
                : 'bg-espresso-950 hover:bg-espresso-900 text-vintageGold-300 border border-vintageGold-500/50'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added to Tray</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-vintageGold-400" />
                <span>Add to Tray • ₹{item.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
