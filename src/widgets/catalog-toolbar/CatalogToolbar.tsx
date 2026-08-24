import type { ReactElement, ReactNode } from "react";
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

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  sortDirection: SortDirection;
  onSortChange: (value: SortDirection) => void;
  filters?: ReactNode;
}

export function CatalogToolbar({
  searchValue,
  onSearchChange,
  inStockOnly,
  onInStockChange,
  sortDirection,
  onSortChange,
  filters,
}: Props): ReactElement {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarPrimary}>
        <label className={styles.search}>
          <span className={styles.visuallyHidden}>Поиск по каталогу</span>
          <Icon name="search" />
          <input
            type="search"
            placeholder="Поиск по каталогу"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className={styles.switchRow}>
          <input
            type="checkbox"
            className={styles.visuallyHidden}
            checked={inStockOnly}
            onChange={(event) => onInStockChange(event.target.checked)}
          />
          <span className={styles.switchTrack} aria-hidden="true" />В наличии
        </label>
      </div>

      <div className={styles.toolbarSecondary}>
        <div
          className={styles.sort}
          role="group"
          aria-label="Сортировка по цене"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.direction}
              type="button"
              className={joinClassNames(
                styles.sortOpt,
                option.direction === sortDirection && styles.isActive,
              )}
              aria-pressed={option.direction === sortDirection}
              onClick={() => onSortChange(option.direction)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {filters}
      </div>
    </div>
  );
}
