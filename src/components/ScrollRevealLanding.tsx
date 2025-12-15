import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";

interface ScrollRevealLandingProps {
  onComplete?: () => void;
}

const ScrollRevealLanding = ({ onComplete }: ScrollRevealLandingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring for buttery animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Logo rises from behind the mountain
  const logoY = useTransform(smoothProgress, [0, 0.4], ["60%", "-20%"]);
  const logoScale = useTransform(smoothProgress, [0, 0.3, 0.5], [0.6, 1, 1.2]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.1, 0.6, 0.8], [0, 1, 1, 0]);
  const logoGlow = useTransform(smoothProgress, [0.2, 0.5], [0, 1]);

  // Mountain parallax layers (different speeds for depth)
  const mountainBackY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const mountainMidY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const mountainFrontY = useTransform(smoothProgress, [0, 1], ["0%", "70%"]);

  // Stars parallax
  const starsY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const starsOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Slogan shelf reveals - each word slides in from different directions
  const sloganWords = ["One", "Connection.", "One", "Story.", "One", "Conversation", "at", "a", "Time."];

  // Overall section fade out
  const sectionOpacity = useTransform(smoothProgress, [0.7, 0.95], [1, 0]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.95 && !hasScrolledPast) {
      setHasScrolledPast(true);
      onComplete?.();
    }
  });

  // Reduced motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative z-20"
      style={{ height: "400vh" }} // Extended scroll area for dramatic effect
    >
      {/* Sticky container for the reveal animation */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >
        {/* Starfield background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : starsY, opacity: starsOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d1a] to-[#121225]" />
          {/* Generated stars */}
          {Array.from({ length: 150 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const delay = Math.random() * 3;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animationDelay: `${delay}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            );
          })}
          {/* Nebula glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]" />
        </motion.div>

        {/* Aurora/Northern lights effect */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 opacity-30"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(0,217,255,0.1) 30%, rgba(157,78,221,0.05) 60%, transparent 100%)",
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Back mountain layer - distant peaks */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[60vh]"
          style={{ y: prefersReducedMotion ? 0 : mountainBackY }}
        >
          <svg
            viewBox="0 0 1440 600"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <linearGradient id="mountainBackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#0f0f1a" />
              </linearGradient>
            </defs>
            <path
              d="M0,600 L0,350 L200,280 L350,320 L450,250 L550,300 L650,200 L750,270 L850,180 L950,250 L1050,190 L1150,260 L1250,220 L1350,290 L1440,250 L1440,600 Z"
              fill="url(#mountainBackGradient)"
            />
          </svg>
        </motion.div>

        {/* LOGO - Rises from behind the center mountain */}
        <motion.div
          className="absolute left-1/2 bottom-[30vh] z-10 -translate-x-1/2"
          style={{
            y: prefersReducedMotion ? 0 : logoY,
            scale: prefersReducedMotion ? 1 : logoScale,
            opacity: prefersReducedMotion ? 1 : logoOpacity,
          }}
        >
          <motion.div
            className="relative"
            style={{
              filter: useTransform(
                logoGlow,
                [0, 1],
                ["drop-shadow(0 0 20px rgba(0,217,255,0.3))", "drop-shadow(0 0 60px rgba(0,217,255,0.8)) drop-shadow(0 0 120px rgba(0,217,255,0.4))"]
              ),
            }}
          >
            <img
              src={logoImage}
              alt="Win The Night Productions"
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
            />
            {/* Radial glow behind logo */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)",
                transform: "scale(1.5)",
                opacity: logoGlow,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Mid mountain layer - main peaks with detail */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[50vh]"
          style={{ y: prefersReducedMotion ? 0 : mountainMidY }}
        >
          <svg
            viewBox="0 0 1440 500"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <linearGradient id="mountainMidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#16162a" />
                <stop offset="100%" stopColor="#0c0c16" />
              </linearGradient>
              {/* Snow caps */}
              <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Main mountain shapes */}
            <path
              d="M0,500 L0,380 L100,350 L200,400 L300,300 L400,350 L500,220 L620,300 L720,150 L820,280 L920,200 L1020,320 L1120,250 L1220,380 L1320,300 L1440,350 L1440,500 Z"
              fill="url(#mountainMidGradient)"
            />
            {/* Snow caps on peaks */}
            <path
              d="M720,150 L680,200 L760,200 Z"
              fill="url(#snowGradient)"
            />
            <path
              d="M500,220 L470,260 L530,260 Z"
              fill="url(#snowGradient)"
            />
            <path
              d="M920,200 L890,240 L950,240 Z"
              fill="url(#snowGradient)"
            />
          </svg>
        </motion.div>

        {/* Front mountain layer - closest, darkest silhouettes */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[45vh] z-20"
          style={{ y: prefersReducedMotion ? 0 : mountainFrontY }}
        >
          <svg
            viewBox="0 0 1440 450"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <linearGradient id="mountainFrontGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d0d15" />
                <stop offset="100%" stopColor="#080810" />
              </linearGradient>
            </defs>
            <path
              d="M0,450 L0,350 L80,380 L180,320 L280,360 L380,280 L480,330 L580,250 L680,300 L780,220 L880,290 L980,230 L1080,310 L1180,260 L1280,340 L1380,280 L1440,320 L1440,450 Z"
              fill="url(#mountainFrontGradient)"
            />
            {/* Tree silhouettes on ridgeline */}
            <g fill="#050508">
              {Array.from({ length: 30 }).map((_, i) => {
                const x = 50 + i * 48;
                const baseHeight = 380 - Math.sin((i * 0.5 + x * 0.01)) * 80;
                const treeHeight = 15 + Math.random() * 25;
                return (
                  <path
                    key={i}
                    d={`M${x},${baseHeight} L${x - 6},${baseHeight} L${x},${baseHeight - treeHeight} L${x + 6},${baseHeight} Z`}
                  />
                );
              })}
            </g>
          </svg>
          {/* Fog/mist at the base */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </motion.div>

        {/* SLOGAN - Shelf reveal animation */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="text-center px-4 mt-32 sm:mt-40">
            {/* Main slogan with shelf reveal */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 sm:gap-x-4 sm:gap-y-2 max-w-4xl mx-auto">
              {sloganWords.map((word, index) => {
                // Stagger the reveal based on scroll progress
                const startReveal = 0.15 + index * 0.05;
                const endReveal = startReveal + 0.1;

                const wordOpacity = useTransform(
                  smoothProgress,
                  [startReveal, endReveal, 0.7, 0.85],
                  [0, 1, 1, 0]
                );
                const wordY = useTransform(
                  smoothProgress,
                  [startReveal, endReveal],
                  [60, 0]
                );
                const wordRotate = useTransform(
                  smoothProgress,
                  [startReveal, endReveal],
                  [index % 2 === 0 ? -10 : 10, 0]
                );

                const isHighlight = word === "Connection." || word === "Story." || word === "Conversation";
                const isAtATime = word === "at" || word === "a" || word === "Time.";

                return (
                  <motion.span
                    key={index}
                    className={`
                      inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold
                      ${isHighlight ? "text-primary" : isAtATime ? "text-primary/80" : "text-foreground"}
                      ${word === "Time." ? "block w-full mt-2" : ""}
                    `}
                    style={{
                      opacity: prefersReducedMotion ? 1 : wordOpacity,
                      y: prefersReducedMotion ? 0 : wordY,
                      rotateX: prefersReducedMotion ? 0 : wordRotate,
                      textShadow: isHighlight
                        ? "0 0 30px rgba(0,217,255,0.5), 0 0 60px rgba(0,217,255,0.3)"
                        : "none",
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>

            {/* Subtitle that fades in after slogan */}
            <motion.p
              className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
              style={{
                opacity: useTransform(smoothProgress, [0.5, 0.6, 0.7, 0.85], [0, 1, 1, 0]),
                y: useTransform(smoothProgress, [0.5, 0.6], [30, 0]),
              }}
            >
              A mental health community that feels like a late night talk with your best friend
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-sm text-muted-foreground/70 tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Ambient particles floating up */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: "-10%",
              }}
              animate={{
                y: [0, -window.innerHeight * 1.2],
                opacity: [0, 0.6, 0],
                x: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollRevealLanding;
