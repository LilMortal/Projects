import { create } from 'zustand';
import type { CartItem, MenuItem } from '../types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  addItem: (menuItem: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (menuItem, quantity = 1) => {
    const { items } = get();
    const existingItem = items.find(item => item.menuItem.id === menuItem.id);

    if (existingItem) {
      set({
        items: items.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({
        items: [...items, { menuItem, quantity }]
      });
    }
  },

  removeItem: (itemId) => {
    set({
      items: get().items.filter(item => item.menuItem.id !== itemId)
    });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    set({
      items: get().items.map(item =>
        item.menuItem.id === itemId
          ? { ...item, quantity }
          : item
      )
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  openCart: () => {
    set({ isOpen: true });
  },

  closeCart: () => {
    set({ isOpen: false });
  },
}));