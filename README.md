# PROJECT FROSTBORN

The Nordians resmi web sitesi.

## Kapsam
Bu repository artik sadece su alanlari icerir:
- Anasayfa
- Hakkimizda
- Takimimiz
- Kurallarimiz
- Genel Admin Paneli (`/admin`) ve takim kisi yonetimi (`/admin/uyeler`)

Bu repo disindaki gelistirmeler ve diger proje ayrimi bu repository kapsaminda belgelenmez.

## Sayfalar
- `/`
- `/hakkimizda`
- `/takimimiz`
- `/kurallarimiz`
- `/giris`
- `/admin`
- `/admin/uyeler`

## Admin Paneli
Admin paneli ile su islemler yapilir:
- Takima kisi ekleme
- Takimdaki kisi bilgilerini guncelleme
- Kisi silme
- Callsign, aciklama, silah bilgileri ve fotograf URL yonetimi

## Teknoloji
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (Neon)
- Auth.js (NextAuth)

## Gelistirme
```bash
npm install
npm run build
```

## Not
Bu repo The Nordians web sitesi icin sadelestirilmistir. Diger proje ayrimi bu repoda yer almaz.
