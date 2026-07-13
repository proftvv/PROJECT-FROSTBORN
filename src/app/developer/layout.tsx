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
import { requireRole } from "@/lib/guards";

const ITEMS: AreaNavItem[] = [
  { href: "/developer", label: "Dashboard", icon: "👑" },
  { href: "/developer/sahalar", label: "Saha Yonetimi", icon: "🗺" },
  { href: "/developer/arka-plan", label: "Arka Planlar", icon: "🧊" },
  { href: "/developer/icerikler", label: "Icerik Merkezi", icon: "🗂" },
  { href: "/developer/galeri", label: "Galeri", icon: "🖼" },
  { href: "/admin", label: "Admin Paneline Git", icon: "⚜" },
];

export const metadata = { title: "Developer Paneli" };

export default async function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("DEVELOPER");

  return (
    <main className="flex-1 py-12">
      <Container className="flex flex-col gap-8 lg:flex-row">
        <AreaSidebar
          title={user.callsign ?? user.name}
          subtitle="Developer Paneli · Tam Yetki"
          items={ITEMS}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </main>
  );
}
