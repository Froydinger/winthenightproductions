import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, Zap, Mic, Users } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Support = () => {
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
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="flex justify-center gap-3 mb-4">
                <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Coffee className="w-12 h-12 text-neon-blue" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">Win The Night</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Love what we're doing? Help us keep the conversation going and support the show with a coffee!
              </p>
            </div>
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

        {/* Buy Me a Coffee CTA */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/40 p-6 sm:p-12 hover:border-neon-blue/70 transition-all duration-500 hover:shadow-neon">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center space-y-6 sm:space-y-8">
                <div className="flex justify-center">
                  <div className="p-4 sm:p-6 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                    <Coffee className="w-12 h-12 sm:w-16 sm:h-16 text-neon-blue" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Buy Us a Coffee</h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-2">
                  Every contribution helps us continue creating meaningful content and supporting mental health conversations
                </p>
                <div className="pt-2 sm:pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-12 py-5 sm:py-6 h-auto w-full sm:w-auto"
                  >
                    <a
                      href="https://www.buymeacoffee.com/winthenight"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Heart className="w-5 h-5 flex-shrink-0" />
                      <span>Support Win The Night</span>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Thank You Note */}
        <section className="relative pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <p className="text-center text-lg text-muted-foreground">
              <Heart className="inline w-5 h-5 text-neon-blue" /> Thank you for being part of the Win The Night community! Your support means everything to us.
            </p>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Support;
