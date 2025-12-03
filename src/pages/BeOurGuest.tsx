import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Mic, Heart, Video, Shield, Users, Sparkles, MessageCircle, Star } from "lucide-react";
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
        <section className="relative pt-20 pb-16 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 mb-6">
              <p className="text-neon-blue font-semibold text-sm">Your Story Matters</p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
              Be Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                Guest
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Join the conversation. Share your journey. Inspire our community with your authentic story.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-blue to-blue-600 hover:from-neon-blue/90 hover:to-blue-700 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-all duration-300 hover:scale-105 text-lg px-10 py-6 h-auto"
                onClick={() => {
                  const calendly = document.getElementById('calendly-section');
                  calendly?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Your Call
              </Button>
            </div>
          </div>
        </section>

        {/* Why Share Your Story Section */}
        <section className="relative py-16 px-6 md:px-12 lg:px-24 border-y border-border/30 bg-gradient-to-b from-background/50 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Share Your Story</h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Your voice has power. Your experience can help others feel less alone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-8 bg-gradient-to-br from-neon-blue/10 to-blue-900/5 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-neon-blue/40">
                  <Mic className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Amplify Your Voice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reach thousands who need to hear exactly what you have to say
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-neon-blue/10 to-blue-900/5 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-neon-blue/40">
                  <Heart className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Create Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Help others navigate their own journey through your experiences
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-neon-blue/10 to-blue-900/5 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-neon-blue/40">
                  <MessageCircle className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Real Conversations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Authentic, unscripted discussions in a supportive environment
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-neon-blue/10 to-blue-900/5 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-neon-blue/40">
                  <Users className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Join Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Become part of a movement focused on mental health and growth
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We're Looking For */}
        <section className="relative py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-1.5 bg-neon-blue rounded-full"></div>
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                    Who We're{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                      Looking For
                    </span>
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  We're seeking authentic voices with powerful stories to share. If you've walked through the fire and come out stronger, we want to hear from you.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-neon-blue/20 hover:border-neon-blue/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Mental Health Advocates</h4>
                      <p className="text-sm text-muted-foreground">Professionals, therapists, and champions of mental wellness</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-neon-blue/20 hover:border-neon-blue/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Healing Warriors</h4>
                      <p className="text-sm text-muted-foreground">Those with unique journeys through struggle and recovery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-neon-blue/20 hover:border-neon-blue/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Creative Voices</h4>
                      <p className="text-sm text-muted-foreground">Authors, artists, and content creators making an impact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-neon-blue/20 hover:border-neon-blue/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Everyday Heroes</h4>
                      <p className="text-sm text-muted-foreground">Anyone with a powerful story that needs to be heard</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="p-10 bg-gradient-to-br from-neon-blue/5 to-blue-900/5 backdrop-blur-md border-2 border-neon-blue/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <Sparkles className="w-12 h-12 text-neon-blue mb-6" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">What to Expect</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center flex-shrink-0 border border-neon-blue/30">
                          <Video className="w-5 h-5 text-neon-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Flexible Recording</h4>
                          <p className="text-sm text-muted-foreground">In-person or virtual over Google Meet—whatever works for you</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center flex-shrink-0 border border-neon-blue/30">
                          <Shield className="w-5 h-5 text-neon-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Safe Space</h4>
                          <p className="text-sm text-muted-foreground">Supportive, judgment-free environment to share your truth</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center flex-shrink-0 border border-neon-blue/30">
                          <Star className="w-5 h-5 text-neon-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Authentic You</h4>
                          <p className="text-sm text-muted-foreground">No scripts, no pressure—just real conversation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Calendly Scheduling Section */}
        <section id="calendly-section" className="relative py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background to-background/50 border-t border-border/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-6 rounded-full bg-neon-blue/10 mb-6 border-2 border-neon-blue/30">
                <Calendar className="w-12 h-12 text-neon-blue" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Let's Start the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Conversation
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Book a discovery call to discuss your story and what being on the show would look like.
              </p>
            </div>

            <Card className="p-8 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 shadow-2xl shadow-neon-blue/10">
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

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Questions? <a href="/contact" className="text-neon-blue hover:underline font-semibold">Contact us</a> and we'll get back to you right away.
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
