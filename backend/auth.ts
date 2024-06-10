import { sql } from "@vercel/postgres";
import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "@/lib/definitions";
import { authConfig } from "./auth.config";
import google from "next-auth/providers/google";

async function getUser(email: string): Promise<User> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return user.rows[0];
  } catch (error) {
    throw new Error(`Failed to fetch Users: ${error}`);
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials, request) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          console.log("users found", user);

          if (passwordMatch) return user;
        }

        console.log("invalid credentials");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig);
