/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-09
 * Son Güncelleme: 2026-07-09
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 *
 * Auth.js (NextAuth v5) yapılandırması — Credentials + JWT.
 */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { Role, MembershipStatus } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
    status: MembershipStatus;
    callsign?: string | null;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      status: MembershipStatus;
      callsign?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/giris" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)
          ?.toLowerCase()
          .trim();
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        // FRB-AUTH-102: e-posta doğrulanmamış
        if (!user.emailVerified) throw new Error("FRB-AUTH-102");
        // FRB-AUTH-104: hesap askıya alınmış
        if (user.status === "SUSPENDED") throw new Error("FRB-AUTH-104");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          callsign: user.callsign,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.callsign = user.callsign;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      session.user.status = token.status as MembershipStatus;
      session.user.callsign = token.callsign as string | null;
      return session;
    },
  },
});
