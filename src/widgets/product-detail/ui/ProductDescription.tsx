import type { ReactElement } from "react";
import { formatPrice } from "@/shared/lib/format-price";
import styles from "./ProductDescription.module.scss";

interface Props {
  brand: string;
  name: string;
  price: number;
  description: string;
}

export function ProductDescription({
  brand,
  name,
  price,
  description,
}: Props): ReactElement {
  return (
    <div className={styles.description}>
      <p className={styles.brand}>{brand}</p>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.price}>{formatPrice(price)}</p>
      <p className={styles.text}>{description}</p>
    </div>
  );
}
