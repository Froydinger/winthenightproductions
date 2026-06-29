import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText } from "lucide-react";

const Terms = () => {
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Terms of Service</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              TERMS OF <span className="text-[#00d9ff]">SERVICE</span>
            </h1>
            <p className="text-xs text-[#555] uppercase tracking-wider font-sans">
              Last updated: June 2026
            </p>
          </div>

          <CyanRule />

          {/* Terms Text Container */}
          <ScrollReveal animation="fade-up">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 rounded space-y-8 text-left leading-relaxed text-xs text-[#888] font-sans">
              
              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing the Win The Night website, you agree to these Terms of Service. If you do not agree, please do not use the website.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">2. About Win The Night Foundation</h2>
                <p>
                  Win The Night Foundation is an independent mental health media project. Despite the word "Foundation" in our name, we are <strong>not a 501(c)(3) nonprofit, registered charity, or tax-exempt organization</strong>. Contributions are personal support payments and are not tax-deductible.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">3. Website and Content</h2>
                <p>
                  The website shares episodes, blog content, community updates, resources, and links to third-party platforms including YouTube, Substack, social platforms, Buy Me a Coffee, and Google Calendar. We may update, remove, or change content at any time.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">4. Support Payments</h2>
                <p>
                  Support payments are handled externally through <a href="https://buymeacoffee.com/winthenight" target="_blank" rel="noopener noreferrer" className="text-[#00d9ff] underline">Buy Me a Coffee</a>. We do not process payments, manage subscriptions, store payment details, or provide tax-deductible receipts through this website.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">5. Acceptable Use</h2>
                <p>
                  You agree not to misuse the website, attempt unauthorized access, disrupt service, or use the site for unlawful activity.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">6. Third-Party Services</h2>
                <p>
                  Third-party platforms operate under their own terms and privacy policies. We are not responsible for their practices, availability, or performance.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">7. Mental Health Disclaimer</h2>
                <p>
                  Win The Night is a storytelling and media project, not a clinical service. Our content does not replace professional care. If you are in immediate danger, call emergency services. In the United States, call or text 988 for crisis support.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">8. Intellectual Property</h2>
                <p>
                  The Win The Night name, logos, branding, site design, and original content are owned by Win The Night or used with permission. Do not copy, modify, or redistribute proprietary materials without permission.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">9. Disclaimers and Limitation of Liability</h2>
                <p>
                  The website is provided "as-is" and "as available." To the maximum extent permitted by law, Win The Night is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the website.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bebas text-2xl tracking-wider text-white">10. Contact</h2>
                <p>
                  For questions about these Terms, please contact us through our <a href="/contact" className="text-[#00d9ff] underline">contact page</a>.
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

export default Terms;
