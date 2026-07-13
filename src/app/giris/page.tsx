"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setBusy(false);
    if (res?.error) {
      setError("Giris basarisiz. [FRB-AUTH-100]");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex-1">
      <PageHero
        badge="Yonetim"
        title="ADMIN GIRISI"
        description="Genel admin paneline erisim icin giris yapin."
      />

      <section className="pb-24">
        <Container className="max-w-md">
          <Card>
            {error && <p className="mb-4 rounded-lg bg-aurora-red/10 px-4 py-2.5 text-sm text-aurora-red">{error}</p>}
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="E-posta" autoComplete="email" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Sifre" autoComplete="current-password" />
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "Giris yapiliyor..." : "Giris Yap"}</Button>
            </form>
          </Card>
        </Container>
      </section>
    </main>
  );
}
