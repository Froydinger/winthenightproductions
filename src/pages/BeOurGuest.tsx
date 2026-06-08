import { Calendar, Mic, Heart, Video, Shield, UserPlus, Sparkles, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SiteCard } from "@/components/site/SiteCard";

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
    <PageShell>
      <PageHero
        icon={UserPlus}
        eyebrow="Be Our Guest"
        title={
          <>
            Be Our{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Guest
            </span>
          </>
        }
        lede="Share your story, insights, or expertise with the Win The Night community. We're always looking for authentic voices to join the conversation."
      />

      <div className="container mx-auto max-w-4xl px-4 pb-20 space-y-12 sm:space-y-16">
        <div className="grid md:grid-cols-2 gap-4">
          <SiteCard>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What We're Looking For</h2>
            <ul className="space-y-3">
              {lookingFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-blue mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/75">{item}</span>
                </li>
              ))}
            </ul>
          </SiteCard>
          <SiteCard>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What to Expect</h2>
            <ul className="space-y-3">
              {toExpect.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-blue mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/75">{item}</span>
                </li>
              ))}
            </ul>
          </SiteCard>
        </div>

        <section>
          <SectionHeader
            icon={Sparkles}
            eyebrow="Why join us"
            title="Four reasons to share your story"
            align="center"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {reasons.map((r) => (
              <SiteCard key={r.title} className="group hover:-translate-y-0.5 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <r.icon className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-xs sm:text-sm text-foreground/65 leading-snug">{r.desc}</p>
              </SiteCard>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            icon={Calendar}
            eyebrow="Discovery call"
            title="Schedule your discovery call"
            lede="Book a time that works best for you to discuss being a guest on Win The Night. We'll talk about your story, what to expect, and answer any questions you have."
            align="center"
          />
          <div
            className="overflow-hidden rounded-2xl mx-auto w-full max-w-[460px]"
            style={{
              background:
                "linear-gradient(135deg, hsl(195 100% 88% / 0.95) 0%, hsl(0 0% 100%) 50%, hsl(195 100% 90% / 0.95) 100%)",
              boxShadow:
                "0 0 80px hsl(var(--neon-blue) / 0.45), 0 0 140px hsl(var(--neon-blue) / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.8)",
            }}
          >
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Z-ou-TJr-Kny8cwag3GTnqSZhS_3QyTR-sa59Sq7lCWBG40sbOS345Mw7gHqOZNWm7XJ6nA_O?gv=true"
              width="100%"
              height="720"
              frameBorder="0"
              className="block w-full rounded-2xl"
              title="Schedule a Discovery Call"
            />
          </div>
          <p className="text-center text-sm text-foreground/55 mt-4">
            Select a time that works for you and we'll confirm your discovery call shortly.
          </p>
        </section>
      </div>
    </PageShell>
  );
};

export default BeOurGuest;
