import { Button } from "@/components/ui/button";
import { Heart, Zap, Mic, Users, Coffee, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SiteCard } from "@/components/site/SiteCard";

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/winthenight";

const Support = () => {
  const impact = [
    { icon: Mic, title: "Professional Equipment", desc: "Invest in better video and audio equipment for top-quality production" },
    { icon: Users, title: "Amazing Guests", desc: "Bring on experts and advocates in mental health" },
    { icon: Zap, title: "More Content", desc: "Hire talented people for projects and cover costs for professional editing tools" },
  ];

  return (
    <PageShell>
      <PageHero
        icon={Heart}
        eyebrow="Support"
        title={
          <>
            Support{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Win The Night
            </span>
          </>
        }
        lede="Love what we're doing? Help us keep the conversation going — every contribution makes a difference."
      />

      <div className="container mx-auto max-w-4xl px-4 pb-20 space-y-12 sm:space-y-16">
        <SiteCard variant="strong" className="text-center">
          <p className="text-foreground/75 text-base leading-relaxed max-w-md mx-auto mb-5">
            Support the show directly through Buy Me a Coffee. It keeps things simple, lightweight, and off-site.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/90 text-black font-bold text-base px-10 shadow-[0_0_30px_-8px_rgba(0,217,255,0.7)]"
          >
            <a href={BUY_ME_A_COFFEE_URL} target="_blank" rel="noopener noreferrer">
              <Coffee className="w-5 h-5 mr-2" />
              Support on Buy Me a Coffee
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <p className="text-xs text-foreground/55 mt-4">
            Contributions are handled externally by Buy Me a Coffee.
          </p>

          <div className="mt-6 mx-auto max-w-xl rounded-xl border border-neon-blue/40 bg-neon-blue/5 px-4 py-3 text-left">
            <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
              <strong className="text-neon-blue">Important:</strong> Win The Night Foundation is{" "}
              <strong>not a 501(c)(3) nonprofit, registered charity, or tax-exempt organization</strong>.
              Contributions are personal support payments for an independent media project and are{" "}
              <strong>not tax-deductible</strong>.
            </p>
          </div>
        </SiteCard>

        <section>
          <SectionHeader
            icon={Zap}
            eyebrow="Your support enables"
            title="Where every contribution goes"
            lede="Every contribution helps us grow and create better content for the community."
            align="center"
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {impact.map((i) => (
              <SiteCard key={i.title} className="text-center group hover:-translate-y-0.5 transition-transform">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i.icon className="w-7 h-7 text-neon-blue" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{i.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{i.desc}</p>
              </SiteCard>
            ))}
          </div>
        </section>

        <p className="text-center text-base sm:text-lg text-foreground/70">
          <Heart className="inline w-5 h-5 text-neon-blue mr-1" />
          Thank you for being part of the Win The Night community! Your support means everything.
        </p>
      </div>
    </PageShell>
  );
};

export default Support;
