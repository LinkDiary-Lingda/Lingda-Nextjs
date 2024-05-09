import { withAuth } from 'next-auth/middleware';
import { signIn } from 'next-auth/react';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: any) {
    // const currentUser = req.nextauth.token.accessToken;
    // if (currentUser && req.url.includes('/login')) {
    //   return NextResponse.redirect(new URL('/my', req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }: any) => !!token.accessToken,
    },
  }
);

export const config = { matcher: ['/my'] };
