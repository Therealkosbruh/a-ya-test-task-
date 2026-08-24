import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/shared/api/types";
import { getCheapestProductColor } from "@/entities/product/lib/get-cheapest-color";
import { getProductMinPrice } from "@/entities/product/lib/get-min-price";
import { isProductInStock } from "@/entities/product/lib/is-in-stock";
import { formatPrice } from "@/shared/lib/format-price";
import { pluralize } from "@/shared/lib/pluralize";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./ProductCard.module.scss";

type Props = {
  product: Product;
  priority?: boolean;
};

interface ProductJsonLd {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  image: string[];
  brand: {
    "@type": "Brand";
    name: string;
  };
  offers: {
    "@type": "Offer";
    price: number;
    priceCurrency: "RUB";
    availability:
      "https://schema.org/InStock" | "https://schema.org/OutOfStock";
  };
}

function toSafeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function ProductCard({ product, priority = false }: Props) {
  const cheapestColor = getCheapestProductColor(product);
  const minPrice = getProductMinPrice(product);
  const inStock = isProductInStock(product);
  const colorsCount = product.colors.length;

  const jsonLd: ProductJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.colors.flatMap((color) => color.images),
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: minPrice,
      priceCurrency: "RUB",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={joinClassNames(styles.card, !inStock && styles.cardSoldOut)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toSafeJson(jsonLd) }}
      />
      <div className={styles.cardMedia}>
        <div className={styles.cardImg}>
          <Image
            src={cheapestColor.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
            {...(priority ? { priority: true } : { loading: "lazy" as const })}
          />
          {!inStock && <span className={styles.cardBadge}>Нет в наличии</span>}
        </div>
        <div className={styles.cardQuick}>Быстрый просмотр</div>
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardMeta}>
          {product.brand} · {colorsCount}{" "}
          {pluralize(colorsCount, ["цвет", "цвета", "цветов"])}
        </p>
        <p className={styles.cardPrice}>от {formatPrice(minPrice)}</p>
      </div>
    </Link>
  );
}
