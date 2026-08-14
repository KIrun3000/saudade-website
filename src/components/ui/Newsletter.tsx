"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type NewsletterValues = {
  email: string;
  /** Honeypot — hidden from users; only bots fill it. */
  company?: string;
  /** ms-epoch when the form mounted; used server-side for timing checks. */
  startedAt?: number;
};

type NewsletterProps = {
  /** "light" = on cream/white bg (default), "dark" = on dark teal bg */
  variant?: "light" | "dark";
  /** Override the submit button label (defaults to the shared newsletter copy) */
  submitLabel?: string;
};

export function Newsletter({ variant = "light", submitLabel }: NewsletterProps) {
  const t = useTranslations("newsletter");
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NewsletterValues>();

  // Record mount time server-side timing checks use to reject instant bot
  // submissions. Carried through the form as a registered hidden field.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  const onSubmit = async (data: NewsletterValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
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

  const inputClass =
    variant === "dark"
      ? "min-h-11 w-full rounded-full border border-accent/30 bg-transparent px-5 text-sm text-accent outline-none transition-colors duration-300 placeholder:text-accent/40 focus:border-accent"
      : "min-h-11 w-full rounded-full border border-primary/30 bg-transparent px-5 text-sm text-text-on-light outline-none transition-colors duration-300 placeholder:text-text-on-light/40 focus:border-primary";

  const buttonClass =
    variant === "dark"
      ? "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-accent/40 bg-transparent px-10 py-4 font-display text-[15px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light disabled:opacity-60 sm:w-auto"
      : "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-primary/40 bg-transparent px-10 py-4 font-display text-[15px] font-light uppercase tracking-[0.22em] text-text-on-light transition-colors duration-300 hover:border-primary hover:text-primary-dark disabled:opacity-60 sm:w-auto";

  const successClass = variant === "dark" ? "text-sm text-accent/60" : "text-sm text-sage-light";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-3">
      {/* Honeypot — hidden from real users; bots that fill it are dropped. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" style={{ position: "absolute" }}>
        <label htmlFor="newsletter-company">Company</label>
        <input
          id="newsletter-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
        <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      </div>
      <label htmlFor="newsletter-email" className="sr-only">
        {t("label")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder={t("placeholder")}
        className={inputClass}
        {...register("email", {
          required: t("required"),
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: t("invalid"),
          },
        })}
      />
      {errors.email ? (
        <p className="text-xs text-[#8d2f2f]">{errors.email.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={isLoading}
        className={buttonClass}
      >
        {isLoading ? "…" : submitLabel ?? t("submit")}
      </button>
      {isDone ? (
        <p className={successClass}>{t("success")}</p>
      ) : null}
      {error ? (
        <p className="text-sm text-[#8d2f2f]">{error}</p>
      ) : null}
    </form>
  );
}
