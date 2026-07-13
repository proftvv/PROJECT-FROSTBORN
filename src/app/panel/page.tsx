/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 3
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Eski panel kökü artık role göre ayrık panel alanına yönlendirir.
 */

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/guards";
import { getPanelHome } from "@/lib/roles";

export default async function PanelPage() {
  const user = await requireUser();
  redirect(getPanelHome(user.role));
}
