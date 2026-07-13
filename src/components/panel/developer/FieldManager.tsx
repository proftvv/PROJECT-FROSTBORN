/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Olusturulma   : 2026-07-11
 * Son Guncelleme: 2026-07-11
 * Dosya Surumu  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createGameField,
  deleteGameField,
  addGameFieldPhoto,
  deleteGameFieldPhoto,
} from "@/lib/actions/developer-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

type Field = {
  id: string;
  slug: string;
  name: string;
  type: string;
  location: string;
  description: string;
  photos: { id: string; imageUrl: string; caption: string | null }[];
};

export default function FieldManager({ fields }: { fields: Field[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("Antalya");
  const [description, setDescription] = useState("");
  const [photoFieldId, setPhotoFieldId] = useState(fields[0]?.id ?? "");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const onCreateField = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await createGameField({ name, type, location, description });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? res.message ?? "" : res.error ?? "" });
    if (res.ok) {
      setName("");
      setType("");
      setDescription("");
      router.refresh();
    }
  };

  const onAddPhoto = async (e: FormEvent) => {
    e.preventDefault();
    if (!photoFieldId) return;
    setBusy(true);
    setMsg(null);
    const res = await addGameFieldPhoto({
      fieldId: photoFieldId,
      imageUrl: photoUrl,
      caption: photoCaption,
    });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? res.message ?? "" : res.error ?? "" });
    if (res.ok) {
      setPhotoUrl("");
      setPhotoCaption("");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg text-snow-100">Yeni Oyun Alani</h2>
        <form onSubmit={onCreateField} className="mt-4 space-y-4">
          {msg && (
            <p className={`rounded-lg px-4 py-2.5 text-sm ${msg.ok ? "bg-aurora-green/10 text-aurora-green" : "bg-aurora-red/10 text-aurora-red"}`}>
              {msg.text}
            </p>
          )}
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Saha adi" />
          <input className={inputClass} value={type} onChange={(e) => setType(e.target.value)} placeholder="Saha tipi (CQB / Orman vb.)" />
          <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Konum" />
          <textarea className={inputClass} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Saha aciklamasi" />
          <Button type="submit" disabled={busy}>{busy ? "Kaydediliyor..." : "Saha Ekle"}</Button>
        </form>
      </Card>

      <Card>
        <h2 className="font-display text-lg text-snow-100">Saha Fotografi Ekle</h2>
        <form onSubmit={onAddPhoto} className="mt-4 space-y-4">
          <select className={inputClass} value={photoFieldId} onChange={(e) => setPhotoFieldId(e.target.value)}>
            <option value="">Saha sec</option>
            {fields.map((field) => <option key={field.id} value={field.id}>{field.name}</option>)}
          </select>
          <input className={inputClass} value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://... fotograf baglantisi" />
          <input className={inputClass} value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} placeholder="Fotograf aciklamasi" />
          <Button type="submit" variant="outline" disabled={busy || !photoFieldId}>{busy ? "Ekleniyor..." : "Fotograf Ekle"}</Button>
        </form>
      </Card>

      <div className="space-y-4">
        {fields.map((field) => (
          <Card key={field.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-snow-100">{field.name}</h3>
                <p className="text-xs text-frost-ice/80">{field.type} · {field.location}</p>
                <p className="mt-2 text-sm text-snow-300/70">{field.description}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={async () => {
                  const res = await deleteGameField({ fieldId: field.id });
                  setMsg({ ok: res.ok, text: res.ok ? res.message ?? "" : res.error ?? "" });
                  if (res.ok) router.refresh();
                }}
              >
                Sahayi Sil
              </Button>
            </div>

            {field.photos.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {field.photos.map((photo) => (
                  <div key={photo.id} className="rounded-lg border border-night-700/60 bg-night-900/50 p-3">
                    <p className="truncate text-xs text-snow-300/70">{photo.imageUrl}</p>
                    {photo.caption && <p className="mt-1 text-xs text-frost-ice/80">{photo.caption}</p>}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={async () => {
                        const res = await deleteGameFieldPhoto({ photoId: photo.id });
                        setMsg({ ok: res.ok, text: res.ok ? res.message ?? "" : res.error ?? "" });
                        if (res.ok) router.refresh();
                      }}
                    >
                      Fotografi Kaldir
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
