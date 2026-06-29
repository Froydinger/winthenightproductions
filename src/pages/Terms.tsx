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
          Last updated: <time dateTime="2026-06-29">June 29, 2026</time>
        </p>

        <SiteCard>
          <Prose>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing the Win The Night website, you agree to these Terms of Service. If you do
              not agree, please do not use the website.
            </p>

            <h2>2. About Win The Night Foundation</h2>
            <p>
              Win The Night Foundation is an independent mental health media project. Despite the
              word "Foundation" in our name, we are <strong>not a 501(c)(3) nonprofit, registered
              charity, or tax-exempt organization</strong>. Contributions are personal support
              payments and are not tax-deductible.
            </p>

            <h2>3. Website and Content</h2>
            <p>
              The website shares episodes, blog content, community updates, resources, and links to
              third-party platforms including YouTube, Substack, social platforms, Buy Me a Coffee,
              and Google Calendar. We may update, remove, or change content at any time.
            </p>

            <h2>4. Support Payments</h2>
            <p>
              Support payments are handled externally through{" "}
              <a href="https://buymeacoffee.com/winthenight" target="_blank" rel="noopener noreferrer">
                Buy Me a Coffee
              </a>
              . We do not process payments, manage subscriptions, store payment details, or provide
              tax-deductible receipts through this website.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to misuse the website, attempt unauthorized access, disrupt service, or use the site for unlawful activity.</p>

            <h2>6. Third-Party Services</h2>
            <p>
              Third-party platforms operate under their own terms and privacy policies. We are not
              responsible for their practices, availability, or performance.
            </p>

            <h2>7. Mental Health Disclaimer</h2>
            <p>
              Win The Night is a storytelling and media project, not a clinical service. Our content
              does not replace professional care. If you are in immediate danger, call emergency
              services. In the United States, call or text 988 for crisis support.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The Win The Night name, logos, branding, site design, and original content are owned by
              Win The Night or used with permission. Do not copy, modify, or redistribute proprietary
              materials without permission.
            </p>

            <h2>9. Disclaimers and Limitation of Liability</h2>
            <p>
              The website is provided "as-is" and "as available." To the maximum extent permitted by
              law, Win The Night is not liable for indirect, incidental, special, consequential, or
              punitive damages arising from use of the website.
            </p>

            <h2>10. Contact</h2>
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
