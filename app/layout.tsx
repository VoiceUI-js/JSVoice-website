import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://jsvoice.dev"),
  title: {
    default: "JSVoice - Voice Commands Made Simple",
    template: "%s | JSVoice",
  },
  description:
    "Modern JavaScript voice command library. Zero dependencies, TypeScript ready, production proven. Build voice-enabled applications with ease.",
  keywords: [
    "voice commands",
    "speech recognition",
    "javascript",
    "typescript",
    "voice control",
    "web speech api",
    "voice ui",
    "jsvoice",
    "jaya's voice",
    "java voice",
    "speech to text javascript",
    "text to speech javascript",
  ],
  authors: [{ name: "JSVoice Team" }],
  creator: "JSVoice Team",
  publisher: "JSVoice",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsvoice.dev",
    title: "JSVoice - Voice Commands Made Simple",
    description:
      "Modern JavaScript voice command library. Zero dependencies, TypeScript ready, production proven.",
    siteName: "JSVoice",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSVoice - Voice Commands Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSVoice - Voice Commands Made Simple",
    description:
      "Modern JavaScript voice command library. Zero dependencies, TypeScript ready, production proven.",
    images: ["/og-image.png"],
    creator: "@jsvoice",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <ToastProvider>
            <SplashCursor />
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
