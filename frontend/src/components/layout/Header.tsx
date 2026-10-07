import React, { useState } from 'react';
import {
  Compass,
  ShoppingBag,
  Sparkles,
  Coffee,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  User,
  Heart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export type AVESView =
  | 'landing'
  | 'create_moment'
  | 'menu'
  | 'table_qr'
  | 'understanding'
  | 'moment_reveal'
  | 'explanation'
  | 'memory'
  | 'discover'
  | 'operator';

interface HeaderProps {
  currentView: AVESView;
  onNavigate: (view: AVESView) => void;
  onOpenFaq: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenFaq }) => {
  const { itemCount, subtotal, openCart } = useCart();
  const { currentUser, openProfile, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing' as AVESView, label: 'Platform Vision' },
    { id: 'create_moment' as AVESView, label: 'Create My Moment', isSignature: true },
    { id: 'menu' as AVESView, label: 'Artisan Menu' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full vintage-glass border-b border-vintageGold-500/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* =========================================================================
              LEFT: THE AVES Brand Identity
             ========================================================================= */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left group transition-transform duration-200 active:scale-95 shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-espresso-950 border border-vintageGold-400 flex items-center justify-center shadow-vintage text-vintageGold-400 group-hover:border-vintageGold-300 transition-colors">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl sm:text-2xl tracking-[0.22em] text-espresso-950 uppercase">
                  THE AVES
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-vintageGold-500/15 text-vintageGold-800 border border-vintageGold-500/30 rounded-full">
                  Sanctuary
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-espresso-600 font-editorial italic tracking-wide">
                Your café. Your moment.
              </p>
            </div>
          </button>

          {/* =========================================================================
              CENTER: Elegant Typography Navigation (Not bulky pill buttons)
             ========================================================================= */}
          <nav className="hidden md:flex items-center gap-8 font-serif text-sm">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-2 transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-espresso-950 font-bold'
                      : 'text-espresso-700 hover:text-espresso-950 font-normal'
                  }`}
                >
                  {link.isSignature && (
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-vintageGold-600' : 'text-vintageGold-500'}`} />
                  )}
                  <span>{link.label}</span>
                  
                  {/* Subtle golden underline indicator for active item */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-vintageGold-500 rounded-full shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* =========================================================================
              RIGHT: Table Badge, Profile Anchor & Tray
             ========================================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Table Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-200/60 border border-vintageGold-500/25 text-espresso-800 text-[11px] font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold text-espresso-950">Table 08</span>
              <span className="text-espresso-500">• Veranda</span>
            </div>

            {/* Knowledge / FAQ */}
            <button
              onClick={onOpenFaq}
              className="p-2 rounded-full text-espresso-700 hover:bg-cream-200/80 transition-colors"
              title="Knowledge Base & FAQ"
            >
              <HelpCircle className="w-4 h-4 text-vintageGold-700" />
            </button>

            {/* =======================================================================
                USER PROFILE ANCHOR (Clean avatar + name + "My AVES" or Patron Sign In)
               ======================================================================= */}
            {currentUser ? (
              <button
                onClick={openProfile}
                className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-cream-200/70 border border-vintageGold-500/30 hover:border-vintageGold-500 transition-all group"
                title="Open My AVES Journal"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-vintageGold-500/60 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-espresso-950 text-vintageGold-300 font-serif font-bold text-xs flex items-center justify-center border border-vintageGold-500/50">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-serif font-bold text-espresso-950 group-hover:text-vintageGold-800 transition-colors leading-none">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-700 mt-0.5">
                    My AVES
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full hover:bg-cream-200/80 border border-vintageGold-500/35 text-espresso-900 transition-all text-xs font-serif font-medium group hover:border-vintageGold-500 shadow-sm"
                title="Sign in to your AVES Journal"
              >
                <div className="w-6 h-6 rounded-full bg-cream-200 border border-vintageGold-500/40 flex items-center justify-center text-vintageGold-800 group-hover:scale-105 transition-transform">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-left hidden sm:block">
                  <span className="font-serif font-bold text-xs text-espresso-950 group-hover:text-vintageGold-800 transition-colors block leading-none">
                    Patron Sign In
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-vintageGold-700 mt-0.5 block">
                    My AVES
                  </span>
                </div>
              </button>
            )}

            {/* Tray Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-espresso-950 text-vintageGold-300 border border-vintageGold-500 shadow-vintage hover:bg-espresso-900 active:scale-95 transition-all"
              aria-label="View Tray"
            >
              <ShoppingBag className="w-4 h-4 text-vintageGold-400" />
              <span className="hidden sm:inline font-serif font-medium text-xs">
                {itemCount > 0 ? `₹${subtotal}` : 'Tray'}
              </span>
              {itemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-burgundy-600 text-cream-50 text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-espresso-900 hover:bg-cream-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-vintageGold-500/20 bg-cream-100/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2">
          {currentUser ? (
            <button
              onClick={() => {
                openProfile();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-3 rounded-2xl bg-cream-200/90 border border-vintageGold-500/30 flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-3">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-espresso-950 text-vintageGold-300 font-serif font-bold flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-serif font-bold text-sm text-espresso-950">{currentUser.name}</div>
                  <div className="text-[10px] font-mono uppercase text-vintageGold-700">Open My AVES Journal</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-espresso-500" />
            </button>
          ) : (
            <button
              onClick={() => {
                openAuthModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-3 rounded-2xl bg-espresso-950 border border-vintageGold-500 text-vintageGold-300 flex items-center justify-between mb-3 shadow-vintage"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cream-200 text-espresso-950 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-ivory-50">Patron Sign In</div>
                  <div className="text-[10px] font-mono uppercase text-vintageGold-400">Unlock My AVES Journal & Memory</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-vintageGold-400" />
            </button>
          )}

          <div className="text-[10px] font-bold uppercase tracking-widest text-espresso-500 px-3 py-1">
            Navigate Sanctuary:
          </div>
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-serif text-sm font-semibold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-espresso-950 text-vintageGold-300 border border-vintageGold-500'
                    : 'text-espresso-950 hover:bg-cream-200'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
