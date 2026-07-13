/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Olusturulma   : 2026-07-11
 * Son Guncelleme: 2026-07-11
 * Dosya Surumu  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * MIMIR — developer paneli server action'lari.
 */

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import type { ActionResult } from "@/lib/actions/auth-actions";

async function requireDeveloper() {
  const session = await auth();
  if (!session?.user || session.user.role !== "DEVELOPER") return null;
  return session.user;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const fieldSchema = z.object({
  name: z.string().min(3).max(120),
  type: z.string().min(3).max(120),
  location: z.string().min(2).max(120),
  description: z.string().min(10).max(3000),
});

export async function createGameField(formData: {
  name: string;
  type: string;
  location: string;
  description: string;
}): Promise<ActionResult> {
  const dev = await requireDeveloper();
  if (!dev) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const parsed = fieldSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const baseSlug = toSlug(parsed.data.name);
  const existingCount = await prisma.gameField.count({
    where: { slug: { startsWith: baseSlug } },
  });
  const slug = existingCount === 0 ? baseSlug : `${baseSlug}-${existingCount + 1}`;

  await prisma.gameField.create({
    data: {
      slug,
      name: parsed.data.name.trim(),
      type: parsed.data.type.trim(),
      location: parsed.data.location.trim(),
      description: parsed.data.description.trim(),
      authorId: dev.id,
    },
  });

  await logAudit(dev.id, dev.callsign ?? dev.name, "DEV_FIELD_CREATE", parsed.data.name.trim());

  revalidatePath("/sahalar");
  revalidatePath("/");
  revalidatePath("/developer/sahalar");
  return { ok: true, message: "Saha eklendi." };
}

export async function deleteGameField(formData: { fieldId: string }): Promise<ActionResult> {
  const dev = await requireDeveloper();
  if (!dev) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const field = await prisma.gameField.findUnique({ where: { id: formData.fieldId } });
  if (!field) return { ok: false, error: "Saha bulunamadi. [FRB-DB-201]" };

  await prisma.gameField.delete({ where: { id: field.id } });
  await logAudit(dev.id, dev.callsign ?? dev.name, "DEV_FIELD_DELETE", field.name);

  revalidatePath("/sahalar");
  revalidatePath("/");
  revalidatePath("/developer/sahalar");
  return { ok: true, message: "Saha kaldirildi." };
}

const fieldPhotoSchema = z.object({
  fieldId: z.string().min(1),
  imageUrl: z.string().url("Gecerli bir gorsel baglantisi gir"),
  caption: z.string().max(160).optional().default(""),
});

export async function addGameFieldPhoto(formData: {
  fieldId: string;
  imageUrl: string;
  caption?: string;
}): Promise<ActionResult> {
  const dev = await requireDeveloper();
  if (!dev) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const parsed = fieldPhotoSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const field = await prisma.gameField.findUnique({ where: { id: parsed.data.fieldId } });
  if (!field) return { ok: false, error: "Saha bulunamadi. [FRB-DB-201]" };

  await prisma.gameFieldPhoto.create({
    data: {
      fieldId: parsed.data.fieldId,
      imageUrl: parsed.data.imageUrl.trim(),
      caption: parsed.data.caption?.trim() || null,
      authorId: dev.id,
    },
  });

  await logAudit(dev.id, dev.callsign ?? dev.name, "DEV_FIELD_PHOTO_ADD", field.name);

  revalidatePath("/sahalar");
  revalidatePath("/developer/sahalar");
  return { ok: true, message: "Saha fotografi eklendi." };
}

export async function deleteGameFieldPhoto(formData: { photoId: string }): Promise<ActionResult> {
  const dev = await requireDeveloper();
  if (!dev) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const photo = await prisma.gameFieldPhoto.findUnique({
    where: { id: formData.photoId },
    include: { field: true },
  });
  if (!photo) return { ok: false, error: "Fotograf bulunamadi. [FRB-DB-201]" };

  await prisma.gameFieldPhoto.delete({ where: { id: photo.id } });
  await logAudit(dev.id, dev.callsign ?? dev.name, "DEV_FIELD_PHOTO_DELETE", photo.field.name);

  revalidatePath("/sahalar");
  revalidatePath("/developer/sahalar");
  return { ok: true, message: "Saha fotografi silindi." };
}

const heroSlideSchema = z.object({
  imageUrl: z.string().url("Gecerli bir gorsel baglantisi gir"),
  alt: z.string().min(3).max(140),
  order: z.coerce.number().int().min(0).max(999),
});

export async function createHeroSlide(formData: {
  imageUrl: string;
  alt: string;
  order: number;
}): Promise<ActionResult> {
  const dev = await requireDeveloper();
  if (!dev) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const parsed = heroSlideSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  await prisma.heroSlide.create({
    data: {
      imageUrl: parsed.data.imageUrl.trim(),
      alt: parsed.data.alt.trim(),
      order: parsed.data.order,
      authorId: dev.id,
    },
  });

  await logAudit(dev.id, dev.callsign ?? dev.name, "DEV_HERO_SLIDE_CREATE", parsed.data.alt.trim());

  revalidatePath("/");
  revalidatePath("/developer/arka-plan");
  return { ok: true, message: "Arka plan slaydi eklendi." };
}

export async function deleteHeroSlide(formData: { slideId: string }): Promise<ActionResult> {
  const dev = await requireDeveloper();
  if (!dev) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const slide = await prisma.heroSlide.findUnique({ where: { id: formData.slideId } });
  if (!slide) return { ok: false, error: "Slayt bulunamadi. [FRB-DB-201]" };

  await prisma.heroSlide.delete({ where: { id: slide.id } });
  await logAudit(dev.id, dev.callsign ?? dev.name, "DEV_HERO_SLIDE_DELETE", slide.alt);

  revalidatePath("/");
  revalidatePath("/developer/arka-plan");
  return { ok: true, message: "Arka plan slaydi silindi." };
}
