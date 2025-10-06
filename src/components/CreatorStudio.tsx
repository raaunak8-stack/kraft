import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Video, Wand2, Settings, Download, Share2, RefreshCw, Plus, ChevronDown, Play, Pause, Eye, Heart, MessageCircle, Send, Check, X, ArrowRight, ArrowLeft, Upload, Palette, Type, LayoutGrid as Layout, Zap, Brain, Cpu, Database, CheckCircle, Clock, AlertCircle, CreditCard as Edit3, Copy, Trash2, MoreHorizontal, Instagram, Facebook, Twitter, Youtube, Linkedin, Globe, Smartphone, Monitor, Tablet, Star, Layers, Filter, Maximize2, Minimize2, BarChart3 as BarChart3Icon, Target, AlertTriangle, FileType } from 'lucide-react';
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
  const [contentType, setContentType] = useState<any>('image');
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
  const [showBrandKitModal, setShowBrandKitModal] = useState(false);
  const [brandKitSection, setBrandKitSection] = useState('logos');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [previewAsset, setPreviewAsset] = useState<GeneratedAsset | null>(null);
  const [changeRequests, setChangeRequests] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isVerifyingReference, setIsVerifyingReference] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'passed' | 'failed'>('idle');
  const [editingAsset, setEditingAsset] = useState<GeneratedAsset | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps: CreationStep[] = [
    { id: 'create', title: 'Create Content', status: 'active', description: 'Generate images/videos with AI' },
    // { id: 'verify', title: 'AI Verification', status: 'pending', description: 'Automated quality checks' },
    { id: 'preview', title: 'Preview', status: 'pending', description: 'Platform-specific previews' },
    { id: 'approval', title: 'Send for Approval', status: 'pending', description: 'Submit for review' }
  ];

  const brandKits = ['Default Brand', 'Holiday Theme', 'Minimal Style', 'Corporate'];
  const creativeTypes = ['image', 'video','Reference Image'];
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
    setSelectedAssets([])
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
  type: contentType=="Reference Image"?"image":contentType,
  url: contentType === 'image'|| contentType === 'Reference Image'
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
      url: contentType === 'image' || contentType === 'Reference Image'
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
    setActiveStep(2);
    // setTimeout(() => {
    //   setActiveStep(2); // Move to Preview after verification
    // }, 3000);
  };

  const handleApprove = () => {
    setActiveStep(3); // Move to Send for Approval
  };

  const handleReferenceImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setReferenceImage(reader.result as string);
        await verifyReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const verifyReferenceImage = async (imageUrl: string) => {
    setIsVerifyingReference(true);
    setVerificationStatus('verifying');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const passed = Math.random() > 0.3;
    setVerificationStatus(passed ? 'passed' : 'failed');
    setIsVerifyingReference(false);
  };

  const handleEditAsset = (asset: GeneratedAsset) => {
    setEditingAsset(asset);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingAsset) {
      setGeneratedAssets(prev => prev.map(a => a.id === editingAsset.id ? editingAsset : a));
      setShowEditModal(false);
      setEditingAsset(null);
    }
  };

  const handleDeleteAsset = (assetId: string) => {
    setGeneratedAssets(prev => prev.filter(a => a.id !== assetId));
    setSelectedAssets(prev => prev.filter(id => id !== assetId));
  };

  const handleDuplicateAsset = (asset: GeneratedAsset) => {
    const newAsset: GeneratedAsset = {
      ...asset,
      id: `asset-${Date.now()}-copy`,
    };
    setGeneratedAssets(prev => [...prev, newAsset]);
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

{/* <div className={`${themeClasses.cardBg} rounded-xl p-4 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
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

      <h4 className={`text-lg font-medium mb-1 ${contentType === 'video' ? 'text-blue-900' : themeClasses.text}`}>
        Video Generation
      </h4>
    </button>
  </div>
</div> */}

      {/* Configuration Options */}
      <div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8 flex items-center`}>
          <Settings className="mr-3 text-blue-500" size={28} />
          Configuration Options
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
         {/* Creation Type Dropdown */}
          <div className="space-y-3">
            <label className={`block text-lg font-semibold ${themeClasses.text} flex items-center`}>
              <FileType className="mr-2 text-blue-500" size={20} />
             Creation Type
            </label>
            <div className="relative">
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className={`w-full p-4 capitalize ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-2xl ${themeClasses.text} focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none text-lg`}
              >
                {/* <option value="">Image</option> */}
                {creativeTypes.map(kit => (
                  <option key={kit} className='capitalize'  value={kit}>{kit}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={24} />
            </div>
          </div>

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
              onClick={() => setShowBrandKitModal(true)}
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
            {/* <button
              onClick={() => setShowAddLogoPlacement(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Placement
            </button> */}
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
            {/* <button
              onClick={() => setShowAddFormat(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Format
            </button> */}
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
            {/* <button
              onClick={() => setShowAddStyling(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add New Style
            </button> */}
          </div>
        </div>
      </div>

      {/* Reference Image Upload */}
      {contentType=="Reference Image"&&<div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border}`}>
        <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center`}>
          <Upload className="mr-3 text-blue-500" size={28} />
          Reference Image
        </h3>
        <p className={`${themeClasses.textSecondary} mb-6`}>
          Upload a reference image to guide AI generation. The system will verify it matches your brand guidelines.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleReferenceImageUpload}
          className="hidden"
        />

        {!referenceImage ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-12 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex flex-col items-center">
              <Upload className="text-gray-400 group-hover:text-blue-500 mb-4" size={48} />
              <p className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                Click to upload reference image
              </p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
              <img src={referenceImage} alt="Reference" className="w-full h-64 object-cover" />
              <button
                onClick={() => {
                  setReferenceImage(null);
                  setVerificationStatus('idle');
                }}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {isVerifyingReference && (
              <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin">
                    <Brain className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">Verifying against Brand Kit...</p>
                    <p className="text-sm text-blue-700">Checking colors, style, and compliance</p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === 'passed' && (
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-green-600" size={24} />
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">Verification Passed</p>
                    <p className="text-sm text-green-700">
                      Reference image matches brand guidelines. Proceeding with generation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === 'failed' && (
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <AlertCircle className="text-red-600" size={24} />
                  <div className="flex-1">
                    <p className="font-semibold text-red-900">Verification Failed</p>
                    <p className="text-sm text-red-700 mb-3">
                      Reference image doesn't fully align with brand guidelines. Colors or style may differ.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Upload Different Image
                      </button>
                      <button
                        onClick={() => setVerificationStatus('passed')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        Proceed Anyway
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>}

      {/* Prompt Input */}
      {(verificationStatus === 'passed' || contentType =="image" || contentType =="video")?<div className={`${themeClasses.cardBg} rounded-3xl p-8 ${themeClasses.shadow} border-2 ${themeClasses.border} `}>
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
      </div>:null}



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
                // onClick={handleSaveAssets}
                disabled={selectedAssets.length === 0 || isGenerating}
                onClick={handleGenerate}
                className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-500  text-white rounded-2xl hover:from-blue-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl shadow-blue-500/30`}
              >
                Regenerate Selected ({selectedAssets.length})
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {generatedAssets.map((asset) => (
              <div key={asset.id} className={`group relative ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-3xl p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/20 ${selectedAssets.includes(asset.id) ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-50' : ''}`}>
                <div className="aspect-square bg-gray-100 rounded-2xl mb-6 overflow-hidden relative">
                  {asset.type === 'image'? (
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
                        onClick={() => handleEditAsset(asset)}
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={18} />
                      </button>
                      <div className="relative group/menu">
                        <button
                          className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                          title="More options"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-gray-200 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                          <button
                            onClick={() => handleDuplicateAsset(asset)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
                          >
                            <Copy size={16} />
                            <span>Duplicate</span>
                          </button>
                          <button
                            onClick={() => {}}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => setPreviewAsset(asset)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
                          >
                            <Eye size={16} />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={() => {}}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
                          >
                            <Share2 size={16} />
                            <span>Share</span>
                          </button>
                          <div className="border-t border-gray-200"></div>
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center space-x-2 text-sm text-red-600"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      {!generatedAssets.length&&<div className="flex justify-center">
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
              Generate {contentType === 'image' || contentType === 'Reference Image' ? 'Images' : 'Videos'}
            </>
          )}
        </button>
      </div>}
{generatedAssets.length?<div className="flex justify-center">
       <button
                onClick={handleSaveAssets}
                disabled={selectedAssets.length === 0 || isGenerating}
                className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-500  text-white rounded-2xl hover:from-blue-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl shadow-blue-500/30`}
              >
               Save and next ({selectedAssets.length})
              </button>
      </div>:null}
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
          onClick={() => setActiveStep(0)}
          className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
        >
          Back to Create Content
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
            <button
          onClick={() => setActiveStep(2)}
          className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
        >
          Back to Preview
        </button>
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
        {/* <Target className={`${themeClasses.textSecondary}`} size={24} /> */}
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
      
      {/* Brand Kit Modal */}
      {showBrandKitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl`}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="text-white" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-white">Brand Kit Manager</h2>
                  <p className="text-blue-100 text-sm">Create and manage your brand assets</p>
                </div>
              </div>
              <button
                onClick={() => setShowBrandKitModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            {/* Section Navigation */}
            <div className={`p-4 border-b ${themeClasses.border}`}>
              <div className="flex space-x-2 overflow-x-auto">
                {[
                  { id: 'logos', label: 'Logos', icon: ImageIcon },
                  { id: 'colors', label: 'Color Palettes', icon: Palette },
                  { id: 'fonts', label: 'Fonts', icon: Type },
                  { id: 'images', label: 'Image Style', icon: ImageIcon }
                ].map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setBrandKitSection(section.id)}
                      className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                        brandKitSection === section.id
                          ? 'bg-blue-500 text-white shadow-lg'
                          : `${themeClasses.text} ${themeClasses.hover}`
                      }`}
                    >
                      <Icon size={16} className="mr-2" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {brandKitSection === 'logos' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Logos</h3>
                      <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
                        Save multiple logos to easily apply while generating assets
                      </p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                      <Upload size={18} className="mr-2" />
                      Upload Logo
                    </button>
                  </div>

                  <div className={`border-2 border-dashed ${themeClasses.border} rounded-2xl p-12 text-center ${themeClasses.hover} transition-all cursor-pointer`}>
                    <Upload className={`${themeClasses.textSecondary} mx-auto mb-4`} size={48} />
                    <h4 className={`${themeClasses.text} font-medium mb-2`}>Drop logo files here</h4>
                    <p className={`${themeClasses.textSecondary} text-sm`}>or click to browse (SVG, PNG, JPG)</p>
                  </div>
                </div>
              )}

              {brandKitSection === 'colors' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Color Palettes</h3>
                      <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
                        Define your brand colors for consistent styling
                      </p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                      <Plus size={18} className="mr-2" />
                      New Color
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Primary', hex: '#3B82F6' },
                      { name: 'Secondary', hex: '#10B981' },
                      { name: 'Accent', hex: '#F59E0B' },
                      { name: 'Dark', hex: '#1F2937' }
                    ].map((color, idx) => (
                      <div key={idx} className={`${themeClasses.border} border rounded-xl p-4`}>
                        <div
                          className="aspect-square rounded-lg mb-3 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color.hex }}
                        />
                        <h4 className={`${themeClasses.text} font-medium text-sm`}>{color.name}</h4>
                        <p className={`${themeClasses.textSecondary} text-xs mt-1`}>{color.hex}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {brandKitSection === 'fonts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Fonts</h3>
                      <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
                        Set typography standards for your brand
                      </p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                      <Plus size={18} className="mr-2" />
                      Add Font
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Inter', 'Roboto'].map((font, idx) => (
                      <div key={idx} className={`${themeClasses.border} border rounded-xl p-6`}>
                        <div className={`${themeClasses.gradient} rounded-xl p-4 mb-4`}>
                          <div className={`text-3xl font-bold ${themeClasses.text}`} style={{ fontFamily: font }}>
                            Aa
                          </div>
                        </div>
                        <h4 className={`${themeClasses.text} font-medium`}>{font}</h4>
                        <p className={`${themeClasses.textSecondary} text-sm mt-1`}>Primary Font</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {brandKitSection === 'images' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Image Style</h3>
                      <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
                        Define visual style guidelines for your brand
                      </p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                      <Upload size={18} className="mr-2" />
                      Upload Style
                    </button>
                  </div>

                  <div className={`border-2 border-dashed ${themeClasses.border} rounded-2xl p-12 text-center ${themeClasses.hover} transition-all cursor-pointer`}>
                    <ImageIcon className={`${themeClasses.textSecondary} mx-auto mb-4`} size={48} />
                    <h4 className={`${themeClasses.text} font-medium mb-2`}>Upload reference images</h4>
                    <p className={`${themeClasses.textSecondary} text-sm`}>Define your brand's visual style</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`p-6 border-t ${themeClasses.border} flex justify-end space-x-3`}>
              <button
                onClick={() => setShowBrandKitModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBrandKitModal(false);
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Save Brand Kit
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Edit Asset Modal */}
      {showEditModal && editingAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${themeClasses.text}`}>Edit Asset</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Asset Preview */}
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
                {editingAsset.type === 'image' ? (
                  <img src={img_1} alt="Editing" className="w-full h-64 object-cover" />
                ) : (
                  <video className="w-full h-64" controls>
                    <source src={video_file} type="video/mp4" />
                  </video>
                )}
              </div>

              {/* Edit Options */}
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                    Prompt
                  </label>
                  <textarea
                    value={editingAsset.prompt}
                    onChange={(e) => setEditingAsset({ ...editingAsset, prompt: e.target.value })}
                    className={`w-full p-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                      Brand Kit
                    </label>
                    <select
                      value={editingAsset.brandKit}
                      onChange={(e) => setEditingAsset({ ...editingAsset, brandKit: e.target.value })}
                      className={`w-full p-3 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Brand Kit</option>
                      {brandKits.map(kit => (
                        <option key={kit} value={kit}>{kit}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                      Logo Placement
                    </label>
                    <select
                      value={editingAsset.logoPlacement}
                      onChange={(e) => setEditingAsset({ ...editingAsset, logoPlacement: e.target.value })}
                      className={`w-full p-3 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Placement</option>
                      {logoPlacement.map(place => (
                        <option key={place} value={place}>{place}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                      Format
                    </label>
                    <select
                      value={editingAsset.format}
                      onChange={(e) => setEditingAsset({ ...editingAsset, format: e.target.value })}
                      className={`w-full p-3 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Format</option>
                      {formats.map(format => (
                        <option key={format} value={format}>{format}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>
                      Styling
                    </label>
                    <select
                      value={editingAsset.styling}
                      onChange={(e) => setEditingAsset({ ...editingAsset, styling: e.target.value })}
                      className={`w-full p-3 ${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Style</option>
                      {styling.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => handleRegenerateAsset(editingAsset.id)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
                >
                  <RefreshCw size={18} className="mr-2" />
                  Regenerate
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
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