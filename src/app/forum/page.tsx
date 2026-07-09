/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import { requireUser } from "@/lib/guards";
import { getVisibleForumCategories } from "@/lib/actions/community-actions";
import { ROLE_LEVELS } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";

export const metadata = { title: "Forum" };

export default async function ForumHomePage() {
  const user = await requireUser();
  const [categories, totals, hotTopics, latestTopics] = await Promise.all([
    getVisibleForumCategories(ROLE_LEVELS[user.role]),
    Promise.all([
      prisma.forumCategory.count({ where: { minLevel: { lte: ROLE_LEVELS[user.role] } } }),
      prisma.forumTopic.count(),
      prisma.forumPost.count(),
    ]),
    prisma.forumTopic.findMany({
      orderBy: [{ viewCount: "desc" }, { updatedAt: "desc" }],
      take: 10,
      include: {
        category: true,
        author: { select: { name: true, callsign: true } },
        posts: { select: { id: true } },
      },
    }),
    prisma.forumTopic.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 10,
      include: {
        category: true,
        author: { select: { name: true, callsign: true } },
        posts: { select: { id: true } },
      },
    }),
  ]);

  const canSee = (minLevel: number) => ROLE_LEVELS[user.role] >= minLevel;
  const visibleHotTopics = hotTopics.filter((topic) => canSee(topic.category.minLevel));
  const visibleLatestTopics = latestTopics.filter((topic) => canSee(topic.category.minLevel));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Kategori</p><p className="font-display mt-2 text-2xl text-snow-100">{totals[0]}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Konu</p><p className="font-display mt-2 text-2xl text-frost-ice">{totals[1]}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Mesaj</p><p className="font-display mt-2 text-2xl text-aurora-green">{totals[2]}</p></Card>
      </div>

      <div className="overflow-hidden rounded-2xl border border-night-800/70 bg-night-900/45">
        <div className="flex flex-wrap items-center gap-1 border-b border-night-800/70 bg-night-900/65 px-2 py-2 text-sm">
          <span className="rounded-md border-b-2 border-aurora-green bg-night-800/70 px-4 py-2 text-snow-100">Yeni Mesajlar</span>
          <span className="rounded-md px-4 py-2 text-snow-300/65">Sıcak Konular</span>
          <span className="rounded-md px-4 py-2 text-snow-300/65">Yeni Konular</span>
          <span className="rounded-md px-4 py-2 text-snow-300/65">Popüler Konular</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-night-800/70 bg-night-950/45 text-snow-300/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Konu</th>
                <th className="px-4 py-3 text-left font-medium">Forumu</th>
                <th className="px-4 py-3 text-center font-medium">Cevap</th>
                <th className="px-4 py-3 text-center font-medium">Hit</th>
                <th className="px-4 py-3 text-left font-medium">Son Gönderim</th>
              </tr>
            </thead>
            <tbody>
              {visibleHotTopics.map((topic, index) => (
                <tr key={topic.id} className={index % 2 === 0 ? "bg-night-900/25" : "bg-night-950/20"}>
                  <td className="px-4 py-3">
                    <Link href={`/forum/konu/${topic.id}`} className="font-medium text-snow-100 hover:text-frost-ice">
                      {topic.pinned ? "📌 " : ""}{topic.title}
                    </Link>
                    <p className="mt-1 text-xs text-snow-300/45">{topic.author.callsign ?? topic.author.name}</p>
                  </td>
                  <td className="px-4 py-3 text-snow-300/70">{topic.category.title}</td>
                  <td className="px-4 py-3 text-center text-snow-300/70">{topic.posts.length}</td>
                  <td className="px-4 py-3 text-center text-snow-300/70">{topic.viewCount}</td>
                  <td className="px-4 py-3 text-snow-300/70">{topic.updatedAt.toLocaleString("tr-TR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="h-full">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">Min seviye {category.minLevel}</p>
                <Link href={`/forum/${category.id}`} className="font-display mt-2 block text-lg text-snow-100 hover:text-frost-ice">{category.title}</Link>
                <p className="mt-2 text-sm text-snow-300/70">{category.description}</p>
              </div>
              <div className="min-w-[280px] space-y-2 text-sm lg:text-right">
                {visibleLatestTopics.filter((topic) => topic.categoryId === category.id).slice(0, 2).map((topic) => (
                  <div key={topic.id}>
                    <Link href={`/forum/konu/${topic.id}`} className="text-snow-100 hover:text-frost-ice">{topic.title}</Link>
                    <p className="text-xs text-snow-300/45">{topic.author.callsign ?? topic.author.name} · {topic.updatedAt.toLocaleString("tr-TR")}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
