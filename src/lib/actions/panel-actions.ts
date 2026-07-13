/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Panel server action'ları — profil, başvuru, sohbet.
 */

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasLevel } from "@/lib/roles";
import type { ActionResult } from "@/lib/actions/auth-actions";

const profileSchema = z.object({
  callsign: z
    .string()
    .min(2, "Callsign en az 2 karakter")
    .max(20, "Callsign en fazla 20 karakter")
    .regex(/^[a-zA-Z0-9_-]+$/, "Sadece harf, rakam, - ve _")
    .or(z.literal("")),
  region: z.enum(["Marmara", "Çanakkale", "Antalya", ""]),
});

export async function updateProfile(formData: {
  callsign: string;
  region: string;
}): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Oturum yok. [FRB-AUTH-101]" };

  const parsed = profileSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const callsign = parsed.data.callsign || null;
  if (callsign) {
    const taken = await prisma.user.findFirst({
      where: { callsign, NOT: { id: session.user.id } },
    });
    if (taken) return { ok: false, error: "Bu callsign alınmış. [FRB-DB-202]" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { callsign, region: parsed.data.region || null },
  });

  revalidatePath("/panel");
  revalidatePath("/uye");
  revalidatePath("/uye/profil");
  return { ok: true, message: "Profil güncellendi." };
}

const applicationSchema = z.object({
  region: z.enum(["Marmara", "Çanakkale", "Antalya"]),
  experience: z.string().min(10, "Deneyimini biraz daha anlat").max(2000),
  motivation: z.string().min(10, "Motivasyonunu biraz daha anlat").max(2000),
});

export async function submitApplication(formData: {
  region: string;
  experience: string;
  motivation: string;
}): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Oturum yok. [FRB-AUTH-101]" };

  if (hasLevel(session.user.role, 3)) {
    return { ok: false, error: "Zaten takım oyuncususun. [FRB-PANEL-500]" };
  }

  const parsed = applicationSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const pending = await prisma.application.findFirst({
    where: { userId: session.user.id, status: "PENDING" },
  });
  if (pending) {
    return { ok: false, error: "Bekleyen bir başvurun zaten var. [FRB-DB-202]" };
  }

  await prisma.application.create({
    data: { userId: session.user.id, ...parsed.data },
  });

  revalidatePath("/panel/basvuru");
  revalidatePath("/uye/basvuru");
  revalidatePath("/uye");
  return { ok: true, message: "Başvurun alındı! Yönetim inceleyip dönüş yapacak." };
}

const chatSchema = z.object({
  body: z.string().min(1).max(500, "Mesaj en fazla 500 karakter"),
});

export async function sendChatMessage(formData: {
  body: string;
}): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Oturum yok. [FRB-AUTH-101]" };
  if (!hasLevel(session.user.role, 3)) {
    return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };
  }

  const parsed = chatSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  await prisma.chatMessage.create({
    data: { body: parsed.data.body.trim(), authorId: session.user.id },
  });

  revalidatePath("/panel/sohbet");
  revalidatePath("/takim/sohbet");
  return { ok: true };
}
