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

export default async function PanelForumCategoryRedirectPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;

  redirect(`/forum/${categoryId}`);
}
