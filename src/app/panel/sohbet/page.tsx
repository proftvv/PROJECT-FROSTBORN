/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import ChatBox from "@/components/panel/ChatBox";

export const metadata = { title: "Takım Sohbeti" };

export default async function ChatPage() {
  const user = await requireLevel(3);

  const messages = await prisma.chatMessage.findMany({
    orderBy: { createdAt: "asc" },
    take: 100,
    include: { author: { select: { id: true, name: true, callsign: true } } },
  });

  const mapped = messages.map((m) => ({
    id: m.id,
    body: m.body,
    createdAt: m.createdAt.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    author: m.author.callsign ?? m.author.name,
    mine: m.author.id === user.id,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Takım Sohbeti</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Nordian'lara özel alan — saha dışı muhabbet burada.
        </p>
      </div>

      <ChatBox messages={mapped} />
    </div>
  );
}
