/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Panel ana sayfası — genel bakış.
 */

import Link from "next/link";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS, ROLE_LEVELS, isNordian } from "@/lib/roles";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { signOut } from "@/lib/auth";

const STATUS_LABELS = {
  ACTIVE: { text: "Aktif", cls: "text-aurora-green" },
  PENDING: { text: "Onay Bekliyor", cls: "text-aurora-gold" },
  SUSPENDED: { text: "Askıda", cls: "text-aurora-red" },
} as const;

export default async function PanelPage({
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
          Bu alana erişim yetkin yok. [FRB-AUTH-103]
        </p>
      )}

      <div>
        <h1 className="font-display text-2xl text-snow-100">Genel Bakış</h1>
        <p className="mt-1 text-sm text-snow-300/60">
          Hoş geldin, {user.callsign ?? user.name}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">
            Rütbe
          </p>
          <p className="font-display mt-2 text-lg text-frost-ice">
            {ROLE_LABELS[user.role]}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">
            Üyelik
          </p>
          <p className={`font-display mt-2 text-lg ${status.cls}`}>
            {status.text}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-snow-300/50">
            Duyurular
          </p>
          <p className="font-display mt-2 text-lg text-snow-100">
            {announcementCount} duyuru
          </p>
        </Card>
      </div>

      {!isNordian(user.role) && (
        <Card>
          <h2 className="font-display text-lg text-snow-100">
            Takıma Katılım
          </h2>
          {application ? (
            <p className="mt-2 text-sm text-snow-300/70">
              Başvuru durumun:{" "}
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
                  ? "Onaylandı"
                  : application.status === "REJECTED"
                    ? "Reddedildi"
                    : "İnceleniyor"}
              </span>
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-snow-300/70">
                The Nordians saflarına katılmak için başvuru yapabilirsin.
              </p>
              <Link href="/panel/basvuru" className="mt-4 inline-block">
                <Button size="sm">Başvur</Button>
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
          Çıkış Yap →
        </Button>
      </form>
    </div>
  );
}
