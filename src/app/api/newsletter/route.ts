import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaGraph, createNewsletterEmailTemplate } from '@/lib/microsoft-graph';
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
    const { email } = body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }, { status: 400 });
    }

    const adminEmail = process.env.CONTACT_EMAIL || 'info@servecta.de';
    const fromEmail = process.env.MICROSOFT_FROM_EMAIL || 'info@servecta.de';

    // E-Mail-Templates erstellen
    const adminEmailHtml = createNewsletterEmailTemplate(email, false);
    const confirmationEmailHtml = createNewsletterEmailTemplate(email, true);

    // Versuche zuerst Microsoft Graph, dann SMTP als Fallback
    let method = 'Unknown';
    let success = false;

    try {
      // Versuche Microsoft Graph
      console.log('🔄 Versuche Microsoft Graph API für Newsletter...');
      await Promise.all([
        sendEmailViaGraph(adminEmail, '📬 Neue Newsletter-Anmeldung', adminEmailHtml, fromEmail),
        sendEmailViaGraph(email, '🎉 Willkommen im Servecta Newsletter!', confirmationEmailHtml, fromEmail),
      ]);
      method = 'Microsoft Graph API';
      success = true;
      console.log('✅ Microsoft Graph API für Newsletter erfolgreich');
    } catch (graphError) {
      console.log('❌ Microsoft Graph API fehlgeschlagen, versuche SMTP...');
      console.error('Graph Error:', graphError);

      // Fallback zu SMTP
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          await Promise.all([
            sendEmailViaSMTP(adminEmail, '📬 Neue Newsletter-Anmeldung', adminEmailHtml, fromEmail),
            sendEmailViaSMTP(email, '🎉 Willkommen im Servecta Newsletter!', confirmationEmailHtml, fromEmail),
          ]);
          method = 'SMTP Fallback';
          success = true;
          console.log('✅ SMTP Fallback für Newsletter erfolgreich');
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
      console.log(`✅ Newsletter-Anmeldung erfolgreich via ${method}: ${email}`);
      
      return NextResponse.json(
        { 
          message: 'Erfolgreich für den Newsletter angemeldet! Sie erhalten in Kürze eine Willkommens-E-Mail.',
          timestamp: new Date().toISOString(),
          method: method,
          success: true
        }, 
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('❌ Alle Newsletter-E-Mail-Methoden fehlgeschlagen:', error);

    let errorMessage = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

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