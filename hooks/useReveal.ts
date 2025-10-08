import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Lightweight reveal hook: returns a ref to attach to an element and a boolean `visible`.
 * Uses IntersectionObserver for smooth, CSS-driven transitions (transform + opacity in CSS).
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.35,
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (visible && once) return; // already visible and only run once

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin, threshold, once]);

  return { ref, visible } as const;
}
