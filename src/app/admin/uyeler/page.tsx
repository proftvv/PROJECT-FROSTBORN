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
import { canManage, assignableRoles, ROLE_LEVELS } from "@/lib/roles";
import MemberRow from "@/components/panel/admin/MemberRow";

export const metadata = { title: "Admin Uye Yonetimi" };

export default async function AdminMembersPage() {
  const admin = await requireLevel(4);

  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      callsign: true,
      region: true,
      role: true,
      status: true,
    },
  });

  users.sort((a, b) => ROLE_LEVELS[b.role] - ROLE_LEVELS[a.role]);
  const assignable = assignableRoles(admin.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Uye Yonetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">{users.length} kayitli uye.</p>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <MemberRow
            key={u.id}
            user={u}
            manageable={u.id !== admin.id && canManage(admin.role, u.role)}
            assignable={assignable}
          />
        ))}
      </div>
    </div>
  );
}
