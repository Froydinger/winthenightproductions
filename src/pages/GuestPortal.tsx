import { Mic, ArrowRight, MessageCircle, Users, Heart } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            {/* Animated Mic Icon */}
            <div className="flex justify-center mb-8 relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse w-24 h-24 mx-auto" />
              <div className="relative bg-card/80 p-5 rounded-full border-2 border-primary/30 shadow-lg shadow-primary/20 animate-float">
                <Mic className="w-12 h-12 text-primary" strokeWidth={2} />
              </div>
            </div>

            {/* Heading */}
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="h-10 w-1.5 bg-primary rounded-full"></div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
                Tell Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Story</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              So Others Can Tell Theirs.
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This page is for those interested in being a Guest on Win The Night, or those who already scheduled a call.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 font-bold text-lg px-8"
              >
                <a href="/guest" className="flex items-center gap-2">
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
              >
                <a href="/watch">Watch Previous Episodes</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="relative pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Welcome Card */}
              <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-8 w-1 bg-primary rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">You Are Welcome Here</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We value every story and every voice. If you're ready to share yours, we'd love to connect. Schedule a discovery call with our host, <strong className="text-foreground">Joshua Lopez</strong>, to discuss topics, boundaries, and how we can collaborate.
                </p>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold"
                >
                  <a href="/guest">
                    Schedule Now
                  </a>
                </Button>
              </Card>

              {/* Tips Card */}
              <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Tips for Sharing</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <div>
                    <strong className="text-foreground block mb-1">Your story matters.</strong>
                    Vulnerability is a strength. You don't need to have it all figured out.
                  </div>
                  <div>
                    <strong className="text-foreground block mb-1">What to expect.</strong>
                    Empathy and curiosity. In-person (Chicagoland) or virtual (Google Meet).
                  </div>
                  <div>
                    <strong className="text-foreground block mb-1">Just be you.</strong>
                    No script. Bring your authentic self, and we'll handle the rest.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Share Section */}
        <section className="relative pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="h-8 w-1 bg-primary rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Share Your Story</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/70 backdrop-blur-md border border-primary/30 hover:border-primary/50 transition-all duration-300 group text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Inspire Others</h3>
                <p className="text-sm text-muted-foreground">Your journey could be the catalyst for someone else's healing</p>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-md border border-primary/30 hover:border-primary/50 transition-all duration-300 group text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Build Connection</h3>
                <p className="text-sm text-muted-foreground">Join a community of storytellers and truth-seekers</p>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-md border border-primary/30 hover:border-primary/50 transition-all duration-300 group text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Safe Space</h3>
                <p className="text-sm text-muted-foreground">A judgment-free environment for authentic conversations</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="relative pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Catch up on previous episodes via{" "}
              <a
                href="https://youtube.com/@winthenight"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                YouTube
              </a>
              {" "}or our{" "}
              <a
                href="https://winthenight.blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                Substack
              </a>
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default GuestPortal;
