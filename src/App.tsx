import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenResume = () => {
    setIsResumeModalOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeModalOpen(false);
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div
          className="min-h-screen transition-colors duration-200 antialiased font-sans"
          style={{
            backgroundColor: 'var(--bg-main)',
            color: 'var(--color-text)',
          }}
        >
          {/* Subtle Editorial Scroll Progress Indicator */}
          <motion.div
            style={{ scaleX, backgroundColor: 'var(--color-accent)' }}
            className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50 pointer-events-none"
          />

          {/* Navigation Bar */}
          <Navbar
            onOpenResume={handleOpenResume}
            onOpenContact={handleOpenContact}
          />

          {/* Main Content Sections */}
          <main>
            {/* Hero / About */}
            <Hero
              onOpenResume={handleOpenResume}
              onOpenContact={handleOpenContact}
            />

            {/* Key Experience */}
            <Experience />

            {/* Featured Projects */}
            <Projects />

            {/* Technical Skills */}
            <Skills />

            {/* Education & Certifications */}
            <EducationCertifications />

            {/* Contact Form & Direct Inquiries */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer onOpenResume={handleOpenResume} />

          {/* Interactive Resume View & PDF Download Modal */}
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={handleCloseResume}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
