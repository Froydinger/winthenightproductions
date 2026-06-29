import { useEffect, useState, useRef, RefObject } from "react";

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  delay = 0,
  threshold = 0.1
): [RefObject<T>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is active
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  return [elementRef, isVisible];
};
