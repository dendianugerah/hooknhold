import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

console.log("Debug lib/auth.ts, secret:", process.env.NEXTAUTH_SECRET);
