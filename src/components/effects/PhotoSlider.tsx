/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Arka planda crossfade ile dönen takım fotoğrafları.
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_SLIDES } from "@/lib/site-data";

const INTERVAL_MS = 6000;

export default function PhotoSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6 }, scale: { duration: 7 } }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[index].src}
            alt={HERO_SLIDES[index].alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Okunabilirlik için karartma katmanları */}
      <div className="absolute inset-0 bg-night-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950/70" />
    </div>
  );
}
