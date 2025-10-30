import { NextResponse, type NextRequest } from 'next/server';

const MAINTENANCE_COOKIE = 'maintenance_auth';

function isMaintenanceEnabled() {
  const raw = (process.env.MAINTENANCE_MODE ?? '').toString().trim().toLowerCase();
  return raw === 'true' || raw === '1' || raw === 'yes';
}

export function middleware(request: NextRequest) {
  if (!isMaintenanceEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow static assets and Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/favicon.svg') ||
    pathname.startsWith('/manifest.json') ||
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  // Allow maintenance login/logout endpoints and page
  if (
    pathname === '/maintenance' ||
    pathname.startsWith('/api/maintenance-login') ||
    pathname.startsWith('/api/maintenance-logout')
  ) {
    return NextResponse.next();
  }

  // Check cookie
  const cookie = request.cookies.get(MAINTENANCE_COOKIE)?.value;
  if (cookie && process.env.MAINTENANCE_PASSWORD && cookie === process.env.MAINTENANCE_PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to maintenance page
  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  // Catch-all; we filter assets inside the middleware
  matcher: ['/(.*)'],
};

