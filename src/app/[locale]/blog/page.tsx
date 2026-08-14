import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BLOG_ARTICLES, getProxiedBlogImageSrc } from "@/lib/blog-articles";
import { Newsletter } from "@/components/ui/Newsletter";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/blog",
    title: "Journal — Art, Conscious Fashion & Slow Living",
    description:
      "Read Saudade articles on the meaning of saudade, textile frequency, ethical fashion, and permaculture living.",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("blogPage");
  const localizedCopy = [
    { title: t("post1Title"), excerpt: t("post1Excerpt") },
    { title: t("post2Title"), excerpt: t("post2Excerpt") },
    { title: t("post3Title"), excerpt: t("post3Excerpt") },
    { title: t("post4Title"), excerpt: t("post4Excerpt") },
    { title: t("post5Title"), excerpt: t("post5Excerpt") },
  ];

  const posts = BLOG_ARTICLES.map((post, index) => ({
    slug: post.slug,
    title: localizedCopy[index]?.title ?? post.title,
    excerpt: localizedCopy[index]?.excerpt ?? post.description,
    image: post.cardImage,
  }));

  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-16 pt-36 text-center text-accent md:px-8 md:pb-20 md:pt-44" style={{ backgroundColor: "#0a1f23" }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "url('/ixchel-bg-teal.webp')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.85, WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 45%, transparent 28%, rgba(0,0,0,0.85) 100%)", maskImage: "radial-gradient(ellipse 80% 90% at 50% 45%, transparent 28%, rgba(0,0,0,0.85) 100%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(20,55,60,0.5) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-7 flex items-center justify-center gap-5">
            <div className="h-px w-10 bg-current opacity-15" />
            <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.32em", opacity: 0.4 }} className="uppercase">Journal</p>
            <div className="h-px w-10 bg-current opacity-15" />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "0.01em" }} className="text-[clamp(2.6rem,7vw,5rem)]">
            {t("title")}
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-alt py-20">
        <div className="relative mx-auto grid max-w-6xl gap-6 px-5 md:px-8 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-[1.4rem] border border-primary-light/20 bg-bg-light"
            >
              <div className="relative h-64">
                <img
                  src={getProxiedBlogImageSrc(post.image)}
                  alt={post.title}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-heading text-3xl font-light text-text-on-light">{post.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-text-on-light/78">{post.excerpt}</p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-5 inline-flex font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary transition-colors duration-300 hover:text-primary-dark"
                >
                  {t("readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-bg-light px-5 py-24 text-center md:px-8">
        <p className="font-display text-[9px] uppercase tracking-[0.3em] text-text-on-light opacity-35">Words worth keeping</p>
        <h2 className="font-heading mt-5 text-[clamp(1.8rem,3.5vw,2.5rem)] font-light leading-tight text-text-on-light">
          If this felt like something —
          <br />
          <em className="opacity-50">there is more where that came from.</em>
        </h2>
        <div className="mx-auto mt-10 flex max-w-md justify-center">
          <Newsletter />
        </div>
      </section>
    </main>
  );
}
