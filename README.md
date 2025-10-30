# Servecta - Website

Eine moderne, responsive Website für Servecta  - Spezialist für Datenschutz- und IT-Dienstleistungen aus einer Hand.

## 🚀 Features

### **Core Technologies**
- **Next.js 14** mit App Router und TypeScript
- **Tailwind CSS** mit custom dark theme und Glassmorphism-Effekten
- **shadcn/ui** Komponenten für moderne UI
- **Framer Motion** für smooth Animationen und Micro-Interactions
- **Responsive Design** für alle Geräte (Mobile-First)
- **SEO optimiert** mit Meta Tags, Open Graph und Twitter Cards
- **Deutsche Lokalisierung**

### **Advanced Features**
- **Progressive Web App (PWA)** mit Service Worker
- **Funktionales Kontaktformular** mit Multi-Provider E-Mail-Support
- **Interactive Background** mit Partikel-Effekten
- **Scroll-Reveal Animationen** für bessere UX
- **Service Calculator** für Kostenschätzungen
- **Testimonial Carousel** mit Kundenbewertungen
- **Newsletter Integration** für Marketing
- **Analytics Tracking** für Performance-Monitoring
- **Accessibility Features** für Barrierefreiheit

## 🎨 Design System

### **Farbschema**
- **Primary**: Anthracite (#0E0E12) - Dunkler Hintergrund
- **Accent**: Blue (#0070F3) - Primäre Akzentfarbe
- **Secondary**: Card/Background-Töne mit Transparenz
- **Status**: Success, Error, Warning-Farben

### **Typografie**
- **Font**: Inter für moderne, klare Darstellung
- **Hierarchie**: Hero, Display, Headline, Title, Body, Caption
- **Responsive**: Skalierbare Schriftgrößen

### **Komponenten**
- **Glassmorphism**: Moderne Glaseffekte für Cards und Navigation
- **Micro-Interactions**: Hover-Lift, Glow, Scale-Effekte
- **3D-Transforms**: Card-3D und Flip-Card-Effekte
- **Loading States**: Shimmer und Dots-Animationen

## 📱 Seitenstruktur

### **Homepage** (`/`)
- **Hero Section**: "Datenschutz- und IT-Dienstleistungen aus einer Hand"
- **Features Section**: 4 Hauptdienstleistungen mit Icons
- **Benefits Section**: Kernvorteile mit Checkmarks
- **Service Calculator**: Interaktiver Kostenschätzer
- **Testimonials**: Kundenbewertungen im Carousel
- **Modern Design Trends**: Aktuelle Design-Trends
- **Newsletter**: Anmeldung für Updates
- **CTA Section**: Call-to-Action für Kontaktaufnahme

### **Leistungen** (`/leistungen`)
- **Hauptdienstleistungen**: Datenschutz, IT-Security, Infrastruktur, Beratung
- **Zusätzliche Services**: Erweiterte Dienstleistungen
- **Pricing Section**: Transparente Preismodelle
- **FAQ Section**: Häufige Fragen und Antworten

### **Über uns** (`/ueber-uns`)
- **Mission & Vision**: Unternehmensphilosophie
- **Werte**: Sicherheit, Effizienz, Transparenz
- **Team**: Geschäftsführer-Profil mit Expertise
- **Geschichte**: Firmenentwicklung und Meilensteine
- **Zertifizierungen**: Qualifikationen und Auszeichnungen

### **Kontakt** (`/kontakt`)
- **Kontaktinformationen**: E-Mail, Telefon, Adresse, Öffnungszeiten
- **Smart Contact Form**: Funktionales Kontaktformular mit:
  - E-Mail-Validierung und Betreff-Vorschläge
  - Automatische Bestätigungs-E-Mails
  - Multi-Provider-Support (Resend, SendGrid, SMTP)
- **Kontakt-Karten**: Interaktive Kontaktoptionen

### **Rechtliche Seiten**
- **Datenschutz** (`/datenschutz`): DSGVO-konforme Datenschutzerklärung
- **Impressum** (`/impressum`): Rechtliche Informationen

## 🛠️ Installation & Setup

### **Development Setup**
```bash
# Repository klonen
git clone [repository-url]
cd servecta-website

# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Production
npm run build

# Production Server starten
npm start
```

### **E-Mail-Konfiguration**
```bash
# Umgebungsvariablen setzen (siehe env.example)
cp env.example .env.local

# E-Mail-Provider konfigurieren:
# Option 1: Resend (Empfohlen)
RESEND_API_KEY=re_your_api_key_here

# Option 2: SendGrid
SENDGRID_API_KEY=SG.your_api_key_here

# Option 3: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@servecta.de
CONTACT_EMAIL=info@servecta.de
```

## 📦 Dependencies

### **Core Dependencies**
- **Next.js 14**: React Framework mit App Router
- **TypeScript**: Type Safety und bessere DX
- **Tailwind CSS**: Utility-first CSS Framework
- **shadcn/ui**: Moderne UI-Komponenten
- **Framer Motion**: Animationen und Transitions
- **Lucide React**: Icon-System

### **Additional Dependencies**
- **nodemailer**: E-Mail-Versand für Kontaktformular
- **@radix-ui**: Accessible UI-Primitives
- **class-variance-authority**: Komponenten-Varianten

## 🎯 Brand Identity

### **Unternehmen**
- **Name**: Servecta UG (haftungsbeschränkt)
- **Claim**: "Alles aus einem Guss"
- **Zielgruppe**: Mittelständische Unternehmen & Start-ups
- **Persönlichkeit**: Modern, vertrauensvoll, effizient, sicherheitsorientiert

### **Kernkompetenzen**
- **Datenschutz & DSGVO**: Vollständige Compliance-Lösungen
- **IT-Security**: Umfassender Schutz vor Cyber-Bedrohungen
- **IT-Infrastruktur**: Skalierbare und zuverlässige Systeme
- **Strategische Beratung**: Partner für digitale Transformation

## 📧 Kontaktformular-Funktionalität

### **Technische Features**
- **Multi-Provider-Support**: Resend, SendGrid, SMTP
- **E-Mail-Templates**: Professionelle HTML-E-Mails
- **Validierung**: Client- und Server-seitige Validierung
- **Bestätigungs-E-Mails**: Automatische Kundenbestätigung
- **Fehlerbehandlung**: Umfassende Error-Handling

### **E-Mail-Flow**
1. **Kontaktanfrage** → Geschäfts-E-Mail (info@servecta.de)
2. **Bestätigung** → Kunden-E-Mail mit Zusammenfassung
3. **Logging**: Analytics für erfolgreiche Anfragen

## 🚀 Deployment

### **Vercel (Empfohlen)**
```bash
# Vercel CLI installieren
npm i -g vercel

# Deployment
vercel --prod
```

### **Netlify**
```bash
# Build erstellen
npm run build

# Netlify CLI installieren
npm i -g netlify-cli

# Deployment
netlify deploy --prod --dir=out
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance & SEO

### **Performance-Optimierungen**
- **Image Optimization**: Next.js Image-Komponente
- **Code Splitting**: Automatische Code-Aufteilung
- **Lazy Loading**: Komponenten werden bei Bedarf geladen
- **Service Worker**: Offline-Funktionalität
- **Bundle Analysis**: Optimierte Bundle-Größen

### **SEO-Features**
- **Meta Tags**: Vollständige Meta-Informationen
- **Open Graph**: Social Media Integration
- **Twitter Cards**: Twitter-Optimierung
- **Sitemap**: Automatische Sitemap-Generierung
- **Robots.txt**: Suchmaschinen-Anweisungen

## 🔧 Development

### **Code-Struktur**
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Global Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx          # Homepage
├── components/            # React Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   └── ...               # Custom Komponenten
└── lib/                  # Utilities
```

### **Styling-System**
- **Tailwind CSS**: Utility-first Styling
- **Custom CSS**: Glassmorphism und Animationen
- **CSS Variables**: Konsistente Farbpalette
- **Responsive**: Mobile-first Ansatz

## 📞 Kontakt

- **Website**: [servecta.de](https://servecta.de)
- **E-Mail**: info@servecta.de
- **Telefon**: +49 (0) 123 456789
- **Geschäftsführer**: Luca Stephan Kohls

## 📄 Lizenz

© 2025 Servecta UG (haftungsbeschränkt) i.G. Alle Rechte vorbehalten.

---

**Entwickelt mit ❤️ für moderne, sichere IT-Dienstleistungen**

## 🔐 Wartungsmodus (Passwortschutz)

Aktiviere einen globalen Passwortschutz für die gesamte Seite, z. B. während Wartungsarbeiten.

### Nutzung
1. `.env` setzen (siehe `env.example`):
   ```bash
   MAINTENANCE_MODE=true
   MAINTENANCE_PASSWORD=ein_sicheres_passwort
   ```
2. Server neu starten/deployen.
3. Beim Aufruf wird auf `/maintenance` weitergeleitet. Nach Eingabe des Passworts wird ein HttpOnly-Cookie gesetzt und der Zugriff freigeschaltet.

### Hinweise
- Statische Assets und Next-Interna bleiben zugänglich.
- Login/Logout Endpoints: `POST /api/maintenance-login`, `POST /api/maintenance-logout`.
- Cookie: `maintenance_auth` (HttpOnly, Secure, SameSite=Lax, 12h Gültigkeit).