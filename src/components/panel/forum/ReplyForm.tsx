/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createForumPost } from "@/lib/actions/community-actions";
import Button from "@/components/ui/Button";

export default function ReplyForm({ topicId }: { topicId: string }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await createForumPost({ topicId, body });
    setBusy(false);
    if (!res.ok) {
      setMsg(res.error ?? "Bir hata oluştu.");
      return;
    }
    setBody("");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl bg-night-900/50 p-4">
      {msg && <p className="rounded-lg bg-aurora-red/10 px-4 py-2.5 text-sm text-aurora-red">{msg}</p>}
      <textarea
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60"
        placeholder="Yanıtını yaz..."
      />
      <Button type="submit" disabled={busy || body.trim().length < 2}>{busy ? "Gönderiliyor..." : "Yanıtla"}</Button>
    </form>
  );
}
