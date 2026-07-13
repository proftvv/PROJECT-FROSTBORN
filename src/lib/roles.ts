/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Rütbe hiyerarşisi ve yetki yardımcıları.
 */

import type { Role } from "@prisma/client";

export const ROLE_LEVELS: Record<Role, number> = {
  DEVELOPER: 6,
  BASKAN: 5,
  BASKAN_YARDIMCISI: 5,
  YONETICI: 4,
  NORDIAN: 3,
  UYE: 2,
};

export const ROLE_LABELS: Record<Role, string> = {
  DEVELOPER: "Developer",
  BASKAN: "Başkan",
  BASKAN_YARDIMCISI: "Başkan Yardımcısı",
  YONETICI: "Yönetici",
  NORDIAN: "The Nordians",
  UYE: "Üye",
};

/** Verilen rol, hedef seviyeye eşit veya üstünde mi? */
export function hasLevel(role: Role, minLevel: number): boolean {
  return ROLE_LEVELS[role] >= minLevel;
}

/** Admin paneline erişebilir mi? (Yönetici ve üstü) */
export function isAdmin(role: Role): boolean {
  return hasLevel(role, 4);
}

/** Takım içeriklerine erişebilir mi? (Nordian ve üstü) */
export function isNordian(role: Role): boolean {
  return hasLevel(role, 3);
}

/** Yönetici, hedef kullanıcı üzerinde işlem yapabilir mi? */
export function canManage(actor: Role, target: Role): boolean {
  if (actor === "DEVELOPER") return true;
  if (target === "DEVELOPER") return false;
  return ROLE_LEVELS[actor] >= ROLE_LEVELS[target] && ROLE_LEVELS[actor] >= 4;
}

/** Yöneticinin atayabileceği rütbeler. */
export function assignableRoles(actor: Role): Role[] {
  if (actor === "DEVELOPER")
    return ["DEVELOPER", "BASKAN", "BASKAN_YARDIMCISI", "YONETICI", "NORDIAN", "UYE"];
  if (ROLE_LEVELS[actor] === 5)
    return ["BASKAN", "BASKAN_YARDIMCISI", "YONETICI", "NORDIAN", "UYE"];
  if (ROLE_LEVELS[actor] === 4) return ["NORDIAN", "UYE"];
  return [];
}

/** Kullanıcının varsayılan panel alanını döndürür. */
export function getPanelHome(role: Role): string {
  if (role === "DEVELOPER") return "/developer";
  if (isAdmin(role)) return "/admin";
  if (isNordian(role)) return "/takim";
  return "/uye";
}
