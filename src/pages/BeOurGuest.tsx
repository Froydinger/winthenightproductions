import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, User, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

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
                  <span>Flexible recording options (video or audio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>Supportive, judgment-free environment</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-card/60 backdrop-blur-md border-2 border-neon-blue/40 shadow-neon">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
              Get in Touch
            </h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-neon-blue" />
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-background/50 border-2 border-neon-blue/30 rounded-lg focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neon-blue" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-background/50 border-2 border-neon-blue/30 rounded-lg focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-neon-blue" />
                  Tell Us About Yourself
                </label>
                <textarea
                  rows={6}
                  placeholder="What would you like to share with our community? What makes your story unique?"
                  className="w-full px-4 py-3 bg-background/50 border-2 border-neon-blue/30 rounded-lg focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-105 text-lg font-bold py-6 rounded-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Your Interest
              </Button>
            </form>
          </Card>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground">
            We review all submissions and will get back to you within 1-2 weeks.
          </p>
        </div>
      </div>
    </main>
  );
};

export default BeOurGuest;
