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
import Card from "@/components/ui/Card";

export const metadata = { title: "Forum Yönetimi" };

export default async function AdminForumPage() {
  await requireLevel(4);
  const [categories, topics, posts] = await Promise.all([
    prisma.forumCategory.count(),
    prisma.forumTopic.count(),
    prisma.forumPost.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Forum Yönetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Kategori, konu ve mesaj özetleri.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Kategori</p><p className="font-display mt-2 text-2xl text-frost-ice">{categories}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Konu</p><p className="font-display mt-2 text-2xl text-snow-100">{topics}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Mesaj</p><p className="font-display mt-2 text-2xl text-aurora-green">{posts}</p></Card>
      </div>
      <Card>
        <p className="text-sm text-snow-300/70">Forum moderasyon araçları sonraki iterasyonda konu sabitleme/kilitleme ve kategori yönetimi olarak genişletilecek.</p>
      </Card>
    </div>
  );
}
