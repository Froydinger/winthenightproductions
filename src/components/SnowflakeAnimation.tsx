import { useState, useEffect, useCallback } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface PiledSnowflake {
  id: number;
  left: number;
  bottom: number;
  size: number;
  opacity: number;
}

const SnowflakeAnimation = () => {
  const [piled, setPiled] = useState<PiledSnowflake[]>([]);
  const [clearKey, setClearKey] = useState(0);

  // Generate falling snowflakes
  const generateSnowflakes = useCallback((): Snowflake[] => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i + clearKey * 1000,
      left: Math.random() * 100,
      size: 10 + Math.random() * 8, // 10-18px
      duration: 15 + Math.random() * 20, // 15-35s (slower)
      delay: Math.random() * -35,
      opacity: 0.4 + Math.random() * 0.35, // slightly more subtle
    }));
  }, [clearKey]);

  const [snowflakes, setSnowflakes] = useState<Snowflake[]>(generateSnowflakes);

  // Regenerate snowflakes when clearKey changes
  useEffect(() => {
    setSnowflakes(generateSnowflakes());
  }, [clearKey, generateSnowflakes]);

  // Add snowflakes to pile when they land
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a snowflake to the pile
      if (piled.length < 80) {
        setPiled((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: Math.random() * 100,
            bottom: Math.random() * 25, // Stack up to 25px high
            size: 8 + Math.random() * 6,
            opacity: 0.5 + Math.random() * 0.3,
          },
        ]);
      }
    }, 800); // Add one every 800ms (slower buildup)

    return () => clearInterval(interval);
  }, [piled.length]);

  // Clear pile every 60 seconds
  useEffect(() => {
    const clearInterval = setInterval(() => {
      setPiled([]);
      setClearKey((k) => k + 1);
    }, 60000); // 60 seconds

    return () => clearInterval(clearInterval);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-20px) rotate(0deg);
            }
            100% {
              transform: translateY(calc(100vh - 20px)) rotate(360deg);
            }
          }
          @keyframes melt {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.5);
            }
          }
          .snowflake {
            position: fixed;
            top: 0;
            color: white;
            pointer-events: none;
            z-index: 99999;
            font-family: sans-serif;
            text-shadow: 0 0 2px rgba(255,255,255,0.5);
          }
          .piled-snowflake {
            position: fixed;
            bottom: 0;
            color: white;
            pointer-events: none;
            z-index: 99999;
            font-family: sans-serif;
            text-shadow: 0 0 2px rgba(255,255,255,0.5);
          }
        `}
      </style>

      {/* Falling snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄
        </div>
      ))}

      {/* Piled snowflakes at bottom */}
      {piled.map((flake) => (
        <div
          key={flake.id}
          className="piled-snowflake"
          style={{
            left: `${flake.left}%`,
            bottom: flake.bottom,
            fontSize: flake.size,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

export default SnowflakeAnimation;
