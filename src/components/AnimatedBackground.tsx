import { useIsMobile } from "@/hooks/use-mobile";

const AnimatedBackground = () => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 25 : 50; // Balanced particle count for mobile

  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background bg-[length:200%_200%] animate-gradient-shift"
        style={{ willChange: 'background-position' }}
      />
      <div className="absolute inset-0 opacity-30">
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: Math.random() * 0.5 + 0.2,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_50%)]" />
    </>
  );
};

export default AnimatedBackground;
