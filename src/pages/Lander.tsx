import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Youtube, ChevronDown, Play, Heart, Users, Brain, Check, Sparkles } from "lucide-react";

const Lander = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const topicsInView = useInView(topicsRef, { once: true, margin: "-100px" });
  const communityInView = useInView(communityRef, { once: true, margin: "-100px" });

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

  // Logo animation - starts hidden behind mountains, rises to just above slogan (truly centered)
  const logoY = useTransform(smoothProgress, [0, 0.12, 0.28, 0.45], ["40vh", "20vh", "-5vh", "-15vh"]);
  const logoScale = useTransform(smoothProgress, [0, 0.18, 0.32], [0.6, 0.95, 1.05]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.06, 0.14, 0.85, 1], [0, 0, 1, 1, 0]);

  // Mountain parallax layers (different speeds for depth)
  const mountainBackY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const mountainMidY = useTransform(smoothProgress, [0, 1], ["0%", "60%"]);
  const mountainFrontY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);

  // Stars parallax
  const starsY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const starsOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  // Section scrolls up naturally - no fade out
  const sectionY = useTransform(smoothProgress, [0.6, 1], ["0vh", "-30vh"]);

  // Top blur edge appears as hero scrolls away
  const blurEdgeOpacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);

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

  // Features data
  const features = [
    {
      icon: Play,
      title: "Weekly Episodes",
      description: "New mental health content every week that feels like talking with a friend at night.",
      link: "/watch",
      linkText: "Watch Now",
    },
    {
      icon: Heart,
      title: "Real Stories",
      description: "Stories about loss, healing, and rediscovery. No fake positivity, just authentic experiences.",
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
      description: "A community that treats you like a human, not a project. You're welcome as you are.",
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

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ===== SECTION 1: SCROLL-REVEAL HERO ===== */}
      <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
        {/* Sticky viewport - scrolls up naturally */}
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ y: prefersReducedMotion ? 0 : sectionY }}
        >
          {/* Top blur edge for smooth transition */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-40 z-50 pointer-events-none backdrop-blur-sm"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.5) 50%, transparent 100%)",
              opacity: blurEdgeOpacity,
            }}
          />
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
            className="absolute bottom-0 left-0 right-0 h-[55vh]"
            style={{ y: prefersReducedMotion ? 0 : mountainMidY }}
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

          {/* LOGO - Starts behind mountains, rises to center just above slogan */}
          <motion.div
            className="absolute left-1/2 top-[38%] z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{
              y: prefersReducedMotion ? 0 : logoY,
              scale: prefersReducedMotion ? 1 : logoScale,
              opacity: prefersReducedMotion ? 1 : logoOpacity,
            }}
          >
            <motion.div
              className="absolute -inset-10 rounded-full bg-neon-blue/20 blur-[60px]"
              style={{ opacity: useTransform(smoothProgress, [0.15, 0.35], [0, 0.8]) }}
            />
            <img
              src={logoImage}
              alt="Win The Night Productions"
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_0_40px_rgba(0,217,255,0.5)]"
            />
          </motion.div>

          {/* SLOGAN */}
          <div className="absolute inset-x-0 top-[56%] sm:top-[54%] z-20 flex flex-col items-center px-4">
            <div className="text-center space-y-1 sm:space-y-2">
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0.18, 0.28, 0.9, 1], [0, 1, 1, 0]),
                  y: useTransform(smoothProgress, [0.18, 0.28], [50, 0]),
                }}
              >
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight font-extralight">
                  One <span className="font-bold">Connection.</span>
                </span>
              </motion.div>

              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0.24, 0.34, 0.9, 1], [0, 1, 1, 0]),
                  y: useTransform(smoothProgress, [0.24, 0.34], [50, 0]),
                }}
              >
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight font-extralight">
                  One <span className="font-bold">Story.</span>
                </span>
              </motion.div>

              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0.30, 0.40, 0.9, 1], [0, 1, 1, 0]),
                  y: useTransform(smoothProgress, [0.30, 0.40], [50, 0]),
                }}
              >
                <span
                  className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary tracking-tight font-extralight"
                  style={{ textShadow: "0 0 30px rgba(0,217,255,0.6), 0 0 60px rgba(0,217,255,0.3)" }}
                >
                  One <span className="font-bold">Conversation</span> at a Time.
                </span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="mt-6 sm:mt-8"
              style={{
                opacity: useTransform(smoothProgress, [0.38, 0.48, 0.9, 1], [0, 1, 1, 0]),
                y: useTransform(smoothProgress, [0.38, 0.48], [20, 0]),
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
              <g fill="#040408">
                {Array.from({ length: 40 }).map((_, i) => {
                  const x = 30 + i * 36;
                  const baseY = 380 - Math.sin(i * 0.3 + x * 0.005) * 60;
                  const height = 12 + (i % 3) * 8;
                  return <path key={i} d={`M${x},${baseY} L${x - 5},${baseY} L${x},${baseY - height} L${x + 5},${baseY} Z`} />;
                })}
              </g>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/90 to-transparent" />
          </motion.div>

          {/* Scroll indicator */}
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
                style={{ left: `${15 + Math.random() * 70}%`, bottom: "-5%" }}
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

      {/* ===== SECTION 2: WHAT WE'RE ABOUT (Features) ===== */}
      <section ref={featuresRef} className="relative py-24 px-4 bg-gradient-to-b from-background via-charcoal/20 to-background">
        {/* Parallax background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">What We're About</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              A different kind of mental health space—honest, introspective, and human.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/40 to-charcoal/30 backdrop-blur-sm border border-neon-blue/20 p-6 sm:p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <feature.icon className="w-7 h-7 text-neon-blue" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                  <Button
                    asChild
                    variant="outline"
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
      <section ref={topicsRef} className="relative py-24 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={topicsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/20 text-neon-blue text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Topics We Explore
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Why People Stay Connected</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Real conversations that matter. No algorithms. No highlight reels.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-card/30 to-charcoal/20 backdrop-blur-sm border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-500 hover:translate-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={topicsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-neon-blue transition-colors">
                  {topic.title}
                </h4>
                <p className="text-muted-foreground">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: COMMUNITY FEEL ===== */}
      <section ref={communityRef} className="relative py-24 px-4 bg-gradient-to-b from-background via-charcoal/10 to-background">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Main message */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={communityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                A mental health community that feels like a{" "}
                <span className="text-primary">late night talk.</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We're here to hold space for honest conversations about anxiety, trauma, creativity, and
                everything in between. You're welcome whether you're in the thick of it or just starting to
                ask questions about your own story.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={communityInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-neon-blue/30 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-blue group-hover:scale-110 transition-all duration-300">
                      <Check className="w-4 h-4 text-neon-blue group-hover:text-black" />
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual/CTA */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={communityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neon-blue/20 via-card/50 to-neon-purple/10 border border-neon-blue/30 p-8 sm:p-12">
                {/* Glow effects */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-neon-blue/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-[60px]" />

                <div className="relative z-10 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <Youtube className="w-10 h-10 text-neon-blue" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-foreground mb-2">Join 1k+ others</p>
                    <p className="text-muted-foreground">finding connection and healing</p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-neon-strong transition-all duration-500 hover:scale-105 font-bold py-6 rounded-xl"
                  >
                    <a
                      href="https://youtube.com/@winthenight?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Subscribe Free
                    </a>
                  </Button>

                  <p className="text-sm text-muted-foreground">
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
