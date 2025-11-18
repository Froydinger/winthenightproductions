import { useEffect, useRef, useState } from "react";

export const useScrollBlur = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Calculate blur based on how much is out of view
          const ratio = entry.intersectionRatio;
          const blur = Math.max(0, (1 - ratio) * 8); // Max 8px blur
          setBlurAmount(blur);
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
