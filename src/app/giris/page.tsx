/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Giriş sistemi HEIMDALL fazında aktifleşecek.
 */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Giriş",
  description: "The Nordians üye girişi.",
};

export default function LoginPage() {
  return (
    <main className="flex-1">
      <PageHero
        badge="Üye Kapısı"
        title="GİRİŞ"
        description="Heimdall kapıları henüz açmadı."
      />

      <section className="pb-24">
        <Container className="max-w-md">
          <Reveal>
            <Card className="text-center">
              <div className="font-display text-5xl">👁️</div>
              <h2 className="font-display mt-4 text-xl text-snow-100">
                Üyelik Sistemi Yakında
              </h2>
              <p className="mt-3 text-sm text-snow-300/70">
                Kayıt, giriş ve üye paneli üzerinde çalışıyoruz. O zamana
                kadar bize iletişim sayfasından ulaşabilirsin.
              </p>
              <Link href="/iletisim" className="mt-6 inline-block">
                <Button variant="outline">İletişime Geç</Button>
              </Link>
            </Card>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
