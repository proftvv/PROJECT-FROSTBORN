import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Takimimiz",
  description: "Takimdaki kisiler, callsign bilgileri, ekipmanlari ve profilleri.",
};

export default async function TeamPage() {
  const members = await prisma.user.findMany({
    where: {
      status: "ACTIVE",
      role: { in: ["NORDIAN", "UYE", "YONETICI", "BASKAN", "BASKAN_YARDIMCISI"] },
    },
    orderBy: [{ role: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      callsign: true,
      region: true,
      avatarUrl: true,
      bio: true,
      weapons: true,
      role: true,
    },
  });

  return (
    <main className="flex-1">
      <PageHero
        badge="Kadromuz"
        title="TAKIMIMIZ"
        description="Kisiler, callsign'ler, ekipman ve saha rolleri."
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
              <Card key={member.id} className="overflow-hidden p-0">
                <div className="relative h-52 w-full bg-night-900">
                  {member.avatarUrl ? (
                    <Image src={member.avatarUrl} alt={member.callsign ?? member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-display text-frost-ice">
                      {(member.callsign ?? member.name).slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-2xl text-snow-100">{member.callsign ?? member.name}</h2>
                  <p className="mt-1 text-sm text-snow-300/65">{member.name}{member.region ? ` · ${member.region}` : ""}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-frost-ice/80">{member.role}</p>
                  <p className="mt-3 text-sm text-snow-300/75">{member.bio ?? "Profil aciklamasi henuz eklenmedi."}</p>
                  <p className="mt-4 text-sm text-snow-100"><span className="text-snow-300/60">Silahlar:</span> {member.weapons ?? "Belirtilmedi"}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
