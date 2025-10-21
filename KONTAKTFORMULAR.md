# Kontaktformular-Konfiguration

Das Kontaktformular unterstützt mehrere E-Mail-Provider für maximale Flexibilität.

## 🚀 Schnellstart

### Option 1: Resend (Empfohlen für Production)
1. Registrieren Sie sich bei [Resend](https://resend.com)
2. Erstellen Sie einen API-Key
3. Setzen Sie die Umgebungsvariable:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```

### Option 2: SendGrid
1. Registrieren Sie sich bei [SendGrid](https://sendgrid.com)
2. Erstellen Sie einen API-Key
3. Setzen Sie die Umgebungsvariable:
   ```bash
   SENDGRID_API_KEY=SG.your_api_key_here
   ```

### Option 3: SMTP (Gmail/andere Provider)
1. Aktivieren Sie 2-Faktor-Authentifizierung in Ihrem Gmail-Account
2. Erstellen Sie ein App-Passwort
3. Setzen Sie die Umgebungsvariablen:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@servecta.de
   CONTACT_EMAIL=info@servecta.de
   ```

## 📧 E-Mail-Templates

Das System sendet automatisch:
- **Kontaktanfrage-E-Mail** an Ihre Geschäfts-E-Mail
- **Bestätigungs-E-Mail** an den Kunden

## 🔧 Lokale Entwicklung

1. Kopieren Sie `env.example` zu `.env.local`
2. Füllen Sie die E-Mail-Konfiguration aus
3. Starten Sie den Development Server:
   ```bash
   npm run dev
   ```

## 🚀 Production Deployment

### Vercel
Setzen Sie die Umgebungsvariablen in Ihrem Vercel-Dashboard unter Settings > Environment Variables.

### Netlify
Setzen Sie die Umgebungsvariablen in Ihrem Netlify-Dashboard unter Site Settings > Environment Variables.

### Andere Hosting-Provider
Konsultieren Sie die Dokumentation Ihres Hosting-Providers für die Konfiguration von Umgebungsvariablen.

## 🛡️ Sicherheit

- Alle E-Mail-Adressen werden validiert
- CSRF-Schutz ist aktiviert
- Rate-Limiting wird empfohlen (kann in der API-Route hinzugefügt werden)
- Sensible Daten werden nicht in Logs gespeichert

## 📊 Monitoring

Das System loggt erfolgreiche Anfragen für Analytics:
```
Neue Kontaktanfrage von Max Mustermann (max@example.com) - Betreff: Datenschutzberatung
```

## 🔍 Troubleshooting

### Häufige Probleme:

1. **"E-Mail konnte nicht gesendet werden"**
   - Überprüfen Sie Ihre API-Keys/Passwörter
   - Stellen Sie sicher, dass die E-Mail-Adresse gültig ist

2. **"Netzwerkfehler"**
   - Überprüfen Sie Ihre Internetverbindung
   - Überprüfen Sie die API-Endpunkte

3. **"Ungültige E-Mail-Adresse"**
   - Das System validiert E-Mail-Adressen streng
   - Verwenden Sie eine gültige E-Mail-Adresse

## 📞 Support

Bei Problemen kontaktieren Sie uns unter:
- E-Mail: info@servecta.de
- Telefon: +49 (0) 123 456789
