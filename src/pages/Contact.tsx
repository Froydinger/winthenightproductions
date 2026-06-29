import { Button } from "@/components/ui/button";
import { Mail, Clock, Mic, ExternalLink, BookOpen } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";

const Contact = () => {
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
        <SiteCard variant="strong" className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
          <p className="text-foreground/65 mb-6">
            The site no longer runs its own email backend. Email us directly and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black text-base font-bold shadow-[0_0_30px_-8px_rgba(0,217,255,0.7)]">
              <a href="mailto:contact@winthenight.org">
                <Mail className="mr-2 h-5 w-5" />
                contact@winthenight.org
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue">
              <a href="https://winthenight.blog" target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-5 w-5" />
                Substack
                <ExternalLink className="ml-2 h-4 w-4" />
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
              We typically respond within 48 hours. If you haven&apos;t heard from us, check your spam folder or reach out again.
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
              for more details.
            </p>
          </SiteCard>
        </div>
      </div>
    </PageShell>
  );
};

export default Contact;
