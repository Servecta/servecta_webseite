'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Server, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Eye, 
  Database, 
  Cloud, 
  Settings, 
  GraduationCap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    id: 'datenschutz',
    icon: Shield,
    title: 'Datenschutz & DSGVO',
    subtitle: 'Vollständige Compliance-Lösungen',
    description: 'Wir sorgen dafür, dass Ihr Unternehmen vollständig DSGVO-konform arbeitet und alle datenschutzrechtlichen Anforderungen erfüllt.',
    features: [
      'DSGVO-Compliance Audit',
      'Datenschutz-Folgenabschätzung (DSFA)',
      'Verarbeitungsverzeichnis',
      'Datenschutzerklärungen',
      'Mitarbeiterschulungen',
      'Datenschutzbeauftragter (DSB)',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'it-security',
    icon: Lock,
    title: 'IT-Security',
    subtitle: 'Umfassender Schutz Ihrer Infrastruktur',
    description: 'Moderne Sicherheitslösungen zum Schutz vor Cyber-Bedrohungen und zur Gewährleistung der Integrität Ihrer IT-Systeme.',
    features: [
      'Penetration Testing',
      'Security Monitoring',
      'Firewall-Management',
      'Endpoint Protection',
      'Incident Response',
      'Security Awareness Training',
    ],
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'it-infrastruktur',
    icon: Server,
    title: 'IT-Infrastruktur',
    subtitle: 'Skalierbare und zuverlässige Systeme',
    description: 'Von der Planung bis zur Implementierung: Wir schaffen eine robuste IT-Infrastruktur, die mit Ihrem Unternehmen wächst.',
    features: [
      'Cloud-Migration',
      'Server-Management',
      'Netzwerk-Design',
      'Backup-Lösungen',
      'Monitoring & Wartung',
      'Disaster Recovery',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'beratung',
    icon: Users,
    title: 'Strategische Beratung',
    subtitle: 'Ihr Partner für digitale Transformation',
    description: 'Wir begleiten Sie bei der digitalen Transformation und entwickeln maßgeschneiderte IT-Strategien für nachhaltigen Erfolg.',
    features: [
      'IT-Strategie-Entwicklung',
      'Digitalisierungsberatung',
      'Prozessoptimierung',
      'Change Management',
      'Technologie-Evaluierung',
      'Projektmanagement',
    ],
    color: 'from-purple-500 to-pink-500',
  },
];

const additionalServices = [
  {
    icon: FileText,
    title: 'Compliance Management',
    description: 'Strukturierte Umsetzung aller relevanten Compliance-Anforderungen.',
  },
  {
    icon: Eye,
    title: 'Audit & Assessment',
    description: 'Regelmäßige Überprüfung Ihrer IT-Systeme und Prozesse.',
  },
  {
    icon: Database,
    title: 'Datenmanagement',
    description: 'Professionelle Verwaltung und Optimierung Ihrer Datenbestände.',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Migration und Management von Cloud-basierten Lösungen.',
  },
  {
    icon: Settings,
    title: 'System Administration',
    description: '24/7 Überwachung und Wartung Ihrer IT-Systeme.',
  },
  {
    icon: GraduationCap,
    title: 'Schulungen & Training',
    description: 'Maßgeschneiderte Schulungsprogramme für Ihre Mitarbeiter.',
  },
];

export default function LeistungenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Unsere Leistungen
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Alles aus einem{' '}
              <span className="text-gradient">Guss</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Von Datenschutz über IT-Security bis hin zur strategischen Beratung – 
              wir bieten Ihnen alle Dienstleistungen aus einer Hand für maximale Effizienz.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                      <p className="text-lg text-muted-foreground">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button asChild className="bg-gradient-primary hover:shadow-glow">
                    <Link href="/kontakt">
                      Beratung anfragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50">
                    <CardHeader>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-2 bg-gradient-to-r from-muted to-primary rounded-full" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-card rounded-lg">
                            <div className="text-2xl font-bold text-primary">100%</div>
                            <div className="text-sm text-muted-foreground">Compliance</div>
                          </div>
                          <div className="text-center p-4 bg-card rounded-lg">
                            <div className="text-2xl font-bold text-primary">24/7</div>
                            <div className="text-sm text-muted-foreground">Support</div>
                          </div>
                        </div>
                        <div className="text-center p-4 bg-gradient-primary rounded-lg text-white">
                          <div className="text-lg font-semibold">Maßgeschneiderte Lösungen</div>
                          <div className="text-sm opacity-90">Für Ihr Unternehmen</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Zusätzliche Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ergänzende Dienstleistungen für eine vollständige IT- und Datenschutzlösung.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Individuelle Beratung gewünscht?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Lassen Sie uns gemeinsam die optimale Lösung für Ihre Anforderungen entwickeln. 
              Wir freuen uns auf Ihre Anfrage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/kontakt">
                  Kostenlose Beratung anfragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                <Link href="/ueber-uns">Über uns erfahren</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
