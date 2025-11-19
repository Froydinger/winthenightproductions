import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Coffee, Heart } from "lucide-react";
import { Link } from "react-router-dom";
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
          {/* Back Button */}
          <Link to="/">
            <Button
              variant="outline"
              className="group border-2 border-neon-blue/40 text-foreground hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="w-12 h-12 text-neon-blue animate-pulse" />
              <Heart className="w-8 h-8 text-neon-purple" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Support Win The Night ☕
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Love what we're doing? Help us keep the conversation going and support the show with a coffee!
            </p>
          </div>

          {/* Info Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Why Support Us?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Invest in better audio equipment and production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Enable us to bring on more amazing guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Support the creation of more content</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Buy Me a Coffee Link */}
          <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 space-y-6">
            <div className="text-center space-y-4">
              <Coffee className="w-16 h-16 text-neon-blue mx-auto animate-pulse" />
              <h2 className="text-3xl font-bold text-foreground">Buy Us a Coffee</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Every contribution helps us continue creating meaningful content and supporting mental health conversations
              </p>
            </div>
            
            <div className="flex justify-center pt-4">
              <a
                href="https://www.buymeacoffee.com/winthenight"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl bg-neon-blue text-background hover:bg-neon-blue/90 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] group"
              >
                <Coffee className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Support Win The Night</span>
              </a>
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
