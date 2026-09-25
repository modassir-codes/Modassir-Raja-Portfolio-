import React from 'react';
import { motion } from 'motion/react';
import {
  FileDown,
  Mail,
  ArrowRight,
  MapPin,
  Github,
  Linkedin,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../utils/animations';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {
  const { t } = useLanguage();

  return (
    <section
      id="overview"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/10 dark:border-white/10 overflow-hidden scroll-mt-20"
    >
      <span id="home" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-10 border-b border-black/10 dark:border-white/10 text-[11px] uppercase font-mono tracking-widest text-neutral-500">
          <span>{PERSONAL_INFO.location}</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">AVAILABLE FOR HIRE</span>
          </span>
          <span className="hidden sm:inline">FULL STACK WEB DEVELOPER</span>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Bio and CTA */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Title / Name */}
            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                Portfolio
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-black dark:text-white leading-[1.05]">
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Professional Title */}
            <h2 className="text-2xl sm:text-3xl font-serif italic text-neutral-800 dark:text-neutral-200 mb-6 font-light">
              {PERSONAL_INFO.title}
            </h2>

            {/* Short professional description focused on modern, responsive, and scalable web apps */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8">
              Specialized in building modern, responsive, and scalable web applications. Delivering clean architecture, dependable full-stack solutions, and seamless user experiences using React, JavaScript, and modern web technologies.
            </p>

            {/* Action Buttons: Two clear primary buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xs font-mono font-bold text-xs uppercase tracking-wider text-white bg-black dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                id="hero-download-resume-btn"
                href="/resume.pdf"
                download="Modassir-Raja-Resume.pdf"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xs font-mono font-bold text-xs uppercase tracking-wider text-black dark:text-white bg-transparent border border-black/25 dark:border-white/25 hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              <button
                id="hero-contact-btn"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xs font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>
            </div>

            {/* Social / Contact Quick Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400 pt-6 border-t border-black/10 dark:border-white/10 w-full">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black dark:hover:text-white transition uppercase font-mono tracking-wider text-xs font-medium"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black dark:hover:text-white transition uppercase font-mono tracking-wider text-xs font-medium"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-mono tracking-wider text-xs uppercase">
                <MapPin className="w-4 h-4" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Existing Profile Photo Card */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Clean Portrait Presentation Card */}
            <div className="border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] rounded-xs font-mono overflow-hidden shadow-sm">
              {/* Photo Display Frame */}
              <div className="relative group overflow-hidden bg-neutral-900 aspect-square flex items-center justify-center">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.avatarAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Overlay vignette */}
                <div className="absolute inset-0 border border-black/10 dark:border-white/10 pointer-events-none" />

                {/* Bottom identification strip */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/85 backdrop-blur-md px-4 py-2.5 border border-white/15 text-white rounded-xs">
                  <div>
                    <span className="font-serif italic text-sm block text-white font-medium">Modassir Raja</span>
                    <span className="font-mono text-[10px] text-neutral-300 uppercase tracking-wider block">Full Stack Web Developer</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border border-emerald-400/50 text-emerald-300 rounded-xs bg-emerald-950/40">
                    Available
                  </span>
                </div>
              </div>

              {/* Core Details Bar */}
              <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] font-mono text-xs space-y-2 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">Core Focus</span>
                  <span className="font-serif italic text-xs text-black dark:text-white">React, JavaScript, Node.js, Full Stack</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">Location</span>
                  <span className="text-xs text-neutral-700 dark:text-neutral-300">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
