import type { Metadata } from "next";
import { Cormorant_Garamond, Courgette, Plus_Jakarta_Sans, Red_Hat_Display } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://saudade-website.vercel.app"),
  title: {
    default: "Saudade — High Frequency Living",
    template: "%s | Saudade",
  },
  description:
    "International community of free-thinkers and nature lovers. Sustainable fashion, conscious events, and regenerative living. Made in Portugal.",
  keywords: [
    "saudade",
    "sustainable fashion",
    "conscious living",
    "community",
    "Portugal",
    "ethical fashion",
    "high frequency",
    "regenerative",
    "organic fashion",
    "GOTS certified",
  ],
  authors: [{ name: "Saudade", url: "https://saudadevoces.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Saudade",
    title: "Saudade — High Frequency Living",
    description: "International community of free-thinkers and nature lovers.",
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
    title: "Saudade — High Frequency Living",
    description: "International community of free-thinkers and nature lovers.",
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
    description: "Sustainable fashion brand and conscious living community",
    url: "https://saudade-website.vercel.app",
    logo: "https://saudadevoces.com/wp-content/uploads/2026/03/cropped-cropped-saudade_round_logo-removebg-preview.png",
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

  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${displayFont.variable} ${bodyFont.variable} ${accentFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-primary text-text-on-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
