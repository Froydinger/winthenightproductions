import { Card } from "@/components/ui/card";
import { Calendar, Mic, Heart, Video, Shield } from "lucide-react";
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
        <section className="relative py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-1.5 bg-neon-blue rounded-full"></div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
                Be Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">Guest</span>
              </h1>
            </div>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Share your story, insights, or expertise with the Win The Night community. We're always looking for authentic voices to join the conversation.
            </p>
          </div>
        </section>

        {/* Info Cards Section */}
        <section className="relative pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* What We're Looking For */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">What We're Looking For</h2>
                </div>
                <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300">
                  <ul className="space-y-4">
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
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">What to Expect</h2>
                </div>
                <Card className="p-8 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300">
                  <ul className="space-y-4">
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
                      <span className="text-muted-foreground">Flexible recording options (in-person or virtual over Google Meet)</span>
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
        <section className="relative pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Join Us</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <Mic className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Share Your Voice</h3>
                <p className="text-sm text-muted-foreground">Your story can help others feel less alone</p>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <Heart className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Make an Impact</h3>
                <p className="text-sm text-muted-foreground">Inspire our community with your journey</p>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <Video className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Easy Process</h3>
                <p className="text-sm text-muted-foreground">Simple setup with flexible recording options</p>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-md border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-neon-blue/30">
                  <Shield className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Safe Space</h3>
                <p className="text-sm text-muted-foreground">Respectful and supportive environment</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Calendly Scheduling Section */}
        <section className="relative pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Schedule Your Discovery Call</h2>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Book a time that works best for you to discuss being a guest on Win The Night. We'll talk about your story, what to expect, and answer any questions you have.
              </p>
            </div>

            <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calendar className="w-10 h-10 text-neon-blue" />
              </div>

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
                    primaryColor: '00d4ff',
                    textColor: 'ffffff'
                  }}
                />
              </div>
            </Card>

            <div className="text-center mt-6">
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
