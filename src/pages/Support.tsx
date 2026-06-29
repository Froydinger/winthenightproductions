import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, Zap, Mic, Users, Coffee, ExternalLink } from "lucide-react";

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/winthenight";

const Support = () => {
  const impact = [
    { icon: Mic, title: "Production Equipment", desc: "Invest in high-grade camera rigs, microphones, and studio space for professional broadcast quality." },
    { icon: Users, title: "Expert Guests", desc: "Bring on clinical psychologists, trauma therapists, veterans, and mental health advocates." },
    { icon: Zap, title: "Content Expansion", desc: "Support the editing staff, written essays, video editing suites, and community platform fees." },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Support Us</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              SUPPORT THE <span className="text-[#00d9ff]">SHOW</span>
            </h1>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed">
              Love what we're doing? Help us keep the conversation going — every contribution makes a difference in building this community.
            </p>
          </div>

          {/* Buy me a coffee card */}
          <ScrollReveal animation="scale-in">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 sm:p-12 rounded text-center space-y-6">
              <p className="text-xs text-[#555] max-w-md mx-auto leading-relaxed">
                Support our independent media series directly through Buy Me a Coffee. It keeps operations lightweight, simple, and off-site.
              </p>
              
              <a
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-8 py-4 rounded shadow-[0_0_16px_rgba(0,217,255,0.4)] transition-all mx-auto"
              >
                <Coffee className="w-4 h-4" />
                Support on Buy Me a Coffee
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <p className="text-[10px] text-[#3a3a3a] uppercase tracking-wider">
                Contributions are handled externally by Buy Me a Coffee.
              </p>

              <div className="max-w-xl mx-auto rounded border border-[#00d9ff]/20 bg-[#00d9ff]/5 px-5 py-4 text-left">
                <p className="text-xs text-[#888] leading-relaxed">
                  <strong className="text-[#00d9ff] uppercase tracking-wider text-[10px] block mb-1">Important Legal Notice</strong>
                  Win The Night Foundation is <strong>not a 501(c)(3) nonprofit, registered charity, or tax-exempt organization</strong>. Contributions are personal support payments for an independent community media project and are <strong>not tax-deductible</strong>.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <CyanRule />

          {/* Where it goes */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#00d9ff] mb-2 mx-auto">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Where every contribution goes</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {impact.map((i, idx) => (
                <ScrollReveal key={i.title} animation="fade-up" delay={idx * 100}>
                  <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 hover:border-[#00d9ff]/30 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded border border-[#1a1a1a] flex items-center justify-center mb-4 text-[#00d9ff]">
                        <i.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">{i.title}</h3>
                      <p className="text-[10px] text-[#555] leading-relaxed">{i.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <Rule />

          <p className="text-center text-xs text-[#555] font-sans leading-relaxed">
            <Heart className="inline w-4 h-4 text-[#00d9ff] mr-1.5" />
            Thank you for being part of the Win The Night community! Your support means everything.
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Support;
