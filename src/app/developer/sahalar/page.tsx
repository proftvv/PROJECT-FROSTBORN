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
import FieldManager from "@/components/panel/developer/FieldManager";

export const metadata = { title: "Developer Sahalar" };

export default async function DeveloperFieldsPage() {
  await requireRole("DEVELOPER");

  const fields = await prisma.gameField.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      photos: {
        orderBy: { createdAt: "desc" },
        select: { id: true, imageUrl: true, caption: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Saha Yonetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Oyun alanlarini ekle, kaldir ve fotograf yonetimi yap.</p>
      </div>
      <FieldManager fields={fields} />
    </div>
  );
}
