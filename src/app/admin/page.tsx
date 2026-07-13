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

  const [users, pendingApplications, announcements, contents, events, logs] = await Promise.all([
    prisma.user.count(),
    prisma.application.count({ where: { status: "PENDING" } }),
    prisma.announcement.count(),
    prisma.teamContent.count(),
    prisma.event.count(),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Admin Paneli</h1>
        <p className="mt-1 text-sm text-snow-300/60">Komuta merkezi.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Toplam Uye</p><p className="font-display mt-2 text-2xl text-snow-100">{users}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Bekleyen Basvuru</p><p className="font-display mt-2 text-2xl text-aurora-gold">{pendingApplications}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Duyurular</p><p className="font-display mt-2 text-2xl text-frost-ice">{announcements}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Icerikler</p><p className="font-display mt-2 text-2xl text-aurora-green">{contents}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Etkinlikler</p><p className="font-display mt-2 text-2xl text-frost-ice">{events}</p></Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/basvurular"><Button>Basvurulari Ac</Button></Link>
        <Link href="/admin/uyeler"><Button variant="outline">Uyeleri Ac</Button></Link>
        <Link href="/admin/duyurular"><Button variant="outline">Duyurular</Button></Link>
        <Link href="/admin/icerikler"><Button variant="outline">Icerikler</Button></Link>
        <Link href="/admin/galeri"><Button variant="outline">Galeri</Button></Link>
      </div>

      <Card>
        <h2 className="font-display text-lg text-snow-100">Denetim Kaydi</h2>
        <div className="mt-4 space-y-3">
          {logs.length === 0 ? (
            <p className="text-sm text-snow-300/60">Henuz kayit yok.</p>
          ) : logs.map((log) => (
            <div key={log.id} className="flex items-start justify-between gap-4 text-sm">
              <div>
                <p className="text-snow-100">{log.actorName}</p>
                <p className="text-snow-300/60">{log.action} · {log.detail}</p>
              </div>
              <time className="shrink-0 text-xs text-snow-300/40">{log.createdAt.toLocaleString("tr-TR")}</time>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
