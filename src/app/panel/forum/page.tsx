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

export default async function ForumPage() {
  const user = await requireUser();
  const [categories, mostViewed, recentlyViewed, forumProfile] = await Promise.all([
    getVisibleForumCategories(ROLE_LEVELS[user.role]),
    prisma.forumTopic.findMany({
      orderBy: [{ viewCount: "desc" }, { updatedAt: "desc" }],
      take: 6,
      include: { category: true },
    }),
    prisma.forumTopic.findMany({
      where: { lastViewedAt: { not: null } },
      orderBy: [{ lastViewedAt: "desc" }],
      take: 6,
      include: { category: true },
    }),
    prisma.forumProfile.findUnique({ where: { userId: user.id } }),
  ]);

  const visibleMostViewed = mostViewed.filter((topic) =>
    ROLE_LEVELS[user.role] >= topic.category.minLevel,
  );
  const visibleRecentlyViewed = recentlyViewed.filter((topic) =>
    ROLE_LEVELS[user.role] >= topic.category.minLevel,
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="space-y-4 xl:order-first">
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">Forum Profili</p>
          <h2 className="font-display mt-2 text-lg text-snow-100">{user.callsign ?? user.name}</h2>
          <p className="mt-2 text-sm text-snow-300/70">{forumProfile?.bio ?? "Henüz forum biyografisi yok."}</p>
          {(forumProfile?.favoriteReplica || forumProfile?.playStyle) && (
            <div className="mt-4 space-y-1 text-xs text-snow-300/60">
              {forumProfile?.favoriteReplica && <p>Replica: {forumProfile.favoriteReplica}</p>}
              {forumProfile?.playStyle && <p>Stil: {forumProfile.playStyle}</p>}
            </div>
          )}
          <Link href="/panel/forum/profil" className="mt-4 inline-block text-sm text-frost-ice hover:text-frost-teal">
            Profili düzenle →
          </Link>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">En Çok Görüntülenen</p>
          <div className="mt-3 space-y-3">
            {visibleMostViewed.length === 0 ? (
              <p className="text-sm text-snow-300/60">Henüz veri yok.</p>
            ) : visibleMostViewed.map((topic) => (
              <Link key={topic.id} href={`/panel/forum/konu/${topic.id}`} className="block">
                <p className="text-sm text-snow-100 hover:text-frost-ice">{topic.title}</p>
                <p className="text-xs text-snow-300/50">{topic.viewCount} görüntüleme</p>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">Son Görüntülenen</p>
          <div className="mt-3 space-y-3">
            {visibleRecentlyViewed.length === 0 ? (
              <p className="text-sm text-snow-300/60">Henüz veri yok.</p>
            ) : visibleRecentlyViewed.map((topic) => (
              <Link key={topic.id} href={`/panel/forum/konu/${topic.id}`} className="block">
                <p className="text-sm text-snow-100 hover:text-frost-ice">{topic.title}</p>
                <p className="text-xs text-snow-300/50">{topic.lastViewedAt?.toLocaleString("tr-TR")}</p>
              </Link>
            ))}
          </div>
        </Card>
      </aside>

      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl text-snow-100">Forum</h1>
          <p className="mt-1 text-sm text-snow-300/60">Topluluğun sesi burada yükselir.</p>
        </div>

        <div className="grid gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/panel/forum/${category.id}`}>
              <Card className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">Min seviye {category.minLevel}</p>
                    <h2 className="font-display mt-2 text-lg text-snow-100">{category.title}</h2>
                    <p className="mt-2 text-sm text-snow-300/70">{category.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
