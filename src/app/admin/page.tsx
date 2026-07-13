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

export default async function AdminDashboardPage() {
  await requireLevel(4);

  const [users, activeMembers, pendingMembers] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Genel Admin Paneli</h1>
        <p className="mt-1 text-sm text-snow-300/60">The Nordians web sitesi kisi yonetimi merkezi.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Toplam Uye</p><p className="font-display mt-2 text-2xl text-snow-100">{users}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Aktif Uye</p><p className="font-display mt-2 text-2xl text-aurora-green">{activeMembers}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Bekleyen</p><p className="font-display mt-2 text-2xl text-aurora-gold">{pendingMembers}</p></Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/uyeler"><Button>Takim Kisilerini Yonet</Button></Link>
        <Link href="/takimimiz"><Button variant="outline">Takimimizi Gor</Button></Link>
      </div>
    </div>
  );
}
