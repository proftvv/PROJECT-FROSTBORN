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

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/panel-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function ProfileForm({
  initialCallsign,
  initialRegion,
}: {
  initialCallsign: string;
  initialRegion: string;
}) {
  const router = useRouter();
  const [callsign, setCallsign] = useState(initialCallsign);
  const [region, setRegion] = useState(initialRegion);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const res = await updateProfile({ callsign, region });
    setLoading(false);
    setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "") : (res.error ?? "") });
    if (res.ok) router.refresh();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        {msg && (
          <p
            className={`rounded-lg px-4 py-2.5 text-sm ${
              msg.ok
                ? "bg-aurora-green/10 text-aurora-green"
                : "bg-aurora-red/10 text-aurora-red"
            }`}
          >
            {msg.text}
          </p>
        )}

        <div>
          <label htmlFor="callsign" className="mb-1.5 block text-sm text-snow-300/80">
            Callsign
          </label>
          <input
            id="callsign"
            value={callsign}
            onChange={(e) => setCallsign(e.target.value)}
            className={inputClass}
            placeholder="Örn: Fenrir"
          />
        </div>

        <div>
          <label htmlFor="region" className="mb-1.5 block text-sm text-snow-300/80">
            Bölge
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={inputClass}
          >
            <option value="">Seçilmedi</option>
            <option value="Marmara">Marmara</option>
            <option value="Çanakkale">Çanakkale</option>
            <option value="Antalya">Antalya</option>
          </select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </form>
    </Card>
  );
}
