import { Card } from "@/components/ui/card";
import { Calendar, Mic, Heart, Video, Shield, Users, UserPlus } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InlineWidget } from "react-calendly";
import { useEffect } from "react";

const BeOurGuest = () => {
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
                  <UserPlus className="w-12 h-12 text-neon-blue" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Be Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">Guest</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Share your story, insights, or expertise with the Win The Night community. We're always looking for authentic voices to join the conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Info Cards Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* What We're Looking For */}
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">What We're Looking For</h2>
                </div>
                <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <ul className="relative z-10 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Mental health professionals and advocates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">People with unique healing journeys</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Authors, artists, and content creators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Anyone with a story that needs to be heard</span>
                    </li>
                  </ul>
                </Card>
              </div>

              {/* What to Expect */}
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">What to Expect</h2>
                </div>
                <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <ul className="relative z-10 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Authentic, unscripted conversations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">A safe space to share your truth</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Flexible recording options (in-person in Chicagoland or virtual over Google Meet)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Supportive, judgment-free environment</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Join Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Four reasons why sharing your story with us matters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-6 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-neon-blue/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Mic className="w-7 h-7 text-neon-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-neon-blue transition-colors">Share Your Voice</h3>
                  <p className="text-sm text-muted-foreground">Your story can help others feel less alone</p>
                </div>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-6 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-neon-blue/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Heart className="w-7 h-7 text-neon-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-neon-blue transition-colors">Make an Impact</h3>
                  <p className="text-sm text-muted-foreground">Inspire our community with your journey</p>
                </div>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-6 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-neon-blue/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Video className="w-7 h-7 text-neon-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-neon-blue transition-colors">Easy Process</h3>
                  <p className="text-sm text-muted-foreground">Simple setup with flexible recording options</p>
                </div>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-6 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-neon-blue/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                    <Shield className="w-7 h-7 text-neon-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-neon-blue transition-colors">Safe Space</h3>
                  <p className="text-sm text-muted-foreground">Respectful and supportive environment</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Calendly Scheduling Section */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Calendar className="w-10 h-10 text-neon-blue" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Schedule Your Discovery Call</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Book a time that works best for you to discuss being a guest on Win The Night. We'll talk about your story, what to expect, and answer any questions you have.
              </p>
            </div>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300">
              <div className="calendly-container w-full">
                <InlineWidget
                  url="https://calendly.com/jkrd09/podcast-discovery"
                  styles={{
                    height: '1400px',
                    minWidth: '100%',
                    width: '100%',
                  }}
                  pageSettings={{
                    backgroundColor: '0a0a0a',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '5dccff',
                    textColor: 'ffffff'
                  }}
                />
              </div>
            </Card>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Select a time that works for you and we'll confirm your discovery call shortly.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default BeOurGuest;
