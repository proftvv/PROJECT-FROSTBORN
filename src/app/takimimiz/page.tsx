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
import { TEAM_REGIONS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Takımımız",
  description:
    "The Nordians'ın bölge yapılanması — Marmara, Çanakkale ve Antalya ekipleri.",
};

export default function TeamPage() {
  return (
    <main className="flex-1">
      <PageHero
        badge="Üç Bölge, Tek Bayrak"
        title="TAKIMIMIZ"
        description="Farklı şehirler, aynı disiplin. Bölge ekiplerimizle tanışın."
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {TEAM_REGIONS.map((region, i) => (
              <Reveal key={region.name} delay={i * 0.12}>
                <Card className="h-full text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-frost-deep/40 bg-night-800/60">
                    <span className="font-display text-2xl text-frost-ice">
                      {region.name[0]}
                    </span>
                  </div>
                  <h2 className="font-display mt-5 text-2xl text-snow-100">
                    {region.name}
                  </h2>
                  <p className="mt-3 text-sm text-snow-300/70">
                    {region.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 text-center">
            <RuneLabel>Yakında</RuneLabel>
            <p className="mx-auto mt-6 max-w-xl text-sm text-snow-300/60">
              Oyuncu kartları ve kadro detayları çok yakında burada olacak.
              Takım üyeleri, callsign&apos;ları ve uzmanlık alanlarıyla
              tanıtılacak.
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
