import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Check, Globe } from 'lucide-react';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'mobile';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'navbar' }) => {
  const { language, setLanguage, languages, currentLanguageConfig, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="w-full pt-4 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            {t.nav.language}
          </span>
          <span className="text-[10px] font-mono uppercase font-bold text-black dark:text-white">
            {currentLanguageConfig.nativeName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                id={`mobile-lang-opt-${lang.code}`}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-2.5 p-2 rounded-xs border text-left transition-all ${
                  isSelected
                    ? 'border-black dark:border-white bg-black/10 dark:bg-white/10 font-bold'
                    : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                <span className="text-sm shrink-0">{lang.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] truncate text-black dark:text-white font-serif">
                    {lang.nativeName}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                    {lang.label}
                  </div>
                </div>
                {isSelected && <Check className="w-3 h-3 text-black dark:text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black/[0.04] dark:bg-white/[0.06] rounded-full px-3 py-1.5 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 transition cursor-pointer text-[10px] uppercase tracking-wider text-black dark:text-white"
        aria-label="Switch Language"
        title="Switch Language"
      >
        <span className="text-xs leading-none">{currentLanguageConfig.flag}</span>
        <span className="font-mono text-[9px] font-bold tracking-wider">
          {currentLanguageConfig.code.toUpperCase()}
        </span>
        <Languages className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-56 p-2 rounded-xs bg-[#FAFAFA] dark:bg-[#141414] border border-black/20 dark:border-white/20 shadow-xl z-50 backdrop-blur-md"
            style={{
              backgroundColor: 'var(--bg-card)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-black/10 dark:border-white/10">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-1.5">
                <Globe className="w-3 h-3" />
                Select Language
              </span>
            </div>

            {/* List of languages */}
            <div className="space-y-1">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`lang-opt-${lang.code}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xs text-left transition-all ${
                      isSelected
                        ? 'bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div>
                        <div className="text-xs font-serif text-black dark:text-white font-medium">
                          {lang.nativeName}
                        </div>
                        <div className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400">
                          {lang.label} ({lang.code.toUpperCase()})
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-black dark:text-white shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
