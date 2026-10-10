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
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthWelcomeViewProps {
  onEnterApp?: () => void;
  onContinueAsGuest?: (guestName?: string) => Promise<void>;
  onAuthenticated?: (profile: any) => void;
}

export const AuthWelcomeView: React.FC<AuthWelcomeViewProps> = ({
  onEnterApp,
  onContinueAsGuest: propContinueAsGuest,
  onAuthenticated: propAuthenticated
}) => {
  const { login, signup, continueAsGuest, isLoadingAuth, authError } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const email = emailInput.trim();
    const password = passwordInput.trim();

    if (!email) {
      setLocalError('Please enter your email address.');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password.');
      return;
    }

    try {
      if (activeTab === 'register') {
        const name = nameInput.trim();
        if (!name) {
          setLocalError('Please enter your full name or pen name.');
          return;
        }
        if (password.length < 6) {
          setLocalError('Password must contain at least 6 characters.');
          return;
        }
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      if (onEnterApp) onEnterApp();
    } catch (err: any) {
      setLocalError(err.message || 'Authentication could not be completed.');
    }
  };

  const handleQuickDemoSignIn = async (patronEmail: string, patronPassword = 'vintage1926') => {
    setLocalError(null);
    try {
      await login(patronEmail, patronPassword);
      if (onEnterApp) onEnterApp();
    } catch (err: any) {
      setLocalError(err.message || 'Demo sign in failed.');
    }
  };

  const handleGuestAccess = async () => {
    setLocalError(null);
    try {
      await continueAsGuest('Guest Patron');
      if (onEnterApp) onEnterApp();
    } catch (err: any) {
      setLocalError(err.message || 'Guest session initialization failed.');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen bg-[#0C0604] text-ivory-50 flex flex-col lg:flex-row relative overflow-hidden film-grain selection:bg-vintageGold-500 selection:text-espresso-950 font-sans">
      
      {/* Warm ambient light motes */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-vintageGold-300 blur-[1px] animate-ember-1 pointer-events-none z-20" />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-vintageGold-400 blur-[1px] animate-ember-2 pointer-events-none z-20" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-terracotta-400 blur-[1px] animate-ember-3 pointer-events-none z-20" />

      {/* =========================================================================
          LEFT SCREEN (58%): CINEMATIC CAFÉ COMPOSITION (Image-Rich Vintage Editorial)
         ========================================================================= */}
      <div className="relative w-full lg:w-[58%] min-h-[500px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden border-b lg:border-b-0 lg:border-r border-vintageGold-500/20">
        
        {/* Editorial Café Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=88"
            alt="Warm atmospheric café interior with amber candlelight and books"
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
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '22s' }} />
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
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">VERANDA TABLE 08 READY</span>
          </div>
        </div>

        {/* Centerpiece Layered Visual Composition */}
        <div className="relative z-10 my-auto py-8 lg:py-12 max-w-xl space-y-7">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintageGold-500/15 border border-vintageGold-500/30 text-[10px] font-mono uppercase tracking-widest text-vintageGold-300">
              <Flame className="w-3 h-3 text-vintageGold-400" />
              <span>THE AVES PLATFORM • VOL. 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.0] tracking-tight text-ivory-50">
              Your café.<br />
              <span className="font-editorial italic font-normal text-vintageGold-300 drop-shadow-sm">
                Your moment.
              </span>
            </h1>
          </div>

          {/* Barista Ledger Note Card */}
          <div className="relative pt-2">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#1C0F0A]/90 backdrop-blur-md border border-vintageGold-500/40 shadow-vintage-lg max-w-md transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative group">
              <div className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full wax-seal flex items-center justify-center text-vintageGold-200 shadow-md border border-white/20">
                <span className="font-serif font-bold text-xs">A</span>
              </div>

              <div className="space-y-2 font-handwriting text-xl sm:text-2xl text-cream-100 leading-snug">
                <p>
                  “Every visit deserves its own moment.”
                </p>
                <p className="text-base sm:text-lg text-cream-200/90 font-serif italic font-light pt-1">
                  We remember how you take your espresso, the quiet corners you seek, and the thoughts that unfold between sips.
                </p>
              </div>

              <div className="pt-3 border-t border-vintageGold-500/20 flex items-center justify-between text-xs text-vintageGold-400/80 font-serif">
                <span>Sanctuary Philosophy</span>
                <span className="font-mono text-[10px] tracking-widest text-vintageGold-400">AI SUGGESTS • YOU DECIDE</span>
              </div>
            </div>

            {/* Steaming Coffee Badge */}
            <div className="hidden sm:flex absolute -right-4 -bottom-5 p-3 rounded-2xl bg-[#120804]/95 border border-vintageGold-500/40 shadow-vintage items-center gap-3 backdrop-blur-md">
              <div className="relative w-12 h-12 rounded-xl bg-espresso-950 overflow-hidden border border-vintageGold-500/30 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
                  alt="Artisan espresso cup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-400">
                  CURRENT HARVEST
                </div>
                <div className="font-serif font-bold text-xs text-ivory-100">
                  Single-Origin Arabica & Wild Vanilla
                </div>
                <div className="text-[10px] text-ivory-300/70 font-sans">
                  Slow-drip extraction at Tabletop Bar
                </div>
              </div>
            </div>
          </div>

          {/* Sensory Footnote */}
          <div className="pt-4 flex items-center gap-5 text-xs text-ivory-300/70 font-mono">
            <span>SECURE IDENTITY</span>
            <span>•</span>
            <span>PERSISTENT MEMORY</span>
            <span>•</span>
            <span>PRIVATE & DELETABLE</span>
          </div>

        </div>

        {/* Bottom Vintage Colophon */}
        <div className="relative z-10 pt-4 border-t border-vintageGold-500/15 flex items-center justify-between text-[11px] text-ivory-300/60 font-serif">
          <span>THE AVES — A sanctuary where technology stays quietly in the background.</span>
          <span className="font-mono text-[10px] tracking-widest text-vintageGold-400/80">EDITION MMXXVI</span>
        </div>

      </div>

      {/* =========================================================================
          RIGHT SCREEN (42%): PATRON AUTHENTICATION LEDGER (Sign In / Register / Guest)
         ========================================================================= */}
      <div className="w-full lg:w-[42%] min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-14 bg-[#140B07] relative z-10 overflow-y-auto">
        
        {/* Top Guest Preview Direct Access */}
        <div className="flex justify-end items-center">
          <button
            onClick={handleGuestAccess}
            disabled={isLoadingAuth}
            className="px-4 py-2 rounded-full bg-vintageGold-500/10 hover:bg-vintageGold-500/20 border border-vintageGold-500/30 text-xs font-serif text-vintageGold-300 hover:text-ivory-50 tracking-wider flex items-center gap-2 transition-all group active:scale-95 disabled:opacity-50"
          >
            <span>Explore as Guest Preview</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-vintageGold-400" />
          </button>
        </div>

        {/* Authentication Form Centerpiece */}
        <div className="my-auto py-6 max-w-md w-full mx-auto space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.3em] text-vintageGold-400">
              <KeyRound className="w-3.5 h-3.5" />
              <span>THE PATRON LEDGER</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ivory-50">
              {activeTab === 'register' ? 'Begin Your Story' : 'Welcome to The Sanctuary'}
            </h2>
            
            <p className="font-serif italic text-sm text-ivory-300/85">
              “Every visit deserves its own moment.”
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#0D0604] border border-vintageGold-500/25">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setLocalError(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-serif font-semibold transition-all ${
                activeTab === 'signin'
                  ? 'bg-vintageGold-500 text-espresso-950 shadow-vintage font-bold'
                  : 'text-ivory-300 hover:text-ivory-50'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setLocalError(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-serif font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-vintageGold-500 text-espresso-950 shadow-vintage font-bold'
                  : 'text-ivory-300 hover:text-ivory-50'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message Banner */}
          {displayError && (
            <div className="p-3.5 rounded-xl bg-burgundy-900/40 border border-burgundy-500/50 text-ivory-100 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-burgundy-400 shrink-0" />
              <span>{displayError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-serif text-ivory-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-vintageGold-400" />
                  <span>Patron Full Name / Pen Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Julian Hayes"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0604] border border-vintageGold-500/40 text-ivory-50 placeholder:text-ivory-300/40 focus:outline-none focus:border-vintageGold-400 font-serif text-sm transition-colors"
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
                placeholder="patron@aves.cafe"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0604] border border-vintageGold-500/40 text-ivory-50 placeholder:text-ivory-300/40 focus:outline-none focus:border-vintageGold-400 font-serif text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-serif text-ivory-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-vintageGold-400" />
                  <span>Password</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-vintageGold-400 hover:text-vintageGold-300 flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Show</span>
                    </>
                  )}
                </button>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0604] border border-vintageGold-500/40 text-ivory-50 placeholder:text-ivory-300/40 focus:outline-none focus:border-vintageGold-400 font-serif text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="w-full py-3.5 px-6 rounded-xl bg-vintageGold-500 hover:bg-vintageGold-400 text-espresso-950 font-serif font-bold text-sm shadow-vintage transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-2"
            >
              {isLoadingAuth ? (
                <>
                  <span className="w-4 h-4 border-2 border-espresso-950 border-t-transparent rounded-full animate-spin" />
                  <span>Opening Sanctuary Ledger...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'register' ? 'Create Patron Profile' : 'Enter The AVES'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick One-Click Verified Patron Access (For Testing & Immediate Verification) */}
          <div className="pt-3 border-t border-vintageGold-500/20 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-400/90 block text-center">
              Quick Verified Patron Access (Pre-Configured)
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoSignIn('naveera@aves.cafe', 'vintage1926')}
                disabled={isLoadingAuth}
                className="p-2.5 rounded-xl bg-[#110805] hover:bg-[#1C0F0A] border border-vintageGold-500/30 text-left flex items-center gap-2.5 transition-colors group disabled:opacity-50"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Naveera"
                  className="w-8 h-8 rounded-full object-cover border border-vintageGold-500/60 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="font-serif font-bold text-xs text-ivory-100 group-hover:text-vintageGold-300 leading-tight">
                    Naveera
                  </div>
                  <div className="text-[9px] font-mono text-vintageGold-400/80 truncate">
                    Verified Patron
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoSignIn('julian@aves.cafe', 'vintage1926')}
                disabled={isLoadingAuth}
                className="p-2.5 rounded-xl bg-[#110805] hover:bg-[#1C0F0A] border border-vintageGold-500/30 text-left flex items-center gap-2.5 transition-colors group disabled:opacity-50"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Julian"
                  className="w-8 h-8 rounded-full object-cover border border-vintageGold-500/60 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="font-serif font-bold text-xs text-ivory-100 group-hover:text-vintageGold-300 leading-tight">
                    Julian Hayes
                  </div>
                  <div className="text-[9px] font-mono text-vintageGold-400/80 truncate">
                    Library Regular
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Privacy & Guest Notice */}
          <div className="p-3.5 rounded-xl bg-[#0D0604] border border-vintageGold-500/20 text-center space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-vintageGold-400 font-bold">
              Guest Preview Available
            </div>
            <p className="text-[11px] text-ivory-300/70 font-sans leading-relaxed">
              Guests can freely explore the menu and try moment creation. Create an account anytime to save your tastes and memories.
            </p>
          </div>

        </div>

        {/* Footer Guarantee */}
        <div className="pt-4 border-t border-vintageGold-500/10 flex items-center justify-between text-[11px] text-ivory-300/50 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-vintageGold-400/70" />
            <span>Encrypted • Server Verified</span>
          </div>
          <span>THE AVES NETWORK</span>
        </div>

      </div>

    </div>
  );
};
