/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group/card relative overflow-hidden rounded-2xl bg-gradient-to-b from-night-800/40 to-night-900/20 p-6 backdrop-blur-sm transition-all duration-500 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-frost-ice/40 before:to-transparent hover:from-night-800/60 hover:shadow-[0_8px_40px_-12px_rgba(136,192,208,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}
