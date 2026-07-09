/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";

export const metadata = { title: "Eğitim İçerikleri" };

export default async function TrainingPage() {
  await requireLevel(3);

  const trainings = await prisma.teamContent.findMany({
    where: { type: "TRAINING" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">
          Eğitim İçerikleri
        </h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Taktik dokümanlar, videolar ve eğitim materyalleri.
        </p>
      </div>

      {trainings.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-snow-300/60">
            Henüz eğitim içeriği yüklenmedi. Yönetim ODIN panelinden ekleyecek.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {trainings.map((t) => (
            <Card key={t.id}>
              <h2 className="font-display text-lg text-snow-100">{t.title}</h2>
              <p className="mt-2 text-sm text-snow-300/70">{t.description}</p>
              {t.url && (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-frost-ice hover:text-frost-teal"
                >
                  İçeriğe git →
                </a>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
