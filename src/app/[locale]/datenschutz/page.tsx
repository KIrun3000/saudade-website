import type { Metadata } from "next";

import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Saudade",
  description: "Privacy policy and data protection information for Saudade.",
};

export default function DatenschutzPage() {
  return (
    <LegalLayout eyebrow="Datenschutz" title="Privacy Policy" meta="Last updated · April 2026">
      <LegalSection heading="1 · Controller">
        <p>
          Saudade Creative Studio (Mayka), Portugal.
          <br />
          <a className="underline-offset-4 hover:underline" href="mailto:saudadestyle@gmail.com" style={{ opacity: 0.95 }}>saudadestyle@gmail.com</a>
        </p>
      </LegalSection>

      <LegalSection heading="2 · Data we collect">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Contact form submissions (name, email, message)</li>
          <li>Newsletter subscriptions (email)</li>
          <li>Usage data via analytics (if applicable)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3 · Purpose of processing">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>To respond to inquiries</li>
          <li>To send newsletter updates, with your consent</li>
          <li>To improve our website</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4 · Legal basis (GDPR Art. 6)">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Consent — newsletter</li>
          <li>Legitimate interest — analytics, website improvement</li>
          <li>Contract performance — shop orders, when applicable</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5 · Data sharing">
        <p>We do not sell personal data. Data may be processed by:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Vercel — hosting</li>
          <li>Shopify — shop, when applicable</li>
        </ul>
      </LegalSection>

      <LegalSection heading="6 · Your rights">
        <p>
          You have the right to access, rectify, delete, and port your data. To exercise these
          rights, contact{" "}
          <a className="underline-offset-4 hover:underline" href="mailto:saudadestyle@gmail.com" style={{ opacity: 0.95 }}>saudadestyle@gmail.com</a>.
        </p>
      </LegalSection>

      <LegalSection heading="7 · Cookies">
        <p>This website uses essential cookies only. No tracking cookies are set without consent.</p>
      </LegalSection>

      <LegalSection heading="8 · Changes">
        <p>We may update this policy from time to time. Any changes will be posted on this page.</p>
      </LegalSection>
    </LegalLayout>
  );
}
