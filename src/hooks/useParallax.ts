import { useEffect, useState } from "react";

interface ParallaxConfig {
  speed?: number;
  disabled?: boolean;
}

/**
 * iOS-compatible parallax scroll hook using transform: translate3d()
 *
 * @param speed - Parallax speed multiplier (0.0 to 1.0). Lower = slower movement
 * @param disabled - Disable parallax effect (respects prefers-reduced-motion)
 * @returns Current Y offset for parallax effect
 */
export const useParallax = ({ speed = 0.5, disabled = false }: ParallaxConfig = {}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    // Skip if disabled or user prefers reduced motion
    if (disabled || prefersReducedMotion) {
      setOffsetY(0);
      return;
    }

    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      // Calculate parallax offset
      // Negative value makes background move slower (parallax effect)
      const offset = lastScrollY * (speed - 1);
      setOffsetY(offset);
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        // Use requestAnimationFrame for smooth 60fps updates
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Passive listener for better scroll performance (iOS compatible)
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial calculation
    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, disabled, prefersReducedMotion]);

  return offsetY;
};
