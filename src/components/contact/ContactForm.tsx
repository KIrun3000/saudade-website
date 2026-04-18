"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type ContactValues = {
  name: string;
  email: string;
  message: string;
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
    formState: { errors },
  } = useForm<ContactValues>();

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
      <div>
        <label htmlFor="contact-name" className="luxury-label text-[10px] text-accent-muted">
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          className="mt-2 min-h-11 w-full rounded-xl border border-primary-light/20 bg-bg-light px-4 py-2 text-sm text-text-on-light outline-none focus:border-primary-light"
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
          className="mt-2 min-h-11 w-full rounded-xl border border-primary-light/20 bg-bg-light px-4 py-2 text-sm text-text-on-light outline-none focus:border-primary-light"
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
        className="inline-flex min-h-11 items-center rounded-full border border-primary-light bg-primary-light px-7 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent-light transition-colors duration-300 hover:bg-primary disabled:opacity-60"
      >
        {isLoading ? "Sending…" : t("submit")}
      </button>

      {isDone ? (
        <p className="text-sm text-primary-light">{t("success")}</p>
      ) : null}
      {error ? (
        <p className="text-sm text-[#8d2f2f]">{error}</p>
      ) : null}
    </form>
  );
}
