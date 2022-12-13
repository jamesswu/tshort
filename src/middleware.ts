// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  // if root route then go to root route
  if (req.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // ignore if trying to go down api route
  if (req.nextUrl.pathname.startsWith('/api')) {
    console.log('returning early');
    return;
  }

  // otherwise get slug and search db, if found then redirect
  const slug = req.nextUrl.pathname.split('/').pop();
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/short/${slug}`);
    const result = await response.json();
    if (result?.url) {
      return NextResponse.redirect(result.url);
    }
  } catch (e) {
    console.error(e);
    return;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}