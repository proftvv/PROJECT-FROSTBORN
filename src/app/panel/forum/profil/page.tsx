/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { redirect } from "next/navigation";

export const metadata = { title: "Forum Profili" };

export default function PanelForumProfileRedirectPage() {
  redirect("/forum/profil");
}
