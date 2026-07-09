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
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { hasLevel } from "@/lib/roles";
import TopicForm from "@/components/panel/forum/TopicForm";
import Card from "@/components/ui/Card";

export default async function ForumCategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const user = await requireUser();
  const { categoryId } = await params;

  const category = await prisma.forumCategory.findUnique({
    where: { id: categoryId },
    include: {
      topics: {
        orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
        include: {
          author: { select: { name: true, callsign: true } },
          posts: { select: { id: true } },
        },
      },
    },
  });

  if (!category) notFound();
  if (!hasLevel(user.role, category.minLevel)) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">{category.title}</h1>
        <p className="mt-1 text-sm text-snow-300/60">{category.description}</p>
      </div>

      <TopicForm categoryId={category.id} />

      <div className="space-y-3">
        {category.topics.length === 0 ? (
          <Card className="text-center"><p className="text-sm text-snow-300/60">Henüz konu açılmadı.</p></Card>
        ) : category.topics.map((topic) => (
          <Link key={topic.id} href={`/panel/forum/konu/${topic.id}`}>
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg text-snow-100">{topic.pinned ? "📌 " : ""}{topic.title}</h2>
                  <p className="mt-1 text-xs text-snow-300/50">{topic.author.callsign ?? topic.author.name} · {topic.createdAt.toLocaleDateString("tr-TR")}</p>
                </div>
                <span className="text-xs text-frost-ice/80">{topic.posts.length} yanıt</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-snow-300/70">{topic.body}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
