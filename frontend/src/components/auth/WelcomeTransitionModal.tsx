import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, Feather } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const WelcomeTransitionModal: React.FC = () => {
  const { welcomeModalUser, dismissWelcomeModal } = useAuth();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (welcomeModalUser) {
      setIsFadingOut(false);
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const dismissTimer = setTimeout(() => {
          dismissWelcomeModal();
        }, 500);
        return () => clearTimeout(dismissTimer);
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [welcomeModalUser, dismissWelcomeModal]);

  if (!welcomeModalUser) return null;

  return (
    <div
      onClick={dismissWelcomeModal}
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0D0704]/90 backdrop-blur-xl transition-opacity duration-500 cursor-pointer selection:bg-vintageGold-500 selection:text-espresso-950 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Warm Ambient Glow Aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-vintageGold-500/15 blur-[140px] pointer-events-none animate-gold-pulse" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-terracotta-500/10 blur-[120px] pointer-events-none" />

      {/* Floating Ember Particles */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-vintageGold-300 blur-[1px] animate-ember-1 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-vintageGold-400 blur-[1px] animate-ember-2 pointer-events-none" />

      <div className="relative text-center max-w-lg space-y-6 z-10 animate-fade-in">
        
        {/* Breathing Monogram with Rising Steam */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="w-2 h-10 bg-white/40 blur-[2px] rounded-full animate-steam-wisp-1" />
            <div className="w-2.5 h-12 bg-white/30 blur-[2.5px] rounded-full animate-steam-wisp-2 -mt-4 ml-2" />
          </div>

          <div className="w-16 h-16 rounded-full bg-[#180C07] border-2 border-vintageGold-400 text-vintageGold-300 flex items-center justify-center shadow-gold-glow">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '12s' }} />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintageGold-500/15 border border-vintageGold-500/30 text-[10px] font-mono uppercase tracking-[0.3em] text-vintageGold-300">
            <Sparkles className="w-3 h-3 text-vintageGold-400" />
            <span>SANCTUARY WELCOME</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
            Welcome back, <span className="font-editorial italic text-vintageGold-300">{welcomeModalUser}</span>.
          </h2>

          <p className="font-editorial italic text-lg sm:text-xl text-ivory-200/90 font-light">
            “Your next AVES moment is waiting.”
          </p>
        </div>

        {/* Tactile Calibrated Ledger Seal */}
        <div className="pt-2 flex items-center justify-center gap-3 text-xs font-mono text-vintageGold-400/80">
          <span>TABLE 08 VERANDA</span>
          <span>•</span>
          <span>SENSORY MEMORY LOADED</span>
        </div>

      </div>
    </div>
  );
};
