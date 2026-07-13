/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default async function DeveloperDashboardPage() {
  await requireRole("DEVELOPER");

  const [fieldCount, fieldPhotoCount, heroSlideCount, contentCount, galleryCount] = await Promise.all([
    prisma.gameField.count(),
    prisma.gameFieldPhoto.count(),
    prisma.heroSlide.count({ where: { isActive: true } }),
    prisma.teamContent.count(),
    prisma.galleryItem.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Developer Paneli</h1>
        <p className="mt-1 text-sm text-snow-300/60">Site vitrini, medya ve saha varliklarinin yonetim merkezi.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Saha</p><p className="font-display mt-2 text-2xl text-frost-ice">{fieldCount}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Saha Fotografi</p><p className="font-display mt-2 text-2xl text-snow-100">{fieldPhotoCount}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Arka Plan Slaydi</p><p className="font-display mt-2 text-2xl text-aurora-green">{heroSlideCount}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Icerik</p><p className="font-display mt-2 text-2xl text-aurora-gold">{contentCount}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Galeri</p><p className="font-display mt-2 text-2xl text-frost-ice">{galleryCount}</p></Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/developer/sahalar"><Button>Sahalari Yonet</Button></Link>
        <Link href="/developer/arka-plan"><Button variant="outline">Arka Planlari Yonet</Button></Link>
        <Link href="/developer/icerikler"><Button variant="outline">Icerik Merkezi</Button></Link>
        <Link href="/developer/galeri"><Button variant="outline">Galeri</Button></Link>
        <Link href="/admin"><Button variant="ghost">Admin Paneli</Button></Link>
      </div>
    </div>
  );
}
