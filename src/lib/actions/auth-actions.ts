/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Kayıt ve e-posta doğrulama server action'ları.
 */

"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";

export interface ActionResult {
  ok: boolean;
  error?: string;
  message?: string;
}

const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı").max(60),
  email: z.string().email("Geçerli bir e-posta gir"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı").max(100),
});

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
}): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message + " [FRB-API-300]",
    };
  }

  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase().trim();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "Bu e-posta zaten kayıtlı. [FRB-DB-202]" };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  const code = generateCode();
  await prisma.verificationCode.create({
    data: {
      userId: user.id,
      code,
      purpose: "EMAIL_VERIFY",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const mail = await sendVerificationEmail(email, name, code);
  if (!mail.ok) {
    return { ok: false, error: `E-posta gönderilemedi. [${mail.error}]` };
  }

  return {
    ok: true,
    message: "Kayıt alındı! E-postana gelen 6 haneli kodu gir.",
  };
}

export async function verifyEmail(formData: {
  email: string;
  code: string;
}): Promise<ActionResult> {
  const email = formData.email.toLowerCase().trim();
  const code = formData.code.trim();

  if (!/^\d{6}$/.test(code)) {
    return { ok: false, error: "Kod 6 haneli olmalı. [FRB-API-300]" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { ok: false, error: "Kayıt bulunamadı. [FRB-DB-201]" };
  }
  if (user.emailVerified) {
    return { ok: true, message: "E-posta zaten doğrulanmış. Giriş yapabilirsin." };
  }

  const record = await prisma.verificationCode.findFirst({
    where: {
      userId: user.id,
      purpose: "EMAIL_VERIFY",
      code,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return { ok: false, error: "Kod hatalı veya süresi dolmuş. [FRB-AUTH-100]" };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationCode.deleteMany({
      where: { userId: user.id, purpose: "EMAIL_VERIFY" },
    }),
  ]);

  return { ok: true, message: "E-posta doğrulandı! Artık giriş yapabilirsin." };
}
