import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Coffee, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const Support = () => {
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

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Why Support Us?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Keep the podcast ad-free and authentic</span>
                </li>
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

            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-purple/30 hover:border-neon-purple/50 transition-all duration-300 space-y-4">
              <h3 className="text-xl font-bold text-foreground">What You Get</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">•</span>
                  <span>Our eternal gratitude and appreciation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">•</span>
                  <span>A shoutout on the podcast (if you want!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">•</span>
                  <span>The warm fuzzy feeling of supporting mental health conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">•</span>
                  <span>Priority consideration for topic suggestions</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Buy Me a Coffee Embed */}
          <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 space-y-6">
            <div className="text-center space-y-2">
              <Coffee className="w-10 h-10 text-neon-blue mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Buy Us a Coffee</h2>
              <p className="text-muted-foreground">
                Every contribution helps us continue creating meaningful content
              </p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-neon-blue/20">
              <iframe
                src="https://www.buymeacoffee.com/winthenight"
                className="w-full h-[700px]"
                title="Buy Me a Coffee"
              />
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
