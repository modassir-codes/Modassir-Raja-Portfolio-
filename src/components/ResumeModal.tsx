import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Check, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto no-print">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FAFAFA] dark:bg-[#0F0F0F] border border-black/20 dark:border-white/20 rounded-xs shadow-2xl overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-black dark:text-white flex items-center gap-2">
                  Curriculum Vitae — Modassir Raja
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs border border-black/20 dark:border-white/20 text-black dark:text-white">
                    PDF READY
                  </span>
                </h3>
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Formatted for standard A4 / Letter format & ATS compatibility
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="resume-modal-print-btn"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-xs text-black dark:text-white border border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white transition cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3 h-3" />
                {t.resumeModal.printBtn}
              </button>

              <button
                id="resume-modal-download-btn"
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-mono uppercase font-bold tracking-wider rounded-xs text-white bg-black dark:bg-white dark:text-black hover:opacity-80 transition cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3 h-3" />
                    Opening Print...
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3" />
                    {t.resumeModal.downloadPdf}
                  </>
                )}
              </button>

              <button
                id="resume-modal-close-btn"
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Printable Document Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-100 dark:bg-neutral-900/60">
            {/* The A4-like Document Paper */}
            <div
              id="printable-resume-paper"
              className="max-w-3xl mx-auto bg-white text-black p-8 sm:p-12 border border-black/15 shadow-md font-serif"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-5 border-b border-black/20 text-center sm:text-left">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-black mb-1">
                    Modassir Raja
                  </h1>
                  <p className="text-sm font-mono uppercase tracking-widest text-neutral-600 mb-2">
                    {PERSONAL_INFO.title}
                  </p>
                  <div className="text-xs text-neutral-600 font-mono flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
                    <span>Hyderabad, India</span>
                    <span>/</span>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-black hover:underline">
                      LinkedIn
                    </a>
                    <span>/</span>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-black hover:underline">
                      GitHub
                    </a>
                    <span>/</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-black hover:underline">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Passport/Profile Photo in CV */}
                <div className="w-20 h-24 rounded-xs border border-black/25 overflow-hidden shrink-0 shadow-xs bg-neutral-100">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-5">
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 mb-2">
                  Summary
                </h2>
                <p className="text-xs leading-relaxed text-neutral-800 text-justify">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mt-5">
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 mb-2">
                  Technical Skills
                </h2>
                <div className="text-xs leading-relaxed space-y-1">
                  <p>
                    <strong className="font-semibold text-black">Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), React.js, Responsive Web Design
                  </p>
                  <p>
                    <strong className="font-semibold text-black">UI & UX:</strong> Accessibility (WCAG standards), Cross-Browser Testing, Component Architecture
                  </p>
                  <p>
                    <strong className="font-semibold text-black">Tools:</strong> Git, GitHub, VS Code, Chrome DevTools
                  </p>
                  <p>
                    <strong className="font-semibold text-black">Engineering:</strong> SDLC, Debugging, Code Reviews, Agile Principles
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="mt-5">
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 mb-2">
                  Experience
                </h2>

                <div className="space-y-4">
                  {/* Job 1 */}
                  <div>
                    <div className="flex justify-between items-baseline font-mono text-xs">
                      <h3 className="font-bold text-black font-serif text-sm">
                        Software Engineering Virtual Experience Participant
                      </h3>
                      <span className="text-neutral-500">Jan 2026</span>
                    </div>
                    <div className="text-xs text-neutral-600 font-mono mb-1">
                      Forage — Commonwealth Bank (Remote)
                    </div>
                    <ul className="list-disc list-outside ml-4 text-xs text-neutral-800 space-y-1">
                      <li>Built and styled a responsive web page using HTML and CSS following real-world brand guidelines.</li>
                      <li>Applied UI design principles including typography systems, layout hierarchy, and HEX-based color standards.</li>
                      <li>Created cybersecurity-focused client content aligned with secure software engineering practices.</li>
                      <li>Researched and documented secure hosting concepts including SSL, firewalls, backups, and scalability.</li>
                      <li>Followed security-first development workflows used in production engineering teams.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div>
                    <div className="flex justify-between items-baseline font-mono text-xs">
                      <h3 className="font-bold text-black font-serif text-sm">
                        Software Developer Intern
                      </h3>
                      <span className="text-neutral-500">Mar 2022 – Jun 2022</span>
                    </div>
                    <div className="text-xs text-neutral-600 font-mono mb-1">
                      Intment Technologies (P) Ltd., Hyderabad
                    </div>
                    <ul className="list-disc list-outside ml-4 text-xs text-neutral-800 space-y-1">
                      <li>Contributed to a Hospital Management System as part of a collaborative engineering team.</li>
                      <li>Developed and enhanced UI components using C# and Bootstrap, improving layout consistency and usability.</li>
                      <li>Assisted in building, testing, and debugging core application workflows.</li>
                      <li>Collaborated with mentors to understand system architecture, SDLC phases, and code review processes.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-5">
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 mb-2">
                  Certifications
                </h2>
                <ul className="list-disc list-outside ml-4 text-xs text-neutral-800 space-y-1">
                  <li>JavaScript Bootcamp</li>
                  <li>HTML & CSS Bootcamp</li>
                  <li>Commonwealth Bank — Introduction to Software Engineering Job Simulation</li>
                </ul>
              </div>

              {/* Education */}
              <div className="mt-5">
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 mb-2">
                  Education
                </h2>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between items-baseline font-mono text-xs">
                      <h3 className="font-bold text-black font-serif text-sm">Bachelor of Science in Computer Science</h3>
                      <span className="text-neutral-500">2022 – 2025</span>
                    </div>
                    <p className="text-neutral-600 font-serif">Shadan College of Engineering and Technology</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline font-mono text-xs">
                      <h3 className="font-bold text-black font-serif text-sm">Diploma in Information Technology</h3>
                      <span className="text-neutral-500">2019 – 2022</span>
                    </div>
                    <p className="text-neutral-600 font-serif">Maulana Azad National Urdu University, Hyderabad</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mt-5">
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 mb-2">
                  Languages
                </h2>
                <div className="text-xs font-mono text-neutral-800 flex gap-4">
                  <span><strong>Hindi</strong> (Full Professional)</span>
                  <span><strong>English</strong> (Professional Working)</span>
                  <span><strong>Urdu</strong> (Professional Working)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-mono uppercase text-neutral-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>* Tip: Use your browser's Print dialog to export as a clean PDF document.</span>
            </span>
            <button
              onClick={onClose}
              className="text-black dark:text-white font-bold hover:underline cursor-pointer"
            >
              {t.resumeModal.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
