<!--
  ═══════════════════════════════════════════════
  PROJECT FROSTBORN — The Nordians
  Oluşturulma   : 2026-07-08
  Son Güncelleme: 2026-07-10
  Dosya Sürümü  : Update 7
  dev By Proftvv
  ═══════════════════════════════════════════════
-->

<div align="center">

# 📐 PROJECT FROSTBORN — Standartlar

**Sürümleme · Dosya Başlığı · Hata Kod Sistemi**

</div>

---

## 🔢 Proje Sürüm Sistemi

Proje sürümü `MAJOR.PHASE.UPDATE` formatını kullanır:

```
0 . 0 . 001
│   │    └── Update numarası — her anlamlı değişiklikte artar (001, 002, 003...)
│   └─────── Phase numarası — bir faz tamamlandığında artar (BIFROST bitti → 0.1.000)
└─────────── Major — yalnızca proje sahibi "proje bitti" onayı verince 1 olur (1.0.0)
```

### Kurallar

| Olay | Sürüm Değişimi | Örnek |
|------|----------------|-------|
| Proje başlangıcı | — | `0.0.001` |
| Herhangi bir güncelleme | UPDATE +1 | `0.0.001` → `0.0.002` |
| Faz tamamlanması | PHASE +1, UPDATE sıfırlanır | `0.0.017` → `0.1.000` |
| Proje sahibi onayı (Proftvv) | MAJOR = 1 | `0.6.042` → `1.0.0` |

### Faz → Sürüm Eşlemesi

| Sürüm | Tamamlanan Faz |
|:---:|---|
| `0.1.x` | 🌈 BIFROST |
| `0.2.x` | 🏔️ MIDGARD |
| `0.3.x` | 👁️ HEIMDALL |
| `0.4.x` | 🏛️ VALHALLA |
| `0.5.x` | ⚜️ ODIN |
| `0.6.x` | 📜 SKALD |
| `1.0.0` | ✅ Resmi Yayın (Proftvv onayı) |

> 🐺 FENRIR (mobil) kendi sürüm hattında ilerler: `FENRIR-0.0.001`

---

## 📄 Dosya Başlık Sistemi

Projedeki her dosyanın en üstünde şu başlık bloğu bulunur:

### Markdown / HTML dosyaları
```html
<!--
  ═══════════════════════════════════════════════
  PROJECT FROSTBORN — The Nordians
  Oluşturulma   : YYYY-AA-GG
  Son Güncelleme: YYYY-AA-GG
  Dosya Sürümü  : Update N
  dev By Proftvv
  ═══════════════════════════════════════════════
-->
```

### TypeScript / JavaScript dosyaları
```ts
/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : YYYY-AA-GG
 * Son Güncelleme: YYYY-AA-GG
 * Dosya Sürümü  : Update N
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */
```

### Kurallar
1. Dosya ilk oluşturulduğunda `Update 1` ile başlar.
2. Dosyada yapılan her anlamlı değişiklikte numara **+1** artar ve `Son Güncelleme` tarihi yenilenir.
3. Başlık bloğu asla silinmez, taşınmaz.

---

## 🚨 Hata Kod Sistemi

Tüm hata kodları `FRB-[MODÜL]-[NUMARA]` formatındadır.

### Modül Kodları

| Modül | Alan | Numara Aralığı |
|-------|------|:---:|
| `FRB-SYS` | Sistem / genel | 000–099 |
| `FRB-AUTH` | Kimlik doğrulama | 100–199 |
| `FRB-DB` | Veritabanı | 200–299 |
| `FRB-API` | API katmanı | 300–399 |
| `FRB-MAIL` | E-posta (Resend) | 400–499 |
| `FRB-PANEL` | Üye paneli | 500–599 |
| `FRB-ADMIN` | Admin paneli | 600–699 |
| `FRB-FORUM` | Forum / içerik | 700–799 |
| `FRB-MEDIA` | Galeri / dosya yükleme | 800–899 |
| `FRB-MOBILE` | Mobil (FENRIR) | 900–999 |

### Temel Kodlar

| Kod | Anlam |
|-----|-------|
| `FRB-SYS-000` | Bilinmeyen hata |
| `FRB-SYS-001` | Bakım modu aktif |
| `FRB-AUTH-100` | Geçersiz kimlik bilgileri |
| `FRB-AUTH-101` | Oturum süresi doldu |
| `FRB-AUTH-102` | E-posta doğrulanmamış |
| `FRB-AUTH-103` | Yetkisiz erişim (rütbe yetersiz) |
| `FRB-AUTH-104` | Hesap askıya alınmış |
| `FRB-DB-200` | Veritabanı bağlantı hatası |
| `FRB-DB-201` | Kayıt bulunamadı |
| `FRB-DB-202` | Benzersizlik ihlali (kayıt zaten var) |
| `FRB-API-300` | Geçersiz istek gövdesi |
| `FRB-API-301` | Rate limit aşıldı |
| `FRB-MAIL-400` | E-posta gönderilemedi |
| `FRB-MAIL-401` | Geçersiz e-posta adresi |
| `FRB-PANEL-500` | Panel erişim hatası |
| `FRB-ADMIN-600` | Başvuru işlem hatası |

### Kurallar
1. Yeni hata kodu eklenirken ilgili modülün aralığındaki ilk boş numara kullanılır.
2. Bir kod bir kez tanımlandıktan sonra anlamı **asla değiştirilmez**.
3. Kullanıcıya gösterilen hata mesajlarında kod her zaman görünür olur:
   `"Bir hata oluştu. [FRB-DB-200]"`
4. Tüm kodlar bu dosyada kayıt altına alınır — kod tablosu tek doğruluk kaynağıdır.

---

<div align="center">

**Mevcut Proje Sürümü: `0.6.000`**

❄️ *dev By Proftvv* ❄️

</div>
