import { FileText } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";
import { Prose } from "@/components/site/Prose";

const Terms = () => {
  return (
    <PageShell>
      <PageHero
        icon={FileText}
        eyebrow="Terms of Service"
        title={
          <>
            Terms of{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Service
            </span>
          </>
        }
        lede="Terms of Service for Win The Night website (winthenight.org)"
      />

      <div className="container mx-auto max-w-3xl px-4 pb-20">
        <p className="text-center text-sm text-foreground/60 mb-8">
          Last updated: <time dateTime="2026-05-19">May 19, 2026</time>
        </p>

        <SiteCard>
          <Prose>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Win The Night website (
              <a href="https://winthenight.org" target="_blank" rel="noopener noreferrer">
                winthenight.org
              </a>
              ) operated by Win The Night Productions ("WTN," "we," "us," "our"), you agree to be
              bound by these Terms of Service. If you do not agree, please do not use our website
              or services.
            </p>

            <h2>2. Description of Services</h2>
            <h3>Win The Night Website</h3>
            <p>
              The primary website for Win The Night (
              <a href="https://winthenight.org" target="_blank" rel="noopener noreferrer">
                winthenight.org
              </a>
              ), featuring episodes, blog content, community updates, and resources. The website
              includes interactive features that may require authentication.
            </p>
            <h3>Pro Supporter Subscription</h3>
            <p>
              We offer a Pro Supporter subscription plan via Stripe. When you subscribe, you
              receive paid access to our Maestro app builder. If you don't already have an
              account, we create an account for you on Arcana Notes and ArcAi. This subscription
              is billed according to the plan you select.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any service at any time.
              Material changes will be communicated to users.
            </p>

            <h2>3. User Accounts, Authentication, and Payments</h2>
            <p>
              Access to our services may require authentication via Google Sign-In. By signing in,
              you represent that:
            </p>
            <ul>
              <li>You have the authority to use the Google account you provide</li>
              <li>You will comply with Google's terms of service</li>
              <li>You are at least 18 years of age</li>
            </ul>
            <p>
              <strong>Payment Processing:</strong> When you subscribe to our Pro Supporter plan,
              payment is processed through Stripe. By subscribing, you authorize Stripe to charge
              your payment method according to the plan terms. All payment information is handled
              by Stripe under their own security and privacy practices.
            </p>

            <h2>4. Subscription Terms and Refund Policy</h2>
            <p>
              <strong>Billing:</strong> Your Pro Supporter subscription is billed according to the
              plan you select (e.g., monthly, annual). Billing occurs on the date you subscribe
              and then on the corresponding date each billing cycle.
            </p>
            <p>
              <strong>Refund Policy:</strong> We offer a 14-day refund window from the date of
              your initial subscription purchase. If you request a refund within 14 days, we will
              provide a full refund of your subscription fee. After 14 days, no refunds are
              available, though you may cancel your subscription at any time to prevent future
              charges.
            </p>
            <p>
              <strong>Cancellation:</strong> You may cancel your subscription at any time through
              your account settings or by contacting us. Cancellation takes effect at the end of
              your current billing period. You will not be charged for future billing cycles after
              cancellation.
            </p>
            <p>
              <strong>Price Changes:</strong> We may change subscription prices with at least 30
              days' notice. Changes take effect on your next billing date.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with or disrupt the integrity or performance of our services</li>
              <li>Use automated means (bots, scripts, etc.) to access our services without permission</li>
              <li>Upload or transmit viruses, malware, or any other malicious code</li>
              <li>Harass, abuse, or harm others through our services</li>
              <li>Violate any third party's intellectual property or privacy rights</li>
            </ul>

            <h2>6. User Content</h2>
            <p>
              You retain ownership of any content you create or upload to our website. You are
              responsible for ensuring you have the rights to any content you submit. We do not
              claim ownership of your content.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>Our website integrates with third-party platforms:</p>
            <ul>
              <li>
                <strong>Google Sign-In:</strong> Authentication is governed by Google's terms and
                policies
              </li>
              <li>
                <strong>Stripe:</strong> Payment processing is governed by Stripe's terms and
                policies
              </li>
            </ul>
            <p>
              We are not responsible for the practices, performance, or availability of these
              third-party services.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The Win The Night Productions name, logos, and branding are our property. The
              design, layout, and software underlying our services are protected by copyright and
              other intellectual property laws. You may not copy, modify, or distribute our
              proprietary materials without permission.
            </p>

            <h2>9. Disclaimers</h2>
            <p>
              <strong className="uppercase">
                Our website is provided "as-is" and "as available" without warranties of any kind,
                express or implied.
              </strong>{" "}
              We do not guarantee:
            </p>
            <ul>
              <li>Uninterrupted or error-free operation</li>
              <li>Accuracy, reliability, or completeness of content</li>
              <li>Security against unauthorized access or data loss</li>
              <li>Fitness for any particular purpose</li>
            </ul>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Win The Night Productions shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages,
              including loss of data, revenue, or profits, arising from your use of our
              services—even if we have been advised of the possibility of such damages.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Win The Night Productions from any claims,
              damages, losses, or expenses (including legal fees) arising from your use of our
              services or violation of these Terms.
            </p>

            <h2>12. Termination</h2>
            <p>
              We may suspend or terminate your access to our website at any time, with or without
              cause, with or without notice. You may stop using our website at any time. Upon
              termination:
            </p>
            <ul>
              <li>Your right to access the website immediately ceases</li>
              <li>
                If you have an active Pro Supporter subscription, cancellation takes effect at the
                end of the current billing period (unless otherwise noted)
              </li>
              <li>We may retain certain data as required by law or for legitimate business purposes</li>
              <li>Provisions regarding disclaimers, liability, and indemnification survive termination</li>
            </ul>

            <h2>13. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of the United States, without regard to
              conflict of law principles. Any disputes arising from these Terms or the services
              shall be resolved through binding arbitration or in courts of competent jurisdiction.
            </p>

            <h2>14. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Material changes will be reflected on this
              page with an updated "Last updated" date. Continued use of our services after
              changes constitutes acceptance of the revised Terms.
            </p>

            <h2>15. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>

            <h2>16. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement
              between you and Win The Night Productions regarding the use of our services.
            </p>

            <h2>17. Contact</h2>
            <p>Win The Night Productions</p>
            <p>
              For questions about these Terms, please contact us through our{" "}
              <a href="/contact">contact page</a>.
            </p>
          </Prose>
        </SiteCard>
      </div>
    </PageShell>
  );
};

export default Terms;
