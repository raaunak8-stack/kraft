import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'neon' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeClasses: () => ThemeClasses;
}

interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  hover: string;
  gradient: string;
  shadow: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const getThemeClasses = (): ThemeClasses => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gray-900',
          cardBg: 'bg-gray-800',
          text: 'text-white',
          textSecondary: 'text-gray-300',
          border: 'border-gray-700',
          accent: 'bg-blue-600',
          hover: 'hover:bg-gray-700',
          gradient: 'bg-gradient-to-br from-blue-900 to-blue-900',
          shadow: 'shadow-2xl shadow-blue-500/20'
        };
      case 'neon':
        return {
          bg: 'bg-black',
          cardBg: 'bg-gray-900',
          text: 'text-cyan-400',
          textSecondary: 'text-blue-300',
          border: 'border-cyan-500',
          accent: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          hover: 'hover:bg-gray-800',
          gradient: 'bg-gradient-to-br from-cyan-900 to-blue-900',
          shadow: 'shadow-2xl shadow-cyan-500/50'
        };
      case 'minimal':
        return {
          bg: 'bg-white',
          cardBg: 'bg-gray-50',
          text: 'text-gray-800',
          textSecondary: 'text-gray-500',
          border: 'border-gray-100',
          accent: 'bg-gray-900',
          hover: 'hover:bg-gray-100',
          gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
          shadow: 'shadow-lg shadow-gray-200/50'
        };
      default: // light
        return {
          bg: 'bg-gray-50',
          cardBg: 'bg-white',
          text: 'text-gray-900',
          textSecondary: 'text-gray-700',
          border: 'border-gray-200',
          accent: 'bg-blue-500',
          hover: 'hover:bg-gray-50',
          gradient: 'bg-gradient-to-br from-blue-50 to-blue-50',
          shadow: 'shadow-xl shadow-blue-500/10'
        };
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};