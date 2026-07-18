import { FestivalHighlight } from "@/components/events/FestivalHighlight";

type EventHighlightProps = {
  locale: string;
};

export function EventHighlight({ locale }: EventHighlightProps) {
  return <FestivalHighlight locale={locale} transparent />;
}
