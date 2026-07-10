import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      // GitHub's numeric user id — stable for the lifetime of the account
      if (profile?.id != null) {
        token.uid = String(profile.id);
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = (token.uid ?? token.sub) as string;
      return session;
    },
  },
});
