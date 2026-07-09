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
import { createTeamContent } from "@/lib/actions/admin-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function ContentForm() {
  const router = useRouter();
  const [type, setType] = useState<"MAP" | "TRAINING">("MAP");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await createTeamContent({ type, title, description, url });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "") : (res.error ?? "") });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setUrl("");
      setType("MAP");
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
        <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as "MAP" | "TRAINING")}>
          <option value="MAP">Harita</option>
          <option value="TRAINING">Eğitim</option>
        </select>
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" />
        <textarea className={inputClass} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Açıklama" />
        <input className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://... (opsiyonel)" />
        <Button type="submit" disabled={busy}>{busy ? "Ekleniyor..." : "İçerik Ekle"}</Button>
      </form>
    </Card>
  )
}
