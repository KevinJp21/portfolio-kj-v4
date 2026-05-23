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

export const metadata: Metadata = {
  title: "Kevin Julio Pineda — Frontend Developer · Full-stack",
  description:
    "Ingeniero de sistemas y desarrollador frontend con conocimientos full-stack. Construyo aplicaciones web modernas con React, Next.js y TailwindCSS.",
  metadataBase: new URL("https://kevinjp.dev"),
  openGraph: {
    title: "Kevin Julio Pineda — Frontend Developer",
    description:
      "Portfolio de Kevin Julio Pineda — frontend developer con visión full-stack.",
    type: "website",
  },
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
