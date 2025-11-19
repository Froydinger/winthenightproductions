import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { InlineWidget } from "react-calendly";

const BeOurGuest = () => {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Be Our Guest! 🎙️
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your story, insights, or expertise with the Win The Night community. We're always looking for authentic voices to join the conversation.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 space-y-4">
              <h3 className="text-xl font-bold text-foreground">What We're Looking For</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Mental health professionals and advocates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>People with unique healing journeys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Authors, artists, and content creators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Anyone with a story that needs to be heard</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-md border-2 border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300 space-y-4">
              <h3 className="text-xl font-bold text-foreground">What to Expect</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Authentic, unscripted conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>A safe space to share your truth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Flexible recording options (in-person or virtual over Google Meet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Supportive, judgment-free environment</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Calendly Scheduling */}
          <Card className="pt-8 px-8 pb-4 bg-black border-2 border-neon-blue/40 shadow-neon">
            <div className="text-center mb-6">
              <Calendar className="w-12 h-12 text-neon-blue mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Schedule Your Discovery Call
              </h2>
              <p className="text-muted-foreground">
                Book a time that works best for you to discuss being a guest on Win The Night
              </p>
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

          {/* Footer Notes */}
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Select a time that works for you and we'll confirm your discovery call shortly.
            </p>
            <Card className="p-4 bg-card/40 backdrop-blur-sm border border-neon-blue/20">
              <p className="text-sm text-foreground">
                Once you've scheduled, take a look at{" "}
                <a 
                  href="https://winthenight.org/be-our-guest/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:text-neon-blue/80 underline underline-offset-4 transition-colors"
                >
                  this page for tips on what to expect as a guest
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BeOurGuest;
