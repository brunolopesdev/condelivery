import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Define your NextAuth options
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
          // Use the internal API route for login
          const response = await axios.post("https://condelivery-backend.vercel.app/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = response.data;

          console.log("User:", user);

          if (user && user.token) {
            // Return the user object, including the token
            return { ...user.user, token: user.token }; // Assuming user object has user data and token
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
        token.accessToken = user.token; // Add token to the JWT
        token.user = user; // Add user data to the JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken; // Include token in session
      session.user = token.user; // Include user data in session
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

// Use the NextAuthHandler to let NextAuth handle dynamic routes
const handler = NextAuth(authOptions);

// Export POST and GET handlers
export { handler as GET, handler as POST };
