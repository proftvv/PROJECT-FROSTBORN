"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { MembershipStatus, Role } from "@prisma/client";
import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "@/lib/actions/admin-actions";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-lg border border-night-700/70 bg-night-900/70 px-4 py-2.5 text-sm text-snow-100 placeholder:text-snow-300/40 outline-none transition-colors focus:border-frost-ice/60";

const roleOptions: Role[] = ["NORDIAN", "UYE", "YONETICI", "BASKAN", "BASKAN_YARDIMCISI"];
const statusOptions: MembershipStatus[] = ["ACTIVE", "PENDING", "SUSPENDED"];

type Member = {
  id: string;
  name: string;
  email: string;
  callsign: string | null;
  region: string | null;
  avatarUrl: string | null;
  bio: string | null;
  weapons: string | null;
  role: Role;
  status: MembershipStatus;
  createdAt: string;
};

function MemberCard({ member }: { member: Member }) {
  const router = useRouter();
  const [name, setName] = useState(member.name);
  const [callsign, setCallsign] = useState(member.callsign ?? "");
  const [region, setRegion] = useState(member.region ?? "");
  const [avatarUrl, setAvatarUrl] = useState(member.avatarUrl ?? "");
  const [bio, setBio] = useState(member.bio ?? "");
  const [weapons, setWeapons] = useState(member.weapons ?? "");
  const [role, setRole] = useState<Role>(member.role);
  const [status, setStatus] = useState<MembershipStatus>(member.status);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await updateTeamMember({
      userId: member.id,
      name,
      callsign,
      region,
      avatarUrl,
      bio,
      weapons,
      role,
      status,
    });
    setBusy(false);
    setMsg(res.ok ? (res.message ?? "") : (res.error ?? ""));
    if (res.ok) router.refresh();
  };

  const remove = async () => {
    if (!confirm("Bu uyeyi silmek istiyor musun?")) return;
    setBusy(true);
    const res = await deleteTeamMember({ userId: member.id });
    setBusy(false);
    setMsg(res.ok ? (res.message ?? "") : (res.error ?? ""));
    if (res.ok) router.refresh();
  };

  return (
    <Card>
      <form onSubmit={save} className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad" />
          <input className={inputClass} value={callsign} onChange={(e) => setCallsign(e.target.value)} placeholder="Callsign" />
          <input className={inputClass} value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Bolge" />
          <input className={inputClass} value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Profil resmi URL" />
          <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as Role)}>{roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}</select>
          <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as MembershipStatus)}>{statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select>
        </div>
        <textarea className={inputClass} rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Kisa aciklama" />
        <input className={inputClass} value={weapons} onChange={(e) => setWeapons(e.target.value)} placeholder="Silahlar (virgulle)" />

        {msg && <p className="text-xs text-snow-300/80">{msg}</p>}

        <div className="flex gap-2">
          <Button type="submit" size="sm" disabled={busy}>{busy ? "Kaydediliyor..." : "Kaydet"}</Button>
          <Button type="button" size="sm" variant="ghost" onClick={remove} disabled={busy}>Sil</Button>
        </div>
      </form>
    </Card>
  );
}

export default function TeamMemberManager({ members }: { members: Member[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callsign, setCallsign] = useState("");
  const [region, setRegion] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [weapons, setWeapons] = useState("");
  const [role, setRole] = useState<Role>("NORDIAN");
  const [status, setStatus] = useState<MembershipStatus>("ACTIVE");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const add = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await createTeamMember({
      name,
      email,
      password,
      callsign,
      region,
      avatarUrl,
      bio,
      weapons,
      role,
      status,
    });
    setBusy(false);
    setMsg(res.ok ? (res.message ?? "") : (res.error ?? ""));
    if (res.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setCallsign("");
      setRegion("");
      setAvatarUrl("");
      setBio("");
      setWeapons("");
      setRole("NORDIAN");
      setStatus("ACTIVE");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg text-snow-100">Yeni Takim Uyesi Ekle</h2>
        <form onSubmit={add} className="mt-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad" />
            <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" />
            <input className={inputClass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Gecici sifre" />
            <input className={inputClass} value={callsign} onChange={(e) => setCallsign(e.target.value)} placeholder="Callsign" />
            <input className={inputClass} value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Bolge" />
            <input className={inputClass} value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Profil resmi URL" />
            <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as Role)}>{roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}</select>
            <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as MembershipStatus)}>{statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          </div>
          <textarea className={inputClass} rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Kisa aciklama" />
          <input className={inputClass} value={weapons} onChange={(e) => setWeapons(e.target.value)} placeholder="Silahlar (virgulle)" />
          <Button type="submit" disabled={busy}>{busy ? "Ekleniyor..." : "Uyeyi Ekle"}</Button>
        </form>
        {msg && <p className="mt-3 text-xs text-snow-300/80">{msg}</p>}
      </Card>

      <div className="space-y-3">
        {members.map((member) => <MemberCard key={member.id} member={member} />)}
      </div>
    </div>
  );
}
