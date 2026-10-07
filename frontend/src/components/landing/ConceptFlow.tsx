import React from 'react';
import { Heart, Utensils, Compass, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export const ConceptFlow: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'MOOD',
      tagline: 'Tell Us How You Feel',
      desc: 'Speak naturally without rigid commands. Whether you are exhausted after college, joyful and celebratory, or looking for a quiet moment to read.',
      icon: Heart,
      accent: 'border-burgundy-500/40 bg-burgundy-500/5 text-burgundy-600',
    },
    {
      step: '02',
      title: 'TASTE',
      tagline: 'Multi-Factor Understanding',
      desc: 'Our engine detects dietary preferences, sweetness, temperature, and spice levels, scoring 26+ authentic vintage recipes with explainable clarity.',
      icon: Utensils,
      accent: 'border-vintageGold-500/40 bg-vintageGold-500/5 text-vintageGold-600',
    },
    {
      step: '03',
      title: 'EXPERIENCE',
      tagline: 'Curated Moments & Sanctuaries',
      desc: 'Receive pairing rationale and a tailored seating sanctuary in THE AVES (like Ink & Ember or The Tranquil Nook) for your ideal moment.',
      icon: Compass,
      accent: 'border-espresso-500/40 bg-espresso-500/5 text-espresso-700',
    },
  ];

  return (
    <section className="py-20 bg-cream-100/70 border-y border-vintageGold-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-vintageGold-600">
            The Philosophy of The Aves
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso-950 mt-2 mb-4">
            MOOD <span className="text-vintageGold-600 font-serif">→</span> TASTE <span className="text-vintageGold-600 font-serif">→</span> EXPERIENCE
          </h2>
          <p className="font-serif italic text-lg text-espresso-700">
            “An AI-powered café assistant that turns your mood into a personalized café experience.”
          </p>
        </div>

        {/* 3 Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-cream-50 rounded-2xl p-8 border border-vintageGold-500/30 shadow-vintage hover:shadow-vintage-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-bold text-2xl text-vintageGold-500/70">
                      {item.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.accent} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-espresso-950 tracking-wide uppercase mb-1">
                    {item.title}
                  </h3>
                  <h4 className="font-serif italic text-sm text-vintageGold-600 mb-3">
                    {item.tagline}
                  </h4>
                  <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-vintageGold-500/20 flex items-center justify-between text-xs font-semibold text-espresso-900 uppercase tracking-wider">
                  <span>Seamless Journey</span>
                  {index < 2 && <ArrowRight className="w-4 h-4 text-vintageGold-500 hidden md:block" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Human-Centered AI Notice */}
        <div className="mt-16 bg-cream-50/90 rounded-2xl p-6 border border-vintageGold-500/30 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-espresso-900 text-vintageGold-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-espresso-950">
              Technology in the Background, Hospitality at the Heart
            </h4>
            <p className="text-xs text-espresso-700/90 leading-relaxed mt-0.5">
              We never psychoanalyze or diagnose. Our companion uses mood signals strictly to craft uplifting culinary harmony, ensuring safety, warmth, and genuine human care.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
