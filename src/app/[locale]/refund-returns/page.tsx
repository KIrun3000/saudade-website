import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Returns",
  description: "Refund and returns policy for Saudade purchases.",
};

export default function RefundReturnsPage() {
  return (
    <main className="bg-bg-light py-24">
      <section className="mx-auto max-w-4xl px-6 md:px-8">
        <h1 className="luxury-label text-[14px] text-accent-muted">
          Refund and Returns Policy
        </h1>

        <div className="mt-8 space-y-8 text-text-on-light">
          <section>
            <p>
              Our refund and returns policy lasts 30 days. If 30 days have passed
              since your purchase, we can&apos;t offer you a full refund or exchange.
            </p>
            <p className="mt-4">
              To be eligible for a return, your item must be unused and in the
              same condition that you received it. It must also be in the
              original packaging.
            </p>
            <p className="mt-4">Several types of goods are exempt from being returned.</p>
            <p className="mt-2">Additional non-returnable items:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Some health and personal care items</li>
            </ul>
            <p className="mt-4">
              To complete your return, we require a receipt or proof of purchase.
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">Refunds</h2>
            <p className="mt-3">
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
            </p>
            <p className="mt-4">
              If you are approved, then your refund will be processed, and a
              credit will automatically be applied to your credit card or
              original method of payment.
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">
              Late or Missing Refunds
            </h2>
            <p className="mt-3">
              If you haven&apos;t received a refund yet, first check your bank
              account again. Then contact your credit card company, it may take
              some time before your refund is officially posted. Next contact your
              bank.
            </p>
            <p className="mt-4">
              If you&apos;ve done all of this and you still have not received your
              refund yet, please contact us at saudadestyle@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">Sale Items</h2>
            <p className="mt-3">
              Only regular priced items may be refunded. Sale items cannot be
              refunded.
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">Exchanges</h2>
            <p className="mt-3">
              We only replace items if they are defective or damaged. If you need
              to exchange it for the same item, send us an email at
              saudadestyle@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="luxury-label text-[10px] text-accent-muted">
              Shipping Returns
            </h2>
            <p className="mt-3">
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non-refundable.
            </p>
            <p className="mt-4">Need help? Contact us at saudadestyle@gmail.com.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
