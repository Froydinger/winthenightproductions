import {
  LifeBuoy,
  Phone,
  MessageSquare,
  AlertTriangle,
  HeartHandshake,
  ShieldAlert,
  Stethoscope,
  Rainbow,
  Brain,
  Users,
  BookOpen,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SiteCard } from "@/components/site/SiteCard";

type Resource = {
  name: string;
  meta: string;
  href: string;
};

const CrisisResources = () => {
  const crisis: Resource[] = [
    { name: "988 Suicide & Crisis Lifeline", meta: "Call or text 988 · 24/7", href: "https://988lifeline.org" },
    { name: "Crisis Text Line", meta: "Text HOME to 741741", href: "https://www.crisistextline.org/" },
    { name: "Veterans Crisis Line", meta: "Dial 988 then press 1", href: "https://www.veteranscrisisline.net/" },
    { name: "SAMHSA Disaster Distress Hotline", meta: "1-800-985-5990", href: "https://www.samhsa.gov/find-help/disaster-distress-helpline" },
    { name: "National Domestic Violence Hotline", meta: "800-799-7233", href: "https://www.thehotline.org/" },
    { name: "RAINN Sexual Assault Hotline", meta: "800-656-4673", href: "https://www.rainn.org/" },
    { name: "LGBT National Help Center", meta: "Peer support", href: "https://www.lgbthotline.org/" },
    { name: "The Trevor Project", meta: "LGBTQ youth crisis", href: "https://www.thetrevorproject.org/" },
    { name: "Trans Lifeline", meta: "By and for trans people", href: "https://translifeline.org/" },
    { name: "StrongHearts Native Helpline", meta: "1-844-762-8483", href: "https://strongheartshelpline.org/" },
    { name: "Find A Helpline (Global)", meta: "International directory", href: "https://findahelpline.com/" },
  ];

  const mentalHealth: Resource[] = [
    { name: "NAMI HelpLine", meta: "Call 1-800-950-6264 · M–F", href: "https://www.nami.org/help" },
    { name: "FindTreatment.gov", meta: "Free, confidential treatment finder", href: "https://findtreatment.gov/" },
    { name: "Mental Health America Screening", meta: "Free anonymous screens", href: "https://screening.mhanational.org/" },
    { name: "Psychology Today Therapist Finder", meta: "Filter by insurance & specialty", href: "https://www.psychologytoday.com/us/therapists" },
    { name: "Open Path Collective", meta: "Therapy from $40/session", href: "https://openpathcollective.org/" },
    { name: "Inclusive Therapists", meta: "Culturally responsive care", href: "https://www.inclusivetherapists.com/" },
    { name: "Therapy for Black Girls", meta: "Directory & community", href: "https://therapyforblackgirls.com/" },
    { name: "Therapy for Latinx", meta: "Latinx-affirming providers", href: "https://therapyforlatinx.com/" },
    { name: "Asian Mental Health Collective", meta: "AAPI provider directory", href: "https://www.asianmhc.org/" },
    { name: "NIMH Mental Health Topics", meta: "Evidence-based overviews", href: "https://www.nimh.nih.gov/health/topics" },
    { name: "WHO Mental Health", meta: "Global guidance & data", href: "https://www.who.int/health-topics/mental-health" },
    { name: "Warmline Directory", meta: "Non-crisis peer support lines", href: "https://warmline.org/" },
  ];

  const selfCare: Resource[] = [
    { name: "Insight Timer", meta: "Free meditation library", href: "https://insighttimer.com/" },
    { name: "How to Sleep Better (CDC)", meta: "Evidence-based sleep tips", href: "https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html" },
    { name: "Greater Good in Action", meta: "Research-backed practices", href: "https://ggia.berkeley.edu/" },
    { name: "Self-Compassion Exercises", meta: "Dr. Kristin Neff", href: "https://self-compassion.org/category/exercises/" },
    { name: "Grounding Techniques (Healthline)", meta: "5-4-3-2-1 and more", href: "https://www.healthline.com/health/grounding-techniques" },
    { name: "MoodTools (Free app)", meta: "CBT-based depression toolkit", href: "https://www.moodtools.org/" },
  ];

  const loved: Resource[] = [
    { name: "NAMI Family Support Group", meta: "Free peer-led groups", href: "https://www.nami.org/Support-Education/Support-Groups/NAMI-Family-Support-Group" },
    { name: "Mental Health First Aid", meta: "Learn to help someone in crisis", href: "https://www.mentalhealthfirstaid.org/" },
    { name: "How to Talk About Suicide (988)", meta: "Safe messaging guidelines", href: "https://988lifeline.org/help-yourself/loved-ones/" },
    { name: "Al-Anon Family Groups", meta: "For families of those with addiction", href: "https://al-anon.org/" },
  ];

  const recovery: Resource[] = [
    { name: "SAMHSA National Helpline", meta: "800-662-HELP", href: "https://www.samhsa.gov/find-help/national-helpline" },
    { name: "Alcoholics Anonymous", meta: "Find meetings", href: "https://www.aa.org/" },
    { name: "Narcotics Anonymous", meta: "Find meetings", href: "https://na.org/" },
    { name: "SMART Recovery", meta: "Science based tools", href: "https://www.smartrecovery.org/" },
    { name: "Find local mental health services", meta: "Affordable care near you", href: "https://findtreatment.gov/" },
  ];

  const survivors: Resource[] = [
    { name: "RAINN", meta: "Resources and hotline", href: "https://www.rainn.org/" },
    { name: "Childhelp National Child Abuse Hotline", meta: "800-4-A-CHILD", href: "https://www.childhelp.org/childhelp-hotline/" },
    { name: "SAKITTA Sexual Assault Kit Initiative", meta: "Kit testing guidance", href: "https://sakitta.org/" },
    { name: "StrongHearts Native Helpline", meta: "Support for survivors", href: "https://strongheartshelpline.org/" },
  ];

  const cancer: Resource[] = [
    { name: "Mental Health Guide", meta: "Patients and caregivers", href: "https://www.cancer.org/" },
    { name: "American Cancer Society Patient Programs", meta: "Comprehensive support", href: "https://www.cancer.org/" },
    { name: "American Cancer Society 24/7 Helpline", meta: "800-227-2345", href: "tel:8002272345" },
    { name: "Mesothelioma.net Support", meta: "Mental health and guidance", href: "https://mesothelioma.net/" },
  ];

  const lgbtq: Resource[] = [
    { name: "Trans Lifeline", meta: "By and for trans people", href: "https://translifeline.org/" },
    { name: "Human Rights Campaign Resources", meta: "Advocacy and support", href: "https://www.hrc.org/resources" },
    { name: "The Trevor Project", meta: "Youth crisis intervention", href: "https://www.thetrevorproject.org/" },
  ];

  const stats = [
    {
      stat: "1 in 5",
      label: "U.S. adults experience a mental illness each year.",
      source: "NAMI, 2024",
      href: "https://www.nami.org/mhstats",
    },
    {
      stat: "1 in 6",
      label: "U.S. youth ages 6–17 experience a mental health disorder each year.",
      source: "NAMI, 2024",
      href: "https://www.nami.org/mhstats",
    },
    {
      stat: "~50%",
      label: "of lifetime mental illness begins by age 14; 75% by age 24.",
      source: "NIMH",
      href: "https://www.nimh.nih.gov/health/statistics/mental-illness",
    },
    {
      stat: "49,000+",
      label: "lives lost to suicide in the U.S. in 2023 — about one every 11 minutes.",
      source: "CDC, 2024",
      href: "https://www.cdc.gov/suicide/facts/",
    },
    {
      stat: "12.8M",
      label: "U.S. adults seriously thought about suicide in the past year.",
      source: "SAMHSA NSDUH",
      href: "https://www.samhsa.gov/data/",
    },
    {
      stat: "55%",
      label: "of U.S. adults with a mental illness received no treatment last year.",
      source: "Mental Health America, 2024",
      href: "https://mhanational.org/issues/state-mental-health-america",
    },
  ];

  const faqs = [
    {
      q: "I think I might be in crisis. What counts as a crisis?",
      a: "If you're thinking about ending your life, hurting yourself or someone else, or feel overwhelmed and unsafe — that's a crisis. You don't need to be in immediate danger to call. 988 is for anyone in emotional distress, including loneliness, panic, grief, or substance-related thoughts. In the U.S., call or text 988 anytime.",
    },
    {
      q: "What's the difference between a hotline and a warmline?",
      a: "Hotlines (like 988) are staffed 24/7 for active crisis. Warmlines are peer-run lines for non-emergency support — when you're lonely, anxious, or just need to talk to someone who gets it. Find one at warmline.org.",
    },
    {
      q: "How do I find a therapist I can actually afford?",
      a: "Start with FindTreatment.gov for low-cost and sliding-scale providers, Open Path Collective for $40–$70 sessions, or your local community mental health center. If you have insurance, call the member services number on your card and ask for in-network providers. Many therapists offer reduced-fee 'sliding scale' slots — it's okay to ask.",
    },
    {
      q: "Is therapy online as effective as in person?",
      a: "Research consistently shows tele-therapy is comparable to in-person care for most common concerns including depression, anxiety, and PTSD. The relationship with your therapist matters more than the format. Pick what you'll actually show up for.",
    },
    {
      q: "Someone I love is struggling. How do I help without making it worse?",
      a: "Ask directly and listen without trying to fix. Phrases like 'I've noticed you seem off lately — how are you really doing?' open the door. Don't promise secrecy if safety is at risk. Take care of your own mental health too — see the resources for loved ones below.",
    },
    {
      q: "How do I ask someone if they're thinking about suicide?",
      a: "Ask directly: 'Are you thinking about suicide?' Research shows asking does not plant the idea — it often brings relief. If they say yes, stay with them, remove access to means if possible, and help them connect to 988 or a clinician. The 988 site has step-by-step guidance for loved ones.",
    },
    {
      q: "I can't afford care right now. What can I actually do tonight?",
      a: "Free options: call or text 988, use a warmline, try a free MHA screening to understand what you're feeling, download Insight Timer for guided meditations, or join a free NAMI peer support group. None of these replace professional care, but they're real first steps.",
    },
    {
      q: "Is Win The Night™ a treatment program?",
      a: "No. We're a storytelling community, not a clinical service. Episodes can help you feel less alone in the long work of healing, but they don't replace therapy, medication, or crisis support. If you're in danger, please use the resources on this page.",
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
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        icon={LifeBuoy}
        eyebrow="Care & Crisis"
        title={
          <>
            Care &amp; Crisis{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Resources
            </span>
          </>
        }
        lede="A living hub of vetted organizations, tools, and answers for anyone navigating mental health — for yourself or someone you love."
      />


      {/* Emergency card — red urgency tier, placed below hero */}
      <section className="relative px-4 pb-8">
        <div className="container mx-auto max-w-3xl">
          <SiteCard variant="alert" className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-red-500/30 blur-2xl" aria-hidden />
                <div className="relative p-3.5 rounded-2xl border border-red-400/50 bg-background/60">
                  <AlertTriangle className="w-9 h-9 text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Need help <span className="text-red-400">now?</span>
            </h2>
            <p className="text-foreground/75 mb-6">
              Reach support immediately. Free and available 24/7.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              role="group"
              aria-label="Call or text"
            >
              <a
                href="sms:988"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-lg shadow-[0_0_30px_-10px_rgba(239,68,68,0.8)] transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5" />
                Text 988
              </a>
              <a
                href="tel:988"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-red-400 text-red-100 hover:bg-red-500/20 font-bold text-lg transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call 988
              </a>
            </div>
            <p className="text-sm text-foreground/55 mt-4">
              <em>UK users dial 111</em>
            </p>
          </SiteCard>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 pb-20 space-y-12 sm:space-y-16">
        <SiteCard>
          <p className="text-foreground/75 leading-relaxed">
            The resources below are independent, trusted organizations curated by the
            Win The Night™ team. This page is informational and does not replace
            professional medical care. If you're in danger, please use the crisis
            options above.
          </p>
        </SiteCard>

        {/* Stats */}
        <section aria-label="Mental health by the numbers">
          <SectionHeader
            icon={Sparkles}
            eyebrow="By the numbers"
            title="Mental health in 2024"
            lede="You are not alone in this. The data below reflects current U.S. statistics from leading mental health organizations."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-neon-blue/15 bg-background/60 p-5 transition-all hover:-translate-y-0.5 hover:border-neon-blue/50 hover:bg-background/80 hover:shadow-[0_0_30px_-12px_rgba(0,217,255,0.5)]"
              >
                <div className="text-3xl sm:text-4xl font-bold text-neon-blue drop-shadow-[0_0_10px_rgba(0,217,255,0.45)] mb-2">
                  {s.stat}
                </div>
                <p className="text-sm text-foreground/80 leading-snug mb-2">{s.label}</p>
                <p className="text-xs uppercase tracking-wider text-foreground/50">
                  Source: {s.source}
                </p>
              </a>
            ))}
          </div>
        </section>

        <ResourceSection
          icon={AlertTriangle}
          eyebrow="Emergency"
          title="Crisis lines & immediate support"
          accent="yellow"
          resources={crisis}
        />

        <ResourceSection
          icon={Brain}
          eyebrow="General mental health"
          title="Find care, screenings & education"
          accent="blue"
          resources={mentalHealth}
        />

        <ResourceSection
          icon={BookOpen}
          eyebrow="Self-care toolkit"
          title="Free tools you can use tonight"
          accent="teal"
          resources={selfCare}
        />

        <ResourceSection
          icon={Users}
          eyebrow="For loved ones"
          title="Supporting someone who's struggling"
          accent="purple"
          resources={loved}
        />

        <ResourceSection
          icon={HeartHandshake}
          eyebrow="Recovery"
          title="Addiction & recovery"
          accent="purple"
          resources={recovery}
        />

        <ResourceSection
          icon={ShieldAlert}
          eyebrow="Survivors"
          title="Sexual assault & violence"
          accent="teal"
          resources={survivors}
        />

        <ResourceSection
          icon={Stethoscope}
          eyebrow="Cancer care"
          title="Cancer patients & families"
          accent="pink"
          resources={cancer}
        />

        <ResourceSection
          icon={Rainbow}
          eyebrow="LGBTQ+"
          title="LGBTQ+ resources"
          accent="rainbow"
          resources={lgbtq}
        />

        {/* FAQ */}
        <section aria-label="Frequently asked questions">
          <SectionHeader
            icon={HelpCircle}
            eyebrow="FAQ"
            title="Frequently asked questions"
            lede="Honest answers to the questions people most often ask us about care, crisis, and getting help."
          />
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-neon-blue/15 bg-background/60 p-5 transition-colors hover:border-neon-blue/40 open:border-neon-blue/50"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                    {f.q}
                  </h3>
                  <span className="text-neon-blue text-2xl leading-none mt-0.5 transition-transform group-open:rotate-45 select-none">
                    +
                  </span>
                </summary>
                <p className="text-foreground/80 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="text-center text-sm text-muted-foreground pt-2">
          Last updated <time dateTime="2026-06-03">June 3, 2026</time>. If a link is
          broken or you know of a resource we should add,{" "}
          <a href="/contact" className="text-neon-blue underline underline-offset-4">
            let us know
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
};

function ResourceSection({
  icon: Icon,
  eyebrow,
  title,
  resources,
  accent = "blue",
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  resources: Resource[];
  accent?: "blue" | "red" | "yellow" | "purple" | "teal" | "pink" | "rainbow";
}) {
  const isRainbow = accent === "rainbow";

  // Per-cause awareness palette. Each accent maps to a border, hover shadow,
  // meta text, and section icon color.
  const palette: Record<
    Exclude<typeof accent, "rainbow">,
    { border: string; meta: string; icon: string }
  > = {
    blue: {
      border:
        "border-neon-blue/15 hover:border-neon-blue/50 hover:shadow-[0_0_30px_-12px_rgba(0,217,255,0.5)]",
      meta: "text-neon-blue/80",
      icon: "text-neon-blue drop-shadow-[0_0_10px_rgba(0,217,255,0.55)]",
    },
    red: {
      border:
        "border-red-500/30 hover:border-red-400/70 hover:shadow-[0_0_30px_-12px_rgba(239,68,68,0.5)]",
      meta: "text-red-300/80",
      icon: "text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]",
    },
    // Suicide prevention = yellow/gold
    yellow: {
      border:
        "border-yellow-400/25 hover:border-yellow-300/70 hover:shadow-[0_0_30px_-12px_rgba(250,204,21,0.55)]",
      meta: "text-yellow-300/85",
      icon: "text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]",
    },
    // Addiction recovery = purple
    purple: {
      border:
        "border-purple-500/25 hover:border-purple-400/70 hover:shadow-[0_0_30px_-12px_rgba(168,85,247,0.55)]",
      meta: "text-purple-300/85",
      icon: "text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]",
    },
    // Sexual assault awareness = teal
    teal: {
      border:
        "border-teal-400/25 hover:border-teal-300/70 hover:shadow-[0_0_30px_-12px_rgba(45,212,191,0.55)]",
      meta: "text-teal-300/85",
      icon: "text-teal-300 drop-shadow-[0_0_10px_rgba(45,212,191,0.6)]",
    },
    // Cancer = pink
    pink: {
      border:
        "border-pink-400/25 hover:border-pink-300/70 hover:shadow-[0_0_30px_-12px_rgba(244,114,182,0.55)]",
      meta: "text-pink-300/85",
      icon: "text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]",
    },
  };

  const tone = isRainbow ? palette.blue : palette[accent];
  const cardBorder = isRainbow
    ? "border-transparent hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)]"
    : tone.border;
  const metaCls = isRainbow
    ? "bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
    : tone.meta;

  // Rainbow uses a gradient border via a wrapping background; cards keep dark interior.
  const rainbowWrap =
    "rounded-2xl p-[1.5px] bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 transition-all hover:-translate-y-0.5";

  const headerIconCls = isRainbow
    ? "text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]"
    : tone.icon;



  return (
    <section aria-label={title}>
      <SectionHeader
        icon={Icon as never}
        eyebrow={eyebrow}
        title={title}
        iconColorCls={headerIconCls}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {resources.map((r, i) => {
          const inner = (
            <a
              href={r.href}
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={
                isRainbow
                  ? "block rounded-2xl bg-background/85 p-4 sm:p-5 transition-colors hover:bg-background/95 focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
                  : `group block rounded-2xl border ${cardBorder} bg-background/60 p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:bg-background/80 focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2`
              }
            >
              <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mb-1">
                {r.name}
              </h3>
              <p className={`text-xs font-semibold uppercase tracking-wider ${metaCls}`}>
                {r.meta}
              </p>
            </a>
          );

          return isRainbow ? (
            <div key={`${r.name}-${i}`} className={rainbowWrap}>
              {inner}
            </div>
          ) : (
            <div key={`${r.name}-${i}`}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}


export default CrisisResources;
