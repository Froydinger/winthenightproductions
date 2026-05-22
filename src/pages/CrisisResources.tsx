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
      {/* Emergency hero — red urgency tier */}
      <section className="relative px-4 pt-20 pb-8 sm:pt-24">
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
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Need help <span className="text-red-400">now?</span>
            </h1>
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

      <div className="container mx-auto max-w-4xl px-4 pb-20 space-y-12 sm:space-y-16">
        <SiteCard>
          <p className="text-foreground/75 leading-relaxed">
            The resources below are independent, trusted organizations. We are not taking
            submissions at this time. Thank you for your consideration!
          </p>
        </SiteCard>

        <ResourceSection
          icon={AlertTriangle}
          iconColorCls="text-red-400"
          eyebrow="Emergency"
          title="Crisis management"
          accent="red"
          resources={crisis}
        />

        <ResourceSection
          icon={HeartHandshake}
          eyebrow="Recovery"
          title="Addiction & recovery"
          resources={recovery}
        />

        <ResourceSection
          icon={ShieldAlert}
          eyebrow="Survivors"
          title="Sexual assault & violence"
          resources={survivors}
        />

        <ResourceSection
          icon={Stethoscope}
          eyebrow="Cancer care"
          title="Cancer patients & families"
          resources={cancer}
        />

        <ResourceSection
          icon={Rainbow}
          eyebrow="LGBTQ+"
          title="LGBTQ+ resources"
          resources={lgbtq}
        />
      </div>
    </PageShell>
  );
};

function ResourceSection({
  icon,
  iconColorCls,
  eyebrow,
  title,
  resources,
  accent = "blue",
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColorCls?: string;
  eyebrow: string;
  title: string;
  resources: Resource[];
  accent?: "blue" | "red";
}) {
  const isRed = accent === "red";
  const cardBorder = isRed
    ? "border-red-500/30 hover:border-red-400/70 hover:shadow-[0_0_30px_-12px_rgba(239,68,68,0.5)]"
    : "border-neon-blue/15 hover:border-neon-blue/50 hover:shadow-[0_0_30px_-12px_rgba(0,217,255,0.5)]";
  const metaCls = isRed ? "text-red-300/80" : "text-neon-blue/80";

  return (
    <section aria-label={title}>
      <SectionHeader icon={icon as never} eyebrow={eyebrow} title={title} iconColorCls={iconColorCls} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {resources.map((r, i) => (
          <a
            key={`${r.name}-${i}`}
            href={r.href}
            target={r.href.startsWith("http") ? "_blank" : undefined}
            rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`group rounded-2xl border ${cardBorder} bg-background/60 p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:bg-background/80 focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2`}
          >
            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mb-1">
              {r.name}
            </h3>
            <p className={`text-xs font-semibold uppercase tracking-wider ${metaCls}`}>{r.meta}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default CrisisResources;
