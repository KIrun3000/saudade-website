import type { ReactNode } from "react";

type LegalLayoutProps = {
  /** Small uppercase label above the title (e.g. "LEGAL"). */
  eyebrow?: string;
  /** The page title. */
  title: string;
  /** Optional subline under the title (e.g. "Last updated: April 2026"). */
  meta?: string;
  children: ReactNode;
};

/**
 * Shared, on-brand layout for legal / policy pages.
 * Dark teal, elegant serif heading, comfortable reading column.
 * Wrap section content in <LegalSection> for consistent styling.
 */
export function LegalLayout({ eyebrow = "Legal", title, meta, children }: LegalLayoutProps) {
  return (
    <main style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>
      {/* Hero header */}
      <section className="relative overflow-hidden px-5 pb-12 pt-36 text-center md:px-8 md:pb-16 md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(20,55,60,0.5) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-7 flex items-center justify-center gap-5">
            <div className="h-px w-10 bg-current opacity-15" />
            <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.32em", opacity: 0.4 }} className="uppercase">
              {eyebrow}
            </p>
            <div className="h-px w-10 bg-current opacity-15" />
          </div>
          <h1
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.01em" }}
            className="text-[clamp(2.2rem,5vw,3.8rem)]"
          >
            {title}
          </h1>
          {meta ? (
            <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.22em", opacity: 0.35 }} className="mt-6 uppercase">
              {meta}
            </p>
          ) : null}
        </div>
      </section>

      {/* Body */}
      <section className="px-5 pb-32 md:px-8" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <div
          className="mx-auto max-w-2xl pt-16"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "1.02rem", lineHeight: 1.85 }}
        >
          <div className="space-y-12">{children}</div>
        </div>
      </section>
    </main>
  );
}

/** A titled block within a legal page. */
export function LegalSection({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <section>
      {heading ? (
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.26em", opacity: 0.45 }} className="mb-4 uppercase">
          {heading}
        </h2>
      ) : null}
      <div className="space-y-4" style={{ opacity: 0.78 }}>
        {children}
      </div>
    </section>
  );
}
