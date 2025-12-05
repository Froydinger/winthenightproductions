import { useIsMobile } from "@/hooks/use-mobile";
import { useParallax } from "@/hooks/useParallax";

const AnimatedBackground = () => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 15 : 40;

  // Multi-layer parallax with different speeds
  const backgroundOffset = useParallax({ speed: 0.3 }); // Slowest - gradient
  const starsSlowOffset = useParallax({ speed: 0.4 }); // Slow stars
  const starsMediumOffset = useParallax({ speed: 0.6 }); // Medium stars
  const accentOffset = useParallax({ speed: 0.8 }); // Faster accent glow

  // Split particles into groups for different parallax speeds
  const slowStarsCount = Math.floor(particleCount * 0.4); // 40% slow
  const mediumStarsCount = Math.floor(particleCount * 0.4); // 40% medium
  const fastStarsCount = particleCount - slowStarsCount - mediumStarsCount; // 20% fast

  return (
    <>
      {/* Layer 1: Gradient Background - Slowest parallax */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background bg-[length:200%_200%] animate-gradient-shift"
        style={{
          transform: `translate3d(0, ${backgroundOffset}px, 0)`,
        }}
      />

      {/* Layer 2: Star Particles - Multi-speed parallax */}
      <div className="absolute inset-0 opacity-30">
        {/* Slow stars (background layer) */}
        {[...Array(slowStarsCount)].map((_, i) => (
          <div
            key={`slow-${i}`}
            className="absolute w-1 h-1 bg-neon-blue rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: Math.random() * 0.3 + 0.1,
              transform: `translate3d(0, ${starsSlowOffset}px, 0)`,
            }}
          />
        ))}

        {/* Medium speed stars */}
        {[...Array(mediumStarsCount)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-1 h-1 bg-neon-blue rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: Math.random() * 0.4 + 0.2,
              transform: `translate3d(0, ${starsMediumOffset}px, 0)`,
            }}
          />
        ))}

        {/* Fast stars (foreground layer) */}
        {[...Array(fastStarsCount)].map((_, i) => (
          <div
            key={`fast-${i}`}
            className="absolute w-1.5 h-1.5 bg-neon-blue rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3,
              transform: `translate3d(0, ${accentOffset}px, 0)`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Accent Radial Glow - Faster parallax for depth */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_50%)]"
        style={{
          transform: `translate3d(0, ${accentOffset}px, 0)`,
        }}
      />
    </>
  );
};

export default AnimatedBackground;
