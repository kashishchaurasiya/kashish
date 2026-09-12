import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies (fallback for SSR)
  const token = request.cookies.get('auth_token')?.value;
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/portal',
    '/portal/courses',
    '/portal/assignments',
    '/portal/grades',
    '/portal/fees',
    '/portal/profile',
    '/portal/calendar',
  ];
  
  // Check if the current path is a protected route (including subroutes)
  const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  // If accessing a protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // For login/register pages, let the client-side handle the logic
  // This prevents redirect loops and allows proper access to these pages
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/login',
    '/register',
  ],
}; 