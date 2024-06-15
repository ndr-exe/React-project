import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

let locales = ['en', 'ge'];

export async function middleware(request: NextRequest) {
  let { pathname } = request.nextUrl;
  let pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  let middlewareResponse;

  if (!cookies().get('locale')) {
    request.nextUrl.pathname = `${pathname}`;
    middlewareResponse = NextResponse.redirect(request.nextUrl);
    middlewareResponse.cookies.set('locale', 'en');
    return middlewareResponse;
  }

  if (pathnameHasLocale) {
    const locale = pathname.slice(1, 3);
    request.nextUrl.pathname = `${pathname.slice(3)}`;
    middlewareResponse = NextResponse.redirect(request.nextUrl);
    middlewareResponse.cookies.set('locale', `${locale}`);
    return middlewareResponse;
  }

  // if (pathname === '/' || pathname === '/en' || pathname === '/ge') {
  //   request.nextUrl.pathname = `/marketplace`;
  //   middlewareResponse = NextResponse.redirect(request.nextUrl);
  //   return middlewareResponse;
  // }
  // return;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
    // '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
