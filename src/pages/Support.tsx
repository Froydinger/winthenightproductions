import { Button } from "@/components/ui/button";
import { Heart, Zap, Mic, Users, Star, Crown, Loader2 } from "lucide-react";
import { SupportModal } from "@/components/SupportModal";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SiteCard } from "@/components/site/SiteCard";

const Support = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [proSupporters, setProSupporters] = useState<string[]>([]);
  const [loadingSupporters, setLoadingSupporters] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("list-pro-supporters");
        if (error) throw error;
        setProSupporters((data?.supporters || []).map((s: { name: string }) => s.name));
      } catch (err) {
        console.error("Failed to fetch supporters:", err);
      } finally {
        setLoadingSupporters(false);
      }
    };
    run();
  }, []);

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
            Pick a one-time amount or grab a monthly plan — everything's inside.
          </p>
          <Button
            onClick={() => setShowSupportModal(true)}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/90 text-black font-bold text-base px-10 shadow-[0_0_30px_-8px_rgba(0,217,255,0.7)]"
          >
            <Heart className="w-5 h-5 mr-2" />
            Support the Show
          </Button>
          <p className="text-xs text-foreground/55 mt-4">
            Donate once or subscribe from $3/mo · Secure checkout via Stripe
          </p>
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

        <SiteCard variant="strong" className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl border border-neon-blue/30 bg-background/60">
              <Crown className="w-7 h-7 text-neon-blue" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Our Pro Supporters</h2>
          <p className="text-sm text-foreground/60 mb-6">
            These amazing people help make Win The Night possible
          </p>
          {loadingSupporters ? (
            <div className="flex justify-center py-6">
              <Loader2 className="w-6 h-6 animate-spin text-neon-blue" />
            </div>
          ) : proSupporters.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2.5">
              {proSupporters.map((name, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue font-medium text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-foreground/55 italic">No pro supporters yet — be the first!</p>
              <Button
                onClick={() => setShowSupportModal(true)}
                variant="outline"
                className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue"
              >
                <Star className="w-4 h-4 mr-2" />
                Become a Pro Supporter
              </Button>
            </div>
          )}
        </SiteCard>

        <p className="text-center text-base sm:text-lg text-foreground/70">
          <Heart className="inline w-5 h-5 text-neon-blue mr-1" />
          Thank you for being part of the Win The Night community! Your support means everything.
        </p>
      </div>

      <SupportModal
        open={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        placement="support_page"
      />
    </PageShell>
  );
};

export default Support;
