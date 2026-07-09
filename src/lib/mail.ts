/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 4
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Resend ile e-posta gönderimi.
 */

import { Resend } from "resend";

const FROM = process.env.MAIL_FROM || "The Nordians <noreply@proftvv.com.tr>";

type MailResult = { ok: true } | { ok: false; error: string; reason?: string };

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendVerificationEmail(
  to: string,
  name: string,
  code: string,
): Promise<MailResult> {
  const resend = getClient();

  // Geliştirme: anahtar yoksa konsola yaz
  if (!resend) {
    console.log(`[MAIL:DEV] ${to} için doğrulama kodu: ${code}`);
    return { ok: true };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: "The Nordians — E-posta Doğrulama",
      html: `
        <div style="background:#0b0e14;color:#eceff4;padding:40px;font-family:Arial,sans-serif;border-radius:12px;max-width:480px;margin:0 auto">
          <h1 style="color:#88c0d0;letter-spacing:3px;text-align:center">THE NORDIANS</h1>
          <p>Merhaba ${name},</p>
          <p>Aramıza hoş geldin. Hesabını doğrulamak için kodun:</p>
          <p style="font-size:32px;letter-spacing:8px;text-align:center;color:#88c0d0;font-weight:bold">${code}</p>
          <p style="color:#d8dee9;font-size:13px">Bu kod 15 dakika geçerlidir. Sen istemediysen bu e-postayı yok say.</p>
          <hr style="border:none;border-top:1px solid #2e3440;margin:24px 0" />
          <p style="color:#4c566a;font-size:11px;text-align:center">The Nordians · Marmara · Çanakkale · Antalya</p>
        </div>
      `,
    });
    if (error) {
      const reason = typeof error.message === "string" ? error.message : undefined;
      if (reason?.includes("only send testing emails to your own email address")) {
        return { ok: false, error: "FRB-MAIL-402", reason };
      }
      return { ok: false, error: "FRB-MAIL-400", reason };
    }
    return { ok: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : undefined;
    if (reason?.includes("only send testing emails to your own email address")) {
      return { ok: false, error: "FRB-MAIL-402", reason };
    }
    return { ok: false, error: "FRB-MAIL-400", reason };
  }
}

export async function sendApplicationResultEmail(
  to: string,
  name: string,
  approved: boolean,
  reply: string,
): Promise<MailResult> {
  const resend = getClient();

  if (!resend) {
    console.log(`[MAIL:DEV] ${to} başvuru sonucu: ${approved ? "ONAY" : "RED"} - ${reply}`);
    return { ok: true };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: approved
        ? "The Nordians — Aramıza Hoş Geldin! ⚔"
        : "The Nordians — Başvuru Sonucun",
      html: `
        <div style="background:#0b0e14;color:#eceff4;padding:40px;font-family:Arial,sans-serif;border-radius:12px;max-width:480px;margin:0 auto">
          <h1 style="color:#88c0d0;letter-spacing:3px;text-align:center">THE NORDIANS</h1>
          <p>Merhaba ${name},</p>
          <p>${
            approved
              ? "Başvurun <b style='color:#a3be8c'>onaylandı</b>! Artık The Nordians'ın bir parçasısın. Panelinde yeni alanlar seni bekliyor."
              : "Başvurun bu sefer <b style='color:#bf616a'>olumsuz</b> sonuçlandı."
          }</p>
          <p style="background:#10141c;border-radius:8px;padding:14px;color:#d8dee9;font-size:14px"><b style="color:#88c0d0">Yönetim notu:</b><br/>${reply}</p>
          <hr style="border:none;border-top:1px solid #2e3440;margin:24px 0" />
          <p style="color:#4c566a;font-size:11px;text-align:center">The Nordians · Marmara · Çanakkale · Antalya</p>
        </div>
      `,
    });
    if (error) return { ok: false, error: "FRB-MAIL-400", reason: error.message };
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: "FRB-MAIL-400",
      reason: err instanceof Error ? err.message : undefined,
    };
  }
}
