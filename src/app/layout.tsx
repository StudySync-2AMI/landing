import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Outfit,
  Caveat,
  Amiri,
  Aref_Ruqaa,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-aref-ruqaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudySync | نظام أكاديمي ذكي متكامل لإدارة الرحلة الجامعية",
  description:
    "منصة أكاديمية موحدة تجمع المواد، الحضور، التقويم، التنبيهات المبكرة، وتوجيه المسار المهني المدعوم بالذكاء الاصطناعي - StudySync Smart University System",
  keywords: [
    "StudySync",
    "نظام جامعي ذكي",
    "إدارة الرحلة الجامعية",
    "حضور بـ QR Code ديناميكي",
    "توجيه المسار المهني بالذكاء الاصطناعي",
    "Academic Management System",
    "Smart University LMS",
    "Student Support Platform",
  ],
  authors: [{ name: "StudySync Team" }],
  creator: "StudySync",
  publisher: "StudySync",
  openGraph: {
    title: "StudySync | نظام أكاديمي ذكي متكامل لإدارة الرحلة الجامعية",
    description:
      "منصة تخبر الطالب بما يستطيع دراسته، وما الأنسب لمساره المهني، وما المطلوب منه حاليًا، وما إذا كان معرضًا لمشكلة أكاديمية.",
    url: "https://studysync.edu",
    siteName: "StudySync Academic Platform",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudySync - Comprehensive Smart Academic Platform",
    description:
      "A unified platform integrating courses, attendance, academic calendar, early risk warnings, and AI career track guidance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F6F0" },
    { media: "(prefers-color-scheme: dark)", color: "#11151C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${playfair.variable} ${amiri.variable} ${outfit.variable} ${ibmPlexArabic.variable} ${caveat.variable} ${arefRuqaa.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg-paper)] text-[var(--ink-primary)] font-sans antialiased selection:bg-amber-300/40 selection:text-amber-950 paper-grain-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
