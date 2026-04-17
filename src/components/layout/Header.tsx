"use client";

import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useCart } from "@/components/shop/CartProvider";

const navigation = [
  { key: "about", href: "/about" },
  { key: "events", href: "/events" },
  { key: "blog", href: "/blog" },
  { key: "community", href: "/community" },
  { key: "saudadeLand", href: "/saudade-land" },
  { key: "contact", href: "/contact" },
];

const shopDropdown = [
  { label: "Shop Art", href: "/shop?category=art" },
  { label: "Shop High Frequency Clothing", href: "/shop?category=clothing" },
];

const locales = [
  { code: "en", label: "EN", flag: "🇬🇧", name: "English" },
  { code: "pt", label: "PT", flag: "🇧🇷", name: "Português" },
  { code: "es", label: "ES", flag: "🇪🇸", name: "Español" },
] as const;

type LocaleCode = (typeof locales)[number]["code"];

type HeaderProps = {
  locale: string;
};

export function Header({ locale }: HeaderProps) {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setIsShopOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toLocalePath = (lang: string) => {
    const path = pathname || `/${locale}`;
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return `/${lang}`;
    if (locales.map((l) => l.code).includes(parts[0] as LocaleCode)) {
      parts[0] = lang;
      return `/${parts.join("/")}`;
    }
    return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const activeLocale = locales.find((l) => l.code === locale.toLowerCase()) ?? locales[0];

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
            src="/saudade-logo-transparent.svg"
            alt="Saudade"
            width={56}
            height={56}
            className="h-14 w-14 object-contain drop-shadow-md"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
          <Link
            href={`/${locale}/about`}
            className="luxury-label text-[10px] text-accent/88 transition-all duration-300 hover:text-accent-light"
          >
            {tNav("about")}
          </Link>

          {/* Shop dropdown */}
          <div ref={shopRef} className="relative">
            <button
              type="button"
              onClick={() => setIsShopOpen((o) => !o)}
              className="luxury-label flex items-center gap-1 text-[10px] text-accent/88 transition-all duration-300 hover:text-accent-light"
            >
              {tNav("shop")}
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isShopOpen ? "rotate-180" : ""}`} />
            </button>
            {isShopOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-accent/20 bg-primary-dark/95 shadow-xl backdrop-blur-md">
                {shopDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setIsShopOpen(false)}
                    className="block px-4 py-3 font-display text-[10px] font-light uppercase tracking-[0.18em] text-accent/88 transition-colors duration-200 hover:bg-accent/10 hover:text-accent-light"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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

          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen((o) => !o)}
              className="flex min-h-11 items-center gap-1.5 rounded-full border border-accent/35 bg-primary-dark/40 px-3 font-display text-[10px] font-light tracking-[0.18em] text-accent transition-colors duration-300 hover:bg-accent/10 hover:text-accent-light"
              aria-expanded={isLangOpen}
            >
              <span>{activeLocale.flag}</span>
              <span>{activeLocale.label}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-accent/20 bg-primary-dark/95 shadow-xl backdrop-blur-md">
                {locales.map((lang) => {
                  const active = locale.toLowerCase() === lang.code;
                  return (
                    <Link
                      key={lang.code}
                      href={toLocalePath(lang.code)}
                      onClick={() => setIsLangOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.18em] transition-colors duration-200 ${
                        active
                          ? "bg-accent/15 text-accent-light"
                          : "text-accent/80 hover:bg-accent/10 hover:text-accent-light"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
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
              <Link
                href={`/${locale}/about`}
                onClick={() => setIsMobileOpen(false)}
                className="luxury-label inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-accent/92 transition-colors duration-300 hover:bg-accent/10 hover:text-accent-light"
              >
                {tNav("about")}
              </Link>

              {/* Mobile shop dropdown */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileShopOpen((o) => !o)}
                  className="luxury-label inline-flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-sm text-accent/92 transition-colors duration-300 hover:bg-accent/10 hover:text-accent-light"
                >
                  {tNav("shop")}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileShopOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileShopOpen && (
                  <div className="ml-4 mt-1 grid gap-1 border-l border-accent/20 pl-3">
                    {shopDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        onClick={() => setIsMobileOpen(false)}
                        className="luxury-label inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-accent/80 transition-colors duration-300 hover:bg-accent/10 hover:text-accent-light"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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
