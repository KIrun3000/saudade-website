import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection information for Saudade.",
};

export default function DatenschutzPage() {
  return (
    <main className="bg-bg-light py-24">
      <section className="mx-auto max-w-4xl px-6 md:px-8">
        <h1 className="luxury-label text-[14px] text-accent-muted">
          Privacy Policy / Datenschutzerklaerung
        </h1>
        <p className="mt-4 text-text-on-light/80">Last updated: April 2026</p>

        <div className="mt-8 space-y-8 text-text-on-light">
          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">1. Controller</h2>
            <p className="mt-3">Mayka [NACHNAME], Portugal</p>
            <p>saudadestyle@gmail.com</p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">2. Data We Collect</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Contact form submissions (name, email, message)</li>
              <li>Newsletter subscriptions (email)</li>
              <li>Usage data via analytics (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">
              3. Purpose of Processing
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>To respond to inquiries</li>
              <li>To send newsletter updates (with consent)</li>
              <li>To improve our website</li>
            </ul>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">
              4. Legal Basis (GDPR Art. 6)
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Consent (newsletter)</li>
              <li>Legitimate interest (analytics, website improvement)</li>
              <li>Contract performance (shop orders, when applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">5. Data Sharing</h2>
            <p className="mt-3">We do not sell personal data. Data may be processed by:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Vercel (hosting)</li>
              <li>Shopify (shop, when applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">6. Your Rights</h2>
            <p className="mt-3">
              You have the right to access, rectify, delete, and port your data.
              Contact: saudadestyle@gmail.com
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">7. Cookies</h2>
            <p className="mt-3">
              This website uses essential cookies only. No tracking cookies without
              consent.
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">8. Changes</h2>
            <p className="mt-3">
              We may update this policy. Changes will be posted on this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
