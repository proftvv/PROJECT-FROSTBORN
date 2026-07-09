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
import { createAnnouncement } from "@/lib/actions/admin-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function AnnouncementForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [minLevel, setMinLevel] = useState("2");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await createAnnouncement({
      title,
      body,
      minLevel: Number(minLevel),
    });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "") : (res.error ?? "") });
    if (res.ok) {
      setTitle("");
      setBody("");
      setMinLevel("2");
      router.refresh();
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit} className="space-y-4">
        {msg && (
          <p className={`rounded-lg px-4 py-2.5 text-sm ${msg.ok ? "bg-aurora-green/10 text-aurora-green" : "bg-aurora-red/10 text-aurora-red"}`}>
            {msg.text}
          </p>
        )}
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Duyuru başlığı" />
        <textarea className={inputClass} rows={5} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Duyuru metni" />
        <select className={inputClass} value={minLevel} onChange={(e) => setMinLevel(e.target.value)}>
          <option value="2">Üye ve üstü</option>
          <option value="3">Nordian ve üstü</option>
          <option value="4">Yönetici ve üstü</option>
          <option value="5">Başkan/Bşk.Yrd./Developer</option>
          <option value="6">Sadece Developer</option>
        </select>
        <Button type="submit" disabled={busy}>{busy ? "Yayınlanıyor..." : "Duyuru Yayınla"}</Button>
      </form>
    </Card>
  )
}
