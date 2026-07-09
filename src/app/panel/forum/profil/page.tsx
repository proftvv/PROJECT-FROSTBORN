/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import ForumProfileForm from "@/components/panel/forum/ForumProfileForm";

export const metadata = { title: "Forum Profili" };

export default async function ForumProfilePage() {
  const user = await requireUser();
  const profile = await prisma.forumProfile.findUnique({ where: { userId: user.id } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Forum Profili</h1>
        <p className="mt-1 text-sm text-snow-300/60">İmzanı, biyografini ve forum kimliğini ayarla.</p>
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Görünen İsim</p>
            <p className="mt-2 text-snow-100">{user.callsign ?? user.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Forum Statüsü</p>
            <p className="mt-2 text-frost-ice">{user.role}</p>
          </div>
        </div>
      </Card>

      <ForumProfileForm
        initialBio={profile?.bio ?? ""}
        initialSignature={profile?.signature ?? ""}
        initialFavoriteReplica={profile?.favoriteReplica ?? ""}
        initialPlayStyle={profile?.playStyle ?? ""}
      />
    </div>
  );
}
