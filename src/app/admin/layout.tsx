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
  { href: "/admin", label: "Dashboard", icon: "⚜" },
  { href: "/admin/basvurular", label: "Basvurular", icon: "📥" },
  { href: "/admin/uyeler", label: "Uye Yonetimi", icon: "♟" },
  { href: "/admin/duyurular", label: "Duyurular", icon: "📢" },
  { href: "/admin/icerikler", label: "Icerikler", icon: "🗂" },
  { href: "/admin/galeri", label: "Galeri", icon: "🖼" },
];

export const metadata = { title: "Admin Paneli" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireLevel(4);

  return (
    <main className="flex-1 py-12">
      <Container className="flex flex-col gap-8 lg:flex-row">
        <AreaSidebar
          title={user.callsign ?? user.name}
          subtitle={`Admin Paneli · ${ROLE_LABELS[user.role]}`}
          items={ITEMS}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </main>
  );
}
