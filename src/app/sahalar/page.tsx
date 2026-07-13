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
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { FIELDS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Sahalarımız",
  description:
    "Antalya'daki sahalarımız: Meskun Mahal (CQB) ve Açık Orman Alanı.",
};

export default async function FieldsPage() {
  const dbFields = await prisma.gameField.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      photos: {
        orderBy: { createdAt: "asc" },
        select: { imageUrl: true },
      },
    },
  });

  const fields =
    dbFields.length > 0
      ? dbFields.map((field) => ({
          slug: field.slug,
          name: field.name,
          type: field.type,
          location: field.location,
          description: field.description,
          features: [
            `${field.location} operasyon alani`,
            `${field.photos.length} fotograf arsivi`,
          ],
          image: field.photos[0]?.imageUrl ?? "/photos/slide-2.svg",
        }))
      : FIELDS;

  return (
    <main className="flex-1">
      <PageHero
        badge="Antalya"
        title="SAHALARIMIZ"
        description="İki farklı muharebe ortamı — dar koridorlardan derin ormana."
      />

      <section className="pb-24">
        <Container className="space-y-16">
          {fields.map((field, i) => (
            <Reveal key={field.slug}>
              <div
                id={field.slug}
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="relative aspect-video overflow-hidden rounded-xl border border-night-700/60 [direction:ltr]">
                  <Image
                    src={field.image}
                    alt={field.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <Card className="[direction:ltr]">
                  <span className="text-xs uppercase tracking-[0.25em] text-frost-ice/80">
                    {field.type}
                  </span>
                  <h2 className="font-display mt-4 text-3xl text-snow-100">
                    {field.name}
                  </h2>
                  <p className="mt-4 leading-relaxed text-snow-300/75">
                    {field.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {field.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-snow-300/70"
                      >
                        <span className="text-frost-ice">❆</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </main>
  );
}
