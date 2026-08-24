import type { ReactElement } from "react";
import styles from "./Footer.module.scss";

export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <address className={styles.credit}>
        <span className={styles.mark}>©</span>
        <a
          href="https://github.com/Therealkosbruh"
          target="_blank"
          rel="noopener noreferrer"
        >
          Therealkos
        </a>
      </address>
    </footer>
  );
}
