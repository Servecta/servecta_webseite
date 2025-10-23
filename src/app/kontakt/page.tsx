'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield,
  MessageSquare,
  Calendar
} from 'lucide-react';
import SmartContactForm from '@/components/smart-contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    value: 'info@servecta.de',
    description: 'Schreiben Sie uns eine E-Mail',
    href: 'mailto:info@servecta.de'
  },
  {
    icon: Phone,
    title: 'Telefon',
    value: '+49 (0) 123 456789',
    description: 'Rufen Sie uns direkt an',
    href: 'tel:+49123456789'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Musterstraße 123, 12345 Musterstadt',
    description: 'Besuchen Sie uns vor Ort',
    href: '#'
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    value: 'Mo-Fr: 9:00-18:00',
    description: 'Unsere Geschäftszeiten',
    href: '#'
  }
];

const services = [
  'Datenschutz-Beratung',
  'DSGVO-Compliance',
  'IT-Security Audit',
  'IT-Infrastruktur',
  'Compliance-Management',
  'Schulungen',
  'Strategische Beratung',
  'Notfall-Support'
];

export default function ContactPage() {
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
                Kontakt
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Kontaktieren Sie{' '}
              <span className="text-gradient">uns</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Lassen Sie uns gemeinsam Ihre IT- und Datenschutz-Herausforderungen lösen. 
              Wir freuen uns auf Ihre Nachricht!
            </motion.p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full glass-card hover-lift hover-glow transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {info.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Senden Sie uns eine Nachricht
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beschreiben Sie Ihr Anliegen und wir melden uns schnellstmöglich bei Ihnen zurück.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card hover-lift">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2 text-2xl text-foreground">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>Kontaktformular</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SmartContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Unsere Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wählen Sie aus unserem umfassenden Leistungsspektrum
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-4 bg-card rounded-lg hover:shadow-glow transition-all duration-300 border-border/50">
                  <span className="text-sm font-medium text-foreground">{service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Unser Standort
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Besuchen Sie uns in unserem modernen Büro in Musterstadt
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Karte wird geladen...
                  </h3>
                  <p className="text-muted-foreground">
                    Musterstraße 123, 12345 Musterstadt
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Vertrauen Sie auf unsere Expertise
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Über 10 Jahre Erfahrung in Datenschutz und IT-Security. 
              Wir sind Ihr verlässlicher Partner für alle digitalen Herausforderungen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Termin vereinbaren
              </motion.div>
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="h-4 w-4 mr-2" />
                Sicherheitsaudit
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}