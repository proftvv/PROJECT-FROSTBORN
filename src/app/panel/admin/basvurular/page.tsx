/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * ODIN — Başvuru yönetimi (Yönetici ve üstü).
 */

import { redirect } from "next/navigation";

export const metadata = { title: "Başvurular" };

export default function LegacyAdminApplicationsRedirectPage() {
  redirect("/admin/basvurular");
}
