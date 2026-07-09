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

export const metadata = { title: "Takım Haritaları" };

export default async function MapsPage() {
  await requireLevel(3);

  const maps = await prisma.teamContent.findMany({
    where: { type: "MAP" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">
          Takım Haritaları
        </h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Saha krokileri ve operasyon haritaları — yalnızca Nordian gözlerine.
        </p>
      </div>

      {maps.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-snow-300/60">
            Henüz harita yüklenmedi. Yönetim ODIN panelinden ekleyecek.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {maps.map((m) => (
            <Card key={m.id}>
              <h2 className="font-display text-lg text-snow-100">{m.title}</h2>
              <p className="mt-2 text-sm text-snow-300/70">{m.description}</p>
              {m.url && (
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-frost-ice hover:text-frost-teal"
                >
                  Haritayı aç →
                </a>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
