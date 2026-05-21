import { Link } from "react-router-dom";

/**
 * SEO + AI-readiness content block for the home page.
 * - Single descriptive H1 (the home page's only H1)
 * - Clean H2/H3 hierarchy
 * - 300+ words of readable body text
 * - Contextual internal links (in-prose, not just nav)
 * - External citation links to authoritative mental health sources
 * - FAQPage-style Q&A (with JSON-LD)
 */
const AboutContentSection = () => {
  const faqs = [
    {
      q: "What is Win The Night™?",
      a: "Win The Night™ is a mental health community built on authentic, long-form conversations about healing, trauma, generational patterns, and recovery. We publish weekly video episodes, short clips, a podcast, and written essays so that no one has to feel alone in the hardest parts of the night.",
    },
    {
      q: "Who is Win The Night for?",
      a: "Anyone navigating anxiety, depression, grief, addiction recovery, complex trauma, or the long work of healing — and the friends, partners, and families who love them. Our episodes are made for the person who wants honest stories instead of quick fixes.",
    },
    {
      q: "Where can I watch or listen?",
      a: "You can watch full episodes on our Watch page, browse short clips on the same page, listen on the Listen page, and read essays on the Blog. New conversations are released weekly.",
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

  return (
    <section
      id="about-win-the-night"
      className="relative z-10 px-4 py-12 sm:py-16"
      aria-labelledby="about-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-3xl text-foreground/90">
        {/* H1 stays visible (screen-reader + crawler primary signal) but kept subtle */}
        <h1
          id="about-heading"
          className="sr-only"
        >
          Win The Night™ — a mental health community for the long road of healing
        </h1>

        <details className="group rounded-2xl border border-neon-blue/20 bg-background/40 backdrop-blur-sm open:border-neon-blue/40 transition-colors">
          <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3 text-foreground hover:text-neon-blue transition-colors">
            <span className="text-sm sm:text-base font-medium">
              More info about Win The Night™
            </span>
            <span
              aria-hidden="true"
              className="text-neon-blue text-xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <div className="px-5 pb-6 pt-2 space-y-5">
        <p className="text-base leading-relaxed">
          Win The Night™ is a weekly conversation series and growing community
          for people doing the slow work of healing. We publish long-form video
          episodes, short clips, a podcast, and written essays — all centered
          on one idea: that real recovery happens through honest stories, not
          clean ones. If tonight is hard, we want you to feel a little less
          alone in it.
        </p>

        <p className="text-base leading-relaxed">
          You can start with the latest full episodes on our{" "}
          <Link to="/watch" className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80">
            Watch page
          </Link>
          , browse audio versions on{" "}
          <Link to="/listen" className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80">
            Listen
          </Link>
          , read essays on the{" "}
          <Link to="/blog" className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80">
            blog
          </Link>
          , or learn more about the mission and the people behind the show on{" "}
          <Link to="/about" className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80">
            About
          </Link>
          .
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          What we talk about
        </h2>
        <p className="text-lg leading-relaxed mb-5">
          Our episodes explore trauma recovery, generational patterns, inner
          child work, addiction and sobriety, grief, identity, and the
          everyday discipline of choosing to keep going. Guests include
          therapists, peer-support workers, artists, and ordinary people with
          extraordinary stories. We don't promise cures — we sit with the
          questions long enough to make them feel survivable.
        </p>
        <p className="text-lg leading-relaxed mb-10">
          If you want to share your own story, we'd love to hear it. Apply on
          the{" "}
          <Link to="/guest" className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80">
            Be Our Guest
          </Link>{" "}
          page, or join the conversation in our{" "}
          <Link to="/updates" className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80">
            community timeline
          </Link>
          .
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          If tonight is hard
        </h2>
        <p className="text-lg leading-relaxed mb-5">
          Win The Night™ is a community, not a clinical service. If you're in
          crisis right now, please reach out for live support. In the United
          States, you can call or text{" "}
          <a
            href="https://988lifeline.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80"
          >
            988 — the Suicide & Crisis Lifeline
          </a>
          . International readers can find a hotline through{" "}
          <a
            href="https://findahelpline.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80"
          >
            Find A Helpline
          </a>
          . For background on the conditions we discuss most often, the{" "}
          <a
            href="https://www.nimh.nih.gov/health/topics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80"
          >
            National Institute of Mental Health
          </a>{" "}
          and the{" "}
          <a
            href="https://www.who.int/health-topics/mental-health"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue underline underline-offset-4 hover:text-neon-blue/80"
          >
            World Health Organization
          </a>{" "}
          publish accessible, evidence-based overviews. We also keep a curated
          list of warmlines and peer-support options on our{" "}
          <Link to="/crisis-resources" className="text-red-400 underline underline-offset-4 hover:text-red-300">
            Crisis Resources
          </Link>{" "}
          page.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 mt-12">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {f.q}
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                {f.a}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Last updated{" "}
          <time dateTime="2026-05-21">May 21, 2026</time>.
        </p>
          </div>
        </details>
      </div>
    </section>
  );
};

export default AboutContentSection;
