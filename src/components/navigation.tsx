'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative mt-6">
              <Image
                src="/assets/logo.svg"
                alt="Servecta Logo"
                width={128}
                height={128}
                className="h-32 w-32"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Button asChild className="bg-gradient-primary hover:shadow-glow">
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>

                  {/* Mobile menu button */}
                  <div className="md:hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-foreground hover:bg-accent/20 transition-colors duration-200 touch-manipulation"
                    >
                      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                  </div>
        </div>

                {/* Mobile Navigation */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
                  >
                    <div className="px-4 pt-4 pb-6 space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 touch-manipulation ${
                            pathname === item.href
                              ? 'text-primary bg-primary/10 border border-primary/20'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <div className="pt-4">
                        <Button asChild className="w-full bg-gradient-primary hover:shadow-glow touch-manipulation">
                          <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                            Kontakt aufnehmen
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
      </div>
    </motion.nav>
  );
}
