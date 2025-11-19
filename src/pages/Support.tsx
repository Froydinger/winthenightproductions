import { Card } from "@/components/ui/card";
import { Coffee, Heart } from "lucide-react";
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

          {/* Buy Me a Coffee Embed */}
          <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 space-y-6">
            <div className="text-center space-y-4">
              <Coffee className="w-16 h-16 text-neon-blue mx-auto animate-pulse" />
              <h2 className="text-3xl font-bold text-foreground">Buy Us a Coffee</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Every contribution helps us continue creating meaningful content and supporting mental health conversations
              </p>
            </div>
            
            <div className="flex justify-center pt-4">
              <iframe
                src="https://www.buymeacoffee.com/widget/page/winthenight?description=Support%20Win%20The%20Night%20podcast&color=%2300d9ff"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: '700px',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'transparent'
                }}
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
