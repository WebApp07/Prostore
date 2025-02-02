import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = await compare(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              name: user.name ?? user.email.split("@")[0], // Ensure name is never undefined
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name; // Use token.name instead of user.name

      console.log(token);

      return session;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name ?? user.email.split("@")[0]; // Ensure name is set

        // Update database if name was missing
        await prisma.user.update({
          where: { id: user.id },
          data: { name: token.name },
        });
      }
      return token;
    },
    authorized({ request, auth }: any) {
      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // Generate new sesssion cart id cookie
        const sessionCartId = crypto.randomUUID();
        //console.log(sessionCartId);
        //return true;

        // Clone the req headers.
        const newRequestHeaders = new Headers(request.headers);
        // Create new response and add the new headers.
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // Set newly generated sessionCartid in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
