import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, Zap, Mic, Users } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
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
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="w-12 h-12 text-neon-blue animate-bounce" />
              <Heart className="w-8 h-8 text-neon-blue animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Support Win The Night ☕
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Love what we're doing? Help us keep the conversation going and support the show with a coffee!
            </p>
          </div>

          {/* Impact Section */}
          <Card className="p-8 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30">
            <h3 className="text-2xl font-bold text-foreground text-center mb-6">Your Support Enables</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <Mic className="w-10 h-10 text-neon-blue mx-auto" />
                <h4 className="font-bold text-foreground">Professional Equipment</h4>
                <p className="text-sm text-muted-foreground">Invest in better video and audio equipment for top-quality production</p>
              </div>
              <div className="text-center space-y-3">
                <Users className="w-10 h-10 text-neon-blue mx-auto" />
                <h4 className="font-bold text-foreground">Amazing Guests</h4>
                <p className="text-sm text-muted-foreground">Bring on experts and advocates in mental health</p>
              </div>
              <div className="text-center space-y-3">
                <Zap className="w-10 h-10 text-neon-blue mx-auto" />
                <h4 className="font-bold text-foreground">More Content</h4>
                <p className="text-sm text-muted-foreground">Hire talented people for projects and cover costs for professional editing tools</p>
              </div>
            </div>
          </Card>

          {/* Buy Me a Coffee CTA */}
          <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue/70 transition-all duration-300">
            <div className="text-center space-y-6">
              <Coffee className="w-20 h-20 text-neon-blue mx-auto animate-bounce" />
              <h2 className="text-3xl font-bold text-foreground">Buy Us a Coffee</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Every contribution helps us continue creating meaningful content and supporting mental health conversations
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-6 h-auto"
              >
                <a 
                  href="https://www.buymeacoffee.com/winthenight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Support Win The Night
                </a>
              </Button>
            </div>
          </Card>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground">
            💙 Thank you for being part of the Win The Night community! Your support means everything to us.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Support;
