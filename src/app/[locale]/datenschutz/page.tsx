import type { Metadata } from "next";

import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/datenschutz",
    title: "Privacy Policy",
    description: "Privacy policy and data protection information for Saudade.",
  });
}

export default function DatenschutzPage() {
  return (
    <LegalLayout eyebrow="Datenschutz" title="Privacy Policy" meta="Last updated · August 2026">
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
          <li>
            Anonymous, aggregated usage and page-performance data via Vercel Web Analytics and
            Speed Insights — cookieless, with no personal data collected and no tracking across
            other websites
          </li>
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
          <li>Vercel — hosting and cookieless analytics (Web Analytics, Speed Insights)</li>
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
        <p>
          This website uses essential cookies only. No tracking cookies are set without consent.
          Our analytics (Vercel Web Analytics and Speed Insights) are cookieless — they measure page
          views and page performance in aggregate, without storing cookies or tracking you across
          websites.
        </p>
      </LegalSection>

      <LegalSection heading="8 · Changes">
        <p>We may update this policy from time to time. Any changes will be posted on this page.</p>
      </LegalSection>
    </LegalLayout>
  );
}
