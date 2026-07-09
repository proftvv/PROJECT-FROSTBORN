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
import { getVisibleForumCategories } from "@/lib/actions/community-actions";
import { ROLE_LEVELS } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";

export const metadata = { title: "Forum" };

export default async function ForumHomePage() {
  const user = await requireUser();
  const [categories, totals] = await Promise.all([
    getVisibleForumCategories(ROLE_LEVELS[user.role]),
    Promise.all([
      prisma.forumCategory.count({ where: { minLevel: { lte: ROLE_LEVELS[user.role] } } }),
      prisma.forumTopic.count(),
      prisma.forumPost.count(),
    ]),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Kategori</p><p className="font-display mt-2 text-2xl text-snow-100">{totals[0]}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Konu</p><p className="font-display mt-2 text-2xl text-frost-ice">{totals[1]}</p></Card>
        <Card><p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Mesaj</p><p className="font-display mt-2 text-2xl text-aurora-green">{totals[2]}</p></Card>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/forum/${category.id}`}>
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
  );
}
