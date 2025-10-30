import { NextResponse } from 'next/server';

const MAINTENANCE_COOKIE = 'maintenance_auth';

export async function POST(request: Request) {
  try {
    const { password } = (await request.json().catch(() => ({}))) as { password?: string };
    const expected = process.env.MAINTENANCE_PASSWORD;

    if (!expected) {
      return NextResponse.json({ message: 'Server ist nicht konfiguriert.' }, { status: 500 });
    }

    if (!password || password !== expected) {
      return NextResponse.json({ message: 'Passwort ist falsch.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    // HttpOnly for security, path=/, maxAge 12h
    response.cookies.set(MAINTENANCE_COOKIE, expected, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (err) {
    return NextResponse.json({ message: 'Unbekannter Fehler.' }, { status: 500 });
  }
}


