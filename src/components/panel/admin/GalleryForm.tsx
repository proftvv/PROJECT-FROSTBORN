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
import { createGalleryItem } from "@/lib/actions/community-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass = "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function GalleryForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await createGalleryItem({ title, description, imageUrl });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "") : (res.error ?? "") });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setImageUrl("");
      router.refresh();
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit} className="space-y-4">
        {msg && <p className={`rounded-lg px-4 py-2.5 text-sm ${msg.ok ? "bg-aurora-green/10 text-aurora-green" : "bg-aurora-red/10 text-aurora-red"}`}>{msg.text}</p>}
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Görsel başlığı" />
        <textarea className={inputClass} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Açıklama (opsiyonel)" />
        <input className={inputClass} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://... görsel bağlantısı" />
        <Button type="submit" disabled={busy}>{busy ? "Ekleniyor..." : "Galeriye Ekle"}</Button>
      </form>
    </Card>
  );
}
