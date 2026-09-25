import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/resumeData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (sectionId: string) => {
    const targetEl =
      document.getElementById(sectionId) ||
      (sectionId === 'overview' ? document.getElementById('home') : null);

    if (targetEl) {
      const navEl = document.getElementById('main-navbar');
      const navHeight = navEl ? navEl.offsetHeight : 72;
      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, targetTop - navHeight - 14);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    setActiveSection(sectionId);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Bottom of page check
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sections = ['overview', 'projects', 'experience', 'about', 'skills', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i];
        const el = document.getElementById(secId) || (secId === 'overview' ? document.getElementById('home') : null);
        if (el) {
          const top = el.offsetTop - 120;
          if (window.scrollY >= top) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const targetId = hash === 'home' ? 'overview' : hash;
        setTimeout(() => {
          scrollToSection(targetId);
        }, 150);
      }
    };

    if (window.location.hash) {
      handleHash();
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#overview', id: 'overview' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.experience, href: '#experience', id: 'experience' },
    { name: t.nav.about, href: '#about', id: 'about' },
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
            href="#overview"
            onClick={(e) => handleNavClick(e, 'overview')}
            className="flex items-center gap-3 group focus:outline-hidden cursor-pointer"
            aria-label="Modassir Raja - Portfolio Overview"
          >
            {/* Monogram / Avatar */}
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
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 leading-none">
                {PERSONAL_INFO.title}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-widest font-medium text-black/70 dark:text-white/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1 transition-opacity duration-150 cursor-pointer ${
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

          {/* Right actions: Language Switcher + Theme Switcher + Resume Button + Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSelector variant="navbar" />

            {/* Theme Selector Dropdown */}
            <ThemeSelector variant="navbar" />

            {/* Resume Button */}
            <a
              id="nav-resume-btn"
              href="/resume.pdf"
              download="Modassir-Raja-Resume.pdf"
              className="bg-black text-white dark:bg-white dark:text-black px-3.5 py-2 text-[10px] uppercase font-bold tracking-wider rounded-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center"
            >
              Resume
            </a>

            {/* Contact CTA */}
            <button
              id="nav-contact-cta"
              onClick={() => {
                scrollToSection('contact');
                onOpenContact();
              }}
              className="border border-black/20 dark:border-white/20 text-black dark:text-white px-3 py-2 text-[10px] uppercase font-bold tracking-wider rounded-xs hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Mobile actions & hamburger/3-dot menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector variant="navbar" />
            <ThemeSelector variant="navbar" />

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xs text-black dark:text-white border border-black/10 dark:border-white/10 cursor-pointer"
              aria-label="Toggle navigation menu"
              title="Navigation Menu"
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
            className="lg:hidden border-b border-black/10 dark:border-white/10 bg-[#FAFAFA]/95 dark:bg-[#0F0F0F]/95 backdrop-blur-xl px-6 pt-3 pb-8 space-y-4 shadow-xl"
            style={{
              backgroundColor: 'var(--bg-main)',
            }}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`py-2 text-xs uppercase tracking-widest font-medium border-b border-black/5 dark:border-white/5 transition cursor-pointer ${
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
              <a
                href="/resume.pdf"
                download="Modassir-Raja-Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-black text-white dark:bg-white dark:text-black text-xs font-bold tracking-wider uppercase rounded-xs cursor-pointer text-center block"
              >
                Download Resume
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact');
                  onOpenContact();
                }}
                className="w-full py-2.5 border border-black/20 dark:border-white/20 text-black dark:text-white text-xs font-bold tracking-wider uppercase rounded-xs cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
