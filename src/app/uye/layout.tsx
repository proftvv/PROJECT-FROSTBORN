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
import { requireUser } from "@/lib/guards";
import { ROLE_LABELS } from "@/lib/roles";

const ITEMS: AreaNavItem[] = [
  { href: "/uye", label: "Genel Bakis", icon: "❖" },
  { href: "/uye/profil", label: "Profil", icon: "☺" },
  { href: "/uye/duyurular", label: "Duyurular", icon: "✦" },
  { href: "/uye/basvuru", label: "Takima Basvur", icon: "⚔" },
  { href: "/forum", label: "Forum", icon: "📜" },
];

export const metadata = { title: "Uye Paneli" };

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <main className="flex-1 py-12">
      <Container className="flex flex-col gap-8 lg:flex-row">
        <AreaSidebar
          title={user.callsign ?? user.name}
          subtitle={`Uye Paneli · ${ROLE_LABELS[user.role]}`}
          items={ITEMS}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </main>
  );
}
