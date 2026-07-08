/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Kuzey ışıkları katmanları */}
      <div className="animate-aurora absolute -top-1/4 left-1/4 h-[60vh] w-[70vw] rounded-full bg-frost-deep/25 blur-[120px]" />
      <div className="animate-aurora absolute top-1/3 -right-1/4 h-[50vh] w-[60vw] rounded-full bg-aurora-green/10 blur-[140px] [animation-delay:-5s]" />
      <div className="animate-aurora absolute -bottom-1/4 left-1/3 h-[45vh] w-[55vw] rounded-full bg-frost-ice/15 blur-[130px] [animation-delay:-9s]" />

      {/* Yıldızlar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(236,239,244,0.6) 0, transparent 100%), radial-gradient(1px 1px at 70% 15%, rgba(236,239,244,0.4) 0, transparent 100%), radial-gradient(1.5px 1.5px at 45% 60%, rgba(236,239,244,0.5) 0, transparent 100%), radial-gradient(1px 1px at 85% 45%, rgba(236,239,244,0.35) 0, transparent 100%), radial-gradient(1px 1px at 10% 75%, rgba(236,239,244,0.45) 0, transparent 100%), radial-gradient(1.5px 1.5px at 60% 85%, rgba(236,239,244,0.3) 0, transparent 100%)",
        }}
      />
    </div>
  );
}
