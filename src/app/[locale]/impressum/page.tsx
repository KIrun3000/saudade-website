import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice and operator details for Saudade.",
};

export default function ImpressumPage() {
  return (
    <main className="bg-bg-light py-24">
      <section className="mx-auto max-w-4xl px-6 md:px-8">
        <h1 className="luxury-label text-[14px] text-accent-muted">Impressum</h1>

        <div className="mt-8 space-y-8 text-text-on-light">
          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">
              Angaben gemaess Art. 5 TMG / Informacao nos termos do Art. 5 TMG
            </h2>
          </section>

          <section>
            <h3 className="luxury-label text-[10px] text-accent-muted">Betreiber / Operator</h3>
            <p className="mt-3">Mayka [NACHNAME BITTE ERGAENZEN]</p>
            <p>[STRASSE + HAUSNUMMER BITTE ERGAENZEN]</p>
            <p>[PLZ + ORT BITTE ERGAENZEN]</p>
            <p>Portugal</p>
          </section>

          <section>
            <h3 className="luxury-label text-[10px] text-accent-muted">Kontakt / Contact</h3>
            <p className="mt-3">E-Mail: saudadestyle@gmail.com</p>
            <p>Telefon: (+351) 968 179 500</p>
            <p>Instagram: @saudadevoces</p>
          </section>

          <section>
            <h3 className="luxury-label text-[10px] text-accent-muted">
              Umsatzsteuer-ID / VAT ID
            </h3>
            <p className="mt-3">[UST-ID BITTE ERGAENZEN, FALLS VORHANDEN]</p>
          </section>

          <section>
            <h3 className="luxury-label text-[10px] text-accent-muted">
              Verantwortlich fuer den Inhalt / Responsible for content
            </h3>
            <p className="mt-3">Mayka [NACHNAME BITTE ERGAENZEN]</p>
          </section>

          <section>
            <h3 className="luxury-label text-[10px] text-accent-muted">
              Streitschlichtung / Dispute Resolution
            </h3>
            <p className="mt-3">
              Die Europaeische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:
            </p>
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="text-primary-light underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}
