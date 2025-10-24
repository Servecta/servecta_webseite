import { NextRequest, NextResponse } from 'next/server';

// E-Mail-Service-Konfiguration
const emailConfig = {
  // SMTP-Konfiguration
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  // SendGrid-Konfiguration
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
  // Resend-Konfiguration
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
    const { name, email, subject, message } = body;

    // Validierung
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
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

    // E-Mail an Servecta senden
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@servecta.de',
      to: process.env.CONTACT_EMAIL || 'info@servecta.de',
      subject: `Neue Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0070F3;">Neue Kontaktanfrage von der Website</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Betreff:</strong> ${subject}</p>
            <p><strong>Nachricht:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0070F3;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            Diese Nachricht wurde über das Kontaktformular auf servecta.de gesendet.
          </p>
        </div>
      `,
    };

    // Bestätigungs-E-Mail an den Kunden senden
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM || 'noreply@servecta.de',
      to: email,
      subject: 'Bestätigung Ihrer Anfrage - Servecta UG (haftungsbeschränkt) i.G.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0070F3;">Vielen Dank für Ihre Anfrage!</h1>
          </div>
          
          <p>Hallo ${name},</p>
          
          <p>vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0070F3; margin-top: 0;">Ihre Anfrage im Überblick:</h3>
            <p><strong>Betreff:</strong> ${subject}</p>
            <p><strong>Nachricht:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0070F3;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <h3 style="color: #0070F3;">Was passiert als nächstes?</h3>
          <ul>
            <li>Wir prüfen Ihre Anfrage innerhalb von 24 Stunden</li>
            <li>Ein Experte aus unserem Team meldet sich bei Ihnen</li>
            <li>Wir besprechen Ihre Anforderungen und Lösungsmöglichkeiten</li>
          </ul>
          
          <p>Bei dringenden Anfragen erreichen Sie uns auch telefonisch unter <strong>+49 (0) 123 456789</strong>.</p>
          
          <div style="background: #0070F3; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <h3 style="margin-top: 0;">Ihr Team von Servecta UG (haftungsbeschränkt) i.G.</h3>
            <p style="margin-bottom: 0;">
              Datenschutz- und IT-Dienstleistungen aus einer Hand
            </p>
          </div>
          
          <p style="color: #666; font-size: 12px;">
            Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
          </p>
        </div>
      `,
    };

    // E-Mails senden
    const fromEmail = process.env.SMTP_FROM || 'noreply@servecta.de';
    const contactEmail = process.env.CONTACT_EMAIL || 'info@servecta.de';

    await Promise.all([
      sendEmail(contactEmail, `Neue Kontaktanfrage: ${subject}`, mailOptions.html, fromEmail),
      sendEmail(email, 'Bestätigung Ihrer Anfrage - Servecta UG (haftungsbeschränkt) i.G.', confirmationMailOptions.html, fromEmail),
    ]);

    // Log für Analytics (optional)
    console.log(`Neue Kontaktanfrage von ${name} (${email}) - Betreff: ${subject}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Ihre Nachricht wurde erfolgreich gesendet!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    
    // Detaillierte Fehlermeldung für Debugging
    let errorMessage = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.';
    
    if (error instanceof Error) {
      if (error.message.includes('SMTP-Credentials nicht konfiguriert')) {
        errorMessage = 'E-Mail-Service nicht konfiguriert. Bitte kontaktieren Sie den Administrator.';
      } else if (error.message.includes('SMTP-Server-Verbindung fehlgeschlagen')) {
        errorMessage = 'E-Mail-Server-Verbindung fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      } else if (error.message.includes('EAUTH')) {
        errorMessage = 'E-Mail-Authentifizierung fehlgeschlagen. Bitte kontaktieren Sie den Administrator.';
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
