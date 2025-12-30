import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Terms = () => {
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
                  <FileText className="w-12 h-12 text-neon-blue" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Terms of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Service
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Last updated: December 29, 2025
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Unified Terms of Service for Win The Night Productions and All Apps
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="relative pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 space-y-8">

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using any Win The Night Productions ("WTN," "we," "us," "our") services—including ArcAi (<a href="https://askarc.chat" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">askarc.chat</a>), Noteily (<a href="https://noteily.app" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">noteily.app</a>), and Pending.Press (<a href="https://pending.press" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">pending.press</a>)—you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Description of Services</h2>

                <div className="ml-4 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">ArcAi</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A chatbot interface that uses Google Gemini to generate responses. We provide this service "as-is" for informational and conversational purposes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">Noteily</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A notes application using Lovable Cloud infrastructure. You may create, edit, and manage notes through the app.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">Pending.Press</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A digital magazine platform. This service may display advertising via Google AdSense.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  All services are provided free of charge. We reserve the right to modify, suspend, or discontinue any service at any time without notice.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. User Accounts and Authentication</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Access to our services requires authentication via Google Sign-In. By signing in, you represent that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>You have the authority to use the Google account you provide</li>
                  <li>You will comply with Google's terms of service</li>
                  <li>You are at least 18 years of age</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We do not store or retain your Google account information beyond what is necessary for session authentication.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Use our services for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Use automated means (bots, scripts, etc.) to access our services without permission</li>
                  <li>Upload or transmit viruses, malware, or any other malicious code</li>
                  <li>Harass, abuse, or harm others through our services</li>
                  <li>Violate any third party's intellectual property or privacy rights</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. User Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">For ArcAi:</strong> Chat conversations, prompts, and outputs are stored encrypted at rest and tied to your authenticated session for functionality purposes. You retain the ability to delete your chat history at any time. We do not claim ownership of your conversations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">For Noteily:</strong> You retain all ownership rights to notes and content you create. We do not claim ownership or rights to your content. We do not access, mine, or analyze your notes. Your notes are stored encrypted on Lovable Cloud infrastructure.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">For Pending.Press:</strong> Content published on the platform may be subject to separate editorial guidelines. You are responsible for ensuring you have the rights to any content you submit.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services integrate with third-party platforms:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong className="text-foreground">Google Sign-In:</strong> Authentication is governed by Google's terms and policies</li>
                  <li><strong className="text-foreground">Google Gemini:</strong> ArcAi responses are generated by Google's AI systems</li>
                  <li><strong className="text-foreground">Lovable Cloud:</strong> Noteily infrastructure is provided by Lovable</li>
                  <li><strong className="text-foreground">Google AdSense:</strong> Advertising on Pending.Press is managed by Google</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We are not responsible for the practices, performance, or availability of these third-party services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Win The Night Productions name, logos, and branding are our property. The design, layout, and software underlying our services are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our proprietary materials without permission.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground uppercase">Our services are provided "as-is" and "as available" without warranties of any kind, express or implied.</strong> We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Uninterrupted or error-free operation</li>
                  <li>Accuracy, reliability, or completeness of content or outputs (especially AI-generated responses)</li>
                  <li>Security against unauthorized access or data loss</li>
                  <li>Fitness for any particular purpose</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">AI Content Disclaimer:</strong> Responses from ArcAi are generated by artificial intelligence and may contain inaccuracies, errors, or inappropriate content. Do not rely on AI outputs for critical decisions, medical advice, legal advice, or professional guidance.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Win The Night Productions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or profits, arising from your use of our services—even if we have been advised of the possibility of such damages.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless Win The Night Productions from any claims, damages, losses, or expenses (including legal fees) arising from your use of our services or violation of these Terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">11. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may suspend or terminate your access to any or all services at any time, with or without cause, with or without notice. You may stop using our services at any time. Upon termination:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Your right to access the services immediately ceases</li>
                  <li>You should delete any content you wish to preserve (chat history in ArcAi, notes in Noteily) before terminating your account</li>
                  <li>We may retain certain data as required by law or for legitimate business purposes</li>
                  <li>Provisions regarding disclaimers, liability, and indemnification survive termination</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">12. Governing Law and Disputes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of the United States, without regard to conflict of law principles. Any disputes arising from these Terms or the services shall be resolved through binding arbitration or in courts of competent jurisdiction.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">13. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these Terms at any time. Material changes will be reflected on this page with an updated "Last updated" date. Continued use of our services after changes constitutes acceptance of the revised Terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">14. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">15. Entire Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Win The Night Productions regarding the use of our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">16. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Win The Night Productions
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms, please contact us through our{" "}
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

export default Terms;
