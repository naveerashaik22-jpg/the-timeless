import React from 'react';
import { Compass, Sparkles, Heart, Coffee, ShieldCheck, HelpCircle } from 'lucide-react';
import { AVESView } from './Header';

interface FooterProps {
  onNavigate: (view: AVESView) => void;
  onOpenFaq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenFaq }) => {
  return (
    <footer className="bg-espresso-950 text-cream-100 border-t-2 border-vintageGold-500/40 relative overflow-hidden">
      {/* Decorative top gold border line */}
      <div className="h-1 w-full vintage-gold-gradient opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-espresso-900 border border-vintageGold-500 flex items-center justify-center text-vintageGold-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-[0.2em] text-vintageGold-300 uppercase">
                THE AVES
              </span>
            </div>
            <p className="text-xs text-cream-300/80 leading-relaxed font-serif">
              "Where technology stays quietly in the background, and human feeling takes center stage."
            </p>
            <p className="text-[11px] text-vintageGold-500 uppercase tracking-widest font-semibold">
              The AI Customer Experience Layer for Specialty Cafés
            </p>
          </div>

          {/* Col 2: The Guest Journey */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-wider uppercase text-vintageGold-400 border-b border-vintageGold-500/20 pb-2">
              Guest Journey
            </h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li>
                <button onClick={() => onNavigate('create_moment')} className="hover:text-vintageGold-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-vintageGold-500" /> Create My Moment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-vintageGold-300 transition-colors">
                  Artisan Menu Archive
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('table_qr')} className="hover:text-vintageGold-300 transition-colors">
                  Tabletop QR Experience
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: The Hospitality Layer */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-wider uppercase text-vintageGold-400 border-b border-vintageGold-500/20 pb-2">
              Computational Hospitality
            </h4>
            <div className="space-y-1.5 text-xs text-cream-300">
              <div className="flex justify-between">
                <span>Emotional Matching:</span>
                <span className="font-semibold text-vintageGold-300">10 Nuanced Moods</span>
              </div>
              <div className="flex justify-between">
                <span>Multi-Criteria Scoring:</span>
                <span>6 Weighted Dimensions</span>
              </div>
              <div className="flex justify-between">
                <span>Dietary Guardrails:</span>
                <span className="font-semibold text-vintageGold-300">Strict Hard Filtering</span>
              </div>
              <p className="text-[11px] text-cream-400/60 pt-1">
                Zero cold kiosk menus. Pure empathetic curation.
              </p>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Help */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-wider uppercase text-vintageGold-400 border-b border-vintageGold-500/20 pb-2">
              Assistance & Transparency
            </h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li>
                <button onClick={onOpenFaq} className="hover:text-vintageGold-300 transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-vintageGold-500" /> Café Knowledge Base & Policies
                </button>
              </li>
              <li>
                <span className="text-cream-400/70 text-[11px]">Non-Clinical Care & Distress Safety Protocol Active</span>
              </li>
              <li>
                <span className="text-cream-400/70 text-[11px]">Designed for Independent & Boutique Hospitality</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-vintageGold-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/60 gap-4">
          <p>© 2026 THE AVES PLATFORM. All culinary moments reserved.</p>
          <div className="flex items-center gap-2 text-vintageGold-500/80">
            <span>Crafted with intentional soul & empathetic intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
