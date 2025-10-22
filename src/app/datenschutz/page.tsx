import { Shield, FileText, Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Datenschutzerklärung - Servecta UG (haftungsbeschränkt) i.G.',
  description: 'Datenschutzerklärung der Servecta UG (haftungsbeschränkt) i.G. gemäß DSGVO',
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-xl text-muted-foreground">
            Servecta UG (haftungsbeschränkt) i.G. - Stand: {new Date().toLocaleDateString('de-DE')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-foreground">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Verantwortlicher</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Servecta UG (haftungsbeschränkt) i.G.</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Musterstraße 123, 12345 Musterstadt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+49 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@servecta.de</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
            <p className="text-muted-foreground mb-4">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Diese Datenschutzerklärung 
              informiert Sie über Art, Umfang und Zweck der Verarbeitung von personenbezogenen Daten durch 
              die Servecta UG (haftungsbeschränkt) i.G..
            </p>
            <p className="text-muted-foreground">
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Datenerfassung auf unserer Website</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Server-Log-Dateien</h3>
            <p className="text-muted-foreground mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="text-muted-foreground">
              Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten 
              mit anderen Datenquellen wird nicht vorgenommen.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Kontaktformular</h3>
            <p className="text-muted-foreground mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
            <p className="text-muted-foreground">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät 
              gespeichert werden und die Ihr Browser erstellt. Sie dienen dazu, unser Angebot 
              nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
            <p className="text-muted-foreground">
              Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer 
              Browser-Software verhindern; wir weisen jedoch darauf hin, dass Sie in diesem Fall 
              gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich nutzen können.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Ihre Rechte</h2>
            <p className="text-muted-foreground mb-4">
              Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            </ul>
            <p className="text-muted-foreground">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: info@servecta.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Datensicherheit</h2>
            <p className="text-muted-foreground mb-4">
              Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) 
              in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.
            </p>
            <p className="text-muted-foreground">
              Wir treffen angemessene technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten 
              gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, 
              Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p className="text-muted-foreground">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand vom {new Date().toLocaleDateString('de-DE')}. 
              Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher 
              beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
            </p>
          </section>

          <div className="bg-card p-6 rounded-lg border border-border mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-3">Kontakt</h3>
            <p className="text-muted-foreground mb-2">
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:
            </p>
            <div className="flex items-center space-x-2 text-primary">
              <Mail className="h-4 w-4" />
              <span>datenschutz@servecta.de</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
