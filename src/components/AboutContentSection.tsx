import { Link } from "react-router-dom";
import { Play, Headphones, BookOpen, LifeBuoy, MessageCircle, Users } from "lucide-react";

/**
 * AEO / SEO content block rendered visibly below the fold on the lander.
 * - Single visible H1 (the home page's only H1)
 * - Clean H1 → H2 → H3 hierarchy
 * - 400+ words of readable body text
 * - 7+ in-prose internal links (not just nav/footer)
 * - 4 external citations to authoritative mental health sources
 * - Visible FAQ + FAQPage JSON-LD
 * Styled to match Win The Night™ — dark, neon-blue accents, no backdrop-blur
 * (per project memory: backdrop-blur over AnimatedBackground hurts perf).
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

  const startTiles = [
    {
      to: "/watch",
      icon: Play,
      title: "Watch full episodes",
      desc: "Long-form conversations, organized by chapter.",
    },
    {
      to: "/listen",
      icon: Headphones,
      title: "Listen to the podcast",
      desc: "The same conversations, on the go.",
    },
    {
      to: "/blog",
      icon: BookOpen,
      title: "Read the blog",
      desc: "Essays and reflections from the team.",
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
      <div className="container mx-auto max-w-3xl text-foreground/90 space-y-10">
        {/* H1 — the only H1 on the lander */}
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

        {/* Intro card */}
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
            If you want to share your own story, apply on the{" "}
            <Link to="/guest" className={linkCls}>
              Be Our Guest
            </Link>{" "}
            page, or join the conversation in our{" "}
            <Link to="/updates" className={linkCls}>
              community timeline
            </Link>
            .
          </p>
        </div>

        {/* Where to start — tiles */}
        <div>
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-foreground mb-5 px-1">
            <Users className="w-6 h-6 text-neon-blue" />
            Where to start
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {startTiles.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border border-neon-blue/15 bg-background/60 p-5 hover:border-neon-blue/50 hover:bg-background/80 transition-all hover:-translate-y-0.5"
              >
                <t.icon className="w-6 h-6 text-neon-blue mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {t.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {t.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Crisis card with external citations */}
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

        {/* FAQ — visible, not collapsed */}
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
          Last updated{" "}
          <time dateTime="2026-05-22">May 22, 2026</time>.
        </p>
      </div>
    </section>
  );
};

export default AboutContentSection;
