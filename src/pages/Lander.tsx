import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.png";
import skyBackground from "@/assets/lander/skybackground.png";
import mountainsBack from "@/assets/lander/mountains-back.png";
import mountainsFront from "@/assets/lander/mountains-front.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Youtube, Play, ArrowRight, ChevronDown } from "lucide-react";
import { useYouTubeVideos } from "@/hooks/use-youtube-feed";
import { defaultSiteSettings, fetchSiteSettings } from "@/lib/site-settings";
import { StatCard } from "@/components/magazine/StatCard";
import { CyanRule, Rule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NewsletterDialog } from "@/components/NewsletterSubscribe";

const Lander = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [settings, setSettings] = useState(defaultSiteSettings);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activePlayId, setActivePlayId] = useState<string | null>(null);

  useEffect(() => {
    fetchSiteSettings().then(setSettings);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const { videos: latestVideos, isLoading: isPlaylistLoading } = useYouTubeVideos(3);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : (isMobile ? 50 : 100),
    damping: prefersReducedMotion ? 1000 : (isMobile ? 40 : 30),
    restDelta: 0.001,
  });

  // Background drift type animation
  const bgTypeY = useTransform(smoothProgress, [0, 0.5], ["-50%", "-35%"]);
  const bgTypeScale = useTransform(smoothProgress, [0, 0.5], [1, 1.15]);
  const bgTypeOpacity = useTransform(smoothProgress, [0, 0.4], [0.07, 0]);

  // Center logo animations
  const logoY = useTransform(smoothProgress, [0, 0.5], ["-60%", "-85%"]);
  const logoScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);

  // Mountain parallax animations
  const skyY = useTransform(smoothProgress, [0, 0.5], ["0%", "4%"]);
  const mountainBackY = useTransform(smoothProgress, [0, 0.5], ["0%", "10%"]);
  const mountainFrontY = useTransform(smoothProgress, [0, 0.5], ["0%", "3%"]);

  // Bottom text scroll animations
  const textOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.35], ["0%", "-15px"]);

  const sloganOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const [slashActive, setSlashActive] = useState(false);

  useEffect(() => {
    // Trigger slash animation on load
    const t = setTimeout(() => setSlashActive(true), 200);
    return () => clearTimeout(t);
  }, []);

  const episodesToShow = latestVideos;

  const handleEpisodePlay = (videoId: string) => {
    setSelectedVideo(videoId);
    setActivePlayId(videoId);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
        
        {/* ===== SECTION 1: SCROLL-DRIVEN HERO VIEWPORT ===== */}
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden z-10 bg-black">
          
          {/* Sky Background */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              y: prefersReducedMotion ? 0 : skyY,
            }}
          >
            <img
              src={skyBackground}
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
              loading="eager"
            />
            {/* Subtle blue tint matching design */}
            <div className="absolute inset-0 bg-[#00d9ff]/10 mix-blend-overlay" />
          </motion.div>

          {/* Drifting Background text */}
          <motion.div
            className="absolute top-1/2 left-1/2 font-bebas text-[clamp(12rem,25vw,22rem)] text-transparent pointer-events-none select-none z-1 tracking-widest whitespace-nowrap"
            style={{
              x: "-50%",
              y: prefersReducedMotion ? "-50%" : bgTypeY,
              scale: prefersReducedMotion ? 1 : bgTypeScale,
              opacity: prefersReducedMotion ? 0.07 : bgTypeOpacity,
              WebkitTextStroke: "1px rgba(255,255,255,0.07)"
            }}
            aria-hidden="true"
          >
            WIN
          </motion.div>

          {/* Cyan Diagonal Slash */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-2" aria-hidden="true">
            <div className={`hero-slash-element ${slashActive ? 'active' : ''}`} />
          </div>

          {/* Midground Mountains (behind logo) */}
          <motion.div
            className="absolute left-0 right-0 z-5 pointer-events-none"
            style={{
              bottom: isMobile ? "-12vh" : "-18vh",
              y: prefersReducedMotion ? 0 : mountainBackY,
            }}
            aria-hidden="true"
          >
            <img
              src={mountainsBack}
              alt=""
              className="w-full h-auto min-w-full object-cover object-bottom brightness-[0.35]"
              style={{ minWidth: "120%", left: "-10%" }}
              loading="eager"
            />
          </motion.div>

          {/* Center Logo with Pulse Rings */}
          <motion.div
            className="absolute top-[35%] left-1/2 flex flex-col items-center gap-4 z-10 pointer-events-none"
            style={{
              x: "-48.2%",
              y: prefersReducedMotion ? "-50%" : logoY,
              scale: prefersReducedMotion ? 1 : logoScale,
              opacity: prefersReducedMotion ? 1 : logoOpacity,
            }}
          >
            <div className="relative w-72 h-72 sm:w-[21rem] sm:h-[21rem]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00d9ff]/40 animate-logo-ring-grow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00d9ff]/40 animate-logo-ring-grow [animation-delay:1s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00d9ff]/40 animate-logo-ring-grow [animation-delay:2s]" />
              <img
                src={logoImage}
                alt="Win The Night Moon Logo"
                className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.9)] drop-shadow-[0_0_60px_rgba(0,217,255,0.5)]"
              />
            </div>
          </motion.div>

          {/* Foreground Mountains */}
          <motion.div
            className="absolute left-0 right-0 z-20 pointer-events-none"
            style={{
              bottom: isMobile ? "-20vh" : "-30vh",
              y: prefersReducedMotion ? 0 : mountainFrontY,
            }}
            aria-hidden="true"
          >
            <img
              src={mountainsFront}
              alt=""
              className="w-full h-auto min-w-full object-cover object-bottom brightness-[0.5]"
              style={{ minWidth: "120%", left: "-10%" }}
              loading="eager"
            />
            {/* Fade bottom edge into background black */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/95 to-transparent" />
          </motion.div>

          {/* Hero Bottom text */}
          <motion.div
            className="absolute bottom-16 sm:bottom-24 left-0 right-0 px-6 sm:px-12 md:px-24 flex flex-col md:flex-row justify-between items-stretch md:items-end gap-8 z-30"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            <div className="w-full text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="font-bebas text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.85] tracking-wider text-white">
                  <span className="outline block text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.35)]">ONE</span>
                  CONVERSATION
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-4 font-serif text-lg sm:text-2xl text-white/95 leading-relaxed tracking-tight italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                One Connection. One Story.<br />
                <span className="text-[#00d9ff] font-medium not-italic">One Conversation at a Time.</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-4 mt-6"
              >
                <a
                  href="https://youtube.com/@winthenight?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded flex items-center gap-2 shadow-[0_0_16px_rgba(0,217,255,0.5)] transition-all"
                >
                  <Youtube className="w-4 h-4" />
                  Subscribe Now
                </a>
                <a
                  href="#episodes"
                  className="border border-[#3a3a3a] hover:border-white text-white font-semibold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-colors"
                >
                  Watch Episodes
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="ml-auto flex max-w-[17rem] flex-col items-end gap-3 text-right md:max-w-xs"
            >
              <p className="text-xs text-[#555] font-sans leading-relaxed">
                A mental health community built on real conversations, not highlight reels.
              </p>
              <div className="flex gap-2">
                {['youtube', 'instagram', 'tiktok'].map((platform) => (
                  <a
                    key={platform}
                    href={`https://${platform}.com/${platform === 'tiktok' ? '@winthenightpod' : platform === 'instagram' ? 'win_the_night' : '@winthenight'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-all"
                  >
                    <span className="text-[10px] uppercase font-bold">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Slogan line-by-line reveal when scrolling */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            style={{ opacity: sloganOpacity }}
          >
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#555]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans">Scroll down to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <CyanRule />

        {/* ===== SECTION 2: LATEST EPISODES ===== */}
        <section id="episodes" className="bg-[#0d0d0d] py-0 relative z-40">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] border-b border-[#1a1a1a]">
            
            {/* Left Sidebar column */}
            <div className="p-8 sm:p-16 border-r border-[#1a1a1a] flex flex-col justify-between items-center lg:items-start min-h-[300px] lg:min-h-[500px]">
              <div className="font-bebas text-7xl sm:text-8xl tracking-wider text-transparent select-none lg:[writing-mode:vertical-rl] lg:transform lg:rotate-180" style={{ WebkitTextStroke: "1.5px rgba(0,217,255,0.35)", textShadow: "0 0 12px rgba(0,217,255,0.1)" }}>
                LATEST
              </div>
              <a href="/watch" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00d9ff] hover:gap-3 transition-all mt-6 lg:mt-0">
                All episodes
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right Episodes column */}
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              {isPlaylistLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex flex-col md:flex-row gap-4 py-4 border-b border-[#1a1a1a]">
                      <div className="w-full md:w-40 aspect-video bg-white/5 rounded" />
                      <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-white/10 rounded w-1/4" />
                        <div className="h-6 bg-white/10 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : episodesToShow.length > 0 ? (
                episodesToShow.map((item, idx) => (
                  <ScrollReveal key={item.videoId} animation="fade-up" delay={idx * 150} className="w-full">
                    <div
                      onClick={() => handleEpisodePlay(item.videoId)}
                      className="ep-row-custom w-full text-left overflow-hidden"
                    >
                      {/* Thumbnail wrapper */}
                      <div className="relative w-full max-w-[22rem] md:max-w-none aspect-video bg-[#141414] rounded overflow-hidden group/thumb">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-full bg-[#00d9ff] flex items-center justify-center text-black shadow-lg">
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Content info */}
                      <div className="w-full min-w-0 flex-1">
                        <div className="font-bebas text-xs tracking-wider text-[#00d9ff] mb-1">
                          CHAPTER EP. {String(idx + 1).padStart(3, "0")}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white hover:text-[#00d9ff] transition-colors leading-snug line-clamp-2 break-words">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#555] font-sans mt-1 leading-relaxed line-clamp-2">
                          Start with our latest conversations on mental health, connection, and real life storytelling.
                        </p>
                      </div>

                      {/* Meta arrows */}
                      <div className="hidden sm:flex flex-col items-end gap-2 text-right">
                        <span className="text-[10px] text-[#555] tracking-wider uppercase font-sans">
                          {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <div className="text-lg text-[#3a3a3a] group-hover:text-[#00d9ff] transition-colors">
                          →
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              ) : (
                <div className="py-10 text-sm text-[#555]">
                  Latest episodes are loading from YouTube. Refresh in a moment if they do not appear.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: CONNECT / STATS ===== */}
        <section className="py-20 px-6 sm:px-10 bg-black">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left text column */}
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">About Win The Night</p>
              <h2 className="font-bebas text-5xl sm:text-7xl leading-[0.95] tracking-wide text-white">
                One <span className="font-playfair italic text-[#00d9ff]">connection</span><br />
                changes everything.
              </h2>
              <p className="text-sm text-[#555] font-sans leading-relaxed max-w-lg">
                We're a mental health community built on real conversations — not highlight reels. Every episode is an honest, unfiltered look at healing, inner child work, generational trauma, and what it means to be human.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/about"
                  className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-all"
                >
                  Learn About Us
                </a>
                <a
                  href="/guest"
                  className="border border-[#2a2a2a] hover:border-white text-white font-semibold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-colors"
                >
                  Be Our Guest
                </a>
              </div>
            </div>

            {/* Right counters column */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="1K+" label="Community members finding connection and healing" delay={0} />
              <StatCard value="52" label="Episodes of real, unfiltered conversations" delay={100} />
              <StatCard value="100%" label="Free. Always. No paywalls, no gatekeeping." delay={200} />
              <StatCard value="Real" label="Stories from people just like you" delay={300} />
            </div>
          </div>
        </section>

        <Rule />

        {/* ===== SECTION 5: EXPLORE GRID ===== */}
        <section className="py-20 px-6 sm:px-10 bg-[#0d0d0d]">
          <div className="max-w-[1400px] mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white">EXPLORE EVERYTHING</h2>
              <p className="text-xs text-[#555] uppercase tracking-[0.25em] font-sans max-w-md mx-auto">
                Navigate the foundation's resources & outlets
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { label: "Full Episodes", desc: "Long-form video chapters.", href: "/watch" },
                { label: "Listen", desc: "Weekly podcast audio.", href: "/listen" },
                { label: "Shorts", desc: "Quick key highlights.", href: "/watch" },
                { label: "Blog & Essays", desc: "Reflections from the team.", href: "/blog" },
                { label: "Be Our Guest", desc: "Share your own story.", href: "/guest" },
                { label: "Updates", desc: "Stay tuned for releases.", href: "/updates" },
                { label: "Our Mission", desc: "Why we make this.", href: "/about" },
                { label: "Crisis Info", desc: "Direct hotlines & support.", href: "/crisis-resources" },
              ].map((tile, idx) => (
                <ScrollReveal key={tile.label} animation="scale-in" delay={idx * 80}>
                  <a
                    href={tile.href}
                    className="group block rounded-lg border border-[#1a1a1a] bg-[#050505] p-6 sm:p-7 hover:border-[#00d9ff]/50 hover:shadow-[0_0_24px_rgba(0,217,255,0.15)] transition-all h-full"
                  >
                    <div className="text-base sm:text-lg font-bold text-[#00d9ff] uppercase tracking-wider mb-3 font-bebas">
                      {tile.label}
                    </div>
                    <p className="text-sm sm:text-base text-[#666] font-sans leading-relaxed">
                      {tile.desc}
                    </p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: NEWSLETTER BAR ===== */}
        <section className="bg-black py-16 px-6 sm:px-10 border-t border-[#1a1a1a]">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff] mb-1">Stay Connected</div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Get Updates Straight to Your Inbox</h2>
            </div>
            
            {/* Inline Substack Subscribe Dialog Trigger */}
            <NewsletterDialog>
              <button className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-8 py-4 rounded shadow-[0_0_16px_rgba(0,217,255,0.4)] transition-all">
                Subscribe to updates
              </button>
            </NewsletterDialog>
          </div>
        </section>

      </main>

      {/* Video Modal Player */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => {
        if (!open) {
          setSelectedVideo(null);
          setActivePlayId(null);
        }
      }}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-2xl">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#2a2a2a]">
            {selectedVideo && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Lander;
