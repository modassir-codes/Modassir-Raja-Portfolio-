import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId = 'dark' | 'light' | 'emerald' | 'nordic' | 'amber' | 'violet';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  category: 'dark' | 'light';
  tagline: string;
  bgHex: string;
  cardHex: string;
  accentHex: string;
  textHex: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Obsidian Dark',
    category: 'dark',
    tagline: 'Classic deep monochrome palette',
    bgHex: '#0A0A0A',
    cardHex: '#141414',
    accentHex: '#FFFFFF',
    textHex: '#EDEDED',
  },
  {
    id: 'light',
    name: 'Editorial Light',
    category: 'light',
    tagline: 'High-contrast parchment minimalism',
    bgHex: '#FAFAFA',
    cardHex: '#FFFFFF',
    accentHex: '#111111',
    textHex: '#171717',
  },
  {
    id: 'emerald',
    name: 'Terminal Matrix',
    category: 'dark',
    tagline: 'Cyber green & hacker aesthetic',
    bgHex: '#080F0C',
    cardHex: '#0E1A14',
    accentHex: '#10B981',
    textHex: '#E6FCF2',
  },
  {
    id: 'nordic',
    name: 'Nordic Sapphire',
    category: 'dark',
    tagline: 'Deep arctic slate & electric blue',
    bgHex: '#0B1120',
    cardHex: '#111B30',
    accentHex: '#38BDF8',
    textHex: '#F0F9FF',
  },
  {
    id: 'amber',
    name: 'Vintage Amber',
    category: 'dark',
    tagline: 'Warm espresso & gold highlight',
    bgHex: '#120E0B',
    cardHex: '#1C1510',
    accentHex: '#F59E0B',
    textHex: '#FEF3C7',
  },
  {
    id: 'violet',
    name: 'Tokyo Violet',
    category: 'dark',
    tagline: 'Midnight synthwave & vibrant lilac',
    bgHex: '#0E0918',
    cardHex: '#171026',
    accentHex: '#C084FC',
    textHex: '#FAF5FF',
  },
];

interface ThemeContextType {
  theme: ThemeId;
  currentThemeConfig: ThemeOption;
  setTheme: (theme: ThemeId) => void;
  toggleDarkLight: () => void;
  themes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('modassir_portfolio_theme_id') as ThemeId | null;
    const validTheme = THEME_OPTIONS.find((t) => t.id === saved);
    if (validTheme) {
      return validTheme.id;
    }
    return 'dark'; // default to Obsidian Dark
  });

  const currentThemeConfig = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  useEffect(() => {
    const root = document.documentElement;

    // Remove all previous theme classes
    THEME_OPTIONS.forEach((t) => {
      root.classList.remove(`theme-${t.id}`);
    });

    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Manage standard tailwind 'dark' class
    if (currentThemeConfig.category === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties on document element for reactive styles
    root.style.setProperty('--bg-main', currentThemeConfig.bgHex);
    root.style.setProperty('--bg-card', currentThemeConfig.cardHex);
    root.style.setProperty('--color-accent', currentThemeConfig.accentHex);
    root.style.setProperty('--color-text', currentThemeConfig.textHex);

    localStorage.setItem('modassir_portfolio_theme_id', theme);
  }, [theme, currentThemeConfig]);

  const toggleDarkLight = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentThemeConfig,
        setTheme,
        toggleDarkLight,
        themes: THEME_OPTIONS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
