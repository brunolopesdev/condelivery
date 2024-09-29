import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** O token JWT retornado pela API de login */
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
  }
}
