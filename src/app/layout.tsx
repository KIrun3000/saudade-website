import type { Metadata } from "next";
import { Cormorant_Garamond, Courgette, Plus_Jakarta_Sans, Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-heading",
});

const displayFont = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

const accentFont = Courgette({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-accent",
});

const wordmarkFont = localFont({
  src: [
    { path: "../../public/fonts/Cocomat-Pro-Thin-trial.ttf",       weight: "100", style: "normal" },
    { path: "../../public/fonts/Cocomat-Pro-Extralight-trial.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/Cocomat-Pro-Light-trial.ttf",      weight: "300", style: "normal" },
  ],
  display: "swap",
  variable: "--font-wordmark",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saudadevoces.com"),
  icons: {
    icon: "/favicon-mandala.png",
    apple: "/favicon-mandala.png",
  },
  title: {
    default: "Saudade — Sustainable Fashion & Original Art | High Frequency Living",
    template: "%s | Saudade",
  },
  description:
    "Saudade: sustainable GOTS-certified fashion made in Portugal, and original paintings and limited art prints by Adair. Conscious clothing and art with a higher purpose.",
  keywords: [
    "saudade",
    "sustainable fashion",
    "sustainable clothing",
    "original art",
    "art prints",
    "paintings",
    "conscious fashion",
    "slow fashion",
    "organic clothing",
    "ethical fashion",
    "kimono",
    "high frequency",
    "regenerative living",
    "GOTS certified",
    "made in Portugal",
  ],
  authors: [{ name: "Saudade", url: "https://saudadevoces.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Saudade",
    title: "Saudade — Sustainable Fashion & Original Art",
    description:
      "Sustainable fashion made in Portugal, and original paintings and limited art prints.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Saudade — High Frequency Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudade — Sustainable Fashion & Original Art",
    description:
      "Sustainable fashion made in Portugal, and original paintings and limited art prints.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saudade",
    description:
      "Saudade — original art and sustainable fashion brand. Conscious clothing made in Portugal and limited art prints born from pure vision.",
    url: "https://www.saudadevoces.com",
    logo: "https://www.saudadevoces.com/favicon-mandala.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "saudadestyle@gmail.com",
      telephone: "+351968179500",
      contactType: "customer service",
    },
    sameAs: ["https://instagram.com/saudadevoces", "https://instagram.com/maykalien"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Saudade",
    alternateName: "Saudade Voces",
    url: "https://www.saudadevoces.com",
    inLanguage: ["en", "pt", "es", "pl"],
  };

  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${displayFont.variable} ${bodyFont.variable} ${accentFont.variable} ${wordmarkFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-primary text-text-on-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
