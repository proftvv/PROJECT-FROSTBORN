/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * ODIN — Üye yönetimi (Yönetici ve üstü).
 */

import { requireLevel } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { canManage, assignableRoles, ROLE_LEVELS } from "@/lib/roles";
import MemberRow from "@/components/panel/admin/MemberRow";

export const metadata = { title: "Üye Yönetimi" };

export default async function MembersPage() {
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

  // Rütbe seviyesine göre yüksekten alçağa sırala
  users.sort((a, b) => ROLE_LEVELS[b.role] - ROLE_LEVELS[a.role]);

  const assignable = assignableRoles(admin.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Üye Yönetimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          {users.length} kayıtlı üye — rütbe ve durum yönetimi.
        </p>
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
