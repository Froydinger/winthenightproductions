import { Button } from "@/components/ui/button";
import {
  Info,
  Mic,
  Users,
  BookOpen,
  Anchor,
  Heart,
  Play,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SiteCard } from "@/components/site/SiteCard";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const About = () => {
  const introVideoId = "cIHJZUOIPco";
  const featuredVideoId = "UL_ayxMAFqM";
  const featuredTitle = "Get a Taste of What We Do";
  const featuredDescription =
    "If you get some time to throw this on in the background, it's one of our favorite episodes—a conversation between Josh and his friend, Brandon.";
  const jakeBio = "Runs the socials, Substack, and YouTube channel.";
  const joshBio = "Podcast host offering creative and collaborative insights.";

  const pillars = [
    {
      icon: Mic,
      title: "Conversations",
      desc: "Our flagship podcast is the core of the Foundation — long-form conversations that explore the resilience of the human spirit.",
    },
    {
      icon: Users,
      title: "Community",
      desc: "A safe space — online and in person — where people can share their stories, find each other, and heal together.",
    },
    {
      icon: BookOpen,
      title: "Resources & Ventures",
      desc: "Essays, short-form video, care & crisis guides, and new healing-focused projects we're building under the Foundation.",
    },
  ];

  return (
    <PageShell>
      <PageHero
        icon={Info}
        eyebrow="About"
        title={
          <>
            About{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Win The Night™ Foundation
            </span>
          </>
        }
        lede={
          <>
            A mental health media organization creating a safe space for
            people to share their{" "}
            <span className="text-neon-blue font-semibold">stories</span>, find{" "}
            <span className="text-neon-blue font-semibold">community</span>, and{" "}
            <span className="text-neon-blue font-semibold">heal together</span>.
          </>
        }
        actions={
          <>
            <Button
              asChild
              size="lg"
              className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-[0_0_30px_-8px_rgba(0,217,255,0.7)] transition-all"
            >
              <a href="#community">Join the Community</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue"
            >
              <a href="#intro-video">Watch Our Message</a>
            </Button>
          </>
        }
      />

      <div className="container mx-auto max-w-4xl px-4 pb-20 space-y-12 sm:space-y-16">
        {/* Mission */}
        <section>
          <SectionHeader
            icon={Heart}
            eyebrow="Our mission"
            title="What the Foundation is"
            lede="A safe space to share your story, find community, and heal together."
          />
          <SiteCard>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              <strong className="text-foreground">Win The Night™ Foundation</strong>{" "}
              is a mental health media organization. The flagship podcast is
              our core community outreach, and around it we're building a
              growing family of healing-focused projects — essays, short-form
              video, live conversations, care & crisis resources, and new
              ventures still to come. Everything we make is in service of one
              idea: real recovery happens through honest stories, not clean
              ones.
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed mt-4">
              Win The Night™ Foundation is an independent media organization.
              We are <strong className="text-foreground/80">not</strong> a
              501(c)(3) nonprofit, registered charity, tax-exempt entity, or a
              clinical or medical service.
            </p>
          </SiteCard>
        </section>
        {/* Pillars */}
        <section>
          <SectionHeader
            icon={Sparkles}
            eyebrow="How we do it"
            title="Three pillars guiding the Foundation"
            lede="The shape of everything we publish — every episode, essay, and conversation — comes from these three commitments."
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <SiteCard key={p.title} className="group hover:-translate-y-0.5 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <p.icon className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{p.desc}</p>
              </SiteCard>
            ))}
          </div>
        </section>

        {/* Intro Video */}
        <section id="intro-video">
          <SectionHeader
            icon={Play}
            eyebrow="Watch"
            title="The heart of our mission"
            lede="See what drives us to keep the conversation going."
          />
          <SiteCard className="p-0 overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${introVideoId}`}
                title="Welcome to Win The Night"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </SiteCard>
        </section>

        {/* Founders */}
        <section>
          <SectionHeader
            icon={Users}
            eyebrow="Behind the Foundation"
            title="The co-founders"
            lede="A little about us."
          />
          <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-6">
            Win The Night™ Foundation was co-founded by two high school best
            friends and storytellers/filmmakers at heart,{" "}
            <strong className="text-foreground">Josh Lopez</strong> (host) and{" "}
            <strong className="text-foreground">Jake Freudinger</strong>{" "}
            (producer).
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <SiteCard>
              <h3 className="text-foreground font-bold text-xl mb-1">Josh Lopez</h3>
              <p className="text-neon-blue/80 text-xs uppercase tracking-wider mb-2">Host · Co-Founder</p>
              <p className="text-foreground/70 leading-relaxed">{joshBio}</p>
            </SiteCard>
            <SiteCard>
              <h3 className="text-foreground font-bold text-xl mb-1">Jake Freudinger</h3>
              <p className="text-neon-blue/80 text-xs uppercase tracking-wider mb-2">Producer · Co-Founder</p>
              <p className="text-foreground/70 leading-relaxed">{jakeBio}</p>
            </SiteCard>
          </div>
          <SiteCard variant="strong" className="relative">
            <Anchor className="absolute top-5 right-5 w-6 h-6 text-neon-blue/40" />
            <blockquote className="text-lg sm:text-xl text-foreground italic font-medium text-center">
              "If this were a boat, Josh would be the captain, and Jake the trusted Navigator."
            </blockquote>
          </SiteCard>
          <p className="text-foreground/65 leading-relaxed text-center pt-6">
            We digress—we're glad you're here and we hope you enjoy what we're building.
          </p>
        </section>

        {/* Featured episode */}
        <section>
          <SectionHeader
            icon={Play}
            eyebrow="Featured episode"
            title={featuredTitle}
            lede={featuredDescription}
          />
          <SiteCard className="p-0 overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${featuredVideoId}`}
                title="Featured Episode"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </SiteCard>
        </section>

        {/* Community CTA */}
        <section id="community">
          <SiteCard variant="strong" className="text-center">
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-neon-blue/20 blur-2xl" aria-hidden />
                <div className="relative p-4 rounded-2xl border border-neon-blue/30 bg-background/60">
                  <Heart className="w-9 h-9 text-neon-blue" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Join the Community
            </h2>
            <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-6">
              Be part of a community of people who want to{" "}
              <strong className="text-neon-blue">Win The Night, together</strong>, one conversation
              at a time.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-[0_0_30px_-8px_rgba(0,217,255,0.7)]"
            >
              <a href="/guest" className="inline-flex items-center gap-2">
                Be Our Guest
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </SiteCard>
        </section>
        {/* Newsletter */}
        <section id="newsletter">
          <SectionHeader
            icon={Heart}
            eyebrow="Newsletter"
            title="Get our newsletter"
            lede="New essays, episodes, and reflections in your inbox."
          />
          <div className="flex justify-center">
            <NewsletterSubscribe />
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default About;
