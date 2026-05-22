import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";
import skyBackground from "@/assets/lander/skybackground.png";
import mountainsBack from "@/assets/lander/mountains-back.png";
import mountainsFront from "@/assets/lander/mountains-front.png";
import Header from "@/components/Header";
import WatchLatestSection from "@/components/WatchLatestSection";
import HomeShortsSection from "@/components/HomeShortsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AboutContentSection from "@/components/AboutContentSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ChevronDown } from "lucide-react";
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
      ? ["30vh", "10vh", "-5vh", "-10vh"]
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

  // Mountain parallax - subtle effect to keep mountains visible throughout
  const mountainBackY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "8%" : "30%"]);
  const mountainFrontY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "12%" : "40%"]);

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

  const scrollCalloutOpacity = useTransform(
    smoothProgress,
    isMobile ? [0.43, 0.52, 0.75, 0.88] : [0.40, 0.50, 0.9, 1],
    [0, 1, 1, 0]
  );
  const scrollCalloutY = useTransform(
    smoothProgress,
    isMobile ? [0.43, 0.52] : [0.40, 0.50],
    [20, 0]
  );

  // Disable parallax completely when reduced motion is preferred
  const disableParallax = prefersReducedMotion;

  // Hero blur - happens later on wide screens, earlier on mobile
  // This gives more time to view the hero section before it starts fading
  const heroBlur = useTransform(
    smoothProgress,
    isMobile ? [0.75, 0.9] : [0.8, 0.95],
    [0, 20]
  );

  // Hero visibility - fades out after blur
  // Delayed to give the section more breathing room
  const heroOpacity = useTransform(
    smoothProgress,
    isMobile ? [0.9, 1] : [0.95, 1],
    [1, 0]
  );

  // Background fade in as hero fades out
  const backgroundOpacity = useTransform(
    smoothProgress,
    isMobile ? [0.85, 1] : [0.9, 1],
    [0, 1]
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
          style={{ height: isMobile ? "350vh" : "300vh" }}
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
        {/* Re-enable pointer events for interactive elements - stays active even when fading */}
        <div className="absolute inset-0 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
          {/* Top blur edge for smooth transition */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-32 sm:h-40 z-50 pointer-events-none backdrop-blur-sm"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.5) 50%, transparent 100%)",
              opacity: blurEdgeOpacity,
            }}
          />

          {/* Sky background - darker with blue tint */}
          <div className="absolute inset-0">
            <img
              src={skyBackground}
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
              loading="lazy"
              decoding="async"
            />
            {/* Neon blue tint overlay */}
            <div className="absolute inset-0 bg-neon-blue/15 mix-blend-overlay" />
          </div>

          {/* Back mountain layer - starts higher, darkened more */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: isMobile ? "360vh" : "280vh",
              y: disableParallax ? 0 : mountainBackY,
              bottom: isMobile ? "18vh" : "22vh"
            }}
          >
            <img
              src={mountainsBack}
              alt=""
              className="absolute bottom-0 w-full h-auto min-w-full object-cover object-bottom brightness-[0.3]"
              style={{ minWidth: '120%', left: '-10%' }}
              loading="lazy"
              decoding="async"
            />
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

              {/* Scroll to learn more callout */}
              <motion.div
                className="pt-3 sm:pt-12 pb-0 sm:pb-20"
                style={{ opacity: scrollCalloutOpacity, y: scrollCalloutY }}
              >
                <motion.div
                  className="flex flex-col items-center gap-2 text-foreground/70"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm sm:text-base" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Scroll down to learn more</span>
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Front mountain layer - larger on mobile to hide bottom edge */}
          <motion.div
            className="absolute left-0 right-0 z-30"
            style={{
              height: isMobile ? "300vh" : "200vh",
              y: disableParallax ? 0 : mountainFrontY,
              bottom: isMobile ? "-3vh" : "0vh"
            }}
          >
            <img
              src={mountainsFront}
              alt=""
              className="absolute bottom-0 w-full h-auto min-w-full object-cover object-bottom brightness-[0.5]"
              style={{
                minWidth: isMobile ? '170%' : '120%',
                left: isMobile ? '-35%' : '-10%'
              }}
              loading="lazy"
              decoding="async"
            />
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

          {/* Floating particles - desktop only, reduced for performance */}
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/40 will-change-transform"
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
          {/* Animated starry background - behind all content, fades in smoothly */}
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: backgroundOpacity }}
          >
            <AnimatedBackground />
          </motion.div>

          {/* Invisible buffer spacer - gives user time to scroll before content appears */}
          <div className="h-32 sm:h-48" />

          <div id="latest-videos" className="relative z-10">
            <WatchLatestSection />
          </div>
          <div id="shorts" className="relative z-10">
            <HomeShortsSection />
          </div>
          <AboutContentSection />
          <div id="cta" className="relative z-10">
            <CTASection />
          </div>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Lander;
