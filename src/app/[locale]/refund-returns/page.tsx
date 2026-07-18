import type { Metadata } from "next";

import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Refund & Returns — Saudade",
  description: "Refund and returns policy for Saudade purchases.",
};

export default function RefundReturnsPage() {
  return (
    <LegalLayout eyebrow="Policy" title="Refund & Returns">
      <LegalSection>
        <p>
          Our refund and returns policy lasts 30 days. If 30 days have passed since your
          purchase, we are unable to offer a full refund or exchange.
        </p>
        <p>
          To be eligible for a return, your item must be unused and in the same condition you
          received it, in its original packaging. To complete your return, we require a receipt
          or proof of purchase.
        </p>
        <p>The following are non-returnable: gift cards, downloadable products, and certain personal-care items.</p>
      </LegalSection>

      <LegalSection heading="Refunds">
        <p>
          Once your return is received and inspected, we will email you to confirm receipt and let
          you know whether your refund has been approved. If approved, your refund is processed and
          a credit is applied to your original method of payment.
        </p>
        <p>Only regular-priced items may be refunded — sale items cannot be refunded.</p>
      </LegalSection>

      <LegalSection heading="Late or missing refunds">
        <p>
          If you haven&apos;t received your refund yet, first check your bank account again, then
          contact your card company and your bank — it can take time for a refund to post. If
          you&apos;ve done all of this and still haven&apos;t received it, reach out at{" "}
          <a className="underline-offset-4 hover:underline" href="mailto:saudadestyle@gmail.com" style={{ opacity: 0.95 }}>saudadestyle@gmail.com</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Exchanges">
        <p>
          We replace items only if they are defective or damaged. To exchange an item for the same
          piece, email us at{" "}
          <a className="underline-offset-4 hover:underline" href="mailto:saudadestyle@gmail.com" style={{ opacity: 0.95 }}>saudadestyle@gmail.com</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Shipping returns">
        <p>
          You are responsible for the shipping costs of returning your item; shipping costs are
          non-refundable.
        </p>
        <p>
          Need help? Contact us any time at{" "}
          <a className="underline-offset-4 hover:underline" href="mailto:saudadestyle@gmail.com" style={{ opacity: 0.95 }}>saudadestyle@gmail.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
