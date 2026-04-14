import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LeafDecoration } from "@/components/ui/LeafDecoration";
import { BLOG_ARTICLES, getProxiedBlogImageSrc } from "@/lib/blog-articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Read Saudade articles on philosophy, textile frequency, and conscious fashion.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("blogPage");
  const localizedCopy = [
    { title: t("post1Title"), excerpt: t("post1Excerpt") },
    { title: t("post2Title"), excerpt: t("post2Excerpt") },
    { title: t("post3Title"), excerpt: t("post3Excerpt") },
  ];

  const posts = BLOG_ARTICLES.map((post, index) => ({
    slug: post.slug,
    title: localizedCopy[index]?.title ?? post.title,
    excerpt: localizedCopy[index]?.excerpt ?? post.description,
    image: post.cardImage,
  }));

  return (
    <main>
      <section className="bg-primary-dark px-5 pb-16 pt-32 text-center text-accent md:px-8 md:pb-20 md:pt-36">
        <p className="luxury-label text-sm text-accent-muted md:text-[11px]">{t("heroLabel")}</p>
        <h1 className="mt-4 font-display text-[2.25rem] font-light uppercase tracking-[0.2em] md:mt-6 md:text-7xl md:tracking-[0.3em]">
          {t("title")}
        </h1>
      </section>

      <section className="relative overflow-hidden bg-bg-alt py-20">
        <LeafDecoration position="bottom-right" />
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
    </main>
  );
}
