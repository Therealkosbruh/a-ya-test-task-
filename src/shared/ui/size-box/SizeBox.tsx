import type { ReactElement } from "react";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./SizeBox.module.scss";

interface Props {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function SizeBox({
  label,
  selected = false,
  disabled = false,
  onClick,
}: Props): ReactElement {
  return (
    <button
      type="button"
      className={joinClassNames(
        styles.box,
        selected && styles.isSelected,
        disabled && styles.isDisabled,
      )}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
