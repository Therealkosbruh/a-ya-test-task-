import type { Metadata } from "next";
import { CartView } from "@/widgets/cart/CartView";

export const metadata: Metadata = { title: "Корзина" };

export default function CartPage() {
  return <CartView />;
}
