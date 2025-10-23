'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Server, 
  Users, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InteractiveBackground from '@/components/interactive-background';
import ScrollReveal from '@/components/scroll-reveal';
import ServiceCalculator from '@/components/service-calculator';
import TestimonialCarousel from '@/components/testimonial-carousel';
import NewsletterSignup from '@/components/newsletter-signup';
import PWAInstallPrompt from '@/components/pwa-install-prompt';
import ModernDesignTrends from '@/components/modern-design-trends';

const features = [
  {
    icon: Shield,
    title: 'Datenschutz & DSGVO',
    description: 'Vollständige Compliance-Lösungen für Ihr Unternehmen',
  },
  {
    icon: Lock,
    title: 'IT-Security',
    description: 'Umfassender Schutz vor Cyber-Bedrohungen',
  },
  {
    icon: Server,
    title: 'IT-Infrastruktur',
    description: 'Skalierbare und zuverlässige Systeme',
  },
  {
    icon: Users,
    title: 'Strategische Beratung',
    description: 'Ihr Partner für digitale Transformation',
  },
];

const benefits = [
  'Vollständige DSGVO-Compliance',
  '24/7 IT-Support und Monitoring',
  'Maßgeschneiderte Lösungen',
  'Erfahrene Experten-Teams',
  'Transparente Kostenstruktur',
  'Nachhaltige Partnerschaften',
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <InteractiveBackground />
      
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
                Alles aus einem Guss
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Datenschutz- und{' '}
              <span className="text-gradient">IT-Dienstleistungen</span>{' '}
              aus einer Hand
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Wir bieten mittelständischen Unternehmen und Start-ups maßgeschneiderte 
              Lösungen für Datenschutz, IT-Security, Infrastruktur und strategische Beratung.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-glow">
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/leistungen">Unsere Leistungen</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Unsere Kernleistungen
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Von der Datenschutzberatung bis zur kompletten IT-Infrastruktur – 
              wir sind Ihr verlässlicher Partner für alle digitalen Herausforderungen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Warum Servecta? <br /> <span className="text-primary">Ihre Vorteile auf einen Blick</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Wir sind mehr als nur ein Dienstleister – wir sind Ihr strategischer Partner, der Ihre 
                digitalen Herausforderungen versteht und maßgeschneiderte Lösungen liefert.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8 text-center bg-gradient-primary/20">
                <Shield className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Vertrauen Sie auf Expertise
                </h3>
                <p className="text-white/90 mb-6">
                  Über 10 Jahre Erfahrung in der IT-Branche und tiefgreifendes 
                  Verständnis für Datenschutz und Compliance.
                </p>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/ueber-uns">Mehr über uns</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Service Calculator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Kostenschätzer
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Berechnen Sie die Kosten für Ihre individuellen IT-Services
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <ServiceCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Was unsere Kunden sagen
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Vertrauen Sie auf die Erfahrung zufriedener Kunden
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <TestimonialCarousel />
          </ScrollReveal>
        </div>
      </section>

      {/* Modern Design Trends Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernDesignTrends />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <NewsletterSignup />
          </ScrollReveal>
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
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Lassen Sie uns gemeinsam Ihre IT- und Datenschutz-Herausforderungen lösen. 
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
                <Link href="/leistungen">Unsere Leistungen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PWAInstallPrompt />
    </div>
  );
}