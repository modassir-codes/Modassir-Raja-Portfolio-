import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ExternalLink,
  Github,
  Activity,
  ShieldCheck,
  Layers,
  Kanban,
  Wallet,
  PieChart,
  ArrowUpRight,
  X,
  Plus,
  Clock,
} from 'lucide-react';
import { PROJECTS } from '../data/resumeData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, scrollViewport } from '../utils/animations';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'react' | 'ui' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms for background depth
  const yProjectsWatermark = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yProjectsGrid = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yMarkerTop = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yMarkerBottom = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.015, 0.035, 0.015]);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Kanban':
        return <Kanban className="w-5 h-5" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const filterOptions = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'react', label: t.projects.filterReact },
    { id: 'ui', label: t.projects.filterUi },
    { id: 'fullstack', label: t.projects.filterFullstack },
  ];

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative py-24 border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Parallax Background Layer 1: Oversized Numeral & Archive Watermark */}
      <motion.div
        style={{ y: yProjectsWatermark, opacity: watermarkOpacity }}
        className="absolute top-1/4 right-0 select-none pointer-events-none whitespace-nowrap text-[22vw] font-serif font-bold text-black dark:text-white leading-none z-0 tracking-tighter"
        aria-hidden="true"
      >
        ARCHIVE
      </motion.div>

      {/* Parallax Background Layer 2: Subtle Technical Guide Marks */}
      <motion.div
        style={{ y: yProjectsGrid }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="max-w-7xl mx-auto h-full relative px-4 sm:px-6 lg:px-8">
          <div className="absolute top-1/3 left-6 font-mono text-[9px] text-neutral-400/40 dark:text-neutral-600/50 uppercase tracking-[0.25em]">
            + [PRJ // ARCHIVE.DIR]
          </div>
          <div className="absolute bottom-1/4 right-10 font-mono text-[9px] text-neutral-400/40 dark:text-neutral-600/50 uppercase tracking-[0.25em]">
            + [SEC_02 // DEPLOYED]
          </div>
        </div>
      </motion.div>

      {/* Parallax Background Layer 3: Floating Crosshairs */}
      <motion.div
        style={{ y: yMarkerTop }}
        className="absolute top-1/2 left-2 md:left-8 pointer-events-none z-0 hidden sm:flex flex-col items-center gap-1 font-mono text-[8px] tracking-widest text-neutral-400/40"
        aria-hidden="true"
      >
        <Plus className="w-4 h-4 opacity-30" />
        <span>SEC_02</span>
      </motion.div>

      <motion.div
        style={{ y: yMarkerBottom }}
        className="absolute bottom-1/3 right-2 md:right-8 pointer-events-none z-0 hidden sm:flex flex-col items-center gap-1 font-mono text-[8px] tracking-widest text-neutral-400/40"
        aria-hidden="true"
      >
        <span>INDEX.04</span>
        <Plus className="w-4 h-4 opacity-30" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                {t.projects.sectionNum}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-black dark:text-white mb-3">
                {t.projects.title}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 font-serif italic">
                {t.projects.subtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xs border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02]">
              {filterOptions.map((tab) => (
                <button
                  key={tab.id}
                  id={`filter-tab-${tab.id}`}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-xs transition-all ${
                    activeFilter === tab.id
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group relative bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 rounded-xs p-6 sm:p-8 flex flex-col justify-between hover:border-black/50 dark:hover:border-white/50 transition-all shadow-xs"
              >
                <div>
                  {/* Top Bar: Icon + Index + Reading Time + Category */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xs border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition">
                        {getProjectIcon(project.iconName)}
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        // 0{index + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 bg-black/[0.03] dark:bg-white/[0.03] px-2 py-0.5 rounded-xs border border-black/10 dark:border-white/10">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{project.readingTime || '4 min read'}</span>
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-black/20 dark:border-white/20 rounded-xs text-neutral-600 dark:text-neutral-400">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white mb-1 group-hover:underline underline-offset-4 decoration-1">
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="text-xs font-serif italic text-neutral-500 dark:text-neutral-400 mb-3">
                      {project.tagline}
                    </p>
                  )}

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features preview */}
                  <div className="space-y-2 mb-6 font-mono text-xs">
                    {project.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-neutral-400">›</span>
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono uppercase rounded-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider rounded-xs text-white bg-black dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-xs"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider rounded-xs text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white transition"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              className="relative w-full max-w-2xl bg-[#FAFAFA] dark:bg-[#0F0F0F] rounded-xs border border-black/20 dark:border-white/20 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xs border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white">
                    {getProjectIcon(selectedProject.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.tagline && (
                      <p className="text-xs font-serif italic text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {selectedProject.tagline}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                        CASE // {selectedProject.category.toUpperCase()}
                      </p>
                      <span className="text-neutral-400 font-mono text-[10px]">•</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{selectedProject.readingTime || '4 min read'}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 my-6">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Overview
                  </h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {selectedProject.overviewHighlights && selectedProject.overviewHighlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xs">
                    {selectedProject.overviewHighlights.map((hl) => (
                      <div key={hl.label} className="space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black dark:text-white block">
                          {hl.label}
                        </span>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {hl.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    {t.projects.keyFeatures}
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                        <span className="font-mono text-xs text-neutral-400">—</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProject.privacyNote && (
                  <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 rounded-xs">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block mb-1">
                      Privacy
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {selectedProject.privacyNote}
                    </p>
                  </div>
                )}

                {selectedProject.developerInfo && (
                  <div className="flex items-center justify-between p-3.5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xs font-mono text-xs">
                    <span className="text-neutral-500 text-[10px] uppercase tracking-wider">Developer</span>
                    <div className="text-right">
                      <span className="text-black dark:text-white font-bold block">{selectedProject.developerInfo.name}</span>
                      <span className="text-neutral-500 text-[10px]">{selectedProject.developerInfo.role}</span>
                    </div>
                  </div>
                )}

                {selectedProject.metrics && (
                  <div className="p-4 bg-black/[0.03] dark:bg-white/[0.03] border-l-2 border-black dark:border-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      {t.projects.impactMetric}:
                    </span>
                    <span className="text-sm font-mono text-black dark:text-white">
                      {selectedProject.metrics}
                    </span>
                  </div>
                )}

                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Tech Stack Badges
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono uppercase rounded-xs bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-mono uppercase font-bold tracking-wider rounded-xs text-white bg-black dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{selectedProject.id === 'money-notes' ? 'Open Money Notes' : selectedProject.id === 'etracker' ? 'Open eTracker' : 'Live Demo'}</span>
                  </a>
                )}
                {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase font-bold tracking-wider rounded-xs text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    {t.projects.viewCode}
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 text-[11px] font-mono uppercase font-bold tracking-wider rounded-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 transition cursor-pointer"
                >
                  {t.projects.closeModal}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
