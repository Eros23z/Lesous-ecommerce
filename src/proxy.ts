import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminPath = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  // 🔑 EXCEPCIÓN CRÍTICA: API de login y logout
  const isAuthApi =
    path.startsWith('/api/admin/login') ||
    path.startsWith('/api/admin/logout');

  if (isAuthApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get('admin_session')?.value;

  if (isAdminPath && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

