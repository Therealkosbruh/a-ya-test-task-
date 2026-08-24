import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
}

interface PersistedCartState {
  items: CartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (cartItem) => cartItem.id === item.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((cartItem) => cartItem.id !== id),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: Math.max(1, quantity) }
              : cartItem,
          ),
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedCartState => ({
        items: state.items,
      }),
    },
  ),
);
