/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { redirect } from "next/navigation";

export const metadata = { title: "Galeri Yönetimi" };

export default function LegacyAdminGalleryRedirectPage() {
  redirect("/admin/galeri");
}
