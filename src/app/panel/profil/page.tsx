import { redirect } from "next/navigation";

export const metadata = { title: "Profil" };

export default function LegacyProfileRedirectPage() {
  redirect("/uye/profil");
}
