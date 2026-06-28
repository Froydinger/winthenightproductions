import { Shield } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";
import { Prose } from "@/components/site/Prose";

const Privacy = () => {
  return (
    <PageShell>
      <PageHero
        icon={Shield}
        eyebrow="Privacy Policy"
        title={
          <>
            Privacy{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Policy
            </span>
          </>
        }
        lede="Privacy Policy for Win The Night website (winthenight.org)"
      />

      <div className="container mx-auto max-w-3xl px-4 pb-20">
        <p className="text-center text-sm text-foreground/60 mb-8">
          Last updated: <time dateTime="2026-05-19">May 19, 2026</time>
        </p>

        <SiteCard>
          <Prose>
            <h2>1. Introduction</h2>
            <p>
              Win The Night Foundation ("WTN," "we," "us," "our") is a mental health media
              organization creating a safe space for people to share their stories, find
              community, and heal together. We operate the Win The Night website:{" "}
              <a href="https://winthenight.org" target="_blank" rel="noopener noreferrer">
                https://winthenight.org
              </a>
            </p>
            <p>
              <strong>Organizational status:</strong> Win The Night Foundation is{" "}
              <strong>not a 501(c)(3) nonprofit, registered charity, or tax-exempt entity</strong>,
              despite the word "Foundation" in our name. We are an independent media project.
              Any contributions are personal support payments and are not tax-deductible.
            </p>
            <p>
              This Privacy Policy explains our data practices for the website. We are committed to
              protecting your privacy and handling your data responsibly.
            </p>

            <h2>2. Our Data Philosophy</h2>
            <p>
              We prioritize privacy and minimal data collection. We do not sell or share personal
              data with third parties. When you subscribe to our Pro Supporter plan via Stripe, we
              collect only the information necessary to process your subscription and to display
              your name on our Pro Supporters wall.
            </p>


            <h2>3. Authentication and Payments</h2>
            <p>
              Account creation and sign-in may use Google Sign-In. We do not extract or persist
              personal data from your Google account beyond what is strictly necessary to complete
              the sign-in session.
            </p>
            <p>
              Payment for our Pro Supporter subscription is processed through Stripe. We do not
              store your full credit card information on our servers. Stripe handles all payment
              processing under their own privacy and security policies.
            </p>

            <h2>4. Website Data Collection</h2>
            <p>
              The Win The Night website may collect minimal data necessary for providing features
              and services:
            </p>
            <ul>
              <li>
                <strong>User Accounts:</strong> If you create an account or subscribe to our Pro
                Supporter plan, we collect basic information (name, email) needed to manage your
                subscription and feature you on the Pro Supporters wall.
              </li>

              <li>
                <strong>Payment Information:</strong> Stripe processes all payment information. We
                do not store your full payment details.
              </li>
              <li>
                <strong>Community Features:</strong> Interactive features may require basic user
                information. No detailed behavioral tracking is performed.
              </li>
            </ul>

            <h2>5. Cookies and Tracking</h2>
            <p>
              We do not use tracking cookies to monitor user behavior. Essential cookies may be
              used only to maintain your login session and basic site functionality.
            </p>

            <h2>6. Data Sharing</h2>
            <p>
              We do not sell personal data. We do not share personal data with third parties for
              marketing purposes. However, we share payment information with Stripe to process
              your subscriptions. Third-party services operate under their own policies and
              controls.
            </p>

            <h2>7. Security</h2>
            <p>
              We implement industry-standard security controls to protect your data. We use secure
              authentication and maintain appropriate technical and organizational measures to
              safeguard your information. Payment information is handled securely by Stripe. While
              we take reasonable steps to protect your data, no method of transmission or storage
              is 100% secure.
            </p>

            <h2>8. Data Retention</h2>
            <p>
              We retain your account and subscription information for as long as your account is
              active. Payment history is retained as required for billing and legal purposes. Upon
              account deletion or cancellation, we retain only information required by law. We do
              not keep detailed behavioral tracking logs beyond what is necessary for core
              functionality.
            </p>

            <h2>9. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your data:</p>
            <ul>
              <li>
                <strong>Access:</strong> You can access your account information through your
                account dashboard.
              </li>
              <li>
                <strong>Deletion:</strong> You can request deletion of your account and associated
                data.
              </li>
              <li>
                <strong>Correction:</strong> You can update your account information at any time.
              </li>
            </ul>
            <p>
              If you have questions about your rights or want to exercise them, contact us using
              the details below.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not
              knowingly collect personal information from minors under 18. If you are under 18,
              please do not use our services.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              If we make material changes, we will update this page and the "Last updated" date.
              Continued use after updates constitutes acceptance of the revised policy.
            </p>

            <h2>12. Contact</h2>
            <p>Win The Night Foundation</p>
            <p>
              For privacy questions, please contact us through our <a href="/contact">contact page</a>.
            </p>
          </Prose>
        </SiteCard>
      </div>
    </PageShell>
  );
};

export default Privacy;
