import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import {
  ArrowUpRight,
  BookOpen,
  Facebook,
  Instagram,
  Music2,
  Radio,
  Youtube,
} from "lucide-react";

const communityLinks = [
  {
    icon: Instagram,
    platform: "Instagram",
    handle: "@win_the_night",
    desc: "New clips, behind-the-scenes moments, and updates from across the community.",
    href: "https://instagram.com/win_the_night",
    accent: "from-[#d946ef]/20 via-[#f97316]/10 to-transparent",
    iconColor: "text-[#f472b6]",
    hoverBorder: "hover:border-[#f472b6]/70",
  },
  {
    icon: Youtube,
    platform: "YouTube",
    handle: "@winthenight",
    desc: "Full conversations, new episodes, chapters, and shorts.",
    href: "https://youtube.com/@winthenight?sub_confirmation=1",
    accent: "from-[#ff0033]/20 via-[#ff0033]/5 to-transparent",
    iconColor: "text-[#ff3158]",
    hoverBorder: "hover:border-[#ff3158]/70",
  },
  {
    icon: BookOpen,
    platform: "Substack",
    handle: "@winthenight",
    desc: "Our most in-depth essays and an ad-free version of the podcast.",
    href: "https://open.substack.com/pub/winthenight",
    accent: "from-[#ff6719]/20 via-[#ff6719]/5 to-transparent",
    iconColor: "text-[#ff8a4c]",
    hoverBorder: "hover:border-[#ff8a4c]/70",
  },
  {
    icon: Facebook,
    platform: "Facebook",
    handle: "Win The Night",
    desc: "Share the work, join the conversation, and stay close to the community.",
    href: "https://www.facebook.com/profile.php?id=100092673610697",
    accent: "from-[#1877f2]/20 via-[#1877f2]/5 to-transparent",
    iconColor: "text-[#5b9df9]",
    hoverBorder: "hover:border-[#5b9df9]/70",
  },
  {
    icon: Music2,
    platform: "TikTok",
    handle: "@winthenightpod",
    desc: "Fast cuts, honest moments, and clips made to meet you where you are.",
    href: "https://tiktok.com/@winthenightpod",
    accent: "from-[#25f4ee]/15 via-[#fe2c55]/10 to-transparent",
    iconColor: "text-[#25f4ee]",
    hoverBorder: "hover:border-[#25f4ee]/70",
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 sm:py-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Updates</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              COMMUNITY <span className="text-[#00d9ff]">UPDATES</span>
            </h1>
            <p className="text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
              The conversation doesn't stop when an episode ends. Follow along, share what
              moves you, and help us build this community everywhere you already are.
            </p>
          </div>

          {/* Social hub */}
          <section className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#00d9ff]/25 bg-[#070b0d]/90 px-6 py-7 sm:px-9 sm:py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/10 via-transparent to-[#00d9ff]/5" aria-hidden />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00d9ff]/30 bg-[#00d9ff]/10 text-[#00d9ff] shadow-[0_0_30px_rgba(0,217,255,0.12)]">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00d9ff]">
                      Find your channel
                    </p>
                    <h2 className="font-bebas text-3xl tracking-wider text-white sm:text-4xl">
                      Follow the conversation
                    </h2>
                  </div>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-white/50 sm:text-right">
                  Five places to watch, read, connect, and keep the mission moving.
                  Pick your favorite—or come hang with us on all of them.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-6">
              {communityLinks.map((item, idx) => (
                <ScrollReveal
                  key={item.platform}
                  animation="fade-up"
                  delay={idx * 80}
                  className={idx < 3 ? "md:col-span-2" : "md:col-span-3"}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Win The Night on ${item.platform} ${item.handle}`}
                    className={`group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-6 transition-all duration-300 hover:-translate-y-1 ${item.hoverBorder} hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:p-7`}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} aria-hidden />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/5 transition-transform duration-500 group-hover:scale-125" aria-hidden />

                    <div className="relative">
                      <div className="mb-7 flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/45 ${item.iconColor}`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                      </div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                        {item.platform}
                      </p>
                      <h3 className="text-xl font-bold tracking-tight text-white">{item.handle}</h3>
                    </div>

                    <p className="relative mt-8 max-w-sm text-sm leading-relaxed text-white/50 transition-colors group-hover:text-white/65">
                      {item.desc}
                    </p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <CyanRule />

          {/* Substack Newsletter */}
          <section className="py-12 text-center space-y-6 max-w-md mx-auto">
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Get updates by email</h2>
            <p className="text-sm text-[#555] max-w-xs mx-auto leading-relaxed">
              Subscribe through Substack for our deepest writing and the ad-free podcast.
            </p>
            <div className="w-full">
              <NewsletterSubscribe />
            </div>
          </section>

        </div>

        <Footer />
      </main>
    </>
  );
};

export default Updates;
