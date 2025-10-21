'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function SecurityCompliance() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Security & Compliance
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Sicherheits- und Compliance-Funktionen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass-card hover-lift hover-glow h-full">
            <CardHeader className="flex-row items-center space-x-3 pb-2">
              <Shield className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl font-semibold text-white">
                Security Feature {i}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                Sicherheits- und Compliance-Funktionen.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
