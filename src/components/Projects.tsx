import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Activity,
  ShieldCheck,
  Wallet,
  PieChart,
  ArrowUpRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { PROJECTS } from '../data/resumeData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { fadeInUp } from '../utils/animations';

export type ProjectFilter = 'all' | 'fullstack' | 'react' | 'ui';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wasOutOfViewRef = useRef<boolean>(false);

  // Normalize project categories to ensure resilient matching
  const normalizeCategory = (cat?: string): string => {
    if (!cat) return '';
    const lower = String(cat).toLowerCase().trim();
    if (lower.includes('fullstack') || lower.includes('full-stack')) return 'fullstack';
    if (lower.includes('react')) return 'react';
    if (lower.includes('ui') || lower.includes('system')) return 'ui';
    return lower;
  };

  // Safe category filtering preventing undefined or missing property bugs
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(PROJECTS) || PROJECTS.length === 0) {
      return [];
    }
    if (activeFilter === 'all') {
      return PROJECTS;
    }
    return PROJECTS.filter((proj) => {
      if (!proj || !proj.id) return false;
      const cat = normalizeCategory(proj.category);
      return cat === activeFilter;
    });
  }, [activeFilter]);

  // Reset to 'all' safely when user navigates away and returns to the Projects section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            wasOutOfViewRef.current = true;
          } else {
            if (wasOutOfViewRef.current) {
              // When returning to the section after being away, safely reset to 'all'
              setActiveFilter('all');
              wasOutOfViewRef.current = false;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Listen to hash changes (e.g. clicking nav links like #projects)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#projects') {
        setActiveFilter('all');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wallet':
        return <Wallet className="w-5 h-5" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const filterOptions: { id: ProjectFilter; label: string }[] = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'fullstack', label: t.projects.filterFullstack },
    { id: 'react', label: t.projects.filterReact },
    { id: 'ui', label: t.projects.filterUi },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-28 border-b border-black/10 dark:border-white/10 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div>
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2.5 block">
                {t.projects.sectionNum}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-black dark:text-white mb-3">
                Featured Projects
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-serif italic">
                Practical, real-world web applications built with modern frontend and full-stack technologies.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xs border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02]">
              {filterOptions.map((tab) => (
                <button
                  key={tab.id}
                  id={`filter-tab-${tab.id}`}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center border border-dashed border-black/15 dark:border-white/15 rounded-xs p-8 bg-black/[0.01] dark:bg-white/[0.01]">
                <p className="text-base font-serif italic text-neutral-600 dark:text-neutral-400 mb-4">
                  No projects found in this category.
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold rounded-xs bg-black text-white dark:bg-white dark:text-black hover:opacity-85 transition cursor-pointer"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => {
                const hasLive = Boolean(project.liveUrl && project.liveUrl !== '#');
                const hasGithub = Boolean(project.githubUrl && project.githubUrl !== '#');

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="project-card-interactive group relative bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 rounded-xs p-6 sm:p-7 flex flex-col justify-between transition-all duration-250 ease-out shadow-xs"
                  >
                    <div>
                      {/* Top Bar: Icon + Category Badge */}
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/10 dark:border-white/10">
                        <div className="w-10 h-10 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition">
                          {getProjectIcon(project.iconName)}
                        </div>

                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 border border-black/15 dark:border-white/15 rounded-xs text-neutral-600 dark:text-neutral-400">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white mb-1.5 font-medium group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>

                      {/* Tagline if available */}
                      {project.tagline && (
                        <p className="text-xs font-serif italic text-neutral-500 dark:text-neutral-400 mb-3">
                          {project.tagline}
                        </p>
                      )}

                      {/* Short Description */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Technical Highlights (2 bullets) */}
                      <div className="space-y-1.5 mb-5 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                        {project.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Used */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
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

                    {/* Bottom Action Buttons: Live Demo, GitHub, View Details */}
                    <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {hasLive && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xs text-white bg-black dark:bg-white dark:text-black hover:opacity-85 transition shadow-xs"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider rounded-xs text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white transition cursor-pointer"
                        title="View Project Details"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-2xl bg-[#FAFAFA] dark:bg-[#0F0F0F] rounded-xs border border-black/20 dark:border-white/20 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white">
                    {getProjectIcon(selectedProject.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white font-medium">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.tagline && (
                      <p className="text-xs font-serif italic text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {selectedProject.tagline}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 my-6">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
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
                    Key Features
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
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      Data & Privacy Architecture
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {selectedProject.privacyNote}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Technologies Applied
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

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase font-bold tracking-wider rounded-xs text-white bg-black dark:bg-white dark:text-black hover:opacity-85 transition shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase font-bold tracking-wider rounded-xs text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 text-xs font-mono uppercase font-bold tracking-wider rounded-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
