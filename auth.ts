/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }

        const { username, password } = validateFields.data;

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user || !user.password) {
          throw new Error("No User found");
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return {
          ...user,
          username: user.username || "",
        };
      },
    }),
  ],
  // ini kalbek sangat anjng
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggIn = !!auth?.user;
      const ProtectedRoutes = ["/dashboard", "/ujian"];
      const userRole = auth?.user?.role;

      if (!isLoggIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (isLoggIn && nextUrl.pathname === "/") {
        const redirectUrl = userRole === "SISWA" ? "/ujian" : "/dashboard";
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      if (isLoggIn) {
        if (userRole === "SISWA" && nextUrl.pathname === "/dashboard") {
          return Response.redirect(new URL("/ujian", nextUrl));
        }

        if (userRole !== "SISWA" && nextUrl.pathname === "/ujian") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.username = token.username;
      return session;
    },
  },
});
