import { useCartStore } from "../model/use-cart-store";

export function useCartTotalCount(): number {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );
}

export function useCartTotalPrice(): number {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  );
}
