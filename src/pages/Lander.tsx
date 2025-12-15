import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Youtube, ChevronDown, Play, Heart, Users, Brain, Check, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Lander = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });
  const topicsInView = useInView(topicsRef, { once: true, margin: "-50px" });
  const communityInView = useInView(communityRef, { once: true, margin: "-50px" });

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

  // Features data
  const features = [
    {
      icon: Play,
      title: "Weekly Episodes",
      description: "Mental health content that feels like talking with a friend at night.",
      link: "/watch",
      linkText: "Watch Now",
    },
    {
      icon: Heart,
      title: "Real Stories",
      description: "Stories about loss, healing, and rediscovery. No fake positivity.",
      link: "/guest",
      linkText: "Share Yours",
    },
    {
      icon: Brain,
      title: "Practical Tools",
      description: "Blog posts and mental wellness tools to support your journey.",
      link: "/blog",
      linkText: "Read Blog",
    },
    {
      icon: Users,
      title: "Community",
      description: "A community that treats you like a human. You're welcome as you are.",
      link: "/updates",
      linkText: "Join Us",
    },
  ];

  // Topics data
  const topics = [
    { title: "Inner Child Work", description: "Deep dives into healing childhood wounds and understanding patterns." },
    { title: "Generational Trauma", description: "Exploring how family history shapes our present and future." },
    { title: "Healing Journey", description: "Practical frameworks for navigating your own path to wholeness." },
  ];

  // Community benefits
  const benefits = [
    "No fake positivity, just real stories",
    "Supportive, introspective community",
    "Episodes that feel like talking with a friend",
  ];

  // Disable parallax completely when reduced motion is preferred
  const disableParallax = prefersReducedMotion;

  return (
    <main className="min-h-screen bg-background">
      {/* ===== SECTION 1: SCROLL-REVEAL HERO ===== */}
      {/* Tall scroll container - sticky child stays fixed while we scroll through this */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: isMobile ? "400vh" : "350vh" }}
      >
        {/* Sticky viewport - stays pinned while scrolling through parent */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
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

          {/* LOGO */}
          <motion.div
            className="absolute left-1/2 top-[32%] sm:top-[35%] z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{
              y: disableParallax ? 0 : logoY,
              scale: disableParallax ? 1 : logoScale,
              opacity: disableParallax ? 1 : logoOpacity,
            }}
          >
            <motion.div
              className="absolute -inset-8 sm:-inset-10 rounded-full bg-neon-blue/20 blur-[40px] sm:blur-[60px]"
              style={{ opacity: useTransform(smoothProgress, [0.15, 0.35], [0, 0.8]) }}
            />
            <img
              src={logoImage}
              alt="Win The Night Productions"
              className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]"
            />
          </motion.div>

          {/* SLOGAN */}
          <div className="absolute inset-x-0 top-[52%] sm:top-[54%] z-20 flex flex-col items-center px-4">
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
            </div>

            {/* CTA Button */}
            <motion.div
              className="mt-5 sm:mt-8"
              style={{ opacity: ctaButtonOpacity, y: ctaButtonY }}
            >
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-110 animate-glow-pulse text-sm sm:text-lg font-bold px-5 py-4 sm:px-8 sm:py-6 rounded-xl sm:rounded-2xl"
              >
                <a
                  href="https://youtube.com/@winthenight?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                  Subscribe on YouTube
                </a>
              </Button>
            </motion.div>
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
      </div>

      {/* ===== SECTION 2: WHAT WE'RE ABOUT ===== */}
      <section ref={featuresRef} className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-background via-charcoal/20 to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-neon-blue/10 rounded-full blur-[100px] sm:blur-[150px]" />
          <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-neon-purple/10 rounded-full blur-[100px] sm:blur-[150px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground">What We're About</h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              A different kind of mental health space—honest, introspective, and human.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/40 to-charcoal/30 backdrop-blur-sm border border-neon-blue/20 p-5 sm:p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-neon"
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-neon-blue" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>

                  <Button
                    asChild
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20 hover:border-neon-blue transition-all"
                  >
                    <a href={feature.link}>{feature.linkText}</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: TOPICS WE EXPLORE ===== */}
      <section ref={topicsRef} className="relative py-16 sm:py-24 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-neon-blue/5 rounded-full blur-[100px] sm:blur-[150px]" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 40 }}
            animate={topicsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-neon-blue/20 text-neon-blue text-xs sm:text-sm font-medium mb-2 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Topics We Explore
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground">Why People Stay Connected</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Real conversations that matter. No algorithms. No highlight reels.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                className="group relative p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-card/30 to-charcoal/20 backdrop-blur-sm border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-500 hover:translate-x-2 sm:hover:translate-x-4"
                initial={{ opacity: 0, x: -30 }}
                animate={topicsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-neon-blue transition-colors">
                  {topic.title}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: COMMUNITY FEEL ===== */}
      <section ref={communityRef} className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-background via-charcoal/10 to-background">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left - Main message */}
            <motion.div
              className="space-y-5 sm:space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={communityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                A mental health community that feels like a{" "}
                <span className="text-primary">late night talk.</span>
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We're here to hold space for honest conversations about anxiety, trauma, creativity, and
                everything in between.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={communityInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-neon-blue/30 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-blue group-hover:scale-110 transition-all duration-300">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-neon-blue group-hover:text-black" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground/90">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual/CTA */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={communityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-neon-blue/20 via-card/50 to-neon-purple/10 border border-neon-blue/30 p-6 sm:p-12">
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-neon-blue/20 rounded-full blur-[60px] sm:blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-neon-purple/20 rounded-full blur-[40px] sm:blur-[60px]" />

                <div className="relative z-10 text-center space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <Youtube className="w-8 h-8 sm:w-10 sm:h-10 text-neon-blue" />
                  </div>

                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Join 1k+ others</p>
                    <p className="text-sm sm:text-base text-muted-foreground">finding connection and healing</p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-neon-strong transition-all duration-500 hover:scale-105 font-bold py-5 sm:py-6 rounded-lg sm:rounded-xl"
                  >
                    <a
                      href="https://youtube.com/@winthenight?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Subscribe Free
                    </a>
                  </Button>

                  <p className="text-xs sm:text-sm text-muted-foreground">
                    New episodes drop weekly on YouTube
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CTA + FOOTER ===== */}
      <div className="relative z-10">
        <CTASection />
        <Footer />
      </div>
    </main>
  );
};

export default Lander;
