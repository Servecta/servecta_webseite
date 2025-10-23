'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const subjectSuggestions = [
  'Datenschutzberatung',
  'IT-Security Audit',
  'IT-Infrastruktur-Setup',
  'Technischer Support',
  'Allgemeine Anfrage',
  'Angebot anfordern',
];

export default function SmartContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (formData.subject) {
      setFilteredSuggestions(
        subjectSuggestions.filter(s =>
          s.toLowerCase().includes(formData.subject.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.subject]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name ist erforderlich.';
    if (!formData.email) {
      newErrors.email = 'E-Mail ist erforderlich.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-Mail-Adresse ist ungültig.';
    }
    if (!formData.subject) newErrors.subject = 'Betreff ist erforderlich.';
    if (!formData.message) newErrors.message = 'Nachricht ist erforderlich.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, subject: suggestion }));
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, subject: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData(initialFormData);
        setErrors({});
      } else {
        // Fehlerbehandlung
        if (result.error) {
          setErrors({ message: result.error });
        } else {
          setErrors({ message: 'Es ist ein unbekannter Fehler aufgetreten.' });
        }
      }
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
      setErrors({ message: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Vielen Dank!
        </h3>
        <p className="text-muted-foreground">
          Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ihr Name"
            className={`glass-input ${errors.name ? 'form-error' : ''}`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            E-Mail *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ihre@email.de"
            className={`glass-input ${errors.email ? 'form-error' : ''}`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="smart-input">
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          Betreff *
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Betreff Ihres Anliegens"
          className={`glass-input ${errors.subject ? 'form-error' : ''}`}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="smart-suggestions show"
            >
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Ihre Nachricht *
        </label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Beschreiben Sie Ihr Anliegen..."
          rows={6}
          className={`glass-input ${errors.message ? 'form-error' : ''}`}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>
      
      {/* Allgemeine Fehlermeldung */}
      {errors.message && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{errors.message}</p>
        </div>
      )}
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-primary hover:shadow-glow btn-modern hover-lift"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Wird gesendet...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Nachricht senden
          </>
        )}
      </Button>
    </form>
  );
}
