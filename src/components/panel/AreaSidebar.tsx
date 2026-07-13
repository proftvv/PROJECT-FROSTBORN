/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Ayrik panel alanlari icin ortak sidebar.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface AreaNavItem {
  href: string;
  label: string;
  icon: string;
}

export default function AreaSidebar({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: AreaNavItem[];
}) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="mb-6 rounded-xl border border-night-700/60 bg-night-900/50 px-4 py-4">
        <p className="font-display text-lg text-snow-100">{title}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-frost-ice/80">
          {subtitle}
        </p>
      </div>

      <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
        {items.map((item) => {
          const active =
            item.href === pathname ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

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
      </nav>
    </aside>
  );
}
