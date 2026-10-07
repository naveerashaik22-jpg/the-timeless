import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Heart,
  TrendingUp,
  Clock,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Coffee,
  Layers,
  ChevronRight,
  Smile,
  Zap,
  BookOpen
} from 'lucide-react';
import { AVESView } from '../layout/Header';

interface LandingViewProps {
  onNavigateToMoment: (initialPrompt?: string) => void;
  onExploreMenu: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigateToMoment,
  onExploreMenu,
}) => {
  // Live Demo Simulation state inside the hero kiosk frame
  const [activeDemoState, setActiveDemoState] = useState<'tired' | 'celebrate' | 'quiet'>('tired');

  const demoScenarios = {
    tired: {
      tag: 'Restorative Care',
      guestSaid: "“Exhausted after an endless day. Need something gentle that won't make me crash.”",
      detectedMood: 'Low Energy • Fatigue',
      beverage: 'Cardamom Golden Milk & Double Espresso',
      counterpart: 'Almond Honey Financier',
      rationale: 'Gentle restorative spices soothe mental fatigue without sudden sugar collapse.',
      zone: 'The Tranquil Alcove • Armchair 04',
      matchScore: 96,
      accent: 'border-amber-600/40 bg-amber-600/10 text-amber-800'
    },
    celebrate: {
      tag: 'Celebratory Elevation',
      guestSaid: "“Just landed our seed round! We want something sparkling, exquisite, and joyful.”",
      detectedMood: 'Celebratory • High Energy',
      beverage: 'Sparkling Cascara Tonic & Cold Brew Float',
      counterpart: 'Gold-Dusted Dark Callebaut Truffle',
      rationale: 'Effervescent citrus notes and opulent cocoa to heighten a milestone moment.',
      zone: 'The Grand Salon • Table 12',
      matchScore: 98,
      accent: 'border-vintageGold-500/50 bg-vintageGold-500/15 text-vintageGold-700'
    },
    quiet: {
      tag: 'Deep Contemplation',
      guestSaid: "“Sitting alone with a novel for the afternoon. Pure calm, nothing hurried.”",
      detectedMood: 'Calm • Focused Solitude',
      beverage: 'Slow-Drip Ethiopian Yirgacheffe Pour-Over',
      counterpart: 'Wild Thyme & Lemon Madeleines',
      rationale: 'Clean floral clarity that evolves as it cools across two hours of quiet reading.',
      zone: 'Ink & Ember • Reading Nook 02',
      matchScore: 94,
      accent: 'border-emerald-700/40 bg-emerald-700/10 text-emerald-800'
    }
  };

  const currentDemo = demoScenarios[activeDemoState];

  return (
    <div className="relative overflow-hidden vintage-paper-bg pb-24">
      
      {/* Ambient Lighting Vignettes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-vintageGold-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] left-1/4 w-[500px] h-[500px] bg-amber-600/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 md:pt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cream-200/90 border border-vintageGold-500/40 shadow-sm text-espresso-950 text-xs font-semibold uppercase tracking-[0.22em] animate-gold-pulse">
            <Sparkles className="w-3.5 h-3.5 text-vintageGold-600" />
            <span>The AI Customer Experience Layer for Specialty Cafés</span>
          </div>
        </div>

        {/* Master Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-espresso-950 leading-[1.08]">
            Where technology stays quiet, and <span className="italic font-serif font-normal text-vintageGold-600">human feeling</span> takes the stage.
          </h1>
          
          <p className="font-sans text-base sm:text-lg md:text-xl text-espresso-800/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Rather than forcing diners through cold, impersonal menus, <strong className="font-semibold text-espresso-950">THE AVES</strong> interprets how your guests feel — translating human emotion into curated sensory brews, artisanal pairings, and lifelong brand loyalty.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToMoment()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-espresso-950 text-vintageGold-300 font-serif font-semibold text-base shadow-vintage hover:bg-espresso-900 hover:shadow-vintage-lg active:scale-95 transition-all flex items-center justify-center gap-3 group border border-vintageGold-500/60"
            >
              <span>Step Into "Create My Moment"</span>
              <ArrowRight className="w-4 h-4 text-vintageGold-400 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-cream-200/90 text-espresso-950 font-serif font-medium text-base hover:bg-cream-300 border border-vintageGold-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4 text-vintageGold-700" />
              <span>Explore Handcrafted Archive</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            FOCAL POINT: Live Interactive Tabletop Experience Simulator
           ========================================================================= */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
          
          {/* Header over the preview */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-vintageGold-500/25 gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-vintageGold-700">
                Interactive Kiosk & QR Simulation
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-espresso-950">
                Live Moment Synthesis at Table 08
              </h3>
            </div>

            {/* Quick Scenario Toggles */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-cream-200/90 border border-vintageGold-500/30 self-stretch sm:self-auto overflow-x-auto">
              <button
                onClick={() => setActiveDemoState('tired')}
                className={`px-3 py-1.5 rounded-full text-xs font-serif font-semibold transition-all whitespace-nowrap ${
                  activeDemoState === 'tired'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                    : 'text-espresso-800 hover:text-espresso-950'
                }`}
              >
                1. Exhausted Evening
              </button>
              <button
                onClick={() => setActiveDemoState('celebrate')}
                className={`px-3 py-1.5 rounded-full text-xs font-serif font-semibold transition-all whitespace-nowrap ${
                  activeDemoState === 'celebrate'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                    : 'text-espresso-800 hover:text-espresso-950'
                }`}
              >
                2. Celebratory Milestone
              </button>
              <button
                onClick={() => setActiveDemoState('quiet')}
                className={`px-3 py-1.5 rounded-full text-xs font-serif font-semibold transition-all whitespace-nowrap ${
                  activeDemoState === 'quiet'
                    ? 'bg-espresso-950 text-vintageGold-300 shadow-sm'
                    : 'text-espresso-800 hover:text-espresso-950'
                }`}
              >
                3. Quiet Contemplation
              </button>
            </div>
          </div>

          {/* The Kiosk Frame */}
          <div className="mt-6 rounded-3xl bg-cream-50 border-2 border-vintageGold-500/40 shadow-vintage-lg overflow-hidden transition-all duration-500">
            
            {/* Top Bar inside simulation */}
            <div className="bg-espresso-950 text-cream-100 px-6 py-3.5 flex items-center justify-between border-b border-vintageGold-500/30">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-vintageGold-300">
                  THE AVES • Tabletop Concierge Session
                </span>
              </div>
              <div className="text-[11px] font-sans text-cream-300/80">
                Table 08 • The Veranda
              </div>
            </div>

            {/* Simulated Interaction Body */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: What the Guest Expressed */}
              <div className="lg:col-span-5 space-y-5 border-b lg:border-b-0 lg:border-r border-vintageGold-500/20 pb-6 lg:pb-0 lg:pr-8">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-espresso-500">
                    Guest Natural Expression:
                  </span>
                  <div className="mt-2 p-4 rounded-2xl bg-cream-200/60 border border-vintageGold-500/25 font-serif italic text-base sm:text-lg text-espresso-900 leading-relaxed shadow-sm">
                    {currentDemo.guestSaid}
                  </div>
                </div>

                {/* Emotional Telemetry Extraction */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-espresso-700">Cognitive State:</span>
                    <span className="font-bold text-espresso-950 font-serif">{currentDemo.detectedMood}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-espresso-700">Seating Sanctuary:</span>
                    <span className="text-espresso-900">{currentDemo.zone}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-espresso-700">Emotional Resonance:</span>
                    <span className="font-bold text-vintageGold-700">{currentDemo.matchScore}% Match</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigateToMoment(currentDemo.guestSaid)}
                    className="w-full py-3 px-4 rounded-xl bg-espresso-950 text-vintageGold-300 text-xs font-serif font-semibold flex items-center justify-center gap-2 hover:bg-espresso-900 active:scale-95 transition-all shadow-sm"
                  >
                    <span>Launch This Scenario in Moment Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Handcrafted Pairing Result */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-vintageGold-500/20 text-vintageGold-800 border border-vintageGold-500/40">
                    {currentDemo.tag}
                  </span>
                  <span className="text-xs text-espresso-600 font-sans">
                    Multi-Criteria Score: <strong className="text-espresso-950 font-serif">{currentDemo.matchScore} / 100</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Item 1: Brew */}
                  <div className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/30 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-vintageGold-700">
                      Primary Brew
                    </div>
                    <div className="font-display font-bold text-base text-espresso-950 leading-snug">
                      {currentDemo.beverage}
                    </div>
                    <p className="text-xs text-espresso-600 font-sans">
                      Handcrafted specifically for the guest's caffeine and energy curve.
                    </p>
                  </div>

                  {/* Item 2: Counterpart */}
                  <div className="p-4 rounded-2xl bg-cream-100 border border-vintageGold-500/30 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-burgundy-700">
                      Culinary Balance
                    </div>
                    <div className="font-display font-bold text-base text-espresso-950 leading-snug">
                      {currentDemo.counterpart}
                    </div>
                    <p className="text-xs text-espresso-600 font-sans">
                      Complements beverage acidity with delicate texture and sweetness.
                    </p>
                  </div>
                </div>

                {/* Empathetic Rationale */}
                <div className="p-4 rounded-2xl bg-cream-200/50 border-l-4 border-vintageGold-500 text-xs sm:text-sm text-espresso-800 font-serif italic leading-relaxed">
                  “{currentDemo.rationale}”
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          B2B Value Section: Why Specialty Cafés Partner With THE AVES
         ========================================================================= */}
      <section className="mt-28 md:mt-36 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-vintageGold-700">
            For Boutique & Specialty Café Operators
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-espresso-950">
            Transform Your Dining Room into an Emotional Destination.
          </h2>
          <p className="text-espresso-700 font-sans text-sm sm:text-base leading-relaxed">
            Standard ordering QR codes reduce your artisanal craft to a sterile spreadsheet. THE AVES elevates your physical space, turning every table into a personalized conversation.
          </p>
        </div>

        {/* 3 Pillars of Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-cream-50 border border-vintageGold-500/30 shadow-vintage space-y-5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-espresso-950 border border-vintageGold-500/50 flex items-center justify-center text-vintageGold-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-espresso-950">
              +34% Average Ticket Size
            </h3>
            <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-sans">
              Guests don't reject upsells when they are framed as flavor harmonies. By pairing restorative beverages with complementary artisan bites, average guest spend rises organically.
            </p>
            <div className="pt-2 text-xs font-semibold text-vintageGold-700 flex items-center gap-1">
              <span>Sensory cross-merchandising</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-cream-50 border border-vintageGold-500/30 shadow-vintage space-y-5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-espresso-950 border border-vintageGold-500/50 flex items-center justify-center text-vintageGold-400">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-espresso-950">
              Zero-Friction Tabletop Scanning
            </h3>
            <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-sans">
              No app downloads. No account creation hurdles. Guests simply point their camera at their table standee and are instantly welcomed into a high-end web sanctuary.
            </p>
            <div className="pt-2 text-xs font-semibold text-vintageGold-700 flex items-center gap-1">
              <span>Instant mobile-first PWA</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-cream-50 border border-vintageGold-500/30 shadow-vintage space-y-5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-espresso-950 border border-vintageGold-500/50 flex items-center justify-center text-vintageGold-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-espresso-950">
              Actionable Emotional Pulse
            </h3>
            <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-sans">
              Uncover when your guests arrive exhausted (mid-afternoon college/office rush) versus celebratory (weekend evenings), enabling smart kitchen inventory and tailored specials.
            </p>
            <div className="pt-2 text-xs font-semibold text-vintageGold-700 flex items-center gap-1">
              <span>Real-time hospitality telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-espresso-950 text-cream-50 border border-vintageGold-500/40 shadow-vintage-lg flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 max-w-xl z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-vintageGold-400">
              Begin With Your Next Guest
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream-50">
              Ready to witness computational hospitality in action?
            </h3>
            <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-sans">
              Test how THE AVES interprets nuanced human states with our dedicated moment creation canvas.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <button
              onClick={() => onNavigateToMoment()}
              className="px-8 py-4 rounded-full bg-vintageGold-500 text-espresso-950 font-serif font-bold text-base hover:bg-vintageGold-400 active:scale-95 transition-all shadow-md flex items-center gap-3"
            >
              <span>Launch Moment Studio</span>
              <ArrowRight className="w-4 h-4 text-espresso-900" />
            </button>
          </div>

          {/* Decorative gold aura in background */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-vintageGold-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

      </section>

    </div>
  );
};
