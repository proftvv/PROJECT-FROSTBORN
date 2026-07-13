/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { redirect } from "next/navigation";

export const metadata = { title: "Developer Icerikler" };

export default function DeveloperContentShortcutPage() {
  redirect("/admin/icerikler");
}
