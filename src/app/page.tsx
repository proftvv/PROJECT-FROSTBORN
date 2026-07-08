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
import SmoothScroll from "@/components/providers/SmoothScroll";
import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <SmoothScroll>
      <AuroraBackground />

      <main className="flex flex-1 flex-col">
        {/* ── Hero ── */}
        <section className="flex min-h-screen flex-col items-center justify-center text-center">
          <Container>
            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.15 }}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
                <Badge tone="frost">Marmara · Çanakkale · Antalya</Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="font-display mt-6 text-5xl font-bold tracking-wider text-snow-100 sm:text-7xl"
              >
                THE NORDIANS
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mx-auto mt-6 max-w-2xl text-lg text-snow-300/80"
              >
                Kuzeyden doğanlar, sahada birleşir. Çok şehirli airsoft
                takımı — kendi sahalarımızda, kendi kurallarımızla.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <Button size="lg">Takıma Katıl</Button>
                <Button size="lg" variant="outline">
                  Bizi Tanı
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* ── Kuruluş durumu ── */}
        <section className="pb-24">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid gap-6 sm:grid-cols-3"
            >
              <Card>
                <Badge tone="green">Aktif</Badge>
                <h3 className="font-display mt-4 text-xl text-snow-100">
                  BIFROST
                </h3>
                <p className="mt-2 text-sm text-snow-300/70">
                  Altyapı ve tasarım sistemi kuruldu. Köprü inşa edildi.
                </p>
              </Card>
              <Card>
                <Badge tone="gold">Sırada</Badge>
                <h3 className="font-display mt-4 text-xl text-snow-100">
                  MIDGARD
                </h3>
                <p className="mt-2 text-sm text-snow-300/70">
                  Vitrin sayfaları yolda: takım, sahalar, galeri.
                </p>
              </Card>
              <Card>
                <Badge tone="purple">Planlandı</Badge>
                <h3 className="font-display mt-4 text-xl text-snow-100">
                  HEIMDALL
                </h3>
                <p className="mt-2 text-sm text-snow-300/70">
                  Kapılar yakında açılıyor: üyelik ve giriş sistemi.
                </p>
              </Card>
            </motion.div>
          </Container>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-night-800 py-8 text-center text-sm text-snow-300/50">
          <Container>
            The Nordians © {new Date().getFullYear()} — dev By Proftvv
          </Container>
        </footer>
      </main>
    </SmoothScroll>
  );
}
