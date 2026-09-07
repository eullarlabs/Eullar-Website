import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress, Grain, CursorHalo } from "@/components/site/Chrome";
import { SITE } from "@/lib/content";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#04191B" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        {/* Scroll-reveal wrappers render hidden and are animated in by JS.
            Without JS there is nothing to animate them, so unhide them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
        <ScrollProgress />
        <Grain />
        <CursorHalo />
        <Nav />
        <main className="relative z-10 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
