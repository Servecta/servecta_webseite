'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Servecta hat unsere IT-Sicherheit auf ein neues Level gehoben. Der Service ist erstklassig und die Expertise unübertroffen. Absolut empfehlenswert!",
    author: "Max Mustermann",
    company: "Muster GmbH",
    rating: 5,
  },
  {
    id: 2,
    quote: "Die Datenschutzberatung durch Servecta war präzise und verständlich. Wir fühlen uns nun DSGVO-konform und sicher. Vielen Dank!",
    author: "Erika Musterfrau",
    company: "Startup Solutions",
    rating: 5,
  },
  {
    id: 3,
    quote: "Unsere gesamte IT-Infrastruktur wurde von Servecta neu aufgesetzt. Alles läuft reibungslos und effizient. Ein echter Game-Changer für unser Unternehmen.",
    author: "Dr. Anna Schmidt",
    company: "Tech Innovations AG",
    rating: 4,
  },
  {
    id: 4,
    quote: "Schneller und kompetenter Support! Bei jeder Frage stand uns Servecta zur Seite. Eine Partnerschaft, die wir nicht mehr missen möchten.",
    author: "Tom Müller",
    company: "Creative Minds UG",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="testimonial-carousel relative w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="testimonial-item glass-card hover-lift"
        >
          <CardContent className="flex flex-col items-center text-center p-8">
            <div className="flex mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xl italic text-foreground mb-6">
              "{currentTestimonial.quote}"
            </p>
            <p className="font-semibold text-primary">
              {currentTestimonial.author}
            </p>
            <p className="text-muted-foreground text-sm">
              {currentTestimonial.company}
            </p>
          </CardContent>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-10 hover-scale"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-10 hover-scale"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary w-6' : 'bg-gray-600'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
