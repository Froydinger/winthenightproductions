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
                Last updated: May 19, 2026
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Terms of Service for Win The Night website (winthenight.org)
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
                  By accessing or using the Win The Night website (<a href="https://winthenight.org" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">winthenight.org</a>) operated by Win The Night Productions ("WTN," "we," "us," "our"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Description of Services</h2>

                <div className="ml-4 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">Win The Night Website</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The primary website for Win The Night (<a href="https://winthenight.org" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">winthenight.org</a>), featuring episodes, blog content, community updates, and resources. The website includes interactive features that may require authentication.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">Pro Supporter Subscription</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer a Pro Supporter subscription plan via Stripe. When you subscribe, you receive paid access to our Maestro app builder. If you don't already have an account, we create an account for you on Arcana Notes and ArcAi. This subscription is billed according to the plan you select.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any service at any time. Material changes will be communicated to users.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. User Accounts, Authentication, and Payments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Access to our services may require authentication via Google Sign-In. By signing in, you represent that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>You have the authority to use the Google account you provide</li>
                  <li>You will comply with Google's terms of service</li>
                  <li>You are at least 18 years of age</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Payment Processing:</strong> When you subscribe to our Pro Supporter plan, payment is processed through Stripe. By subscribing, you authorize Stripe to charge your payment method according to the plan terms. All payment information is handled by Stripe under their own security and privacy practices.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Subscription Terms and Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Billing:</strong> Your Pro Supporter subscription is billed according to the plan you select (e.g., monthly, annual). Billing occurs on the date you subscribe and then on the corresponding date each billing cycle.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Refund Policy:</strong> We offer a 14-day refund window from the date of your initial subscription purchase. If you request a refund within 14 days, we will provide a full refund of your subscription fee. After 14 days, no refunds are available, though you may cancel your subscription at any time to prevent future charges.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Cancellation:</strong> You may cancel your subscription at any time through your account settings or by contacting us. Cancellation takes effect at the end of your current billing period. You will not be charged for future billing cycles after cancellation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Price Changes:</strong> We may change subscription prices with at least 30 days' notice. Changes take effect on your next billing date.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Acceptable Use</h2>
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
                <h2 className="text-2xl font-bold text-foreground">6. User Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of any content you create or upload to our website. You are responsible for ensuring you have the rights to any content you submit. We do not claim ownership of your content.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website integrates with third-party platforms:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong className="text-foreground">Google Sign-In:</strong> Authentication is governed by Google's terms and policies</li>
                  <li><strong className="text-foreground">Stripe:</strong> Payment processing is governed by Stripe's terms and policies</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We are not responsible for the practices, performance, or availability of these third-party services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Win The Night Productions name, logos, and branding are our property. The design, layout, and software underlying our services are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our proprietary materials without permission.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground uppercase">Our website is provided "as-is" and "as available" without warranties of any kind, express or implied.</strong> We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Uninterrupted or error-free operation</li>
                  <li>Accuracy, reliability, or completeness of content</li>
                  <li>Security against unauthorized access or data loss</li>
                  <li>Fitness for any particular purpose</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Win The Night Productions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or profits, arising from your use of our services—even if we have been advised of the possibility of such damages.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">11. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless Win The Night Productions from any claims, damages, losses, or expenses (including legal fees) arising from your use of our services or violation of these Terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">12. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may suspend or terminate your access to our website at any time, with or without cause, with or without notice. You may stop using our website at any time. Upon termination:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Your right to access the website immediately ceases</li>
                  <li>If you have an active Pro Supporter subscription, cancellation takes effect at the end of the current billing period (unless otherwise noted)</li>
                  <li>We may retain certain data as required by law or for legitimate business purposes</li>
                  <li>Provisions regarding disclaimers, liability, and indemnification survive termination</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">13. Governing Law and Disputes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of the United States, without regard to conflict of law principles. Any disputes arising from these Terms or the services shall be resolved through binding arbitration or in courts of competent jurisdiction.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">14. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these Terms at any time. Material changes will be reflected on this page with an updated "Last updated" date. Continued use of our services after changes constitutes acceptance of the revised Terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">15. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">16. Entire Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Win The Night Productions regarding the use of our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">17. Contact</h2>
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
