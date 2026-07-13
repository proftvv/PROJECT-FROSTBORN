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
import { createHeroSlide, deleteHeroSlide } from "@/lib/actions/developer-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

type Slide = {
  id: string;
  imageUrl: string;
  alt: string;
  order: number;
  isActive: boolean;
};

export default function HeroSlideManager({ slides }: { slides: Slide[] }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [order, setOrder] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await createHeroSlide({ imageUrl, alt, order });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? res.message ?? "" : res.error ?? "" });
    if (res.ok) {
      setImageUrl("");
      setAlt("");
      setOrder(0);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg text-snow-100">Anasayfa Arka Plan Slaydi</h2>
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          {msg && <p className={`rounded-lg px-4 py-2.5 text-sm ${msg.ok ? "bg-aurora-green/10 text-aurora-green" : "bg-aurora-red/10 text-aurora-red"}`}>{msg.text}</p>}
          <input className={inputClass} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://... gorsel baglantisi" />
          <input className={inputClass} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alternatif metin" />
          <input className={inputClass} type="number" min={0} value={order} onChange={(e) => setOrder(Number(e.target.value))} placeholder="Sira" />
          <Button type="submit" disabled={busy}>{busy ? "Kaydediliyor..." : "Slayt Ekle"}</Button>
        </form>
      </Card>

      <div className="space-y-3">
        {slides.map((slide) => (
          <Card key={slide.id}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-snow-100">{slide.alt}</p>
                <p className="truncate text-xs text-snow-300/60">{slide.imageUrl}</p>
                <p className="mt-1 text-xs text-frost-ice/80">Sira: {slide.order}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={async () => {
                  const res = await deleteHeroSlide({ slideId: slide.id });
                  setMsg({ ok: res.ok, text: res.ok ? res.message ?? "" : res.error ?? "" });
                  if (res.ok) router.refresh();
                }}
              >
                Sil
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
