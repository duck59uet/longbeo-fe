import { NextAuthConfig, Session } from 'next-auth';
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
        const user = await loginUser({
          username: credentials?.username,
          password: credentials?.password
        });

        if (user) {
          localStorage.setItem('accessToken', user?.token);
          return { ...user, token: user.token };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin'
  }
} satisfies NextAuthConfig;

export default authConfig;
