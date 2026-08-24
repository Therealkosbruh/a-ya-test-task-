import type { ReactElement } from "react";
import { Icon } from "@/shared/ui/icon/Icon";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./CatalogToolbar.module.scss";

type SortDirection = "asc" | "desc";

interface SortOption {
  direction: SortDirection;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { direction: "asc", label: "Сначала дешевле" },
  { direction: "desc", label: "Сначала дороже" },
];

const ACTIVE_SORT_DIRECTION: SortDirection = "asc";

export function CatalogToolbar(): ReactElement {
  return (
    <div className={styles.toolbar}>
      <label className={styles.search}>
        <span className={styles.visuallyHidden}>Поиск по каталогу</span>
        <Icon name="search" />
        <input type="search" placeholder="Поиск по каталогу" />
      </label>

      <label className={styles.switchRow}>
        <input type="checkbox" className={styles.visuallyHidden} />
        <span className={styles.switchTrack} aria-hidden="true" />В наличии
      </label>

      <div className={styles.sort} role="group" aria-label="Сортировка по цене">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.direction}
            type="button"
            className={joinClassNames(
              styles.sortOpt,
              option.direction === ACTIVE_SORT_DIRECTION && styles.isActive,
            )}
            aria-pressed={option.direction === ACTIVE_SORT_DIRECTION}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
