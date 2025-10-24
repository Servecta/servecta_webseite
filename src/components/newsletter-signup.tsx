'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !email.includes('@')) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setError('');
      } else {
        setError(result.error || 'Es gab ein Problem bei der Anmeldung. Bitte versuchen Sie es später erneut.');
      }
    } catch (error) {
      console.error('Fehler beim Newsletter-Abonnement:', error);
      setError('Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="newsletter text-center p-8 rounded-xl shadow-lg holographic"
    >
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            Vielen Dank für Ihre Anmeldung!
          </h3>
          <p className="text-gray-300">
            Sie erhalten in Kürze eine Bestätigungs-E-Mail.
          </p>
        </motion.div>
      ) : (
        <>
          <Mail className="h-16 w-16 text-primary mx-auto mb-6 neon-glow" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Bleiben Sie auf dem Laufenden
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Erhalten Sie die neuesten Nachrichten, Updates und exklusive Einblicke direkt in Ihr Postfach.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className={`newsletter-input flex-grow ${error ? 'form-error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="bg-gradient-primary hover:shadow-glow btn-modern hover-lift px-8 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Anmelden...
                </>
              ) : (
                'Jetzt anmelden'
              )}
            </Button>
          </form>
          {error && (
            <p className="text-red-400 text-sm mt-4">{error}</p>
          )}
        </>
      )}
    </motion.div>
  );
}
