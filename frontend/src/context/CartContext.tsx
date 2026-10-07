import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, OrderResponse } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem | CartItem, quantity?: number, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isOrderModalOpen: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
  activeOrder: OrderResponse | null;
  setActiveOrder: (order: OrderResponse | null) => void;
  isSuccessModalOpen: boolean;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('timeless_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderResponse | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('timeless_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (item: MenuItem | CartItem, quantity = 1, notes?: string) => {
    setItems((prev) => {
      const id = 'id' in item ? item.id : item.item_id;
      const existing = prev.find((i) => i.item_id === id);
      if (existing) {
        return prev.map((i) =>
          i.item_id === id ? { ...i, quantity: i.quantity + quantity, customization_notes: notes || i.customization_notes } : i
        );
      }
      return [
        ...prev,
        {
          item_id: id,
          name: item.name,
          price: item.price,
          quantity,
          category: item.category,
          image: item.image,
          customization_notes: notes,
        },
      ];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item_id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.item_id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        total,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isOrderModalOpen,
        openOrderModal: () => setIsOrderModalOpen(true),
        closeOrderModal: () => setIsOrderModalOpen(false),
        activeOrder,
        setActiveOrder,
        isSuccessModalOpen,
        openSuccessModal: () => setIsSuccessModalOpen(true),
        closeSuccessModal: () => setIsSuccessModalOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
