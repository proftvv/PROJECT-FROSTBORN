/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import RuneLabel from "@/components/ui/RuneLabel";
import { ABOUT_PARAGRAPHS, TEAM_VALUES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "The Nordians takim detaylari, kulturu ve temel degerleri.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        badge="Hikayemiz"
        title="HAKKIMIZDA"
        description="Takimimizin kulturu, hedefi ve operasyon anlayisi."
      />

      <section className="pb-24">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="space-y-5 leading-relaxed text-snow-300/80">
              {ABOUT_PARAGRAPHS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Reveal className="text-center">
            <RuneLabel>Değerlerimiz</RuneLabel>
            <h2 className="font-display mt-6 text-3xl tracking-wide text-snow-100">
              Bizi Biz Yapanlar
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {TEAM_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <Card className="h-full">
                  <h3 className="font-display text-xl text-frost-ice">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-snow-300/70">{value.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
