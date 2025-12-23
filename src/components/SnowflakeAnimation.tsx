import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

interface FallingSnowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  opacity: number;
  startTime: number;
}

interface PiledSnowflake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  melting: boolean;
}

const SnowflakeAnimation = () => {
  const location = useLocation();
  const [falling, setFalling] = useState<FallingSnowflake[]>([]);
  const [piled, setPiled] = useState<PiledSnowflake[]>([]);
  const [isMelting, setIsMelting] = useState(false);
  const [snowEnabled, setSnowEnabled] = useState(true);
  const nextId = useRef(0);

  // Disable snow on crisis resources page (insensitive for that context)
  const isCrisisPage = location.pathname === "/crisis-resources" || location.pathname === "/crisis";

  // Create a new falling snowflake
  const createSnowflake = useCallback((): FallingSnowflake => {
    return {
      id: nextId.current++,
      left: Math.random() * 100,
      size: 10 + Math.random() * 8,
      duration: 12 + Math.random() * 15, // 12-27s to fall
      opacity: 0.4 + Math.random() * 0.35,
      startTime: Date.now(),
    };
  }, []);

  // Gradually add snowflakes when enabled (builds up naturally)
  useEffect(() => {
    if (!snowEnabled) {
      setFalling([]);
      setPiled([]);
      return;
    }

    // Start with just 2 snowflakes
    setFalling([createSnowflake(), createSnowflake()]);

    // Gradually add more snowflakes over time until we reach 20
    let count = 2;
    const maxFlakes = 20;

    const addInterval = setInterval(() => {
      if (count >= maxFlakes) {
        clearInterval(addInterval);
        return;
      }

      // Add 1-2 snowflakes at a time
      const toAdd = Math.min(2, maxFlakes - count);
      const newFlakes = Array.from({ length: toAdd }, () => createSnowflake());

      setFalling((prev) => [...prev, ...newFlakes]);
      count += toAdd;
    }, 1500); // Add more every 1.5 seconds

    return () => clearInterval(addInterval);
  }, [createSnowflake, snowEnabled]);

  // Check for landed snowflakes and spawn new ones
  useEffect(() => {
    if (!snowEnabled) return;

    const interval = setInterval(() => {
      const now = Date.now();

      setFalling((prev) => {
        const stillFalling: FallingSnowflake[] = [];
        const landed: FallingSnowflake[] = [];

        prev.forEach((flake) => {
          const elapsed = now - flake.startTime;
          if (elapsed >= flake.duration * 1000) {
            landed.push(flake);
          } else {
            stillFalling.push(flake);
          }
        });

        // Add landed snowflakes to pile (always - they finished falling)
        if (landed.length > 0 && !isMelting) {
          setPiled((p) => {
            const newPile = [
              ...p,
              ...landed.map((f) => ({
                id: f.id,
                left: f.left,
                size: f.size,
                opacity: f.opacity,
                melting: false,
              })),
            ];
            // Trim pile to max 720 (remove oldest first)
            if (newPile.length > 720) {
              return newPile.slice(newPile.length - 720);
            }
            return newPile;
          });
        }

        // Spawn new snowflakes to replace landed ones
        const newFlakes = landed.map(() => createSnowflake());

        return [...stillFalling, ...newFlakes];
      });
    }, 100);

    return () => clearInterval(interval);
  }, [createSnowflake, isMelting, snowEnabled]);

  // Melt pile every 60 seconds
  useEffect(() => {
    if (!snowEnabled) return;

    const clearTimer = setInterval(() => {
      setIsMelting(true);
      setPiled((prev) => prev.map((flake) => ({ ...flake, melting: true })));

      setTimeout(() => {
        setPiled([]);
        setIsMelting(false);
      }, 2000);
    }, 60000);

    return () => clearInterval(clearTimer);
  }, [snowEnabled]);

  const toggleSnow = () => {
    setSnowEnabled((prev) => !prev);
  };

  // Don't render anything on crisis page
  if (isCrisisPage) {
    return null;
  }

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
              opacity: var(--flake-opacity, 0.8);
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(10px) scale(0.3);
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
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .piled-snowflake.melting {
            animation: melt 2s ease-out forwards;
          }
          .snow-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 99999;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: all 0.3s ease;
            color: white;
          }
          .snow-toggle:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
          }
          .snow-toggle.disabled {
            opacity: 0.5;
          }
        `}
      </style>

      {/* Falling snowflakes */}
      {falling.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.duration}s linear forwards`,
          }}
        >
          ❄
        </div>
      ))}

      {/* Piled snowflakes at bottom */}
      {piled.map((flake) => (
        <div
          key={flake.id}
          className={`piled-snowflake ${flake.melting ? 'melting' : ''}`}
          style={{
            left: `${flake.left}%`,
            fontSize: flake.size,
            ['--flake-opacity' as string]: flake.opacity,
            opacity: flake.melting ? undefined : flake.opacity,
          }}
        >
          ❄
        </div>
      ))}

      {/* Snow toggle button */}
      <button
        className={`snow-toggle ${!snowEnabled ? 'disabled' : ''}`}
        onClick={toggleSnow}
        title={snowEnabled ? 'Turn off snow' : 'Turn on snow'}
        aria-label={snowEnabled ? 'Turn off snow' : 'Turn on snow'}
      >
        ❄
      </button>
    </>
  );
};

export default SnowflakeAnimation;
