import { NextRequest, NextResponse } from 'next/server';

// E-Mail-Service-Konfiguration (gleiche wie in contact/route.ts)
const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
};

// E-Mail-Service-Auswahl
const getEmailService = () => {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.SENDGRID_API_KEY) return 'sendgrid';
  return 'smtp';
};

// E-Mail mit verschiedenen Providern senden
async function sendEmail(to: string, subject: string, html: string, from: string) {
  const service = getEmailService();
  
  switch (service) {
    case 'resend':
      return await sendWithResend(to, subject, html, from);
    case 'sendgrid':
      return await sendWithSendGrid(to, subject, html, from);
    default:
      return await sendWithSMTP(to, subject, html, from);
  }
}

// Resend E-Mail-Service
async function sendWithResend(to: string, subject: string, html: string, from: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${emailConfig.resend.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API error: ${response.statusText}`);
  }

  return await response.json();
}

// SendGrid E-Mail-Service
async function sendWithSendGrid(to: string, subject: string, html: string, from: string) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${emailConfig.sendgrid.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid API error: ${response.statusText}`);
  }

  return await response.json();
}

// SMTP E-Mail-Service
async function sendWithSMTP(to: string, subject: string, html: string, from: string) {
  const nodemailer = await import('nodemailer');
  
  // Überprüfe ob SMTP-Credentials vorhanden sind
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP-Credentials nicht konfiguriert. Bitte setzen Sie SMTP_USER und SMTP_PASS.');
  }
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true für 465, false für andere Ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false // Für selbstsignierte Zertifikate
    }
  });
  
  // Teste die Verbindung
  try {
    await transporter.verify();
  } catch (error) {
    console.error('SMTP-Verbindung fehlgeschlagen:', error);
    throw new Error('SMTP-Server-Verbindung fehlgeschlagen. Bitte überprüfen Sie Ihre SMTP-Konfiguration.');
  }
  
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

    // Validierung
    if (!email) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    const fromEmail = process.env.SMTP_FROM || 'noreply@servecta.de';
    const adminEmail = process.env.CONTACT_EMAIL || 'info@servecta.de';

    // Newsletter-Anmeldung an Admin senden
    const adminMailOptions = {
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0070F3;">Neue Newsletter-Anmeldung</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Anmeldedatum:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
            <p><strong>Anmeldezeit:</strong> ${new Date().toLocaleTimeString('de-DE')}</p>
          </div>
          <p style="color: #666; font-size: 14px;">
            Diese Newsletter-Anmeldung wurde über die Website servecta.de durchgeführt.
          </p>
        </div>
      `,
    };

    // Bestätigungs-E-Mail an den Kunden senden
    const confirmationMailOptions = {
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0070F3;">Newsletter-Anmeldung erfolgreich!</h1>
          </div>
          
          <p>Hallo,</p>
          
          <p>vielen Dank für Ihre Anmeldung zu unserem Newsletter! Wir freuen uns, Sie über die neuesten Entwicklungen bei Servecta informieren zu können.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0070F3; margin-top: 0;">Was Sie erwartet:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Exklusive Einblicke in unsere Dienstleistungen</li>
              <li>Neueste Entwicklungen im Datenschutz und IT-Security</li>
              <li>Praktische Tipps und Best Practices</li>
              <li>Frühe Informationen über neue Services</li>
              <li>Einladungen zu Webinaren und Events</li>
            </ul>
          </div>
          
          <div style="background: #0070F3; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <h3 style="margin-top: 0;">Ihr Team von Servecta UG (haftungsbeschränkt) i.G.</h3>
            <p style="margin-bottom: 0;">
              Datenschutz- und IT-Dienstleistungen aus einer Hand
            </p>
          </div>
          
          <p style="color: #666; font-size: 12px;">
            Falls Sie diesen Newsletter nicht mehr erhalten möchten, können Sie sich jederzeit über den Abmelde-Link in unseren E-Mails abmelden.
          </p>
        </div>
      `,
    };

    // E-Mails senden
    await Promise.all([
      sendEmail(adminEmail, 'Neue Newsletter-Anmeldung', adminMailOptions.html, fromEmail),
      sendEmail(email, 'Newsletter-Anmeldung bestätigt - Servecta', confirmationMailOptions.html, fromEmail),
    ]);

    // Log für Analytics
    console.log(`Neue Newsletter-Anmeldung: ${email}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Newsletter-Anmeldung erfolgreich!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fehler beim Senden der Newsletter-E-Mail:', error);
    
    return NextResponse.json(
      { 
        error: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' 
      },
      { status: 500 }
    );
  }
}
