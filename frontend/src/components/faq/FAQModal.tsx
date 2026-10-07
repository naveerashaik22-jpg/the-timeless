import React, { useState, useEffect } from 'react';
import { X, Search, HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FAQItem } from '../../types';
import { fetchFaqs } from '../../services/api';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskChatbot?: (question: string) => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose, onAskChatbot }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-01');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadFaqs();
    }
  }, [isOpen, search]);

  const loadFaqs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFaqs(search.trim() || undefined);
      setFaqs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-espresso-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-2xl border-2 border-vintageGold-500/40 shadow-2xl max-w-2xl w-full overflow-hidden vintage-paper-bg max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-vintageGold-500/30 bg-cream-100/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-espresso-900 text-vintageGold-400 flex items-center justify-center border border-vintageGold-500">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-espresso-950 uppercase tracking-wide">
                Café Knowledge Base & FAQs
              </h3>
              <p className="text-xs text-espresso-600 font-serif italic">
                Opening hours, seating policies, Wi-Fi, and culinary guidelines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-espresso-600 hover:text-espresso-950 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 pb-2 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-espresso-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search timings, Wi-Fi, reservations, quiet area, vegetarian..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-cream-100/80 border border-vintageGold-500/30 text-xs sm:text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-vintageGold-600"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-vintageGold-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-espresso-600 font-serif italic">Loading answers...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12 text-xs text-espresso-600">
              No answers matched your search. You can ask our AI companion directly!
            </div>
          ) : (
            faqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-vintageGold-500/30 bg-cream-100/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-cream-200/50 transition-colors"
                  >
                    <span className="font-serif font-bold text-sm text-espresso-950">
                      {faq.question}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-vintageGold-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-espresso-500 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-vintageGold-500/20 text-xs sm:text-sm text-espresso-800 font-sans leading-relaxed bg-cream-50/50">
                      <p className="pt-3">{faq.answer}</p>

                      {onAskChatbot && (
                        <div className="mt-3 pt-2 border-t border-vintageGold-500/10 flex justify-end">
                          <button
                            onClick={() => {
                              onClose();
                              onAskChatbot(faq.question);
                            }}
                            className="text-[11px] font-semibold text-vintageGold-800 hover:text-vintageGold-900 flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-vintageGold-600" /> Ask Companion in Chat
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-vintageGold-500/30 bg-cream-100/90 text-center shrink-0">
          <p className="text-xs text-espresso-700 font-serif">
            Have a custom inquiry? Feel free to ask our AI companion or speak to our host upon arrival.
          </p>
        </div>

      </div>
    </div>
  );
};
