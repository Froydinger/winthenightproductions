import { Button } from "@/components/ui/button";
import { Scale, Shield, FileText, ArrowRight, Mail } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";

const Legal = () => {
  const docs = [
    {
      icon: Shield,
      title: "Privacy Policy",
      desc: "Learn how we collect, use, and protect your personal information. We are committed to maintaining the privacy and security of your data.",
      href: "/privacy",
      cta: "Read Privacy Policy",
    },
    {
      icon: FileText,
      title: "Terms of Service",
      desc: "Understand the terms and conditions that govern your use of our website and services. Please review these carefully.",
      href: "/terms",
      cta: "Read Terms of Service",
    },
  ];

  return (
    <PageShell>
      <PageHero
        icon={Scale}
        eyebrow="Legal"
        title={
          <>
            Legal{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Information
            </span>
          </>
        }
        lede="Learn about our policies, terms, and how we protect your privacy and data."
      />

      <div className="container mx-auto max-w-4xl px-4 pb-20 space-y-10">
        <div className="grid sm:grid-cols-2 gap-4">
          {docs.map((d) => (
            <SiteCard key={d.href} className="group flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <d.icon className="w-6 h-6 text-neon-blue" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{d.title}</h2>
              <p className="text-foreground/70 leading-relaxed mb-6 flex-1">{d.desc}</p>
              <Button
                asChild
                className="bg-neon-blue hover:bg-neon-blue/90 text-black w-full shadow-[0_0_25px_-10px_rgba(0,217,255,0.6)]"
              >
                <a href={d.href} className="inline-flex items-center justify-center gap-2">
                  {d.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </SiteCard>
          ))}
        </div>

        <SiteCard variant="strong">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-xl bg-neon-blue/10 border border-neon-blue/30 items-center justify-center">
              <Mail className="w-6 h-6 text-neon-blue" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Questions About Our Policies?</h2>
              <p className="text-foreground/70 leading-relaxed">
                If you have any questions about our privacy practices or terms of service, please
                don't hesitate to reach out. We're here to help and ensure you understand how we
                protect and serve our community.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </SiteCard>
      </div>
    </PageShell>
  );
};

export default Legal;
