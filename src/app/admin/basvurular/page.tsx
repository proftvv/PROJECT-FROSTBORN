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
import Card from "@/components/ui/Card";
import ApplicationCard from "@/components/panel/admin/ApplicationCard";

export const metadata = { title: "Admin Basvurular" };

export default async function AdminApplicationsPage() {
  await requireLevel(4);

  const [pending, decided] = await Promise.all([
    prisma.application.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.application.findMany({
      where: { status: { not: "PENDING" } },
      orderBy: { updatedAt: "desc" },
      take: 20,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Basvurular</h1>
        <p className="mt-1 text-sm text-snow-300/60">{pending.length} bekleyen basvuru.</p>
      </div>

      {pending.length === 0 ? (
        <Card className="text-center"><p className="text-sm text-snow-300/60">Bekleyen basvuru yok.</p></Card>
      ) : (
        <div className="space-y-4">
          {pending.map((a) => (
            <ApplicationCard
              key={a.id}
              app={{
                id: a.id,
                applicantName: a.user.name,
                applicantEmail: a.user.email,
                region: a.region,
                experience: a.experience,
                motivation: a.motivation,
                createdAt: a.createdAt.toLocaleDateString("tr-TR"),
              }}
            />
          ))}
        </div>
      )}

      {decided.length > 0 && (
        <div>
          <h2 className="font-display mb-4 text-lg text-snow-100">Son Kararlar</h2>
          <div className="space-y-2">
            {decided.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-night-900/50 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate text-snow-100">{a.user.name}</p>
                  <p className="truncate text-xs text-snow-300/50">{a.region} · {a.updatedAt.toLocaleDateString("tr-TR")}</p>
                </div>
                <span className={`shrink-0 text-xs uppercase tracking-[0.2em] ${a.status === "APPROVED" ? "text-aurora-green" : "text-aurora-red"}`}>
                  {a.status === "APPROVED" ? "Onaylandi" : "Reddedildi"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
