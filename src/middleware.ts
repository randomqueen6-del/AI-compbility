import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales, isValidLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get locale from cookie or use default
  const locale = request.cookies.get('locale')?.value || defaultLocale;
  const validLocale = isValidLocale(locale) ? locale : defaultLocale;

  // For default locale (Japanese), don't add prefix - just continue
  if (validLocale === defaultLocale) {
    return NextResponse.next();
  }

  // For non-default locales, redirect to locale-prefixed URL
  const newUrl = new URL(`/${validLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, favicon, etc.)
    '/((?!_next|api|favicon.ico|locales|.*\\.).*)',
  ],
};
