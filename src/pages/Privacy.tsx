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
                Last updated: May 19, 2026
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Privacy Policy for Win The Night website (winthenight.org)
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
                  Win The Night Productions ("WTN," "we," "us," "our") operates the Win The Night website: <a href="https://winthenight.org" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">https://winthenight.org</a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy explains our data practices for the website. We are committed to protecting your privacy and handling your data responsibly.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Our Data Philosophy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We prioritize privacy and minimal data collection. We do not sell or share personal data with third parties. When you subscribe to our Pro Supporter plan via Stripe, we collect payment information necessary to process your subscription. We use your data only for providing access to the Maestro app builder and related services, and creating accounts on Arcana Notes and ArcAi if you don't already have one.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Authentication and Payments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Account creation and sign-in may use Google Sign-In. We do not extract or persist personal data from your Google account beyond what is strictly necessary to complete the sign-in session.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Payment for our Pro Supporter subscription is processed through Stripe. We do not store your full credit card information on our servers. Stripe handles all payment processing under their own privacy and security policies.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Website Data Collection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Win The Night website may collect minimal data necessary for providing features and services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong className="text-foreground">User Accounts:</strong> If you create an account or subscribe to our Pro Supporter plan, we collect information necessary to provide access to the Maestro app builder and to create accounts on Arcana Notes and ArcAi if you don't have one.</li>
                  <li><strong className="text-foreground">Payment Information:</strong> Stripe processes all payment information. We do not store your full payment details.</li>
                  <li><strong className="text-foreground">Community Features:</strong> Interactive features may require basic user information. No detailed behavioral tracking is performed.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not use tracking cookies to monitor user behavior. Essential cookies may be used only to maintain your login session and basic site functionality.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell personal data. We do not share personal data with third parties for marketing purposes. However, we share payment information with Stripe to process your subscriptions. Third-party services operate under their own policies and controls.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security controls to protect your data. We use secure authentication and maintain appropriate technical and organizational measures to safeguard your information. Payment information is handled securely by Stripe. While we take reasonable steps to protect your data, no method of transmission or storage is 100% secure.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your account and subscription information for as long as your account is active. Payment history is retained as required for billing and legal purposes. Upon account deletion or cancellation, we retain only information required by law. We do not keep detailed behavioral tracking logs beyond what is necessary for core functionality.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have certain rights regarding your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong className="text-foreground">Access:</strong> You can access your account information through your account dashboard.</li>
                  <li><strong className="text-foreground">Deletion:</strong> You can request deletion of your account and associated data.</li>
                  <li><strong className="text-foreground">Correction:</strong> You can update your account information at any time.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about your rights or want to exercise them, contact us using the details below.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors under 18. If you are under 18, please do not use our services.
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
