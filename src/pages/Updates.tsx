import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { BookOpen, Youtube, Instagram, Facebook, Heart, ExternalLink } from "lucide-react";

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
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Updates</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              COMMUNITY <span className="text-[#00d9ff]">UPDATES</span>
            </h1>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed">
              Follow Win The Night for new episodes, essays, clips, and community notes.
            </p>
          </div>

          {/* Staggered Community cards */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#00d9ff] mb-2 mx-auto">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Follow the conversation</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {communityLinks.map((item, idx) => (
                <ScrollReveal key={item.title} animation="fade-up" delay={idx * 100}>
                  <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 hover:border-[#00d9ff]/30 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded border border-[#1a1a1a] flex items-center justify-center mb-4 text-[#00d9ff]">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">{item.title}</h3>
                      <p className="text-[10px] text-[#555] leading-relaxed mb-6">{item.desc}</p>
                    </div>

                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-4 py-2.5 rounded transition-all flex items-center justify-center gap-1.5"
                    >
                      {item.label}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <CyanRule />

          {/* Substack Newsletter */}
          <section className="py-12 text-center space-y-6 max-w-md mx-auto">
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Get updates by email</h2>
            <p className="text-xs text-[#555] max-w-xs mx-auto leading-relaxed">
              Subscribe through Substack for new writing, podcast updates, and project notes.
            </p>
            <div className="w-full">
              <NewsletterSubscribe />
            </div>
          </section>

          {/* Other social buttons */}
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100092673610697"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
            <a
              href="https://tiktok.com/@winthenightpod"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all flex items-center gap-2"
            >
              TikTok
            </a>
          </div>

        </div>

        <Footer />
      </main>
    </>
  );
};

export default Updates;
