import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  FileDown,
  Mail,
  ArrowRight,
  MapPin,
  Github,
  Linkedin,
  Plus,
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Subtle multi-plane parallax depth transforms
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yGridLayer = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yCrosshairLeft = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yCrosshairRight = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.035, 0.02, 0]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Parallax Background Layer 1: Oversized Editorial Typography Watermark */}
      <motion.div
        style={{ y: yWatermark, opacity: watermarkOpacity }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap text-[18vw] font-serif font-bold text-black dark:text-white leading-none z-0 tracking-tighter"
        aria-hidden="true"
      >
        MODASSIR
      </motion.div>

      {/* Parallax Background Layer 2: Subtle Coordinate Crosshairs & Grid Accents */}
      <motion.div
        style={{ y: yGridLayer }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Subtle decorative dot/plus grid marks */}
        <div className="max-w-7xl mx-auto h-full relative px-4 sm:px-6 lg:px-8">
          <div className="absolute top-12 right-12 font-mono text-[9px] text-neutral-400/40 dark:text-neutral-600/50 uppercase tracking-[0.25em]">
            + [SEC // 01.00]
          </div>
          <div className="absolute bottom-20 left-8 font-mono text-[9px] text-neutral-400/40 dark:text-neutral-600/50 uppercase tracking-[0.25em]">
            + [HYD // IND]
          </div>
        </div>
      </motion.div>

      {/* Parallax Background Layer 3: Floating Left & Right Editorial Tick Marks */}
      <motion.div
        style={{ y: yCrosshairLeft }}
        className="absolute top-1/3 left-4 md:left-12 pointer-events-none z-0 text-black/10 dark:text-white/10 hidden sm:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1 font-mono text-[8px] tracking-widest uppercase text-neutral-400/50">
          <Plus className="w-4 h-4 opacity-40" />
          <span>AXIS_01</span>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yCrosshairRight }}
        className="absolute top-2/3 right-4 md:right-16 pointer-events-none z-0 text-black/10 dark:text-white/10 hidden sm:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1 font-mono text-[8px] tracking-widest uppercase text-neutral-400/50">
          <span>VOL_26</span>
          <Plus className="w-4 h-4 opacity-40" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Headline Row */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-500">
          <span>{t.hero.volume}</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            {t.hero.availableStatus}
          </span>
          <span className="hidden sm:inline">FULL STACK ENGINEERING</span>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column: Bio and CTA */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Main Editorial Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-black dark:text-white leading-[1.05] mb-6">
              Modassir Raja <br />
              <span className="font-serif italic font-light opacity-90">{t.hero.tagline}</span>
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 mb-6 leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Summary Text */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8">
              {t.hero.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xs font-mono font-bold text-[11px] uppercase tracking-[0.2em] text-white bg-black dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
              >
                <span>{t.hero.selectedWorks}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                id="hero-download-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xs font-mono font-bold text-[11px] uppercase tracking-[0.2em] text-black dark:text-white bg-transparent border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{t.hero.resumePdf}</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xs font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.hero.contactBtn}</span>
              </button>
            </div>

            {/* Social / Contact Quick Links */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-600 dark:text-neutral-400 pt-6 border-t border-black/10 dark:border-white/10 w-full">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition uppercase font-mono tracking-wider text-[11px]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition uppercase font-mono tracking-wider text-[11px]"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 font-mono tracking-wider text-[11px] uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Portrait Photo Card */}
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
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/80 backdrop-blur-md px-3.5 py-2.5 border border-white/15 text-white rounded-xs">
                  <div>
                    <span className="font-serif italic text-sm block text-white">Modassir Raja</span>
                    <span className="font-mono text-[9px] text-neutral-300 uppercase tracking-widest block">{t.hero.tagline}</span>
                  </div>
                  <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 border border-emerald-400/50 text-emerald-300 rounded-xs bg-emerald-950/40">
                    {t.hero.availableBadge}
                  </span>
                </div>
              </div>

              {/* Concise Core Spec Bar */}
              <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] font-mono text-xs space-y-2 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{t.hero.coreStack}</span>
                  <span className="font-serif italic text-xs text-black dark:text-white">React, JavaScript (ES6+), HTML5/CSS3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{t.hero.locationLabel}</span>
                  <span className="text-[11px] text-neutral-700 dark:text-neutral-300">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
