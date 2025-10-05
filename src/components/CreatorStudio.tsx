import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Video, Wand2, Settings, Download, Share2, RefreshCw, Plus, ChevronDown, Play, Pause, Eye, Heart, MessageCircle, Send, Check, X, ArrowRight, ArrowLeft, Upload, Palette, Type, LayoutGrid as Layout, Zap, Brain, Cpu, Database, CheckCircle, Clock, AlertCircle, CreditCard as Edit3, Copy, Trash2, MoreHorizontal, Instagram, Facebook, Twitter, Youtube, Linkedin, Globe, Smartphone, Monitor, Tablet, Star, Layers, Filter, Maximize2, Minimize2, BarChart3Icon, Target, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import video_file from "./video.mp4"
import img_1 from "./1.jpg"
interface GeneratedAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
  prompt: string;
  brandKit?: string;
  logoPlacement?: string;
  format?: string;
  styling?: string;
  isSelected: boolean;
  variations?: GeneratedAsset[];
}

interface CreationStep {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  description: string;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  dimensions: string;
  aspectRatio: string;
  color: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'pending' | 'approved' | 'running' | 'paused' | 'completed';
  type: 'awareness' | 'conversion' | 'engagement' | 'retention';
  budget: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  audience: string;
  objectives: string[];
  createdAt: Date;
}

export const CreatorStudio: React.FC = ({setActiveTab}) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  
  const [activeStep, setActiveStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [selectedBrandKit, setSelectedBrandKit] = useState('');
  const [selectedLogoPlacement, setSelectedLogoPlacement] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedStyling, setSelectedStyling] = useState('');
  const [contentType, setContentType] = useState<'image' | 'video'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentProcess, setCurrentProcess] = useState('');
  const [showAddBrandKit, setShowAddBrandKit] = useState(false);
  const [showAddLogoPlacement, setShowAddLogoPlacement] = useState(false);
  const [showAddFormat, setShowAddFormat] = useState(false);
  const [showAddStyling, setShowAddStyling] = useState(false);
  const [newBrandKit, setNewBrandKit] = useState('');
  const [newLogoPlacement, setNewLogoPlacement] = useState('');
  const [newFormat, setNewFormat] = useState('');
  const [newStyling, setNewStyling] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [previewAsset, setPreviewAsset] = useState<GeneratedAsset | null>(null);
  const [changeRequests, setChangeRequests] = useState('');

  const steps: CreationStep[] = [
    { id: 'create', title: 'Create Content', status: 'active', description: 'Generate images/videos with AI' },
    { id: 'verify', title: 'AI Verification', status: 'pending', description: 'Automated quality checks' },
    { id: 'preview', title: 'Preview', status: 'pending', description: 'Platform-specific previews' },
    { id: 'approval', title: 'Send for Approval', status: 'pending', description: 'Submit for review' }
  ];

  const brandKits = ['Default Brand', 'Holiday Theme', 'Minimal Style', 'Corporate'];
  const logoPlacement = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right', 'Center', 'None'];
  const formats = ['Square (1:1)', 'Portrait (4:5)', 'Landscape (16:9)', 'Story (9:16)', 'Custom'];
  const styling = ['Modern', 'Vintage', 'Minimalist', 'Bold', 'Elegant', 'Playful'];

  const platforms: Platform[] = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, dimensions: '1080x1080', aspectRatio: '1:1', color: 'orange' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, dimensions: '1200x630', aspectRatio: '16:9', color: 'blue' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, dimensions: '1200x675', aspectRatio: '16:9', color: 'blue' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, dimensions: '1280x720', aspectRatio: '16:9', color: 'orange' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, dimensions: '1200x627', aspectRatio: '16:9', color: 'blue' },
  ];

  const generationProcesses = [
    'Analyzing prompt and requirements...',
    'Loading brand assets and guidelines...',
    'Initializing AI image generation model...',
    'Processing visual elements and composition...',
    'Applying brand styling and logo placement...',
    'Generating multiple variations...',
    'Optimizing for selected formats...',
    'Running quality checks...',
    'Finalizing generated assets...'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedAssets([]);

    // Simulate AI generation process
    for (let i = 0; i < generationProcesses.length; i++) {
      setCurrentProcess(generationProcesses[i]);
      setGenerationProgress((i + 1) / generationProcesses.length * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Generate mock assets
const mockAssets: GeneratedAsset[] = Array.from({ length: 6 }, (_, index) => ({
  id: `asset-${Date.now()}-${index}`,
  type: contentType,
  url: contentType === 'image'
    ? `https://www.carbodydesign.com/media/2023/02/AI-generated-car-design-02.jpg`
    : `https://www.carbodydesign.com/media/2023/02/AI-generated-car-design-02.jpg ${360 + index * 100}x${360 + index * 100}_1mb.mp4`,
  prompt,
  brandKit: selectedBrandKit,
  logoPlacement: selectedLogoPlacement,
  format: selectedFormat,
  styling: selectedStyling,
  isSelected: false
}));




    setGeneratedAssets(mockAssets);
    setIsGenerating(false);
    setCurrentProcess('');
  };

  const handleRegenerateAsset = async (assetId: string) => {
    const asset = generatedAssets.find(a => a.id === assetId);
    if (!asset) return;

    setIsGenerating(true);
    setCurrentProcess('Regenerating selected asset...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAsset: GeneratedAsset = {
      ...asset,
      id: `asset-${Date.now()}-regenerated`,
      url: contentType === 'image' 
        ? `https://images.pexels.com/photos/${1000000 + Math.floor(Math.random() * 1000000)}/pexels-photo-${1000000 + Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`
        : `https://sample-videos.com/zip/10/mp4/SampleVideo_720x720_1mb.mp4`
    };

    setGeneratedAssets(prev => prev.map(a => a.id === assetId ? newAsset : a));
    setIsGenerating(false);
    setCurrentProcess('');
  };

  const handleAssetSelection = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(prev => prev.filter(id => id !== assetId));
    } else {
      setSelectedAssets(prev => [...prev, assetId]);
    }
  };

  const handleSaveAssets = () => {
    if (selectedAssets.length === 0) return;
    
    // Move to AI Verification step
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2); // Move to Preview after verification
    }, 3000);
  };

  const handleApprove = () => {
    setActiveStep(3); // Move to Send for Approval
  };

  const addNewOption = (type: 'brandKit' | 'logoPlacement' | 'format' | 'styling', value: string) => {
    switch (type) {
      case 'brandKit':
        brandKits.push(value);
        setSelectedBrandKit(value);
        setNewBrandKit('');
        setShowAddBrandKit(false);
        break;
      case 'logoPlacement':
        logoPlacement.push(value);
        setSelectedLogoPlacement(value);
        setNewLogoPlacement('');
        setShowAddLogoPlacement(false);
        break;
      case 'format':
        formats.push(value);
        setSelectedFormat(value);
        setNewFormat('');
        setShowAddFormat(false);
        break;
      case 'styling':
        styling.push(value);
        setSelectedStyling(value);
        setNewStyling('');
        setShowAddStyling(false);
        break;
    }
  };

  const renderStepIndicator = () => (
    <div className={`${themeClasses.cardBg} rounded-3xl p-8 mb-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center space-x-4 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                activeStep > index ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/30' :
                activeStep === index ? `${themeClasses.accent} text-white shadow-xl shadow-gray-500/40` :
                'bg-gray-100 text-gray-400'
              }`}>
                {activeStep > index ? (
                  <CheckCircle size={28} className="animate-pulse" />
                ) : (
                  <span className="text-xl font-bold">{index + 1}</span>
                )}
                {activeStep === index && (
                  <div className="absolute -inset-1 from-blue-400 to-blue-600 rounded-2xl blur opacity-75 animate-pulse"></div>
                )}
              </div>
              <div>
                <h4 className={`font-bold text-lg ${themeClasses.text}`}>{step.title}</h4>
                <p className={`text-sm ${themeClasses.textSecondary}`}>{step.description}</p>
              </div>
            </div>
            {/* {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-6 rounded-full transition-all duration-500 ${
                activeStep > index ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gray-200'
              }`} />
            )} */}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateContent = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      {/* <div className={`${themeClasses.gradient} rounded-3xl p-8 text-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-600/20"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} className="text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>AI-Powered Content Creation</h2>
          <p className={`text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
            Transform your ideas into stunning visuals with our advanced AI technology
          </p>
        </div>
      </div> */}

      {/* Content Type Selection */}
<div className={`${themeClasses.cardBg} rounded-xl p-4 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
 <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Campaign Selection</h3>
  <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
    <button
      onClick={() => setContentType('image')}
      className={` p-2 rounded-xl border-2 transition-all duration-150 transform hover:scale-100 flex justify-center ${
        contentType === 'image' 
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-50 shadow-sm shadow-blue-500/20' 
          : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
      }`}
    >
      {/* <div className={`rounded-xl flex items-center justify-center mx-auto  transition-all duration-150 ${
        contentType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-500'
      }`}>
        <ImageIcon size={24} />
      </div> */}
      <h4 className={`text-lg font-medium mb-1 ${contentType === 'image' ? 'text-blue-900' : themeClasses.text}`}>
        Image Generation
      </h4>
    </button>

    <button
      onClick={() => setContentType('video')}
      className={`flex justify-center  items-center p-2 rounded-xl border-2 transition-all duration-150 transform hover:scale-100 ${
        contentType === 'video' 
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-50 shadow-sm shadow-blue-500/20' 
          : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
      }`}
    >
      {/* <div className={` rounded-xl flex items-center justify-center mx-auto  transition-all duration-150 ${
        contentType === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-500'
      }`}>
        <Video size={24} />
      </div> */}
      <h4 className={`text-lg font-medium mb-1 ${contentType === 'video' ? 'text-blue-900' : themeClasses.text}`}>
        Video Generation
      </h4>
    </button>
  </div>
</div>



      {/* Prompt Input */}
      <div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center`}>
          <Wand2 className="mr-3 text-blue-500" size={28} />
          Creative Prompt
        </h3>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe the ${contentType} you want to create... Be specific about style, colors, mood, and content.`}
            className={`w-full p-6 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-2xl ${themeClasses.text} focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-lg transition-all duration-300`}
            rows={6}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-4">
            <span className={`text-sm ${themeClasses.textSecondary}`}>
              {prompt.length}/500 characters
            </span>
            <button
              onClick={() => setPrompt(prompt + ' in professional style with modern aesthetics')}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Add Style
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Options */}
      <div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        {/* <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8 flex items-center`}>
          <Settings className="mr-3 text-blue-500" size={28} />
          Configuration Options
        </h3>
         */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Kit Dropdown */}
          <div className="space-y-3">
            <label className={`block text-lg font-semibold ${themeClasses.text} flex items-center`}>
              <Palette className="mr-2 text-blue-500" size={20} />
              Brand Kit
            </label>
            <div className="relative">
              <select
                value={selectedBrandKit}
                onChange={(e) => setSelectedBrandKit(e.target.value)}
                className={`w-full p-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-2xl ${themeClasses.text} focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none text-lg`}
              >
                <option value="">Select Brand Kit</option>
                {brandKits.map(kit => (
                  <option key={kit} value={kit}>{kit}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={24} />
            </div>
            <button
              onClick={() => setShowAddBrandKit(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Brand Kit
            </button>
          </div>

          {/* Logo Placement Dropdown */}
          <div className="space-y-3">
            <label className={`block text-lg font-semibold ${themeClasses.text} flex items-center`}>
              <Star className="mr-2 text-blue-500" size={20} />
              Logo Placement
            </label>
            <div className="relative">
              <select
                value={selectedLogoPlacement}
                onChange={(e) => setSelectedLogoPlacement(e.target.value)}
                className={`w-full p-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-2xl ${themeClasses.text} focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none text-lg`}
              >
                <option value="">Select Logo Placement</option>
                {logoPlacement.map(placement => (
                  <option key={placement} value={placement}>{placement}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={24} />
            </div>
            <button
              onClick={() => setShowAddLogoPlacement(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Placement
            </button>
          </div>

          {/* Format Dropdown */}
          <div className="space-y-3">
            <label className={`block text-lg font-semibold ${themeClasses.text} flex items-center`}>
              <Maximize2 className="mr-2 text-blue-500" size={20} />
              Format
            </label>
            <div className="relative">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className={`w-full p-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-2xl ${themeClasses.text} focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none text-lg`}
              >
                <option value="">Select Format</option>
                {formats.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={24} />
            </div>
            <button
              onClick={() => setShowAddFormat(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Format
            </button>
          </div>

          {/* Styling Dropdown */}
          <div className="space-y-3">
            <label className={`block text-lg font-semibold ${themeClasses.text} flex items-center`}>
              <Type className="mr-2 text-blue-500" size={20} />
              Styling
            </label>
            <div className="relative">
              <select
                value={selectedStyling}
                onChange={(e) => setSelectedStyling(e.target.value)}
                className={`w-full p-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-2xl ${themeClasses.text} focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none text-lg`}
              >
                <option value="">Select Styling</option>
                {styling.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={24} />
            </div>
            <button
              onClick={() => setShowAddStyling(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Style
            </button>
          </div>
        </div>
      </div>

      {/* Generation Process */}
      {isGenerating && (
        <div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold ${themeClasses.text} flex items-center`}>
              <Brain className="mr-3 text-blue-500 animate-pulse" size={28} />
              AI Generation in Progress
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-500  rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">{generationProgress.toFixed(0)}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-500  h-3 rounded-full transition-all duration-500 relative"
                style={{ width: `${generationProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className={`${themeClasses.text} font-semibold text-lg`}>{currentProcess}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Cpu className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-blue-900 text-lg">AI Processing</p>
                  <p className="text-sm text-blue-700">Neural networks active</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Database className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-blue-900 text-lg">Brand Assets</p>
                  <p className="text-sm text-blue-700">Loading resources</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-blue-900 text-lg">Optimization</p>
                  <p className="text-sm text-blue-700">Quality enhancement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Assets */}
      {generatedAssets.length > 0 && !isGenerating && (
        <div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-2xl font-bold ${themeClasses.text} flex items-center`}>
              <Layers className="mr-3 text-blue-500" size={28} />
              Generated Assets
            </h3>
            <div className="flex items-center space-x-4">
              <span className={`text-lg font-semibold ${themeClasses.textSecondary}`}>
                {selectedAssets.length} of {generatedAssets.length} selected
              </span>
              <button
                onClick={handleSaveAssets}
                disabled={selectedAssets.length === 0}
                className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-500  text-white rounded-2xl hover:from-blue-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl shadow-blue-500/30`}
              >
                Save Selected ({selectedAssets.length})
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {generatedAssets.map((asset) => (
              <div key={asset.id} className={`group relative ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-3xl p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/20 ${selectedAssets.includes(asset.id) ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-50' : ''}`}>
                <div className="aspect-square bg-gray-100 rounded-2xl mb-6 overflow-hidden relative">
                  {asset.type === 'image' ? (
                    <img 
                      src={img_1} 
                      alt="Generated content"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Play className="text-gray-500" size={48} />
  <video width="100%" height="auto" controls>
        <source src={video_file} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
                    </div>
                  )}
                  
                  {/* Selection Overlay */}
                  <div 
                    className={`absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center cursor-pointer transition-all ${
                      selectedAssets.includes(asset.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={() => handleAssetSelection(asset.id)}
                  >
                    <div className={`w-12 h-12 rounded-2xl border-4 border-white flex items-center justify-center transition-all ${
                      selectedAssets.includes(asset.id) ? 'bg-blue-500 scale-110' : 'bg-transparent hover:bg-white/20'
                    }`}>
                      {selectedAssets.includes(asset.id) && <Check className="text-white" size={24} />}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className={`text-sm ${themeClasses.text} font-medium line-clamp-2`}>
                    {asset.prompt.substring(0, 80)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${themeClasses.textSecondary} px-3 py-1 bg-gray-100 rounded-full`}>
                      {asset.format || 'Standard'}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRegenerateAsset(asset.id)}
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw size={18} />
                      </button>
                      <button
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                        title="More options"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className={`group flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-blue-500  text-white rounded-3xl hover:from-blue-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold shadow-2xl shadow-blue-500/40 transform hover:scale-105`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin mr-4">
                <Sparkles size={32} />
              </div>
              Generating Magic...
            </>
          ) : (
            <>
              <Wand2 size={32} className="mr-4 group-hover:rotate-12 transition-transform" />
              Generate {contentType === 'image' ? 'Images' : 'Videos'}
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderAIVerification = () => (
    <div className="space-y-8">
      <div className={`${themeClasses.cardBg} rounded-3xl p-12 text-center ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <CheckCircle className="text-white" size={48} />
        </div>
        <h3 className={`text-3xl font-bold ${themeClasses.text} mb-6`}>AI Verification in Progress</h3>
        <p className={`text-lg ${themeClasses.textSecondary} mb-8 max-w-2xl mx-auto`}>
          Our advanced AI is performing comprehensive quality checks on your generated content...
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
            <CheckCircle className="text-blue-600 mx-auto mb-4" size={32} />
            <p className="font-bold text-blue-900 text-lg">Brand Compliance</p>
            <p className="text-sm text-blue-700 mt-2">✓ Verified</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
            <Clock className="text-blue-600 mx-auto mb-4 animate-spin" size={32} />
            <p className="font-bold text-blue-900 text-lg">Quality Check</p>
            <p className="text-sm text-blue-700 mt-2">⏳ In Progress</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
            <AlertCircle className="text-gray-600 mx-auto mb-4" size={32} />
            <p className="font-bold text-gray-900 text-lg">Content Safety</p>
            <p className="text-sm text-gray-700 mt-2">⏳ Pending</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-8">
      {/* Platform Selection */}
      <div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center`}>
          <Globe className="mr-3 text-blue-500" size={28} />
          Platform Preview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);
            
            return (
              <button
                key={platform.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedPlatforms(prev => prev.filter(p => p !== platform.id));
                  } else {
                    setSelectedPlatforms(prev => [...prev, platform.id]);
                  }
                }}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  isSelected 
                    ? `border-${platform.color}-500 bg-gradient-to-br from-${platform.color}-50 to-${platform.color}-100 shadow-xl shadow-${platform.color}-500/20` 
                    : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
                }`}
              >
                <Icon size={32} className={`mx-auto mb-3 ${isSelected ? `text-${platform.color}-600` : `${themeClasses.textSecondary} group-hover:text-${platform.color}-500`}`} />
                <h4 className={`font-bold text-sm ${isSelected ? `text-${platform.color}-900` : themeClasses.text}`}>
                  {platform.name}
                </h4>
                <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
                  {platform.dimensions}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {selectedPlatforms.map((platformId) => {
          const platform = platforms.find(p => p.id === platformId);
          if (!platform) return null;
          
          const Icon = platform.icon;
          const selectedAsset = generatedAssets.find(asset => selectedAssets.includes(asset.id));
          
          return (
            <div key={platformId} className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${platform.color}-100 rounded-2xl flex items-center justify-center`}>
                    <Icon className={`text-${platform.color}-600`} size={24} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${themeClasses.text}`}>{platform.name}</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{platform.dimensions}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Monitor size={20} className={themeClasses.textSecondary} />
                  <Tablet size={20} className={themeClasses.textSecondary} />
                  <Smartphone size={20} className={themeClasses.textSecondary} />
                </div>
              </div>
              
              {/* Mock Platform UI */}
              <div className={`bg-${platform.color}-50 rounded-2xl p-6 border-2 border-${platform.color}-200`}>
                {platformId === 'instagram' && (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex items-center p-4 border-b">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-400 rounded-full mr-4"></div>
                      <div>
                        <p className="font-bold text-sm">your_brand</p>
                        <p className="text-xs text-gray-500">Sponsored</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100">
                      {selectedAsset && (
                        <img 
                          src={selectedAsset.url} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex space-x-4">
                          <Heart size={24} className="text-red-500" />
                          <MessageCircle size={24} className="text-gray-700" />
                          <Send size={24} className="text-gray-700" />
                        </div>
                      </div>
                      <p className="text-sm">
                        <span className="font-bold">your_brand</span> Check out our latest creation! 
                        #creative #design #brand
                      </p>
                    </div>
                  </div>
                )}
                
                {platformId === 'facebook' && (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex items-center p-3 border-b">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3"></div>
                      <div>
                        <p className="font-bold text-sm">Your Brand</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-100">
                      {selectedAsset && (
                        <img 
                          src={selectedAsset.url} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm mb-2">
                        Check out our latest creation! Amazing results with AI-powered content generation.
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>👍 24 reactions</span>
                        <span>💬 8 comments</span>
                        <span>↗️ 3 shares</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {platformId === 'twitter' && (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-bold text-sm">Your Brand</p>
                            <p className="text-xs text-gray-500">@yourbrand</p>
                            <p className="text-xs text-gray-500">2h</p>
                          </div>
                          <p className="text-sm mb-3">
                            Excited to share our latest AI-generated content! The future of creative design is here. 🚀 #AI #Design #Innovation
                          </p>
                          {selectedAsset && (
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                              <img 
                                src={selectedAsset.url} 
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>💬 12</span>
                            <span>🔄 8</span>
                            <span>❤️ 45</span>
                            <span>📊 1.2K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveStep(1)}
          className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
        >
          Back to Verification
        </button>
        <button
          onClick={handleApprove}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-500  text-white rounded-xl hover:from-blue-600 hover:to-blue-600 transition-all font-bold shadow-lg shadow-blue-500/30"
        >
          Send for Approval
        </button>
      </div>
    </div>
  );

  
const [approvalFlag,setApprovalFlag] = useState<boolean>()
  const renderSendForApproval = () => (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} rounded-2xl p-6 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-white" size={32} />
          </div>
          <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Ready for Approval</h3>
          <p className={`${themeClasses.textSecondary}`}>
            Your content has been verified and is ready to be sent for approval
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className={`font-bold ${themeClasses.text} mb-3`}>Content Summary</h4>
            <div className="space-y-2 text-sm">
              <p className={themeClasses.textSecondary}>Assets: {selectedAssets.length} items</p>
              <p className={themeClasses.textSecondary}>Platforms: {selectedPlatforms.length} selected</p>
              <p className={themeClasses.textSecondary}>Quality Score: 98%</p>
            </div>
          </div>
          
          <div>
            <h4 className={`font-bold ${themeClasses.text} mb-3`}>Approval Settings</h4>
            <select className={`w-full p-3 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}>
              <option>Marketing Manager</option>
              <option>Creative Director</option>
              <option>Brand Manager</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={()=>setApprovalFlag(true)} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-500  text-white rounded-xl hover:from-blue-600 hover:to-blue-600 transition-all font-bold shadow-lg shadow-blue-500/30">
            Submit for Approval
          </button>
           <button onClick={()=>setActiveTab("marketingstudio")}  className={`${true?"from-blue-500 to-blue-500  text-white  hover:from-blue-600 hover:to-blue-600  shadow-blue-500/30":"bg-gray-300 text-black"} px-8 py-3 bg-gradient-to-r rounded-xl transition-all font-bold shadow-lg`}>
            Run Campaign
          </button>
        </div>
      </div>
    </div>
  );

    // Sample campaigns data
    const campaigns: Campaign[] = [
      {
        id: '1',
        name: 'Holiday Sale 2024',
        status: 'running',
        type: 'conversion',
        budget: 15000,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        platforms: ['facebook', 'instagram', 'google'],
        audience: 'Adults 25-45, interested in fashion',
        objectives: ['Boost sales', 'Increase website traffic'],
        createdAt: new Date('2024-11-15'),
      },
      {
        id: '2',
        name: 'Brand Awareness Q1',
        status: 'approved',
        type: 'awareness',
        budget: 8000,
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        platforms: ['facebook', 'instagram', 'youtube'],
        audience: 'Young adults 18-35',
        objectives: ['Improve brand awareness', 'Enhance customer engagement'],
        createdAt: new Date('2024-12-10'),
      },
      {
        id: '3',
        name: 'Product Launch Campaign',
        status: 'draft',
        type: 'conversion',
        budget: 25000,
        startDate: '2025-02-01',
        endDate: '2025-02-28',
        platforms: ['google', 'linkedin', 'email'],
        audience: 'Business professionals 30-50',
        objectives: ['Generate leads', 'Promote new product launch'],
        createdAt: new Date('2024-12-15'),
      }
    ];


  

  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play size={14} className="text-green-600" />;
      case 'approved': return <CheckCircle size={14} className="text-blue-600" />;
      case 'pending': return <Clock size={14} className="text-yellow-600" />;
      case 'paused': return <Pause size={14} className="text-orange-600" />;
      case 'completed': return <CheckCircle size={14} className="text-gray-600" />;
      case 'draft': return <Edit3 size={14} className="text-purple-600" />;
      case 'review': return <Eye size={14} className="text-yellow-600" />;
      case 'rejected': return <AlertTriangle size={14} className="text-red-600" />;
      default: return <AlertTriangle size={14} className="text-gray-600" />;
    }
  };

  const handleCampaignSelect = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
    setShowCampaignDropdown(false);
  };

  const handleProceedWithoutCampaign = () => {
    setSelectedCampaign(null);
    setShowCampaignDropdown(false);
  };
    const renderCampaignSelector = () => (
    <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Campaign Selection</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>
            Select a campaign to create targeted creatives, or proceed without a campaign for general assets
          </p>
        </div>
        <Target className={`${themeClasses.textSecondary}`} size={24} />
      </div>

      <div className="relative">
        <button
          onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
          className={`w-full p-4 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors flex items-center justify-between`}
        >
          <div className="flex items-center space-x-3">
            {selectedCampaign ? (
              <>
                <div className={`w-10 h-10 bg-${selectedCampaign.type === 'conversion' ? 'green' : selectedCampaign.type === 'awareness' ? 'blue' : 'purple'}-100 rounded-lg flex items-center justify-center`}>
                  <Target className={`text-${selectedCampaign.type === 'conversion' ? 'green' : selectedCampaign.type === 'awareness' ? 'blue' : 'purple'}-600`} size={20} />
                </div>
                <div className="text-left">
                  <p className={`font-medium ${themeClasses.text}`}>{selectedCampaign.name}</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    {selectedCampaign.type.charAt(0).toUpperCase() + selectedCampaign.type.slice(1)} • ${selectedCampaign.budget.toLocaleString()} budget
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className={`w-10 h-10 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg flex items-center justify-center`}>
                  <Target className={`${themeClasses.textSecondary}`} size={20} />
                </div>
                <div className="text-left">
                  <p className={`font-medium ${themeClasses.text}`}>Select Campaign</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Choose a campaign or proceed without one</p>
                </div>
              </>
            )}
          </div>
          <ChevronDown className={`${themeClasses.textSecondary} transform transition-transform ${showCampaignDropdown ? 'rotate-180' : ''}`} size={20} />
        </button>

        {showCampaignDropdown && (
          <div className={`absolute top-full left-0 right-0 mt-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto`}>
            {/* No Campaign Option */}
            <button
              onClick={handleProceedWithoutCampaign}
              className={`w-full p-4 ${themeClasses.hover} transition-colors flex items-center space-x-3 border-b ${themeClasses.border}`}
            >
              <div className={`w-10 h-10 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg flex items-center justify-center`}>
                <Wand2 className={`${themeClasses.textSecondary}`} size={20} />
              </div>
              <div className="text-left">
                <p className={`font-medium ${themeClasses.text}`}>No Campaign</p>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Create general creative assets</p>
              </div>
            </button>

            {/* Campaign Options */}
            {campaigns.map((campaign) => (
              <button
                key={campaign.id}
                onClick={() => handleCampaignSelect(campaign)}
                className={`w-full p-4 ${themeClasses.hover} transition-colors flex items-center justify-between ${
                  selectedCampaign?.id === campaign.id ? `bg-blue-50 border-l-4 border-blue-500` : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${campaign.type === 'conversion' ? 'green' : campaign.type === 'awareness' ? 'blue' : 'purple'}-100 rounded-lg flex items-center justify-center`}>
                    <Target className={`text-${campaign.type === 'conversion' ? 'green' : campaign.type === 'awareness' ? 'blue' : 'purple'}-600`} size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${themeClasses.text}`}>{campaign.name}</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)} • ${campaign.budget.toLocaleString()} budget
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    <span className="ml-1 capitalize">{campaign.status}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCampaign && (
        <div className={`mt-4 p-4 ${themeClasses.gradient} rounded-xl`}>
          <h4 className={`font-medium ${themeClasses.text} mb-2`}>Campaign Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-3 ${themeClasses.cardBg}/70 rounded-lg`}>
              <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Duration</p>
              <p className={`font-semibold ${themeClasses.text} text-sm`}>
                {new Date(selectedCampaign.startDate).toLocaleDateString()} - {new Date(selectedCampaign.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className={`p-3 ${themeClasses.cardBg}/70 rounded-lg`}>
              <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Platforms</p>
              <p className={`font-semibold ${themeClasses.text} text-sm`}>
                {selectedCampaign.platforms.join(', ')}
              </p>
            </div>
            <div className={`p-3 ${themeClasses.cardBg}/70 rounded-lg`}>
              <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Audience</p>
              <p className={`font-semibold ${themeClasses.text} text-sm truncate`}>
                {selectedCampaign.audience}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
     <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
    <div className="space-y-6 md:space-y-8 p-6 md:p-8">
         <div className="text-center flex-1">
                    <div className="flex items-center justify-start mb-2">
                      <Sparkles className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
                      <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                      Creator Studio
                      </h2>
                      {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
                    </div>
                    <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
                     Design and build compelling creatives for your campaigns
                    </p>
                  </div>
      {renderStepIndicator()}

        {/* Campaign Selector */}
        {activeStep === 0 && renderCampaignSelector()}
      
      {activeStep === 0 && renderCreateContent()}
      {activeStep === 1 && renderAIVerification()}
      {activeStep === 2 && renderPreview()}
      {activeStep === 3 && renderSendForApproval()}
      
      {/* Add Brand Kit Modal */}
      {showAddBrandKit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className={`${themeClasses.cardBg} rounded-xl p-4 w-full max-w-md ${themeClasses.shadow}`}>
            <h3 className={`text-lg font-bold ${themeClasses.text} mb-3`}>Add New Brand Kit</h3>
            <input
              type="text"
              value={newBrandKit}
              onChange={(e) => setNewBrandKit(e.target.value)}
              placeholder="Enter brand kit name"
              className={`w-full p-2 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm`}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddBrandKit(false)}
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => addNewOption('brandKit', newBrandKit)}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Logo Placement Modal */}
      {showAddLogoPlacement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className={`${themeClasses.cardBg} rounded-xl p-4 w-full max-w-md ${themeClasses.shadow}`}>
            <h3 className={`text-lg font-bold ${themeClasses.text} mb-3`}>Add New Logo Placement</h3>
            <input
              type="text"
              value={newLogoPlacement}
              onChange={(e) => setNewLogoPlacement(e.target.value)}
              placeholder="Enter logo placement"
              className={`w-full p-2 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm`}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddLogoPlacement(false)}
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => addNewOption('logoPlacement', newLogoPlacement)}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Format Modal */}
      {showAddFormat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className={`${themeClasses.cardBg} rounded-xl p-4 w-full max-w-md ${themeClasses.shadow}`}>
            <h3 className={`text-lg font-bold ${themeClasses.text} mb-3`}>Add New Format</h3>
            <input
              type="text"
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              placeholder="Enter format"
              className={`w-full p-2 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm`}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddFormat(false)}
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => addNewOption('format', newFormat)}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Styling Modal */}
      {showAddStyling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className={`${themeClasses.cardBg} rounded-xl p-4 w-full max-w-md ${themeClasses.shadow}`}>
            <h3 className={`text-lg font-bold ${themeClasses.text} mb-3`}>Add New Styling</h3>
            <input
              type="text"
              value={newStyling}
              onChange={(e) => setNewStyling(e.target.value)}
              placeholder="Enter styling"
              className={`w-full p-2 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm`}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddStyling(false)}
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => addNewOption('styling', newStyling)}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Add
              </button>
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