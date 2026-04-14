import Link from "next/link";
import { useTranslations } from "next-intl";

import { BLOG_ARTICLES, getProxiedBlogImageSrc } from "@/lib/blog-articles";

type BlogPreviewProps = {
  locale: string;
};

export function BlogPreview({ locale }: BlogPreviewProps) {
  const t = useTranslations("blogPreview");
  const localizedCopy = [
    { title: t("post1Title"), excerpt: t("post1Excerpt") },
    { title: t("post2Title"), excerpt: t("post2Excerpt") },
    { title: t("post3Title"), excerpt: t("post3Excerpt") },
  ];

  const posts = BLOG_ARTICLES.map((post, index) => ({
    title: localizedCopy[index]?.title ?? post.title,
    excerpt: localizedCopy[index]?.excerpt ?? post.description,
    image: post.cardImage,
    href: `/blog/${post.slug}`,
  }));

  return (
    <section className="bg-bg-alt py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="luxury-label text-[10px] text-accent-muted">
              {t("label")}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-light text-text-on-light md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex min-h-11 items-center rounded-full border border-primary-light/35 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary-light transition-colors duration-300 hover:border-primary-light hover:text-primary"
          >
            {t("viewAll")}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-[1.7rem] border border-primary-light/18 bg-bg-light"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getProxiedBlogImageSrc(post.image)}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-3xl font-light leading-tight text-text-on-light">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-on-light/75">
                  {post.excerpt}
                </p>
                <Link
                  href={`/${locale}${post.href}`}
                  className="mt-6 inline-flex font-display text-[11px] font-light uppercase tracking-[0.2em] text-primary-light transition-transform duration-300 group-hover:translate-x-1"
                >
                  {t("readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
