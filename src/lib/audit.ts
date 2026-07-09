/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Audit log helper — admin işlemlerini merkezi kaydeder.
 */

import { prisma } from "@/lib/prisma";

export async function logAudit(
  actorId: string | null,
  actorName: string,
  action: string,
  detail: string,
) {
  await prisma.auditLog.create({
    data: { actorId, actorName, action, detail },
  });
}
