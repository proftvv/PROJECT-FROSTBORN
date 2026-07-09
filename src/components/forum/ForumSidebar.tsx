/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import Card from "@/components/ui/Card";

type TopicLink = {
  id: string;
  title: string;
  meta: string;
  href: string;
};

export default function ForumSidebar({
  displayName,
  roleLabel,
  bio,
  favoriteReplica,
  playStyle,
  popular,
  recent,
}: {
  displayName: string;
  roleLabel: string;
  bio: string | null;
  favoriteReplica: string | null;
  playStyle: string | null;
  popular: TopicLink[];
  recent: TopicLink[];
}) {
  return (
    <aside className="space-y-4 xl:order-first">
      <Card>
        <p className="text-xs uppercase tracking-[0.25em] text-frost-ice/80">Forum Profili</p>
        <h2 className="font-display mt-2 text-lg text-snow-100">{displayName}</h2>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-snow-300/45">{roleLabel}</p>
        <p className="mt-3 text-sm text-snow-300/70">{bio ?? "Henüz forum biyografisi yok."}</p>
        {(favoriteReplica || playStyle) && (
          <div className="mt-4 space-y-1 text-xs text-snow-300/60">
            {favoriteReplica && <p>Replica: {favoriteReplica}</p>}
            {playStyle && <p>Stil: {playStyle}</p>}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/forum/profil" className="text-frost-ice hover:text-frost-teal">Profili düzenle</Link>
          <Link href="/forum/etkinlikler" className="text-snow-300/70 hover:text-snow-100">Etkinlikler</Link>
        </div>
      </Card>

      <Card>
        <p className="text-xs uppercase tracking-[0.25em] text-frost-ice/80">En Çok Görüntülenen</p>
        <div className="mt-3 space-y-3">
          {popular.length === 0 ? (
            <p className="text-sm text-snow-300/60">Henüz veri yok.</p>
          ) : (
            popular.map((topic) => (
              <Link key={topic.id} href={topic.href} className="block">
                <p className="text-sm text-snow-100 hover:text-frost-ice">{topic.title}</p>
                <p className="text-xs text-snow-300/50">{topic.meta}</p>
              </Link>
            ))
          )}
        </div>
      </Card>

      <Card>
        <p className="text-xs uppercase tracking-[0.25em] text-frost-ice/80">Son Aktif Konular</p>
        <div className="mt-3 space-y-3">
          {recent.length === 0 ? (
            <p className="text-sm text-snow-300/60">Henüz veri yok.</p>
          ) : (
            recent.map((topic) => (
              <Link key={topic.id} href={topic.href} className="block">
                <p className="text-sm text-snow-100 hover:text-frost-ice">{topic.title}</p>
                <p className="text-xs text-snow-300/50">{topic.meta}</p>
              </Link>
            ))
          )}
        </div>
      </Card>
    </aside>
  );
}
