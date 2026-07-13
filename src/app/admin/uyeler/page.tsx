/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import TeamMemberManager from "@/components/panel/admin/TeamMemberManager";
import { assignableRoles, canManage } from "@/lib/roles";

export const metadata = { title: "Admin Uye Yonetimi" };

export default async function AdminMembersPage() {
  const currentUser = await requireLevel(4);

  const users = await prisma.user.findMany({
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      email: true,
      callsign: true,
      region: true,
      avatarUrl: true,
      bio: true,
      weapons: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Genel Takim Yonetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">{users.length} kayitli kisi.</p>
      </div>

      <TeamMemberManager
        editableRoles={assignableRoles(currentUser.role)}
        members={users.map((u) => ({
          ...u,
          canManage: canManage(currentUser.role, u.role),
          createdAt: u.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
