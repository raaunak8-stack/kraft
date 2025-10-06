import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Sparkles,
  Target,
  Settings,
  Layers3,
  TrendingUp,
  Shield,
  Palette as PaletteIcon,
  LogOut,
  Activity,
  ChevronDown,
  ChevronRight,
  Megaphone
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const mainMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
  // { id: 'brandmanager', label: 'Brand Manager', icon: Activity, color: 'text-emerald-600' },
  { id: 'strategy', label: 'Campaign Studio', icon: Target, color: 'text-green-600' },
  { id: 'creator', label: 'Creator Studio', icon: Sparkles, color: 'text-blue-600' },
  { id: 'marketingstudio', label: 'Marketing Studio', icon: Megaphone, color: 'text-teal-600' },
  // { id: 'marketingstudio2', label: 'Marketing Studio 2', icon: Megaphone, color: 'text-teal-600' },
  // { id: 'marketingstudio3', label: 'Marketing Studio 3', icon: Megaphone, color: 'text-teal-600' },
  { id: 'brandkit', label: 'Brand Kit', icon: PaletteIcon, color: 'text-indigo-600' },
  // { id: 'performanceagent', label: 'Agency Performance Monitor', icon: Activity, color: 'text-purple-600' },
  // { id: 'strategy1', label: 'Campaign Studio New', icon: Target, color: 'text-green-600' },
];

const performanceGovernanceItems = [
  { id: 'performance', label: 'Performance Cockpit', icon: TrendingUp, color: 'text-red-600' },
  { id: 'admin', label: 'Admin Controls', icon: Shield, color: 'text-red-600' },
];

const intelligenceOperationsItems = [
  { id: 'integrations', label: 'Integrations', icon: Settings, color: 'text-green-600' },
  { id: 'simulations', label: 'Simulations & Optimization', icon: Layers3, color: 'text-green-600' },
  { id: 'agents', label: 'AI Agents', icon: Users, color: 'text-orange-600' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange ,setIsLoggedIn}) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [performanceOpen, setPerformanceOpen] = useState(true);
  const [intelligenceOpen, setIntelligenceOpen] = useState(true);

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.id}
        onClick={() => onTabChange(item.id)}
        className={`w-full flex items-center px-2 md:px-3 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 group ${
          isActive
            ? `${themeClasses.gradient} border ${themeClasses.border}`
            : `${themeClasses.hover} hover:shadow-sm`
        }`}
        title={item.label}
      >
        <Icon
          size={16}
          className={`md:mr-3 transition-colors ${
            isActive ? item.color : `${themeClasses.textSecondary} group-hover:${themeClasses.text}`
          }`}
        />
        <span className={`text-sm font-medium transition-colors hidden md:block ${
          isActive ? themeClasses.text : `${themeClasses.textSecondary} group-hover:${themeClasses.text}`
        }`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className={`w-16 md:w-[270px] ${themeClasses.cardBg} border-r ${themeClasses.border} h-screen flex flex-col transition-all duration-500`}>
      <div className={`p-2 md:p-4 border-b ${themeClasses.border}`}>
         <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                    KRAFT
                      </h2>
        <h1 className={`text-xs font-bold ${themeClasses.text} md:hidden text-center`}>BM</h1>
        <p className={`text-xs ${themeClasses.textSecondary} mt-1 hidden md:block`}>Campaign Orchestrator</p>
      </div>

      <nav className="flex-1 p-1 md:p-3 space-y-1 overflow-y-auto">
        {mainMenuItems.map(renderMenuItem)}

        <div className="pt-2">
          <button
            onClick={() => setPerformanceOpen(!performanceOpen)}
            className={`w-full flex items-center justify-between px-2 md:px-3 py-2 rounded-lg transition-all duration-300 ${themeClasses.hover}`}
          >
            <span className={`text-xs font-semibold ${themeClasses.text} uppercase tracking-wider hidden md:block`}>
              Performance & Governance
            </span>
            <span className={`text-xs font-semibold ${themeClasses.text} md:hidden`}>P&G</span>
            {performanceOpen ? (
              <ChevronDown size={14} className={`${themeClasses.textSecondary} hidden md:block`} />
            ) : (
              <ChevronRight size={14} className={`${themeClasses.textSecondary} hidden md:block`} />
            )}
          </button>
          {performanceOpen && (
            <div className="space-y-1 mt-1">
              {performanceGovernanceItems.map(renderMenuItem)}
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIntelligenceOpen(!intelligenceOpen)}
            className={`w-full flex items-center justify-between px-2 md:px-3 py-2 rounded-lg transition-all duration-300 ${themeClasses.hover}`}
          >
            <span className={`text-xs font-semibold ${themeClasses.text} uppercase tracking-wider hidden md:block`}>
              Intelligence & Operations
            </span>
            <span className={`text-xs font-semibold ${themeClasses.text} md:hidden`}>I&O</span>
            {intelligenceOpen ? (
              <ChevronDown size={14} className={`${themeClasses.textSecondary} hidden md:block`} />
            ) : (
              <ChevronRight size={14} className={`${themeClasses.textSecondary} hidden md:block`} />
            )}
          </button>
          {intelligenceOpen && (
            <div className="space-y-1 mt-1">
              {intelligenceOperationsItems.map(renderMenuItem)}
            </div>
          )}
        </div>
      </nav>

      <div className={`p-2 md:p-3 border-t ${themeClasses.border} space-y-2 md:space-y-3`}>
        {/* Theme Selector */}
        <div className="hidden md:block">
          <p className={`text-xs ${themeClasses.textSecondary} mb-1 font-medium`}>Theme</p>
          <ThemeSelector />
        </div>
        <div className="md:hidden flex justify-center">
          <ThemeSelector />
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-500  rounded-xl p-2 md:p-3 text-white hidden md:block">
          <div className='flex justify-between'>
            <p className="font-medium text-xs">Brand Profile</p>
            <div className='flex gap-1 items-center cursor-pointer hover:scale-110 duration-300' onClick={()=>{setIsLoggedIn(false);localStorage.clear()}}>
               <p className="font-medium text-xs">Logout</p>
               <LogOut className='w-4 h-4'/>
            </div>
         
          </div>
          
          <div className="flex items-center mt-1">
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">P</span>
            </div>
            <span className="ml-2 text-xs">Premium</span>
          </div>
        </div>
        <div className="md:hidden bg-gradient-to-r from-blue-500 to-blue-500  rounded-lg p-2 text-white flex justify-center">
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">P</span>
          </div>
        </div>
      </div>
    </div>
  );
};