import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neon-blue/20 via-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/40 p-8 sm:p-14 lg:p-20 shadow-neon animate-fade-in-up">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,217,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,217,255,0.1),transparent_50%)]" />
          
          {/* Floating orbs */}
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-neon-blue/20 blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-neon-dim/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Ready to Join the Conversation?
              </h2>
              <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Subscribe now and become part of a community that values real talk over perfect appearances.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon-strong hover:shadow-[0_0_60px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-110 animate-glow-pulse text-base sm:text-lg font-bold px-6 py-6 sm:px-8 sm:py-7 rounded-2xl"
              >
                <a
                  href="https://youtube.com/@winthenight?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Youtube className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                  Subscribe on YouTube
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-2 border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground transition-all duration-500 hover:scale-105 text-sm sm:text-base px-6 py-5 sm:px-8 sm:py-6 rounded-2xl backdrop-blur-sm"
              >
                <a
                  href="https://winthenight.org/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  Learn Our Story
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-6">
              Join 1k+ others finding connection and healing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
