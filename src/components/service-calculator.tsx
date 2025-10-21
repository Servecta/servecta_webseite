'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
}

const serviceOptions: ServiceOption[] = [
  { id: 'datenschutz', name: 'Datenschutzberatung', basePrice: 150, unit: 'Stunden' },
  { id: 'it-security', name: 'IT-Security Audit', basePrice: 200, unit: 'Tage' },
  { id: 'infrastruktur', name: 'IT-Infrastruktur-Setup', basePrice: 500, unit: 'Projekte' },
  { id: 'support', name: 'Technischer Support', basePrice: 100, unit: 'Stunden' },
];

export default function ServiceCalculator() {
  const [selectedService, setSelectedService] = useState<ServiceOption>(serviceOptions[0]);
  const [quantity, setQuantity] = useState<number>(10);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const cost = selectedService.basePrice * quantity;
    setTotalCost(cost);
  }, [selectedService, quantity]);

  const handleServiceChange = (value: string) => {
    const service = serviceOptions.find(opt => opt.id === value);
    if (service) {
      setSelectedService(service);
      setQuantity(10);
    }
  };

  return (
    <Card className="calculator glass-card hover-lift">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Ihr individuelles Angebot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="service-select" className="block text-gray-300 mb-2">
              Wählen Sie einen Service
            </Label>
            <Select onValueChange={handleServiceChange} defaultValue={selectedService.id}>
              <SelectTrigger id="service-select" className="calculator-input">
                <SelectValue placeholder="Service auswählen" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                {serviceOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quantity-slider" className="block text-gray-300 mb-2">
              Anzahl der {selectedService.unit}: {quantity}
            </Label>
            <Slider
              id="quantity-slider"
              min={1}
              max={100}
              step={1}
              value={[quantity]}
              onValueChange={(val) => setQuantity(val[0])}
              className="w-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="calculator-result neon-glow"
          >
            Geschätzte Kosten: {totalCost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </motion.div>

          <p className="text-gray-400 text-sm text-center">
            Dies ist eine Schätzung. Für ein detailliertes Angebot kontaktieren Sie uns bitte.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
