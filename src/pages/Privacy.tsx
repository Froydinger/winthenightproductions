import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                  <Shield className="w-12 h-12 text-neon-blue" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Privacy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Policy
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Last updated: December 29, 2025
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Unified Privacy Policy for Win The Night Productions and All Apps
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 space-y-8">

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Win The Night Productions ("WTN," "we," "us," "our") operates the following services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>ArcAi: <a href="https://askarc.chat" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">https://askarc.chat</a></li>
                  <li>Noteily: <a href="https://noteily.app" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">https://noteily.app</a></li>
                  <li>Pending.Press: <a href="https://pending.press" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">https://pending.press</a></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy covers all three services and explains our minimal data practices. We designed these products to be free to use and privacy-first.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Our Data Philosophy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not collect, store, sell, or share personal data. The only user-related interaction is authentication via Google Sign-In to let you access and use the apps. We do not retain profile details, content, or usage analytics tied to you.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Authentication (Google Sign-In)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All services use Google Sign-In solely to let you log in. We do not extract or persist personal data from your Google account beyond what is strictly necessary to complete the sign-in session. We do not build user profiles, track behavior, or combine data across products.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Product-Specific Details</h2>

                <div className="ml-4 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">A. ArcAi (askarc.chat)</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li><strong className="text-foreground">Purpose:</strong> Chatbot interface that uses Google Gemini to generate responses.</li>
                      <li><strong className="text-foreground">Data:</strong> We do not collect or store chat content, prompts, or outputs. No user analytics or tracking.</li>
                      <li><strong className="text-foreground">Sign-In:</strong> Auth via Google Sign-In only for session access. No personal data retention.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">B. Noteily (noteily.app)</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li><strong className="text-foreground">Purpose:</strong> Notes app that uses Lovable Cloud infrastructure for app functionality.</li>
                      <li><strong className="text-foreground">Data:</strong> We do not collect or store your notes, attachments, or collaboration data on WTN-owned systems. We do not mine content, and we do not run ads, analytics, or trackers.</li>
                      <li><strong className="text-foreground">Sign-In:</strong> Auth via Google Sign-In only. No personal data retention.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">C. Pending.Press (pending.press)</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li><strong className="text-foreground">Purpose:</strong> Digital magazine.</li>
                      <li><strong className="text-foreground">Ads:</strong> This is the only product that uses advertising (Google AdSense). AdSense may place cookies or similar technologies to deliver and measure ads, independent of WTN. We do not sell or share personal data.</li>
                      <li><strong className="text-foreground">Sign-In:</strong> May use Google Sign-In for account access where needed. No personal data retention by WTN beyond session authentication.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Cookies and Tracking</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong className="text-foreground">ArcAi and Noteily:</strong> No tracking cookies. Only the essential session mechanism associated with Google Sign-In may be used to keep you logged in.</li>
                  <li><strong className="text-foreground">Pending.Press:</strong> Google AdSense may use its own cookies or identifiers to serve and measure ads. WTN does not collect or store personal data from these cookies.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell personal data. We do not share personal data with third parties. Where third-party services (e.g., Google Sign-In, Google AdSense) operate, they do so under their own policies and controls.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement basic security controls appropriate to session-based access. Because we do not retain personal data, there is no personal dataset at WTN to be disclosed or breached.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  WTN does not retain personal data. Authentication is session-based; we do not keep user profiles, content, or usage logs tied to individuals.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Because we do not collect or store personal data, there is no data to access, correct, delete, or port. If you have questions about sessions or sign-in, contact us using the details below.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">11. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If we make material changes, we will update this page and the "Last updated" date. Continued use after updates constitutes acceptance of the revised policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">12. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Win The Night Productions
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy questions, please contact us through our{" "}
                  <a href="/contact" className="text-neon-blue hover:underline">
                    contact page
                  </a>
                  .
                </p>
              </div>

            </Card>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Privacy;
