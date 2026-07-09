/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import ContentForm from "@/components/panel/admin/ContentForm";
import Card from "@/components/ui/Card";

export const metadata = { title: "İçerik Yönetimi" };

export default async function AdminContentPage() {
  await requireLevel(4);
  const items = await prisma.teamContent.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { author: { select: { name: true, callsign: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">İçerik Yönetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Harita ve eğitim içeriklerini ekle.</p>
      </div>
      <ContentForm />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id}>
            <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">{item.type === "MAP" ? "Harita" : "Eğitim"}</p>
            <h2 className="font-display mt-2 text-lg text-snow-100">{item.title}</h2>
            <p className="mt-2 text-sm text-snow-300/70">{item.description}</p>
            <p className="mt-3 text-xs text-snow-300/50">{item.author.callsign ?? item.author.name}</p>
            {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-frost-ice hover:text-frost-teal">Bağlantıyı aç →</a>}
          </Card>
        ))}
      </div>
    </div>
  )
}
