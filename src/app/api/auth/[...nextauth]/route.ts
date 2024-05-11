import { POST } from '@/service/HttpClient';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(token: {
  refreshToken: string;
  accessToken: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/members/issue-access-token`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          refreshToken: token.refreshToken,
        },
        method: 'POST',
      }
    );

    const { accessToken, refreshToken } = await response.json();

    if (!response.ok) {
      throw Error('[Network Error] RefreshToken 재발급 통신 에러');
    }

    return {
      ...token,
      accessToken,
      refreshToken: refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: '[Network Error] RefreshToken 재발급 통신 에러',
    };
  }
}

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
          accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
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
