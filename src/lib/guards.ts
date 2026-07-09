/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Server tarafı yetki kontrolleri (RBAC guard).
 */

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { hasLevel } from "@/lib/roles";
import type { Session } from "next-auth";

/** Oturum zorunlu — yoksa /giris'e yönlendirir. */
export async function requireUser(): Promise<Session["user"]> {
  const session = await auth();
  if (!session?.user) redirect("/giris");
  return session.user;
}

/** Belirli seviye ve üstü zorunlu — yetersizse panele geri yollar. */
export async function requireLevel(
  minLevel: number,
): Promise<Session["user"]> {
  const user = await requireUser();
  if (!hasLevel(user.role, minLevel)) redirect("/panel?err=FRB-AUTH-103");
  return user;
}
