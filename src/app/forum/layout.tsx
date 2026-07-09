/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS, ROLE_LEVELS } from "@/lib/roles";
import Container from "@/components/ui/Container";
import ForumSidebar from "@/components/forum/ForumSidebar";

export default async function ForumLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  const [forumProfile, popularRaw, recentRaw, latestContent, totalMembers, totalTopics, totalPosts] = await Promise.all([
    prisma.forumProfile.findUnique({ where: { userId: user.id } }),
    prisma.forumTopic.findMany({
      orderBy: [{ viewCount: "desc" }, { updatedAt: "desc" }],
      take: 8,
      include: { category: true },
    }),
    prisma.forumTopic.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 8,
      include: { category: true },
    }),
    prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, createdAt: true },
    }),
    prisma.user.count(),
    prisma.forumTopic.count(),
    prisma.forumPost.count(),
  ]);

  const visible = (topics: typeof popularRaw) =>
    topics
      .filter((topic) => ROLE_LEVELS[user.role] >= topic.category.minLevel)
      .map((topic) => ({
        id: topic.id,
        title: topic.title,
        meta: `${topic.category.title} · ${topic.viewCount} görüntüleme`,
        href: `/forum/konu/${topic.id}`,
      }));

  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_top,#222833_0%,#11151d_38%,#0b0e14_100%)] py-6">
      <Container className="space-y-6">
        <section className="rounded-3xl border border-night-800/70 bg-[linear-gradient(180deg,rgba(67,76,94,0.75)_0%,rgba(28,34,45,0.9)_100%)] p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-frost-ice/80">The Nordians Community</p>
              <h1 className="font-display mt-3 text-4xl text-snow-100">Forum</h1>
              <p className="mt-2 max-w-2xl text-sm text-snow-300/65">Panelden ayrı, topluluğa özel forum alanı. Giriş ortak; deneyim farklı.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/forum" className="rounded-md bg-night-950/55 px-4 py-2 text-snow-100 hover:bg-night-800/80">Ana Sayfa</Link>
              <Link href="/forum/etkinlikler" className="rounded-md bg-night-950/30 px-4 py-2 text-snow-300/80 hover:bg-night-800/60 hover:text-snow-100">Etkinlikler</Link>
              <Link href="/forum/profil" className="rounded-md bg-night-950/30 px-4 py-2 text-snow-300/80 hover:bg-night-800/60 hover:text-snow-100">Forum Profili</Link>
              <Link href="/panel" className="rounded-md bg-frost-deep/30 px-4 py-2 text-frost-ice hover:bg-frost-deep/40">Panele Dön</Link>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <ForumSidebar
            displayName={user.callsign ?? user.name}
            roleLabel={ROLE_LABELS[user.role]}
            bio={forumProfile?.bio ?? null}
            favoriteReplica={forumProfile?.favoriteReplica ?? null}
            playStyle={forumProfile?.playStyle ?? null}
            popular={visible(popularRaw)}
            recent={visible(recentRaw)}
            latestContent={latestContent.map((item) => ({
              id: item.id,
              title: item.title,
              meta: item.createdAt.toLocaleString("tr-TR"),
            }))}
            memberStats={{
              onlineLabel: `${Math.max(1, Math.min(12, totalMembers))} üye`,
              totalMembers,
              totalTopics,
              totalPosts,
            }}
          />
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </main>
  );
}
