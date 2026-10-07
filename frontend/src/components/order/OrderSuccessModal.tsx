import React from 'react';
import { CheckCircle2, Clock, MapPin, Printer, Sparkles, X, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const OrderSuccessModal: React.FC = () => {
  const { isSuccessModalOpen, closeSuccessModal, activeOrder } = useCart();

  if (!isSuccessModalOpen || !activeOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-espresso-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF6EE] rounded-3xl border-2 border-vintageGold-500 shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        {/* Top Perforated Ticket Notch & Ribbon */}
        <div className="bg-espresso-950 text-vintageGold-300 p-6 text-center relative border-b-2 border-dashed border-vintageGold-500/50">
          <button
            onClick={closeSuccessModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-espresso-900 text-vintageGold-400 hover:text-cream-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-vintageGold-500/20 border-2 border-vintageGold-400 flex items-center justify-center mx-auto mb-3 text-vintageGold-300">
            <CheckCircle2 className="w-8 h-8 text-vintageGold-400" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vintageGold-400 block mb-1">
            Order Received & Brewing
          </span>
          <h2 className="font-display text-2xl font-bold text-cream-50 uppercase tracking-widest">
            The Timeless Café
          </h2>
          <p className="font-serif italic text-xs text-cream-200/80 mt-1">
            "Your moment has been captured with care."
          </p>
        </div>

        {/* Vintage Ticket Receipt Body */}
        <div className="p-6 space-y-6">
          
          {/* Order ID & Time Badge */}
          <div className="bg-cream-100/90 rounded-2xl p-4 border border-vintageGold-500/40 text-center shadow-inner">
            <span className="text-[10px] uppercase tracking-widest text-espresso-600 font-bold block mb-1">
              Official Token / Order ID
            </span>
            <div className="font-mono font-bold text-xl sm:text-2xl text-burgundy-700 tracking-wider">
              {activeOrder.order_id}
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-espresso-700 font-serif mt-2 pt-2 border-t border-vintageGold-500/20">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-vintageGold-600" />
                Est. Prep: ~{activeOrder.estimated_prep_time_minutes} mins
              </span>
              <span>•</span>
              <span>{activeOrder.created_at}</span>
            </div>
          </div>

          {/* Seating Sanctuary Assignment */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-vintageGold-500/10 border border-vintageGold-500/30">
            <MapPin className="w-5 h-5 text-vintageGold-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-vintageGold-900 block">
                Destination Seating Sanctuary:
              </span>
              <p className="font-serif font-semibold text-sm text-espresso-950">
                {activeOrder.table_or_zone}
              </p>
              <p className="text-[11px] text-espresso-700 mt-0.5">
                Our café host will deliver your tray directly to this spot.
              </p>
            </div>
          </div>

          {/* Itemized Receipt Table */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-espresso-600 block border-b border-vintageGold-500/30 pb-1">
              Handcrafted Items:
            </span>
            <div className="space-y-2 text-xs text-espresso-900 font-serif max-h-36 overflow-y-auto">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cream-200 text-espresso-900 text-[10px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-espresso-950">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="pt-3 border-t-2 border-dashed border-vintageGold-500/40 space-y-1 text-xs">
              <div className="flex justify-between text-espresso-700">
                <span>Subtotal</span>
                <span>₹{activeOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-espresso-700">
                <span>GST (5%)</span>
                <span>₹{activeOrder.tax}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-espresso-950 font-serif pt-1 border-t border-vintageGold-500/20">
                <span>Total (Paid at Counter / Table)</span>
                <span className="text-vintageGold-800 text-lg">₹{activeOrder.total}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 rounded-xl bg-cream-200 text-espresso-900 font-serif font-semibold text-xs tracking-wider uppercase hover:bg-cream-300 transition-colors flex items-center justify-center gap-2 border border-vintageGold-500/30"
            >
              <Printer className="w-3.5 h-3.5 text-vintageGold-700" /> Print Vintage Ticket
            </button>

            <button
              onClick={closeSuccessModal}
              className="w-full py-3.5 px-4 rounded-xl bg-espresso-900 text-vintageGold-300 font-serif font-bold text-xs uppercase tracking-widest shadow-vintage hover:bg-espresso-800 transition-all flex items-center justify-center gap-2 border border-vintageGold-500"
            >
              <Sparkles className="w-4 h-4 text-vintageGold-400" /> Done & Enjoy The Moment
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
