"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { useCartStore } from "@/entities/cart/model/use-cart-store";
import {
  useCartTotalCount,
  useCartTotalPrice,
} from "@/entities/cart/lib/use-cart-totals";
import { InfoBlock } from "@/shared/ui/info-block/InfoBlock";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";
import { pluralize } from "@/shared/lib/pluralize";
import { CartItemList } from "./ui/CartItemList";
import { CartSummary } from "./ui/CartSummary";
import styles from "./CartView.module.scss";

export function CartView(): ReactElement {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const totalCount = useCartTotalCount();
  const totalPrice = useCartTotalPrice();

  if (items.length === 0) {
    return (
      <div className={styles.wrapper}>
        <Breadcrumbs
          items={[{ label: "Каталог", href: "/" }, { label: "Корзина" }]}
        />
        <InfoBlock status="emptyCart" actionHref="/" />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs
        items={[{ label: "Каталог", href: "/" }, { label: "Корзина" }]}
      />
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Ваша корзина</h1>
          <span className={styles.itemsCount}>
            {items.length}{" "}
            {pluralize(items.length, ["позиция", "позиции", "позиций"])}
          </span>
        </div>
        <Link href="/" className={styles.continueLink}>
          Продолжить покупки
        </Link>
      </div>

      <div className={styles.layout}>
        <CartItemList
          items={items}
          onRemove={removeItem}
          onQuantityChange={setQuantity}
        />
        <CartSummary itemsCount={totalCount} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
