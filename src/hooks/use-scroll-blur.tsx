import { useEffect, useRef, useState } from "react";

export const useScrollBlur = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only blur when less than 25% is visible (75% out of view)
          if (entry.intersectionRatio < 0.25) {
            const blur = Math.min(8, (0.25 - entry.intersectionRatio) * 32); // Max 8px blur
            setBlurAmount(blur);
          } else {
            setBlurAmount(0);
          }
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, blurAmount };
};
