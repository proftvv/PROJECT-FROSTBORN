<!--
  ═══════════════════════════════════════════════
  PROJECT FROSTBORN — The Nordians
  Oluşturulma   : 2026-07-08
  Son Güncelleme: 2026-07-08
  Dosya Sürümü  : Update 2
  dev By Proftvv
  ═══════════════════════════════════════════════
-->

<div align="center">

# 🗺️ PROJECT FROSTBORN — Yol Haritası

*Her faz, bir öncekinin üzerine inşa edilir. Kuzeye giden yol adım adım yürünür.*

</div>

---

## 🌈 FAZ 0 — BIFROST *(Köprü: Altyapı)*

> Bifrost, dünyalar arasındaki gökkuşağı köprüsüdür. Bu faz, projenin tüm dünyalarını birbirine bağlayacak temeli kurar.

### Görevler
- [ ] Next.js + TypeScript + Tailwind CSS proje kurulumu
- [ ] Proje klasör yapısı ve mimari kararlar
- [ ] Nordic tasarım sistemi:
  - Renk paleti (buz mavisi, gece laciverti, kar beyazı, rün altını)
  - Tipografi (başlık + gövde fontları)
  - Temel UI bileşenleri (Button, Card, Input, Badge...)
- [ ] Framer Motion + Lenis entegrasyonu
- [ ] Vercel deploy pipeline'ı
- [ ] ESLint / Prettier yapılandırması

**Çıktı:** Boş ama deploy edilmiş, tasarım sistemi hazır bir iskelet.

---

## 🏔️ FAZ 1 — MIDGARD *(İnsanların Dünyası: Genel Site)*

> Midgard, herkesin yaşadığı dünyadır. Bu faz, ziyaretçilerin göreceği vitrin yüzünü inşa eder.

### Görevler
- [ ] **Anasayfa**
  - Arka planda dönen takım fotoğrafları (crossfade slider)
  - Hero bölümü: takım logosu + slogan + CTA
  - Scroll animasyonlu tanıtım bölümleri
- [ ] **Hakkımızda** — takım hikayesi, vizyon
- [ ] **Takımımız** — bölgeler (Marmara / Çanakkale / Antalya), oyuncu kartları
- [ ] **Sahalarımız** — Meskun Mahal & Açık Orman Alanı tanıtım sayfaları
- [ ] **Galeri** — fotoğraf galerisi (lightbox)
- [ ] **İletişim** — iletişim formu + sosyal medya
- [ ] Navbar (Giriş butonu dahil) + Footer
- [ ] Mobil uyumluluk + SEO temelleri

**Çıktı:** Yayına alınabilir, tam donanımlı tanıtım sitesi.

---

## 👁️ FAZ 2 — HEIMDALL *(Kapı Bekçisi: Kimlik Doğrulama)*

> Heimdall, Bifrost köprüsünün bekçisidir. Kimin girip kimin giremeyeceğine o karar verir.

### Görevler
- [ ] Neon DB kurulumu + Prisma şeması
- [ ] Auth.js (NextAuth v5) entegrasyonu
- [ ] Kayıt olma / Giriş yapma sayfaları
- [ ] E-posta doğrulama (Resend)
- [ ] Şifre sıfırlama akışı
- [ ] Oturum yönetimi — girişte navbar'da **Panel** butonu görünür
- [ ] Rol altyapısı (6 kademeli rütbe modeli DB'de hazır)

**Çıktı:** Güvenli, tam işleyen üyelik sistemi.

---

## 🏛️ FAZ 3 — VALHALLA *(Savaşçıların Salonu: Üye Paneli)*

> Valhalla'ya yalnızca seçilmiş savaşçılar girer. Her rütbe, salonda farklı bir yere oturur.

### Görevler
- [ ] Panel layout (sidebar + rütbeye göre menü)
- [ ] Rol bazlı erişim kontrolü (middleware + RBAC)
- [ ] **Üye** erişimi: profil yönetimi, forum erişimi, duyurular
- [ ] **The Nordians** erişimi:
  - Takım haritaları (saha krokileri)
  - Eğitim içerikleri (doküman/video arşivi)
  - Takıma özel sohbet alanı
- [ ] Profil sayfası: avatar, callsign, bölge, rütbe rozeti
- [ ] Takıma katılım başvuru formu (panel içinden)

**Çıktı:** Rütbeye göre şekillenen tam işlevsel üye paneli.

---

## ⚜️ FAZ 4 — ODIN *(Bilgelik Tahtı: Admin Paneli)*

> Odin her şeyi görür, her şeyi bilir. Yönetim kadrosunun gücü bu fazda şekillenir.

### Görevler
- [ ] Admin paneli (Başkan / Bşk. Yardımcısı / Yönetici / Developer)
- [ ] Başvuru yönetimi:
  - Gelen başvuruları listeleme, inceleme
  - Onay / Red + açıklama yazma
  - Otomatik e-posta bildirimi (Resend)
- [ ] Üye yönetimi: rütbe atama, üyelik durumu, kayıt tamamlama
- [ ] Duyuru yayınlama sistemi
- [ ] İstatistik özeti (üye sayısı, bekleyen başvurular, bölge dağılımı)
- [ ] Denetim kaydı (kim, ne zaman, ne yaptı)

**Çıktı:** Takımın tüm operasyonunun yönetildiği komuta merkezi.

---

## 📜 FAZ 5 — SKALD *(Hikaye Anlatıcısı: Forum & İçerik)*

> Skald'lar savaşların hikayelerini anlatır. Topluluğun sesi bu fazda yükselir.

### Görevler
- [ ] Forum modülü: kategoriler, konular, cevaplar
- [ ] Rütbeye özel forum alanları (Nordians-only bölümler)
- [ ] Etkinlik takvimi (oyun günleri, operasyonlar)
- [ ] Etkinliğe katılım bildirimi (LFG sistemi)
- [ ] Galeri yönetimi (admin panelden fotoğraf yükleme)

**Çıktı:** Yaşayan, kendi kendini besleyen topluluk platformu.

---

## 🐺 FAZ 6 — FENRIR *(Zincirlenemeyen: Mobil Uygulama)*

> Fenrir zincire vurulamaz. Takım artık sahada, cepte, her yerde.

### Planlanan Özellikler
- [ ] React Native / Expo tabanlı mobil uygulama
- [ ] GPS konum paylaşımı (oyun içi harita)
- [ ] Taktik tim atama sistemi
- [ ] Hızlı radyo frekans listesi
- [ ] Acil durum bildirimi (tek tuş SOS)
- [ ] Push bildirimleri (duyuru + etkinlik)
- [ ] Web panel ile ortak API altyapısı

**Çıktı:** Sahada operasyonel avantaj sağlayan mobil komuta aracı.

---

## 📌 Faz Kuralları

1. Her faz kendi branch'inde geliştirilir → `phase/bifrost`, `phase/midgard`...
2. Faz tamamlanınca `main`'e merge edilir ve Vercel'e deploy edilir.
3. Bir faz bitmeden bir sonrakine geçilmez (istisnalar not düşülür).
4. Her fazın sonunda README'deki durum tablosu güncellenir.

---

<div align="center">

*"Kış geliyor değil — kış biziz."* ❄️

**dev By Proftvv**

</div>
