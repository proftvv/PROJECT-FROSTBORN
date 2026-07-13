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

export const metadata = { title: "Takim Haritalari" };

export default async function TeamMapsPage() {
  await requireLevel(3);

  const maps = await prisma.teamContent.findMany({
    where: { type: "MAP" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Takim Haritalari</h1>
        <p className="mt-1 text-sm text-snow-300/60">Saha krokileri ve operasyon haritalari.</p>
      </div>

      {maps.length === 0 ? (
        <Card className="text-center"><p className="text-sm text-snow-300/60">Henuz harita yuklenmedi.</p></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {maps.map((m) => (
            <Card key={m.id}>
              <h2 className="font-display text-lg text-snow-100">{m.title}</h2>
              <p className="mt-2 text-sm text-snow-300/70">{m.description}</p>
              {m.url && <a href={m.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-frost-ice hover:text-frost-teal">Haritayi ac -&gt;</a>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
