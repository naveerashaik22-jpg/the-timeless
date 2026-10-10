import React, { useState } from 'react';
import {
  X,
  Compass,
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Coffee,
  Feather
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup, continueAsGuest, isLoadingAuth } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }
    try {
      await login(email.trim(), password.trim());
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !name.trim() || !password.trim()) {
      setError('Please provide your name, email, and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      await signup(name.trim(), email.trim(), password.trim());
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
  };

  const handleQuickDemoLogin = async (patronName: string, patronEmail: string) => {
    try {
      await login(patronEmail, 'vintage1926');
    } catch (err: any) {
      setError(err.message || 'Demo login failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-vintageGold-500 selection:text-espresso-950">
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-[#0C0604]/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FCFAF6] rounded-3xl border-2 border-vintageGold-500/40 shadow-2xl overflow-hidden film-grain text-espresso-950 z-10 animate-scale-in">
        
        {/* Top Atmosphere Bar */}
        <div className="relative h-28 bg-[#180C07] text-ivory-50 p-6 flex items-start justify-between overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
              alt="Café ambiance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180C07] via-[#180C07]/70 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-espresso-950 border border-vintageGold-400 text-vintageGold-300 flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-widest text-ivory-50 uppercase block leading-tight">
                THE AVES
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-vintageGold-400 block">
                Patron Identity & Sanctuary Journal
              </span>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="relative z-10 p-2 rounded-full text-ivory-200 hover:text-ivory-50 hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Segmented Switcher */}
          <div className="flex rounded-2xl bg-cream-200/80 p-1 border border-vintageGold-500/25">
            <button
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-serif font-bold rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                  : 'text-espresso-700 hover:text-espresso-950'
              }`}
            >
              Patron Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-serif font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                  : 'text-espresso-700 hover:text-espresso-950'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-burgundy-900/10 border border-burgundy-600/30 text-burgundy-900 text-xs font-serif">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-espresso-700 font-bold block">
                  Patron Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-espresso-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Naveera"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-vintageGold-500/35 text-xs sm:text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-vintageGold-600 font-serif"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-espresso-700 font-bold block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-espresso-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. naveera@aves.cafe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-vintageGold-500/35 text-xs sm:text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-vintageGold-600 font-serif"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase tracking-wider text-espresso-700 font-bold block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-vintageGold-700 hover:text-espresso-950 font-serif"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-espresso-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-vintageGold-500/35 text-xs sm:text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-vintageGold-600 font-serif"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="w-full py-3 px-4 rounded-xl bg-espresso-950 hover:bg-espresso-900 text-vintageGold-300 font-serif font-bold text-xs uppercase tracking-wider border border-vintageGold-500 shadow-vintage flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoadingAuth ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-vintageGold-300 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Ledger...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to AVES' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Patron Profile Access */}
          <div className="pt-2 border-t border-vintageGold-500/25 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-espresso-500 block text-center">
              Quick Verified Patron Access
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Naveera', 'naveera@aves.cafe')}
                className="p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 border border-vintageGold-500/30 text-left flex items-center gap-2.5 transition-colors group"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Naveera"
                  className="w-8 h-8 rounded-full object-cover border border-vintageGold-500/60"
                />
                <div className="overflow-hidden">
                  <div className="font-serif font-bold text-xs text-espresso-950 group-hover:text-vintageGold-800 transition-colors leading-tight">
                    Naveera
                  </div>
                  <div className="text-[10px] font-mono text-espresso-500 truncate">
                    Table 08 Patron
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => continueAsGuest()}
                className="p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 border border-vintageGold-500/30 text-left flex items-center gap-2.5 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-espresso-950 text-vintageGold-300 flex items-center justify-center font-serif text-xs font-bold shrink-0">
                  G
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-espresso-950 group-hover:text-vintageGold-800 transition-colors leading-tight">
                    Guest Diner
                  </div>
                  <div className="text-[10px] font-mono text-espresso-500">
                    Anonymous Session
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-espresso-500 font-serif italic text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Private table session. Memory is fully user-controlled.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
