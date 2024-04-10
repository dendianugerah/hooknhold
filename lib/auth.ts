import { checkIfuserExist, createNewUser } from "@/app/util/action";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user && session.user) {
        session.user.email = user.email;
      }

      return {
        ...session,
      };
    },

    async signIn({ user }) {
      const userEmail = user?.email as string;
      const response = await checkIfuserExist(userEmail as string);

      if (response == true) {
        return true;
      } else {
        const data = {
          username: user?.name as string,
          email: user?.email as string,
          profile_image: user?.image as string,
        };
        await createNewUser(data);
        return true;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
