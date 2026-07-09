/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 3
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { redirect } from "next/navigation";

export default async function PanelForumTopicRedirectPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;

  redirect(`/forum/konu/${topicId}`);
}
