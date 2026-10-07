import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    total,
    openOrderModal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-espresso-950/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 border-l-2 border-vintageGold-500/40 shadow-2xl flex flex-col justify-between vintage-paper-bg">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-vintageGold-500/30 bg-cream-100/90 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-espresso-900 text-vintageGold-400 flex items-center justify-center border border-vintageGold-500/40">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-espresso-950 uppercase tracking-wider">
                  Your Café Tray
                </h3>
                <p className="text-[11px] text-espresso-600 font-serif italic">
                  {items.length} unique {items.length === 1 ? 'recipe' : 'recipes'} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-espresso-600 hover:text-espresso-950 hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-cream-200 text-espresso-400 flex items-center justify-center mx-auto mb-4 border border-vintageGold-500/20">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-espresso-900">
                  Your tray is empty
                </h4>
                <p className="text-xs text-espresso-600 mt-1 max-w-xs mx-auto">
                  Ask our AI companion for a mood recommendation or explore our menu to add items.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.item_id}
                  className="bg-cream-100/90 rounded-xl p-4 border border-vintageGold-500/30 shadow-sm flex items-center gap-4 group"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-vintageGold-500/20 shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h5 className="font-display font-bold text-sm text-espresso-950 truncate">
                      {item.name}
                    </h5>
                    <p className="text-xs text-vintageGold-700 font-serif font-semibold">
                      ₹{item.price} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center rounded-lg bg-cream-200 border border-vintageGold-500/30">
                        <button
                          onClick={() => updateQuantity(item.item_id, -1)}
                          className="p-1 hover:bg-cream-300 text-espresso-800 rounded-l-lg transition-colors"
                          title="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-espresso-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.item_id, 1)}
                          className="p-1 hover:bg-cream-300 text-espresso-800 rounded-r-lg transition-colors"
                          title="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-serif font-bold text-espresso-950">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.item_id)}
                    className="p-2 text-espresso-400 hover:text-burgundy-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-vintageGold-500/30 bg-cream-100/90 backdrop-blur-md space-y-4">
              
              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs text-espresso-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso-950 font-serif">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-espresso-600">
                  <span>GST (5%)</span>
                  <span className="font-serif">₹{tax}</span>
                </div>
                <div className="pt-2 border-t border-vintageGold-500/20 flex justify-between text-sm font-bold text-espresso-950">
                  <span className="font-display uppercase tracking-wider">Total</span>
                  <span className="text-base font-serif text-vintageGold-800 font-bold">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCart();
                    openOrderModal();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-espresso-900 text-vintageGold-300 font-serif font-bold text-xs uppercase tracking-widest shadow-vintage hover:bg-espresso-800 hover:shadow-gold-glow active:scale-95 transition-all flex items-center justify-center gap-2 border border-vintageGold-500"
                >
                  <span>Confirm Order</span>
                  <ArrowRight className="w-4 h-4 text-vintageGold-400" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-[11px] font-medium text-espresso-500 hover:text-burgundy-700 transition-colors"
                >
                  Clear Tray
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
