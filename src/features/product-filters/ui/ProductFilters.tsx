"use client";

import type { ChangeEvent, ReactElement, TransitionEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/shared/ui/icon/Icon";
import { joinClassNames } from "@/shared/lib/join-class-names";
import { useCategories } from "@/entities/category/api/use-categories";
import { useBrands } from "@/entities/product/api/use-brands";
import { useColors } from "@/entities/product/api/use-colors";
import { useSizes } from "@/entities/size/api/use-sizes";
import { ColorSwatch } from "@/shared/ui/color-swatch/ColorSwatch";
import { SizeBox } from "@/shared/ui/size-box/SizeBox";
import { getColorHex } from "@/shared/lib/color-name-to-hex";
import { useFiltersStore } from "../model/use-filters-store";
import styles from "./ProductFilters.module.scss";

function parsePriceInput(value: string): number | null {
  return value === "" ? null : Number(value) || null;
}

export function ProductFilters(): ReactElement {
  const [shouldRender, setShouldRender] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const categoryIds = useFiltersStore((state) => state.categoryIds);
  const brands = useFiltersStore((state) => state.brands);
  const priceMin = useFiltersStore((state) => state.priceMin);
  const priceMax = useFiltersStore((state) => state.priceMax);
  const colorNames = useFiltersStore((state) => state.colorNames);
  const sizeIds = useFiltersStore((state) => state.sizeIds);
  const toggleCategoryId = useFiltersStore((state) => state.toggleCategoryId);
  const toggleBrand = useFiltersStore((state) => state.toggleBrand);
  const setPriceRange = useFiltersStore((state) => state.setPriceRange);
  const toggleColorName = useFiltersStore((state) => state.toggleColorName);
  const toggleSizeId = useFiltersStore((state) => state.toggleSizeId);
  const reset = useFiltersStore((state) => state.reset);

  const { data: categories, isPending: isCategoriesPending } = useCategories();
  const { data: brandOptions, isPending: isBrandsPending } = useBrands();
  const { data: colors, isPending: isColorsPending } = useColors();
  const { data: sizes, isPending: isSizesPending } = useSizes();

  const hasActiveFilters =
    categoryIds.length > 0 ||
    brands.length > 0 ||
    priceMin !== null ||
    priceMax !== null ||
    colorNames.length > 0 ||
    sizeIds.length > 0;

  const openSidebar = useCallback(() => {
    setShouldRender(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handleSidebarTransitionEnd = (
    event: TransitionEvent<HTMLElement>,
  ): void => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    if (!open) setShouldRender(false);
  };

  useEffect(() => {
    if (!shouldRender) return;
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPriceRange(parsePriceInput(event.target.value), priceMax);
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPriceRange(priceMin, parsePriceInput(event.target.value));
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={openSidebar}
      >
        <Icon name="filters" />
        Фильтры
        {hasActiveFilters && (
          <span className={styles.badge} aria-hidden="true" />
        )}
      </button>

      {shouldRender &&
        createPortal(
          <div
            className={joinClassNames(
              styles.overlay,
              open && styles.overlayVisible,
            )}
            onClick={close}
          >
            <aside
              className={joinClassNames(
                styles.sidebar,
                open && styles.sidebarOpen,
              )}
              aria-label="Фильтры"
              onClick={(event) => event.stopPropagation()}
              onTransitionEnd={handleSidebarTransitionEnd}
            >
              <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>Фильтры</h2>
                <button
                  type="button"
                  className={styles.closeButton}
                  aria-label="Закрыть фильтры"
                  onClick={close}
                >
                  <Icon name="delete" />
                </button>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Категория</h3>
                {isCategoriesPending && (
                  <p className={styles.loading}>Загрузка…</p>
                )}
                {categories && (
                  <div
                    className={styles.optionList}
                    role="group"
                    aria-label="Категория"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        aria-pressed={categoryIds.includes(category.id)}
                        className={joinClassNames(
                          styles.option,
                          categoryIds.includes(category.id) && styles.isActive,
                        )}
                        onClick={() => toggleCategoryId(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Бренд</h3>
                {isBrandsPending && <p className={styles.loading}>Загрузка…</p>}
                {brandOptions && (
                  <div
                    className={styles.optionList}
                    role="group"
                    aria-label="Бренд"
                  >
                    {brandOptions.map((brandName) => (
                      <button
                        key={brandName}
                        type="button"
                        aria-pressed={brands.includes(brandName)}
                        className={joinClassNames(
                          styles.option,
                          brands.includes(brandName) && styles.isActive,
                        )}
                        onClick={() => toggleBrand(brandName)}
                      >
                        {brandName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Цена</h3>
                <div className={styles.priceRange}>
                  <label className={styles.priceField}>
                    <span className={styles.visuallyHidden}>Цена от</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="От"
                      value={priceMin ?? ""}
                      onChange={handleMinChange}
                    />
                  </label>
                  <label className={styles.priceField}>
                    <span className={styles.visuallyHidden}>Цена до</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="До"
                      value={priceMax ?? ""}
                      onChange={handleMaxChange}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Цвет</h3>
                {isColorsPending && <p className={styles.loading}>Загрузка…</p>}
                {colors && (
                  <div
                    className={styles.swatchList}
                    role="group"
                    aria-label="Цвет"
                  >
                    {colors.map((colorValue) => (
                      <ColorSwatch
                        key={colorValue}
                        color={getColorHex(colorValue)}
                        label={colorValue}
                        selected={colorNames.includes(colorValue)}
                        onClick={() => toggleColorName(colorValue)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Размер</h3>
                {isSizesPending && <p className={styles.loading}>Загрузка…</p>}
                {sizes && (
                  <div
                    className={styles.sizeList}
                    role="group"
                    aria-label="Размер"
                  >
                    {sizes.map((size) => (
                      <SizeBox
                        key={size.id}
                        label={size.name}
                        selected={sizeIds.includes(size.id)}
                        onClick={() => toggleSizeId(size.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={reset}
                >
                  Сбросить
                </button>
              )}
            </aside>
          </div>,
          document.body,
        )}
    </>
  );
}
