/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasLevel, ROLE_LEVELS } from "@/lib/roles";
import { ensureForumCategories } from "@/lib/forum";
import type { ActionResult } from "@/lib/actions/auth-actions";
import type { ContentType, RsvpStatus } from "@prisma/client";

async function requireSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

const topicSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(4, "Başlık en az 4 karakter").max(140),
  body: z.string().min(10, "Konu içeriği çok kısa").max(6000),
});

export async function createForumTopic(formData: {
  categoryId: string;
  title: string;
  body: string;
}): Promise<ActionResult & { topicId?: string }> {
  const user = await requireSessionUser();
  if (!user) return { ok: false, error: "Oturum yok. [FRB-AUTH-101]" };

  await ensureForumCategories();
  const parsed = topicSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const category = await prisma.forumCategory.findUnique({ where: { id: parsed.data.categoryId } });
  if (!category) return { ok: false, error: "Kategori bulunamadı. [FRB-DB-201]" };
  if (!hasLevel(user.role, category.minLevel)) {
    return { ok: false, error: "Bu kategoriye erişim yok. [FRB-AUTH-103]" };
  }

  const topic = await prisma.forumTopic.create({
    data: {
      categoryId: category.id,
      authorId: user.id,
      title: parsed.data.title.trim(),
      body: parsed.data.body.trim(),
    },
  });

  revalidatePath("/panel/forum");
  revalidatePath(`/panel/forum/${category.id}`);
  return { ok: true, message: "Konu açıldı.", topicId: topic.id };
}

const postSchema = z.object({
  topicId: z.string().min(1),
  body: z.string().min(2, "Yanıt çok kısa").max(4000),
});

export async function createForumPost(formData: {
  topicId: string;
  body: string;
}): Promise<ActionResult> {
  const user = await requireSessionUser();
  if (!user) return { ok: false, error: "Oturum yok. [FRB-AUTH-101]" };

  const parsed = postSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const topic = await prisma.forumTopic.findUnique({
    where: { id: parsed.data.topicId },
    include: { category: true },
  });
  if (!topic) return { ok: false, error: "Konu bulunamadı. [FRB-DB-201]" };
  if (topic.locked) return { ok: false, error: "Konu kilitli. [FRB-FORUM-700]" };
  if (!hasLevel(user.role, topic.category.minLevel)) {
    return { ok: false, error: "Bu konuya erişim yok. [FRB-AUTH-103]" };
  }

  await prisma.forumPost.create({
    data: { topicId: topic.id, authorId: user.id, body: parsed.data.body.trim() },
  });

  revalidatePath(`/panel/forum/konu/${topic.id}`);
  return { ok: true, message: "Yanıt eklendi." };
}

const rsvpSchema = z.object({
  eventId: z.string().min(1),
  status: z.enum(["GOING", "MAYBE", "DECLINED"] satisfies [RsvpStatus, ...RsvpStatus[]]),
  note: z.string().max(300).optional().default(""),
});

export async function respondToEvent(formData: {
  eventId: string;
  status: RsvpStatus;
  note?: string;
}): Promise<ActionResult> {
  const user = await requireSessionUser();
  if (!user) return { ok: false, error: "Oturum yok. [FRB-AUTH-101]" };

  const parsed = rsvpSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const event = await prisma.event.findUnique({ where: { id: parsed.data.eventId } });
  if (!event) return { ok: false, error: "Etkinlik bulunamadı. [FRB-DB-201]" };

  await prisma.eventRsvp.upsert({
    where: { eventId_userId: { eventId: event.id, userId: user.id } },
    create: { eventId: event.id, userId: user.id, status: parsed.data.status, note: parsed.data.note || null },
    update: { status: parsed.data.status, note: parsed.data.note || null },
  });

  revalidatePath("/panel/etkinlikler");
  return { ok: true, message: "Katılım durumun kaydedildi." };
}

const eventSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(5).max(4000),
  location: z.string().min(2).max(140),
  startsAt: z.string().min(1),
  endsAt: z.string().optional().default(""),
});

export async function createEvent(formData: {
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt?: string;
}): Promise<ActionResult> {
  const user = await requireSessionUser();
  if (!user || !hasLevel(user.role, 4)) {
    return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };
  }
  const parsed = eventSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  await prisma.event.create({
    data: {
      authorId: user.id,
      title: parsed.data.title.trim(),
      description: parsed.data.description.trim(),
      location: parsed.data.location.trim(),
      startsAt: new Date(parsed.data.startsAt),
      endsAt: parsed.data.endsAt ? new Date(parsed.data.endsAt) : null,
    },
  });

  revalidatePath("/panel/etkinlikler");
  return { ok: true, message: "Etkinlik oluşturuldu." };
}

const gallerySchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(500).optional().default(""),
  imageUrl: z.string().url("Geçerli bir görsel bağlantısı gir"),
});

export async function createGalleryItem(formData: {
  title: string;
  description?: string;
  imageUrl: string;
}): Promise<ActionResult> {
  const user = await requireSessionUser();
  if (!user || !hasLevel(user.role, 4)) {
    return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };
  }
  const parsed = gallerySchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  await prisma.galleryItem.create({
    data: {
      authorId: user.id,
      title: parsed.data.title.trim(),
      description: parsed.data.description?.trim() || null,
      imageUrl: parsed.data.imageUrl.trim(),
    },
  });

  revalidatePath("/galeri");
  revalidatePath("/panel/admin/galeri");
  return { ok: true, message: "Galeri görseli eklendi." };
}

export async function getVisibleForumCategories(roleLevel: number) {
  await ensureForumCategories();
  return prisma.forumCategory.findMany({
    where: { minLevel: { lte: roleLevel } },
    orderBy: { minLevel: "asc" },
  });
}

