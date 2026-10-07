import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Coffee,
  BookOpen,
  Feather,
  Camera,
  Smile,
  Heart,
  Cookie,
  Clock,
  ShieldCheck
} from 'lucide-react';

type AVESView = string;

interface GrandAvesHomeProps {
  onNavigate: (view: AVESView) => void;
  onStartTimelessWithPrompt: (prompt?: string) => void;
}

export const GrandAvesHome: React.FC<GrandAvesHomeProps> = ({
  onNavigate,
  onStartTimelessWithPrompt,
}) => {
  const [feelingPrompt, setFeelingPrompt] = useState('');

  const divisions = [
    {
      number: '01',
      id: 'timeless' as AVESView,
      name: 'THE TIMELESS',
      role: 'The Café',
      verb: 'TASTE',
      tagline: 'Mood-Based AI Dining & Literary Brews',
      desc: 'Tell us how you feel. We match your state of mind to handcrafted vintage recipes like Shakespeare’s Coffee and Renaissance Waffles.',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      accentColor: 'border-vintageGold-500/50 bg-vintageGold-500/10 text-vintageGold-700',
    },
    {
      number: '02',
      id: 'ink_ember' as AVESView,
      name: 'INK & EMBER',
      role: 'The Bookstore',
      verb: 'IMAGINE',
      tagline: 'Vintage Literature & The Forgotten Shelf',
      desc: 'Lined with oak shelves and leather armchairs. Ask our AI reader for literary discoveries or exchange a book on The Forgotten Shelf.',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      accentColor: 'border-amber-600/50 bg-amber-600/10 text-amber-800',
    },
    {
      number: '03',
      id: 'tranquil_nook' as AVESView,
      name: 'THE TRANQUIL NOOK',
      role: 'The Quiet Room',
      verb: 'REFLECT',
      tagline: 'Sunlit Botanical Mindful Retreat',
      desc: 'A botanical sanctuary surrounded by hanging ferns, trickling water, calming ambient soundscapes, and gentle journaling prompts.',
      icon: Feather,
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      accentColor: 'border-emerald-700/50 bg-emerald-700/10 text-emerald-800',
    },
    {
      number: '04',
      id: 'retro' as AVESView,
      name: 'RETRO',
      role: 'The Memory Studio',
      verb: 'REMEMBER',
      tagline: 'Time Traveller’s Closet & Vintage Photo Booth',
      desc: 'Dress in wardrobes from the 1920s to 1990s. Capture memories in 7 vintage photo booth styles like 90s Passport and Film Strips.',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      accentColor: 'border-rose-700/50 bg-rose-700/10 text-rose-800',
    },
    {
      number: '05',
      id: 'tiny_tales' as AVESView,
      name: 'TINY TALES',
      role: 'The Children’s Corner',
      verb: 'CREATE',
      tagline: 'Storymaking, Crafts & The Canvas Hour',
      desc: 'A vibrant realm of LEGO building, imaginative crafts, kid-friendly storytelling, and our signature silent painting event: The Canvas Hour.',
      icon: Smile,
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      accentColor: 'border-blue-700/50 bg-blue-700/10 text-blue-800',
    },
    {
      number: '06',
      id: 'echo_booth' as AVESView,
      name: 'ECHO BOOTH',
      role: 'The Room of Strangers',
      verb: 'CONNECT',
      tagline: 'Anonymous Postcards & Time Capsule Lanterns',
      desc: 'Leave a piece of your story. Receive a piece of someone else’s. Send anonymous postcards and float sealed letters into the night sky.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      accentColor: 'border-burgundy-600/50 bg-burgundy-600/10 text-burgundy-800',
    },
  ];

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feelingPrompt.trim()) {
      onStartTimelessWithPrompt(feelingPrompt.trim());
    } else {
      onNavigate('timeless');
    }
  };

  return (
    <div className="vintage-paper-bg min-h-screen">
      
      {/* 1. Grand Storybook Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-36 text-center border-b border-vintageGold-500/30">
        
        {/* Ambient warm glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-vintageGold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Wax Seal / Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-100 border-2 border-vintageGold-500/60 shadow-sm text-espresso-950 text-[11px] font-serif font-bold uppercase tracking-[0.25em] mb-8 animate-gold-pulse">
            <Compass className="w-3.5 h-3.5 text-vintageGold-700" />
            An Experiential Vintage Sanctuary
          </div>

          {/* Grand Main Heading */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-espresso-950 leading-none mb-6">
            THE AVES
          </h1>

          {/* Official Tagline */}
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-espresso-800 font-normal max-w-3xl mx-auto leading-tight mb-4">
            “Where every moment becomes a story.”
          </p>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-espresso-700/90 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            An immersive world of food, books, memories, creativity and human connection — where modern technology quietly enhances a forgotten vintage world.
          </p>

          {/* Interactive Feeling Entry */}
          <div className="max-w-2xl mx-auto mb-10">
            <form onSubmit={handlePromptSubmit} className="relative shadow-vintage-lg rounded-2xl bg-cream-50 border-2 border-vintageGold-500/50 p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-2 focus-within:border-vintageGold-600 focus-within:ring-4 focus-within:ring-vintageGold-500/20 transition-all">
              <input
                type="text"
                value={feelingPrompt}
                onChange={(e) => setFeelingPrompt(e.target.value)}
                placeholder="How are you feeling today? Tell us in natural words..."
                className="w-full bg-transparent px-4 py-3 text-espresso-950 placeholder-espresso-400 font-serif text-sm sm:text-base focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-espresso-950 text-vintageGold-300 font-serif font-bold text-xs uppercase tracking-wider shadow-vintage hover:bg-espresso-900 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 border border-vintageGold-500"
              >
                <span>Enter The Timeless</span>
                <ArrowRight className="w-4 h-4 text-vintageGold-400" />
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-espresso-600 font-semibold">
                Quick Feeling Prompts:
              </span>
              {[
                "I'm exhausted after college.",
                "I want something sweet but light.",
                "I want to sit quietly and read.",
                "I feel nostalgic."
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => onStartTimelessWithPrompt(p)}
                  className="text-xs bg-cream-100/90 hover:bg-cream-200 text-espresso-800 px-3 py-1 rounded-full border border-vintageGold-500/30 transition-all"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('timeless')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-espresso-950 text-vintageGold-300 font-serif font-bold text-sm uppercase tracking-widest shadow-vintage-lg hover:bg-espresso-900 hover:shadow-gold-glow active:scale-95 transition-all flex items-center justify-center gap-3 border border-vintageGold-500"
            >
              <Compass className="w-4 h-4 text-vintageGold-400" />
              ENTER THE AVES
            </button>

            <button
              onClick={() => {
                document.getElementById('chapters-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cream-100 text-espresso-950 font-serif font-bold text-sm uppercase tracking-widest shadow-vintage hover:bg-cream-200 active:scale-95 transition-all flex items-center justify-center gap-2 border border-vintageGold-500/40"
            >
              DISCOVER THE EXPERIENCES
            </button>
          </div>

        </div>
      </section>

      {/* 2. Custom Kitchen Spotlight Banner */}
      <section className="py-12 bg-cream-100/80 border-b border-vintageGold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-50 rounded-3xl p-6 sm:p-10 border-2 border-vintageGold-500/40 shadow-vintage flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-600/10 text-burgundy-800 border border-burgundy-600/30 text-xs font-serif font-bold uppercase tracking-wider">
                <Cookie className="w-3.5 h-3.5 text-burgundy-700" />
                Featured Experience
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-espresso-950">
                THE AVES CUSTOM KITCHEN — Personalized Cookies
              </h3>
              <p className="text-xs sm:text-sm text-espresso-700 font-sans leading-relaxed">
                Design custom artisan cookies inspired by your favorite literary or cultural icons (*Shakespeare, Spider-Man, Jane Austen, Sherlock Holmes, Alice in Wonderland, Botanical Flowers, Space*). Choose flavors, frostings, 24k gold flakes, and custom inscriptions with live visual rendering.
              </p>
            </div>

            <button
              onClick={() => onNavigate('custom_kitchen')}
              className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-espresso-950 text-vintageGold-300 font-serif font-bold text-xs uppercase tracking-widest shadow-vintage hover:bg-espresso-900 active:scale-95 transition-all shrink-0 border border-vintageGold-500 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-vintageGold-400" />
              Build Your Custom Cookie
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Six Chapters / Rooms of The AVES */}
      <section id="chapters-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-vintageGold-700">
            The Six Sanctuaries
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-espresso-950 mt-2">
            Rooms of a Forgotten Vintage World
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-espresso-700 mt-2">
            Each chapter represents an essential dimension of human experience.
          </p>
        </div>

        {/* 6 Chapter Doors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.id}
                onClick={() => onNavigate(ch.id)}
                className="bg-cream-50 rounded-3xl overflow-hidden border-2 border-vintageGold-500/35 shadow-vintage hover:shadow-vintage-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Image & Verb Stamp */}
                <div className="relative h-56 overflow-hidden bg-espresso-950">
                  <img
                    src={ch.image}
                    alt={ch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/30 to-transparent" />
                  
                  {/* Top Bar: Chapter Number & Action Verb */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-espresso-950/90 text-vintageGold-300 border border-vintageGold-500/40">
                      Chapter {ch.number}
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-display font-black tracking-widest uppercase bg-vintageGold-500 text-espresso-950 shadow-sm">
                      {ch.verb}
                    </span>
                  </div>

                  {/* Bottom Image Overlay: Division Title & Role */}
                  <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                    <span className="text-[10px] uppercase tracking-widest text-vintageGold-300 font-semibold block">
                      {ch.role}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-cream-50">
                      {ch.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div>
                    <h4 className="font-serif italic font-bold text-sm text-vintageGold-800 mb-1.5">
                      {ch.tagline}
                    </h4>
                    <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-sans">
                      {ch.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-vintageGold-500/20 flex items-center justify-between">
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-espresso-950 flex items-center gap-1.5 group-hover:text-vintageGold-700 transition-colors">
                      Enter {ch.role}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cream-200 border border-vintageGold-500/40 flex items-center justify-center text-espresso-900 group-hover:bg-espresso-950 group-hover:text-vintageGold-300 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 4. The Philosophy of The AVES */}
      <section className="py-20 bg-espresso-950 text-cream-100 border-t-2 border-vintageGold-500/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-full bg-espresso-900 border border-vintageGold-400 flex items-center justify-center mx-auto text-vintageGold-400">
            <Clock className="w-6 h-6" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wider uppercase text-vintageGold-300">
            The Soul of The Aves
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-cream-200 leading-relaxed max-w-2xl mx-auto">
            "THE AVES isn't just a café. It is a collection of experiences designed to make ordinary moments unforgettable."
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-vintageGold-400 font-serif uppercase tracking-widest">
            <span>TASTE • The Timeless</span>
            <span>IMAGINE • Ink & Ember</span>
            <span>REFLECT • Tranquil Nook</span>
            <span>REMEMBER • Retro</span>
            <span>CREATE • Tiny Tales</span>
            <span>CONNECT • Echo Booth</span>
          </div>
        </div>
      </section>

    </div>
  );
};
