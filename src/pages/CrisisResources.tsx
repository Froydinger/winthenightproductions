import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
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
  Plus
} from "lucide-react";

type Resource = {
  name: string;
  meta: string;
  href: string;
  desc?: string;
};

const CrisisResources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    { name: "How to Sleep Better (CDC)", meta: "Evidence-based sleep tips", href: "https://www.cdc.gov/sleep/about/index.html" },
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
    { name: "Find local services", meta: "Affordable care near you", href: "https://findtreatment.gov/" },
  ];

  const survivors: Resource[] = [
    { name: "RAINN", meta: "Resources and hotline", href: "https://www.rainn.org/" },
    { name: "Childhelp Child Abuse Hotline", meta: "800-4-A-CHILD", href: "https://www.childhelp.org/childhelp-hotline/" },
    { name: "SAKITTA Kit Initiative", meta: "Kit testing guidance", href: "https://sakitta.org/" },
    { name: "StrongHearts Native Helpline", meta: "Support for survivors", href: "https://strongheartshelpline.org/" },
  ];

  const cancer: Resource[] = [
    { name: "ACS Patient Programs", meta: "ACS Support", href: "https://www.cancer.org/" },
    { name: "ACS 24/7 Helpline", meta: "800-227-2345", href: "tel:8002272345" },
    { name: "Mesothelioma Support", meta: "Mental health and guidance", href: "https://mesothelioma.net/" },
  ];

  const lgbtq: Resource[] = [
    { name: "Trans Lifeline", meta: "By and for trans people", href: "https://translifeline.org/" },
    { name: "LGBT National Help Center", meta: "Peer support", href: "https://www.lgbthotline.org/" },
    { name: "The Trevor Project", meta: "Youth crisis intervention", href: "https://www.thetrevorproject.org/" },
  ];

  const careGuides = [
    {
      q: "I need help right now. Where do I go first?",
      a: "If you feel at risk of harming yourself or someone else, call or text 988 in the U.S. If there is immediate physical danger, call emergency services. If you are outside the U.S., use Find A Helpline to locate local crisis support.",
      links: [
        { label: "Call 988", href: "tel:988" },
        { label: "Text 988", href: "sms:988" },
        { label: "Global helplines", href: "https://findahelpline.com/" },
      ],
    },
    {
      q: "I need affordable therapy or treatment.",
      a: "Start with FindTreatment.gov for confidential mental health and substance use treatment search, Open Path for lower-cost therapy, and NAMI for peer support and navigation help.",
      links: [
        { label: "FindTreatment.gov", href: "https://findtreatment.gov/" },
        { label: "Open Path", href: "https://openpathcollective.org/" },
        { label: "NAMI HelpLine", href: "https://www.nami.org/nami-helpline/" },
      ],
    },
    {
      q: "I'm not in crisis, but I need to talk.",
      a: "Use a warmline or peer support option when you need a human before things become an emergency. These are better fits for loneliness, anxiety, overwhelm, or needing to say the thing out loud.",
      links: [
        { label: "Warmline directory", href: "https://warmline.org/" },
        { label: "NAMI HelpLine", href: "https://www.nami.org/nami-helpline/" },
        { label: "Crisis Text Line", href: "https://www.crisistextline.org/" },
      ],
    },
    {
      q: "I'm helping someone else.",
      a: "If they may be in danger, stay with them if you can and contact crisis support. If you are trying to learn what to say, use 988 guidance, NAMI family resources, and Mental Health First Aid.",
      links: [
        { label: "988 loved ones guide", href: "https://988lifeline.org/help-yourself/loved-ones/" },
        { label: "NAMI family support", href: "https://www.nami.org/Support-Education/Support-Groups/NAMI-Family-Support-Group" },
        { label: "Mental Health First Aid", href: "https://www.mentalhealthfirstaid.org/" },
      ],
    },
  ];

  const stats = [
    {
      stat: "23.1%",
      label: "of U.S. adults — roughly 59 million people — experienced a mental illness in the past year.",
      source: "SAMHSA NSDUH",
    },
    {
      stat: "1 in 6",
      label: "U.S. youth ages 6–17 experience a mental health disorder each year.",
      source: "NAMI",
    },
    {
      stat: "48,824",
      label: "suicide deaths reported in the U.S. in 2024. The number of people thinking about or attempting suicide is much higher.",
      source: "CDC",
    },
  ];

  const faqs = [
    {
      q: "I think I might be in crisis. What counts as a crisis?",
      a: "If you're thinking about ending your life, hurting yourself or someone else, or feel overwhelmed and unsafe — that's a crisis. You don't need to be in immediate danger to call. 988 is for anyone in emotional distress, including loneliness, panic, grief, or substance-related thoughts.",
    },
    {
      q: "What's the difference between a hotline and a warmline?",
      a: "Hotlines (like 988) are staffed 24/7 for active crisis. Warmlines are peer-run lines for support — when you're lonely, anxiety-filled, or just need to talk to someone who gets it. Find one at warmline.org.",
    },
    {
      q: "How do I find a therapist I can actually afford?",
      a: "Start with FindTreatment.gov for low-cost and sliding-scale providers, Open Path Collective for $40–$70 sessions, or your local community mental health center. Many therapists offer reduced-fee sliding scale slots.",
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
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">Support & Resources</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              CARE & CRISIS <span className="text-[#10b981]">RESOURCES</span>
            </h1>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed">
              A living hub of vetted organizations, tools, and answers for anyone navigating mental health — for yourself or someone you love.
            </p>
          </div>

          {/* Urgent Call Block - Green Urgency */}
          <ScrollReveal animation="scale-in">
            <div className="bg-[#050f05] border border-[#10b981]/30 p-8 sm:p-12 rounded text-center space-y-6">
              <div className="inline-flex w-12 h-12 rounded border border-[#10b981]/40 items-center justify-center text-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.2)] mx-auto animate-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Need help now?</h2>
              <p className="text-xs text-[#888] max-w-md mx-auto leading-relaxed">
                Reach support immediately. Help is free, confidential, and available 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                <a
                  href="sms:988"
                  className="bg-[#10b981] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-4 rounded shadow-[0_0_16px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 flex-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  Text 988
                </a>
                <a
                  href="tel:988"
                  className="border-2 border-[#10b981] hover:bg-[#10b981]/10 text-[#10b981] hover:text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded transition-all flex items-center justify-center gap-2 flex-1"
                >
                  <Phone className="w-4 h-4" />
                  Call 988
                </a>
              </div>
              <p className="text-[10px] text-[#555] uppercase tracking-wider">
                UK users dial 111
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Grid - Green Accents */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#10b981] mb-2 mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Why care matters</h2>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map((s, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                  <div className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#10b981]/20 rounded p-6 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="font-bebas text-3xl text-[#10b981] tracking-wider mb-2">{s.stat}</div>
                      <p className="text-[10px] text-[#555] leading-relaxed mb-4">{s.label}</p>
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-[#333] pt-2 border-t border-[#111]">
                      Source: {s.source}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <hr className="border-[#1a1a1a]" />

          {/* Start-here guide cards */}
          <section className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">Start here</p>
              <h2 className="font-bebas text-3xl sm:text-5xl tracking-wider text-white">Find the right door</h2>
              <p className="text-sm text-[#666] max-w-2xl leading-relaxed">
                These are practical routes through the resource list, built around what someone might actually need in the moment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {careGuides.map((guide, idx) => (
                <ScrollReveal key={guide.q} animation="fade-up" delay={idx * 80}>
                  <article className="rounded border border-[#123c2c] bg-[#06110d] p-6 sm:p-7 space-y-5 h-full">
                    <div className="flex items-start justify-between gap-5 border-b border-[#123c2c]/70 pb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">{guide.q}</h3>
                      <HelpCircle className="w-5 h-5 shrink-0 text-[#10b981]" />
                    </div>
                    <p className="text-sm text-[#777] leading-relaxed">{guide.a}</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="rounded border border-[#10b981]/30 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#10b981] transition-colors hover:border-[#10b981] hover:bg-[#10b981]/10"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <hr className="border-[#1a1a1a]" />

          {/* Resource sections */}
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">Resource library</p>
              <h2 className="font-bebas text-3xl sm:text-5xl tracking-wider text-white">Helpful links by need</h2>
            </div>
            <ResourceList icon={LifeBuoy} title="Crisis lines & immediate support" resources={crisis} />
            <ResourceList icon={Brain} title="General mental health support" resources={mentalHealth} />
            <ResourceList icon={BookOpen} title="Self-care toolkit & free tools" resources={selfCare} />
            <ResourceList icon={Users} title="Resources for family & loved ones" resources={loved} />
            <ResourceList icon={HeartHandshake} title="Addiction & recovery care" resources={recovery} />
            <ResourceList icon={ShieldAlert} title="Sexual assault & violence survivors" resources={survivors} />
            <ResourceList icon={Stethoscope} title="Cancer care & support" resources={cancer} />
            <ResourceList icon={Rainbow} title="LGBTQ+ community support" resources={lgbtq} />
          </div>

          <hr className="border-[#1a1a1a]" />

          {/* FAQs Accordion */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#10b981] mb-2 mx-auto">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Frequently asked questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                  <details className="group rounded border border-[#1a1a1a] bg-[#0d0d0d] p-5 transition-colors hover:border-[#10b981]/20">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4 select-none">
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {f.q}
                      </h3>
                      <span className="text-[#10b981] text-lg leading-none mt-0.5 transition-transform group-open:rotate-45">
                        <Plus className="w-4 h-4" />
                      </span>
                    </summary>
                    <p className="text-xs text-[#555] leading-relaxed mt-3 pt-3 border-t border-[#111]">{f.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <p className="text-center text-[10px] text-[#555] uppercase tracking-wider">
            Last updated June 2026. If a resource is outdated,{" "}
            <a href="/contact" className="text-[#00d9ff] underline">
              let us know
            </a>
            .
          </p>

        </div>

        <Footer />
      </main>
    </>
  );
};

interface ResourceListProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  resources: Resource[];
}

const ResourceList = ({ icon: Icon, title, resources }: ResourceListProps) => {
  return (
    <ScrollReveal animation="fade-in" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-[#111] pb-3">
        <Icon className="w-5 h-5 text-[#10b981]" />
        <h2 className="font-bebas text-2xl tracking-wider text-white">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r, i) => (
          <a
            key={i}
            href={r.href}
            target={r.href.startsWith("http") ? "_blank" : undefined}
            rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block p-5 border border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#10b981]/30 rounded transition-all group text-left"
          >
            <h3 className="text-xs font-bold text-white mb-2 group-hover:text-[#10b981] transition-colors leading-snug">
              {r.name}
            </h3>
            <p className="text-[10px] uppercase tracking-wider text-[#555] font-sans">
              {r.meta}
            </p>
          </a>
        ))}
      </div>
    </ScrollReveal>
  );
};

export default CrisisResources;
