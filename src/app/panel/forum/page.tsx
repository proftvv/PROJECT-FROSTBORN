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
import Card from "@/components/ui/Card";

export const metadata = { title: "Forum" };

export default async function ForumPage() {
  const user = await requireUser();
  const categories = await getVisibleForumCategories(ROLE_LEVELS[user.role]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Forum</h1>
        <p className="mt-1 text-sm text-snow-300/60">Topluluğun sesi burada yükselir.</p>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/panel/forum/${category.id}`}>
            <Card className="h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">Min seviye {category.minLevel}</p>
              <h2 className="font-display mt-2 text-lg text-snow-100">{category.title}</h2>
              <p className="mt-2 text-sm text-snow-300/70">{category.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
