import { NextRequest, NextResponse } from 'next/server';

export default function Middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;
  console.log(currentUser);

  if (!currentUser) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/my/:path*'],
};
