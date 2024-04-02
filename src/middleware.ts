import { NextRequest, NextResponse } from 'next/server';

export default function Middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;
  if (!currentUser) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/my/:path*'],
};
