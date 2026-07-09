/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * ODIN — admin server action'ları: rol/durum yönetimi, başvuru kararı.
 */

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasLevel, canManage, assignableRoles } from "@/lib/roles";
import { sendApplicationResultEmail } from "@/lib/mail";
import type { ActionResult } from "@/lib/actions/auth-actions";
import type { Role, MembershipStatus } from "@prisma/client";

async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) return null;
  if (!hasLevel(session.user.role, 4)) return null;
  return session.user;
}

export async function updateUserRole(formData: {
  userId: string;
  role: Role;
}): Promise<ActionResult> {
  const admin = await requireAdminSession();
  if (!admin) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  if (formData.userId === admin.id) {
    return { ok: false, error: "Kendi rütbeni değiştiremezsin. [FRB-ADMIN-600]" };
  }

  const target = await prisma.user.findUnique({ where: { id: formData.userId } });
  if (!target) return { ok: false, error: "Kullanıcı bulunamadı. [FRB-DB-201]" };

  if (!canManage(admin.role, target.role)) {
    return { ok: false, error: "Bu kullanıcıyı yönetemezsin. [FRB-AUTH-103]" };
  }
  if (!assignableRoles(admin.role).includes(formData.role)) {
    return { ok: false, error: "Bu rütbeyi atayamazsın. [FRB-AUTH-103]" };
  }

  await prisma.user.update({
    where: { id: target.id },
    data: { role: formData.role },
  });

  revalidatePath("/panel/admin/uyeler");
  return { ok: true, message: "Rütbe güncellendi." };
}

export async function updateUserStatus(formData: {
  userId: string;
  status: MembershipStatus;
}): Promise<ActionResult> {
  const admin = await requireAdminSession();
  if (!admin) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  if (formData.userId === admin.id) {
    return { ok: false, error: "Kendi durumunu değiştiremezsin. [FRB-ADMIN-600]" };
  }

  const target = await prisma.user.findUnique({ where: { id: formData.userId } });
  if (!target) return { ok: false, error: "Kullanıcı bulunamadı. [FRB-DB-201]" };

  if (!canManage(admin.role, target.role)) {
    return { ok: false, error: "Bu kullanıcıyı yönetemezsin. [FRB-AUTH-103]" };
  }

  await prisma.user.update({
    where: { id: target.id },
    data: { status: formData.status },
  });

  revalidatePath("/panel/admin/uyeler");
  return { ok: true, message: "Üyelik durumu güncellendi." };
}

const decisionSchema = z.object({
  applicationId: z.string().min(1),
  approve: z.boolean(),
  reply: z.string().min(2, "Yanıt yazmalısın").max(1000),
});

export async function decideApplication(formData: {
  applicationId: string;
  approve: boolean;
  reply: string;
}): Promise<ActionResult> {
  const admin = await requireAdminSession();
  if (!admin) return { ok: false, error: "Yetkin yok. [FRB-AUTH-103]" };

  const parsed = decisionSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message + " [FRB-API-300]" };
  }

  const application = await prisma.application.findUnique({
    where: { id: parsed.data.applicationId },
    include: { user: true },
  });
  if (!application) {
    return { ok: false, error: "Başvuru bulunamadı. [FRB-DB-201]" };
  }
  if (application.status !== "PENDING") {
    return { ok: false, error: "Bu başvuru zaten yanıtlanmış. [FRB-ADMIN-600]" };
  }

  const { approve, reply } = parsed.data;

  await prisma.$transaction([
    prisma.application.update({
      where: { id: application.id },
      data: {
        status: approve ? "APPROVED" : "REJECTED",
        reply,
        repliedBy: admin.id,
      },
    }),
    ...(approve
      ? [
          prisma.user.update({
            where: { id: application.userId },
            data: { role: "NORDIAN" as Role, status: "ACTIVE" as MembershipStatus },
          }),
        ]
      : []),
  ]);

  const mail = await sendApplicationResultEmail(
    application.user.email,
    application.user.name,
    approve,
    reply,
  );

  revalidatePath("/panel/admin/basvurular");
  return {
    ok: true,
    message: approve
      ? `Başvuru onaylandı, ${application.user.name} artık Nordian.${mail.ok ? " E-posta gönderildi." : " (E-posta gönderilemedi [FRB-MAIL-400])"}`
      : `Başvuru reddedildi.${mail.ok ? " E-posta gönderildi." : " (E-posta gönderilemedi [FRB-MAIL-400])"}`,
  };
}
