// frontend/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/expenses') || 
                           pathname.startsWith('/subscriptions');

  // Define auth routes (where logged-in users shouldn't go)
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // Redirect Logic
  if (isProtectedRoute && !token) {
    // No token, trying to access protected route -> Redirect to Login
    console.log(`Protected route ${pathname} accessed without token, redirecting to /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && token) {
    // Has token, trying to access auth page -> Redirect to Dashboard
    console.log(`Auth route ${pathname} accessed with token, redirecting to /dashboard`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/expenses/:path*', '/subscriptions/:path*', '/login', '/register'],
};