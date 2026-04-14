import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  BLOG_ARTICLES,
  BLOG_SLUGS,
  getBlogArticleBySlug,
  getProxiedBlogImageSrc,
} from "@/lib/blog-articles";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.heroImage, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.heroImage],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blogArticle");
  const tNav = await getTranslations("nav");
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const publishedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(article.publishedAt));

  const relatedPosts = BLOG_ARTICLES.filter((entry) => entry.slug !== article.slug);
  const heroOverlayClass =
    article.slug === "textile-frequency"
      ? "absolute inset-0 bg-gradient-to-b from-primary-dark/5 via-primary/35 to-primary-dark/55"
      : "absolute inset-0 bg-gradient-to-b from-primary-dark/20 via-primary/70 to-primary-dark/90";

  return (
    <main>
      <section className="relative flex min-h-[72vh] items-end overflow-hidden">
        <img
          src={getProxiedBlogImageSrc(article.heroImage)}
          alt={article.title}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className={heroOverlayClass} />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 text-accent md:px-8">
          <p className="luxury-label text-[11px] text-accent-light/90">{article.category}</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-light leading-tight md:text-6xl">
            {article.title}
          </h1>
          {article.subtitle ? (
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-accent/88">{article.subtitle}</p>
          ) : null}
          <p className="mt-8 text-sm text-accent-light/85">
            {publishedDate} - {t("by")} {article.author}
          </p>
        </div>
      </section>

      <section className="bg-bg-light py-16">
        <article className="mx-auto max-w-[720px] px-6 text-text-on-light md:px-0">
          {article.quote ? (
            <blockquote className="mb-10 border-l-2 border-primary-light pl-5 font-heading text-2xl font-light italic leading-relaxed text-primary-dark md:text-3xl">
              {article.quote}
            </blockquote>
          ) : null}

          {article.sections.map((section, sectionIndex) => (
            <div key={`${article.slug}-${sectionIndex}`} className="mb-10">
              {section.heading ? (
                <h2 className="mb-5 font-heading text-4xl font-light text-primary-dark md:text-5xl">
                  {section.heading}
                </h2>
              ) : null}

              {section.quote ? (
                <p className="mb-6 border-l-2 border-primary-light/80 pl-4 text-base italic leading-relaxed text-text-on-light/82">
                  {section.quote}
                </p>
              ) : null}

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={`${article.slug}-${sectionIndex}-p-${paragraphIndex}`}
                  className="mb-5 font-heading text-[1.2rem] font-light leading-relaxed text-text-on-light/90"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className="space-y-3 pl-4 text-base leading-relaxed text-text-on-light/88">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {article.extraImages?.map((image) => (
            <div
              key={image}
              className="relative my-12 h-[380px] overflow-hidden rounded-[1.5rem] border border-primary-light/20 md:h-[460px]"
            >
              <img
                src={getProxiedBlogImageSrc(image)}
                alt={`${article.title} editorial image`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}

          <div className="mt-14 border-t border-primary-light/25 pt-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex min-h-11 items-center font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary transition-colors duration-300 hover:text-primary-dark"
            >
              {t("backToBlog")}
            </Link>
          </div>
        </article>
      </section>

      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">{t("readMoreLabel")}</p>
          <h2 className="mt-4 font-heading text-4xl font-light text-text-on-light md:text-5xl">
            {t("readMoreTitle")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-[1.5rem] border border-primary-light/20 bg-bg-light"
              >
                <div className="relative h-64">
                  <img
                    src={getProxiedBlogImageSrc(post.cardImage)}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-3xl font-light text-text-on-light">{post.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-on-light/78">{post.description}</p>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="mt-5 inline-flex font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary transition-colors duration-300 hover:text-primary-dark"
                  >
                    {t("readArticle")}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 border-t border-primary-light/20 pt-8">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex min-h-11 items-center font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary transition-colors duration-300 hover:text-primary-dark"
            >
              {t("exploreShop")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-14">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-4 px-6 md:px-8">
          <Link
            href={`/${locale}/community`}
            className="font-display text-[11px] font-light uppercase tracking-[0.24em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("community")}
          </Link>
          <Link
            href={`/${locale}/events`}
            className="font-display text-[11px] font-light uppercase tracking-[0.24em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("events")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="font-display text-[11px] font-light uppercase tracking-[0.24em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("contact")}
          </Link>
        </div>
      </section>
    </main>
  );
}
