/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * ODIN — Başvuru yönetimi (Yönetici ve üstü).
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import ApplicationCard from "@/components/panel/admin/ApplicationCard";

export const metadata = { title: "Başvurular" };

export default async function ApplicationsAdminPage() {
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
        <h1 className="font-display text-2xl text-snow-100">Başvurular</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          {pending.length} bekleyen başvuru.
        </p>
      </div>

      {pending.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-snow-300/60">
            Bekleyen başvuru yok. Odin dinleniyor. 🐦‍⬛
          </p>
        </Card>
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
          <h2 className="font-display mb-4 text-lg text-snow-100">
            Son Kararlar
          </h2>
          <div className="space-y-2">
            {decided.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-xl bg-night-900/50 px-4 py-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate text-snow-100">{a.user.name}</p>
                  <p className="truncate text-xs text-snow-300/50">
                    {a.region} · {a.updatedAt.toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs uppercase tracking-[0.2em] ${
                    a.status === "APPROVED"
                      ? "text-aurora-green"
                      : "text-aurora-red"
                  }`}
                >
                  {a.status === "APPROVED" ? "Onaylandı" : "Reddedildi"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
