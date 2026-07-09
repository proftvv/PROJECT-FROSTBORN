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
import { updateForumProfile } from "@/lib/actions/community-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass = "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function ForumProfileForm({
  initialBio,
  initialSignature,
  initialFavoriteReplica,
  initialPlayStyle,
}: {
  initialBio: string;
  initialSignature: string;
  initialFavoriteReplica: string;
  initialPlayStyle: string;
}) {
  const router = useRouter();
  const [bio, setBio] = useState(initialBio);
  const [signature, setSignature] = useState(initialSignature);
  const [favoriteReplica, setFavoriteReplica] = useState(initialFavoriteReplica);
  const [playStyle, setPlayStyle] = useState(initialPlayStyle);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await updateForumProfile({ bio, signature, favoriteReplica, playStyle });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "") : (res.error ?? "") });
    if (res.ok) router.refresh();
  };

  return (
    <Card>
      <form onSubmit={onSubmit} className="space-y-4">
        {msg && <p className={`rounded-lg px-4 py-2.5 text-sm ${msg.ok ? "bg-aurora-green/10 text-aurora-green" : "bg-aurora-red/10 text-aurora-red"}`}>{msg.text}</p>}
        <input className={inputClass} value={favoriteReplica} onChange={(e) => setFavoriteReplica(e.target.value)} placeholder="Favori replica" />
        <input className={inputClass} value={playStyle} onChange={(e) => setPlayStyle(e.target.value)} placeholder="Oyun stili (örn: DMR, Assault, Support)" />
        <textarea className={inputClass} rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Forum biyografisi" />
        <textarea className={inputClass} rows={3} value={signature} onChange={(e) => setSignature(e.target.value)} placeholder="Mesajlarının altında görünecek imza" />
        <Button type="submit" disabled={busy}>{busy ? "Kaydediliyor..." : "Forum Profilini Kaydet"}</Button>
      </form>
    </Card>
  );
}
