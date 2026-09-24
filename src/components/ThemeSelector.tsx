import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme, ThemeId } from '../context/ThemeContext';

interface ThemeSelectorProps {
  variant?: 'navbar' | 'mobile' | 'floating';
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ variant = 'navbar' }) => {
  const { theme, setTheme, themes, currentThemeConfig, toggleDarkLight } = useTheme();
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
            <Palette className="w-3.5 h-3.5" />
            Theme Appearance
          </span>
          <span className="text-[10px] font-mono uppercase font-bold text-black dark:text-white">
            {currentThemeConfig.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                id={`mobile-theme-opt-${t.id}`}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2.5 p-2 rounded-xs border text-left transition-all ${
                  isSelected
                    ? 'border-black dark:border-white bg-black/10 dark:bg-white/10 font-bold'
                    : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-black/20 dark:border-white/20 shrink-0 flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: t.bgHex }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.accentHex }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] truncate text-black dark:text-white leading-tight font-serif">
                    {t.name}
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
      {/* Theme Trigger Button */}
      <div className="flex items-center gap-1">
        <button
          id="theme-palette-dropdown-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-black/[0.04] dark:bg-white/[0.06] rounded-full px-3 py-1.5 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 transition cursor-pointer text-[10px] uppercase tracking-wider text-black dark:text-white"
          aria-label="Change Theme"
          title="Change Color Theme"
        >
          {/* Swatch indicator circle */}
          <div
            className="w-3 h-3 rounded-full border border-black/30 dark:border-white/30 flex items-center justify-center shrink-0"
            style={{ backgroundColor: currentThemeConfig.bgHex }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: currentThemeConfig.accentHex }}
            />
          </div>

          <span className="font-mono text-[9px] font-bold tracking-wider hidden md:inline">
            {currentThemeConfig.name.toUpperCase()}
          </span>

          <Palette className="w-3 h-3 opacity-60 ml-0.5" />
        </button>
      </div>

      {/* Popover Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-64 p-3 rounded-xs bg-[#FAFAFA] dark:bg-[#141414] border border-black/20 dark:border-white/20 shadow-xl z-50 backdrop-blur-md"
            style={{
              backgroundColor: currentThemeConfig.cardHex,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                <Palette className="w-3 h-3" />
                <span>Select Aesthetic</span>
              </div>

              {/* Quick light/dark flip */}
              <button
                onClick={toggleDarkLight}
                className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs border border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white text-black dark:text-white transition"
                title="Toggle Light / Dark Base"
              >
                {theme === 'light' ? 'Go Dark' : 'Go Light'}
              </button>
            </div>

            {/* List of Theme Choices */}
            <div className="space-y-1.5">
              {themes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    id={`theme-opt-${t.id}`}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xs text-left transition-all ${
                      isSelected
                        ? 'bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Color Palette Preview Pill */}
                      <div
                        className="w-6 h-6 rounded-xs border border-black/20 dark:border-white/20 flex items-center justify-center p-0.5 shrink-0 shadow-xs"
                        style={{ backgroundColor: t.bgHex }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-xs"
                          style={{ backgroundColor: t.accentHex }}
                        />
                      </div>

                      <div>
                        <div className="text-xs font-serif text-black dark:text-white leading-tight">
                          {t.name}
                        </div>
                        <div className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400">
                          {t.tagline}
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
