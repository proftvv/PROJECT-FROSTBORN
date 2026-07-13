"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PhotoSlider from "@/components/effects/PhotoSlider";
import Container from "@/components/ui/Container";
import RuneLabel from "@/components/ui/RuneLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SITE, TEAM_VALUES } from "@/lib/site-data";

type Slide = { src: string; alt: string };

export default function HomePageClient({ slides }: { slides: Slide[] }) {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative -mt-16 flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16 text-center">
        <PhotoSlider slides={slides} />
        <Container>
          <RuneLabel>{SITE.regions.join(" · ")}</RuneLabel>
          <h1 className="font-display mt-8 bg-gradient-to-b from-snow-100 via-snow-100 to-frost-ice/70 bg-clip-text text-5xl tracking-[0.12em] text-transparent sm:text-7xl">
            THE NORDIANS
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-snow-300/85">
            {SITE.slogan} Takim tanitimi, ekip profilleri ve kurallar tek bir resmi web sitesinde.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/hakkimizda"><Button size="lg">Takimi Tani</Button></Link>
            <Link href="/takimimiz"><Button size="lg" variant="outline">Kadroyu Gor</Button></Link>
            <Link href="/kurallarimiz"><Button size="lg" variant="ghost">Kurallarimiz</Button></Link>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {TEAM_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <h3 className="font-display text-xl text-frost-ice">{value.title}</h3>
                  <p className="mt-3 text-sm text-snow-300/70">{value.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
