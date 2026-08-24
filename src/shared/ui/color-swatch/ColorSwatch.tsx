import type { CSSProperties, ReactElement } from "react";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./ColorSwatch.module.scss";

interface Props {
  color: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function ColorSwatch({
  color,
  label,
  selected = false,
  disabled = false,
  onClick,
}: Props): ReactElement {
  const style: CSSProperties = { background: color };

  return (
    <button
      type="button"
      className={joinClassNames(styles.swatch, selected && styles.isSelected)}
      style={style}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
