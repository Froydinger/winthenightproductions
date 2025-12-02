import { Play, Users, Heart, Brain, Instagram, BookOpen, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FeaturesSection = () => {
  return (
    <section className="relative pt-24 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">What We&apos;re About</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A different kind of mental health space, honest, introspective, and human.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Weekly Episodes */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon cursor-pointer animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Play className="w-8 h-8 text-neon-blue" />
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                Weekly Episodes
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                New mental health focused content every week that feels like talking with a friend at night.
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20 hover:border-neon-blue transition-all duration-300"
              >
                <a href="/watch" className="flex items-center gap-2">
                  Open the Watch Hub
                </a>
              </Button>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>

          {/* Real Stories */}
          <Card
            className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon cursor-pointer animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-dim/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Heart className="w-8 h-8 text-neon-blue" />
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                Real Stories
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Stories about loss, healing, and rediscovery. No fake positivity, just authentic experiences.
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20 hover:border-neon-blue transition-all duration-300"
              >
                <a href="/guest" className="flex items-center gap-2">
                  Be Our Guest!
                </a>
              </Button>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>

          {/* Practical Tools */}
          <Card
            className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Brain className="w-8 h-8 text-neon-blue" />
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                Practical Tools
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Explore our blog and access mental wellness tools to support your journey.
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20 hover:border-neon-blue transition-all duration-300"
              >
                <a
                  href="https://wtnguest.blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Our Blog
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tools" className="border-neon-blue/20">
                  <AccordionTrigger className="text-sm text-muted-foreground hover:text-neon-blue">
                    Available Tools
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500/50 text-red-500 hover:border-red-500 hover:bg-red-500/10"
                    >
                      <a href="/crisis-resources" className="flex items-center gap-2">
                        Crisis Resources
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-border/30 hover:border-neon-blue/40 hover:bg-neon-blue/10"
                    >
                      <a
                        href="https://noteily.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Noteily
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-border/30 hover:border-neon-blue/40 hover:bg-neon-blue/10"
                    >
                      <a
                        href="https://chatwitharc.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        ArcAI
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>

          {/* Supportive Community */}
          <Card
            className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon animate-fade-in-up"
            style={{ animationDelay: "450ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-dim/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Users className="w-8 h-8 text-neon-blue" />
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                Supportive Community
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                A community that treats you like a human, not a project. You&apos;re welcome as you are.
              </p>

              <div className="space-y-2 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-[#E1306C]/50 text-[#E1306C] hover:bg-[#E1306C]/20 hover:border-[#E1306C] transition-all duration-300"
                >
                  <a
                    href="https://instagram.com/win_the_night"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    Follow on Instagram
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-[#FF6719]/50 text-[#FF6719] hover:bg-[#FF6719]/20 hover:border-[#FF6719] transition-all duration-300"
                >
                  <a
                    href="https://winthenight.blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Connect on Substack
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
