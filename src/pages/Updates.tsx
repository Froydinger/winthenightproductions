import { Button } from "@/components/ui/button";
import { BookOpen, Youtube, Instagram, Facebook, Users, Heart, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SiteCard } from "@/components/site/SiteCard";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const communityLinks = [
  {
    icon: BookOpen,
    title: "Read the Blog",
    desc: "Longer updates, essays, and announcements live on Substack.",
    href: "https://winthenight.blog",
    label: "Open Substack",
  },
  {
    icon: Youtube,
    title: "Watch New Episodes",
    desc: "Follow the channel for full conversations, chapters, and shorts.",
    href: "https://youtube.com/@winthenight?sub_confirmation=1",
    label: "Open YouTube",
  },
  {
    icon: Instagram,
    title: "Follow the Socials",
    desc: "Short updates and clips land on Instagram and TikTok first.",
    href: "https://instagram.com/win_the_night",
    label: "Open Instagram",
  },
];

const Updates = () => {
  return (
    <PageShell>
      <PageHero
        icon={Users}
        eyebrow="Community"
        title={
          <>
            Community{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Updates
            </span>
          </>
        }
        lede="The old sign-in wall has been simplified. Follow Win The Night where the conversation is already happening."
      />

      <div className="container mx-auto max-w-5xl px-4 pb-20 space-y-12 sm:space-y-16">
        <section>
          <SectionHeader
            icon={Heart}
            eyebrow="Stay connected"
            title="Follow the conversation"
            lede="No account required here. The community now points to our public channels and newsletter."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-4">
            {communityLinks.map((item) => (
              <SiteCard key={item.title} className="group hover:-translate-y-0.5 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-neon-blue" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{item.title}</h2>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">{item.desc}</p>
                <Button asChild variant="outline" className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue">
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </SiteCard>
            ))}
          </div>
        </section>

        <SiteCard variant="strong" className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Get new updates by email</h2>
          <p className="text-foreground/65 max-w-xl mx-auto mb-6">
            Subscribe through Substack for new writing, podcast updates, and project notes.
          </p>
          <div className="flex justify-center">
            <NewsletterSubscribe />
          </div>
        </SiteCard>

        <div className="flex justify-center gap-3">
          <Button asChild variant="outline" className="border-border/50 hover:border-neon-blue/50">
            <a href="https://www.facebook.com/profile.php?id=100092673610697" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </a>
          </Button>
          <Button asChild variant="outline" className="border-border/50 hover:border-neon-blue/50">
            <a href="https://tiktok.com/@winthenightpod" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
          </Button>
        </div>
      </div>
    </PageShell>
  );
};

export default Updates;
