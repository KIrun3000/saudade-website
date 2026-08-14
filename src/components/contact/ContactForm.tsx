"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type ContactValues = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — hidden from users; only bots fill it. */
  company?: string;
  /** ms-epoch when the form mounted; used server-side for timing checks. */
  startedAt?: number;
};

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactValues>();

  // Record mount time server-side timing checks use to reject instant bot
  // submissions. Carried through the form as a registered hidden field.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  const onSubmit = async (data: ContactValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setIsDone(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot — hidden from real users, tabindex/autocomplete off. Bots that
          fill it are silently dropped server-side. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" style={{ position: "absolute" }}>
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
        <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      </div>

      <div>
        <label htmlFor="contact-name" className="luxury-label text-[10px] text-accent-muted">
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          className="mt-2 min-h-11 w-full rounded-xl border border-accent/20 bg-transparent px-4 py-2 text-sm text-accent outline-none transition-colors placeholder:text-accent/30 focus:border-accent/60"
          {...register("name", { required: t("nameRequired") })}
        />
        {errors.name ? <p className="mt-1 text-xs text-[#8d2f2f]">{errors.name.message}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="luxury-label text-[10px] text-accent-muted">
          {t("emailLabel")}
        </label>
        <input
          id="contact-email"
          type="email"
          className="mt-2 min-h-11 w-full rounded-xl border border-accent/20 bg-transparent px-4 py-2 text-sm text-accent outline-none transition-colors placeholder:text-accent/30 focus:border-accent/60"
          {...register("email", {
            required: t("emailRequired"),
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: t("emailInvalid"),
            },
          })}
        />
        {errors.email ? <p className="mt-1 text-xs text-[#8d2f2f]">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="luxury-label text-[10px] text-accent-muted">
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className="mt-2 w-full rounded-xl border border-primary-light/20 bg-bg-light px-4 py-3 text-sm text-text-on-light outline-none focus:border-primary-light"
          {...register("message", { required: t("messageRequired") })}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-[#8d2f2f]">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 inline-flex min-h-11 items-center rounded-full border border-accent/50 bg-transparent px-8 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light disabled:opacity-60"
      >
        {isLoading ? "Sending…" : t("submit")}
      </button>

      {isDone ? (
        <p className="text-sm text-accent-light">{t("success")}</p>
      ) : null}
      {error ? (
        <p className="text-sm text-[#8d2f2f]">{error}</p>
      ) : null}
    </form>
  );
}
