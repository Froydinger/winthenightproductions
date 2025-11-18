import { Check, MessageCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const CommunitySection = () => {
  return (
    <section className="relative py-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Main Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/30 p-6 sm:p-10 lg:p-12 hover:border-neon-blue/60 transition-all duration-500 hover:shadow-neon-strong animate-fade-in-up">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating icon */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-neon-blue/10 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
              <MessageCircle className="w-6 h-6 sm:w-10 sm:h-10 text-neon-blue" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/20 text-neon-blue text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Join the Community
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                  A mental health community that feels like a late night talk.
                </h2>
              </div>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We're here to hold space for honest conversations about anxiety, trauma, creativity, 
                and everything in between. You're welcome whether you're in the thick of it or just 
                starting to ask questions about your own story.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "No fake positivity, just real stories",
                  "Supportive, introspective community",
                  "Episodes that feel like talking with a friend at night",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group/item animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mt-1 w-6 h-6 rounded-lg bg-neon-blue/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-neon-blue group-hover/item:scale-110 transition-all duration-300">
                      <Check className="w-4 h-4 text-neon-blue group-hover/item:text-black" />
                    </div>
                    <span className="text-foreground/90 text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-border/30">
                <p className="text-sm text-muted-foreground italic flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                  New episodes drop on YouTube. Subscribing is the best way to stay connected.
                </p>
              </div>
            </div>
          </Card>

          {/* Right - Stats/Features */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                Why People Stay Connected
              </h3>
              <p className="text-lg text-muted-foreground">
                Real conversations that matter. No algorithms. No highlight reels. Just honest dialogue about the stuff that keeps us up at night.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  title: "Inner Child Work",
                  description: "Deep dives into healing childhood wounds and understanding patterns.",
                },
                {
                  title: "Generational Trauma",
                  description: "Exploring how family history shapes our present and future.",
                },
                {
                  title: "Healing Journey",
                  description: "Practical frameworks for navigating your own path to wholeness.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl bg-gradient-to-r from-card/40 to-charcoal/30 border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300 hover:translate-x-2 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-neon-blue transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
