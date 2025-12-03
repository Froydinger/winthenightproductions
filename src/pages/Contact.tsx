import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate input
      const validatedData = contactSchema.parse({ name, email, message });

      setIsSubmitting(true);

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: validatedData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Contact Form Card */}
          <Card className="p-8 sm:p-12 bg-card/70 backdrop-blur-md border-2 border-neon-blue/40 hover:border-neon-blue/70 transition-all duration-300">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-6 rounded-full bg-neon-blue/20 border-2 border-neon-blue/40">
                    <Mail className="w-16 h-16 text-neon-blue" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Send Us a Message</h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={100}
                    required
                    className="bg-background/50 border-neon-blue/30 focus:border-neon-blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={255}
                    required
                    className="bg-background/50 border-neon-blue/30 focus:border-neon-blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={1000}
                    className="min-h-[150px] bg-background/50 border-neon-blue/30 focus:border-neon-blue"
                    required
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {message.length}/1000
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black text-lg font-bold hover:scale-105 transition-all duration-300 shadow-neon"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              {/* Email Backup */}
              <div className="pt-6 border-t border-neon-blue/20 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Prefer to email directly?
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300"
                >
                  <a
                    href="mailto:contact@winthenight.org"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    contact@winthenight.org
                  </a>
                </Button>
              </div>
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
