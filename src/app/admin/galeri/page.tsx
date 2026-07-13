/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Image from "next/image";
import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import GalleryForm from "@/components/panel/admin/GalleryForm";
import Card from "@/components/ui/Card";

export const metadata = { title: "Admin Galeri" };

export default async function AdminGalleryPage() {
  await requireLevel(4);
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
    include: { author: { select: { name: true, callsign: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Galeri Yonetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Public galeride gorunecek gorselleri ekle.</p>
      </div>
      <GalleryForm />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <h2 className="font-display mt-4 text-lg text-snow-100">{item.title}</h2>
            {item.description && <p className="mt-2 text-sm text-snow-300/70">{item.description}</p>}
            <p className="mt-3 text-xs text-snow-300/50">{item.author.callsign ?? item.author.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
