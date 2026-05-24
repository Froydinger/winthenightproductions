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
  brightness: number;
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
    const particleCount = isMobile ? 80 : 200;
    const slowCount = Math.floor(particleCount * 0.4);
    const mediumCount = Math.floor(particleCount * 0.4);
    const fastCount = particleCount - slowCount - mediumCount;

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    const generateStars = (
      count: number, 
      baseId: number, 
      sizeRange: [number, number], 
      opacityRange: [number, number]
    ): Star[] => {
      return Array.from({ length: count }, (_, i) => {
        const rand = seededRandom(baseId + i * 7.7);
        // Some stars are brighter (20% chance)
        const isBright = rand > 0.8;
        return {
          id: baseId + i,
          x: seededRandom(baseId + i * 1.1) * 100,
          y: seededRandom(baseId + i * 2.2) * 500, // Extended for very long pages
          size: isBright 
            ? sizeRange[1] * 1.5 
            : sizeRange[0] + seededRandom(baseId + i * 3.3) * (sizeRange[1] - sizeRange[0]),
          opacity: isBright
            ? opacityRange[1] * 1.5
            : opacityRange[0] + seededRandom(baseId + i * 4.4) * (opacityRange[1] - opacityRange[0]),
          delay: seededRandom(baseId + i * 5.5) * 6,
          duration: 4 + seededRandom(baseId + i * 6.6) * 4,
          brightness: isBright ? 1.5 : 1,
        };
      });
    };

    return {
      slowStars: generateStars(slowCount, 0, [1, 2], [0.15, 0.4]),
      mediumStars: generateStars(mediumCount, 100, [1.5, 2.5], [0.25, 0.5]),
      fastStars: generateStars(fastCount, 200, [2, 3], [0.4, 0.7]),
    };
  }, [isMobile]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ isolation: 'isolate', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      {/* Layer 1: Static gradient background — no animation to avoid full-page repaints */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background pointer-events-none" />

      {/* Layer 2: Slow stars (far background) */}
      <div 
        className="absolute inset-x-0 -top-[100%] h-[800%] will-change-transform"
        style={{
          transform: `translate3d(0, ${Math.round(starsSlowOffset)}px, 0)`,
          backfaceVisibility: 'hidden',
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
              boxShadow: star.brightness > 1 ? '0 0 8px 2px rgba(93, 204, 255, 0.6)' : 'none',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>

      {/* Layer 3: Medium speed stars */}
      <div 
        className="absolute inset-x-0 -top-[100%] h-[800%] will-change-transform"
        style={{
          transform: `translate3d(0, ${Math.round(starsMediumOffset)}px, 0)`,
          backfaceVisibility: 'hidden',
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
              boxShadow: star.brightness > 1 ? '0 0 10px 3px rgba(93, 204, 255, 0.7)' : 'none',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>

      {/* Layer 4: Fast stars (foreground) */}
      <div 
        className="absolute inset-x-0 -top-[100%] h-[800%] will-change-transform"
        style={{
          transform: `translate3d(0, ${Math.round(starsFastOffset)}px, 0)`,
          backfaceVisibility: 'hidden',
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
              boxShadow: star.brightness > 1 ? '0 0 12px 4px rgba(93, 204, 255, 0.8)' : '0 0 4px 1px rgba(93, 204, 255, 0.3)',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>

      {/* Layer 5: Accent Radial Glow - multiple positions */}
      <div
        className="absolute inset-x-0 -top-[100%] h-[800%] will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(0, ${Math.round(starsFastOffset * 0.5)}px, 0)`,
          background: `
            radial-gradient(ellipse 80% 40% at 30% 20%, rgba(93, 204, 255, 0.08), transparent 50%),
            radial-gradient(ellipse 60% 30% at 70% 60%, rgba(93, 204, 255, 0.06), transparent 50%),
            radial-gradient(ellipse 70% 35% at 40% 80%, rgba(93, 204, 255, 0.07), transparent 50%)
          `,
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
