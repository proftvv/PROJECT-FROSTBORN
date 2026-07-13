/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import AnnouncementForm from "@/components/panel/admin/AnnouncementForm";
import Card from "@/components/ui/Card";

export const metadata = { title: "Admin Duyurular" };

export default async function AdminAnnouncementsPage() {
  await requireLevel(4);
  const items = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { author: { select: { name: true, callsign: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Duyuru Yonetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Yeni duyuru yayinla ve son duyurulari gor.</p>
      </div>
      <AnnouncementForm />
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg text-snow-100">{item.title}</h2>
                <p className="text-xs text-snow-300/50">{item.author.callsign ?? item.author.name} · min seviye {item.minLevel}</p>
              </div>
              <time className="text-xs text-snow-300/50">{item.createdAt.toLocaleDateString("tr-TR")}</time>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-snow-300/75">{item.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
