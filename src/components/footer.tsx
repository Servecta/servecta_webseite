import Link from 'next/link';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium">Alles aus einem Guss</span>
                <span className="text-lg font-bold text-foreground">Servecta UG (haftungsbeschränkt) i.G.</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Ihr vertrauensvoller Partner für Datenschutz- und IT-Dienstleistungen. 
              Wir bieten maßgeschneiderte Lösungen für mittelständische Unternehmen und Start-ups.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@servecta.de" className="hover:text-primary transition-colors">
                  info@servecta.de
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+49123456789" className="hover:text-primary transition-colors">
                  +49 123 456 789
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Musterstraße 123, 12345 Musterstadt</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/leistungen#datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
                  Datenschutz & DSGVO
                </Link>
              </li>
              <li>
                <Link href="/leistungen#it-security" className="text-muted-foreground hover:text-primary transition-colors">
                  IT-Security
                </Link>
              </li>
              <li>
                <Link href="/leistungen#it-infrastruktur" className="text-muted-foreground hover:text-primary transition-colors">
                  IT-Infrastruktur
                </Link>
              </li>
              <li>
                <Link href="/leistungen#beratung" className="text-muted-foreground hover:text-primary transition-colors">
                  Beratung
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-muted-foreground hover:text-primary transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Servecta UG (haftungsbeschränkt). Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a 
              href="https://servecta.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <span>servecta.de</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
