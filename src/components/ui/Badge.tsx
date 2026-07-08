/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { type ReactNode } from "react";

type Tone = "frost" | "gold" | "green" | "red" | "purple";

const tones: Record<Tone, string> = {
  frost: "bg-frost-ice/15 text-frost-ice border-frost-ice/30",
  gold: "bg-aurora-gold/15 text-aurora-gold border-aurora-gold/30",
  green: "bg-aurora-green/15 text-aurora-green border-aurora-green/30",
  red: "bg-aurora-red/15 text-aurora-red border-aurora-red/30",
  purple: "bg-aurora-purple/15 text-aurora-purple border-aurora-purple/30",
};

export default function Badge({
  tone = "frost",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-medium tracking-wider uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
