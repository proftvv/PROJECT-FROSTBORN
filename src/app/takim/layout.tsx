/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Container from "@/components/ui/Container";
import AreaSidebar, { type AreaNavItem } from "@/components/panel/AreaSidebar";
import { requireLevel } from "@/lib/guards";
import { ROLE_LABELS } from "@/lib/roles";

const ITEMS: AreaNavItem[] = [
  { href: "/takim", label: "Genel Bakis", icon: "❖" },
  { href: "/takim/haritalar", label: "Haritalar", icon: "🗺" },
  { href: "/takim/egitim", label: "Egitim", icon: "🎯" },
  { href: "/takim/sohbet", label: "Sohbet", icon: "💬" },
  { href: "/takim/etkinlikler", label: "Etkinlikler", icon: "🛡" },
];

export const metadata = { title: "Takim Oyuncusu Paneli" };

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  const user = await requireLevel(3);

  return (
    <main className="flex-1 py-12">
      <Container className="flex flex-col gap-8 lg:flex-row">
        <AreaSidebar
          title={user.callsign ?? user.name}
          subtitle={`Takim Paneli · ${ROLE_LABELS[user.role]}`}
          items={ITEMS}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </main>
  );
}
