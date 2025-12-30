import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Shield, FileText } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Legal = () => {
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
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Scale className="w-12 h-12 text-neon-blue" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Legal{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Information
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Learn about our policies, terms, and how we protect your privacy and data.
              </p>
            </div>
          </div>
        </section>

        {/* Legal Documents Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Privacy Policy Card */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Shield className="w-8 h-8 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors mb-3">
                      Privacy Policy
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Learn how we collect, use, and protect your personal information. We are committed to maintaining the privacy and security of your data.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 w-full"
                  >
                    <a href="/privacy" className="flex items-center justify-center gap-2">
                      Read Privacy Policy
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Terms of Service Card */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <FileText className="w-8 h-8 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors mb-3">
                      Terms of Service
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Understand the terms and conditions that govern your use of our website and services. Please review these carefully.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 w-full"
                  >
                    <a href="/terms" className="flex items-center justify-center gap-2">
                      Read Terms of Service
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </Card>

            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-neon-blue/10 to-blue-900/10 border-2 border-neon-blue/40 p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Questions About Our Policies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our privacy practices or terms of service, please don't hesitate to reach out. We're here to help and ensure you understand how we protect and serve our community.
                </p>
                <div className="pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="border-2 border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300 hover:scale-105"
                  >
                    <a href="/contact">Contact Us</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Legal;
