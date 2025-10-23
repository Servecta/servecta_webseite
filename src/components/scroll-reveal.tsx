'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, direction = 'up', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      const currentRef = ref.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
