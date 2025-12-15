import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Youtube, ChevronDown } from "lucide-react";

const Lander = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

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

  // Logo animation - starts hidden behind mountains, rises to just above slogan
  const logoY = useTransform(smoothProgress, [0, 0.15, 0.35, 0.5], ["45vh", "25vh", "0vh", "-10vh"]);
  const logoScale = useTransform(smoothProgress, [0, 0.2, 0.4], [0.7, 1, 1.1]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.5, 0.65], [0, 0, 1, 1, 0]);

  // Mountain parallax layers (different speeds for depth)
  const mountainBackY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const mountainMidY = useTransform(smoothProgress, [0, 1], ["0%", "60%"]);
  const mountainFrontY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);

  // Stars parallax
  const starsY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const starsOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  // Slogan - appears BELOW the logo with proper staggered timing
  const sloganLines = [
    { text: "One Connection.", delay: 0.2 },
    { text: "One Story.", delay: 0.28 },
    { text: "One Conversation at a Time.", delay: 0.36 },
  ];

  // Overall section fade out
  const sectionOpacity = useTransform(smoothProgress, [0.65, 0.85], [1, 0]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  // Generate stars with consistent positions
  const stars = useRef(
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 70,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }))
  ).current;

  return (
    <main className="min-h-screen bg-background">
      {/* Scroll-driven landing section */}
      <div ref={containerRef} className="relative" style={{ height: "350vh" }}>
        {/* Sticky viewport */}
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ opacity: sectionOpacity }}
        >
          {/* Starfield background */}
          <motion.div
            className="absolute inset-0"
            style={{ y: prefersReducedMotion ? 0 : starsY, opacity: starsOpacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a18] to-[#0f0f20]" />
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  opacity: star.opacity,
                  animation: `twinkle ${star.duration}s ease-in-out infinite`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
            {/* Nebula glow effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-purple/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-neon-blue/3 rounded-full blur-[80px]" />
          </motion.div>

          {/* Aurora effect */}
          <motion.div
            className="absolute inset-x-0 top-0 h-2/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,217,255,0.08) 20%, rgba(157,78,221,0.04) 50%, transparent 100%)",
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Back mountain layer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[70vh]"
            style={{ y: prefersReducedMotion ? 0 : mountainBackY }}
          >
            <svg
              viewBox="0 0 1440 700"
              className="absolute bottom-0 w-full h-full"
              preserveAspectRatio="xMidYMax slice"
            >
              <defs>
                <linearGradient id="mountainBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a1a2e" />
                  <stop offset="100%" stopColor="#0d0d18" />
                </linearGradient>
              </defs>
              <path
                d="M0,700 L0,400 L150,350 L300,380 L400,300 L520,350 L620,250 L720,320 L820,220 L920,300 L1020,240 L1120,310 L1220,270 L1320,340 L1440,300 L1440,700 Z"
                fill="url(#mountainBackGrad)"
              />
            </svg>
          </motion.div>

          {/* Mid mountain layer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[55vh]"
            style={{ y: prefersReducedMotion ? 0 : mountainMidY }}
          >
            <svg
              viewBox="0 0 1440 550"
              className="absolute bottom-0 w-full h-full"
              preserveAspectRatio="xMidYMax slice"
            >
              <defs>
                <linearGradient id="mountainMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#141428" />
                  <stop offset="100%" stopColor="#0a0a14" />
                </linearGradient>
                <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M0,550 L0,400 L80,380 L180,420 L280,340 L380,380 L480,280 L580,340 L680,200 L780,300 L880,240 L980,340 L1080,280 L1180,380 L1280,320 L1380,380 L1440,360 L1440,550 Z"
                fill="url(#mountainMidGrad)"
              />
              {/* Snow caps */}
              <path d="M680,200 L650,250 L710,250 Z" fill="url(#snowGrad)" />
              <path d="M480,280 L455,320 L505,320 Z" fill="url(#snowGrad)" />
              <path d="M880,240 L855,280 L905,280 Z" fill="url(#snowGrad)" />
            </svg>
          </motion.div>

          {/* LOGO - Starts behind mountains, rises to just above slogan */}
          <motion.div
            className="absolute left-1/2 z-10 -translate-x-1/2 flex flex-col items-center"
            style={{
              top: "10%",
              y: prefersReducedMotion ? 0 : logoY,
              scale: prefersReducedMotion ? 1 : logoScale,
              opacity: prefersReducedMotion ? 1 : logoOpacity,
            }}
          >
            {/* Glow backdrop */}
            <motion.div
              className="absolute -inset-10 rounded-full bg-neon-blue/20 blur-[60px]"
              style={{
                opacity: useTransform(smoothProgress, [0.15, 0.35], [0, 0.8]),
              }}
            />
            <img
              src={logoImage}
              alt="Win The Night Productions"
              className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_0_40px_rgba(0,217,255,0.5)]"
            />
          </motion.div>

          {/* SLOGAN - Positioned below the logo area, revealed line by line */}
          <div className="absolute inset-x-0 top-[55%] sm:top-[52%] z-20 flex flex-col items-center px-4">
            <div className="text-center space-y-2 sm:space-y-3">
              {sloganLines.map((line, index) => {
                const startReveal = line.delay;
                const endReveal = startReveal + 0.12;

                return (
                  <motion.div
                    key={index}
                    className="overflow-hidden"
                    style={{
                      opacity: useTransform(
                        smoothProgress,
                        [startReveal, endReveal, 0.55, 0.7],
                        [0, 1, 1, 0]
                      ),
                      y: useTransform(smoothProgress, [startReveal, endReveal], [50, 0]),
                    }}
                  >
                    <span
                      className={`block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight ${
                        index === 2 ? "text-primary" : "text-foreground"
                      }`}
                      style={{
                        textShadow:
                          index === 2
                            ? "0 0 30px rgba(0,217,255,0.6), 0 0 60px rgba(0,217,255,0.3)"
                            : "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

{/* CTA Button */}
            <motion.div
              className="mt-6 sm:mt-8"
              style={{
                opacity: useTransform(smoothProgress, [0.45, 0.55, 0.6, 0.7], [0, 1, 1, 0]),
                y: useTransform(smoothProgress, [0.45, 0.55], [20, 0]),
              }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-110 animate-glow-pulse text-base sm:text-lg font-bold px-6 py-5 sm:px-8 sm:py-6 rounded-2xl"
              >
                <a
                  href="https://youtube.com/@winthenight?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Youtube className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Subscribe on YouTube
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Front mountain layer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[45vh] z-30"
            style={{ y: prefersReducedMotion ? 0 : mountainFrontY }}
          >
            <svg
              viewBox="0 0 1440 450"
              className="absolute bottom-0 w-full h-full"
              preserveAspectRatio="xMidYMax slice"
            >
              <defs>
                <linearGradient id="mountainFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0c0c18" />
                  <stop offset="100%" stopColor="#060610" />
                </linearGradient>
              </defs>
              <path
                d="M0,450 L0,360 L60,380 L160,340 L260,370 L360,310 L460,350 L560,290 L660,330 L760,270 L860,320 L960,280 L1060,340 L1160,300 L1260,360 L1360,320 L1440,350 L1440,450 Z"
                fill="url(#mountainFrontGrad)"
              />
              {/* Tree silhouettes */}
              <g fill="#040408">
                {Array.from({ length: 40 }).map((_, i) => {
                  const x = 30 + i * 36;
                  const baseY = 380 - Math.sin(i * 0.3 + x * 0.005) * 60;
                  const height = 12 + (i % 3) * 8;
                  return (
                    <path
                      key={i}
                      d={`M${x},${baseY} L${x - 5},${baseY} L${x},${baseY - height} L${x + 5},${baseY} Z`}
                    />
                  );
                })}
              </g>
            </svg>
            {/* Fog at base */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/90 to-transparent" />
          </motion.div>

          {/* Scroll indicator - dead center, serif font */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <div className="flex flex-col items-center gap-4">
              <span
                className="text-lg sm:text-xl md:text-2xl text-foreground/80 tracking-wide"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-8 h-8 text-foreground/60" />
              </motion.div>
            </div>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  bottom: "-5%",
                }}
                animate={{
                  y: [0, -800],
                  opacity: [0, 0.7, 0],
                  x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-background">
        <CTASection />
        <Footer />
      </div>
    </main>
  );
};

export default Lander;
