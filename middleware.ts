import { NextResponse, type NextRequest } from 'next/server';

const MAINTENANCE_COOKIE = 'maintenance_auth';

function isMaintenanceEnabled() {
  const raw = (process.env.MAINTENANCE_MODE ?? '').toString().trim().toLowerCase();
  return raw === 'true' || raw === '1' || raw === 'yes';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API Key Schutz für alle API-Routen
  if (pathname.startsWith('/api/')) {
    // Preflight immer durchlassen
    if (request.method === 'OPTIONS') {
      return NextResponse.next();
    }

    // Allowlist: Maintenance-Auth-Endpoints ohne API Key zulassen
    if (
      pathname.startsWith('/api/maintenance-login') ||
      pathname.startsWith('/api/maintenance-logout') ||
      // Öffentliche API-Endpunkte ohne API Key zulassen (Client-Formulare)
      pathname.startsWith('/api/contact') ||
      pathname.startsWith('/api/newsletter')
    ) {
      // durchlassen, wird separat in Maintenance-Flow geschützt
    } else {
      const configuredKey = (process.env.API_KEY ?? '').toString().trim();
      if (configuredKey) {
        const headerKey = request.headers.get('x-api-key')?.trim();
        const authHeader = request.headers.get('authorization')?.trim();

        let providedKey: string | undefined;
        if (headerKey) {
          providedKey = headerKey;
        } else if (authHeader) {
          const lowered = authHeader.toLowerCase();
          if (lowered.startsWith('bearer ')) {
            providedKey = authHeader.slice(7).trim();
          } else if (lowered.startsWith('api-key ')) {
            providedKey = authHeader.slice(8).trim();
          }
        }

        if (!providedKey || providedKey !== configuredKey) {
          return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'content-type': 'application/json' },
          });
        }
      }
      // Wenn kein API_KEY konfiguriert ist, nicht erzwingen (z.B. lokale Entwicklung)
    }
  }

  if (!isMaintenanceEnabled()) {
    return NextResponse.next();
  }

  // ab hier: Maintenance-Mode-Regeln

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

