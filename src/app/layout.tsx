import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SmoothScroll, ScrollProgress, PageTransition, Navbar, Footer } from "@/components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const siteUrl = "https://kevinjp.dev";
const siteName = "Kevin Julio Pineda";
const siteDescription =
  "Ingeniero de sistemas y desarrollador frontend con visión full-stack. Diseño y construyo productos web a medida, adaptados a las necesidades de cada cliente.";
const ogImage = "/og-image.webp";
const faviconPath = "/favicon";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Frontend Developer • Full-stack`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Kevin Julio Pineda",
    "frontend developer",
    "desarrollador frontend",
    "full-stack",
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Shopify",
    "e-commerce",
    "portfolio",
    "desarrollador web",
    "Barranquilla",
    "Colombia",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName,
    title: `${siteName} | Frontend Developer • Full-stack`,
    description:
      "Portfolio de Kevin Julio Pineda — desarrollador frontend con visión full-stack. Proyectos web, e-commerce y aplicaciones a medida.",
    images: [
      {
        url: ogImage,
        width: 512,
        height: 512,
        alt: `${siteName} — Frontend Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Frontend Developer · Full-stack`,
    description: siteDescription,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: `${faviconPath}/site.webmanifest`,
  icons: {
    icon: [
      { url: `${faviconPath}/favicon.ico`, sizes: "any" },
      { url: `${faviconPath}/favicon.svg`, type: "image/svg+xml" },
      {
        url: `${faviconPath}/favicon-96x96.png`,
        sizes: "96x96",
        type: "image/png",
      },
    ],
    shortcut: `${faviconPath}/favicon.ico`,
    apple: `${faviconPath}/apple-touch-icon.png`,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="grain relative bg-ink-900 text-bone-100 selection:bg-signal selection:text-ink-900">
        <SmoothScroll>
          <div className="blueprint" aria-hidden />
          <div className="scanline" aria-hidden />
          <ScrollProgress />
          <Navbar />
          <PageTransition>
            <main className="relative z-10 min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
