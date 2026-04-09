import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
          setSubscribed(true);
        } else {
          throw error;
        }
      } else {
        // Send welcome email
        const subId = crypto.randomUUID();
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "welcome-subscriber",
            recipientEmail: email.trim().toLowerCase(),
            idempotencyKey: `welcome-sub-${subId}`,
          },
        });
        setSubscribed(true);
        toast.success("You're in! Check your inbox for a welcome email.");
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-neon-blue">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">You're subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 bg-background/50 border-border"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold whitespace-nowrap"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterSubscribe;
