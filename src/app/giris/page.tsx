/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 2
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Giriş / Kayıt / E-posta doğrulama — Heimdall'ın kapısı.
 */

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { registerUser, verifyEmail } from "@/lib/actions/auth-actions";

type Mode = "login" | "register" | "verify";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

const AUTH_ERRORS: Record<string, string> = {
  "FRB-AUTH-102": "E-postanı henüz doğrulamamışsın. [FRB-AUTH-102]",
  "FRB-AUTH-104": "Hesabın askıya alınmış. Yönetimle iletişime geç. [FRB-AUTH-104]",
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
    setInfo("");
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      const known = Object.keys(AUTH_ERRORS).find((k) =>
        res.code?.includes(k),
      );
      if (known === "FRB-AUTH-102") {
        setInfo("Önce e-postanı doğrulaman gerekiyor.");
        switchMode("verify");
        return;
      }
      setError(
        known
          ? AUTH_ERRORS[known]
          : "E-posta veya şifre hatalı. [FRB-AUTH-100]",
      );
      return;
    }

    router.push("/panel");
    router.refresh();
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await registerUser({ name, email, password });
    setLoading(false);

    if (!res.ok) {
      setError(res.error ?? "Bilinmeyen hata. [FRB-SYS-000]");
      return;
    }
    setInfo(res.message ?? "");
    switchMode("verify");
    setInfo(res.message ?? "");
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await verifyEmail({ email, code });
    setLoading(false);

    if (!res.ok) {
      setError(res.error ?? "Bilinmeyen hata. [FRB-SYS-000]");
      return;
    }
    setInfo(res.message ?? "");
    switchMode("login");
    setInfo(res.message ?? "");
  };

  return (
    <main className="flex-1">
      <PageHero
        badge="Üye Kapısı"
        title={mode === "register" ? "KAYIT OL" : mode === "verify" ? "DOĞRULAMA" : "GİRİŞ"}
        description={
          mode === "verify"
            ? "E-postana gelen 6 haneli kodu gir."
            : "Heimdall kapıda — kimliğini göster."
        }
      />

      <section className="pb-24">
        <Container className="max-w-md">
          <Card>
            {/* Sekmeler */}
            {mode !== "verify" && (
              <div className="mb-6 flex gap-1 rounded-lg bg-night-900/70 p-1">
                {(["login", "register"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors cursor-pointer ${
                      mode === m
                        ? "bg-night-700/80 text-frost-ice"
                        : "text-snow-300/60 hover:text-snow-100"
                    }`}
                  >
                    {m === "login" ? "Giriş Yap" : "Kayıt Ol"}
                  </button>
                ))}
              </div>
            )}

            {/* Bildirimler */}
            <AnimatePresence mode="wait">
              {(error || info) && (
                <motion.p
                  key={error || info}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-4 rounded-lg px-4 py-2.5 text-sm ${
                    error
                      ? "bg-aurora-red/10 text-aurora-red"
                      : "bg-aurora-green/10 text-aurora-green"
                  }`}
                >
                  {error || info}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Giriş */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="E-posta"
                  autoComplete="email"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="Şifre"
                  autoComplete="current-password"
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Kapı açılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            )}

            {/* Kayıt */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Ad Soyad"
                  autoComplete="name"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="E-posta"
                  autoComplete="email"
                />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="Şifre (en az 8 karakter)"
                  autoComplete="new-password"
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Kaydediliyor..." : "Kayıt Ol"}
                </Button>
              </form>
            )}

            {/* Doğrulama */}
            {mode === "verify" && (
              <form onSubmit={handleVerify} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="E-posta"
                />
                <input
                  required
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`${inputClass} text-center text-2xl tracking-[0.5em]`}
                  placeholder="······"
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Doğrulanıyor..." : "Doğrula"}
                </Button>
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="w-full text-center text-xs text-snow-300/50 hover:text-snow-100"
                >
                  ← Girişe dön
                </button>
              </form>
            )}
          </Card>
        </Container>
      </section>
    </main>
  );
}
