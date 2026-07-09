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
import { isNordian } from "@/lib/roles";
import Card from "@/components/ui/Card";
import ApplicationForm from "@/components/panel/ApplicationForm";

export const metadata = { title: "Takıma Başvur" };

const STATUS_TEXT = {
  PENDING: { label: "İnceleniyor", cls: "text-aurora-gold" },
  APPROVED: { label: "Onaylandı", cls: "text-aurora-green" },
  REJECTED: { label: "Reddedildi", cls: "text-aurora-red" },
} as const;

export default async function ApplicationPage() {
  const user = await requireUser();

  if (isNordian(user.role)) {
    return (
      <Card className="text-center">
        <p className="text-sm text-snow-300/70">
          Zaten The Nordians saflarındasın, savaşçı. ⚔
        </p>
      </Card>
    );
  }

  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const hasPending = applications.some((a) => a.status === "PENDING");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Takıma Başvur</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          The Nordians kadrosuna katılım başvurusu.
        </p>
      </div>

      {applications.length > 0 && (
        <div className="space-y-4">
          {applications.map((a) => (
            <Card key={a.id}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-snow-300/70">
                  {a.createdAt.toLocaleDateString("tr-TR")} · {a.region}
                </p>
                <p className={`text-sm font-medium ${STATUS_TEXT[a.status].cls}`}>
                  {STATUS_TEXT[a.status].label}
                </p>
              </div>
              {a.reply && (
                <p className="mt-3 rounded-lg bg-night-900/60 px-4 py-3 text-sm text-snow-300/75">
                  <span className="text-frost-ice">Yönetim yanıtı:</span>{" "}
                  {a.reply}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      {!hasPending && <ApplicationForm />}
    </div>
  );
}
