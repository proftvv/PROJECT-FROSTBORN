/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ROLE_LEVELS } from "@/lib/roles";
import Card from "@/components/ui/Card";

export const metadata = { title: "Duyurular" };

export default async function AnnouncementsPage() {
  const user = await requireUser();

  const announcements = await prisma.announcement.findMany({
    where: { minLevel: { lte: ROLE_LEVELS[user.role] } },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, callsign: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Duyurular</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Takımdan haberler ve bildirimler.
        </p>
      </div>

      {announcements.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-snow-300/60">Henüz duyuru yok.</p>
        </Card>
      ) : (
        announcements.map((a) => (
          <Card key={a.id}>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-lg text-snow-100">{a.title}</h2>
              <time className="shrink-0 text-xs text-snow-300/50">
                {a.createdAt.toLocaleDateString("tr-TR")}
              </time>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-snow-300/75">
              {a.body}
            </p>
            <p className="mt-4 text-xs text-frost-ice/70">
              — {a.author.callsign ?? a.author.name}
            </p>
          </Card>
        ))
      )}
    </div>
  );
}
