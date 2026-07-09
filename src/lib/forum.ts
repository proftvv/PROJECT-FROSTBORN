/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { prisma } from "@/lib/prisma";

const DEFAULT_CATEGORIES = [
  {
    title: "Genel Muhabbet",
    description: "Takımdan bağımsız genel sohbet, ekipman, oyun sonrası muhabbet.",
    minLevel: 2,
  },
  {
    title: "Operasyon ve Eğitim",
    description: "Senaryolar, eğitim notları ve saha tecrübeleri.",
    minLevel: 3,
  },
  {
    title: "Yönetim Masası",
    description: "Yönetim kararları ve koordinasyon başlıkları.",
    minLevel: 4,
  },
];

export async function ensureForumCategories() {
  const count = await prisma.forumCategory.count();
  if (count > 0) return;
  await prisma.forumCategory.createMany({ data: DEFAULT_CATEGORIES });
}
