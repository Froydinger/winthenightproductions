const SnowflakeAnimation = () => {
  // Generate snowflakes with varying properties
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 2) % 100}%`,
    size: 6 + (i % 5) * 2,
    duration: 10 + (i % 10),
    delay: (i % 20) * -1,
  }));

  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(100vh);
            }
          }
          .snowflake {
            position: fixed;
            top: 0;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            box-shadow: 0 0 10px #fff, 0 0 20px #fff;
          }
        `}
      </style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </>
  );
};

export default SnowflakeAnimation;
