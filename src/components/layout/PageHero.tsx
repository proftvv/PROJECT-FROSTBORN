/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Sayfa üst başlık bölümü (iç sayfalar için).
 */

"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import RuneLabel from "@/components/ui/RuneLabel";

export default function PageHero({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <section className="py-20 text-center sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <RuneLabel>{badge}</RuneLabel>
          <h1 className="font-display mt-6 text-4xl tracking-wider text-snow-100 sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-snow-300/75">
            {description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
