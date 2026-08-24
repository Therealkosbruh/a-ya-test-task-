"use client";

import { useEffect, type RefObject } from "react";

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  callback: () => void,
  {
    rootMargin = "200px",
    threshold = 0.1,
  }: UseIntersectionObserverOptions = {},
): void {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callback();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, callback, rootMargin, threshold]);
}
