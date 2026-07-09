/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 4
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Panel sidebar — rütbeye göre menü.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@prisma/client";
import { ROLE_LEVELS, ROLE_LABELS } from "@/lib/roles";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  minLevel: number;
}

const ITEMS: NavItem[] = [
  { href: "/panel", label: "Genel Bakış", icon: "❖", minLevel: 2 },
  { href: "/panel/profil", label: "Profil", icon: "☺", minLevel: 2 },
  { href: "/panel/duyurular", label: "Duyurular", icon: "✦", minLevel: 2 },
  { href: "/forum", label: "Forum Alanı", icon: "📜", minLevel: 2 },
  { href: "/panel/basvuru", label: "Takıma Başvur", icon: "⚔", minLevel: 2 },
  { href: "/panel/haritalar", label: "Takım Haritaları", icon: "🗺", minLevel: 3 },
  { href: "/panel/egitim", label: "Eğitim İçerikleri", icon: "🎯", minLevel: 3 },
  { href: "/panel/sohbet", label: "Takım Sohbeti", icon: "💬", minLevel: 3 },
];

const ADMIN_ITEMS: NavItem[] = [
  { href: "/panel/admin", label: "Odin Dashboard", icon: "⚜", minLevel: 4 },
  { href: "/panel/admin/basvurular", label: "Başvurular", icon: "📥", minLevel: 4 },
  { href: "/panel/admin/uyeler", label: "Üye Yönetimi", icon: "♟", minLevel: 4 },
  { href: "/panel/admin/forum", label: "Forum", icon: "📜", minLevel: 4 },
  { href: "/panel/admin/duyurular", label: "Duyurular", icon: "📢", minLevel: 4 },
  { href: "/panel/admin/icerikler", label: "İçerikler", icon: "🗂", minLevel: 4 },
  { href: "/panel/admin/galeri", label: "Galeri", icon: "🖼", minLevel: 4 },
];

export default function PanelSidebar({
  role,
  callsign,
  name,
}: {
  role: Role;
  callsign?: string | null;
  name: string;
}) {
  const pathname = usePathname();
  const level = ROLE_LEVELS[role];
  const visible = ITEMS.filter((i) => level >= i.minLevel);
  const visibleAdmin = ADMIN_ITEMS.filter((i) => level >= i.minLevel);

  return (
    <aside className="w-full shrink-0 lg:w-60">
      <div className="mb-6 px-3">
        <p className="font-display text-lg text-snow-100">
          {callsign ?? name}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-frost-ice/80">
          {ROLE_LABELS[role]}
        </p>
      </div>

      <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
        {visible.map((item) => {
          const active =
            item.href === "/panel"
              ? pathname === "/panel"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-night-800/80 text-frost-ice"
                  : "text-snow-300/70 hover:bg-night-800/40 hover:text-snow-100"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        {visibleAdmin.length > 0 && (
          <>
            <p className="mt-4 mb-1 px-3 text-[10px] font-medium uppercase tracking-[0.3em] text-aurora-gold/70">
              Odin — Yönetim
            </p>
            {visibleAdmin.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-night-800/80 text-aurora-gold"
                      : "text-snow-300/70 hover:bg-night-800/40 hover:text-snow-100"
                  }`}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>
    </aside>
  );
}
