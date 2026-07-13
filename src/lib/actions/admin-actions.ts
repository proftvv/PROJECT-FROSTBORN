/**
 * PROJECT FROSTBORN — The Nordians
 * Admin actions: takim uye yonetimi.
 */

"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasLevel } from "@/lib/roles";
import type { MembershipStatus, Role } from "@prisma/client";

interface ActionResult {
  ok: boolean;
  error?: string;
  message?: string;
}

async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) return null;
  if (!hasLevel(session.user.role, 4)) return null;
  return session.user;
}

function refreshAdminPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/uyeler");
  revalidatePath("/takimimiz");
}

const memberCreateSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(120),
  callsign: z.string().max(30).optional().default(""),
  region: z.string().max(80).optional().default(""),
  avatarUrl: z.string().url().or(z.literal("")),
  bio: z.string().max(2000).optional().default(""),
  weapons: z.string().max(500).optional().default(""),
  role: z.enum(["NORDIAN", "UYE", "YONETICI", "BASKAN", "BASKAN_YARDIMCISI"] satisfies [Role, ...Role[]]),
  status: z.enum(["ACTIVE", "PENDING", "SUSPENDED"] satisfies [MembershipStatus, ...MembershipStatus[]]),
});

export async function createTeamMember(formData: {
  name: string;
  email: string;
  password: string;
  callsign?: string;
  region?: string;
  avatarUrl?: string;
  bio?: string;
  weapons?: string;
  role: Role;
  status: MembershipStatus;
}): Promise<ActionResult> {
  const admin = await requireAdminSession();
  if (!admin) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const parsed = memberCreateSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { ok: false, error: "Bu e-posta zaten kayitli. [FRB-DB-202]" };

  if (parsed.data.callsign.trim()) {
    const callsignExists = await prisma.user.findFirst({
      where: { callsign: parsed.data.callsign.trim() },
    });
    if (callsignExists) return { ok: false, error: "Bu callsign zaten kullanimda. [FRB-DB-202]" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsed.data.name.trim(),
      email,
      passwordHash,
      emailVerified: new Date(),
      callsign: parsed.data.callsign.trim() || null,
      region: parsed.data.region?.trim() || null,
      avatarUrl: parsed.data.avatarUrl.trim() || null,
      bio: parsed.data.bio?.trim() || null,
      weapons: parsed.data.weapons?.trim() || null,
      role: parsed.data.role,
      status: parsed.data.status,
    },
  });

  refreshAdminPages();
  return { ok: true, message: "Takim uyesi eklendi." };
}

const memberUpdateSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(2).max(80),
  callsign: z.string().max(30).optional().default(""),
  region: z.string().max(80).optional().default(""),
  avatarUrl: z.string().url().or(z.literal("")),
  bio: z.string().max(2000).optional().default(""),
  weapons: z.string().max(500).optional().default(""),
  role: z.enum(["NORDIAN", "UYE", "YONETICI", "BASKAN", "BASKAN_YARDIMCISI"] satisfies [Role, ...Role[]]),
  status: z.enum(["ACTIVE", "PENDING", "SUSPENDED"] satisfies [MembershipStatus, ...MembershipStatus[]]),
});

export async function updateTeamMember(formData: {
  userId: string;
  name: string;
  callsign?: string;
  region?: string;
  avatarUrl?: string;
  bio?: string;
  weapons?: string;
  role: Role;
  status: MembershipStatus;
}): Promise<ActionResult> {
  const admin = await requireAdminSession();
  if (!admin) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const parsed = memberUpdateSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const target = await prisma.user.findUnique({ where: { id: parsed.data.userId } });
  if (!target) return { ok: false, error: "Kullanici bulunamadi. [FRB-DB-201]" };

  if (target.id === admin.id && parsed.data.role !== target.role) {
    return { ok: false, error: "Kendi rutbeni bu ekrandan degistiremezsin. [FRB-ADMIN-600]" };
  }

  const callsign = parsed.data.callsign.trim();
  if (callsign) {
    const callsignExists = await prisma.user.findFirst({
      where: { callsign, NOT: { id: target.id } },
    });
    if (callsignExists) return { ok: false, error: "Bu callsign zaten kullanimda. [FRB-DB-202]" };
  }

  await prisma.user.update({
    where: { id: target.id },
    data: {
      name: parsed.data.name.trim(),
      callsign: callsign || null,
      region: parsed.data.region?.trim() || null,
      avatarUrl: parsed.data.avatarUrl.trim() || null,
      bio: parsed.data.bio?.trim() || null,
      weapons: parsed.data.weapons?.trim() || null,
      role: parsed.data.role,
      status: parsed.data.status,
    },
  });

  refreshAdminPages();
  return { ok: true, message: "Takim uyesi guncellendi." };
}

export async function deleteTeamMember(formData: { userId: string }): Promise<ActionResult> {
  const admin = await requireAdminSession();
  if (!admin) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const target = await prisma.user.findUnique({ where: { id: formData.userId } });
  if (!target) return { ok: false, error: "Kullanici bulunamadi. [FRB-DB-201]" };
  if (target.id === admin.id) return { ok: false, error: "Kendi hesabini silemezsin. [FRB-ADMIN-600]" };

  await prisma.user.delete({ where: { id: target.id } });

  refreshAdminPages();
  return { ok: true, message: "Takim uyesi silindi." };
}
