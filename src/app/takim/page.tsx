/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default async function TeamPanelPage() {
  await requireLevel(3);

  const [maps, trainings, messages, events] = await Promise.all([
    prisma.teamContent.count({ where: { type: "MAP" } }),
    prisma.teamContent.count({ where: { type: "TRAINING" } }),
    prisma.chatMessage.count(),
    prisma.event.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Takim Oyuncusu Paneli</h1>
        <p className="mt-1 text-sm text-snow-300/60">Operasyonel araclar ve takim ici icerikler.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Haritalar</p><p className="font-display mt-2 text-2xl text-frost-ice">{maps}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Egitimler</p><p className="font-display mt-2 text-2xl text-aurora-green">{trainings}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Sohbet Mesaji</p><p className="font-display mt-2 text-2xl text-snow-100">{messages}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Etkinlik</p><p className="font-display mt-2 text-2xl text-aurora-gold">{events}</p></Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/takim/haritalar"><Button>Haritalari Ac</Button></Link>
        <Link href="/takim/egitim"><Button variant="outline">Egitimlere Git</Button></Link>
        <Link href="/takim/sohbet"><Button variant="outline">Takim Sohbeti</Button></Link>
        <Link href="/takim/etkinlikler"><Button variant="outline">Etkinlikler</Button></Link>
      </div>
    </div>
  );
}
