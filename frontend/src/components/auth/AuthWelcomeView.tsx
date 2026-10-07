import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Coffee,
  Bookmark,
  ShieldCheck,
  Check,
  Mail,
  User,
  Heart,
  Feather,
  Clock,
  Flame,
  KeyRound,
  Eye
} from 'lucide-react';

interface AuthWelcomeViewProps {
  onContinueAsGuest: () => void;
  onAuthenticated: (userProfile: { name: string; email: string; isGuest: boolean }) => void;
}

export const AuthWelcomeView: React.FC<AuthWelcomeViewProps> = ({
  onContinueAsGuest,
  onAuthenticated,
}) => {
  const [authMode, setAuthMode] = useState<'options' | 'email' | 'register'>('options');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  const handleGoogleAuth = () => {
    onAuthenticated({
      name: 'Naveera',
      email: 'naveera@aves.cafe',
      isGuest: false,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    onAuthenticated({
      name: nameInput.trim() || (emailInput.toLowerCase().includes('naveera') ? 'Naveera' : emailInput.split('@')[0] || 'Naveera'),
      email: emailInput.trim(),
      isGuest: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#0C0604] text-ivory-50 flex flex-col lg:flex-row relative overflow-hidden film-grain selection:bg-vintageGold-500 selection:text-espresso-950 font-sans">
      
      {/* Ambient warm light motes / golden embers */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-vintageGold-300 blur-[1px] animate-ember-1 pointer-events-none z-20" />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-vintageGold-400 blur-[1px] animate-ember-2 pointer-events-none z-20" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-terracotta-400 blur-[1px] animate-ember-3 pointer-events-none z-20" />

      {/* =========================================================================
          LEFT SCREEN (60%): CINEMATIC CAFÉ COMPOSITION (70% Visual Dominance)
          Atmospheric café imagery, warm candlelight, coffee steam, open book, handwritten notes
         ========================================================================= */}
      <div className="relative w-full lg:w-[58%] min-h-[500px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden border-b lg:border-b-0 lg:border-r border-vintageGold-500/20">
        
        {/* Layered High-Resolution Editorial Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=88"
            alt="Warm atmospheric café interior with warm amber lights and books"
            className="w-full h-full object-cover object-center scale-105 filter brightness-70 contrast-115 transition-transform duration-1000 ease-out"
          />
          {/* Deep Vignette & Amber Glow Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0604] via-[#0C0604]/70 to-[#0C0604]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0C0604]/30 to-[#0C0604]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-vintageGold-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-terracotta-500/15 rounded-full blur-[130px] pointer-events-none" />
        </div>

        {/* Top Header: Brand Emblem & Table Status */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#180C07]/90 border border-vintageGold-400/50 flex items-center justify-center text-vintageGold-400 shadow-vintage backdrop-blur-md">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '18s' }} />
            </div>
            <div>
              <span className="font-display font-bold text-2xl tracking-[0.25em] text-ivory-50 uppercase block leading-none">
                THE AVES
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-vintageGold-400/90 font-mono mt-1 block">
                Sanctuary • Memory • AI Layer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E08]/85 border border-vintageGold-500/30 text-[10px] font-mono tracking-widest text-vintageGold-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">VERANDA TABLE 08 READY</span>
          </div>
        </div>

        {/* Centerpiece Layered Visual Collage: Steam, Open Book & Handwritten Note */}
        <div className="relative z-10 my-auto py-8 lg:py-12 max-w-xl space-y-8">
          
          {/* Poetic Opening Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintageGold-500/15 border border-vintageGold-500/30 text-[10px] font-mono uppercase tracking-widest text-vintageGold-300">
              <Flame className="w-3 h-3 text-vintageGold-400" />
              <span>SENSORY SANCTUARY • VOL. 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.0] tracking-tight text-ivory-50">
              Your café.<br />
              <span className="font-editorial italic font-normal text-vintageGold-300 drop-shadow-sm">
                Your moment.
              </span>
            </h1>
          </div>

          {/* Layered Physical Café Objects: Handwritten Note + Coffee Steam + Book Snippet */}
          <div className="relative pt-2">
            
            {/* The Handwritten Note Card (Rotated slightly for authentic tactile feel) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#1C0F0A]/90 backdrop-blur-md border border-vintageGold-500/40 shadow-vintage-lg max-w-md transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative group">
              
              {/* Wax Seal Stamp on Top Corner */}
              <div className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full wax-seal flex items-center justify-center text-vintageGold-200 shadow-md border border-white/20">
                <span className="font-serif font-bold text-xs">A</span>
              </div>

              {/* Barista Handwriting in Caveat font */}
              <div className="space-y-2 font-handwriting text-xl sm:text-2xl text-cream-100 leading-snug">
                <p>
                  “Leave the noisy rush at the door. Here, we remember how you drink your espresso, the quiet corners you seek, and the thoughts that unfold between sips.”
                </p>
              </div>

              <div className="pt-3 border-t border-vintageGold-500/20 flex items-center justify-between text-xs text-vintageGold-400/80 font-serif">
                <span>Ledger Note #142 • Dusk</span>
                <span className="font-mono text-[10px] tracking-widest text-vintageGold-400">TABLE 08 VERANDA</span>
              </div>
            </div>

            {/* Overlapping Steaming Coffee Visual Accent */}
            <div className="hidden sm:flex absolute -right-6 -bottom-6 p-3.5 rounded-2xl bg-[#120804]/95 border border-vintageGold-500/40 shadow-vintage items-center gap-3.5 backdrop-blur-md">
              <div className="relative w-12 h-12 rounded-xl bg-espresso-950 overflow-hidden border border-vintageGold-500/30 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
                  alt="Artisan espresso cup"
                  className="w-full h-full object-cover"
                />
                {/* CSS Steam Wisps rising */}
                <div className="absolute -top-3 left-3 w-1.5 h-6 bg-cream-100/40 blur-[1.5px] rounded-full animate-steam-wisp-1 pointer-events-none" />
                <div className="absolute -top-4 left-6 w-2 h-7 bg-cream-100/30 blur-[2px] rounded-full animate-steam-wisp-2 pointer-events-none" />
                <div className="absolute -top-3 left-8 w-1.5 h-5 bg-cream-100/40 blur-[1.5px] rounded-full animate-steam-wisp-3 pointer-events-none" />
              </div>

              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-400">
                  CURRENTLY BREWING
                </div>
                <div className="font-serif font-bold text-xs text-ivory-100">
                  Single-Origin Arabica & Ceylon Spice
                </div>
                <div className="text-[10px] text-ivory-300/70 font-sans">
                  Steaming at 88°C • Slow drip extraction
                </div>
              </div>
            </div>

          </div>

          {/* Sensory Footnote */}
          <div className="pt-4 flex items-center gap-6 text-xs text-ivory-300/70 font-mono">
            <span>NO FORCED APPS</span>
            <span>•</span>
            <span>INSTANT TABLE ACCESS</span>
            <span>•</span>
            <span>AVES MEMORY COMPATIBLE</span>
          </div>

        </div>

        {/* Bottom Vintage Colophon */}
        <div className="relative z-10 pt-4 border-t border-vintageGold-500/15 flex items-center justify-between text-[11px] text-ivory-300/60 font-serif">
          <span>THE AVES — Where technology remains quietly in the background.</span>
          <span className="font-mono text-[10px] tracking-widest text-vintageGold-400/80">EDITION MMXXVI</span>
        </div>

      </div>

      {/* =========================================================================
          RIGHT SCREEN (42%): INTERACTIVE PATRON GATE & MEMORY ONBOARDING
          Layered, warm paper texture, Google/Email/Account/Guest choices
         ========================================================================= */}
      <div className="w-full lg:w-[42%] min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-14 bg-[#140B07] relative z-10">
        
        {/* Top Fast Pass: Guest Direct Access */}
        <div className="flex justify-end items-center">
          <button
            onClick={onContinueAsGuest}
            className="px-4 py-2 rounded-full bg-vintageGold-500/10 hover:bg-vintageGold-500/20 border border-vintageGold-500/30 text-xs font-serif text-vintageGold-300 hover:text-ivory-50 tracking-wider flex items-center gap-2 transition-all group active:scale-95"
          >
            <span>Continue as Guest Diner</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-vintageGold-400" />
          </button>
        </div>

        {/* Main Authentication Interface Container */}
        <div className="my-auto py-8 max-w-md w-full mx-auto space-y-7">
          
          {/* Header Title with Tab Switcher */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.3em] text-vintageGold-400">
              <KeyRound className="w-3.5 h-3.5" />
              <span>THE PATRON LEDGER</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ivory-50">
              {authMode === 'register' || activeTab === 'register' ? 'Begin Your Story' : 'Welcome to The Sanctuary'}
            </h2>
            
            <p className="font-serif italic text-sm text-ivory-300/85">
              “Enter to awaken your AVES Memory, saved roasts, and personalized moments.”
            </p>
          </div>

          {/* Mode Switcher Pills */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#0D0604] border border-vintageGold-500/25">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                if (authMode === 'register') setAuthMode('email');
              }}
              className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                activeTab === 'signin'
                  ? 'bg-vintageGold-500 text-espresso-950 shadow-vintage'
                  : 'text-ivory-300 hover:text-ivory-50'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setAuthMode('register');
              }}
              className={`py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-vintageGold-500 text-espresso-950 shadow-vintage'
                  : 'text-ivory-300 hover:text-ivory-50'
              }`}
            >
              Create Account
            </button>
          </div>

          {authMode === 'options' ? (
            <div className="space-y-3.5">
              
              {/* 1. Continue with Google */}
              <button
                onClick={handleGoogleAuth}
                className="w-full py-4 px-6 rounded-2xl bg-[#1C0F0A] hover:bg-[#26150E] text-ivory-100 font-sans font-medium text-sm border border-vintageGold-500/40 hover:border-vintageGold-400 shadow-vintage transition-all flex items-center justify-center gap-3.5 group active:scale-[0.98]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.4 1.9 7.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z" />
                </svg>
                <span className="tracking-wide">Continue with Google</span>
              </button>

              {/* 2. Continue with Email */}
              <button
                onClick={() => setAuthMode('email')}
                className="w-full py-4 px-6 rounded-2xl bg-[#110805] hover:bg-[#1A0C08] text-ivory-100 font-sans font-medium text-sm border border-vintageGold-500/25 hover:border-vintageGold-500/50 transition-all flex items-center justify-center gap-3.5 active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-vintageGold-400" />
                <span className="tracking-wide">Continue with Email</span>
              </button>

              {/* 3. Continue as Guest (Prominent & Welcoming) */}
              <div className="pt-1">
                <button
                  onClick={onContinueAsGuest}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-vintageGold-500/15 via-vintageGold-500/25 to-vintageGold-500/15 hover:from-vintageGold-500/25 hover:to-vintageGold-500/35 text-vintageGold-200 hover:text-ivory-50 font-serif font-semibold text-sm border border-vintageGold-500/50 shadow-vintage transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] group"
                >
                  <Coffee className="w-4 h-4 text-vintageGold-400 group-hover:scale-110 transition-transform" />
                  <span>Continue as Guest</span>
                  <span className="text-[11px] font-sans text-vintageGold-300/80 font-normal">
                    (No login required)
                  </span>
                </button>
              </div>

            </div>
          ) : (
            /* Email / Create Account Form */
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {(authMode === 'register' || activeTab === 'register') && (
                <div className="space-y-1.5">
                  <label className="text-xs font-serif text-ivory-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-vintageGold-400" />
                    <span>Your Full Name / Pen Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Julian Hayes"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0D0604] border border-vintageGold-500/40 text-ivory-50 placeholder:text-ivory-300/40 focus:outline-none focus:border-vintageGold-400 font-serif text-sm transition-colors"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-serif text-ivory-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-vintageGold-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0D0604] border border-vintageGold-500/40 text-ivory-50 placeholder:text-ivory-300/40 focus:outline-none focus:border-vintageGold-400 font-serif text-sm transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAuthMode('options')}
                  className="w-1/3 py-3.5 px-4 rounded-xl bg-[#180C07] text-ivory-300 hover:text-ivory-50 text-xs font-serif transition-colors border border-vintageGold-500/20"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 px-4 rounded-xl bg-vintageGold-500 hover:bg-vintageGold-400 text-espresso-950 font-serif font-bold text-sm shadow-vintage transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>{activeTab === 'register' ? 'Create Patron Profile' : 'Enter The AVES'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* =========================================================================
              AVES MEMORY & FUTURE PERSONALIZATION UNLOCKED TEASER
              Shows: AVES Memory, preferences, favourites, discoveries, order history
             ========================================================================= */}
          <div className="pt-6 border-t border-vintageGold-500/15 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-vintageGold-400 font-bold block">
                WHAT AN AVES ACCOUNT REMEMBERS:
              </span>
              <Sparkles className="w-3 h-3 text-vintageGold-400" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              
              <div className="p-3 rounded-xl bg-[#110805] border border-vintageGold-500/20 space-y-1 hover:border-vintageGold-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-serif text-ivory-100">
                  <Bookmark className="w-3.5 h-3.5 text-vintageGold-400 shrink-0" />
                  <span className="font-semibold">AVES Memory</span>
                </div>
                <p className="text-[10px] text-ivory-300/70 font-sans leading-tight">
                  Saves your favorite moments, written letters, and soundscapes
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#110805] border border-vintageGold-500/20 space-y-1 hover:border-vintageGold-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-serif text-ivory-100">
                  <Coffee className="w-3.5 h-3.5 text-vintageGold-400 shrink-0" />
                  <span className="font-semibold">Sensory Preferences</span>
                </div>
                <p className="text-[10px] text-ivory-300/70 font-sans leading-tight">
                  Calibrates acidity, roast depth, and milk texture to your palate
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#110805] border border-vintageGold-500/20 space-y-1 hover:border-vintageGold-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-serif text-ivory-100">
                  <Heart className="w-3.5 h-3.5 text-vintageGold-400 shrink-0" />
                  <span className="font-semibold">Private Discoveries</span>
                </div>
                <p className="text-[10px] text-ivory-300/70 font-sans leading-tight">
                  Bookmarks hidden pastry pairings and secret seasonal roasts
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#110805] border border-vintageGold-500/20 space-y-1 hover:border-vintageGold-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-serif text-ivory-100">
                  <Clock className="w-3.5 h-3.5 text-vintageGold-400 shrink-0" />
                  <span className="font-semibold">Order Recalls</span>
                </div>
                <p className="text-[10px] text-ivory-300/70 font-sans leading-tight">
                  Quick re-order of "Your Usual" with a single tabletop tap
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Guarantee */}
        <div className="pt-4 border-t border-vintageGold-500/10 flex items-center justify-between text-[11px] text-ivory-300/50 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-vintageGold-400/70" />
            <span>Encrypted • No Forced Downloads</span>
          </div>
          <span>THE AVES NETWORK</span>
        </div>

      </div>

    </div>
  );
};
