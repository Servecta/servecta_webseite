'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Target, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Heart, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Shield,
    title: 'Sicherheit',
    description: 'Wir setzen höchste Standards für den Schutz Ihrer Daten und Systeme.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Effizienz',
    description: 'Optimierte Prozesse und Lösungen für maximale Produktivität.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Transparenz',
    description: 'Offene Kommunikation und nachvollziehbare Entscheidungen.',
    color: 'from-purple-500 to-pink-500',
  },
];

const team = [
  {
    name: 'Luca Stephan Kohls',
    role: 'Geschäftsführer & Datenschutzexperte',
    description: 'Über 15 Jahre Erfahrung in der IT-Branche mit Spezialisierung auf Datenschutz und Compliance.',
    expertise: ['DSGVO', 'IT-Security', 'Strategische Beratung'],
  },
  {
    name: 'Sarah Schmidt',
    role: 'Head of IT-Security',
    description: 'Zertifizierte IT-Security Expertin mit Fokus auf Penetration Testing und Incident Response.',
    expertise: ['Cybersecurity', 'Penetration Testing', 'Risk Management'],
  },
  {
    name: 'Thomas Weber',
    role: 'Senior IT-Consultant',
    description: 'Experte für IT-Infrastruktur und Cloud-Lösungen mit langjähriger Projekterfahrung.',
    expertise: ['Cloud Migration', 'Infrastructure', 'Project Management'],
  },
];

const milestones = [
  {
    year: '2010',
    title: 'Gründung',
    description: 'Servecta UG (haftungsbeschränkt) i.G. wird als Spezialist für IT-Security gegründet.',
  },
  {
    year: '2015',
    title: 'DSGVO-Vorbereitung',
    description: 'Frühe Spezialisierung auf Datenschutz und Compliance-Lösungen.',
  },
  {
    year: '2018',
    title: 'DSGVO-Implementierung',
    description: 'Erfolgreiche Begleitung von über 100 Unternehmen bei der DSGVO-Umsetzung.',
  },
  {
    year: '2020',
    title: 'Cloud-Expertise',
    description: 'Ausbau der Cloud-Services und Remote-Work-Lösungen.',
  },
  {
    year: '2023',
    title: 'KI-Integration',
    description: 'Integration von KI-Tools für verbesserte Security-Monitoring.',
  },
];

const stats = [
  { icon: Users, value: '500+', label: 'Zufriedene Kunden' },
  { icon: Award, value: '10+', label: 'Jahre Erfahrung' },
  { icon: Shield, value: '100%', label: 'DSGVO-Konformität' },
  { icon: Clock, value: '24/7', label: 'Support verfügbar' },
];

export default function UeberUnsPage() {
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
                Über uns
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Ihr vertrauensvoller{' '}
              <span className="text-gradient">Partner</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Seit über 10 Jahren begleiten wir mittelständische Unternehmen und Start-ups 
              bei ihrer digitalen Transformation und sorgen für Sicherheit und Compliance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Unsere Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Wir machen Datenschutz und IT-Security für Unternehmen jeder Größe zugänglich 
                und verständlich. Unser Ziel ist es, komplexe technische Herausforderungen 
                in einfache, umsetzbare Lösungen zu verwandeln.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Als Ihr Partner sorgen wir dafür, dass Sie sich voll und ganz auf Ihr 
                Kerngeschäft konzentrieren können, während wir Ihre digitale Infrastruktur 
                sicher und effizient verwalten.
              </p>
              <Button asChild className="bg-gradient-primary hover:shadow-glow">
                <Link href="/kontakt">
                  Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-primary rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">500+</div>
                    <div className="text-white/90 text-sm">Projekte erfolgreich</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-white/90 text-sm">DSGVO-konform</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-white/90 text-sm">Support verfügbar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">10+</div>
                    <div className="text-white/90 text-sm">Jahre Erfahrung</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Unsere Werte
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Diese Grundsätze leiten uns in unserer täglichen Arbeit und prägen 
              unsere Beziehung zu unseren Kunden.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl mb-6`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Unser Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Erfahrene Experten mit Leidenschaft für Technologie und Sicherheit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4">
                        {member.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {member.expertise.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Unsere Geschichte
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Von der Gründung bis heute – ein Überblick über unsere wichtigsten Meilensteine.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-glow transition-all duration-300">
                      <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center relative z-10">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
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
              Werden Sie Teil unserer Erfolgsgeschichte
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Lassen Sie uns gemeinsam Ihre digitalen Herausforderungen meistern. 
              Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/kontakt">
                  Kontakt aufnehmen
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
    </div>
  );
}
