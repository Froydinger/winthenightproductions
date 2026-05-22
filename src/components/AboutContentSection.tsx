import { Link } from "react-router-dom";
import {
  Play,
  Headphones,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  Users,
  Mic,
  Smartphone,
  Heart,
  Youtube,
  Instagram,
  NotebookPen,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

/**
 * Unified below-the-fold section for the lander.
 * Absorbs all unique links from the removed Community / Features / CTA
 * sections into one icon-led grid, while preserving AEO structure:
 * - Single H1 on the page
 * - H1 → H2 → H3 hierarchy, ~500 words
 * - 7+ internal links, 4 external citations
 * - Visible FAQ + FAQPage JSON-LD
 * - No backdrop-blur (perf w/ AnimatedBackground)
 */
const AboutContentSection = () => {
  const faqs = [
    {
      q: "What is Win The Night™?",
      a: "Win The Night™ is a mental health community built on authentic, long-form conversations about healing, trauma, generational patterns, and recovery. We publish weekly video episodes, short clips, a podcast, and written essays so that no one has to feel alone in the hardest parts of the night.",
    },
    {
      q: "Who is Win The Night™ for?",
      a: "Anyone navigating anxiety, depression, grief, addiction recovery, complex trauma, or the long work of healing — and the friends, partners, and families who love them. Our episodes are made for people who want honest stories instead of quick fixes.",
    },
    {
      q: "Where can I watch or listen?",
      a: "Full episodes live on the Watch page, audio versions on Listen, and written essays on the Blog. New conversations are released weekly across all three.",
    },
    {
      q: "How can I be a guest on the podcast?",
      a: "We're always looking for honest storytellers. Apply through the Be Our Guest page and our team will be in touch to schedule a discovery call.",
    },
    {
      q: "I'm in crisis right now — what should I do?",
      a: "If you're in immediate danger, call or text 988 (the U.S. Suicide & Crisis Lifeline) or your local emergency number. We also keep a vetted list of hotlines and warmlines on our Crisis Resources page.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const linkCls =
    "text-neon-blue underline underline-offset-4 decoration-neon-blue/40 hover:text-neon-blue/80 hover:decoration-neon-blue transition-colors";

  const cardCls =
    "rounded-2xl border border-neon-blue/15 bg-background/60 p-6 sm:p-8 shadow-[0_0_40px_-20px_rgba(0,217,255,0.25)]";

  type Tile = {
    href: string;
    external?: boolean;
    icon: typeof Play;
    title: string;
    desc: string;
  };

  const tiles: Tile[] = [
    { href: "/watch", icon: Play, title: "Full episodes", desc: "Long-form conversations." },
    { href: "/listen", icon: Headphones, title: "Podcast", desc: "Same stories, on the go." },
    { href: "#shorts", icon: Smartphone, title: "Shorts", desc: "Quick clips, vertical." },
    { href: "/blog", icon: BookOpen, title: "Essays", desc: "Reflections from the team." },
    { href: "/guest", icon: Mic, title: "Be our guest", desc: "Share your story." },
    { href: "/updates", icon: Users, title: "Community", desc: "Live timeline of updates." },
    { href: "/about", icon: Heart, title: "Our mission", desc: "Who we are, why we make this." },
    { href: "/crisis-resources", icon: LifeBuoy, title: "Crisis resources", desc: "Hotlines & warmlines." },
    {
      href: "https://youtube.com/@winthenight?sub_confirmation=1",
      external: true,
      icon: Youtube,
      title: "Subscribe",
      desc: "Follow on YouTube.",
    },
    {
      href: "https://instagram.com/win_the_night",
      external: true,
      icon: Instagram,
      title: "Instagram",
      desc: "Daily moments & clips.",
    },

  ];

  return (
    <section
      id="about-win-the-night"
      className="relative z-10 px-4 py-16 sm:py-24"
      aria-labelledby="about-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-4xl text-foreground/90 space-y-12">
        {/* H1 */}
        <header className="text-center space-y-4">
          <h1
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]"
          >
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Win The Night™
            </span>{" "}
            — a mental health community for the long road of healing
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Weekly long-form conversations about trauma, recovery, and the
            quiet work of healing — so the hardest nights feel a little less
            lonely.
          </p>
        </header>

        {/* Intro */}
        <div className={cardCls}>
          <p className="text-base sm:text-lg leading-relaxed">
            Win The Night™ is a weekly conversation series and growing
            community for people doing the slow work of healing. We publish
            long-form video episodes, short clips, a podcast, and written
            essays — all centered on one idea: that real recovery happens
            through honest stories, not clean ones. If tonight is hard, we
            want you to feel a little less alone in it. Start with the{" "}
            <Link to="/watch" className={linkCls}>
              latest full episodes
            </Link>
            , or read more about the mission and the people behind the show
            on{" "}
            <Link to="/about" className={linkCls}>
              our About page
            </Link>
            .
          </p>
        </div>

        {/* Explore everything — icon grid */}
        <div id="explore">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-foreground mb-5 px-1">
            <Users className="w-6 h-6 text-neon-blue" />
            Explore everything
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {tiles.map((t) => {
              const Icon = t.icon;
              const baseCls =
                "group relative rounded-2xl border border-neon-blue/15 bg-background/60 p-4 sm:p-5 hover:border-neon-blue/50 hover:bg-background/80 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_-12px_rgba(0,217,255,0.5)]";
              const inner = (
                <>
                  {t.external && (
                    <ArrowUpRight className="absolute top-2.5 right-2.5 w-3.5 h-3.5 text-foreground/40 group-hover:text-neon-blue transition-colors" />
                  )}
                  <Icon className="w-6 h-6 text-neon-blue mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/65 leading-snug">
                    {t.desc}
                  </p>
                </>
              );
              return t.external ? (
                <a
                  key={t.href}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseCls}
                >
                  {inner}
                </a>
              ) : t.href.startsWith("#") ? (
                <a key={t.href} href={t.href} className={baseCls}>
                  {inner}
                </a>
              ) : (
                <Link key={t.href} to={t.href} className={baseCls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>

        {/* What we talk about */}
        <div className={cardCls}>
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-foreground mb-4">
            <MessageCircle className="w-6 h-6 text-neon-blue" />
            What we talk about
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Our episodes explore trauma recovery, generational patterns,
            inner child work, addiction and sobriety, grief, identity, and
            the everyday discipline of choosing to keep going. Guests
            include therapists, peer-support workers, artists, and ordinary
            people with extraordinary stories. We don't promise cures — we
            sit with the questions long enough to make them feel survivable.
          </p>
        </div>

        {/* Crisis */}
        <div className={cardCls}>
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-foreground mb-4">
            <LifeBuoy className="w-6 h-6 text-red-400" />
            If tonight is hard
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Win The Night™ is a community, not a clinical service. If you're
            in crisis right now, please reach out for live support. In the
            United States, you can call or text{" "}
            <a
              href="https://988lifeline.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              988 — the Suicide &amp; Crisis Lifeline
            </a>
            . International readers can find a hotline through{" "}
            <a
              href="https://findahelpline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Find A Helpline
            </a>
            . For background on the conditions we discuss most often, the{" "}
            <a
              href="https://www.nimh.nih.gov/health/topics"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              National Institute of Mental Health
            </a>{" "}
            and the{" "}
            <a
              href="https://www.who.int/health-topics/mental-health"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              World Health Organization
            </a>{" "}
            publish accessible, evidence-based overviews. We also keep a
            curated list of warmlines and peer-support options on our{" "}
            <Link
              to="/crisis-resources"
              className="text-red-400 underline underline-offset-4 decoration-red-400/40 hover:text-red-300 hover:decoration-red-300 transition-colors"
            >
              Crisis Resources
            </Link>{" "}
            page.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className={cardCls}>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {f.q}
                </h3>
                <p className="text-base leading-relaxed text-foreground/80">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground pt-2">
          Last updated <time dateTime="2026-05-22">May 22, 2026</time>.
        </p>
      </div>
    </section>
  );
};

export default AboutContentSection;
