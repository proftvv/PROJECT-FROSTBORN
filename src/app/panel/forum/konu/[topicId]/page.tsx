/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { notFound } from "next/navigation";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { hasLevel } from "@/lib/roles";
import Card from "@/components/ui/Card";
import ReplyForm from "@/components/panel/forum/ReplyForm";

export default async function ForumTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const user = await requireUser();
  const { topicId } = await params;

  const topic = await prisma.forumTopic.findUnique({
    where: { id: topicId },
    include: {
      author: { select: { name: true, callsign: true } },
      category: true,
      posts: {
        orderBy: { createdAt: "asc" },
        include: { author: { select: { name: true, callsign: true } } },
      },
    },
  });

  if (!topic) notFound();
  if (!hasLevel(user.role, topic.category.minLevel)) notFound();

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">{topic.category.title}</p>
        <h1 className="font-display mt-2 text-2xl text-snow-100">{topic.title}</h1>
        <p className="mt-1 text-xs text-snow-300/50">{topic.author.callsign ?? topic.author.name} · {topic.createdAt.toLocaleDateString("tr-TR")}</p>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-snow-300/75">{topic.body}</p>
      </Card>

      <div className="space-y-3">
        {topic.posts.map((post) => (
          <Card key={post.id}>
            <p className="text-xs text-frost-ice/80">{post.author.callsign ?? post.author.name}</p>
            <p className="mt-1 whitespace-pre-line text-sm text-snow-300/75">{post.body}</p>
            <p className="mt-3 text-[11px] text-snow-300/40">{post.createdAt.toLocaleString("tr-TR")}</p>
          </Card>
        ))}
      </div>

      {!topic.locked && <ReplyForm topicId={topic.id} />}
    </div>
  );
}
