import { request } from '@/service/HttpClient';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Lingda',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { accessToken } = await request('members', 'POST', credentials);
        if (accessToken) return { id: accessToken, token: accessToken };
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return { ...token };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: { signIn: '/login' },
});

export { handler as GET, handler as POST };
