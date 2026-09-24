import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Layout,
  Wrench,
  Terminal,
  Search,
  Cpu,
  Star,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/resumeData';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, scrollViewport } from '../utils/animations';

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Layout':
        return <Layout className="w-4 h-4" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-b border-black/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 block">
                {t.skills.sectionNum}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-black dark:text-white mb-3">
                {t.skills.title}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 font-serif italic">
                {t.skills.subtitle}
              </p>
            </div>

            {/* Quick search filter */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                id="skill-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter competencies..."
                className="w-full pl-9 pr-4 py-2.5 text-[11px] font-mono rounded-xs bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white"
              />
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((cat) => {
              const filteredSkills = cat.skills.filter((s) =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && filteredSkills.length === 0) {
                return null;
              }

              return (
                <motion.div
                  key={cat.title}
                  variants={fadeInUp}
                  className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xs p-6 sm:p-8 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 transition-colors"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10 mb-6">
                    <div className="w-8 h-8 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-black dark:text-white">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-4">
                    {filteredSkills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                          <span className="text-black dark:text-white flex items-center gap-2">
                            <span className="text-neutral-400">—</span>
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {skill.badge && (
                              <span className="px-1.5 py-0.2 text-[9px] uppercase tracking-widest border border-black/20 dark:border-white/20 text-neutral-700 dark:text-neutral-300 rounded-xs">
                                {skill.badge}
                              </span>
                            )}
                            <span className="text-neutral-400 text-[11px]">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-[3px] bg-black/10 dark:bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                            className="h-full bg-black dark:bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Core highlight pill row */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 p-6 rounded-xs bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white">
                <Star className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-base font-serif text-black dark:text-white">
                  Full Stack Web Engineering Core
                </h4>
                <p className="text-xs text-neutral-500 font-serif italic">
                  Specialized in full-stack architecture, React ecosystems, cross-browser resilience, and responsive UX.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {['React.js', 'JavaScript (ES6+)', 'Node.js / REST APIs', 'HTML5 / CSS3', 'Tailwind CSS'].map((tag, i) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs border ${
                    i === 0
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
