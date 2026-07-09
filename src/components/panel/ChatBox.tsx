/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { sendChatMessage } from "@/lib/actions/panel-actions";
import Button from "@/components/ui/Button";

interface Message {
  id: string;
  body: string;
  createdAt: string;
  author: string;
  mine: boolean;
}

export default function ChatBox({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages.length]);

  // 10 sn'de bir yenile
  useEffect(() => {
    const t = setInterval(() => router.refresh(), 10000);
    return () => clearInterval(t);
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);
    const res = await sendChatMessage({ body });
    setLoading(false);
    if (res.ok) {
      setBody("");
      router.refresh();
    }
  };

  return (
    <div className="flex h-[60vh] flex-col rounded-2xl bg-night-900/50">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-snow-300/50">
            Sohbet sessiz... İlk mesajı sen at.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                m.mine
                  ? "bg-frost-deep/40 text-snow-100"
                  : "bg-night-800/80 text-snow-300"
              }`}
            >
              {!m.mine && (
                <p className="mb-0.5 text-xs font-medium text-frost-ice">
                  {m.author}
                </p>
              )}
              {m.body}
            </div>
            <time className="mt-1 px-1 text-[10px] text-snow-300/40">
              {m.createdAt}
            </time>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-night-800 p-3"
      >
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={500}
          className="flex-1 rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none focus:border-frost-ice/60"
          placeholder="Mesajını yaz..."
        />
        <Button type="submit" size="sm" disabled={loading || !body.trim()}>
          Gönder
        </Button>
      </form>
    </div>
  );
}
