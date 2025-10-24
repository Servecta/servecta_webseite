import { FileText, Mail, Phone, MapPin, Globe, Building } from 'lucide-react';

export const metadata = {
  title: 'Impressum - Servecta UG (haftungsbeschränkt) i.G.',
  description: 'Impressum der Servecta UG (haftungsbeschränkt) i.G. mit Kontaktdaten und rechtlichen Informationen',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Impressum
          </h1>
          <p className="text-xl text-muted-foreground">
            Servecta UG (haftungsbeschränkt) i.G. - Angaben gemäß § 5 TMG
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-foreground">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Anbieter</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Servecta UG (haftungsbeschränkt) i.G.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Lengerckestieg 2, 22041 Hamburg</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">+49 (174) 7861457</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">info@servecta.de</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">www.servecta.de</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Handelsregister</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Registergericht:</strong> Amtsgericht Hamburg</p>
                <p><strong>Registernummer:</strong> HRB 123456789</p>
                <p><strong>Umsatzsteuer-ID:</strong> DE123456789</p>
                <p><strong>Wirtschafts-ID:</strong> 123456789123456789</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Geschäftsführung</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Luca Stephan Kohls</strong></p>
                <p>Geschäftsführer</p>
                <p>E-Mail: luca.kohls@servecta.de</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Verantwortlich für den Inhalt</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Luca Stephan Kohls</strong></p>
                <p>Lengerckestieg 2</p>
                <p>22041 Hamburg</p>
                <p>E-Mail: luca.kohls@servecta.de</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Streitschlichtung</h2>
            <p className="text-muted-foreground mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="text-muted-foreground">
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, 
              an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Inhalte</h2>
            <p className="text-muted-foreground mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach 
              den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter 
              jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen 
              zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="text-muted-foreground">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Links</h2>
            <p className="text-muted-foreground mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
              der Seiten verantwortlich.
            </p>
            <p className="text-muted-foreground">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Urheberrecht</h2>
            <p className="text-muted-foreground mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p className="text-muted-foreground">
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
              gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden 
              die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche 
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, 
              bitten wir um einen entsprechenden Hinweis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Bildnachweis</h2>
            <p className="text-muted-foreground">
              Die auf dieser Website verwendeten Bilder stammen aus folgenden Quellen:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Unsplash (unsplash.com)</li>
              <li>Pexels (pexels.com)</li>
              <li>Eigene Fotografien</li>
            </ul>
          </section>

          <div className="bg-card p-6 rounded-lg border border-border mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-3">Kontakt</h3>
            <p className="text-muted-foreground mb-2">
              Bei Fragen zum Impressum wenden Sie sich bitte an:
            </p>
            <div className="flex items-center space-x-2 text-primary">
              <Mail className="h-4 w-4" />
              <span>info@servecta.de</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
