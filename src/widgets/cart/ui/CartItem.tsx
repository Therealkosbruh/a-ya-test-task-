import type { ReactElement } from "react";
import Image from "next/image";
import type { CartItem as CartItemModel } from "@/entities/cart/model/types";
import { Icon } from "@/shared/ui/icon/Icon";
import { formatPrice } from "@/shared/lib/format-price";
import styles from "./CartItem.module.scss";

const THUMBNAIL_WIDTH = 104;
const THUMBNAIL_HEIGHT = 130;

interface Props {
  item: CartItemModel;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: Props): ReactElement {
  return (
    <li className={styles.item}>
      <Image
        src={item.image}
        alt={item.productName}
        width={THUMBNAIL_WIDTH}
        height={THUMBNAIL_HEIGHT}
        loading="lazy"
        className={styles.image}
      />
      <div className={styles.info}>
        <span className={styles.name}>{item.productName}</span>
        <span className={styles.meta}>
          {item.colorName} · {item.sizeName}
        </span>
        <span className={styles.price}>{formatPrice(item.price)} / шт</span>
      </div>
      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.stepperButton}
          disabled={item.quantity === 1}
          aria-label="Уменьшить количество"
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
        >
          <Icon name="minus" size={14} />
        </button>
        <span className={styles.stepperValue}>{item.quantity}</span>
        <button
          type="button"
          className={styles.stepperButton}
          aria-label="Увеличить количество"
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        >
          <Icon name="plus" size={14} />
        </button>
      </div>
      <span className={styles.sum}>
        {formatPrice(item.price * item.quantity)}
      </span>
      <button
        type="button"
        className={styles.removeButton}
        aria-label={`Удалить ${item.productName}`}
        onClick={() => onRemove(item.id)}
      >
        <Icon name="delete" size={18} />
      </button>
    </li>
  );
}
