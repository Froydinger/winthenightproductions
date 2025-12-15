import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";
import Header from "@/components/Header";
import FeaturesSection from "@/components/FeaturesSection";
import WatchLatestSection from "@/components/WatchLatestSection";
import CommunitySection from "@/components/CommunitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Lander = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Slower spring for mobile - more buttery and readable
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 50 : 100,
    damping: isMobile ? 40 : 30,
    restDelta: 0.001,
  });

  // MOBILE: Much slower, spread-out animations so content is readable
  // DESKTOP: Original faster timing

  // Logo animation
  const logoY = useTransform(
    smoothProgress,
    isMobile
      ? [0, 0.15, 0.35, 0.55] // Mobile: slower rise
      : [0, 0.12, 0.28, 0.45],
    isMobile
      ? ["30vh", "10vh", "-10vh", "-20vh"]
      : ["40vh", "20vh", "-5vh", "-15vh"]
  );
  const logoScale = useTransform(
    smoothProgress,
    isMobile ? [0, 0.25, 0.45] : [0, 0.18, 0.32],
    [0.6, 0.95, 1.05]
  );
  const logoOpacity = useTransform(
    smoothProgress,
    isMobile
      ? [0, 0.08, 0.18, 0.75, 0.9] // Mobile: stays visible longer
      : [0, 0.06, 0.14, 0.85, 1],
    [0, 0, 1, 1, 0]
  );

  // Mountain parallax - reduced on mobile for performance
  const mountainBackY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "20%" : "40%"]);
  const mountainMidY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "30%" : "60%"]);
  const mountainFrontY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "40%" : "80%"]);

  // Stars parallax
  const starsY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "20%" : "50%"]);
  const starsOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  // Blur edge
  const blurEdgeOpacity = useTransform(
    smoothProgress,
    isMobile ? [0.8, 0.95] : [0.7, 0.85],
    [0, 1]
  );

  // Scroll indicator - hides faster on mobile since they're scrolling
  const scrollIndicatorOpacity = useTransform(
    smoothProgress,
    isMobile ? [0, 0.08] : [0, 0.15],
    [1, 0]
  );

  // Slogan reveal timing - MUCH slower on mobile
  const sloganLine1Opacity = useTransform(
    smoothProgress,
    isMobile ? [0.15, 0.28, 0.75, 0.88] : [0.18, 0.28, 0.9, 1],
    [0, 1, 1, 0]
  );
  const sloganLine1Y = useTransform(
    smoothProgress,
    isMobile ? [0.15, 0.28] : [0.18, 0.28],
    [40, 0]
  );

  const sloganLine2Opacity = useTransform(
    smoothProgress,
    isMobile ? [0.22, 0.35, 0.75, 0.88] : [0.24, 0.34, 0.9, 1],
    [0, 1, 1, 0]
  );
  const sloganLine2Y = useTransform(
    smoothProgress,
    isMobile ? [0.22, 0.35] : [0.24, 0.34],
    [40, 0]
  );

  const sloganLine3Opacity = useTransform(
    smoothProgress,
    isMobile ? [0.30, 0.43, 0.75, 0.88] : [0.30, 0.40, 0.9, 1],
    [0, 1, 1, 0]
  );
  const sloganLine3Y = useTransform(
    smoothProgress,
    isMobile ? [0.30, 0.43] : [0.30, 0.40],
    [40, 0]
  );

  const ctaButtonOpacity = useTransform(
    smoothProgress,
    isMobile ? [0.40, 0.52, 0.75, 0.88] : [0.38, 0.48, 0.9, 1],
    [0, 1, 1, 0]
  );
  const ctaButtonY = useTransform(
    smoothProgress,
    isMobile ? [0.40, 0.52] : [0.38, 0.48],
    [20, 0]
  );

  // Generate fewer stars on mobile for performance
  const stars = useRef(
    Array.from({ length: isMobile ? 80 : 200 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 70,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }))
  ).current;

  // Disable parallax completely when reduced motion is preferred
  const disableParallax = prefersReducedMotion;

  // Hero blur - happens first (0.7 to 0.85)
  const heroBlur = useTransform(
    smoothProgress,
    [0.7, 0.85],
    [0, 20]
  );

  // Hero visibility - fades out after blur (0.85 to 1)
  const heroOpacity = useTransform(
    smoothProgress,
    [0.85, 1],
    [1, 0]
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* ===== SECTION 1: SCROLL-REVEAL HERO ===== */}
        {/* Scroll tracking container - invisible, just for measuring scroll progress */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: isMobile ? "400vh" : "350vh" }}
        />

        {/* Fixed hero viewport - stays pinned to screen, blurs then fades based on scroll */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden pointer-events-none"
          style={{
            opacity: heroOpacity,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
            zIndex: 10,
          }}
      >
        {/* Re-enable pointer events for interactive elements */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Top blur edge for smooth transition */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-32 sm:h-40 z-50 pointer-events-none backdrop-blur-sm"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.5) 50%, transparent 100%)",
              opacity: blurEdgeOpacity,
            }}
          />

          {/* Starfield background */}
          <motion.div
            className="absolute inset-0"
            style={{
              y: disableParallax ? 0 : starsY,
              opacity: starsOpacity
            }}
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
                  animation: isMobile ? undefined : `twinkle ${star.duration}s ease-in-out infinite`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
            {/* Nebula glow effects - smaller on mobile */}
            <div className="absolute top-1/4 left-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-neon-blue/5 rounded-full blur-[80px] sm:blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-48 sm:w-[400px] h-48 sm:h-[400px] bg-neon-purple/8 rounded-full blur-[60px] sm:blur-[100px]" />
          </motion.div>

          {/* Aurora effect - simpler on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute inset-x-0 top-0 h-2/3 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(0,217,255,0.08) 20%, rgba(157,78,221,0.04) 50%, transparent 100%)",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Back mountain layer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[60vh] sm:h-[70vh]"
            style={{ y: disableParallax ? 0 : mountainBackY }}
          >
            <svg viewBox="0 0 1440 700" className="absolute bottom-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
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
            className="absolute bottom-0 left-0 right-0 h-[50vh] sm:h-[55vh]"
            style={{ y: disableParallax ? 0 : mountainMidY }}
          >
            <svg viewBox="0 0 1440 550" className="absolute bottom-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
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
              <path d="M680,200 L650,250 L710,250 Z" fill="url(#snowGrad)" />
              <path d="M480,280 L455,320 L505,320 Z" fill="url(#snowGrad)" />
              <path d="M880,240 L855,280 L905,280 Z" fill="url(#snowGrad)" />
            </svg>
          </motion.div>

          {/* LOGO - dead simple centering */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              y: disableParallax ? 0 : logoY,
              scale: disableParallax ? 1 : logoScale,
              opacity: disableParallax ? 1 : logoOpacity,
            }}
          >
            <div className="relative -mt-[5vh] sm:-mt-[18vh]">
              <div className="absolute -inset-8 sm:-inset-10 rounded-full bg-neon-blue/20 blur-[40px] sm:blur-[60px]" />
              <img
                src={logoImage}
                alt="Win The Night Productions"
                className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]"
              />
            </div>
          </motion.div>

          {/* SLOGAN */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 mt-[12vh] sm:mt-[15vh] px-4">
            <div className="text-center space-y-1 sm:space-y-2">
              <motion.div style={{ opacity: sloganLine1Opacity, y: sloganLine1Y }}>
                <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight font-extralight">
                  One <span className="font-bold">Connection.</span>
                </span>
              </motion.div>

              <motion.div style={{ opacity: sloganLine2Opacity, y: sloganLine2Y }}>
                <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight font-extralight">
                  One <span className="font-bold">Story.</span>
                </span>
              </motion.div>

              <motion.div style={{ opacity: sloganLine3Opacity, y: sloganLine3Y }}>
                <span
                  className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary tracking-tight font-extralight"
                  style={{ textShadow: "0 0 20px rgba(0,217,255,0.5), 0 0 40px rgba(0,217,255,0.3)" }}
                >
                  One <span className="font-bold">Conversation</span> at a Time.
                </span>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="pt-5 sm:pt-8"
                style={{ opacity: ctaButtonOpacity, y: ctaButtonY }}
              >
                <Button
                  asChild
                  size={isMobile ? "default" : "lg"}
                  className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-110 animate-glow-pulse text-sm sm:text-lg font-bold px-5 py-4 sm:px-8 sm:py-6 rounded-xl sm:rounded-2xl"
                >
                  <a href="/watch" className="flex items-center gap-2 sm:gap-3">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                    Watch Now
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Front mountain layer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[40vh] sm:h-[45vh] z-30"
            style={{ y: disableParallax ? 0 : mountainFrontY }}
          >
            <svg viewBox="0 0 1440 450" className="absolute bottom-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
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
              {/* Trees only on desktop for performance */}
              {!isMobile && (
                <g fill="#040408">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const x = 30 + i * 36;
                    const baseY = 380 - Math.sin(i * 0.3 + x * 0.005) * 60;
                    const height = 12 + (i % 3) * 8;
                    return <path key={i} d={`M${x},${baseY} L${x - 5},${baseY} L${x},${baseY - height} L${x + 5},${baseY} Z`} />;
                  })}
                </g>
              )}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-background via-background/90 to-transparent" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <span
                className="text-base sm:text-xl md:text-2xl text-foreground/80 tracking-wide"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/60" />
              </motion.div>
            </div>
          </motion.div>

          {/* Floating particles - desktop only */}
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/40"
                  style={{ left: `${15 + Math.random() * 70}%`, bottom: "-5%" }}
                  animate={{
                    y: [0, -800],
                    opacity: [0, 0.7, 0],
                    x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: 12 + Math.random() * 6,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

        {/* Content sections from main page */}
        <div className="relative z-10">
          <div id="features" className="scroll-mt-8">
            <FeaturesSection />
          </div>
          <div id="latest-videos">
            <WatchLatestSection />
          </div>
          <div id="community">
            <CommunitySection />
          </div>
          <div id="cta">
            <CTASection />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Lander;
