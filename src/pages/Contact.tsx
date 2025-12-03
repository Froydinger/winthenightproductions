import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Contact = () => {
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
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-12 h-12 text-neon-blue animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, story to share, or just want to say hi? We'd love to hear from you!
            </p>
          </div>

          {/* Contact CTA Card */}
          <Card className="p-8 sm:p-12 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue/70 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-neon-blue/20 border-2 border-neon-blue/40">
                  <Mail className="w-16 h-16 text-neon-blue" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Let's Connect</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Whether you're interested in being a guest, have feedback, or just want to reach out—drop us an email and we'll get back to you as soon as possible.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-neon-blue hover:bg-neon-blue/90 text-black text-lg px-12 py-6 h-auto hover:scale-105 transition-all duration-300 shadow-neon"
              >
                <a 
                  href="mailto:contact@winthenight.org"
                  className="flex items-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Email Us
                </a>
              </Button>
              <p className="text-sm text-muted-foreground pt-4">
                contact@winthenight.org
              </p>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/60 backdrop-blur-md border border-neon-blue/30">
              <h3 className="text-xl font-bold text-foreground mb-3">Response Time</h3>
              <p className="text-muted-foreground">
                We typically respond within 48 hours. If you haven't heard from us, check your spam folder or reach out again!
              </p>
            </Card>
            <Card className="p-6 bg-card/60 backdrop-blur-md border border-neon-blue/30">
              <h3 className="text-xl font-bold text-foreground mb-3">Be Our Guest</h3>
              <p className="text-muted-foreground">
                Interested in sharing your story on the podcast? <a href="/be-our-guest" className="text-neon-blue hover:underline">Visit our guest page</a> for more details!
              </p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Contact;
