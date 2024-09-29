// src/app/api/auth/authOptions.ts

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Usuário" },
        password: { label: "Password", type: "password", placeholder: "Senha" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://condelivery-backend.vercel.app/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const user = response.data;

          if (user && user.token) {
            return { ...user.user, token: user.token };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
