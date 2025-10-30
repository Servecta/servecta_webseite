import { NextResponse } from 'next/server';

const MAINTENANCE_COOKIE = 'maintenance_auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(MAINTENANCE_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}


