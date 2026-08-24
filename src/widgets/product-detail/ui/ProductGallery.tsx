"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { Icon } from "@/shared/ui/icon/Icon";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./ProductGallery.module.scss";

interface Props {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: Props): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentIndex] ?? images[0];

  function goToPrevious(): void {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function goToNext(): void {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={currentImage}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          style={{ objectFit: "cover" }}
          priority={currentIndex === 0}
        />
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className={joinClassNames(styles.navButton, styles.navButtonPrev)}
              aria-label="Предыдущее изображение"
              onClick={goToPrevious}
            >
              <Icon name="sortArrowUp" className={styles.navIcon} />
            </button>
            <button
              type="button"
              className={joinClassNames(styles.navButton, styles.navButtonNext)}
              aria-label="Следующее изображение"
              onClick={goToNext}
            >
              <Icon name="sortArrowUp" className={styles.navIconNext} />
            </button>
            <div className={styles.pagination}>
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={joinClassNames(
                    styles.dot,
                    index === currentIndex && styles.dotActive,
                  )}
                  aria-label={`Изображение ${index + 1}`}
                  aria-current={index === currentIndex}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {hasMultipleImages && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={joinClassNames(
                styles.thumbnail,
                index === currentIndex && styles.thumbnailActive,
              )}
              aria-label={`Изображение ${index + 1}`}
              aria-current={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="120px"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
