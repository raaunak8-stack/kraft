import React from 'react';
import { Sun, Moon, Zap, Minimize2 } from 'lucide-react';
import { useTheme, Theme } from '../contexts/ThemeContext';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const themes: { id: Theme; label: string; icon: React.ComponentType<any>; color: string }[] = [
    { id: 'light', label: 'Light', icon: Sun, color: 'text-yellow-500' },
    { id: 'dark', label: 'Dark', icon: Moon, color: 'text-gray-400' },
    { id: 'neon', label: 'Neon', icon: Zap, color: 'text-cyan-400' },
    { id: 'minimal', label: 'Minimal', icon: Minimize2, color: 'text-gray-600' },
  ];

  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.id;
        
        return (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-110 ${
              isActive 
                ? `${themeClasses.accent} text-white` 
                : `${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`
            }`}
            title={themeOption.label}
          >
            <Icon size={16} className={isActive ? 'text-white' : themeOption.color} />
          </button>
        );
      })}
    </div>
  );
};