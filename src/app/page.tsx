/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PhotoSlider from "@/components/effects/PhotoSlider";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SITE, FIELDS, TEAM_REGIONS } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ── Hero: dönen takım fotoğrafları ── */}
      <section className="relative -mt-16 flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16 text-center">
        <PhotoSlider />

        <Container>
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <Badge tone="frost">{SITE.regions.join(" · ")}</Badge>
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
              className="mx-auto mt-6 max-w-2xl text-lg text-snow-300/85"
            >
              {SITE.slogan} Çok şehirli airsoft takımı — kendi
              sahalarımızda, kendi kurallarımızla.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/iletisim">
                <Button size="lg">Takıma Katıl</Button>
              </Link>
              <Link href="/hakkimizda">
                <Button size="lg" variant="outline">
                  Bizi Tanı
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll göstergesi */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 text-snow-300/50"
        >
          ↓
        </motion.div>
      </section>

      {/* ── Bölgeler ── */}
      <section className="py-24">
        <Container>
          <Reveal className="text-center">
            <Badge tone="gold">Üç Bölge, Tek Takım</Badge>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-wide text-snow-100 sm:text-4xl">
              Nerelerdeyiz?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {TEAM_REGIONS.map((region, i) => (
              <Reveal key={region.name} delay={i * 0.12}>
                <Card className="h-full text-center">
                  <h3 className="font-display text-xl text-frost-ice">
                    {region.name}
                  </h3>
                  <p className="mt-3 text-sm text-snow-300/70">
                    {region.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Sahalar ── */}
      <section className="py-24">
        <Container>
          <Reveal className="text-center">
            <Badge tone="green">Antalya</Badge>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-wide text-snow-100 sm:text-4xl">
              Kendi Sahalarımız
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-snow-300/70">
              İki farklı muharebe ortamı, iki farklı meydan okuma.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FIELDS.map((field, i) => (
              <Reveal key={field.slug} delay={i * 0.15}>
                <Card className="h-full">
                  <Badge tone="frost">{field.type}</Badge>
                  <h3 className="font-display mt-4 text-2xl text-snow-100">
                    {field.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-snow-300/70">
                    {field.description}
                  </p>
                  <Link
                    href={`/sahalar#${field.slug}`}
                    className="mt-5 inline-block text-sm font-medium text-frost-ice hover:text-frost-teal"
                  >
                    Sahayı incele →
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <Container>
          <Reveal>
            <Card className="border-frost-deep/40 bg-gradient-to-br from-night-900 to-night-800/60 py-12 text-center">
              <h2 className="font-display text-3xl font-bold tracking-wide text-snow-100">
                Safları Sıklaştır
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-snow-300/75">
                İster tecrübeli operatör ol, ister bu dünyaya yeni adım at —
                The Nordians&apos;ta sana da yer var.
              </p>
              <div className="mt-8">
                <Link href="/iletisim">
                  <Button size="lg">Başvur</Button>
                </Link>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
