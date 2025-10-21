'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnalyticsTracker() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="analytics-tracker">
      <motion.div
        className="analytics-progress"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
