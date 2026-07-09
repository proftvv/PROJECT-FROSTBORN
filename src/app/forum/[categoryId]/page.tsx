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
        <p className="text-xs uppercase tracking-[0.25em] text-frost-ice/80">Kategori</p>
        <h1 className="font-display mt-2 text-2xl text-snow-100">{category.title}</h1>
        <p className="mt-1 text-sm text-snow-300/60">{category.description}</p>
      </div>

      <TopicForm categoryId={category.id} />

      <div className="overflow-hidden rounded-2xl border border-night-800/70 bg-night-900/45">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-night-800/70 bg-night-950/45 text-snow-300/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Konu</th>
                <th className="px-4 py-3 text-center font-medium">Cevap</th>
                <th className="px-4 py-3 text-center font-medium">Hit</th>
                <th className="px-4 py-3 text-left font-medium">Son Gönderim</th>
              </tr>
            </thead>
            <tbody>
              {category.topics.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-snow-300/60">Henüz konu açılmadı.</td>
                </tr>
              ) : category.topics.map((topic, index) => (
                <tr key={topic.id} className={index % 2 === 0 ? "bg-night-900/25" : "bg-night-950/20"}>
                  <td className="px-4 py-3">
                    <Link href={`/forum/konu/${topic.id}`} className="font-medium text-snow-100 hover:text-frost-ice">
                      {topic.pinned ? "📌 " : ""}{topic.title}
                    </Link>
                    <p className="mt-1 text-xs text-snow-300/50">{topic.author.callsign ?? topic.author.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-snow-300/45">{topic.body}</p>
                  </td>
                  <td className="px-4 py-3 text-center text-snow-300/70">{topic.posts.length}</td>
                  <td className="px-4 py-3 text-center text-snow-300/70">{topic.viewCount}</td>
                  <td className="px-4 py-3 text-snow-300/70">{topic.updatedAt.toLocaleString("tr-TR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
