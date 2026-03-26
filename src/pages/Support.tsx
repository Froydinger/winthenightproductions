import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Mic, Users, Star, Crown, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SupportModal } from "@/components/SupportModal";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [proSupporters, setProSupporters] = useState<string[]>([]);
  const [loadingSupporters, setLoadingSupporters] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProSupporters();
  }, []);

  const fetchProSupporters = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("list-pro-supporters");
      if (error) throw error;
      const names = (data?.supporters || []).map((s: { name: string }) => s.name);
      setProSupporters(names);
    } catch (err) {
      console.error("Failed to fetch supporters:", err);
    } finally {
      setLoadingSupporters(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>
      <Header />

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="flex justify-center gap-3 mb-4">
                <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Heart className="w-12 h-12 text-neon-blue" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">Win The Night</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Love what we're doing? Help us keep the conversation going — every contribution makes a difference.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/30 p-10 text-center shadow-neon">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
                  Pick a one-time amount or grab a monthly plan — everything's inside.
                </p>
                <Button
                  onClick={() => setShowSupportModal(true)}
                  size="lg"
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black font-bold text-base px-10 py-6 shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Support the Show
                </Button>
                <p className="text-xs text-muted-foreground/60">Donate once or subscribe from $3/mo · Secure checkout via Stripe</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Impact Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Your Support Enables</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every contribution helps us grow and create better content for the community.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                      <Mic className="w-8 h-8 text-neon-blue" />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-lg group-hover:text-neon-blue transition-colors">Professional Equipment</h3>
                  <p className="text-sm text-muted-foreground">Invest in better video and audio equipment for top-quality production</p>
                </div>
              </Card>
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                      <Users className="w-8 h-8 text-neon-blue" />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-lg group-hover:text-neon-blue transition-colors">Amazing Guests</h3>
                  <p className="text-sm text-muted-foreground">Bring on experts and advocates in mental health</p>
                </div>
              </Card>
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                      <Zap className="w-8 h-8 text-neon-blue" />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-lg group-hover:text-neon-blue transition-colors">More Content</h3>
                  <p className="text-sm text-muted-foreground">Hire talented people for projects and cover costs for professional editing tools</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pro Supporters Wall */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-neon-blue/10 border border-neon-blue/30">
                    <Crown className="w-8 h-8 text-neon-blue" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Pro Supporters</h2>
                <p className="text-sm text-muted-foreground">
                  These amazing people help make Win The Night possible
                </p>
                {loadingSupporters ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-neon-blue" />
                  </div>
                ) : proSupporters.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-3 pt-4">
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
                  <div className="py-6 space-y-2">
                    <p className="text-muted-foreground/60 italic">No pro supporters yet — be the first!</p>
                    <Button
                      onClick={() => setShowSupportModal(true)}
                      variant="outline"
                      className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Become a Pro Supporter
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>

        {/* Thank You */}
        <section className="relative pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <p className="text-center text-lg text-muted-foreground">
              <Heart className="inline w-5 h-5 text-neon-blue" /> Thank you for being part of the Win The Night community! Your support means everything.
            </p>
          </div>
        </section>

        <Footer />
      </div>

      <SupportModal
        open={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        placement="support_page"
      />
    </main>
  );
};

export default Support;
