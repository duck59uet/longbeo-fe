import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { loginUser } from './services/login';
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}
const authConfig = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const user = await loginUser({
            username: credentials?.username as string,
            password: credentials?.password as string
          });

          if (user) {
            return { ...user, token: user.token };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
export default authConfig;
