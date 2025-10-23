'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Layers,
  Eye,
  MousePointer,
  Smartphone,
  Monitor
} from 'lucide-react';

interface DesignTrend {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'visual' | 'interaction' | 'layout' | 'typography';
  isActive: boolean;
}

const designTrends: DesignTrend[] = [
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    description: 'Transparente Elemente mit Backdrop-Blur für moderne Tiefe',
    icon: Layers,
    category: 'visual',
    isActive: true,
  },
  {
    id: 'neumorphism',
    title: 'Neumorphism',
    description: 'Subtile Schatten für natürliche, erhabene Oberflächen',
    icon: Eye,
    category: 'visual',
    isActive: true,
  },
  {
    id: 'micro-interactions',
    title: 'Micro-Interactions',
    description: 'Kleine Animationen für bessere Benutzerführung',
    icon: MousePointer,
    category: 'interaction',
    isActive: true,
  },
  {
    id: 'gradient-overlays',
    title: 'Gradient Overlays',
    description: 'Dynamische Farbverläufe für visuellen Impact',
    icon: Palette,
    category: 'visual',
    isActive: true,
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Optimiert für alle Bildschirmgrößen',
    icon: Smartphone,
    category: 'layout',
    isActive: true,
  },
  {
    id: 'dark-mode',
    title: 'Dark Mode',
    description: 'Moderne dunkle Oberfläche für bessere Augen',
    icon: Monitor,
    category: 'visual',
    isActive: true,
  },
];

export default function ModernDesignTrends() {
  const [activeTrend, setActiveTrend] = useState<string | null>(null);
  const [hoveredTrend, setHoveredTrend] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <Badge className="bg-primary/20 text-primary">
            Moderne Design-Trends
          </Badge>
        </div>
        <h2 className="text-headline text-foreground mb-6">
          Zeitgemäße Gestaltung für <br />
          <span className="text-gradient">maximale Wirkung</span>
        </h2>
        <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
          Wir setzen auf die neuesten Design-Trends und Technologien, 
          um eine moderne, ansprechende und benutzerfreundliche Website zu schaffen.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designTrends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredTrend(trend.id)}
            onMouseLeave={() => setHoveredTrend(null)}
            onClick={() => setActiveTrend(activeTrend === trend.id ? null : trend.id)}
            className="cursor-pointer"
          >
            <Card className={`glass-card transition-all duration-300 ${
              hoveredTrend === trend.id ? 'hover-lift hover-glow' : ''
            } ${activeTrend === trend.id ? 'ring-2 ring-primary' : ''} ${
              trend.isActive ? 'border-primary/30' : 'border-border/30'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    trend.category === 'visual' ? 'bg-gradient-primary/20' :
                    trend.category === 'interaction' ? 'bg-accent-info/20' :
                    trend.category === 'layout' ? 'bg-accent-success/20' :
                    'bg-accent-warning/20'
                  }`}>
                    <trend.icon className={`h-6 w-6 ${
                      trend.category === 'visual' ? 'text-primary' :
                      trend.category === 'interaction' ? 'text-accent-info' :
                      trend.category === 'layout' ? 'text-accent-success' :
                      'text-accent-warning'
                    }`} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={trend.isActive ? 'default' : 'secondary'}
                      className={trend.isActive ? 'bg-primary/20 text-primary' : ''}
                    >
                      {trend.category}
                    </Badge>
                    {trend.isActive && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                </div>

                <h3 className="text-title text-foreground mb-3">
                  {trend.title}
                </h3>
                <p className="text-body text-muted-foreground mb-4">
                  {trend.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      trend.isActive ? 'bg-accent-success' : 'bg-muted'
                    }`} />
                    <span className="text-caption text-muted-foreground">
                      {trend.isActive ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-primary hover:bg-primary/10"
                  >
                    Details
                  </Button>
                </div>

                <AnimatePresence>
                  {activeTrend === trend.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-caption text-muted-foreground">
                            Implementierung
                          </span>
                          <Badge className="bg-accent-success/20 text-accent-success">
                            Vollständig
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-caption text-muted-foreground">
                            Performance
                          </span>
                          <Badge className="bg-accent-info/20 text-accent-info">
                            Optimiert
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-caption text-muted-foreground">
                            Browser-Support
                          </span>
                          <Badge className="bg-primary/20 text-primary">
                            95%+
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Design Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8">
                <h3 className="text-title text-foreground mb-4">
                  Live Design-Demo
                </h3>
                <p className="text-body text-muted-foreground mb-6">
                  Erleben Sie unsere Design-Trends in Aktion. 
                  Interagieren Sie mit den Elementen und sehen Sie, 
                  wie moderne Gestaltung Ihre Benutzererfahrung verbessert.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-accent-success rounded-full" />
                    <span className="text-body text-foreground">
                      Glassmorphism-Effekte aktiv
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-accent-info rounded-full" />
                    <span className="text-body text-foreground">
                      Micro-Interactions implementiert
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-accent-warning rounded-full" />
                    <span className="text-body text-foreground">
                      Responsive Design optimiert
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-primary/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="text-subtitle text-foreground mb-2">
                    Moderne Technologie
                  </h4>
                  <p className="text-body text-muted-foreground">
                    Next.js 14 + Tailwind CSS + Framer Motion
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
