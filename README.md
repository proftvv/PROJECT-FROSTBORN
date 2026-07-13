<!--
  ═══════════════════════════════════════════════
  PROJECT FROSTBORN — The Nordians
  Oluşturulma   : 2026-07-08
  Son Güncelleme: 2026-07-11
  Dosya Sürümü  : Update 9
  dev By Proftvv
  ═══════════════════════════════════════════════
-->

<div align="center">

# ❄️ PROJECT FROSTBORN

### The Nordians — Resmi Takım Platformu

*"Kuzeyden doğanlar, sahada birleşir."*

![Version](https://img.shields.io/badge/S%C3%BCr%C3%BCm-0.6.001-88C0D0?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=postgresql&logoColor=white)

---

</div>

## 🏔️ Hakkında

**The Nordians**, Marmara, Çanakkale ve Antalya bölgelerinde aktif olan çok şehirli bir airsoft takımıdır. Bu platform; takımın tanıtımı, üye yönetimi, başvuru süreçleri ve takım içi operasyonların tek merkezden yürütülmesi için geliştirilmektedir.

### 🎯 Sahalarımız

| Saha | Tür | Konum |
|------|-----|-------|
| 🏚️ Meskun Mahal | CQB / Bina içi muharebe | Antalya |
| 🌲 Açık Orman Alanı | Ormanlık arazi muharebesi | Antalya |

---

## ⚔️ Özellikler

### 🌐 Genel Site
- Nordic temalı, animasyonlu modern arayüz
- Arka planda dönen takım fotoğrafları
- Anasayfa, Hakkımızda, Takımımız, Sahalar, Galeri, İletişim sayfaları
- Üyelik başvuru sistemi

### 🛡️ Rütbe Sistemi

Altı kademeli rütbe hiyerarşisi:

| Rütbe | Yetki Seviyesi | Erişim |
|-------|:---:|--------|
| 👑 **Developer** | 6 | Sistemin tamamı, teknik yönetim |
| ⚜️ **Başkan** | 5 | Tüm yetkiler ve kayıt yönetimi |
| 🎖️ **Başkan Yardımcısı** | 5 | Başkan ile eşdeğer yetkiler |
| 🛡️ **Yönetici** | 4 | Admin paneli, başvuru yönetimi |
| ⚔️ **The Nordians** | 3 | Takım haritaları, eğitim içerikleri, takım sohbeti |
| 👤 **Üye** | 2 | Forum ve genel içerik erişimi |

### 🧭 Panel Mimarisi (V2 - Ayrık Alanlar)

Yeni mimari ile tüm panel alanları birbirinden tamamen ayrılır:

| Panel | URL Alanı | Kimler Erişir | Kapsam |
|-------|-----------|---------------|--------|
| 👤 **Üye Paneli** | `/uye/*` | UYE ve üzeri | Profil, kişisel duyurular, başvuru takip |
| ⚔️ **Takım Oyuncusu Paneli** | `/takim/*` | NORDIAN ve üzeri | Operasyon, eğitim, takım içi araçlar |
| ⚜️ **Admin Paneli** | `/admin/*` | YONETICI, BASKAN, BASKAN_YARDIMCISI, DEVELOPER | Üye/başvuru/duyuru operasyonu |
| 👑 **Developer Paneli** | `/developer/*` | DEVELOPER | Site içerik yönetimi, sahalar, medya ve vitrin yapılandırması |

Forum, panel yapısından çıkarılarak bağımsız `/forum/*` alanında kalır.

### ⚙️ Developer Panel Yetkileri (Planlanan)
- Sahalar: ekleme, düzenleme, yayından kaldırma
- Saha fotoğrafları: yükleme, sıralama, silme
- Arka plan görselleri: sayfa bazlı değiştirme
- Vitrin içerikleri: başlık, metin, buton ve medya yönetimi
- Galeri koleksiyonları ve ana sayfa slider içeriği yönetimi
- İçerik değişiklikleri için denetim kaydı (audit log)

### 📱 Mobil Uygulama *(Gelecek Faz)*
- GPS konum paylaşımı
- Taktik tim atama
- Hızlı radyo frekans listesi
- Acil durum bildirimi

---

## 🧰 Teknoloji

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS |
| Animasyon | Framer Motion · Lenis · GSAP |
| Veritabanı | Neon (Serverless PostgreSQL) |
| ORM | Prisma |
| Kimlik Doğrulama | Auth.js (NextAuth v5) |
| E-posta | Resend |
| Deploy | Vercel |

---

## 📏 Standartlar

Sürümleme, dosya başlığı ve hata kod sistemi için [STANDARDS.md](STANDARDS.md) dosyasına bakın.

- Proje sürümü `0.0.001` ile başlar — her faz bitişinde `0.1`, `0.2`... şeklinde ilerler
- `1.0.0` yalnızca proje sahibinin onayıyla yayınlanır
- Tüm hatalar `FRB-[MODÜL]-[NUMARA]` koduyla izlenir

---

## 🗺️ Yol Haritası

Proje, Nordic mitolojisinden ilham alan fazlara bölünmüştür. Detaylar için [ROADMAP.md](ROADMAP.md) dosyasına bakın.

```
BIFROST ──► MIDGARD ──► HEIMDALL ──► VALHALLA ──► ODIN ──► SKALD ──► MIMIR ──► FENRIR
 Altyapı     Vitrin      Kimlik       Panel      Yönetim    Forum   Panel V2     Mobil
```

| Faz | Kod Adı | Kapsam | Durum |
|:---:|---------|--------|:---:|
| 0 | 🌈 **BIFROST** | Proje altyapısı, tasarım sistemi | ✅ |
| 1 | 🏔️ **MIDGARD** | Genel site — vitrin sayfaları | ✅ |
| 2 | 👁️ **HEIMDALL** | Kimlik doğrulama & kayıt sistemi | ✅ |
| 3 | 🏛️ **VALHALLA** | Üye paneli & rütbe sistemi | ✅ |
| 4 | ⚜️ **ODIN** | Admin paneli & başvuru yönetimi | ✅ |
| 5 | 📜 **SKALD** | Forum & takım içi içerikler | ✅ |
| 6 | 🧠 **MIMIR** | Ayrık panel mimarisi (Üye/Takım/Admin/Developer) | 🛠️ |
| 7 | 🐺 **FENRIR** | Mobil uygulama | 🔮 |

---

<div align="center">

### ❄️ The Nordians ❄️

*Marmara · Çanakkale · Antalya*

**dev By Proftvv**

</div>
