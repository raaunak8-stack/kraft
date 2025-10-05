import React, { useState } from 'react';
import { Upload, Palette, Type, Image as ImageIcon, Plus, Trash2, Download, Eye, CreditCard as Edit3, Save, Copy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const BrandKit: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeSection, setActiveSection] = useState('logos');

  const brandColors = [
    { name: 'Primary', hex: '#E1EC4C', usage: 'Main brand color' },
    { name: 'Secondary', hex: '#B31410', usage: 'Accent and highlights' },
    { name: 'Dark', hex: '#494B4F', usage: 'Text and contrast' },
    { name: 'Navy', hex: '#173472', usage: 'Professional elements' },
    { name: 'Black', hex: '#050621', usage: 'Typography and depth' },
  ];

  const brandFonts = [
    { name: 'Source Sans Pro', category: 'Primary', usage: 'Headers and titles' },
    { name: 'Source Sans Pro', category: 'Secondary', usage: 'Body text and descriptions' },
  ];

  const brandLogos = [
    { name: 'Primary Logo', type: 'SVG', size: '2.4 MB', url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { name: 'Secondary Logo', type: 'PNG', size: '1.8 MB', url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  ];

  const imageStyles = [
    { name: 'Style 1', url: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop' },
    { name: 'Style 2', url: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop' },
  ];

  const sections = [
    { id: 'logos', label: 'Logos', icon: ImageIcon },
    { id: 'colors', label: 'Color Palettes', icon: Palette },
    { id: 'fonts', label: 'Fonts', icon: Type },
    { id: 'images', label: 'Image Style', icon: ImageIcon },
  ];

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
          <div className="text-center flex-1">
                    <div className="flex items-center justify-start mb-2">
                      <Palette className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
                      <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                      Brand Kit
                      </h2>
                      {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
                    </div>
                    <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
                     Manage logos, colors, fonts, and rules for consistent brand identity
                    </p>
                  </div>

        {/* Section Navigation */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? `${themeClasses.accent} text-white`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={16} className="mr-1 md:mr-2" />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logos Section */}
        {activeSection === 'logos' && (
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-3 md:p-4`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text} mb-2`}>Logos</h3>
                <p className={`${themeClasses.textSecondary} text-xs md:text-sm`}>
                  Save multiple logos to easily apply while generating assets and documents
                </p>
              </div>
              <button className={`flex items-center px-3 py-2 ${themeClasses.accent} text-white rounded-lg hover:opacity-90 transition-all`}>
                <Upload size={16} className="mr-2" />
                <span className="hidden md:inline">Upload Logo</span>
                <span className="md:hidden">Upload</span>
              </button>
            </div>

            {/* Upload Area */}
            <div className={`border-2 border-dashed ${themeClasses.border} rounded-2xl p-12 text-center mb-6 ${themeClasses.hover} transition-all cursor-pointer`}>
              <Upload className={`${themeClasses.textSecondary} mx-auto mb-4`} size={48} />
              <h4 className={`${themeClasses.text} font-medium mb-2`}>Brand Kit/Visual Identity</h4>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                Drag and drop your logo files here or click to browse
              </p>
            </div>

            {/* Existing Logos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
              {brandLogos.map((logo, index) => (
                <div key={index} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4`}>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={logo.url} 
                      alt={logo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className={`${themeClasses.text} font-medium mb-1`}>{logo.name}</h4>
                  <p className={`${themeClasses.textSecondary} text-sm mb-3`}>
                    {logo.type} • {logo.size}
                  </p>
                  <div className="flex space-x-2">
                    <button className={`flex-1 p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}>
                      <Eye size={16} className={`${themeClasses.textSecondary} mx-auto`} />
                    </button>
                    <button className={`flex-1 p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}>
                      <Download size={16} className={`${themeClasses.textSecondary} mx-auto`} />
                    </button>
                    <button className={`flex-1 p-2 ${themeClasses.border} border rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors`}>
                      <Trash2 size={16} className="text-red-500 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Color Palettes</h3>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  Save multiple Color Palettes to easily apply while generating assets and documents
                </p>
              </div>
              <button className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all`}>
                <Plus size={16} className="mr-2" />
                New Color
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-4">
              {brandColors.map((color, index) => (
                <div key={index} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 group hover:shadow-lg transition-all`}>
                  <div 
                    className="aspect-square rounded-lg mb-3 relative overflow-hidden cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <Copy className="text-white opacity-0 group-hover:opacity-100 transition-all" size={20} />
                    </div>
                    <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <h4 className={`${themeClasses.text} font-medium text-sm mb-1`}>{color.name}</h4>
                  <p className={`${themeClasses.textSecondary} text-xs mb-2`}>{color.hex}</p>
                  <p className={`${themeClasses.textSecondary} text-xs`}>{color.usage}</p>
                </div>
              ))}
              
              {/* Add New Color */}
              <div className={`${themeClasses.border} border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer ${themeClasses.hover} transition-all`}>
                <Plus className={`${themeClasses.textSecondary} mb-2`} size={24} />
                <span className={`${themeClasses.textSecondary} text-sm font-medium`}>New Color</span>
              </div>
            </div>
          </div>
        )}

        {/* Fonts Section */}
        {activeSection === 'fonts' && (
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Fonts</h3>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  Save multiple fonts to easily apply while generating assets and documents
                </p>
              </div>
              <button className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all`}>
                <Plus size={16} className="mr-2" />
                Add Font
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {brandFonts.map((font, index) => (
                <div key={index} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-6 group hover:shadow-lg transition-all`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${themeClasses.accent} rounded-xl flex items-center justify-center`}>
                      <Type className="text-white" size={24} />
                    </div>
                    <button className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className={`${themeClasses.cardBg} rounded-xl p-4 mb-4`}>
                    <div className={`text-2xl font-bold ${themeClasses.text} mb-2`} style={{ fontFamily: font.name }}>
                      Aa
                    </div>
                    <p className={`${themeClasses.text} text-lg`} style={{ fontFamily: font.name }}>
                      {font.name}
                    </p>
                  </div>
                  
                  <h4 className={`${themeClasses.text} font-medium mb-1`}>{font.name}</h4>
                  <p className={`${themeClasses.textSecondary} text-sm mb-2`}>{font.category}</p>
                  <p className={`${themeClasses.textSecondary} text-xs`}>{font.usage}</p>
                </div>
              ))}
              
              {/* Add New Font */}
              <div className={`${themeClasses.border} border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer ${themeClasses.hover} transition-all`}>
                <Type className={`${themeClasses.textSecondary} mb-3`} size={32} />
                <span className={`${themeClasses.textSecondary} font-medium`}>New Font</span>
              </div>
            </div>
          </div>
        )}

        {/* Image Style Section */}
        {activeSection === 'images' && (
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Image Style</h3>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  Save multiple image styles to easily apply while generating assets and documents
                </p>
              </div>
              <button className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all`}>
                <Upload size={16} className="mr-2" />
                Upload Style
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
              {imageStyles.map((style, index) => (
                <div key={index} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 group hover:shadow-lg transition-all`}>
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={style.url} 
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className={`${themeClasses.text} font-medium`}>{style.name}</h4>
                    <button className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add New Style */}
              <div className={`${themeClasses.border} border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer ${themeClasses.hover} transition-all aspect-video`}>
                <ImageIcon className={`${themeClasses.textSecondary} mb-2`} size={32} />
                <span className={`${themeClasses.textSecondary} font-medium`}>Image Style</span>
              </div>
            </div>
          </div>
        )}
      </div>
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};