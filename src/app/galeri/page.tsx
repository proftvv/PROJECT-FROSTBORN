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

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import { GALLERY } from "@/lib/site-data";

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main className="flex-1">
      <PageHero
        badge="Sahadan Kareler"
        title="GALERİ"
        description="Operasyonlardan, eğitimlerden ve takım günlerinden görüntüler."
      />

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((photo, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <button
                  onClick={() => setSelected(i)}
                  className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border border-night-700/60"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-night-950/0 transition-colors duration-300 group-hover:bg-night-950/30" />
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night-950/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY[selected].src}
                alt={GALLERY[selected].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </motion.div>

            <button
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 text-3xl text-snow-100/80 hover:text-snow-100"
              aria-label="Kapat"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
