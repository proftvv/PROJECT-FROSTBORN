/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import HeroSlideManager from "@/components/panel/developer/HeroSlideManager";

export const metadata = { title: "Developer Arka Planlar" };

export default async function DeveloperBackgroundPage() {
  await requireRole("DEVELOPER");

  const slides = await prisma.heroSlide.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, imageUrl: true, alt: true, order: true, isActive: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Arka Plan Yonetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Anasayfa hero arka plan slaytlarini yonet.</p>
      </div>
      <HeroSlideManager slides={slides} />
    </div>
  );
}
