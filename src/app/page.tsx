/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 4
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import HomePageClient from "@/components/home/HomePageClient";
import { HERO_SLIDES } from "@/lib/site-data";

export default async function Home() {
  return <HomePageClient slides={HERO_SLIDES} />;
}
