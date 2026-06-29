import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Privacy Policy</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              PRIVACY <span className="text-[#00d9ff]">POLICY</span>
            </h1>
            <p className="text-xs text-[#555] uppercase tracking-wider font-sans">
              Last updated: June 2026
            </p>
          </div>

          <CyanRule />

          {/* Policy Text Container */}
          <ScrollReveal animation="fade-up">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 rounded space-y-8 text-left leading-relaxed text-xs text-[#888] font-sans">
              
              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">1. Introduction</h2>
                <p>
                  Win The Night Foundation is an independent mental health media project. This policy explains how this website handles data after moving to a lightweight Netlify-hosted setup.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">2. Minimal Data Collection</h2>
                <p>
                  We do not run site accounts, payment processing, community posting, or email delivery from this website. We do not sell personal data.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">3. Third-Party Services</h2>
                <p>
                  The site links to or embeds content from third-party platforms such as YouTube, Substack, Google Calendar, social platforms, Buy Me a Coffee, and optional AI chat services. Those services may collect data under their own privacy policies.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">4. Support Payments</h2>
                <p>
                  Support is handled externally by <a href="https://buymeacoffee.com/winthenight" target="_blank" rel="noopener noreferrer" className="text-[#00d9ff] underline">Buy Me a Coffee</a>. We do not store payment card details or manage billing through this website.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">5. Contact and Newsletter</h2>
                <p>
                  Contact is handled through direct email links and contact forms. Newsletter subscriptions and blog email delivery are handled by Substack.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">6. Optional Arc Chat</h2>
                <p>
                  If Arc chat is enabled, messages are sent to a Netlify Function and then to the AI provider configured for the site. Do not send sensitive personal, medical, financial, or legal information through chat.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">7. Cookies and Analytics</h2>
                <p>
                  The website may use local browser storage for interface preferences such as chat state or newsletter prompt state. We do not use site-managed login cookies.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">8. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors under 18.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">9. Contact</h2>
                <p>
                  For privacy questions, please contact us through our <a href="/contact" className="text-[#00d9ff] underline">contact page</a>.
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Privacy;
