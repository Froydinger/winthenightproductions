import { useIsMobile } from "@/hooks/use-mobile";
import { useParallax } from "@/hooks/useParallax";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

const AnimatedBackground = () => {
  const isMobile = useIsMobile();
  
  // Multi-layer parallax with different speeds
  const backgroundOffset = useParallax({ speed: 0.2 });
  const starsSlowOffset = useParallax({ speed: 0.3 });
  const starsMediumOffset = useParallax({ speed: 0.5 });
  const starsFastOffset = useParallax({ speed: 0.7 });

  // Generate fixed star positions once - memoized to prevent scattering
  const { slowStars, mediumStars, fastStars } = useMemo(() => {
    const particleCount = isMobile ? 15 : 40;
    const slowCount = Math.floor(particleCount * 0.4);
    const mediumCount = Math.floor(particleCount * 0.4);
    const fastCount = particleCount - slowCount - mediumCount;

    const generateStars = (count: number, baseId: number, sizeRange: [number, number], opacityRange: [number, number]): Star[] => {
      // Use seeded random for consistent positions
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed * 9999) * 10000;
        return x - Math.floor(x);
      };

      return Array.from({ length: count }, (_, i) => ({
        id: baseId + i,
        x: seededRandom(baseId + i * 1.1) * 100,
        y: seededRandom(baseId + i * 2.2) * 150, // Extended range for parallax
        size: sizeRange[0] + seededRandom(baseId + i * 3.3) * (sizeRange[1] - sizeRange[0]),
        opacity: opacityRange[0] + seededRandom(baseId + i * 4.4) * (opacityRange[1] - opacityRange[0]),
        delay: seededRandom(baseId + i * 5.5) * 6,
        duration: 4 + seededRandom(baseId + i * 6.6) * 4,
      }));
    };

    return {
      slowStars: generateStars(slowCount, 0, [1, 1.5], [0.1, 0.3]),
      mediumStars: generateStars(mediumCount, 100, [1, 2], [0.2, 0.4]),
      fastStars: generateStars(fastCount, 200, [1.5, 2.5], [0.3, 0.6]),
    };
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: Gradient Background - Slowest parallax */}
      <div
        className="absolute inset-x-0 -top-1/4 h-[150%] bg-gradient-to-br from-background via-charcoal to-background bg-[length:200%_200%] animate-gradient-shift will-change-transform"
        style={{
          transform: `translate3d(0, ${backgroundOffset * 0.5}px, 0)`,
        }}
      />

      {/* Layer 2: Slow stars (far background) */}
      <div 
        className="absolute inset-x-0 -top-1/4 h-[200%] will-change-transform"
        style={{
          transform: `translate3d(0, ${starsSlowOffset}px, 0)`,
        }}
      >
        {slowStars.map((star) => (
          <div
            key={`slow-${star.id}`}
            className="absolute rounded-full bg-neon-blue animate-float"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Medium speed stars */}
      <div 
        className="absolute inset-x-0 -top-1/4 h-[200%] will-change-transform"
        style={{
          transform: `translate3d(0, ${starsMediumOffset}px, 0)`,
        }}
      >
        {mediumStars.map((star) => (
          <div
            key={`medium-${star.id}`}
            className="absolute rounded-full bg-neon-blue animate-float"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Fast stars (foreground) */}
      <div 
        className="absolute inset-x-0 -top-1/4 h-[200%] will-change-transform"
        style={{
          transform: `translate3d(0, ${starsFastOffset}px, 0)`,
        }}
      >
        {fastStars.map((star) => (
          <div
            key={`fast-${star.id}`}
            className="absolute rounded-full bg-neon-blue animate-float"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 5: Accent Radial Glow */}
      <div
        className="absolute inset-x-0 -top-1/4 h-[150%] bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(0,217,255,0.08),transparent_60%)] will-change-transform"
        style={{
          transform: `translate3d(0, ${starsFastOffset * 0.5}px, 0)`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
