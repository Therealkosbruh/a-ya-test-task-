import type { ReactElement } from "react";
import { formatPrice } from "@/shared/lib/format-price";
import styles from "./CartSummary.module.scss";

interface Props {
  itemsCount: number;
  totalPrice: number;
}

export function CartSummary({ itemsCount, totalPrice }: Props): ReactElement {
  return (
    <aside className={styles.summary}>
      <div className={styles.row}>
        <span className={styles.label}>Товары, {itemsCount} шт</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.total}>
        <span>Итого</span>
        <span className={styles.totalValue}>{formatPrice(totalPrice)}</span>
      </div>
      <button type="button" className={styles.payButton}>
        Оплатить
      </button>
    </aside>
  );
}
