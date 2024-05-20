import { POST } from '@/service/HttpClient';
import { refreshAccessToken } from '@/service/member';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Lingda',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { accessToken, refreshToken } = await POST({
          path: 'members/login',
          body: credentials,
        });

        if (accessToken) {
          return {
            id: accessToken,
            accessToken,
            refreshToken,
            name: credentials?.username,
            // 추후 타입 변경
            email: accessToken,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user && account) {
        return {
          ...user,
          accessTokenExpires: Date.now() + 2000000,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      const { accessToken, refreshToken, error } = await refreshAccessToken(
        token
      );

      if (error) {
        return signOut();
      }

      return {
        ...token,
        accessToken,
        refreshToken: refreshToken ?? token.refreshToken,
      };
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.name = token.name;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
      }

      return session;
    },
  },
  pages: { signIn: '/login', signOut: '/my' },
});

export { handler as GET, handler as POST };
