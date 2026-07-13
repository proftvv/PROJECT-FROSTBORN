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
import { prisma } from "@/lib/prisma";
import { FIELDS, HERO_SLIDES } from "@/lib/site-data";

export default async function Home() {
  const [heroSlides, gameFields] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: { imageUrl: true, alt: true },
    }),
    prisma.gameField.findMany({
      orderBy: { createdAt: "desc" },
      select: { slug: true, name: true, type: true, description: true },
    }),
  ]);

  const slides =
    heroSlides.length > 0
      ? heroSlides.map((slide) => ({ src: slide.imageUrl, alt: slide.alt }))
      : HERO_SLIDES;

  const fields =
    gameFields.length > 0
      ? gameFields.map((field) => ({
          slug: field.slug,
          name: field.name,
          type: field.type,
          description: field.description,
        }))
      : FIELDS.map((field) => ({
          slug: field.slug,
          name: field.name,
          type: field.type,
          description: field.description,
        }));

  return <HomePageClient slides={slides} fields={fields} />;
}
