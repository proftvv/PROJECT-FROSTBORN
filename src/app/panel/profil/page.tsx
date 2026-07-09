/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS } from "@/lib/roles";
import Card from "@/components/ui/Card";
import ProfileForm from "@/components/panel/ProfileForm";

export const metadata = { title: "Profil" };

export default async function ProfilePage() {
  const sessionUser = await requireUser();
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Profil</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Callsign ve bölge bilgilerini yönet.
        </p>
      </div>

      <Card>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-snow-300/60">İsim</dt>
            <dd className="text-snow-100">{user.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-snow-300/60">E-posta</dt>
            <dd className="text-snow-100">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-snow-300/60">Rütbe</dt>
            <dd className="text-frost-ice">{ROLE_LABELS[user.role]}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-snow-300/60">Katılım</dt>
            <dd className="text-snow-100">
              {user.createdAt.toLocaleDateString("tr-TR")}
            </dd>
          </div>
        </dl>
      </Card>

      <ProfileForm
        initialCallsign={user.callsign ?? ""}
        initialRegion={user.region ?? ""}
      />
    </div>
  );
}
