import {
  LifeBuoy,
  Phone,
  MessageSquare,
  AlertTriangle,
  HeartHandshake,
  ShieldAlert,
  Stethoscope,
  Rainbow,
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
    { name: "988 Suicide & Crisis Lifeline", meta: "24/7 emotional support", href: "https://988lifeline.org" },
    { name: "Crisis Text Line", meta: "Text HOME to 741741", href: "https://www.crisistextline.org/" },
    { name: "SAMHSA Disaster Distress Hotline", meta: "Support after disasters", href: "https://www.samhsa.gov/find-help/disaster-distress-helpline" },
    { name: "National Domestic Violence Hotline", meta: "800-799-7233", href: "https://www.thehotline.org/" },
    { name: "RAINN Sexual Assault Hotline", meta: "800-656-4673", href: "https://www.rainn.org/" },
    { name: "LGBT National Help Center", meta: "Peer support", href: "https://www.lgbthotline.org/" },
    { name: "The Trevor Project", meta: "LGBTQ youth crisis", href: "https://www.thetrevorproject.org/" },
    { name: "Trans Lifeline", meta: "By and for trans people", href: "https://translifeline.org/" },
    { name: "StrongHearts Native Helpline", meta: "Culturally sensitive help", href: "https://strongheartshelpline.org/" },
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

  return (
    <PageShell>
      <PageHero
        icon={LifeBuoy}
        eyebrow="Crisis & Care"
        title={
          <>
            Crisis{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Resources
            </span>
          </>
        }
        lede="A vetted directory of independent organizations offering live support, peer connection, and recovery tools."
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
            The resources below are independent, trusted organizations. We are not taking
            submissions at this time. Thank you for your consideration!
          </p>
        </SiteCard>

        <ResourceSection
          icon={AlertTriangle}
          eyebrow="Emergency"
          title="Crisis management"
          accent="yellow"
          resources={crisis}
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
