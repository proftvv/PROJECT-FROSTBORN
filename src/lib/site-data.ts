export const SITE = {
  name: "The Nordians",
  slogan: "Disiplinli airsoft kulturu, guclu takim ruhu.",
  regions: ["Marmara", "Canakkale", "Antalya"],
  email: "iletisim@proftvv.com.tr",
  instagram: "https://instagram.com/thenordians",
} as const;

export interface Slide {
  src: string;
  alt: string;
}

export const HERO_SLIDES: Slide[] = [
  { src: "/photos/slide-1.svg", alt: "The Nordians ekip fotografi" },
  { src: "/photos/slide-2.svg", alt: "Takim egitimi" },
  { src: "/photos/slide-3.svg", alt: "Ortak operasyon" },
  { src: "/photos/slide-4.svg", alt: "Nordians saha gorunumu" },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "The Nordians, farkli sehirlerdeki oyuncularin disiplinli bir takim yapisinda bir araya gelmesiyle kuruldu.",
  "Amacimiz sadece oyun oynamak degil; sportmenlik, guvenlik ve ekip koordinasyonunu bir standart haline getirmek.",
  "Her yeni uye, takim kulturunu guclendiren bir sorumlulukla aramiza katilir.",
];

export const TEAM_VALUES = [
  {
    title: "Disiplin",
    text: "Sahada ve saha disinda net kurallar, net sorumluluk.",
  },
  {
    title: "Saygi",
    text: "Takim arkadasina, rakibe ve oyunun ruhuna saygi.",
  },
  {
    title: "Gelisim",
    text: "Her etkinlikte teknik ve taktik olarak daha iyiye gitmek.",
  },
] as const;

export const TEAM_RULES = [
  "Guvenlik ekipmani olmadan oyun alanina girilmez.",
  "Hakem ve komuta ekibi kararlarina itiraz edilmez; gerekli geri bildirim oyun sonrasinda yapilir.",
  "Hit alindiginda gecikmeden oyun disi kalinir.",
  "Takim ici iletisimde saygili ve profesyonel dil kullanilir.",
  "Ekipman, alan ve ortak kaynaklara zarar verilmez.",
  "Takim gizliligi ve operasyonel bilgiler disariyla paylasilmaz.",
] as const;
