import type { ReactElement } from "react";
import Link from "next/link";
import { Icon } from "@/shared/ui/icon/Icon";
import { getInfoBlockContent, type InfoBlockStatus } from "./lib/contentHelper";
import styles from "./InfoBlock.module.scss";

interface Props {
  status: InfoBlockStatus;
  onAction?: () => void;
  actionHref?: string;
}

const SKELETON_CARDS_COUNT = 8;

export function InfoBlock({
  status,
  onAction,
  actionHref,
}: Props): ReactElement {
  if (status === "loading") {
    return (
      <div className={styles.skeletonGrid}>
        {Array.from({ length: SKELETON_CARDS_COUNT }).map((_, index) => (
          <div
            key={index}
            className={styles.skCard}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className={styles.skCardImg} />
            <div className={styles.skLine} style={{ width: "70%" }} />
            <div className={styles.skLine} style={{ width: "40%" }} />
          </div>
        ))}
      </div>
    );
  }

  const content = getInfoBlockContent(status);

  return (
    <div className={styles.state}>
      <div className={styles.stateIcon}>
        <Icon name={content.icon} size={28} />
      </div>
      <h2 className={styles.stateTitle}>{content.title}</h2>
      <p className={styles.stateText}>{content.text}</p>
      {actionHref ? (
        <Link href={actionHref} className={styles.stateAction}>
          {content.actionLabel}
        </Link>
      ) : (
        onAction && (
          <button
            type="button"
            className={styles.stateAction}
            onClick={onAction}
          >
            {content.actionLabel}
          </button>
        )
      )}
    </div>
  );
}
