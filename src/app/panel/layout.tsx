/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Panel ortak layout — oturum + sidebar.
 */

import { requireUser } from "@/lib/guards";
import Container from "@/components/ui/Container";
import PanelSidebar from "@/components/panel/PanelSidebar";

export const metadata = { title: "Panel" };

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <main className="flex-1 py-12">
      <Container className="flex flex-col gap-8 lg:flex-row">
        <PanelSidebar
          role={user.role}
          callsign={user.callsign}
          name={user.name}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </main>
  );
}
