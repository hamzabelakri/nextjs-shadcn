import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get('jwt_token')?.value;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/sign-in', '/register', '/reset-password', '/'];
  
  // Check if the path is in public paths
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  // If no token and trying to access a protected route, redirect to sign-in
  if (!token && !isPublicPath) {
    const signInUrl = new URL('/sign-in', request.url);
    
    // Add the original URL as a callback parameter
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // If has token and trying to access sign-in page, redirect to dashboard
  if (token && request.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure matcher for paths that should trigger this middleware
export const config = {
  matcher: [
    // Exclude files with extension and api routes
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)',
  ],
};
