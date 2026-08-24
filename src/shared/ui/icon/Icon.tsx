import type { ReactElement } from "react";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./Icon.module.scss";

export type IconName =
  | "search"
  | "cart"
  | "filters"
  | "plus"
  | "minus"
  | "burger"
  | "delete"
  | "sortArrowUp"
  | "sortArrowDown";

const ICONS: Record<IconName, ReactElement> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <line x1="16" y1="16" x2="20.5" y2="20.5" />
    </>
  ),
  cart: (
    <>
      <path d="M6 8h12l-1.2 11.2a1.6 1.6 0 0 1-1.6 1.4H8.8a1.6 1.6 0 0 1-1.6-1.4Z" />
      <path d="M9.2 8a2.8 2.8 0 0 1 5.6 0" />
    </>
  ),
  filters: (
    <>
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="15" cy="8" r="2.2" fill="#FBF7F0" />
      <circle cx="9" cy="16" r="2.2" fill="#FBF7F0" />
    </>
  ),
  plus: (
    <>
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="12" y1="6" x2="12" y2="18" />
    </>
  ),
  minus: <line x1="6" y1="12" x2="18" y2="12" />,
  burger: (
    <>
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </>
  ),
  delete: (
    <>
      <line x1="7" y1="7" x2="17" y2="17" />
      <line x1="17" y1="7" x2="7" y2="17" />
    </>
  ),
  sortArrowUp: (
    <>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="6,11 12,5 18,11" />
    </>
  ),
  sortArrowDown: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6,13 12,19 18,13" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 18, className }: IconProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={joinClassNames(styles.icon, className)}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}
