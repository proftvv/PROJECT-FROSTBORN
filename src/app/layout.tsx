/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import AuroraBackground from "@/components/effects/AuroraBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "The Nordians | Airsoft Takımı",
    template: "%s | The Nordians",
  },
  description:
    "The Nordians — Marmara, Çanakkale ve Antalya bölgelerinde aktif çok şehirli airsoft takımı. Antalya'da Meskun Mahal ve Açık Orman sahalarıyla hizmetinizde.",
  keywords: ["airsoft", "the nordians", "airsoft takımı", "antalya airsoft", "meskun mahal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <AuroraBackground />
          <Navbar />
          <div className="flex flex-1 flex-col pt-16">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
