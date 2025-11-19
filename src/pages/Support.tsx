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

          {/* Support Tiers */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Single Coffee */}
            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300 hover:scale-105 space-y-4">
              <div className="text-center space-y-3">
                <Coffee className="w-12 h-12 text-neon-blue mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">Single Coffee</h3>
                <p className="text-3xl font-bold text-neon-blue">$5</p>
                <p className="text-muted-foreground">Show your support with a quick coffee</p>
              </div>
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a 
                  href="https://www.buymeacoffee.com/winthenight?amount=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Buy One Coffee
                </a>
              </Button>
            </Card>

            {/* Multiple Coffees */}
            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/50 hover:border-neon-blue/80 transition-all duration-300 hover:scale-105 space-y-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-neon-blue text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </span>
              </div>
              <div className="text-center space-y-3">
                <div className="flex justify-center gap-1">
                  <Coffee className="w-10 h-10 text-neon-blue" />
                  <Coffee className="w-10 h-10 text-neon-blue" />
                  <Coffee className="w-10 h-10 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Triple Coffee</h3>
                <p className="text-3xl font-bold text-neon-blue">$15</p>
                <p className="text-muted-foreground">Make a bigger impact on our mission</p>
              </div>
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a 
                  href="https://www.buymeacoffee.com/winthenight?amount=3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Buy Three Coffees
                </a>
              </Button>
            </Card>

            {/* Custom Amount */}
            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300 hover:scale-105 space-y-4">
              <div className="text-center space-y-3">
                <Heart className="w-12 h-12 text-neon-blue mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">Custom Support</h3>
                <p className="text-3xl font-bold text-neon-blue">Any Amount</p>
                <p className="text-muted-foreground">Choose your own contribution level</p>
              </div>
              <Button 
                asChild
                variant="outline"
                className="w-full border-2 border-neon-blue/50 hover:bg-neon-blue/10"
              >
                <a 
                  href="https://www.buymeacoffee.com/winthenight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Choose Amount
                </a>
              </Button>
            </Card>
          </div>

          {/* Impact Section */}
          <Card className="p-8 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30">
            <h3 className="text-2xl font-bold text-foreground text-center mb-6">Your Support Enables</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <Mic className="w-10 h-10 text-neon-blue mx-auto" />
                <h4 className="font-bold text-foreground">Better Equipment</h4>
                <p className="text-sm text-muted-foreground">Professional audio gear for crystal clear conversations</p>
              </div>
              <div className="text-center space-y-3">
                <Users className="w-10 h-10 text-neon-blue mx-auto" />
                <h4 className="font-bold text-foreground">Amazing Guests</h4>
                <p className="text-sm text-muted-foreground">Bring on experts and advocates in mental health</p>
              </div>
              <div className="text-center space-y-3">
                <Zap className="w-10 h-10 text-neon-blue mx-auto" />
                <h4 className="font-bold text-foreground">More Content</h4>
                <p className="text-sm text-muted-foreground">Regular episodes and expanded coverage of important topics</p>
              </div>
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
