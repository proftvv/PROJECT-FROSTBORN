/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import GalleryClient from "@/components/gallery/GalleryClient";
import { prisma } from "@/lib/prisma";
import { GALLERY } from "@/lib/site-data";

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    select: { imageUrl: true, title: true },
  });

  const photos =
    items.length > 0
      ? items.map((item) => ({ src: item.imageUrl, alt: item.title }))
      : GALLERY;

  return <GalleryClient photos={photos} />;
}
