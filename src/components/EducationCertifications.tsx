import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Languages,
  Calendar,
  MapPin,
  BookOpen,
} from 'lucide-react';
import { EDUCATION, CERTIFICATIONS, LANGUAGES } from '../data/resumeData';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, scrollViewport } from '../utils/animations';

export const EducationCertifications: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 border-b border-black/10 dark:border-white/10 overflow-hidden">
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
              {t.education.sectionNum}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-black dark:text-white mb-3">
              {t.education.title}
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-serif italic">
              {t.education.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Education Column (7 cols) */}
            <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-black/10 dark:border-white/10 mb-6">
                <BookOpen className="w-4 h-4 text-black dark:text-white" />
                <h3 className="text-xl font-serif text-black dark:text-white">
                  {t.education.eduTab}
                </h3>
              </div>

              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.degree}
                    className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xs p-6 sm:p-7 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2 pb-3 border-b border-black/10 dark:border-white/10">
                      <h4 className="text-lg font-serif text-black dark:text-white">
                        {edu.degree}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                      {edu.institution}
                    </p>
                    {edu.location && (
                      <p className="text-[11px] text-neutral-500 font-mono flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </p>
                    )}

                    {edu.highlights && (
                      <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10">
                        {edu.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                            <span className="font-mono text-xs text-neutral-400">—</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications & Languages Column (5 cols) */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
              {/* Certifications */}
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-black/10 dark:border-white/10 mb-6">
                  <Award className="w-4 h-4 text-black dark:text-white" />
                  <h3 className="text-xl font-serif text-black dark:text-white">
                    {t.education.certTab}
                  </h3>
                </div>

                <div className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xs p-6 border border-black/15 dark:border-white/15 space-y-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div
                      key={cert.title}
                      className={`flex items-start justify-between gap-3 ${
                        idx !== CERTIFICATIONS.length - 1
                          ? 'pb-4 border-b border-black/10 dark:border-white/10'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white shrink-0 mt-0.5">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-serif text-black dark:text-white">
                            {cert.title}
                          </h4>
                          <p className="text-[10px] font-mono uppercase text-neutral-500 mt-0.5">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                      {cert.date && (
                        <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                          {cert.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-black/10 dark:border-white/10 mb-6">
                  <Languages className="w-4 h-4 text-black dark:text-white" />
                  <h3 className="text-xl font-serif text-black dark:text-white">
                    {t.education.langTab}
                  </h3>
                </div>

                <div className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xs p-6 border border-black/15 dark:border-white/15 space-y-4">
                  {LANGUAGES.map((lang) => (
                    <div key={lang.language}>
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className="text-black dark:text-white">
                          {lang.language}
                        </span>
                        <span className="text-neutral-500 text-[11px] uppercase tracking-wider">
                          {lang.proficiency}
                        </span>
                      </div>
                      <div className="w-full h-[3px] bg-black/10 dark:bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.levelPercentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="h-full bg-black dark:bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
