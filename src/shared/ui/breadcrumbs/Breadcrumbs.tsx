import type { ReactElement } from "react";
import Link from "next/link";
import { toSafeJson } from "@/shared/lib/to-safe-json";
import styles from "./Breadcrumbs.module.scss";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

interface BreadcrumbListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

interface BreadcrumbJsonLd {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbListItem[];
}

function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): BreadcrumbJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };
}

export function Breadcrumbs({ items }: Props): ReactElement {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toSafeJson(jsonLd) }}
      />
      {items.map((item, index) => (
        <span className={styles.item} key={item.label}>
          {index > 0 && (
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
          )}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
