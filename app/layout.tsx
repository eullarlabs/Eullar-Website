import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { LogoDefs } from "@/components/site/Logo";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress, Grain } from "@/components/site/Chrome";
import { SITE } from "@/lib/content";

/* An optical-size serif with the WONK axis on — warm and clearly drawn by a
   person, which is the opposite of the default geometric-sans look. */
const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eullar.com"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI research",
    "applied AI",
    "AI for education",
    "adaptive learning",
    "applicant feedback",
    "Syllabi",
    "Reevue",
    "Eullar Labs",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1413",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-skin="ink"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Scroll-reveal wrappers render hidden and are animated in by JS.
            Without JS there is nothing to animate them, so unhide them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;filter:none!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <LogoDefs />
        <ScrollProgress />
        <Grain />
        <Nav />
        <main className="relative grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
