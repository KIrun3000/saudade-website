"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type CountdownProps = {
  target: Date;
};

function getTimeLeft(target: Date) {
  const distance = target.getTime() - Date.now();

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export function Countdown({ target }: CountdownProps) {
  const t = useTranslations("countdown");
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  const units = useMemo(
    () => [
      { label: t("days"), value: timeLeft.days },
      { label: t("hours"), value: timeLeft.hours },
      { label: t("minutes"), value: timeLeft.minutes },
      { label: t("seconds"), value: timeLeft.seconds },
    ],
    [timeLeft, t],
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="min-w-[60px] rounded-xl border border-accent/30 bg-primary-dark/35 px-3 py-3 text-center backdrop-blur-sm sm:min-w-[80px] sm:px-4"
        >
          <div className="font-heading text-3xl font-light leading-none text-accent">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="mt-2 font-display text-[11px] font-light uppercase tracking-[0.14em] text-accent-muted">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
