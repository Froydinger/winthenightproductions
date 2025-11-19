import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();
  const [messageIndex, setMessageIndex] = useState(0);

  const snarkyMessages = [
    "Well, this is awkward... 😅",
    "You found the secret void! (Not really)",
    "404: Vibes Not Found",
    "This page went to therapy and never came back",
    "Lost? Aren't we all... but this page especially",
    "Even our 404 page has commitment issues",
  ];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Rotate messages every 3 seconds
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % snarkyMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Header */}
      <Header />

      {/* Floating Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-neon-blue/20 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-neon-blue/15 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite_2s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Animated Ghost */}
          <div className="flex justify-center">
            <div className="relative group">
              <Ghost 
                className="w-24 h-24 text-neon-blue animate-[bounce_2s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 group-hover:scale-110" 
                strokeWidth={1.5}
              />
              <Sparkles 
                className="absolute -top-2 -right-2 w-6 h-6 text-neon-blue animate-[spin_3s_linear_infinite] opacity-80"
              />
            </div>
          </div>

          {/* Glitchy 404 */}
          <div className="relative">
            <h1 className="text-8xl sm:text-9xl font-black text-foreground animate-fade-in tracking-tighter">
              404
            </h1>
            <div className="absolute inset-0 text-8xl sm:text-9xl font-black text-neon-blue/30 animate-[pulse_2s_ease-in-out_infinite] blur-sm tracking-tighter">
              404
            </div>
          </div>

          {/* Rotating Snarky Messages */}
          <div className="min-h-[80px] flex items-center justify-center">
            <p 
              key={messageIndex}
              className="text-xl sm:text-2xl text-muted-foreground animate-fade-in font-medium px-4"
            >
              {snarkyMessages[messageIndex]}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-md mx-auto">
            Looks like this page doesn't exist. Maybe it's on a healing journey too?
          </p>

          {/* Action Button */}
          <div className="flex justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-neon-blue text-background hover:bg-neon-blue/90 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Take Me Home
              </Link>
            </Button>
          </div>

          {/* Cute Note */}
          <div className="pt-8 animate-fade-in">
            <p className="text-sm text-muted-foreground/60 italic">
              "Not all who wander are lost... but you definitely are right now 💙"
            </p>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/40 rounded-full animate-[fade-in_3s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;
