import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaGraph, createContactEmailTemplate } from '@/lib/microsoft-graph';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Einfache Validierung
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
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

    const contactEmail = process.env.CONTACT_EMAIL || 'info@servecta.de';
    const fromEmail = process.env.MICROSOFT_FROM_EMAIL || 'info@servecta.de';

    // E-Mail-Templates erstellen
    const adminEmailHtml = createContactEmailTemplate(name, email, subject, message, false);
    const confirmationEmailHtml = createContactEmailTemplate(name, email, subject, message, true);

    // E-Mails über Microsoft Graph senden
    await Promise.all([
      sendEmailViaGraph(
        contactEmail, 
        `🔔 Neue Kontaktanfrage: ${subject}`, 
        adminEmailHtml, 
        fromEmail
      ),
      sendEmailViaGraph(
        email, 
        '✅ Bestätigung Ihrer Anfrage - Servecta UG (haftungsbeschränkt) i.G.', 
        confirmationEmailHtml, 
        fromEmail
      ),
    ]);

    // Log für Analytics
    console.log(`✅ Neue Kontaktanfrage über Microsoft Graph gesendet: ${name} (${email}) - Betreff: ${subject}`);

    return NextResponse.json(
      {
        message: 'Ihre Nachricht wurde erfolgreich gesendet! Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
        timestamp: new Date().toISOString(),
        method: 'Microsoft Graph API'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Fehler beim Senden der E-Mail über Microsoft Graph:', error);

    // Detaillierte Fehlermeldung für Debugging
    let errorMessage = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.';

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