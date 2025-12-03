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
        <section className="relative py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-1.5 bg-neon-blue rounded-full"></div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">Win The Night</span>
              </h1>
            </div>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
              A mental health–focused organization empowering growth through{" "}
              <span className="text-neon-blue font-semibold">story</span>,{" "}
              <span className="text-neon-blue font-semibold">support</span>, and{" "}
              <span className="text-neon-blue font-semibold">self-awareness</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
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
                className="border-2 border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300 hover:scale-105"
              >
                <a href="#intro-video">Watch Our Message</a>
              </Button>
            </div>
          </div>
        </section>

        {/* How We Do It Section */}
        <section className="relative pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">How We Do It</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group hover:shadow-lg hover:shadow-neon-blue/20">
                <div className="w-14 h-14 bg-neon-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <Mic className="w-7 h-7 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Conversations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deep dive discussions on our podcast where we explore the resilience of the human spirit.
                </p>
              </Card>

              <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group hover:shadow-lg hover:shadow-neon-blue/20">
                <div className="w-14 h-14 bg-neon-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <Users className="w-7 h-7 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Connections</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building a growing online community where you don't have to fight your battles alone.
                </p>
              </Card>

              <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group hover:shadow-lg hover:shadow-neon-blue/20">
                <div className="w-14 h-14 bg-neon-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <BookOpen className="w-7 h-7 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Lessons & Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Curated articles, resources, and mental health insights delivered directly on our site.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Intro Video Section */}
        <section className="relative pb-12 px-6 md:px-12 lg:px-24" id="intro-video">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">The Heart of Our Mission</h2>
              </div>
              <p className="text-muted-foreground max-w-3xl">See what drives us to keep the conversation going.</p>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10 bg-card">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/cIHJZUOIPco"
                title="Welcome to Win The Night"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="relative pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">The Founders</h2>
              </div>
              <p className="text-muted-foreground max-w-3xl mb-6">A little about us...</p>
            </div>

            <div className="space-y-8 max-w-5xl">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Win The Night was founded by two high school best friends and storytellers/filmmakers at heart,{" "}
                <strong className="text-foreground">Josh Lopez</strong> and{" "}
                <strong className="text-foreground">Jake Freudinger</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30">
                  <h3 className="text-foreground font-bold text-xl mb-2">Jake Freudinger</h3>
                  <p className="text-muted-foreground">Runs the socials, Substack, and YouTube channel.</p>
                </Card>
                <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30">
                  <h3 className="text-foreground font-bold text-xl mb-2">Josh Lopez</h3>
                  <p className="text-muted-foreground">
                    Podcast host offering creative and collaborative insights.
                  </p>
                </Card>
              </div>

              <Card className="relative p-8 bg-gradient-to-r from-neon-blue/10 to-blue-900/10 border-l-4 border-neon-blue">
                <Anchor className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/30" />
                <blockquote className="text-xl text-foreground italic font-medium">
                  "If this were a boat, Josh would be the captain, and Jake the trusted Pilot."
                </blockquote>
              </Card>

              <p className="text-muted-foreground leading-relaxed text-center">
                We digress—we're glad you're here and we hope you enjoy what we're building!
              </p>
            </div>
          </div>
        </section>

        {/* Featured Episode Section */}
        <section className="relative pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Get a Taste of What We Do</h2>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                If you get some time to throw this on in the background, it's one of our favorite episodes—a conversation
                between Josh and his fellow Marine, Cesar.
              </p>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10 bg-card">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/UL_ayxMAFqM"
                title="Episode: Josh & Cesar (Marine Corps Stories)"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 px-6 md:px-12 lg:px-24 border-t border-border/30" id="community">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block p-6 rounded-full bg-neon-blue/10 mb-2 border-2 border-neon-blue/30">
              <Users className="w-12 h-12 text-neon-blue" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">Join the Community</h2>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Be part of a community of people who want to{" "}
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                Win The Night, together
              </strong>
              , one conversation at a time.
            </p>

            <div className="pt-6">
              <Button
                asChild
                size="lg"
                className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 text-lg px-8 py-6 h-auto"
              >
                <a href="/be-our-guest" className="flex items-center gap-2">
                  Be Our Guest
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
