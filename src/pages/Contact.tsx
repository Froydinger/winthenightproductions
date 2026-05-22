import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Loader2, Clock, Mic } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const inputCls =
  "bg-background/60 border border-neon-blue/20 focus:border-neon-blue focus-visible:ring-neon-blue/30";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = contactSchema.parse({ name, email, message });
      setIsSubmitting(true);
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: validatedData,
      });
      if (error) throw error;
      toast({ title: "Message sent!", description: "Thanks for reaching out. We'll get back to you soon." });
      setName(""); setEmail(""); setMessage("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Validation Error", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <PageHero
        icon={Mail}
        eyebrow="Contact"
        title={
          <>
            Get in{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Touch
            </span>
          </>
        }
        lede="Have a question, story to share, or just want to say hi? We'd love to hear from you."
      />

      <div className="container mx-auto max-w-3xl px-4 pb-20 space-y-10">
        <SiteCard variant="strong">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
            <p className="text-foreground/65">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} maxLength={100} required className={inputCls} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} maxLength={255} required className={inputCls} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} disabled={isSubmitting} maxLength={1000} required className={`min-h-[150px] ${inputCls}`} />
              <p className="text-xs text-foreground/50 text-right">{message.length}/1000</p>
            </div>
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black text-base font-bold shadow-[0_0_30px_-8px_rgba(0,217,255,0.7)]">
              {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending...</>) : (<><Send className="mr-2 h-5 w-5" />Send Message</>)}
            </Button>
          </form>

          <div className="pt-6 mt-6 border-t border-neon-blue/15 text-center space-y-3">
            <p className="text-sm text-foreground/60">Prefer to email directly?</p>
            <Button asChild variant="outline" className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue">
              <a href="mailto:contact@winthenight.org" className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@winthenight.org
              </a>
            </Button>
          </div>
        </SiteCard>

        <div className="grid sm:grid-cols-2 gap-4">
          <SiteCard>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold text-foreground">Response Time</h3>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              We typically respond within 48 hours. If you haven't heard from us, check your spam folder or reach out again!
            </p>
          </SiteCard>
          <SiteCard>
            <div className="flex items-center gap-3 mb-2">
              <Mic className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold text-foreground">Be Our Guest</h3>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Interested in sharing your story on the podcast?{" "}
              <a href="/guest" className="text-neon-blue underline underline-offset-4 decoration-neon-blue/40 hover:decoration-neon-blue">
                Visit our guest page
              </a>{" "}
              for more details!
            </p>
          </SiteCard>
        </div>
      </div>
    </PageShell>
  );
};

export default Contact;
