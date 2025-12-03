import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Users, BookOpen, Anchor } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-20 pb-12 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
              About <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                Win The Night
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              A mental health–focused organization empowering growth through{" "}
              <span className="text-neon-blue font-semibold">story</span>,{" "}
              <span className="text-neon-blue font-semibold">support</span>, and{" "}
              <span className="text-neon-blue font-semibold">self-awareness</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105"
              >
                <a href="/#community">Join the Community</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-border text-foreground hover:border-neon-blue hover:text-neon-blue transition-all duration-300 hover:scale-105"
              >
                <a href="#intro-video">A Message from the Josh</a>
              </Button>
            </div>
          </div>
        </div>

        {/* The "How We Do It" Grid */}
        <section className="relative py-8 md:py-12 px-6 md:px-12 lg:px-24 overflow-hidden border-y border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Card className="p-8 bg-card/60 backdrop-blur-md border border-border hover:bg-card/80 transition-all duration-300 group hover:shadow-lg hover:shadow-neon-blue/20 h-full">
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-neon-blue/50">
                  <Mic className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Conversations</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Deep dive discussions on our podcast where we explore the resilience of the human spirit.
                </p>
              </Card>

              {/* Card 2 */}
              <Card className="p-8 bg-card/60 backdrop-blur-md border border-border hover:bg-card/80 transition-all duration-300 group hover:shadow-lg hover:shadow-neon-blue/20 h-full">
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-neon-blue/50">
                  <Users className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Connections</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Building a growing online community where you don't have to fight your battles alone.
                </p>
              </Card>

              {/* Card 3 */}
              <Card className="p-8 bg-card/60 backdrop-blur-md border border-border hover:bg-card/80 transition-all duration-300 group hover:shadow-lg hover:shadow-neon-blue/20 h-full">
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-neon-blue/50">
                  <BookOpen className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Lessons & Insights</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Curated articles, resources, and mental health insights delivered directly on our site.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Intro Video Section */}
        <section className="relative py-8 md:py-12 px-6 md:px-12 lg:px-24 overflow-hidden" id="intro-video">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">The Heart of Our Mission</h2>
              <p className="text-muted-foreground">See what drives us to keep the conversation going.</p>
            </div>

            <div className="w-full max-w-4xl mx-auto group">
              <div className="relative w-full aspect-video bg-card/60 rounded-xl overflow-hidden shadow-2xl border border-border ring-1 ring-border/20">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-blue-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>

                <iframe
                  className="relative w-full h-full z-10"
                  src="https://www.youtube.com/embed/cIHJZUOIPco"
                  title="Welcome to Win The Night"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="relative py-8 md:py-12 px-6 md:px-12 lg:px-24 overflow-hidden bg-background/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-neon-blue font-semibold tracking-wider uppercase text-sm mb-2">The Founders</h3>
              <h2 className="text-4xl font-bold text-foreground">A Little About Us...</h2>
            </div>

            <div className="space-y-8 max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg leading-relaxed text-center">
                Win The Night was founded by two high school best friends and storytellers/filmmakers at heart,{" "}
                <strong className="text-foreground">Josh Lopez</strong> and{" "}
                <strong className="text-foreground">Jake Freudinger</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/60 backdrop-blur-md border border-border">
                  <div className="text-foreground font-bold text-lg mb-1">Jake Freudinger</div>
                  <p className="text-muted-foreground text-sm">Runs the socials, Substack, and YouTube channel.</p>
                </Card>
                <Card className="p-6 bg-card/60 backdrop-blur-md border border-border">
                  <div className="text-foreground font-bold text-lg mb-1">Josh Lopez</div>
                  <p className="text-muted-foreground text-sm">
                    Podcast host offering creative and collaborative insights.
                  </p>
                </Card>
              </div>

              {/* Blockquote */}
              <div className="relative p-8 bg-gradient-to-r from-neon-blue/10 to-blue-900/10 rounded-2xl border-l-4 border-neon-blue mt-6">
                <Anchor className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/30" />
                <blockquote className="text-xl text-foreground italic font-medium text-center">
                  "If this were a boat, Josh would be the captain, and Jake the trusted Pilot."
                </blockquote>
              </div>

              <p className="text-muted-foreground leading-relaxed text-center mt-6">
                We digress—we're glad you're here and we hope you enjoy what we're building!
              </p>
            </div>
          </div>
        </section>

        {/* Featured Episode Section */}
        <section className="relative py-8 md:py-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-border/30">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get a taste of what we do</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              If you get some time to throw this on in the background, it's one of our favorite episodes—a conversation
              between Josh and his fellow Marine, Cesar.
            </p>

            <div className="mx-auto max-w-4xl">
              <div className="w-full max-w-4xl mx-auto group">
                <div className="relative w-full aspect-video bg-card/60 rounded-xl overflow-hidden shadow-2xl border border-border ring-1 ring-border/20">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-blue-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>

                  <iframe
                    className="relative w-full h-full z-10"
                    src="https://www.youtube.com/embed/UL_ayxMAFqM"
                    title="Episode: Josh & Cesar (Marine Corps Stories)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative py-16 px-6 border-t border-border/30 bg-gradient-to-b from-background/50 to-background"
          id="community"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block p-4 rounded-full bg-neon-blue/10 mb-2">
              <Users className="w-8 h-8 text-neon-blue" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">Join the Community</h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Be part of a community of people who want to <br />
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                Win The Night, together
              </strong>
              , one conversation at a time.
            </p>

            <div className="pt-6 flex flex-col items-center gap-6">
              <Button
                asChild
                size="lg"
                className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105"
              >
                <a href="/be-our-guest" className="flex items-center gap-2">
                  Be Our Guest
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default About;
