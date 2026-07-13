/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Olusturulma   : 2026-07-11
 * Son Guncelleme: 2026-07-11
 * Dosya Surumu  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PhotoSlider from "@/components/effects/PhotoSlider";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import RuneLabel from "@/components/ui/RuneLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SITE, TEAM_REGIONS } from "@/lib/site-data";

type Slide = { src: string; alt: string };
type HomeField = { slug: string; name: string; type: string; description: string };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function HomePageClient({
  slides,
  fields,
}: {
  slides: Slide[];
  fields: HomeField[];
}) {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative -mt-16 flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16 text-center">
        <PhotoSlider slides={slides} />

        <Container>
          <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.15 }}>
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <RuneLabel>{SITE.regions.join(" · ")}</RuneLabel>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display mt-8 bg-gradient-to-b from-snow-100 via-snow-100 to-frost-ice/70 bg-clip-text text-5xl tracking-[0.12em] text-transparent sm:text-7xl"
            >
              THE NORDIANS
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-snow-300/85"
            >
              {SITE.slogan} Cok sehirli airsoft takimi - kendi sahalarimizda, kendi kurallarimizla.
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/iletisim"><Button size="lg">Takima Katil</Button></Link>
              <Link href="/hakkimizda"><Button size="lg" variant="outline">Bizi Tani</Button></Link>
            </motion.div>
          </motion.div>
        </Container>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute bottom-8 text-snow-300/50">
          ↓
        </motion.div>
      </section>

      <section className="py-24">
        <Container>
          <Reveal className="text-center">
            <RuneLabel>Uc Bolge, Tek Takim</RuneLabel>
            <h2 className="font-display mt-6 text-3xl tracking-wide text-snow-100 sm:text-4xl">Nerelerdeyiz?</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {TEAM_REGIONS.map((region, i) => (
              <Reveal key={region.name} delay={i * 0.12}>
                <Card className="h-full text-center">
                  <h3 className="font-display text-xl text-frost-ice">{region.name}</h3>
                  <p className="mt-3 text-sm text-snow-300/70">{region.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal className="text-center">
            <RuneLabel>Antalya</RuneLabel>
            <h2 className="font-display mt-6 text-3xl tracking-wide text-snow-100 sm:text-4xl">Kendi Sahalarimiz</h2>
            <p className="mx-auto mt-4 max-w-xl text-snow-300/70">Iki farkli muharebe ortami, iki farkli meydan okuma.</p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {fields.map((field, i) => (
              <Reveal key={field.slug} delay={i * 0.15}>
                <Card className="h-full">
                  <span className="text-xs uppercase tracking-[0.25em] text-frost-ice/80">{field.type}</span>
                  <h3 className="font-display mt-4 text-2xl text-snow-100">{field.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-snow-300/70">{field.description}</p>
                  <Link href={`/sahalar#${field.slug}`} className="mt-5 inline-block text-sm font-medium text-frost-ice hover:text-frost-teal">
                    Sahayi incele -&gt;
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <Card className="border-none py-12 text-center">
              <h2 className="font-display text-3xl tracking-wide text-snow-100">Saflari Siklastir</h2>
              <p className="mx-auto mt-4 max-w-xl text-snow-300/75">
                Ister tecrubeli operator ol, ister bu dunyaya yeni adim at - The Nordians'ta sana da yer var.
              </p>
              <div className="mt-8"><Link href="/iletisim"><Button size="lg">Basvur</Button></Link></div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
