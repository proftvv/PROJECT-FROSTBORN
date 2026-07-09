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

import { useState } from "react";
import { useRouter } from "next/navigation";
import { respondToEvent } from "@/lib/actions/community-actions";
import Button from "@/components/ui/Button";
import type { RsvpStatus } from "@prisma/client";

export default function EventRsvpForm({ eventId, initialStatus }: { eventId: string; initialStatus?: RsvpStatus | null }) {
  const router = useRouter();
  const [status, setStatus] = useState<RsvpStatus>(initialStatus ?? "GOING");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    const res = await respondToEvent({ eventId, status, note });
    setBusy(false);
    if (res.ok) router.refresh();
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["GOING", "MAYBE", "DECLINED"] as RsvpStatus[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatus(value)}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${status === value ? "bg-frost-deep/40 text-snow-100" : "bg-night-900/70 text-snow-300/70 hover:text-snow-100"}`}
          >
            {value === "GOING" ? "Geliyorum" : value === "MAYBE" ? "Belki" : "Gelemem"}
          </button>
        ))}
      </div>
      <input value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60" placeholder="Not (opsiyonel)" />
      <Button size="sm" onClick={submit} disabled={busy}>{busy ? "Kaydediliyor..." : "Katılımı Kaydet"}</Button>
    </div>
  );
}
