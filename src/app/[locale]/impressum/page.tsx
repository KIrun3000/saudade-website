import type { Metadata } from "next";

import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum — Saudade",
  description: "Legal notice and operator details for Saudade.",
};

export default function ImpressumPage() {
  return (
    <LegalLayout
      eyebrow="Impressum"
      title="Legal Notice"
      meta="Informação nos termos do Art. 5 TMG"
    >
      <LegalSection heading="Operator · Betreiber">
        <p>
          Mayka — Saudade Creative Studio
          <br />
          Portugal
        </p>
      </LegalSection>

      <LegalSection heading="Contact · Kontakt">
        <p>
          Email:{" "}
          <a className="underline-offset-4 hover:underline" href="mailto:saudadestyle@gmail.com" style={{ opacity: 0.95 }}>saudadestyle@gmail.com</a>
          <br />
          Phone: (+351) 968 179 500
          <br />
          Instagram: @saudadevoces
        </p>
      </LegalSection>

      <LegalSection heading="Responsible for content · Verantwortlich für den Inhalt">
        <p>Mayka — Saudade Creative Studio, Portugal</p>
      </LegalSection>

      <LegalSection heading="Dispute resolution · Streitschlichtung">
        <p>
          The European Commission provides a platform for online dispute resolution (ODR):
        </p>
        <p>
          <a
            className="underline-offset-4 hover:underline"
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noreferrer"
            style={{ opacity: 0.95 }}
          >
            ec.europa.eu/consumers/odr
          </a>
        </p>
        <p style={{ opacity: 0.55, fontStyle: "italic" }}>
          We are not obliged and generally not willing to participate in dispute resolution
          proceedings before a consumer arbitration board.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
