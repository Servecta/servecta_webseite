import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaGraph, createContactEmailTemplate } from '@/lib/microsoft-graph';
import * as nodemailer from 'nodemailer';

// SMTP Fallback-Konfiguration
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// E-Mail über SMTP senden (Fallback)
async function sendEmailViaSMTP(to: string, subject: string, html: string, from: string) {
  const transporter = nodemailer.createTransport(smtpConfig);
  
  return await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}

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

    const contactEmail = process.env.CONTACT_EMAIL || 'info@servecta.de';
    const fromEmail = process.env.MICROSOFT_FROM_EMAIL || 'info@servecta.de';

    // E-Mail-Templates erstellen
    const adminEmailHtml = createContactEmailTemplate(name, email, subject, message, false);
    const confirmationEmailHtml = createContactEmailTemplate(name, email, subject, message, true);

    // Versuche zuerst Microsoft Graph, dann SMTP als Fallback
    let method = 'Unknown';
    let success = false;

    try {
      // Versuche Microsoft Graph
      console.log('🔄 Versuche Microsoft Graph API...');
      await Promise.all([
        sendEmailViaGraph(contactEmail, `🔔 Neue Kontaktanfrage: ${subject}`, adminEmailHtml, fromEmail),
        sendEmailViaGraph(email, '✅ Bestätigung Ihrer Anfrage - Servecta UG (haftungsbeschränkt) i.G.', confirmationEmailHtml, fromEmail),
      ]);
      method = 'Microsoft Graph API';
      success = true;
      console.log('✅ Microsoft Graph API erfolgreich');
    } catch (graphError) {
      console.log('❌ Microsoft Graph API fehlgeschlagen, versuche SMTP...');
      console.error('Graph Error:', graphError);

      // Fallback zu SMTP
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          await Promise.all([
            sendEmailViaSMTP(contactEmail, `🔔 Neue Kontaktanfrage: ${subject}`, adminEmailHtml, fromEmail),
            sendEmailViaSMTP(email, '✅ Bestätigung Ihrer Anfrage - Servecta UG (haftungsbeschränkt) i.G.', confirmationEmailHtml, fromEmail),
          ]);
          method = 'SMTP Fallback';
          success = true;
          console.log('✅ SMTP Fallback erfolgreich');
        } catch (smtpError) {
          console.error('❌ SMTP Fallback fehlgeschlagen:', smtpError);
          throw smtpError;
        }
      } else {
        console.log('❌ Keine SMTP-Konfiguration vorhanden');
        throw graphError;
      }
    }

    if (success) {
      console.log(`✅ Kontaktanfrage erfolgreich gesendet via ${method}: ${name} (${email})`);
      
      return NextResponse.json(
        {
          message: 'Ihre Nachricht wurde erfolgreich gesendet! Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
          timestamp: new Date().toISOString(),
          method: method,
          success: true
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('❌ Alle E-Mail-Methoden fehlgeschlagen:', error);

    // Detaillierte Fehlermeldung für Debugging
    let errorMessage = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.';

    if (error instanceof Error) {
      if (error.message.includes('Microsoft Graph')) {
        errorMessage = 'E-Mail-Service temporär nicht verfügbar. Bitte versuchen Sie es später erneut.';
      } else if (error.message.includes('SMTP')) {
        errorMessage = 'E-Mail-Server-Verbindung fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      } else if (error.message.includes('Authentication')) {
        errorMessage = 'E-Mail-Authentifizierung fehlgeschlagen. Bitte kontaktieren Sie den Administrator.';
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined,
        timestamp: new Date().toISOString(),
        method: 'Hybrid (Graph + SMTP)',
        success: false
      },
      { status: 500 }
    );
  }
}