import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Mic, Heart, Video, Shield, CheckCircle2, Sparkles, Calendar } from "lucide-react";

const BeOurGuest = () => {
  const lookingFor = [
    "Mental health professionals and advocates",
    "People with unique healing journeys",
    "Authors, artists, and content creators",
    "Anyone with a story that needs to be heard",
  ];
  const toExpect = [
    "Authentic, unscripted conversations",
    "A safe space to share your truth",
    "Flexible recording options (in-person in Chicagoland or virtual over Google Meet)",
    "Supportive, judgment-free environment",
  ];
  const reasons = [
    { icon: Mic, title: "Share Your Voice", desc: "Your story can help others feel less alone" },
    { icon: Heart, title: "Make an Impact", desc: "Inspire our community with your journey" },
    { icon: Video, title: "Easy Process", desc: "Simple setup with flexible recording options" },
    { icon: Shield, title: "Safe Space", desc: "Respectful and supportive environment" },
  ];

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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Join the Show</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              BE OUR <span className="text-[#00d9ff]">GUEST</span>
            </h1>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed">
              Share your story, insights, or expertise with the Win The Night community. We're always looking for authentic voices to join the conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal animation="slide-left" className="h-full">
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 rounded h-full space-y-6">
                <h2 className="font-bebas text-2xl tracking-wider text-white">What We're Looking For</h2>
                <ul className="space-y-4">
                  {lookingFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#555] leading-relaxed font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" className="h-full">
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 rounded h-full space-y-6">
                <h2 className="font-bebas text-2xl tracking-wider text-white">What to Expect</h2>
                <ul className="space-y-4">
                  {toExpect.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#555] leading-relaxed font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <CyanRule />

          {/* Reasons */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#00d9ff] mb-2 mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Four reasons to share your story</h2>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {reasons.map((r, idx) => (
                <ScrollReveal key={r.title} animation="fade-up" delay={idx * 100}>
                  <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 hover:border-[#00d9ff]/30 transition-all h-full">
                    <div className="w-10 h-10 rounded border border-[#1a1a1a] flex items-center justify-center mb-4 text-[#00d9ff]">
                      <r.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">{r.title}</h3>
                    <p className="text-[10px] text-[#555] leading-relaxed">{r.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <Rule />

          {/* Booking Embed */}
          <section className="space-y-8 max-w-2xl mx-auto text-center">
            <div className="space-y-2">
              <div className="inline-flex w-10 h-10 rounded border border-[#1a1a1a] items-center justify-center text-[#00d9ff] mb-2 mx-auto">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">Schedule your discovery call</h2>
              <p className="text-xs text-[#555] font-sans leading-relaxed max-w-md mx-auto">
                Book a time that works best for you to discuss being a guest on Win The Night. We'll talk about your story, what to expect, and answer any questions you have.
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[#00d9ff]/25 bg-[#071014]/85 p-2 shadow-[0_0_45px_rgba(0,217,255,0.12)] backdrop-blur-sm">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Z-ou-TJr-Kny8cwag3GTnqSZhS_3QyTR-sa59Sq7lCWBG40sbOS345Mw7gHqOZNWm7XJ6nA_O?gv=true"
                width="100%"
                height="700"
                frameBorder="0"
                className="block w-full rounded-2xl bg-white"
                title="Schedule a Discovery Call"
              />
            </div>
            
            <p className="text-[10px] text-[#555] uppercase tracking-wider">
              Select a time that works for you and we'll confirm your discovery call shortly.
            </p>
          </section>

        </div>

        <Footer />
      </main>
    </>
  );
};

export default BeOurGuest;
