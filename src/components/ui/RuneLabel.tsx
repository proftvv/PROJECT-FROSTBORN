/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Kutu yerine iki yana açılan çizgili, rün süslemeli
 * animasyonlu bölüm etiketi.
 */

"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function RuneLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.1 }}
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <motion.span
        variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-px w-10 origin-right bg-gradient-to-l from-frost-ice/80 to-transparent sm:w-16"
      />
      <motion.span
        variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7 }}
        className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.35em] text-frost-ice"
      >
        {children}
      </motion.span>
      <motion.span
        variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-px w-10 origin-left bg-gradient-to-r from-frost-ice/80 to-transparent sm:w-16"
      />
    </motion.div>
  );
}
