"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type NewsletterValues = {
  email: string;
};

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [isDone, setIsDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterValues>();

  const onSubmit = () => {
    setIsDone(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("label")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder={t("placeholder")}
        className="min-h-11 w-full rounded-full border border-accent/50 bg-primary-dark/60 px-5 text-sm text-accent outline-none transition-colors duration-300 placeholder:text-accent-muted focus:border-accent-light"
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
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-accent/65 bg-transparent px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light sm:w-auto"
      >
        {t("submit")}
      </button>
      {isDone ? (
        <p className="text-sm text-sage-light">
          {t("success")}
        </p>
      ) : null}
    </form>
  );
}
