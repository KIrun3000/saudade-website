# Saudade — Website Relaunch Projekt-Brief v2
### Aktualisiert mit Firecrawl Crawl-Daten (25 Seiten, Branding, Images)

---

## 1. Projekt-Übersicht

| | |
|---|---|
| **Projekt** | Relaunch & Erweiterung von saudadevoces.com |
| **Aktuell** | WordPress + Astra Theme + Elementor + WooCommerce + GTranslate + GiveWP |
| **Ziel** | Moderne Multi-Language Website mit Shopify, Blog & Event-System |
| **Entwicklung** | Cursor (AI-gestützt) |
| **Gründerin** | Mayka — Reisende, Ex-Model, Designerin, Visionärin |
| **Standort** | Portugal (international aktiv: Südamerika, Europa) |
| **Sprachen** | EN (Hauptsprache), PT, ES — bereits via GTranslate versucht |

### Kontaktdaten
- **Brand-Email:** saudadestyle@gmail.com
- **Community-Email:** communitysaudade@gmail.com
- **Telefon/WhatsApp:** (+351) 968179500
- **Instagram Brand:** [@saudadevoces](https://instagram.com/saudadevoces)
- **Instagram Personal:** [@maykalien](https://instagram.com/maykalien)
- **Standort:** Portugal

---

## 2. Kritische Erkenntnisse aus dem Firecrawl

### Was bisher NICHT sichtbar war:

**Es gibt deutlich mehr Content als die Navigation zeigt:**

| Seite | URL | Inhalt | Bewertung |
|-------|-----|--------|-----------|
| Who Makes Saudade | `/who-makes-saudade/` | Maykas persönliche Story, Brand-Ethik, Zertifizierungen | ⭐ GOLD — Herzstück der Brand |
| Frequency of Clothing | `/frequency-of-clothing/` | Tiefgehender Artikel über Textilfrequenzen | ⭐ Blog-Artikel #1 |
| Who Made My Clothes | `/template-post/` | Artikel über Fast Fashion vs. Sustainable | ⭐ Blog-Artikel #2 |
| Saudade Meaning (extended) | `/what-does-saudade-mean/` | Erweiterte Version des Saudade-Essays | ⭐ Blog-Artikel #3 |
| Articles | `/articles/` | Blog-Übersicht mit 3 Artikeln | Blog existiert bereits! |
| Donations | `/donations/` | GiveWP Donation Form | Feature: Spenden |
| Refund/Returns | `/refund_returns/` | 30-Tage Rückgabe-Policy | Shop-Policy existiert |
| Cart/Checkout/Account | `/cart-2/`, `/checkout-2/`, `/my-account-2/` | WooCommerce war aufgesetzt | Shop-Infrastruktur |
| Multi-Language Homes | `/home-english/`, `/home-portugues/`, `/home-espanol/` | GTranslate-Versuch (leer) | i18n war geplant |

### Schlussfolgerung:
Die Website ist **ambitionierter** als sie auf den ersten Blick wirkt. WooCommerce, Blog, Donations und Multi-Language waren alle schon angelegt — aber unfertig oder schlecht umgesetzt. Der Relaunch ist also kein Neuanfang, sondern eine **professionelle Umsetzung** dessen, was Mayka schon immer wollte.

---

## 3. Brand-Identität — Die drei Säulen

### Säule 1: High Frequency Fashion
- Ethische Modemarke, hergestellt in Portugal
- Keine Chemikalien, Zero Waste, maximale Wasserreduzierung
- Zertifiziert: **GOTS (Global Organic Textile Standard)** + **Global Recycled Standard**
- Philosophie: Kleidung hat Frequenzen — natürliche Stoffe heilen
- Materialien: Leinen (5000 mHz), Hanf, Bio-Baumwolle, Wolle
- "The Saudade Wear.. is an Ethical fashion brand made without chemicals"

### Säule 2: International Community
- Club für Freidenker, Künstler, Heiler, Musiker, Investoren, Entrepreneure
- Events: Festival in Portugal (Musik, Yoga, Workshops, Kunst, Fashion-Show)
- Kollaboration mit: Artists, Musicians/DJs, Yoga Teachers, Healers, Coaches, Investors
- "Beautiful souls, united in joy and purpose, ready to build a new world together"

### Säule 3: Saudade Land
- Vision: Regenerative Communities weltweit
- Start: Land in Brasilien
- Erweiterung: Lateinamerika → alle Kontinente
- Permaculture, Erneuerbare Energie, Circular Economy
- Investoren-Opportunity mit Purpose
- "This isn't real estate. It's a standing invitation to: Live differently, Give fiercely, Connect deeply."

### Gründerin: Mayka
- Aufgewachsen reisend durch Südamerika und Europa (6 Länder)
- Hintergrund: Fashion Industry als Model
- Spricht mindestens 3-4 Sprachen (PT, EN, ES + weitere)
- "A true traveler, a lifelong dreamer, an adventurer and a visionary"
- Hatte mit 17 die Idee für eine Kleidungsmarke
- Wollte schon als Kind Kleider zeichnen und für ihre Barbies nähen

---

## 4. Brand CI — Exakte Daten aus Firecrawl

### 4.1 Farbpalette (aus CSS-Analyse über 25 Seiten)

**Firecrawl hat die echten CSS-Farben extrahiert. Hier die Analyse:**

| Farbe | Hex | Häufigkeit | Bewertung |
|-------|-----|------------|-----------|
| `#2575FC` | Blau | Auf fast allen Seiten als "primary" | ⚠️ **WordPress/Elementor Default** — NICHT Brand |
| `#6A8B5B` | Sage/Olive Grün | 15+ Seiten als secondary/accent | ✅ **Echte Brand-Farbe** |
| `#D2BBB2` | Dusty Rose/Mauve | 12+ Seiten als secondary/accent | ✅ **Echte Brand-Farbe** |
| `#195E60` | Dark Teal | 4+ Seiten | ✅ **Intentionale Akzentfarbe** |
| `#0F3B47` | Very Dark Teal | About-Page secondary | ✅ Bewusste Wahl |
| `#2F3B40` | Dark Slate | Konsistent für Text/Links | ✅ **Text-Farbe** |
| `#3F5934` | Deep Forest Green | Donations, Categories | ✅ Grün-Variante |
| `#0B2B33` | Near Black Teal | Collaborations, Frequency | ✅ Dunkle Variante |

### Abgeleitete Palette für den Relaunch:

```css
:root {
  /* === PRIMARY — Sage Green (aus Brand-CSS, nicht Framework) === */
  --color-primary:        #6A8B5B;    /* Sage/Olive — Natur, Wachstum */
  --color-primary-dark:   #3F5934;    /* Deep Forest — Hover, Akzente */
  --color-primary-light:  #E8F0E5;    /* Zartes Salbei für Hintergründe */

  /* === ACCENT — Dusty Rose (zweithäufigste Brand-Farbe) === */
  --color-accent:         #D2BBB2;    /* Dusty Rose/Mauve — Wärme, Weiblichkeit */
  --color-accent-light:   #F5EEEB;    /* Zartes Rosa für Sektionen */

  /* === TEAL — Tiefe und Kontrast === */
  --color-teal:           #195E60;    /* Dark Teal — sophistiziert */
  --color-teal-dark:      #0F3B47;    /* Very Dark Teal — Hero Overlays */

  /* === NEUTRALS === */
  --color-dark:           #2F3B40;    /* Dark Slate — Primär-Text */
  --color-dark-bg:        #0B2B33;    /* Near Black Teal — Footer, Dark Sections */
  --color-text:           #2F3B40;
  --color-text-light:     #6B7B6E;    /* Grünliches Grau */
  --color-bg:             #FDFCFA;    /* Warmes Off-White */
  --color-bg-alt:         #F5F2ED;    /* Warmes Hellbeige */
}
```

**Begründung:** Die `#6A8B5B` Sage Green und `#D2BBB2` Dusty Rose sind die konsistentesten Farben über alle Seiten. Das Blau `#2575FC` ist ein Elementor/WordPress-Default und wurde NICHT als Brand-Farbe übernommen. Die Teal-Töne (`#195E60`, `#0F3B47`) geben Tiefe. Das ist eine organisch-feminine Palette: Natur + Wärme + Tiefe.

### 4.2 Typografie (aus Firecrawl Font-Analyse)

**Gefundene Fonts über alle Seiten:**

| Font | Rolle | Bewertung |
|------|-------|-----------|
| **Red Hat Display** | Heading | ✅ Bewusste Wahl — modern, geometrisch, warm |
| **Playfair Display** | Display | ✅ Bewusste Wahl — elegant, editorial |
| **Courgette** | Display/Accent | ✅ Handschrift-ähnlich, persönlich |
| **Yuji Syuku** | Display | 🤔 Japanisch-inspiriert — nischig aber intentional |
| **Ruluko** | Unknown | 🤔 Selten, vermutlich für spezifische Sektion |
| Inter | Body | ⚠️ Framework-Default |
| Roboto | Body | ⚠️ Framework-Default |

**Empfehlung für den Relaunch:**

```css
:root {
  /* Playfair Display für poetische, editorial Headlines */
  --font-heading:  'Playfair Display', serif;

  /* Red Hat Display als starke Sub-Headline / UI Font */
  --font-subheading: 'Red Hat Display', sans-serif;

  /* Plus Jakarta Sans als Body (Upgrade von Inter/Roboto) */
  --font-body:     'Plus Jakarta Sans', sans-serif;

  /* Courgette für handschriftliche Akzente (Zitate, Labels) */
  --font-accent:   'Courgette', cursive;
}
```

**Begründung:** Playfair Display war bereits auf der About-Seite im Einsatz — die poetischste, wichtigste Seite. Red Hat Display als moderne Heading-Font ergänzt perfekt. Courgette bleibt als persönlicher Akzent. Inter/Roboto werden durch Plus Jakarta Sans ersetzt (wärmer, distinktiver).

### 4.3 Logo

```
Bestes verfügbares Asset:
- Favicon: cropped-saudade_round_logo-removebg-preview-32x32.png
- OG/Tile: cropped-saudade_round_logo-removebg-preview-270x270.png
- Format: Rundes Logo mit transparentem Hintergrund

⚠️ ACHTUNG: Nur 270px Maximalauflösung verfügbar.
→ Mayka sollte das Original-Logo als SVG oder hochauflösendes PNG liefern.
→ Alternativ: Logo-Wordmark "SAUDADE" aus der Navigation extrahieren/nachbauen.
```

### 4.4 Trust Signals & Zertifizierungen

```
Vorhandene Assets (als PNG auf dem Server):
- client-logo-1.png → GOTS Certification Logo
- client-logo-2.png → Certification Logo
- client-logo-4.png → Global Recycled Standard Logo

Textuelle Trust Signals:
- "Certified Organic GOTS and Global Recycled Standard"
- "Made in Portugal"
- "0 waste fabric"
- "Maximum water waste reduction"
- "Made without chemicals"
```

### 4.5 Bildmaterial (31 einzigartige Bilder)

**Hochwertige Bilder (für Hero/Feature-Sektionen):**
- `pexels-photo-1353938-1353938-scaled.jpg` — Grüne Blätter (Saudade Land Hero)
- `mateus-pontes-x2TDul-JMl8-unsplash-scaled.jpg` — Brasilien-Landschaft
- `pexels-tellez-erik-12747153.jpg` — Ozean (Saudade Meaning Hero)
- `volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg` — Leinen/Stoff (Frequency Article)
- `yoga_with_nature_at_the_sharpham_trust_1200px_10.jpg` — Yoga in Natur
- `784519E1-...jpeg` — Mayka/Brand-Foto
- `feature-1-1.jpg` — Feature-Bild
- `fest-1.jpg` — Festival-Foto

**Event/Festival Bilder:**
- `fest-1.jpg`, `fest-3.jpg`, `ev.webp`, `images.jpeg` — Festival-Impressionen
- `48771295762_d6f7813a78_c.jpg` — Event/Workshop
- `istockphoto-1141427484-612x612-1.jpg` — Event-Atmosphäre

**Artikel-Bilder:**
- `jon-tyson-uEXc4WGAI2c-unsplash.jpg` — "Who Made My Clothes" Header
- `fast-fashion.webp` — Fast Fashion Illustration
- `pexels-photo-4405941-4405941-2.jpg` — Textilproduktion
- `adairatr1.jpg` — Handwerk/Craft
- `Copia-de-20180203_143657.jpg`, `Copia-de-20180203_145549.jpg` — Reise/Persönliche Fotos
- `photo_2024-09-01-00.32.17.jpeg` — Persönliches Foto

---

## 5. Technische Architektur

### Empfohlener Tech-Stack

```
Framework:        Next.js 14+ (App Router) mit TypeScript
Styling:          Tailwind CSS + CSS Custom Properties
CMS (Blog/Events): Sanity.io (Headless, free tier)
Shop:             Shopify Storefront API (Headless)
Donations:        Stripe (ersetzt GiveWP)
i18n:             next-intl
Deployment:       Vercel
Animationen:      Framer Motion
Icons:            Lucide React
Forms:            React Hook Form + Resend (E-Mail)
Analytics:        Plausible oder Fathom (DSGVO-konform)
```

### Warum dieser Stack?
- **Next.js** statt WordPress: Schneller, sicherer, moderner, perfekt für Headless Shopify
- **Shopify Storefront API** statt WooCommerce: Besseres Checkout, Payment, Inventory
- **Sanity.io** statt WordPress Blog: Visual Editor, Multi-Language nativ, free tier
- **next-intl** statt GTranslate: Echte Übersetzungen statt maschineller Übersetzung
- **Cursor-optimiert**: Next.js + TypeScript + Tailwind ist der #1 Stack in Cursor

---

## 6. Sitemap (erweitert mit neuem Content)

```
HAUPTNAVIGATION:
├── /                           → Homepage (Storytelling)
├── /about                      → Über Saudade
│   ├── /about#mayka            → Über Mayka (aus who-makes-saudade)
│   └── /about#meaning          → Was bedeutet Saudade?
├── /shop                       → Fashion Shop (Shopify)
│   ├── /shop/[handle]          → Produktdetail
│   └── /shop/cart              → Warenkorb
├── /events                     → Event-Übersicht
│   └── /events/[slug]          → Einzel-Event
├── /blog                       → Blog / Articles
│   └── /blog/[slug]            → Einzel-Artikel
├── /community                  → Community & Kollaborationen
├── /saudade-land               → Vision & Investment
├── /contact                    → Kontakt + Formular
└── /donate                     → Spenden (Stripe)

FOOTER-LINKS:
├── /impressum                  → Impressum
├── /datenschutz                → Datenschutzerklärung
├── /refund-returns             → Rückgabe-Policy
└── /shipping                   → Versand-Info

MULTI-LANGUAGE:
/en/...   → English (Default)
/pt/...   → Português
/es/...   → Español
```

### Bestehender Blog-Content (migrierbar):

| Artikel | Quelle | Kategorie |
|---------|--------|-----------|
| "Saudade Meaning" | `/what-does-saudade-mean/` | Philosophy |
| "The Frequency of Fabrics" | `/frequency-of-clothing/` | Conscious Fashion |
| "Who Made My Clothes?" | `/template-post/` | Sustainable Fashion |

---

## 7. Seitendesign-Konzepte

### 7.1 Homepage — Storytelling Flow

```
┌─────────────────────────────────────────────┐
│  HERO — Fullscreen                          │
│  Video oder Parallax-Naturbild              │
│  "THE ART THAT MADE US"                    │
│  Subtitle: "saudade" (Courgette font)      │
│  CTAs: [Explore] [Shop]                    │
│  Language Switcher im Header                │
├─────────────────────────────────────────────┤
│  INTRO — "High Frequency Living"            │
│  Sage Green Section                         │
│  Animated text reveal                       │
│  "International Club For The Future"        │
├─────────────────────────────────────────────┤
│  3 SÄULEN (Cards mit Hover + Images)        │
│  [Fashion] [Community] [Saudade Land]       │
│  Dusty Rose accent borders                  │
├─────────────────────────────────────────────┤
│  MAYKA — Personal Story Snippet             │
│  Offset Image + Text                        │
│  Courgette Quote: "Everyone has saudade"    │
│  → Link to About                            │
├─────────────────────────────────────────────┤
│  SHOP PREVIEW — Featured Products           │
│  Horizontal Scroll on Mobile                │
│  "High Frequency Fashion"                   │
│  Trust: GOTS + Recycled Standard Badges     │
├─────────────────────────────────────────────┤
│  EVENT HIGHLIGHT — Nächstes Event           │
│  Dark Teal Background                       │
│  Countdown + Festival-Foto                  │
│  "Saudade Festival — Portugal"              │
├─────────────────────────────────────────────┤
│  BLOG — Letzte 3 Artikel                    │
│  Cards mit Thumbnails                       │
│  Saudade Meaning / Fabric Frequency / etc.  │
├─────────────────────────────────────────────┤
│  COMMUNITY CTA                              │
│  "Join the Movement"                        │
│  Newsletter + Social Links                  │
├─────────────────────────────────────────────┤
│  FOOTER — Dark Teal/Near Black              │
│  Logo, Kontakt, Social, Legal Links         │
│  Newsletter-Anmeldung                       │
│  Language Switcher                           │
└─────────────────────────────────────────────┘
```

### 7.2 Design-Prinzipien

1. **Organisch-Feminin** — Sage Green + Dusty Rose, weiche Formen, Natur-Texturen
2. **Poetisch** — Playfair Display Headlines + Courgette Akzente schaffen editorial Feeling
3. **Teal-Tiefe** — Dark Sections in `#0F3B47` / `#0B2B33` für Kontrast und Dramatik
4. **Scroll-Reveal** — Elemente wachsen sanft ins Bild (IntersectionObserver + Framer Motion)
5. **Parallax-Natur** — Subtile Tiefe durch Parallax auf den hochwertigen Natur-Fotos
6. **Transparent Header** → Solid on Scroll (300ms transition)
7. **Alternating Sections** — Weiß → Sage-Tint → Weiß → Dusty-Rose-Tint → Dark Teal
8. **Keine Emojis** — Die aktuelle Seite nutzt Emojis (🔅🌿💫) — im Relaunch durch SVG Icons oder nichts ersetzen

---

## 8. Feature-Spezifikationen

### 8.1 Shopify Integration (Headless)

```
Setup:
1. Shopify Store anlegen (kann Headless-only sein, kein Theme nötig)
2. Sales Channel "Headless" / Storefront API aktivieren
3. Storefront Access Token erstellen
4. Produkte + Collections in Shopify pflegen

Frontend-Features:
├── Produktkatalog mit Collection-Filter
├── Produktdetailseite (Varianten, Bilder, Beschreibung)
├── Cart Drawer (Slide-in, persistent)
├── Checkout → Redirect zu Shopify Checkout
├── Währung: EUR (Default)
└── GOTS/Recycled-Badges auf Produktkarten

Shopify Apps empfohlen:
├── Translate & Adapt (Multi-Language Produkte)
├── Shopify Markets (International)
└── Shopify Email (für Newsletter)
```

### 8.2 Multi-Language (i18n)

```
Sprachen:     EN (Default), PT, ES
Framework:    next-intl
Routing:      /[locale]/[...path]

Was wird übersetzt:
├── UI-Strings → JSON Translation Files (en.json, pt.json, es.json)
├── Blog/Events → Sanity.io Locale-Felder
├── Shop-Produkte → Shopify Translate & Adapt
├── SEO → hreflang Tags, locale-spezifische Metadata
└── Legal Pages → Separate Versionen pro Sprache

Wichtig: ECHTE Übersetzungen, nicht maschinell.
Mayka spricht PT + EN + ES → kann Kernseiten selbst übersetzen.
Blog-Artikel können zunächst nur auf EN sein.
```

### 8.3 Blog (via Sanity.io)

```
Schema:
├── title (localized string)
├── slug
├── excerpt (localized text)
├── body (localized rich text + images)
├── coverImage
├── category (reference)
├── author (reference → Mayka)
├── publishedAt (datetime)
└── seo (title, description, ogImage)

Kategorien (aus bestehendem Content):
├── Philosophy (Saudade Meaning)
├── Conscious Fashion (Fabric Frequency, Who Made My Clothes)
├── Community Stories
├── Event Recaps
└── Saudade Land Updates

Migrierbarer Content:
1. "Saudade Meaning" → Philosophy
2. "The Frequency of Fabrics" → Conscious Fashion
3. "Who Made My Clothes?" → Conscious Fashion
```

### 8.4 Events

```
Schema (Sanity.io):
├── title (localized)
├── slug
├── date + endDate
├── location (string + coordinates)
├── description (localized rich text)
├── lineup (array of { name, role, image })
├── gallery (array of images)
├── ticketUrl (external link oder Shopify Product)
├── status (upcoming | live | past)
└── coverImage

Features:
├── Event-Übersicht (Grid + Filter by status)
├── Einzelne Event-Seite mit Countdown
├── Lineup-Section (Musicians, DJs, Yoga Teachers)
├── Foto-Galerie (für vergangene Events)
├── Map mit Location
├── "Volunteer" + "Play at Festival" CTAs
└── Share-Buttons

Erster Event: "Saudade Festival — Portugal"
- Musik + Tanz
- Saudade Fashion Line Debut
- Art Exhibition
- Seeds of Light Workshop
- Yoga & Meditation
```

### 8.5 Donations (Stripe statt GiveWP)

```
Integration:
├── Stripe Checkout Session (Server-Side)
├── Einmalige + Wiederkehrende Spenden
├── Custom Beträge
├── Danke-Seite nach Spende
└── Steuerbeleg (optional)

UI: Schlichte Spenden-Sektion mit Purpose-Erklärung
"Support the Saudade Movement"
```

---

## 9. Cursor-Projekt Setup

### 9.1 Initialisierung

```bash
# Projekt erstellen
npx create-next-app@latest saudade-website --typescript --tailwind --app --src-dir
cd saudade-website

# Dependencies
npm install next-intl framer-motion lucide-react
npm install @shopify/hydrogen-react  # Shopify SDK
npm install next-sanity @sanity/image-url  # Sanity CMS
npm install react-hook-form  # Forms

# Dev Dependencies
npm install -D @types/node
```

### 9.2 Cursor Rules (.cursorrules)

```
# Saudade Website — Cursor Rules

## Brand
- Brand: Saudade — sustainable fashion, conscious community, regenerative living
- Founder: Mayka (Portugal-based, multilingual)
- Tone: Poetic, warm, rebellisch-positiv, nature-connected

## Design Tokens
- Primary: #6A8B5B (Sage Green)
- Primary Dark: #3F5934
- Accent: #D2BBB2 (Dusty Rose)
- Teal: #195E60
- Dark BG: #0B2B33
- Text: #2F3B40
- Heading Font: Playfair Display (serif)
- Subheading Font: Red Hat Display (sans-serif)
- Body Font: Plus Jakarta Sans (sans-serif)
- Accent Font: Courgette (cursive)

## Tech Rules
- Framework: Next.js 14+ App Router, TypeScript
- Styling: Tailwind CSS + CSS Custom Properties (never hard-code colors)
- i18n: next-intl with /[locale]/ routing
- CMS: Sanity.io for blog + events
- Shop: Shopify Storefront API (headless)
- Animations: Framer Motion (scroll-reveal, page transitions)
- Icons: Lucide React only (NO emoji in UI)
- Images: next/image with proper alt texts
- All text content must be real (from crawl data), never placeholder

## Code Style
- One component per file
- Semantic HTML (proper heading hierarchy, landmarks, alt texts)
- Mobile-first responsive design
- Minimum 44x44px touch targets
- Dark mode: not needed (brand is light-first with dark accent sections)
- Always use CSS custom properties for colors
- Prefer server components, use 'use client' only when needed
```

### 9.3 Projektstruktur

```
saudade-website/
├── public/
│   ├── images/           # Alle Bilder von der Original-Site
│   │   ├── hero/
│   │   ├── blog/
│   │   ├── events/
│   │   ├── about/
│   │   └── trust/        # GOTS, Recycled Standard Logos
│   ├── fonts/            # Self-hosted Fonts
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [handle]/page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── community/page.tsx
│   │   │   ├── saudade-land/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── donate/page.tsx
│   │   │   ├── impressum/page.tsx
│   │   │   ├── datenschutz/page.tsx
│   │   │   └── refund-returns/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Transparent → Solid on Scroll
│   │   │   ├── Footer.tsx           # Dark Teal, Full Contact
│   │   │   ├── Navigation.tsx       # Desktop + Mobile Hamburger
│   │   │   └── LanguageSwitcher.tsx  # EN/PT/ES Toggle
│   │   ├── home/
│   │   │   ├── Hero.tsx             # Fullscreen + Parallax
│   │   │   ├── IntroSection.tsx     # "High Frequency Living"
│   │   │   ├── PillarsSection.tsx   # 3 Säulen Cards
│   │   │   ├── MaykaSection.tsx     # Personal Story Snippet
│   │   │   ├── ShopPreview.tsx      # Featured Products
│   │   │   ├── EventHighlight.tsx   # Next Event + Countdown
│   │   │   ├── BlogPreview.tsx      # Latest 3 Articles
│   │   │   └── CommunityCTA.tsx     # Join + Newsletter
│   │   ├── shop/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CartProvider.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventDetail.tsx
│   │   │   └── Countdown.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogContent.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ScrollReveal.tsx     # Framer Motion wrapper
│   │       ├── SectionDivider.tsx
│   │       └── Newsletter.tsx
│   ├── lib/
│   │   ├── shopify.ts              # Storefront API Client
│   │   ├── sanity.ts               # Sanity Client + Queries
│   │   ├── stripe.ts               # Stripe Donations
│   │   └── utils.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── request.ts
│   │   └── messages/
│   │       ├── en.json
│   │       ├── pt.json
│   │       └── es.json
│   └── styles/
│       └── globals.css
├── sanity/
│   └── schemas/
│       ├── blog.ts
│       ├── event.ts
│       ├── author.ts
│       └── category.ts
├── .env.local
├── .cursorrules
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 10. Entwicklungs-Phasen für Cursor

### Phase 1: Foundation (Tag 1-2)
```
- [ ] Next.js Projekt initialisieren
- [ ] Tailwind + CSS Custom Properties (Farben, Fonts)
- [ ] next-intl Setup (EN/PT/ES Routing)
- [ ] Layout: Header (transparent→solid) + Footer (dark teal)
- [ ] Navigation (Desktop + Mobile Hamburger)
- [ ] Language Switcher
- [ ] Basis-Routing (/[locale]/...)
```

### Phase 2: Homepage (Tag 3-4)
```
- [ ] Hero Section (Fullscreen, Parallax, CTAs)
- [ ] Intro "High Frequency Living"
- [ ] 3 Pillars Section (Fashion, Community, Land)
- [ ] Mayka Section (Personal Story)
- [ ] Shop Preview (Placeholder bis Shopify steht)
- [ ] Event Highlight (Countdown)
- [ ] Blog Preview (mit echtem Content)
- [ ] Community CTA + Newsletter
- [ ] Scroll-Reveal Animationen (Framer Motion)
```

### Phase 3: Content-Seiten (Tag 5-6)
```
- [ ] About Page (Mayka Story + Saudade Meaning + Certifications)
- [ ] Community Page (Collaboration CTAs)
- [ ] Saudade Land Page (Vision + Investment)
- [ ] Contact Page (Form + Social + Map)
- [ ] Donate Page (Stripe Integration)
- [ ] Legal: Impressum, Datenschutz, Refund Policy
```

### Phase 4: Shopify (Tag 7-9)
```
- [ ] Shopify Store Setup
- [ ] Storefront API Integration
- [ ] Product Grid + Filter
- [ ] Product Detail Page
- [ ] Cart Drawer
- [ ] Checkout Redirect
- [ ] Trust Badges (GOTS, Recycled Standard)
```

### Phase 5: Blog + Events (Tag 10-12)
```
- [ ] Sanity.io Setup + Schemas
- [ ] Blog Overview + Article Template
- [ ] Content Migration (3 bestehende Artikel)
- [ ] Event Overview + Detail Template
- [ ] Event Calendar / Grid
- [ ] Countdown Component
```

### Phase 6: Polish & Launch (Tag 13-15)
```
- [ ] SEO (Meta Tags, Open Graph, Structured Data, Sitemap)
- [ ] Performance (Image Optimization, Lighthouse)
- [ ] Übersetzungen (PT, ES)
- [ ] Analytics (Plausible/Fathom)
- [ ] Domain Transfer / DNS
- [ ] Final Testing (Mobile, Cross-Browser)
- [ ] Launch 🚀
```

---

## 11. Content-Inventar (komplett, migrierbar)

### Homepage-Texte
- "THE ART THAT MADE US"
- "saudade"
- "HIGH FREQUENCY LIVING"
- "International Club For The Future"
- "Growing international community of free-thinkers and nature lovers"
- "We cannot change the world, but we can inspire and show that a different way of living is possible—one rooted in love and harmony with nature."
- "A tribe dedicated to respecting nature, healing, and raising vibrations."
- "Beautiful souls, united in joy and purpose, ready to build a new world together."

### About / Mayka Story
- "The Saudade Wear.. is an Ethical fashion brand made without chemicals, 0 waste fabric and maximum water waste reduction. Made in Portugal, inspired in nature and love for all."
- "Voçes! – Everyone has saudade within!"
- Maykas komplette Bio (aus who-makes-saudade)
- Saudade Meaning Essay (2 Versionen: kurz + lang)
- "Certified Organic GOTS and Global Recycled Standard"

### Blog-Artikel (3 fertige Texte)
1. Saudade Meaning — Philosophischer Essay von Mayka
2. The Frequency of Fabrics — Leinen 5000 mHz, Hanf, Bio-Baumwolle etc.
3. Who Made My Clothes — Fast Fashion vs. Sustainable Fashion

### Events
- Saudade Festival (Portugal): Musik, Tanz, Art, Fashion Show, Yoga, Workshops
- "Seeds of Light" Workshop

### Saudade Land
- Vision-Statement für regenerative Communities
- Investor-Pitch
- Brazil als erster Standort
- Expansion nach Lateinamerika → Global

### Community / Collaborations
- Artists, Musicians, DJs, Yoga Teachers, Healers, Coaches, Investors, Entrepreneurs, Dreamers

### Legal
- Refund/Returns Policy (30 Tage, vollständiger Text vorhanden)

---

*Dieses Dokument ist das vollständige Briefing für die Cursor-Entwicklung. Es basiert auf dem Firecrawl-Crawl (25 Seiten, Branding-Analyse, 31 Bilder) und enthält alle Inhalte, exakte Brand-Farben, Typografie und technische Spezifikationen.*
