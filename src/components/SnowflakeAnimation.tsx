import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const SnowflakeAnimation = () => {
  const isMobile = useIsMobile();

  const snowflakes = useMemo(() => {
    const count = isMobile ? 35 : 70;

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12345) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i): Snowflake => {
      return {
        id: i,
        x: seededRandom(i * 1.3) * 100,
        size: 4 + seededRandom(i * 2.1) * 4, // 4-8px
        opacity: 0.7 + seededRandom(i * 3.7) * 0.3, // 0.7-1.0
        duration: 8 + seededRandom(i * 4.2) * 12, // 8-20s
        delay: seededRandom(i * 5.5) * -20, // Negative delay to start mid-fall
      };
    });
  }, [isMobile]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          style={{
            position: "fixed",
            left: `${flake.x}%`,
            top: 0,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.9)",
            zIndex: 9999,
          }}
        />
      ))}
    </div>
  );
};

export default SnowflakeAnimation;
