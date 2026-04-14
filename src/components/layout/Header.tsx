"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/components/shop/CartProvider";

const navigation = [
  { key: "about", href: "/about" },
  { key: "shop", href: "/shop" },
  { key: "events", href: "/events" },
  { key: "blog", href: "/blog" },
  { key: "community", href: "/community" },
  { key: "saudadeLand", href: "/saudade-land" },
  { key: "contact", href: "/contact" },
];

const locales = ["EN", "PT", "ES"] as const;

type HeaderProps = {
  locale: string;
};

export function Header({ locale }: HeaderProps) {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  const toLocalePath = (lang: string) => {
    const path = pathname || `/${locale}`;
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return `/${lang}`;
    if (["en", "pt", "es"].includes(parts[0])) {
      parts[0] = lang;
      return `/${parts.join("/")}`;
    }
    return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
  };

  useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isSolid || isMobileOpen
          ? "border-accent/25 bg-primary-dark/86 shadow-[0_18px_46px_-28px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href={`/${locale}`}
          aria-label={tHeader("brandAria")}
          className="shrink-0 transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src="/saudade-logo.svg"
            alt="Saudade"
            width={56}
            height={56}
            className="h-14 w-14 object-contain drop-shadow-md"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="luxury-label text-[10px] text-accent/88 transition-all duration-300 hover:text-accent-light"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button
            type="button"
            onClick={toggleCart}
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-accent/35 bg-primary-dark/40 text-accent"
            aria-label={tHeader("openCart")}
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-primary-dark">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-accent/35 bg-primary-dark/40 text-accent xl:hidden"
            aria-label={isMobileOpen ? tHeader("closeMenu") : tHeader("openMenu")}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <div className="flex items-center gap-1 rounded-full border border-accent/35 bg-primary-dark/40 p-1">
          {locales.map((lang) => {
            const active = locale.toUpperCase() === lang;
            return (
              <Link
                key={lang}
                href={toLocalePath(lang.toLowerCase())}
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 font-display text-[10px] font-light tracking-[0.22em] transition-colors duration-300 ${
                  active
                    ? "bg-accent text-primary-dark"
                    : "text-accent-muted hover:bg-accent/15 hover:text-accent-light"
                }`}
                aria-label={tHeader("switchLanguage", { lang })}
                aria-current={active ? "page" : undefined}
              >
                {lang}
              </Link>
            );
          })}
          </div>
        </div>
      </div>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-primary/95 text-accent xl:hidden">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-5 py-5 md:px-8">
            <div className="flex items-center justify-between">
              <p className="luxury-label text-sm text-accent-muted">Menu</p>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-accent/35 bg-primary-dark/40 text-accent"
                aria-label={tHeader("closeMenu")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="mt-6 grid gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMobileOpen(false)}
                  className="luxury-label inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-accent/92 transition-colors duration-300 hover:bg-accent/10 hover:text-accent-light"
                >
                  {tNav(item.key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
