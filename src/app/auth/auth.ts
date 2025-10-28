import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../lib/zod";
import { getUserFromDb } from "../actions/getUserFromDb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "username", type: "string" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.username || !credentials.password) {
            throw new Error("Имя и пароль обязательны!");
          }

          const { username, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserFromDb(username);

          if (!user) {
            throw new Error("Неверные данные");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Неверный ввод данных!");
          }

          return { id: user.id, username: user.username };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/pages/profile`; 
    },
  },
});
