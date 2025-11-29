import { Mic } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const GuestPortal = () => {
  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8 md:pt-12 pb-12">

        {/* Header & Intro */}
        <div className="text-center mb-10 pb-8 border-b border-border/30">

          {/* ANIMATED MIC ICON */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-neon-blue/20 blur-xl rounded-full animate-pulse w-16 h-16 mx-auto" />
            <div className="relative bg-card/80 p-3 rounded-full border border-border/50 animate-float shadow-lg shadow-neon-blue/10">
              <Mic className="w-8 h-8 text-neon-blue" strokeWidth={2} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500 mb-4">
            Tell Your Story So Others Can Tell Theirs.
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This page is for those interested in being a Guest on Win The Night, or those who already scheduled a call. Here's what to expect as a Guest on Win The Night.
          </p>
          <p className="text-muted-foreground mt-4">
            Submit your guest request:{" "}
            <a
              href="/guest"
              className="text-neon-blue font-bold hover:text-neon-blue/80 underline decoration-neon-blue/30 underline-offset-4 transition-colors"
            >
              Use this link
            </a>
          </p>
          <p className="text-muted-foreground/70 text-sm mt-4">
            Catch up on previous episodes via{" "}
            <a
              href="https://youtube.com/@winthenight"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              YouTube
            </a>
            {" "}or our{" "}
            <a
              href="https://winthenight.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Substack
            </a>
            .
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Column: Welcome & Booking */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-card/30 p-8 rounded-2xl border-2 border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                You are welcome here!
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We value every story and every voice. If you're ready to share yours, we'd love to connect. Schedule a discovery call with our host, <strong className="text-foreground">Joshua Lopez</strong>, to discuss topics, boundaries, and how we can collaborate.
              </p>

              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-neon-blue to-blue-600 text-black hover:from-neon-blue/90 hover:to-blue-600/90 shadow-neon hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] transition-all duration-300 hover:-translate-y-1 font-bold"
              >
                <a href="/guest">
                  Book a Discovery Call
                </a>
              </Button>
            </Card>
          </div>

          {/* Right Column: Storytelling Tips */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500 mb-4">
              Some tips for telling your story
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <strong className="text-foreground block mb-1">Your story matters.</strong>
                We believe that vulnerability is a strength. You don't need to have it all figured out to share your journey. The most powerful conversations often come from simply being honest about where you've been and where you're going.
              </div>

              <div>
                <strong className="text-foreground block mb-1">What to expect.</strong>
                Our conversations are rooted in empathy and curiosity. Whether we meet in-person around the Chicagoland area or connect virtually via Google Meet, the goal is to create a safe space where you feel heard and understood.
              </div>

              <div>
                <strong className="text-foreground block mb-1">Just be you.</strong>
                There is no script. Bring your authentic self, and we'll handle the rest. We are here to support you in sharing your truth with the world.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-center gap-6">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-border/50 hover:border-neon-blue/50 hover:bg-card/50 transition-all"
          >
            <a href="/watch">
              Watch the Latest Episode
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-border/60 hover:border-neon-blue hover:text-neon-blue transition-all"
          >
            <a href="/guest">
              Book a Call
            </a>
          </Button>
        </div>

      </div>
    </main>
  );
};

export default GuestPortal;
