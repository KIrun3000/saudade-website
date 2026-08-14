import Link from "next/link";
import type { ReactNode } from "react";

// Matches "permaculture" and its localized / inflected forms across the site's
// languages — en "permaculture", pt/es "permacultura", pl "permakultura",
// "permakulturowe", etc. Case-insensitive, Unicode-aware, and guarded by a
// leading-letter boundary so it never fires inside a larger word.
const PERMACULTURE_RE = /(?<![\p{L}])perma[ck]ultur[\p{L}]*/giu;

/**
 * Turn every occurrence of the localized word "permaculture" inside a
 * translated string into a link to the Permaculture journal post.
 *
 * Pass any body copy through this and the word auto-links — now and for any
 * future copy — in whatever language the string happens to be in. The link
 * inherits the surrounding text colour (works on both the dark teal and the
 * light editorial sections) and adds only a subtle underline. Text with no
 * match is returned untouched.
 */
export function linkifyPermaculture(text: string, locale: string): ReactNode {
  const href = `/${locale}/blog/permaculture`;
  const re = new RegExp(PERMACULTURE_RE); // fresh lastIndex per call
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link
        key={key++}
        href={href}
        className="underline decoration-1 underline-offset-4 transition-opacity duration-300 hover:opacity-70"
      >
        {match[0]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (!parts.length) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
