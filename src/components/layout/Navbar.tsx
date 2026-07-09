/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 3
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/takimimiz", label: "Takımımız" },
  { href: "/sahalar", label: "Sahalarımız" },
  { href: "/panel/forum", label: "Forum" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/forum") return pathname.startsWith("/forum");
    return pathname === href;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-night-800/80 bg-night-950/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-widest text-snow-100"
        >
          THE <span className="text-frost-ice">NORDIANS</span>
        </Link>

        {/* Masaüstü menü */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-frost-ice"
                  : "text-snow-300/75 hover:text-snow-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session?.user ? (
            <div className="ml-3 flex items-center gap-2">
              <Link href="/panel">
                <Button size="sm">Panel</Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Çıkış
              </Button>
            </div>
          ) : (
            <Link href="/giris" className="ml-3">
              <Button size="sm" variant="outline">
                Giriş
              </Button>
            </Link>
          )}
        </div>

        {/* Mobil menü butonu */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menüyü aç/kapat"
        >
          <span
            className={`h-0.5 w-6 bg-snow-100 transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-snow-100 transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-snow-100 transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobil menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-night-800/60 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2.5 text-sm ${
                    isActive(link.href)
                      ? "bg-night-800/60 text-frost-ice"
                      : "text-snow-300/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {session?.user ? (
                <div className="mt-2 flex flex-col gap-2">
                  <Link href="/panel">
                    <Button size="sm" className="w-full">
                      Panel
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Çıkış
                  </Button>
                </div>
              ) : (
                <Link href="/giris" className="mt-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Giriş
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
