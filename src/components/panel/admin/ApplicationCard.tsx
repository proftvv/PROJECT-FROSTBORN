/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Başvuru kartı — inceleme ve karar formu.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { decideApplication } from "@/lib/actions/admin-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ApplicationData {
  id: string;
  applicantName: string;
  applicantEmail: string;
  region: string;
  experience: string;
  motivation: string;
  createdAt: string;
}

export default function ApplicationCard({ app }: { app: ApplicationData }) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setMsg(null);
    const res = await decideApplication({
      applicationId: app.id,
      approve,
      reply,
    });
    setBusy(false);
    setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "") : (res.error ?? "") });
    if (res.ok) router.refresh();
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg text-snow-100">
            {app.applicantName}
          </h2>
          <p className="text-xs text-snow-300/50">
            {app.applicantEmail} · {app.region} · {app.createdAt}
          </p>
        </div>
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-aurora-gold">
          Bekliyor
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">
            Deneyim
          </p>
          <p className="mt-1 whitespace-pre-line text-snow-300/80">
            {app.experience}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">
            Motivasyon
          </p>
          <p className="mt-1 whitespace-pre-line text-snow-300/80">
            {app.motivation}
          </p>
        </div>
      </div>

      {msg && (
        <p
          className={`mt-4 rounded-lg px-4 py-2.5 text-sm ${
            msg.ok
              ? "bg-aurora-green/10 text-aurora-green"
              : "bg-aurora-red/10 text-aurora-red"
          }`}
        >
          {msg.text}
        </p>
      )}

      <div className="mt-4 space-y-3">
        <textarea
          rows={2}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60"
          placeholder="Başvurana iletilecek yanıt (e-posta ile gönderilir)..."
        />
        <div className="flex gap-3">
          <Button
            size="sm"
            disabled={busy || reply.trim().length < 2}
            onClick={() => decide(true)}
          >
            Onayla — Nordian Yap
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={busy || reply.trim().length < 2}
            onClick={() => decide(false)}
            className="border-aurora-red/40 text-aurora-red hover:bg-aurora-red/10 hover:border-aurora-red"
          >
            Reddet
          </Button>
        </div>
      </div>
    </Card>
  );
}
