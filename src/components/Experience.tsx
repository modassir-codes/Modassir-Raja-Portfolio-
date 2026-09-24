import React from 'react';
import { motion } from 'motion/react';
import { Building2, Calendar, MapPin, Shield } from 'lucide-react';
import { EXPERIENCES } from '../data/resumeData';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, scrollViewport } from '../utils/animations';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 border-b border-black/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="max-w-3xl mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 block">
              {t.experience.sectionNum}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-black dark:text-white mb-4">
              {t.experience.title}
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif italic">
              {t.experience.subtitle}
            </p>
          </motion.div>

          {/* Timeline List */}
          <div className="space-y-10 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 md:before:left-8 before:w-px before:bg-black/15 dark:before:bg-white/15 before:content-['']">
            {EXPERIENCES.map((exp) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className="relative pl-10 sm:pl-16 md:pl-20 group"
              >
                {/* Timeline Indicator Dot */}
                <div className="absolute left-4 sm:left-6 md:left-8 top-2 -translate-x-1/2 w-3 h-3 bg-black dark:bg-white rounded-none flex items-center justify-center transition-transform" />

                {/* Experience Card */}
                <div className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xs p-6 sm:p-8 border border-black/15 dark:border-white/15 transition-all hover:border-black/40 dark:hover:border-white/40">
                  {/* Header info */}
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pb-5 border-b border-black/10 dark:border-white/10">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-black/20 dark:border-white/20 rounded-xs text-neutral-700 dark:text-neutral-300">
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-black/70 dark:text-white/70 font-mono text-xs uppercase tracking-wider">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Key Highlight Banner */}
                  <div className="my-4 px-4 py-2.5 bg-black/[0.04] dark:bg-white/[0.04] border-l-2 border-black dark:border-white text-xs text-black dark:text-white font-mono flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 shrink-0" />
                    <span>{exp.summaryHighlight}</span>
                  </div>

                  {/* Bullet Points */}
                  <div className="mt-4 space-y-3">
                    {exp.bulletPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-neutral-400 mt-0.5">—</span>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Technologies used */}
                  <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest mr-1">
                      {t.experience.coreTech}:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono uppercase rounded-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
