---
name: polish-localizer
description: Add or update Polish (pl) translations for any project that stores user-facing strings in JSON (or YAML) locale files. Use whenever the user mentions "Polish translation", "add pl locale", "translate to Polish", "tłumaczenie", "polish-localizer", or asks to fill in missing Polish keys, sync pl with en, or audit Polish coverage. Auto-detects the project's i18n layout — flat next-intl style (src/i18n/messages/{locale}.json), nested per-locale folders (/locales/{locale}/*.json), or i18next-style namespaces. Reads the brand glossary at /references/glossary.yaml when present and warns (but proceeds) when it is missing.
---

# polish-localizer

Goal: produce Polish locale files that read as if a native Polish speaker had written them — not as machine-translated English. Preserve every variable, tag, and code construct. Validate before finishing.

## When to use

Trigger on any of:
- "add Polish", "translate to Polish", "polish translation", "pl locale", "PL"
- "missing Polish keys", "sync pl with en", "Polish coverage"
- Direct mention of `polish-localizer`

If the user mentions a specific file (e.g. `homepage.json`), scope to that file. Otherwise process the full English source set.

## Step 1 — Detect the i18n layout

Probe in this order, stop at the first match:

1. **next-intl flat**: `src/i18n/messages/en.json` → write `src/i18n/messages/pl.json`. Also append `"pl"` to the `locales` array in `src/i18n/config.ts` (or wherever `locales` is exported).
2. **Per-locale folder tree**: `/locales/en/*.json` → write parallel files into `/locales/pl/`.
3. **i18next public**: `public/locales/en/*.json` → `public/locales/pl/`.
4. **YAML locales**: `config/locales/en.yml` (Rails-style) → `config/locales/pl.yml`.
5. **Custom**: ask the user where English strings live and where the Polish output should go.

Report the detected layout in one line before doing any writes.

## Step 2 — Load the glossary

Look for `/references/glossary.yaml` (project root) or `references/glossary.yaml` relative to the i18n root.

Glossary schema (informal):

```yaml
do_not_translate:
  - Saudade
  - Saudade Land
  # brand names, product SKUs, proper nouns
prefer:
  community: społeczność       # canonical Polish for a key term
  fashion: moda
notes:
  - "Use the informal singular form unless context is clearly formal."
```

If the file is missing, **emit a warning and proceed**:

> ⚠️ No glossary found at `/references/glossary.yaml`. Brand terms will be inferred — review brand-critical strings carefully.

Never block on a missing glossary.

## Step 3 — Build the inventory

For every English source file, walk the JSON/YAML tree and produce a list of `(file, key_path, english_value)` tuples. Compare against the existing Polish file (if any) and split into:

- **missing** — key exists in en, absent in pl → translate
- **stale** — key exists in both but Polish value equals English (likely never translated) → translate
- **present** — already translated → leave alone

Print the counts: `missing: N, stale: M, present: K` per file.

## Step 4 — Translate

Translate every `missing` and `stale` value into Polish following these rules. They are non-negotiable.

### Voice & register
- Write as a native Polish speaker would — not as a literal mapping of English word order. Idioms beat calques.
- Default to a warm, slightly poetic register for marketing/brand copy. Use natural product-page language for shop strings, plain instructional language for buttons and form labels.
- Use the informal singular ("Ty") for community/marketing copy aimed at one person; use neutral impersonal forms ("Skontaktuj się", "Kliknij") for UI actions. Avoid "Państwo" unless the source register is clearly formal.
- Polish UPPERCASE marketing labels (e.g. "EXPLORE", "VIEW ALL") should also be uppercased in Polish (e.g. "ODKRYJ", "ZOBACZ WSZYSTKO"). Keep them short — Polish words are usually longer; pick a synonym if the natural translation overflows a button.

### Preserve exactly (do not translate, do not reformat)
- ICU/MessageFormat variables: `{count}`, `{name}`, plural blocks, `{lang}`.
- printf-style: `%s`, `%d`, `%1$s`.
- HTML tags and attributes: `<strong>`, `<a href="...">`, `<br/>`.
- Markdown: `**bold**`, `[link](url)`, fenced code blocks, list markers.
- Email addresses, URLs, phone numbers, dates, times, currency codes.
- Brand names listed in `do_not_translate` — copy verbatim including capitalization.
- Code comments and `console.log` strings inside template literals — leave the English value as-is.

### Glossary enforcement
- For any term in `prefer`, use the canonical Polish form across every file.
- For terms in `do_not_translate`, never translate — even when conjugating around them. Add Polish suffixes only when grammatically required.

### Uncertainty
If a string is ambiguous, culturally loaded, or could be translated multiple defensible ways, write your best guess and flag it. Since standard JSON doesn't support comments, use a sibling key:

```json
"_review_closingQuote": "REVIEW: 'love the world back to life' — alt: 'pokochać świat z powrotem do życia'",
"closingQuote": "Wróciliśmy tu, by przywrócić światu życie."
```

The `_review_<keyName>` prefix makes flagged keys grep-able and easy to strip later.

For YAML files, use a regular `# REVIEW: ...` line above the key.

Never silently skip a key. Either translate it confidently, or translate it and flag it with REVIEW.

### Quotes & punctuation
- Use Polish typographic quotes „ ” for inline quotation when source uses curly quotes. Keep straight quotes inside HTML attributes.
- Use the em-dash style with spaces around — (already standard in the source).
- "&" → "i" in natural prose; translate label phrases like "Refund & Returns" → "Zwroty i reklamacje".

## Step 5 — Write files

- Write the full Polish file (all keys, including untouched ones) so the output is a clean drop-in replacement.
- Match the source file's indentation (2 spaces vs 4, tabs vs spaces) and trailing newline.
- Preserve key order from the English source.

If the project's locale-registration file (e.g. `src/i18n/config.ts` for next-intl) doesn't yet include `"pl"`, add it. Place `"pl"` at the end of the array unless alphabetical order is in use.

## Step 6 — Validate

Run `scripts/validate.mjs` (bundled) against the source and Polish trees:

```
node scripts/validate.mjs <en-source> <pl-target>
```

The script checks:
1. Every Polish JSON/YAML file parses.
2. Key set in pl matches en exactly (no missing, no extra).
3. Every variable token in the English value (`{...}`, `%s`, `<tag>`) appears unchanged in the Polish value.
4. No empty string in Polish where English was non-empty.
5. Counts and reports REVIEW markers.

If any check fails, fix and re-run. Only mark the task done when validation is clean.

## Step 7 — Report

Finish with a one-screen summary:
- Files written, counts (missing/stale translated, REVIEW count).
- Locale-registration changes made.
- Glossary status (used / created / missing).
- Any validation warnings worth the user's attention.

Link to each written file using `computer://` paths so the user can open them directly.

## Bundled resources

- `scripts/validate.mjs` — Node script that runs the validation in Step 6. Works on any of the supported layouts.

## What NOT to do

- Do not translate code comments, `console.log`, error codes, or string identifiers.
- Do not change the JSON key names — only values.
- Do not reorder keys.
- Do not "improve" the English source while you're in there.
- Do not invent a glossary if none exists — warn and continue.
- Do not skip the validation step.
