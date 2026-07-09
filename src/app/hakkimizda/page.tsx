/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import RuneLabel from "@/components/ui/RuneLabel";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "The Nordians'ın hikayesi — çok şehirli bir airsoft takımının doğuşu, değerleri ve vizyonu.",
};

const VALUES = [
  {
    title: "Disiplin",
    text: "Sahada da saha dışında da söz tektir. Brifinge uyulur, takım arkadaşı yalnız bırakılmaz.",
  },
  {
    title: "Kardeşlik",
    text: "Üç şehir, tek bayrak. Nordian olmak bir üyelikten fazlası — bir aileye katılmaktır.",
  },
  {
    title: "Sportmenlik",
    text: "Hit alınır, el kalkar. Dürüst oyun bizim için skordan her zaman daha değerlidir.",
  },
  {
    title: "Gelişim",
    text: "Her operasyon bir ders, her senaryo bir sınav. Sürekli eğitim ve taktik gelişim esastır.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        badge="Hikayemiz"
        title="HAKKIMIZDA"
        description="Kuzeyin soğukkanlılığını sahaya taşıyan bir takım."
      />

      <section className="pb-24">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="space-y-5 leading-relaxed text-snow-300/80">
              <p>
                The Nordians, airsoft tutkusunu disiplinle birleştiren
                oyuncuların bir araya gelmesiyle doğdu. Bugün Marmara,
                Çanakkale ve Antalya bölgelerinde aktif olan takımımız, her
                bölgede aynı ruhu taşıyor: soğukkanlılık, taktik zeka ve
                sarsılmaz takım bağı.
              </p>
              <p>
                Antalya&apos;daki iki sahamız — Meskun Mahal ve Açık Orman
                Alanı — yalnızca oyun alanı değil; eğitimlerimizin,
                senaryolarımızın ve takım kültürümüzün merkezi.
              </p>
              <p>
                Amacımız büyümek değil, doğru insanlarla büyümek. Kapımız;
                sportmenliğe değer veren, takımına sahip çıkan ve sahada
                gelişmeye aç herkese açık.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Reveal className="text-center">
            <RuneLabel>Değerlerimiz</RuneLabel>
            <h2 className="font-display mt-6 text-3xl tracking-wide text-snow-100">
              Bizi Biz Yapanlar
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <Card className="h-full">
                  <h3 className="font-display text-xl text-frost-ice">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-snow-300/70">{value.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
