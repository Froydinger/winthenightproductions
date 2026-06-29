import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { defaultSiteSettings, fetchSiteSettings } from "@/lib/site-settings";
import { Info, Mic, Users, BookOpen, Anchor, Heart, Play, Sparkles } from "lucide-react";

const About = () => {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSiteSettings().then(setSettings);
  }, []);

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
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-24 pb-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-20">
          {/* Editorial Header */}
          <div className="border-b border-[#1a1a1a] pb-10 space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00d9ff]">About Us</p>
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7">
                <h1 className="font-bebas text-6xl sm:text-8xl tracking-wider text-white leading-[0.85]">
                  ABOUT THE<br />
                  <span className="text-[#00d9ff]">FOUNDATION</span>
                </h1>
              </div>
              <div className="md:col-span-5 md:pt-2">
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  Win The Night™ Foundation is a mental health media organization creating a safe space for people to share stories, build connection, and heal together.
                </p>
                <div className="flex gap-4 mt-6">
                  <a
                    href="#intro-video"
                    className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all"
                  >
                    Watch Message
                  </a>
                  <a
                    href="#community"
                    className="border border-[#2a2a2a] hover:border-white text-white font-semibold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-colors"
                  >
                    Join Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Content (Editorial Pull-Quote Style) */}
          <ScrollReveal animation="fade-up">
            <div className="border-l-2 border-[#00d9ff] pl-6 md:pl-10 py-2 space-y-6 max-w-3xl">
              <h2 className="font-bebas text-sm tracking-[0.2em] text-[#00d9ff] uppercase">Our Mission</h2>
              <p 
                className="font-serif text-xl sm:text-3xl text-white/95 leading-relaxed italic tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "Everything we make is in service of one idea: real recovery happens through honest stories, not clean ones."
              </p>
              <p className="text-xs text-[#888] leading-relaxed max-w-2xl font-sans">
                Win The Night™ Foundation is building a growing family of healing-focused projects — essays, short-form video, live conversations, care & crisis resources, and new ventures. Our flagship podcast is the core of our community outreach.
              </p>
              <div className="text-[9px] text-[#444] leading-relaxed border-t border-[#161616] pt-3 uppercase tracking-wider max-w-xl">
                Win The Night™ Foundation is an independent media organization. We are NOT a 501(c)(3) nonprofit, registered charity, tax-exempt entity, or a clinical or medical service.
              </div>
            </div>
          </ScrollReveal>

          <CyanRule />

          {/* Pillars Section */}
          <section className="relative overflow-hidden rounded border border-[#1a1a1a] bg-[#050505]/80">
            <div className="absolute inset-x-0 top-0 h-px bg-[#00d9ff]" />
            <div className="p-6 sm:p-10 space-y-10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Principles</p>
              <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white">Three Pillars Guiding Us</h2>
              <p className="text-xs sm:text-sm text-[#777] leading-relaxed">
                Everything under Win The Night is built to move people from isolation into honest conversation, practical support, and community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-0 border border-[#1a1a1a] bg-black">
              {pillars.map((p, idx) => (
                <ScrollReveal key={p.title} animation="fade-up" delay={idx * 100}>
                  <div className="group min-h-[17rem] border-b md:border-b-0 md:border-r last:border-b-0 md:last:border-r-0 border-[#1a1a1a] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:bg-[#00d9ff]/[0.03]">
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="w-10 h-10 rounded border border-[#1a1a1a] bg-[#080808] flex items-center justify-center text-[#00d9ff] shadow-[0_0_18px_rgba(0,217,255,0.08)] group-hover:border-[#00d9ff]/40 transition-colors">
                        <p.icon className="w-4 h-4" />
                        </div>
                        <span className="font-bebas text-5xl leading-none text-transparent opacity-30" style={{ WebkitTextStroke: "1px rgba(0,217,255,0.45)" }}>
                          0{idx + 1}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-base font-bold uppercase tracking-wider text-white">{p.title}</h3>
                        <p className="text-sm text-[#777] leading-relaxed font-sans">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            </div>
          </section>

          <Rule />

          {/* Intro Video Section */}
          <section id="intro-video" className="grid md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-5 border border-[#1a1a1a] bg-[#050505] p-6 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#00d9ff]">
                  <Play className="w-4 h-4 fill-[#00d9ff]" />
                </div>
                <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white leading-none">
                The Heart of<br />Our Mission
              </h2>
                <p className="text-sm text-[#777] leading-relaxed font-sans">
                Watch a brief overview from our founders outlining why we started Win The Night and what we hope to build.
              </p>
              </div>
              <a href="/watch" className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00d9ff] hover:gap-3 transition-all">
                Watch more
                <Play className="w-3.5 h-3.5 fill-[#00d9ff]" />
              </a>
            </div>
            <div className="md:col-span-7">
              <div className="relative border border-[#1a1a1a] overflow-hidden aspect-video bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-x-0 top-0 h-px bg-[#00d9ff] z-10" />
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${settings.about_intro_video_id}`}
                  title="Welcome to Win The Night"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <Rule />

          {/* Founders & Team Section */}
          <section className="space-y-8">
            <div className="grid md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-7 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00d9ff]">The Team</p>
              <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white">Co-Founders &amp; Team</h2>
              </div>
              <p className="md:col-span-5 text-sm text-[#777] leading-relaxed font-sans">
              Win The Night™ Foundation was co-founded by two high school best friends and storytellers/filmmakers at heart, Josh Lopez (host) and Jake Freudinger (producer).
            </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-[#1a1a1a] bg-[#050505] p-6 sm:p-8 space-y-4 min-h-[15rem]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#00d9ff]">01</div>
                <h3 className="font-serif text-2xl text-white tracking-tight" style={{ fontFamily: "Georgia, serif" }}>Josh Lopez</h3>
                <p className="text-[9px] uppercase tracking-wider text-[#00d9ff] font-semibold">Host · Co-Founder</p>
                <p className="text-sm text-[#777] leading-relaxed font-sans">{settings.about_josh_bio}</p>
              </div>

              <div className="border border-[#1a1a1a] bg-[#050505] p-6 sm:p-8 space-y-4 min-h-[15rem]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#00d9ff]">02</div>
                <h3 className="font-serif text-2xl text-white tracking-tight" style={{ fontFamily: "Georgia, serif" }}>Jake Freudinger</h3>
                <p className="text-[9px] uppercase tracking-wider text-[#00d9ff] font-semibold">Producer · Co-Founder</p>
                <p className="text-sm text-[#777] leading-relaxed font-sans">{settings.about_jake_bio}</p>
              </div>
            </div>

            <div className="border border-[#1a1a1a] p-6 sm:p-8 text-center relative max-w-2xl mx-auto mt-6 bg-[#050505] shadow-[0_0_34px_rgba(0,217,255,0.05)]">
              <Anchor className="absolute top-4 right-4 w-4 h-4 text-[#00d9ff]/25" />
              <blockquote 
                className="font-serif text-base italic text-white/80 leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "If this were a boat, Josh would be the captain, and Jake the trusted Navigator."
              </blockquote>
            </div>
          </section>

          <Rule />

          {/* Featured Episode Section */}
          <section className="grid md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-5 border border-[#1a1a1a] bg-[#050505] p-6 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Featured Watch</p>
                <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white leading-none">
                {settings.about_featured_title || "Featured Episode"}
              </h2>
                <p className="text-sm text-[#777] leading-relaxed font-sans">
                {settings.about_featured_description || "If you get some time to throw this on in the background, it's one of our favorite episodes—a conversation between Josh and his friend, Brandon."}
              </p>
              </div>
              <a href="/watch" className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00d9ff] hover:gap-3 transition-all">
                Browse episodes
                <Play className="w-3.5 h-3.5 fill-[#00d9ff]" />
              </a>
            </div>
            <div className="md:col-span-7">
              <div className="relative border border-[#1a1a1a] overflow-hidden aspect-video bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-x-0 top-0 h-px bg-[#00d9ff] z-10" />
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${settings.about_featured_video_id}`}
                  title="Featured Episode"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <CyanRule />

          {/* Footer Callouts Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Join Community CTA */}
            <section id="community" className="border border-[#1a1a1a] p-8 sm:p-10 text-center space-y-8 flex flex-col justify-between items-center bg-[#050505] min-h-[22rem]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded border border-[#1a1a1a] flex items-center justify-center text-[#00d9ff] mx-auto">
                  <Heart className="w-5 h-5" />
                </div>
                <h2 className="font-bebas text-3xl tracking-wider text-white">Join the Community</h2>
                <p className="text-sm text-[#777] max-w-xs mx-auto leading-relaxed">
                  Be part of a community of people who want to <strong>Win The Night, together</strong>, one conversation at a time.
                </p>
              </div>
              <a
                href="/guest"
                className="inline-flex items-center justify-center gap-2 bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all mt-4"
              >
                Be Our Guest
              </a>
            </section>

            {/* Newsletter Subscribe */}
            <section id="newsletter" className="border border-[#1a1a1a] p-8 sm:p-10 text-center space-y-8 flex flex-col justify-between items-center bg-[#050505] min-h-[22rem]">
              <div className="space-y-4 w-full">
                <div className="w-10 h-10 rounded border border-[#1a1a1a] flex items-center justify-center text-[#00d9ff] mx-auto">
                  <Heart className="w-5 h-5" />
                </div>
                <h2 className="font-bebas text-3xl tracking-wider text-white">Get Our Newsletter</h2>
                <p className="text-sm text-[#777] max-w-xs mx-auto leading-relaxed">
                  New essays, episodes, and reflections in your inbox.
                </p>
              </div>
              <div className="w-full mt-4">
                <NewsletterSubscribe />
              </div>
            </section>
          </div>

        </div>

        <Footer />
      </main>
    </>
  );
};

export default About;
