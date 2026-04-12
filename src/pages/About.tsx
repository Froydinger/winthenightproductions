import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Users, BookOpen, Anchor, Info } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const [introVideoId, setIntroVideoId] = useState("cIHJZUOIPco");
  const [featuredVideoId, setFeaturedVideoId] = useState("UL_ayxMAFqM");
  const [featuredTitle, setFeaturedTitle] = useState("Get a Taste of What We Do");
  const [featuredDescription, setFeaturedDescription] = useState(
    "If you get some time to throw this on in the background, it's one of our favorite episodes—a conversation between Josh and his friend, Brandon."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      const { data } = await supabase
        .from("watch_settings")
        .select("about_intro_video_id, about_featured_video_id, about_featured_title, about_featured_description")
        .eq("id", 1)
        .maybeSingle();
      if (data) {
        if (data.about_intro_video_id) setIntroVideoId(data.about_intro_video_id);
        if (data.about_featured_video_id) setFeaturedVideoId(data.about_featured_video_id);
        if (data.about_featured_title) setFeaturedTitle(data.about_featured_title);
        if (data.about_featured_description) setFeaturedDescription(data.about_featured_description);
      }
    };
    load();
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
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Info className="w-12 h-12 text-neon-blue" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Win The Night
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A mental health–focused organization empowering growth through{" "}
                <span className="text-neon-blue font-semibold">story</span>,{" "}
                <span className="text-neon-blue font-semibold">support</span>, and{" "}
                <span className="text-neon-blue font-semibold">self-awareness</span>.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105"
                >
                  <a href="#community">Join the Community</a>
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
          </div>
        </section>

        {/* How We Do It Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How We Do It</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three pillars that guide our mission to support mental health and healing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Mic className="w-8 h-8 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-neon-blue transition-colors">Conversations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Deep dive discussions on our podcast where we explore the resilience of the human spirit.
                  </p>
                </div>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Users className="w-8 h-8 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-neon-blue transition-colors">Connections</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building a growing online community where you don't have to fight your battles alone.
                  </p>
                </div>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <BookOpen className="w-8 h-8 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-neon-blue transition-colors">Lessons & Insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Curated articles, resources, and mental health insights delivered directly on our site.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Intro Video Section */}
        <section className="relative pb-16 px-4" id="intro-video">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">The Heart of Our Mission</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See what drives us to keep the conversation going.
              </p>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-neon-blue/30 ring-1 ring-neon-blue/20 bg-card hover:border-neon-blue/50 transition-all duration-300">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${introVideoId}`}
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
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">The Founders</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">A little about us...</p>
            </div>

            <div className="space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
                Win The Night was founded by two high school best friends and storytellers/filmmakers at heart,{" "}
                <strong className="text-foreground">Josh Lopez</strong> and{" "}
                <strong className="text-foreground">Jake Freudinger</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-neon-blue transition-colors">Jake Freudinger</h3>
                    <p className="text-muted-foreground">Runs the socials, Substack, and YouTube channel.</p>
                  </div>
                </Card>
                <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-neon-blue transition-colors">Josh Lopez</h3>
                    <p className="text-muted-foreground">Podcast host offering creative and collaborative insights.</p>
                  </div>
                </Card>
              </div>

              <Card className="relative p-8 bg-gradient-to-br from-neon-blue/10 to-blue-900/10 border-2 border-neon-blue/40 hover:border-neon-blue/60 transition-all duration-300">
                <Anchor className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/30" />
                <blockquote className="text-xl text-foreground italic font-medium text-center">
                  "If this were a boat, Josh would be the captain, and Jake the trusted Navigator."
                </blockquote>
              </Card>

              <p className="text-muted-foreground leading-relaxed text-center">
                We digress—we're glad you're here and we hope you enjoy what we're building!
              </p>
            </div>
          </div>
        </section>

        {/* Featured Episode Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{featuredTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {featuredDescription}
              </p>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-neon-blue/30 ring-1 ring-neon-blue/20 bg-card hover:border-neon-blue/50 transition-all duration-300">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${featuredVideoId}`}
                title="Featured Episode"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 border-t border-border/30" id="community">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Users className="w-12 h-12 text-neon-blue" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Join the Community</h2>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Be part of a community of people who want to{" "}
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Win The Night, together
                </strong>
                , one conversation at a time.
              </p>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 text-lg px-8 py-6 h-auto"
                >
                  <a href="/guest" className="flex items-center gap-2">
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
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default About;
