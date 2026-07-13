/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { redirect } from "next/navigation";

export const metadata = { title: "Takım Sohbeti" };

export default function LegacyChatRedirectPage() {
  redirect("/takim/sohbet");
}
