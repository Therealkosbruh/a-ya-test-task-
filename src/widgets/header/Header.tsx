"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { Icon } from "@/shared/ui/icon/Icon";
import {
  useCartTotalCount,
  useCartTotalPrice,
} from "@/entities/cart/lib/use-cart-totals";
import { formatPrice } from "@/shared/lib/format-price";
import styles from "./Header.module.scss";

export function Header(): ReactElement {
  const totalCount = useCartTotalCount();
  const totalPrice = useCartTotalPrice();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link href="/" className={styles.logo}>
          Каталог
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Link href="/cart" className={styles.cartPill} aria-label="Корзина">
          <Icon name="cart" />
          <span>
            {totalCount} · {formatPrice(totalPrice)}
          </span>
        </Link>
      </div>
    </header>
  );
}
