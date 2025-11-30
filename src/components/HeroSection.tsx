import { Button } from "@/components/ui/button";
import { Youtube, Play, ArrowDown, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/win-the-night-productions-logo.png";
import { useState } from "react";

const HeroSection = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="Win The Night"
              onLoad={() => setLogoLoaded(true)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_0_40px_rgba(0,217,255,0.6)] animate-breathe cursor-pointer hover:scale-110 transition-all duration-700 ease-out ${
                logoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ willChange: 'transform, opacity' }}
            />
          </div>

          {/* Main Content */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-xl sm:text-3xl lg:text-4xl font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <span className="text-foreground">One <span className="font-bold">Connection.</span><br />
              One <span className="font-bold">Story.</span><br className="sm:hidden" />
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:inline"> </span></span>
              <span className="text-neon-blue font-bold">One Conversation at a Time.</span>
            </p>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <AccordionItem value="who-are-we" className="border-none">
                <AccordionTrigger className="text-sm text-muted-foreground hover:text-neon-blue transition-colors py-2 hover:no-underline justify-center">
                  Who are we?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2 text-center">
                    A mental health focused community built on real conversations, not highlight reels. 
                    If you care about healing, inner child work, generational trauma, and honest stories that 
                    make you feel less alone — this is your corner of the internet.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <Button
              asChild
              size="lg"
              className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon-strong hover:shadow-[0_0_50px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-110 animate-glow-pulse text-xl font-bold px-8 py-7 rounded-xl"
              style={{ willChange: 'transform, box-shadow' } as any}
            >
              <a
                href="https://youtube.com/@winthenight?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Youtube className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Subscribe on YouTube
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-2 border-foreground text-foreground hover:bg-foreground/10 hover:border-foreground transition-all duration-500 hover:scale-105 text-xl px-8 py-7 rounded-xl backdrop-blur-sm"
            >
              <a
                href="/watch"
                className="flex items-center gap-3"
              >
                <Play className="w-6 h-6 group-hover:scale-125 transition-transform" />
                Watch Latest Episode
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm animate-blink">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 animate-wiggle" style={{ willChange: 'transform' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
