/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Site geneli veriler — takım fotoğrafları geldiğinde
 * /public/photos altına eklenip buradan bağlanacak.
 */

export const SITE = {
  name: "The Nordians",
  slogan: "Kuzeyden doğanlar, sahada birleşir.",
  regions: ["Marmara", "Çanakkale", "Antalya"],
  email: "iletisim@proftvv.com.tr",
  instagram: "https://instagram.com/thenordians",
} as const;

export interface Slide {
  src: string;
  alt: string;
}

// Takım fotoğrafları hazır olana dek nordic temalı placeholderlar
export const HERO_SLIDES: Slide[] = [
  { src: "/photos/slide-1.svg", alt: "The Nordians saha operasyonu" },
  { src: "/photos/slide-2.svg", alt: "Meskun mahal antrenmanı" },
  { src: "/photos/slide-3.svg", alt: "Orman sahası operasyonu" },
  { src: "/photos/slide-4.svg", alt: "Takım toplu fotoğraf" },
];

export interface Field {
  slug: string;
  name: string;
  type: string;
  location: string;
  description: string;
  features: string[];
  image: string;
}

export const FIELDS: Field[] = [
  {
    slug: "meskun-mahal",
    name: "Meskun Mahal",
    type: "CQB / Bina İçi Muharebe",
    location: "Antalya",
    description:
      "Dar koridorlar, çok katlı yapılar ve köşe çatışmaları. Yakın mesafe muharebe becerilerinin sınandığı, yüksek tempolu senaryoların sahnesi.",
    features: [
      "Çok odalı bina kompleksi",
      "Gece operasyonu altyapısı",
      "Senaryo bazlı oyun kurgusu",
      "Güvenlik brifing alanı",
    ],
    image: "/photos/slide-2.svg",
  },
  {
    slug: "orman-sahasi",
    name: "Açık Orman Alanı",
    type: "Ormanlık Arazi Muharebesi",
    location: "Antalya",
    description:
      "Doğal örtü, uzun görüş hatları ve arazi hakimiyeti. Kamuflaj, pusu ve uzun menzilli angajmanların hüküm sürdüğü açık arazi sahası.",
    features: [
      "Geniş ormanlık parkur",
      "Doğal siper ve mevziler",
      "Bayrak / bölge kontrol senaryoları",
      "Araç yaklaşım yolları",
    ],
    image: "/photos/slide-3.svg",
  },
];

export interface TeamRegion {
  name: string;
  description: string;
}

export const TEAM_REGIONS: TeamRegion[] = [
  {
    name: "Marmara",
    description:
      "Takımın kuzey kanadı. Bölge etkinlikleri ve ortak operasyonlarla aktif.",
  },
  {
    name: "Çanakkale",
    description:
      "Boğazın bekçileri. Arazi oyunlarında bölgenin öncü ekibi.",
  },
  {
    name: "Antalya",
    description:
      "Takımın kalbi. İki saha burada — Meskun Mahal ve Açık Orman Alanı.",
  },
];

export const GALLERY: Slide[] = [
  { src: "/photos/slide-1.svg", alt: "Saha operasyonu" },
  { src: "/photos/slide-2.svg", alt: "Meskun mahal antrenmanı" },
  { src: "/photos/slide-3.svg", alt: "Orman operasyonu" },
  { src: "/photos/slide-4.svg", alt: "Takım fotoğrafı" },
  { src: "/photos/slide-1.svg", alt: "Gece operasyonu" },
  { src: "/photos/slide-3.svg", alt: "Arazi eğitimi" },
];
