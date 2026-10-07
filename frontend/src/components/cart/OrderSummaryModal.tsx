import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { placeOrder } from '../../services/api';
import confetti from 'canvas-confetti';

export const OrderSummaryModal: React.FC = () => {
  const {
    items,
    subtotal,
    tax,
    total,
    isOrderModalOpen,
    closeOrderModal,
    clearCart,
    setActiveOrder,
    openSuccessModal,
  } = useCart();

  const [customerName, setCustomerName] = useState('Guest Traveler');
  const [selectedZone, setSelectedZone] = useState('The Timeless Main Clockwork Lounge');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOrderModalOpen) return null;

  const zoneOptions = [
    'The Timeless Main Clockwork Lounge',
    'Ink & Ember (Reading Sanctuary - Table 4)',
    'The Tranquil Nook (Botanical Retreat - Bay 2)',
    'Retro (70s Vinyl Lounge - Booth 3)',
    'Tiny Tales (Connection Corner)',
    'Echo Booth (Solo Focus Pod #2)',
  ];

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const order = await placeOrder({
        items,
        customer_name: customerName.trim() || 'Guest Traveler',
        table_or_zone: selectedZone,
        special_instructions: instructions.trim() || undefined,
      });

      // Confetti burst for celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A059', '#6B1D2F', '#FAF6EE', '#D4AF37'],
        });
      } catch (e) {
        // ignore confetti failure if not supported
      }

      setActiveOrder(order);
      clearCart();
      closeOrderModal();
      openSuccessModal();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-espresso-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-2xl border-2 border-vintageGold-500/40 shadow-2xl max-w-lg w-full overflow-hidden vintage-paper-bg animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-vintageGold-500/30 bg-cream-100/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-espresso-900 text-vintageGold-400 flex items-center justify-center border border-vintageGold-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-espresso-950 uppercase tracking-wide">
                Review & Confirm Order
              </h3>
              <p className="text-xs text-espresso-600 font-serif italic">
                The Timeless Experiential Café
              </p>
            </div>
          </div>

          <button
            onClick={closeOrderModal}
            className="p-1.5 rounded-lg text-espresso-600 hover:text-espresso-950 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Form */}
        <form onSubmit={handleConfirmOrder} className="p-6 space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-burgundy-500/10 border border-burgundy-500/30 text-burgundy-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-burgundy-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Guest Name */}
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-espresso-900 mb-1.5">
              Guest Name:
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your Name or Table Handle"
              className="w-full px-4 py-2.5 rounded-xl bg-cream-100/80 border border-vintageGold-500/40 text-sm text-espresso-950 focus:outline-none focus:border-vintageGold-600"
              required
            />
          </div>

          {/* Seating Sanctuary */}
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-espresso-900 mb-1.5">
              Seating Sanctuary / Zone:
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-cream-100/80 border border-vintageGold-500/40 text-sm text-espresso-950 focus:outline-none focus:border-vintageGold-600"
            >
              {zoneOptions.map((zone, idx) => (
                <option key={idx} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Special Barista Instructions */}
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-espresso-900 mb-1.5">
              Barista & Kitchen Notes (Optional):
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra hot, oat milk substitute, less sweet..."
              className="w-full px-4 py-2.5 rounded-xl bg-cream-100/80 border border-vintageGold-500/40 text-sm text-espresso-950 focus:outline-none focus:border-vintageGold-600"
            />
          </div>

          {/* Itemized summary snippet */}
          <div className="p-4 rounded-xl bg-cream-100/70 border border-vintageGold-500/20 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-espresso-600 block">
              Tray Summary:
            </span>
            <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs text-espresso-800">
              {items.map((i) => (
                <div key={i.item_id} className="flex justify-between">
                  <span>{i.name} (x{i.quantity})</span>
                  <span className="font-serif font-semibold">₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-vintageGold-500/20 flex justify-between text-sm font-bold text-espresso-950">
              <span>Grand Total (incl. GST)</span>
              <span className="text-base font-serif text-vintageGold-800">₹{total}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeOrderModal}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-cream-200 text-espresso-800 font-serif font-semibold text-xs tracking-wider uppercase hover:bg-cream-300 transition-colors"
            >
              Back to Tray
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 py-3 px-6 rounded-xl bg-espresso-900 text-vintageGold-300 font-serif font-bold text-xs uppercase tracking-widest shadow-vintage hover:bg-espresso-800 hover:shadow-gold-glow active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 border border-vintageGold-500"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-vintageGold-300 border-t-transparent rounded-full animate-spin" />
                  <span>Brewing Order...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-vintageGold-400" />
                  <span>Send to Baristas (₹{total})</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
