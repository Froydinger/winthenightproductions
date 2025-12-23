const SnowflakeAnimation = () => {
  const snowflakes = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 12, // 8-20px
    duration: 15 + Math.random() * 20, // 15-35s (slow gentle fall)
    delay: Math.random() * -35, // Start at random points
    opacity: 0.4 + Math.random() * 0.4, // 0.4-0.8
    rotation: Math.random() * 360,
  }));

  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-20px) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
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
        `}
      </style>
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
    </>
  );
};

export default SnowflakeAnimation;
