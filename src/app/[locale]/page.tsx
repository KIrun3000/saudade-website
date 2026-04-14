import { BlogPreview } from "@/components/home/BlogPreview";
import { CommunityCTA } from "@/components/home/CommunityCTA";
import { EventHighlight } from "@/components/home/EventHighlight";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { MaykaSection } from "@/components/home/MaykaSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { ShopPreview } from "@/components/home/ShopPreview";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection locale={locale} />
      <IntroSection />
      <PillarsSection locale={locale} />
      <MaykaSection locale={locale} />
      <ShopPreview locale={locale} />
      <EventHighlight locale={locale} />
      <BlogPreview locale={locale} />
      <CommunityCTA locale={locale} />
    </main>
  );
}
