import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaGraph, createNewsletterEmailTemplate } from '@/lib/microsoft-graph';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }, { status: 400 });
    }

    // Überprüfe Microsoft Graph Konfiguration
    if (!process.env.MICROSOFT_CLIENT_ID || !process.env.MICROSOFT_CLIENT_SECRET || !process.env.MICROSOFT_TENANT_ID) {
      return NextResponse.json(
        { 
          error: 'Microsoft Graph API nicht konfiguriert. Bitte kontaktieren Sie den Administrator.',
          debug: process.env.NODE_ENV === 'development' ? 'MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET oder MICROSOFT_TENANT_ID fehlen' : undefined
        }, 
        { status: 500 }
      );
    }

    const adminEmail = process.env.CONTACT_EMAIL || 'info@servecta.de';
    const fromEmail = process.env.MICROSOFT_FROM_EMAIL || 'info@servecta.de';

    // E-Mail-Templates erstellen
    const adminEmailHtml = createNewsletterEmailTemplate(email, false);
    const confirmationEmailHtml = createNewsletterEmailTemplate(email, true);

    // E-Mails über Microsoft Graph senden
    await Promise.all([
      sendEmailViaGraph(
        adminEmail, 
        '📬 Neue Newsletter-Anmeldung', 
        adminEmailHtml, 
        fromEmail
      ),
      sendEmailViaGraph(
        email, 
        '🎉 Willkommen im Servecta Newsletter!', 
        confirmationEmailHtml, 
        fromEmail
      ),
    ]);

    console.log(`✅ Neue Newsletter-Anmeldung über Microsoft Graph: ${email}`);

    return NextResponse.json(
      { 
        message: 'Erfolgreich für den Newsletter angemeldet! Sie erhalten in Kürze eine Willkommens-E-Mail.',
        timestamp: new Date().toISOString(),
        method: 'Microsoft Graph API'
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Fehler beim Newsletter-Abonnement über Microsoft Graph:', error);

    let errorMessage = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

    if (error instanceof Error) {
      if (error.message.includes('Microsoft Graph Authentifizierung fehlgeschlagen')) {
        errorMessage = 'E-Mail-Service-Authentifizierung fehlgeschlagen. Bitte kontaktieren Sie den Administrator.';
      } else if (error.message.includes('E-Mail-Versand fehlgeschlagen')) {
        errorMessage = 'E-Mail-Versand fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      } else if (error.message.includes('InvalidAuthenticationToken')) {
        errorMessage = 'E-Mail-Service-Token ungültig. Bitte kontaktieren Sie den Administrator.';
      } else if (error.message.includes('Insufficient privileges')) {
        errorMessage = 'E-Mail-Service-Berechtigung unzureichend. Bitte kontaktieren Sie den Administrator.';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined,
        timestamp: new Date().toISOString(),
        method: 'Microsoft Graph API'
      },
      { status: 500 }
    );
  }
}