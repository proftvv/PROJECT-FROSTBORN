/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Üye paneli — VALHALLA fazında genişleyecek.
 */

import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/roles";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata = { title: "Panel" };

export default async function PanelPage() {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  const { user } = session;

  return (
    <main className="flex-1">
      <PageHero
        badge="Valhalla"
        title="PANEL"
        description={`Hoş geldin, ${user.name}.`}
      />

      <section className="pb-24">
        <Container className="max-w-2xl space-y-6">
          <Card>
            <h2 className="font-display text-xl text-snow-100">Hesap Bilgileri</h2>
            <dl className="mt-4 space-y-2 text-sm">
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
                <dt className="text-snow-300/60">Üyelik Durumu</dt>
                <dd className={user.status === "ACTIVE" ? "text-aurora-green" : "text-aurora-gold"}>
                  {user.status === "ACTIVE"
                    ? "Aktif"
                    : user.status === "PENDING"
                      ? "Onay Bekliyor"
                      : "Askıda"}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="text-center">
            <p className="text-sm text-snow-300/70">
              Panel modülleri (profil, forum, takım içerikleri) VALHALLA
              fazında burada olacak.
            </p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="mt-5"
            >
              <Button variant="outline" type="submit">
                Çıkış Yap
              </Button>
            </form>
          </Card>
        </Container>
      </section>
    </main>
  );
}
