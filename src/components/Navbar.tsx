import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { LanguageSelector } from './LanguageSelector';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/resumeData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const { currentThemeConfig } = useTheme();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.experience, href: '#experience', id: 'experience' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.skills, href: '#skills', id: 'skills' },
    { name: t.nav.education, href: '#education', id: 'education' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      style={{
        backgroundColor: isScrolled ? 'var(--bg-main)' : 'transparent',
      }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md border-b border-black/10 dark:border-white/10 opacity-95'
          : 'border-b border-black/5 dark:border-white/5 py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Signature */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-hidden"
            aria-label="Modassir Raja - Portfolio Home"
          >
            {/* Small Monogram / Avatar Avatar */}
            <div className="w-8 h-8 rounded-xs overflow-hidden border border-black/20 dark:border-white/20 relative group-hover:border-black dark:group-hover:border-white transition">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-black dark:text-white leading-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 leading-none">
                {t.hero.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.25em] font-medium text-black/70 dark:text-white/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  className={`relative py-1 transition-opacity duration-150 ${
                    isActive
                      ? 'text-black dark:text-white font-bold opacity-100'
                      : 'hover:opacity-100 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black dark:bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right actions: Language Switcher + Theme Palette Switcher + Resume Button + Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSelector variant="navbar" />

            {/* Curated Theme Selector Dropdown */}
            <ThemeSelector variant="navbar" />

            {/* Resume Button */}
            <button
              id="nav-resume-btn"
              onClick={onOpenResume}
              className="bg-black text-white dark:bg-white dark:text-black px-3.5 py-2 text-[10px] uppercase font-bold tracking-[0.2em] rounded-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              {t.nav.resume}
            </button>

            {/* Get in touch CTA */}
            <button
              id="nav-contact-cta"
              onClick={onOpenContact}
              className="border border-black/20 dark:border-white/20 text-black dark:text-white px-3 py-2 text-[10px] uppercase font-bold tracking-[0.2em] rounded-xs hover:border-black dark:hover:border-white transition-colors"
            >
              {t.nav.contact}
            </button>
          </div>

          {/* Mobile actions & hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector variant="navbar" />
            <ThemeSelector variant="navbar" />

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xs text-black dark:text-white border border-black/10 dark:border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-black/10 dark:border-white/10 bg-[#FAFAFA]/95 dark:bg-[#0F0F0F]/95 backdrop-blur-xl px-6 pt-3 pb-8 space-y-4 shadow-xl"
            style={{
              backgroundColor: 'var(--bg-main)',
            }}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-xs uppercase tracking-[0.25em] font-medium border-b border-black/5 dark:border-white/5 transition ${
                    activeSection === link.id
                      ? 'text-black dark:text-white font-bold'
                      : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* In-drawer language selector */}
            <LanguageSelector variant="mobile" />

            {/* In-drawer multi-theme selector */}
            <ThemeSelector variant="mobile" />

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded-xs"
              >
                {t.nav.resume}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 border border-black/20 dark:border-white/20 text-black dark:text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-xs"
              >
                {t.nav.getInTouch}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
