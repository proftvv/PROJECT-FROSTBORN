/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 4
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import type { Metadata } from "next";
import { Metamorphous, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import AuthProvider from "@/components/providers/AuthProvider";
import AuroraBackground from "@/components/effects/AuroraBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const metamorphous = Metamorphous({
  variable: "--font-metamorphous",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "The Nordians | Resmi Web Sitesi",
    template: "%s | The Nordians",
  },
  description:
    "The Nordians resmi web sitesi: Anasayfa, Hakkimizda, Takimimiz ve Kurallarimiz.",
  keywords: ["the nordians", "airsoft", "takim", "kurallar", "resmi site"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${metamorphous.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <SmoothScroll>
            <AuroraBackground />
            <Navbar />
            <div className="flex flex-1 flex-col pt-16">{children}</div>
            <Footer />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
