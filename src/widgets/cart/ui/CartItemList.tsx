import type { ReactElement } from "react";
import type { CartItem as CartItemModel } from "@/entities/cart/model/types";
import { CartItem } from "./CartItem";
import styles from "./CartItemList.module.scss";

interface Props {
  items: CartItemModel[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export function CartItemList({
  items,
  onRemove,
  onQuantityChange,
}: Props): ReactElement {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </ul>
  );
}
