/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-08
 * Son Güncelleme: 2026-07-08
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * İletişim formu — backend HEIMDALL fazında bağlanacak,
 * şimdilik mailto yönlendirmesi yapıyor.
 */

"use client";

import { useState, type FormEvent } from "react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/effects/Reveal";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/site-data";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <main className="flex-1">
      <PageHero
        badge="Bize Ulaş"
        title="İLETİŞİM"
        description="Başvuru, soru veya işbirliği — mesajını bekliyoruz."
      />

      <section className="pb-24">
        <Container className="max-w-2xl">
          <Reveal>
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm text-snow-300/80">
                    Adın
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Adın veya callsign'ın"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm text-snow-300/80">
                    Konu
                  </label>
                  <input
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                    placeholder="Takıma katılmak istiyorum"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm text-snow-300/80">
                    Mesajın
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={inputClass}
                    placeholder="Kendinden ve deneyiminden kısaca bahset..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Gönder
                </Button>

                <p className="text-center text-xs text-snow-300/50">
                  Mesajın e-posta istemcin üzerinden {SITE.email} adresine
                  iletilecek. Çevrimiçi başvuru sistemi yakında.
                </p>
              </form>
            </Card>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
