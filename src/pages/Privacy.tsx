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
          Last updated: <time dateTime="2026-06-29">June 29, 2026</time>
        </p>

        <SiteCard>
          <Prose>
            <h2>1. Introduction</h2>
            <p>
              Win The Night Foundation is an independent mental health media project. This policy
              explains how the website handles data after moving to a lightweight Netlify-hosted
              setup.
            </p>

            <h2>2. Minimal Data Collection</h2>
            <p>
              We do not run site accounts, payment processing, community posting, or email delivery
              from this website. We do not sell personal data.
            </p>

            <h2>3. Third-Party Services</h2>
            <p>
              The site links to or embeds content from third-party platforms such as YouTube,
              Substack, Google Calendar, social platforms, Buy Me a Coffee, and optional AI chat
              services. Those services may collect data under their own privacy policies.
            </p>

            <h2>4. Support Payments</h2>
            <p>
              Support is handled externally by{" "}
              <a href="https://buymeacoffee.com/winthenight" target="_blank" rel="noopener noreferrer">
                Buy Me a Coffee
              </a>
              . We do not store payment card details or manage billing through this website.
            </p>

            <h2>5. Contact and Newsletter</h2>
            <p>
              Contact is handled through direct email links. Newsletter subscriptions and blog email
              delivery are handled by Substack.
            </p>

            <h2>6. Optional Arc Chat</h2>
            <p>
              If Arc chat is enabled, messages are sent to a Netlify Function and then to the AI
              provider configured for the site. Do not send sensitive personal, medical, financial,
              or legal information through chat.
            </p>

            <h2>7. Cookies and Analytics</h2>
            <p>
              The website may use local browser storage for interface preferences such as chat state
              or newsletter prompt state. We do not use site-managed login cookies.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not
              knowingly collect personal information from minors under 18.
            </p>

            <h2>9. Contact</h2>
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
