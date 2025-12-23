import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  sway: boolean;
}

const SnowflakeAnimation = () => {
  const isMobile = useIsMobile();

  const snowflakes = useMemo(() => {
    // Fewer snowflakes on mobile for performance
    const count = isMobile ? 30 : 60;

    // Seeded random for consistent snowflake positions
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12345) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i): Snowflake => {
      const rand = seededRandom(i * 7.7);
      return {
        id: i,
        x: seededRandom(i * 1.3) * 100,
        size: 3 + seededRandom(i * 2.1) * 5, // 3-8px
        opacity: 0.6 + seededRandom(i * 3.7) * 0.4, // 0.6-1.0
        duration: 6 + seededRandom(i * 4.2) * 10, // 6-16s
        delay: seededRandom(i * 5.5) * -16, // Negative delay so some start mid-animation
        sway: rand > 0.5, // 50% chance to sway
      };
    });
  }, [isMobile]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 100 }}
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={flake.sway ? "animate-snowfall-sway" : "animate-snowfall"}
          style={{
            position: "absolute",
            left: `${flake.x}%`,
            top: 0,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </div>
  );
};

export default SnowflakeAnimation;
