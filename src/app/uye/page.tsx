/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-11
 * Son Güncelleme: 2026-07-11
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import Link from "next/link";
import { signOut } from "@/lib/auth";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS, ROLE_LEVELS, isNordian } from "@/lib/roles";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const STATUS_LABELS = {
  ACTIVE: { text: "Aktif", cls: "text-aurora-green" },
  PENDING: { text: "Onay Bekliyor", cls: "text-aurora-gold" },
  SUSPENDED: { text: "Askida", cls: "text-aurora-red" },
} as const;

export default async function MemberPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>;
}) {
  const user = await requireUser();
  const { err } = await searchParams;

  const [announcementCount, application] = await Promise.all([
    prisma.announcement.count({
      where: { minLevel: { lte: ROLE_LEVELS[user.role] } },
    }),
    prisma.application.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const status = STATUS_LABELS[user.status];

  return (
    <div className="space-y-6">
      {err === "FRB-AUTH-103" && (
        <p className="rounded-lg bg-aurora-red/10 px-4 py-2.5 text-sm text-aurora-red">
          Bu alana erisim yetkin yok. [FRB-AUTH-103]
        </p>
      )}

      <div>
        <h1 className="font-display text-2xl text-snow-100">Uye Paneli</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Hos geldin, {user.callsign ?? user.name}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Rutbe</p>
          <p className="font-display mt-2 text-lg text-frost-ice">{ROLE_LABELS[user.role]}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Uyelik</p>
          <p className={`font-display mt-2 text-lg ${status.cls}`}>{status.text}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">Duyurular</p>
          <p className="font-display mt-2 text-lg text-snow-100">{announcementCount} duyuru</p>
        </Card>
      </div>

      {!isNordian(user.role) && (
        <Card>
          <h2 className="font-display text-lg text-snow-100">Takima Katilim</h2>
          {application ? (
            <p className="mt-2 text-sm text-snow-300/70">
              Basvuru durumun:{" "}
              <span
                className={
                  application.status === "APPROVED"
                    ? "text-aurora-green"
                    : application.status === "REJECTED"
                      ? "text-aurora-red"
                      : "text-aurora-gold"
                }
              >
                {application.status === "APPROVED"
                  ? "Onaylandi"
                  : application.status === "REJECTED"
                    ? "Reddedildi"
                    : "Inceleniyor"}
              </span>
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-snow-300/70">
                The Nordians saflarina katilmak icin basvuru yapabilirsin.
              </p>
              <Link href="/uye/basvuru" className="mt-4 inline-block">
                <Button size="sm">Basvur</Button>
              </Link>
            </>
          )}
        </Card>
      )}

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button variant="ghost" size="sm" type="submit">
          Cikis Yap -&gt;
        </Button>
      </form>
    </div>
  );
}
