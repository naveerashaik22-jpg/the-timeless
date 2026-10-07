import React, { useState } from 'react';
import { ShoppingBag, Check, Info, Sparkles, Flame, Droplets, Thermometer, RefreshCw } from 'lucide-react';
import { RecommendationItem } from '../../types';
import { useCart } from '../../context/CartContext';

interface RecommendationCardProps {
  rec: RecommendationItem;
  onTellMeMore?: (itemName: string) => void;
  onShowAnother?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  rec,
  onTellMeMore,
  onShowAnother,
}) => {
  const { item, match_score, why_it_matches } = rec;
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleAddToCart = () => {
    addItem(item, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-cream-50 rounded-2xl overflow-hidden border border-vintageGold-500/40 shadow-vintage hover:shadow-vintage-lg transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Image & Badges */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-espresso-950">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-black/20" />
        
        {/* Top Badges: Category & Match Score */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-espresso-900/90 text-cream-100 border border-vintageGold-500/40 backdrop-blur-sm">
            {item.category}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-vintageGold-500 text-espresso-950 shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-espresso-900" />
            {match_score}% Match
          </span>
        </div>

        {/* Bottom Image Overlay: Price & Temperature */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-cream-50">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-vintageGold-300 font-semibold">
              Handcrafted
            </span>
            <div className="font-serif font-bold text-xl text-vintageGold-300">
              ₹{item.price}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-espresso-900/80 px-2 py-0.5 rounded-md border border-vintageGold-500/30">
            <Thermometer className="w-3 h-3 text-vintageGold-400" />
            <span>{item.temperature}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <h4 className="font-display font-bold text-lg text-espresso-950 leading-snug">
            {item.name}
          </h4>
          <p className="text-xs text-espresso-700 leading-relaxed mt-1 font-sans">
            {item.description}
          </p>

          {/* Sensory Tags Bar */}
          <div className="mt-3 pt-3 border-t border-vintageGold-500/20 flex flex-wrap items-center gap-1.5 text-[11px]">
            {item.dietary_tags.map((diet, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-cream-200/80 text-espresso-900 font-medium border border-vintageGold-500/20"
              >
                {diet}
              </span>
            ))}
            {item.sweetness_level > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-cream-200/80 text-espresso-900 font-medium border border-vintageGold-500/20">
                Sweetness: {item.sweetness_level}/5
              </span>
            )}
            {item.spice_level > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-burgundy-500/10 text-burgundy-700 font-medium border border-burgundy-500/20 flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" /> Spice: {item.spice_level}/5
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-cream-200/80 text-espresso-800 font-medium capitalize">
              {item.heaviness}
            </span>
          </div>

          {/* "Why we recommend it" callout */}
          <div className="mt-3.5 p-3 rounded-xl bg-cream-100/90 border border-vintageGold-500/30">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-vintageGold-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-vintageGold-600" />
              Why this fits you
            </div>
            <p className="text-xs text-espresso-800 font-serif italic leading-relaxed">
              "{why_it_matches}"
            </p>
          </div>

          {/* Ingredients Collapsible */}
          {showIngredients && (
            <div className="mt-2.5 p-2.5 rounded-lg bg-cream-200/60 text-[11px] text-espresso-800 space-y-1">
              <span className="font-semibold text-espresso-950 uppercase tracking-wide">Artisan Ingredients:</span>
              <p className="leading-relaxed">{item.ingredients.join(', ')}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-vintageGold-500/20">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl font-serif font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
              added
                ? 'bg-green-700 text-cream-50'
                : 'bg-espresso-900 text-vintageGold-300 hover:bg-espresso-800 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added to Tray
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-vintageGold-400" /> Add to Cart (₹{item.price})
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onTellMeMore?.(item.name)}
              className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium text-espresso-700 hover:text-espresso-950 hover:bg-cream-200/80 transition-colors flex items-center justify-center gap-1"
            >
              <Info className="w-3 h-3 text-vintageGold-600" /> Tell Me More
            </button>
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="py-1.5 px-2.5 rounded-lg text-[11px] font-medium text-espresso-700 hover:text-espresso-950 hover:bg-cream-200/80 transition-colors"
            >
              {showIngredients ? 'Hide Ingredients' : 'Ingredients'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
