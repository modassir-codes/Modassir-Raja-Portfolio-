import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Layers,
  GraduationCap,
  MapPin,
  CheckCircle2,
  ArrowRight,
  FileDown,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { staggerContainer, fadeInUp, scrollViewport } from '../utils/animations';

interface AboutSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenResume,
  onOpenContact,
}) => {
  const highlights = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'Frontend Craftsmanship',
      description:
        'Building responsive, accessible (WCAG), and high-performance user interfaces using React, JavaScript (ES6+), Tailwind CSS, and semantic HTML5.',
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: 'Backend & API Integration',
      description:
        'Designing RESTful APIs and server architectures with Node.js, Express, and structured data handling with MongoDB and client persistence.',
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: 'Practical Problem Solving',
      description:
        'Focusing on useful, real-world applications—from offline-first utility apps to full-stack messaging platforms—delivering clean and dependable code.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 border-b border-black/10 dark:border-white/10 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="max-w-3xl mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2.5 block">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-black dark:text-white mb-4">
              Full Stack Web Developer Building Practical Applications
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-serif italic leading-relaxed">
              Combining a solid computer science education with hands-on development experience to create reliable, modern, and user-centric web software.
            </p>
          </motion.div>

          {/* Main About Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Narrative Column */}
            <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6">
              <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 rounded-xs p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-serif text-black dark:text-white">
                  Engineering Philosophy
                </h3>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  I am a Full Stack Web Developer dedicated to engineering practical web applications that prioritize clarity, responsiveness, and performance. My background combines formal academic training in computer science with direct hands-on development experience in collaborative engineering environments.
                </p>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Whether developing client-side offline tools like <em>Money Notes</em>, modern financial trackers like <em>Expense Tracker</em>, or full-stack communication platforms with the MERN stack, I focus on clean component architecture, reliable data flow, and intuitive user experiences.
                </p>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Clean, Maintainable Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Responsive Cross-Device Layouts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>RESTful API & Full-Stack Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>SDLC & Git Team Workflows</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xs font-mono font-bold text-xs uppercase tracking-wider text-white bg-black dark:bg-white dark:text-black hover:opacity-85 transition shadow-xs"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  id="about-download-resume-btn"
                  href="/resume.pdf"
                  download="Modassir-Raja-Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xs font-mono font-bold text-xs uppercase tracking-wider text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>

            {/* Right Pillars & Facts Column */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 rounded-xs p-5 hover:border-black/35 dark:hover:border-white/35 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-serif text-black dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick factual profile summary card */}
              <div className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/15 dark:border-white/15 rounded-xs p-5 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">Target Role</span>
                  <span className="text-black dark:text-white font-bold">{PERSONAL_INFO.title}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">Location</span>
                  <span className="text-neutral-700 dark:text-neutral-300">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">Education</span>
                  <span className="text-neutral-700 dark:text-neutral-300 text-right">B.Tech in Computer Science and Engineering (CSE)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
