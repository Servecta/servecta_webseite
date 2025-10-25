import { Client } from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';
import 'isomorphic-fetch';

// Microsoft Graph Konfiguration
const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
  },
};

// MSAL App-Instanz
const msalInstance = new ConfidentialClientApplication(msalConfig);

// Microsoft Graph Client-Instanz
let graphClient: Client | null = null;

// Authentifizierung mit Microsoft Graph
async function getAuthenticatedClient(): Promise<Client> {
  if (graphClient) {
    return graphClient;
  }

  try {
    // Client Credentials Flow für App-zu-App-Authentifizierung
    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
    };

    const response = await msalInstance.acquireTokenByClientCredential(clientCredentialRequest);
    
    if (!response || !response.accessToken) {
      throw new Error('Kein Access Token erhalten');
    }
    
    // Graph Client mit Access Token initialisieren
    graphClient = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          return response.accessToken!;
        },
      },
    });

    return graphClient;
  } catch (error) {
    console.error('Fehler bei der Microsoft Graph Authentifizierung:', error);
    throw new Error('Microsoft Graph Authentifizierung fehlgeschlagen');
  }
}

// E-Mail über Microsoft Graph senden
export async function sendEmailViaGraph(
  to: string,
  subject: string,
  htmlContent: string,
  fromEmail?: string
): Promise<void> {
  try {
    const client = await getAuthenticatedClient();
    
    // Standard-Absender-E-Mail
    const senderEmail = fromEmail || process.env.MICROSOFT_FROM_EMAIL || process.env.MICROSOFT_CLIENT_ID || 'noreply@servecta.de';
    
    console.log(`📧 Versuche E-Mail zu senden:`);
    console.log(`   Von: ${senderEmail}`);
    console.log(`   An: ${to}`);
    console.log(`   Betreff: ${subject}`);
    
    // E-Mail-Nachricht erstellen
    const message = {
      message: {
        subject: subject,
        body: {
          contentType: 'HTML' as const,
          content: htmlContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
        from: {
          emailAddress: {
            address: senderEmail,
          },
        },
      },
      saveToSentItems: true,
    };

    // E-Mail senden
    const response = await client.api(`/users/${senderEmail}/sendMail`).post(message);
    
    console.log(`✅ E-Mail erfolgreich über Microsoft Graph gesendet an: ${to}`);
    console.log(`📊 Response:`, response);
    
  } catch (error) {
    const sender = fromEmail || process.env.MICROSOFT_FROM_EMAIL || 'noreply@servecta.de';
    
    console.error(`❌ Fehler beim Senden der E-Mail über Microsoft Graph:`);
    console.error(`   Von: ${sender}`);
    console.error(`   An: ${to}`);
    console.error(`   Fehler:`, error);
    
    // Detaillierte Fehleranalyse
    if (error instanceof Error) {
      if (error.message.includes('Forbidden')) {
        throw new Error(`E-Mail-Versand verweigert: Die App hat keine Berechtigung, E-Mails von ${sender} zu senden. Bitte überprüfen Sie die Microsoft Graph Berechtigungen.`);
      } else if (error.message.includes('BadRequest')) {
        throw new Error(`Ungültige E-Mail-Anfrage: Bitte überprüfen Sie die E-Mail-Adressen und das Format.`);
      } else if (error.message.includes('NotFound')) {
        throw new Error(`Sender-E-Mail nicht gefunden: ${sender} existiert nicht oder ist nicht für E-Mail-Versand konfiguriert.`);
      } else if (error.message.includes('Unauthorized')) {
        throw new Error(`Authentifizierung fehlgeschlagen: Microsoft Graph Token ungültig oder abgelaufen.`);
      }
    }
    
    throw new Error(`E-Mail-Versand fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
  }
}

// E-Mail mit Anhang senden (für erweiterte Funktionen)
export async function sendEmailWithAttachment(
  to: string,
  subject: string,
  htmlContent: string,
  attachments?: Array<{
    name: string;
    contentType: string;
    contentBytes: string; // Base64-encoded content
  }>,
  fromEmail?: string
): Promise<void> {
  try {
    const client = await getAuthenticatedClient();
    
    const senderEmail = fromEmail || process.env.MICROSOFT_FROM_EMAIL || process.env.MICROSOFT_CLIENT_ID || 'noreply@servecta.de';
    
    const message: {
      message: {
        subject: string;
        body: {
          contentType: 'HTML';
          content: string;
        };
        toRecipients: Array<{
          emailAddress: {
            address: string;
          };
        }>;
        from: {
          emailAddress: {
            address: string;
          };
        };
        attachments?: Array<{
          '@odata.type': string;
          name: string;
          contentType: string;
          contentBytes: string;
        }>;
      };
      saveToSentItems: boolean;
    } = {
      message: {
        subject: subject,
        body: {
          contentType: 'HTML' as const,
          content: htmlContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
        from: {
          emailAddress: {
            address: senderEmail,
          },
        },
      },
      saveToSentItems: true,
    };

    // Anhänge hinzufügen falls vorhanden
    if (attachments && attachments.length > 0) {
      message.message.attachments = attachments.map(attachment => ({
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: attachment.name,
        contentType: attachment.contentType,
        contentBytes: attachment.contentBytes,
      }));
    }

    await client.api(`/users/${senderEmail}/sendMail`).post(message);

    console.log(`E-Mail mit Anhang erfolgreich über Microsoft Graph gesendet an: ${to}`);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail mit Anhang über Microsoft Graph:', error);
    throw new Error(`E-Mail-Versand mit Anhang fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
  }
}

// E-Mail-Template für Kontaktanfragen
export function createContactEmailTemplate(
  name: string,
  email: string,
  subject: string,
  message: string,
  isConfirmation: boolean = false
): string {
  if (isConfirmation) {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #0070F3 0%, #0051CC 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Vielen Dank für Ihre Anfrage!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Servecta UG (haftungsbeschränkt) i.G.</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Hallo ${name},
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
          </p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #0070F3; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="color: #0070F3; margin: 0 0 10px 0; font-size: 18px;">Ihre Nachricht:</h3>
            <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background-color: #e8f4fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #0070F3; margin: 0 0 15px 0; font-size: 18px;">📋 Ihre Anfrage-Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #333333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">E-Mail:</td>
                <td style="padding: 8px 0; color: #333333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">Betreff:</td>
                <td style="padding: 8px 0; color: #333333;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Wir werden Ihre Anfrage innerhalb von 24 Stunden bearbeiten und uns bei Ihnen melden.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://servecta.de/kontakt" style="background: #0070F3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              Zur Website
            </a>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            <strong>Servecta UG (haftungsbeschränkt) i.G.</strong><br>
            Datenschutz- und IT-Dienstleistungen aus einer Hand<br>
            <a href="mailto:info@servecta.de" style="color: #0070F3;">info@servecta.de</a> | 
            <a href="https://servecta.de" style="color: #0070F3;">servecta.de</a>
          </p>
        </div>
      </div>
    `;
  } else {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🔔 Neue Kontaktanfrage</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Servecta Website</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #dc3545; margin: 0 0 15px 0; font-size: 18px;">📋 Kontaktanfrage-Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #333333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">E-Mail:</td>
                <td style="padding: 8px 0; color: #333333;">
                  <a href="mailto:${email}" style="color: #0070F3;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">Betreff:</td>
                <td style="padding: 8px 0; color: #333333;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">Zeitstempel:</td>
                <td style="padding: 8px 0; color: #333333;">${new Date().toLocaleString('de-DE')}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 18px;">💬 Nachricht:</h3>
            <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background-color: #d1ecf1; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin: 0 0 15px 0; font-size: 18px;">⚡ Nächste Schritte:</h3>
            <ul style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Kontaktanfrage innerhalb von 24 Stunden bearbeiten</li>
              <li>Kunde über E-Mail kontaktieren: <a href="mailto:${email}" style="color: #0070F3;">${email}</a></li>
              <li>Anfrage im CRM-System erfassen</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            <strong>Servecta UG (haftungsbeschränkt) i.G.</strong><br>
            Diese E-Mail wurde automatisch über das Kontaktformular generiert.
          </p>
        </div>
      </div>
    `;
  }
}

// E-Mail-Template für Newsletter-Anmeldungen
export function createNewsletterEmailTemplate(
  email: string,
  isConfirmation: boolean = false
): string {
  if (isConfirmation) {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🎉 Willkommen im Newsletter!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Servecta UG (haftungsbeschränkt) i.G.</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Vielen Dank für Ihre Newsletter-Anmeldung!
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Sie erhalten ab sofort die neuesten Updates, Tipps und exklusive Einblicke zu Datenschutz und IT-Security direkt in Ihr Postfach.
          </p>
          
          <div style="background-color: #e8f5e8; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #28a745; margin: 0 0 15px 0; font-size: 18px;">📧 Was Sie erwartet:</h3>
            <ul style="color: #155724; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Monatliche Updates zu Datenschutz und DSGVO</li>
              <li>IT-Security Tipps und Best Practices</li>
              <li>Exklusive Einblicke in unsere Projekte</li>
              <li>Früher Zugang zu neuen Dienstleistungen</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://servecta.de" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              Website besuchen
            </a>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            <strong>Servecta UG (haftungsbeschränkt) i.G.</strong><br>
            Datenschutz- und IT-Dienstleistungen aus einer Hand<br>
            <a href="mailto:info@servecta.de" style="color: #0070F3;">info@servecta.de</a> | 
            <a href="https://servecta.de" style="color: #0070F3;">servecta.de</a>
          </p>
        </div>
      </div>
    `;
  } else {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">📬 Neue Newsletter-Anmeldung</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Servecta Website</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #17a2b8; margin: 0 0 15px 0; font-size: 18px;">📋 Newsletter-Anmeldung:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600; width: 120px;">E-Mail:</td>
                <td style="padding: 8px 0; color: #333333;">
                  <a href="mailto:${email}" style="color: #0070F3;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">Zeitstempel:</td>
                <td style="padding: 8px 0; color: #333333;">${new Date().toLocaleString('de-DE')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; font-weight: 600;">Status:</td>
                <td style="padding: 8px 0; color: #28a745; font-weight: 600;">✅ Erfolgreich angemeldet</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #d1ecf1; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin: 0 0 15px 0; font-size: 18px;">📈 Nächste Schritte:</h3>
            <ul style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>E-Mail-Adresse in Newsletter-System erfassen</li>
              <li>Willkommens-E-Mail an Abonnent senden</li>
              <li>Segmentierung für zielgerichtete Inhalte prüfen</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            <strong>Servecta UG (haftungsbeschränkt) i.G.</strong><br>
            Diese E-Mail wurde automatisch über die Newsletter-Anmeldung generiert.
          </p>
        </div>
      </div>
    `;
  }
}
