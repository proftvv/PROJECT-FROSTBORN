/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-night-800 py-10">
      <Container className="flex flex-col items-center gap-6 text-center">
        <div className="font-display text-lg font-bold tracking-widest text-snow-100">
          THE <span className="text-frost-ice">NORDIANS</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-snow-300/70">
          <Link href="/hakkimizda" className="hover:text-frost-ice">Hakkımızda</Link>
          <Link href="/takimimiz" className="hover:text-frost-ice">Takımımız</Link>
          <Link href="/sahalar" className="hover:text-frost-ice">Sahalarımız</Link>
          <Link href="/galeri" className="hover:text-frost-ice">Galeri</Link>
          <Link href="/iletisim" className="hover:text-frost-ice">İletişim</Link>
        </nav>

        <p className="text-xs text-snow-300/50">
          {SITE.regions.join(" · ")}
        </p>

        <p className="text-xs text-snow-300/40">
          The Nordians © {new Date().getFullYear()} — dev By Proftvv
        </p>
      </Container>
    </footer>
  );
}
