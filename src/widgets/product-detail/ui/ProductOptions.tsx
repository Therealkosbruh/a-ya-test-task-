import type { ReactElement } from "react";
import type { ProductColor, Size } from "@/shared/api/types";
import { ColorSwatch } from "@/shared/ui/color-swatch/ColorSwatch";
import { SizeBox } from "@/shared/ui/size-box/SizeBox";
import { getColorHex } from "@/shared/lib/color-name-to-hex";
import styles from "./ProductOptions.module.scss";

interface Props {
  colors: ProductColor[];
  sizes: Size[];
  selectedColorId: number;
  selectedSizeId: number | null;
  onColorSelect: (colorId: number) => void;
  onSizeSelect: (sizeId: number) => void;
}

function handleAddToCart(): void {}

export function ProductOptions({
  colors,
  sizes,
  selectedColorId,
  selectedSizeId,
  onColorSelect,
  onSizeSelect,
}: Props): ReactElement | null {
  const selectedColor = colors.find((color) => color.id === selectedColorId);

  if (!selectedColor) {
    return null;
  }

  const selectedSize = sizes.find((size) => size.id === selectedSizeId);

  return (
    <div className={styles.options}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Цвет — {selectedColor.name}</h2>
        <div className={styles.colors}>
          {colors.map((color) => (
            <ColorSwatch
              key={color.id}
              color={getColorHex(color.name)}
              label={color.name}
              selected={color.id === selectedColorId}
              onClick={() => onColorSelect(color.id)}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Размер — {selectedSize ? selectedSize.name : "не выбран"}
        </h2>
        <div className={styles.sizes}>
          {sizes.map((size) => (
            <SizeBox
              key={size.id}
              label={size.name}
              selected={size.id === selectedSizeId}
              disabled={!selectedColor.sizes.includes(size.id)}
              onClick={() => onSizeSelect(size.id)}
            />
          ))}
        </div>
      </section>

      <button
        type="button"
        className={styles.addButton}
        disabled={!selectedSizeId}
        onClick={handleAddToCart}
      >
        Добавить в корзину
      </button>
    </div>
  );
}
