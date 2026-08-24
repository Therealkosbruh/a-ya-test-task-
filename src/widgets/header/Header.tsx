import type { ReactElement } from "react";
import Link from "next/link";
import { Icon } from "@/shared/ui/icon/Icon";
import styles from "./Header.module.scss";

export function Header(): ReactElement {
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
          <span>0 · 0 ₽</span>
        </Link>
      </div>
    </header>
  );
}
