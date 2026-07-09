/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Üye satırı — rütbe ve durum yönetimi.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Role, MembershipStatus } from "@prisma/client";
import { updateUserRole, updateUserStatus } from "@/lib/actions/admin-actions";
import { ROLE_LABELS } from "@/lib/roles";

const selectClass =
  "rounded-lg border border-night-700/70 bg-night-900/70 px-3 py-1.5 text-xs text-snow-100 outline-none transition-colors focus:border-frost-ice/60";

const STATUS_LABELS: Record<MembershipStatus, string> = {
  ACTIVE: "Aktif",
  PENDING: "Beklemede",
  SUSPENDED: "Askıda",
};

export default function MemberRow({
  user,
  manageable,
  assignable,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    callsign: string | null;
    region: string | null;
    role: Role;
    status: MembershipStatus;
  };
  manageable: boolean;
  assignable: Role[];
}) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const changeRole = async (role: Role) => {
    setBusy(true);
    const res = await updateUserRole({ userId: user.id, role });
    setBusy(false);
    setMsg(res.ok ? "" : (res.error ?? ""));
    if (res.ok) router.refresh();
  };

  const changeStatus = async (status: MembershipStatus) => {
    setBusy(true);
    const res = await updateUserStatus({ userId: user.id, status });
    setBusy(false);
    setMsg(res.ok ? "" : (res.error ?? ""));
    if (res.ok) router.refresh();
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-night-900/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm text-snow-100">
          {user.callsign ? (
            <>
              <span className="text-frost-ice">{user.callsign}</span>{" "}
              <span className="text-snow-300/60">({user.name})</span>
            </>
          ) : (
            user.name
          )}
        </p>
        <p className="truncate text-xs text-snow-300/50">
          {user.email}
          {user.region ? ` · ${user.region}` : ""}
        </p>
        {msg && <p className="mt-1 text-xs text-aurora-red">{msg}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {manageable ? (
          <>
            <select
              value={user.role}
              disabled={busy}
              onChange={(e) => changeRole(e.target.value as Role)}
              className={selectClass}
            >
              {assignable.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
              {!assignable.includes(user.role) && (
                <option value={user.role} disabled>
                  {ROLE_LABELS[user.role]}
                </option>
              )}
            </select>
            <select
              value={user.status}
              disabled={busy}
              onChange={(e) => changeStatus(e.target.value as MembershipStatus)}
              className={selectClass}
            >
              {(Object.keys(STATUS_LABELS) as MembershipStatus[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </>
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-snow-300/40">
            {ROLE_LABELS[user.role]}
          </span>
        )}
      </div>
    </div>
  );
}
