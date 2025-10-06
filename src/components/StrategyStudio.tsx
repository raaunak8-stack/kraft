import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Target, TrendingUp, Zap, Moon, Sun, Send, Bot, User, Lightbulb, Brain, Rocket, Wand2, ChevronDown, Palette, Settings, Calendar, Users as UsersIcon, FileText, Download, Share2, Copy, Star, BarChart3, Shield, Clock, CheckCircle, AlertTriangle, Mic, Globe, Bookmark, Filter, RefreshCw, Database, Activity, Award, Layers, Eye, MousePointer, DollarSign, GitBranch, AlertCircle, Save, Plus, Search, MessageSquare, Users, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, MoreHorizontal, Play, Pause, CreditCard as Edit3, Fence, Check, Trash2, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SearchQuery {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  suggestions?: string[];
  isEdited?: boolean;
  isSaved?: boolean;
  confidenceScore?: number;
  alternatives?: any[];
  predictiveMetrics?: any;
  competitorData?: any;
  marketOpportunity?: number;
  status?: 'draft' | 'review' | 'approved' | 'in-creation' | 'live';
  notes?: string;
  collaborators?: string[];
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
  performance?: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
}

export const StrategyStudio: React.FC = ({onTabChange}) => {
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchQuery[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'neon'>('light');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState<any>(null);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [industryVertical, setIndustryVertical] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [campaignStatus, setCampaignStatus] = useState<'draft' | 'review' | 'approved' | 'in-creation' | 'live'>('draft');
  const [scheduledLaunch, setScheduledLaunch] = useState('');
  const [campaignNotes, setCampaignNotes] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [voiceInput, setVoiceInput] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateIndustry, setTemplateIndustry] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

    const tabs = [
    { id: 'create', label: 'Create Campaign', icon: Plus },
    // { id: 'legacy', label: 'Legacy Campaigns', icon: Target },
    // { id: 'manage', label: 'Manage Campaigns', icon: Settings },
    // { id: 'analytics', label: 'Campaign Analytics', icon: BarChart3 },
    { id: 'templates', label: 'Templates', icon: FileText },
  ];


    const campaignTypes = [
    { id: 'awareness', label: 'Brand Awareness', icon: Eye, color: 'blue', description: 'Increase brand visibility and recognition' },
    { id: 'conversion', label: 'Conversion', icon: Target, color: 'green', description: 'Drive sales and lead generation' },
    { id: 'engagement', label: 'Engagement', icon: MessageSquare, color: 'green', description: 'Boost interaction and community building' },
    { id: 'retention', label: 'Retention', icon: Users, color: 'orange', description: 'Retain existing customers and increase loyalty' },
  ];

  const platforms = [
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'blue' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'blue' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'blue' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'blue' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'red' },
    { id: 'google', label: 'Google Ads', icon: Search, color: 'green' },
    { id: 'email', label: 'Email', icon: Mail, color: 'gray' },
  ];

  const objectives = [
    'Increase website traffic',
    'Generate leads',
    'Boost sales',
    'Improve brand awareness',
    'Enhance customer engagement',
    'Drive app downloads',
    'Increase newsletter signups',
    'Promote new product launch',
  ];

  const sampleCampaigns: Campaign[] = [
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
      performance: {
        impressions: 2100000,
        clicks: 45200,
        conversions: 1234,
        spend: 5680,
        ctr: 2.15,
        cpc: 0.126,
        roas: 4.2
      }
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

  useEffect(() => {
    setCampaigns(sampleCampaigns);
  }, []);

    const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-green-100 text-green-800';
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
      case 'draft': return <Edit3 size={14} className="text-green-600" />;
      default: return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Voice recognition started');
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCampaignPrompt(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser');
    }
  };

  const handleScheduleLaunch = () => {
    console.log('Scheduling launch for:', scheduledLaunch);
  };

  const handleExportCampaign = (format: string) => {
    console.log('Exporting campaign in format:', format);
  };

  const suggestions = [
    'Launch holiday sale campaign with 20% discount targeting millennials',
    'Create brand awareness campaign for new sustainable product line',
    'Retargeting campaign for abandoned cart users with personalized offers',
    'Seasonal fashion collection promotion with influencer partnerships',
    'B2B lead generation campaign for enterprise software solutions',
    'Local business promotion with geo-targeted social media ads'
  ];

  const campaignTemplates = [
    { id: 'ecommerce', name: 'E-commerce Sale', industry: 'Retail', description: 'Product promotion with conversion focus' },
    { id: 'saas', name: 'SaaS Lead Gen', industry: 'Technology', description: 'B2B lead generation for software' },
    { id: 'brand', name: 'Brand Awareness', industry: 'General', description: 'Build brand recognition and recall' },
    { id: 'app', name: 'App Download', industry: 'Mobile', description: 'Drive mobile app installations' },
    { id: 'local', name: 'Local Business', industry: 'Local', description: 'Geo-targeted local promotion' },
    { id: 'event', name: 'Event Promotion', industry: 'Events', description: 'Drive event attendance and engagement' }
  ];

  const industryVerticals = [
    'E-commerce', 'SaaS/Technology', 'Healthcare', 'Finance', 'Education', 
    'Real Estate', 'Automotive', 'Food & Beverage', 'Fashion', 'Travel'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' }
  ];

  const aiResponses = [
    {
      strategy: {
        platform: "Instagram as primary, with supporting bursts on YouTube",
        segment: "Working male professionals, 35-48 years in Bangalore",
        duration: "4 weeks leading into travel season",
        budget: "$15,000 - $25,000",
        targeting: "Age 35-48, Male, Bangalore location, Interest in adventure sports"
      },
      reasoning: [
        "This segment has shown the highest 30x purchasing intent in Bangalore in the last 6 months (Propensity Score: 8/10)",
        "Instagram drives 2.3x higher engagement for adventure sports, long drives, and adventure sports, aligning with the target demographic",
        "Last year, Instagram 30x campaigns for this segment achieved 2.3x higher ROAS compared to other platforms during this season"
      ],
      insights: ["Peak shopping hours: 7-9 PM", "Mobile traffic increases 40%", "Video ads perform 3x better"],
      confidenceScore: 87,
      predictiveMetrics: {
        estimatedCTR: "2.8%",
        estimatedConversions: "1,240",
        estimatedROAS: "4.2x",
        riskScore: "Low"
      },
      competitorData: {
        competitorSpend: "$12K-18K",
        marketShare: "23%",
        topPerformingAds: "Video testimonials"
      },
      marketOpportunity: 92,
      alternatives: [
        {
          platform: "Facebook + LinkedIn",
          segment: "Business professionals 30-45",
          reasoning: "Higher B2B conversion rates"
        },
        {
          platform: "YouTube + Google Ads",
          segment: "Adventure enthusiasts 25-40",
          reasoning: "Better video engagement"
        }
      ]
    },
    {
      strategy: {
        platform: "Facebook and Instagram with LinkedIn support",
        segment: "Eco-conscious millennials, 25-35 years",
        duration: "6 weeks with seasonal focus",
        budget: "$20,000 - $30,000",
        targeting: "Age 25-35, Interests in sustainability, organic products"
      },
      reasoning: [
        "Consumer sentiment analysis shows 73% preference for sustainable brands, creating competitive advantage opportunity",
        "Millennials show 45% higher engagement with eco-friendly content",
        "LinkedIn performs well for premium sustainable products with 2.1x higher conversion rates"
      ],
      insights: ["Gen Z drives 60% of sustainable purchases", "Authenticity is key differentiator", "Story-driven content performs best"],
      confidenceScore: 94,
      predictiveMetrics: {
        estimatedCTR: "3.2%",
        estimatedConversions: "1,680",
        estimatedROAS: "5.1x",
        riskScore: "Medium"
      },
      competitorData: {
        competitorSpend: "$18K-25K",
        marketShare: "31%",
        topPerformingAds: "User-generated content"
      },
      marketOpportunity: 88,
      alternatives: [
        {
          platform: "TikTok + Instagram",
          segment: "Gen Z eco-warriors 18-28",
          reasoning: "Higher viral potential"
        }
      ]
    }
  ];

  useEffect(() => {
    if (campaignPrompt.length > 3) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [campaignPrompt]);

  const handleSubmit = () => {
    if (!campaignPrompt.trim()) return;

    setIsTyping(true);
    setIsAnimating(true);
    setGenerationLogs([]);
     simulateThinkingTasks();


    // Simulate AI generation logs
    // const logs = [
    //   "🔍 Analyzing campaign requirements...",
    //   "📊 Processing market data and trends...",
    //   "🎯 Identifying optimal target segments...",
    //   "💡 Generating strategic recommendations...",
    //   "🤖 Running AI confidence analysis...",
    //   "📈 Calculating predictive metrics...",
    //   "🏆 Comparing with competitor strategies...",
    //   "✨ Finalizing campaign strategy..."
    // ];

    // let logIndex = 0;
    // const logInterval = setInterval(() => {
    //   if (logIndex < logs.length) {
    //     setGenerationLogs(prev => [...prev, logs[logIndex]]);
    //     logIndex++;
    //   } else {
    //     clearInterval(logInterval);
    //   }
    // }, 250);



  };

  const navigateHistory = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCampaignPrompt(searchHistory[currentIndex - 1].query);
    } else if (direction === 'next' && currentIndex < searchHistory.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCampaignPrompt(searchHistory[currentIndex + 1].query);
    }
  };

  const getCurrentResponse = () => {
    if (currentIndex >= 0 && searchHistory[currentIndex]) {
      try {
        return JSON.parse(searchHistory[currentIndex].response);
      } catch {
        return null;
      }
    }
    return null;
  };

  const handleEditResponse = () => {
    setIsEditing(true);
    setEditedResponse({ ...getCurrentResponse() });
  };

  const handleSaveChanges = () => {
    if (currentIndex >= 0 && editedResponse) {
      const updatedHistory = [...searchHistory];
      updatedHistory[currentIndex] = {
        ...updatedHistory[currentIndex],
        response: JSON.stringify(editedResponse),
        isEdited: true,
        isSaved: true
      };
      setSearchHistory(updatedHistory);
      setIsEditing(false);
      setShowSaveConfirmation(true);
      setTimeout(() => setShowSaveConfirmation(false), 3000);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedResponse(null);
  };

  const handleGoToCreatorStudio = () => {
    // This would typically use a router or callback prop
    console.log('Navigating to Creator Studio with campaign data:', getCurrentResponse());
    // For now, we'll just show an alert
    alert('Campaign data will be transferred to Creator Studio for creative development!');
  };

  const handleSaveAsTemplate = () => {
    setShowSaveTemplateModal(true);
  };

  const handleConfirmSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    const currentCampaign = getCurrentResponse();
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: templateName,
      industry: templateIndustry || 'General',
      description: templateDescription || 'Custom campaign template',
      type: 'custom',
      campaignData: currentCampaign,
      query: searchHistory[currentIndex]?.query || '',
      createdAt: new Date(),
    };

    setCustomTemplates([...customTemplates, newTemplate]);
    setShowSaveTemplateModal(false);
    setTemplateName('');
    setTemplateIndustry('');
    setTemplateDescription('');

    // Show success message
    alert(`Template "${templateName}" saved successfully!`);
  };

  const handleCancelSaveTemplate = () => {
    setShowSaveTemplateModal(false);
    setTemplateName('');
    setTemplateIndustry('');
    setTemplateDescription('');
  };

  const handleUseTemplate = (template: any) => {
    if (template.query) {
      setCampaignPrompt(template.query);
      setActiveTab('create');
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setCustomTemplates(customTemplates.filter(t => t.id !== templateId));
    }
  };

  const renderLegacyCampaigns = () => (
    <div className="space-y-8">
      {/* Original Campaign Studio Interface */}
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-3xl p-8 ${themeClasses.shadow}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2 flex items-center`}>
              <Target className="mr-3 text-blue-500" size={28} />
              Legacy Campaign Studio
            </h3>
            <p className={`${themeClasses.textSecondary}`}>
              Original campaign creation interface from the first version
            </p>
          </div>
        </div>

        {/* Simple Campaign Creation Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Name</label>
              <input
                type="text"
                placeholder="Enter campaign name"
                className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Type</label>
              <select className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option>Brand Awareness</option>
                <option>Lead Generation</option>
                <option>Sales Conversion</option>
                <option>Engagement</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Budget</label>
              <input
                type="number"
                placeholder="$0.00"
                className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Start Date</label>
              <input
                type="date"
                className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>End Date</label>
              <input
                type="date"
                className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Target Audience</label>
            <textarea
              placeholder="Describe your target audience..."
              className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={3}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Objectives</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Increase Traffic', 'Generate Leads', 'Boost Sales', 'Brand Awareness', 'Customer Retention', 'App Downloads'].map((objective) => (
                <label key={objective} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className={`text-sm ${themeClasses.text}`}>{objective}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
              Create Campaign
            </button>
            <button className={`px-6 py-3 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors font-medium`}>
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* Legacy Campaign List */}
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Previous Campaigns</h3>
        
        <div className="space-y-4">
          {[
            { name: 'Summer Sale 2024', status: 'completed', budget: '$5,000', performance: 'Excellent' },
            { name: 'Product Launch Q2', status: 'active', budget: '$8,500', performance: 'Good' },
            { name: 'Brand Awareness', status: 'paused', budget: '$3,200', performance: 'Fair' },
          ].map((campaign, index) => (
            <div key={index} className={`p-4 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${themeClasses.text}`}>{campaign.name}</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Budget: {campaign.budget}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {campaign.status}
                  </span>
                  <span className={`text-sm ${themeClasses.textSecondary}`}>{campaign.performance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  interface ThinkingTask {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed';
  description: string;
  details?: string[];
  progress?: number;
}

interface CampaignQuery {
  id: string;
  query: string;
  reasoning: string;
  keyInsights: string[];
  status: 'draft' | 'confirmed' | 'applied';
  timestamp: Date;
}

  const currentResponse = getCurrentResponse();
    const [thinkingTasks, setThinkingTasks] = useState<ThinkingTask[]>([]);
      const [campaignQueries, setCampaignQueries] = useState<CampaignQuery[]>([ ]);

        const [showQueryDetails, setShowQueryDetails] = useState(false);

   

  
      

const simulateThinkingTasks = () => {
  const tasks: ThinkingTask[] = [
    {
      id: '1',
      title: 'Market Analysis',
      status: 'processing',
      description: 'Analyzing target market and competition',
      details: ['Identifying target demographics', 'Competitive landscape research', 'Market size estimation'],
    },
    {
      id: '2',
      title: 'Audience Segmentation',
      status: 'processing',
      description: 'Defining audience segments and personas',
      details: ['Primary audience identification', 'Secondary audience analysis', 'Behavioral patterns'],
    },
    {
      id: '3',
      title: 'Channel Strategy',
      status: 'pending',
      description: 'Selecting optimal marketing channels',
      details: ['Platform effectiveness analysis', 'Budget allocation planning', 'Timeline optimization']
    },
    {
      id: '4',
      title: 'Creative Direction',
      status: 'pending',
      description: 'Developing creative concepts and messaging',
      details: ['Brand voice alignment', 'Visual concept development', 'Message testing strategy']
    },
    {
      id: '5',
      title: 'Performance Metrics',
      status: 'pending',
      description: 'Setting KPIs and success metrics',
      details: ['Goal definition', 'Measurement framework', 'Attribution modeling']
    }
  ];

  setThinkingTasks(tasks);

  let taskIndex = 0;
  let progressInterval: NodeJS.Timeout | null = null;
  let mainInterval: NodeJS.Timeout | null = null;

  mainInterval = setInterval(() => {
    if (taskIndex < tasks.length) {
      setThinkingTasks(prev => prev.map((task, index) => {
        if (index === taskIndex) {
          return { ...task, status: 'processing', progress: 0 };
        }
        if (index < taskIndex) {
          return { ...task, status: 'completed', progress: 100 };
        }
        return task;
      }));

      let progress = 0;
      progressInterval = setInterval(() => {
        progress += Math.random() * 5; // Small increments for smoother progress
        if (progress >= 100) {
          progress = 100; // Force 100% when task reaches completion
          clearInterval(progressInterval!);  // Clear the inner progress interval

          setThinkingTasks(prev => prev.map((task, index) =>
            index === taskIndex ? { ...task, status: 'completed', progress: 100 } : task
          ));
          taskIndex++; // Move to the next task
        } else {
          setThinkingTasks(prev => prev.map((task, index) =>
            index === taskIndex ? { ...task, progress } : task
          ));
        }
      }, 100); // Reduced interval for smoother progress
    } else {
      // All tasks completed - Clear main interval
      clearInterval(mainInterval!);
      
      // Create a new query
      const newQuery: SearchQuery = {
        id: Date.now().toString(),
        query: campaignPrompt,
        response: '',
        timestamp: new Date(),
        suggestions: suggestions.slice(0, 3),
        status: 'draft'
      };

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const updatedQuery = { ...newQuery };

      updatedQuery.response = JSON.stringify(randomResponse);
      updatedQuery.confidenceScore = randomResponse.confidenceScore;
      updatedQuery.alternatives = randomResponse.alternatives;
      updatedQuery.predictiveMetrics = randomResponse.predictiveMetrics;
      updatedQuery.competitorData = randomResponse.competitorData;
      updatedQuery.marketOpportunity = randomResponse.marketOpportunity;

      // Update search history, index, and other states
      setSearchHistory(prev => [...prev, updatedQuery]);
      setCurrentIndex(prev => prev + 1);
      setIsTyping(false);
      setIsAnimating(false);
      setCampaignPrompt('');
      setGenerationLogs([]);
    }
  }, 2000);

  // Cleanup when the component unmounts or tasks are completed
  return () => {
    if (progressInterval) clearInterval(progressInterval);
    if (mainInterval) clearInterval(mainInterval);
  };
};





    const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'pending': return <Clock size={16} className="text-gray-400" />;
      default: return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-200';
      case 'processing': return 'bg-blue-100 border-blue-200';
      case 'pending': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getQueryStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

    const renderCreateCampaign = () => (
      <div className="">
<div className="flex gap-8">
        {/* AI Chat Interface */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-3xl p-8 w-[80vw] transform transition-all duration-500  ${isAnimating ? 'animate-pulse' : ''}`}>
          <div className="mx-auto">
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateHistory('prev')}
                disabled={currentIndex <= 0}
                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'neon' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg shadow-blue-500/50' 
                    : `${themeClasses.accent} text-white hover:shadow-lg`
                }`}
              >
                <ArrowLeft size={20} className="mr-2" />
                Previous Query
              </button>

              <div className={`flex items-center space-x-2 px-4 py-2 ${themeClasses.cardBg} rounded-xl ${themeClasses.border} border`}>
                <Bot className={`${theme === 'neon' ? 'text-cyan-400' : 'text-blue-600'} animate-spin`} size={20} />
                <span className={`${themeClasses.text} font-medium`}>
                  {searchHistory.length} queries processed
                </span>
              </div>

              <button
                onClick={() => navigateHistory('next')}
                disabled={currentIndex >= searchHistory.length - 1}
                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'neon' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50' 
                    : `${themeClasses.accent} text-white hover:shadow-lg`
                }`}
              >
                Next Query
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>

            {/* Chat Input */}
            <div className="relative mb-6">
              <div className={`flex items-center ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-2 transition-all duration-300 focus-within:shadow-xl ${theme === 'neon' ? 'focus-within:shadow-cyan-500/50' : 'focus-within:shadow-blue-500/20'}`}>
                <User className={`${themeClasses.textSecondary} ml-3`} size={20} />
                <textarea
                  ref={textareaRef}
                  value={campaignPrompt}
                  onChange={(e) => setCampaignPrompt(e.target.value)}
                  placeholder="Describe your campaign vision... (e.g., 'Launch a premium skincare line targeting eco-conscious millennials')"
                  className={`flex-1 p-4 bg-transparent ${themeClasses.text} placeholder-gray-400 resize-none focus:outline-none text-lg`}
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <button
                  onClick={handleVoiceInput}
                  disabled={voiceInput}
                  className={`p-2 rounded-xl transition-all mr-2 ${
                    voiceInput 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : `${themeClasses.textSecondary} hover:text-blue-600`
                  }`}
                >
                  <Mic size={20} />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!campaignPrompt.trim() || isTyping}
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                    theme === 'neon' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg shadow-blue-500/50' 
                      : `${themeClasses.accent} text-white hover:shadow-lg`
                  }`}
                >
                  {isTyping ? (
                    <div className="animate-spin">
                      <Sparkles size={20} />
                    </div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>

              {/* Auto Suggestions */}
              {showSuggestions && (
                <div className={`absolute top-full left-0 right-0 mt-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl shadow-2xl z-50 animate-fade-in`}>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <Lightbulb className={`${theme === 'neon' ? 'text-yellow-400' : 'text-yellow-500'} mr-2 animate-pulse`} size={16} />
                      <span className={`text-sm ${themeClasses.textSecondary} font-medium`}>AI Suggestions</span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCampaignPrompt(suggestion);
                            setShowSuggestions(false);
                          }}
                          className={`block w-full text-left p-3 rounded-xl transition-all duration-200 hover:bg-slate-300 ${
                            theme === 'neon' 
                              ? 'hover:bg-gradient-to-r hover:from-cyan-900/50 hover:to-blue-900/50 hover:border-cyan-500' 
                              : `hover:bg-blue-50 hover:border-blue-200`
                          } ${themeClasses.border} border`}
                        >
                          <span className={`${themeClasses.text} text-sm`}>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Response Display */}
            {currentResponse && (
              <div className="space-y-6 animate-fade-in">
                {/* Save Confirmation */}
                {showSaveConfirmation && (
                  <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
                    <div className="flex items-center">
                      <Sparkles className="mr-2" size={20} />
                      Campaign saved successfully!
                    </div>
                  </div>
                )}

                {/* AI Confidence & Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 text-center`}>
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="text-blue-600 mr-2" size={20} />
                      <span className={`font-semibold ${themeClasses.text}`}>AI Confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{currentResponse.confidenceScore}%</div>
                  </div>
                  
                  <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 text-center`}>
                    <div className="flex items-center justify-center mb-2">
                      <Award className="text-blue-600 mr-2" size={20} />
                      <span className={`font-semibold ${themeClasses.text}`}>Market Opportunity</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{currentResponse.marketOpportunity}/100</div>
                  </div>
                  
                  <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 text-center`}>
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="text-blue-600 mr-2" size={20} />
                      <span className={`font-semibold ${themeClasses.text}`}>Est. ROAS</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{currentResponse.predictiveMetrics?.estimatedROAS}</div>
                  </div>
                  
                  <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 text-center`}>
                    <div className="flex items-center justify-center mb-2">
                      <MousePointer className="text-orange-600 mr-2" size={20} />
                      <span className={`font-semibold ${themeClasses.text}`}>Est. CTR</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{currentResponse.predictiveMetrics?.estimatedCTR}</div>
                  </div>
                </div>

                {/* Campaign Strategy Table */}
                <div className={`${theme === 'neon' ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-cyan-500' : 'bg-blue-50 border-blue-200'} border-2 rounded-2xl p-6 transform transition-all duration-500 hover:scale-[1.01]`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Target className={`${theme === 'neon' ? 'text-cyan-400' : 'text-blue-600'} mr-3 animate-pulse`} size={24} />
                      <h4 className={`font-bold text-xl ${theme === 'neon' ? 'text-cyan-400' : 'text-blue-900'}`}>
                        Campaign Strategy Recommendation
                      </h4>
                      {searchHistory[currentIndex]?.isEdited && (
                        <span className="ml-3 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                          Edited
                        </span>
                      )}
                      {searchHistory[currentIndex]?.isSaved && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Saved
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowAlternatives(!showAlternatives)}
                        className={`flex items-center px-4 py-2 ${theme === 'neon' ? 'bg-gradient-to-r from-blue-600 to-teal-600' : 'bg-blue-500'} text-white rounded-xl hover:opacity-90 transition-all`}
                      >
                        <Layers size={16} className="mr-2" />
                        Alternatives
                      </button>
                      {!isEditing ? (
                        <button
                          onClick={handleEditResponse}
                          className={`flex items-center px-4 py-2 ${theme === 'neon' ? 'bg-gradient-to-r from-blue-600 to-blue-600' : 'bg-blue-500'} text-white rounded-xl hover:opacity-90 transition-all`}
                        >
                          <Settings size={16} className="mr-2" />
                          Edit
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={handleSaveChanges}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
                          >
                            <Sparkles size={16} className="mr-2" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setShowAdvanceModal(true)}
                        className={`flex items-center px-4 py-2 ${theme === 'neon' ? 'bg-gradient-to-r from-blue-600 to-teal-600' : 'bg-blue-500'} text-white rounded-xl hover:opacity-90 transition-all`}
                      >
                        <Fence  size={16} className="mr-2" />
                        Advance
                      </button>
                      <button
                        onClick={handleSaveAsTemplate}
                        className={`flex items-center px-4 py-2 ${theme === 'neon' ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-green-500'} text-white rounded-xl hover:opacity-90 transition-all`}
                      >
                        <Bookmark size={16} className="mr-2" />
                        Save as Template
                      </button>
                    </div>
                  </div>

                  {/* Strategy Table */}
                  <div className={`${theme === 'neon' ? 'bg-black/30' : 'bg-white/70'} rounded-xl overflow-hidden ${themeClasses.border} border mb-6`}>
                    <table className="w-full">
                      <thead className={`${theme === 'neon' ? 'bg-cyan-900/50' : 'bg-blue-100'}`}>
                        <tr>
                          <th className={`text-left py-3 px-4 font-semibold ${theme === 'neon' ? 'text-cyan-300' : 'text-blue-900'}`}>
                            Parameter
                          </th>
                          <th className={`text-left py-3 px-4 font-semibold ${theme === 'neon' ? 'text-cyan-300' : 'text-blue-900'}`}>
                            Recommendation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(isEditing ? editedResponse?.strategy || currentResponse.strategy : currentResponse.strategy).map(([key, value], index) => (
                          <tr key={key} className={`border-t ${theme === 'neon' ? 'border-cyan-800' : 'border-blue-200'}`}>
                            <td className={`py-3 px-4 font-medium ${theme === 'neon' ? 'text-cyan-400' : 'text-blue-800'} capitalize`}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className={`py-3 px-4 ${themeClasses.text}`}>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editedResponse?.strategy?.[key] || value}
                                  onChange={(e) => setEditedResponse({
                                    ...editedResponse,
                                    strategy: {
                                      ...editedResponse.strategy,
                                      [key]: e.target.value
                                    }
                                  })}
                                  className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                              ) : (
                                <span className="font-medium">{value}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* AI Reasoning Section */}
                  <div>
                    <div className="flex items-center mb-4">
                      <Brain className={`${theme === 'neon' ? 'text-cyan-400' : 'text-blue-600'} mr-3 animate-pulse`} size={24} />
                      <h4 className={`font-bold text-lg ${theme === 'neon' ? 'text-cyan-400' : 'text-blue-900'}`}>
                        Why This Recommendation?
                      </h4>
                      <Sparkles className={`${theme === 'neon' ? 'text-cyan-400' : 'text-blue-600'} ml-auto animate-spin`} size={20} />
                    </div>
                    <div className={`${theme === 'neon' ? 'bg-black/30' : 'bg-white/70'} rounded-xl p-4 ${themeClasses.border} border`}>
                      <div className="space-y-3">
                        {(isEditing ? editedResponse?.reasoning || currentResponse.reasoning : currentResponse.reasoning).map((reason: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <div className={`w-6 h-6 rounded-full ${theme === 'neon' ? 'bg-cyan-500' : 'bg-blue-500'} text-white flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0`}>
                              {index + 1}
                            </div>
                            {isEditing ? (
                              <textarea
                                value={editedResponse?.reasoning?.[index] || reason}
                                onChange={(e) => {
                                  const newReasoning = [...(editedResponse?.reasoning || currentResponse.reasoning)];
                                  newReasoning[index] = e.target.value;
                                  setEditedResponse({
                                    ...editedResponse,
                                    reasoning: newReasoning
                                  });
                                }}
                                className={`flex-1 p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                rows={2}
                              />
                            ) : (
                              <p className={`${themeClasses.text} leading-relaxed flex-1`}>{reason}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative Strategies */}
                {showAlternatives && currentResponse.alternatives && (
                  <div className={`${theme === 'neon' ? 'bg-gradient-to-r from-blue-900/50 to-teal-900/50 border-teal-500' : 'bg-blue-50 border-blue-200'} border-2 rounded-2xl p-6 animate-fade-in`}>
                    <div className="flex items-center mb-4">
                      <Layers className={`${theme === 'neon' ? 'text-teal-400' : 'text-blue-600'} mr-3`} size={24} />
                      <h4 className={`font-bold text-xl ${theme === 'neon' ? 'text-teal-400' : 'text-blue-900'}`}>
                        Alternative Strategies
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentResponse.alternatives.map((alt: any, index: number) => (
                        <div key={index} className={`${theme === 'neon' ? 'bg-black/30' : 'bg-white/70'} rounded-xl p-4 ${themeClasses.border} border`}>
                          <h5 className={`font-semibold ${themeClasses.text} mb-2`}>Option {index + 1}</h5>
                          <p className={`text-sm ${themeClasses.textSecondary} mb-2`}><strong>Platform:</strong> {alt.platform}</p>
                          <p className={`text-sm ${themeClasses.textSecondary} mb-2`}><strong>Segment:</strong> {alt.segment}</p>
                          <p className={`text-sm ${themeClasses.textSecondary}`}><strong>Reasoning:</strong> {alt.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Predictive Analytics */}
                <div className={`${theme === 'neon' ? 'bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500' : 'bg-orange-50 border-orange-200'} border-2 rounded-2xl p-6`}>
                  <div className="flex items-center mb-4">
                    <BarChart3 className={`${theme === 'neon' ? 'text-orange-400' : 'text-orange-600'} mr-3`} size={24} />
                    <h4 className={`font-bold text-xl ${theme === 'neon' ? 'text-orange-400' : 'text-orange-900'}`}>
                      Predictive Analytics & Competitor Insights
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Predictive Metrics */}
                    <div className={`${theme === 'neon' ? 'bg-black/30' : 'bg-white/70'} rounded-xl p-4 ${themeClasses.border} border`}>
                      <h5 className={`font-semibold ${themeClasses.text} mb-3`}>Expected Performance</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Estimated CTR:</span>
                          <span className={`font-medium ${themeClasses.text}`}>{currentResponse.predictiveMetrics?.estimatedCTR}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Estimated Conversions:</span>
                          <span className={`font-medium ${themeClasses.text}`}>{currentResponse.predictiveMetrics?.estimatedConversions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Estimated ROAS:</span>
                          <span className={`font-medium text-blue-600`}>{currentResponse.predictiveMetrics?.estimatedROAS}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Risk Score:</span>
                          <span className={`font-medium ${
                            currentResponse.predictiveMetrics?.riskScore === 'Low' ? 'text-blue-600' :
                            currentResponse.predictiveMetrics?.riskScore === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>{currentResponse.predictiveMetrics?.riskScore}</span>
                        </div>
                      </div>
                    </div>

                    {/* Competitor Data */}
                    <div className={`${theme === 'neon' ? 'bg-black/30' : 'bg-white/70'} rounded-xl p-4 ${themeClasses.border} border`}>
                      <h5 className={`font-semibold ${themeClasses.text} mb-3`}>Competitive Landscape</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Competitor Spend:</span>
                          <span className={`font-medium ${themeClasses.text}`}>{currentResponse.competitorData?.competitorSpend}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Market Share:</span>
                          <span className={`font-medium ${themeClasses.text}`}>{currentResponse.competitorData?.marketShare}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeClasses.textSecondary}`}>Top Performing Ads:</span>
                          <span className={`font-medium ${themeClasses.text}`}>{currentResponse.competitorData?.topPerformingAds}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

          

                {/* Create Studio Button */}
                <div className='flex  items-center justify-center'>
                <div className="text-center pt-6">
                  <button 
                    // onClick={handleGoToCreatorStudio}
                    className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                      theme === 'neon' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg shadow-blue-500/50' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-500  text-white hover:shadow-blue-500/50'
                    } flex items-center mx-auto`}
                  >
                    <Save className="mr-3" size={24} />
                    Save
                  </button>
                  <p className={`${themeClasses.textSecondary} text-sm mt-3`}>
                    Go to Create Studio to generate campaign assets
                  </p>
                </div>
                   <div className="text-center pt-6">
                  <button 
                    onClick={() => onTabChange("creator")}
                    className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                      theme === 'neon' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg shadow-blue-500/50' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-500  text-white hover:shadow-blue-500/50'
                    } flex items-center mx-auto`}
                  >
                    <Palette className="mr-3" size={24} />
                    Confirm & Next
                  </button>
                  <p className={`${themeClasses.textSecondary} text-sm mt-3`}>
                    Go to Create Studio to generate campaign assets
                  </p>
                </div>
              </div>
              </div>
            )}

            {/* Loading State */}
            {isTyping && (
              <div className="space-y-4 py-8 animate-fade-in">
                <div className="text-center">
                  <div className={`inline-flex items-center px-6 py-3 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl`}>
                    <Bot className={`${theme === 'neon' ? 'text-cyan-400' : 'text-blue-600'} mr-3 animate-spin`} size={24} />
                    <span className={`${themeClasses.text} font-medium`}>AI is analyzing your strategy...</span>
                    <div className="flex space-x-1 ml-3">
                      <div className={`w-2 h-2 ${theme === 'neon' ? 'bg-cyan-400' : 'bg-blue-600'} rounded-full animate-bounce`}></div>
                      <div className={`w-2 h-2 ${theme === 'neon' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                      <div className={`w-2 h-2 ${theme === 'neon' ? 'bg-cyan-400' : 'bg-blue-600'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* AI Generation Logs */}
                {generationLogs.length > 0 && (
                  <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-4 max-w-md mx-auto`}>
                    <h4 className={`font-medium ${themeClasses.text} mb-3 flex items-center`}>
                      <Activity className="mr-2" size={16} />
                      AI Processing Log
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {generationLogs.map((log, index) => (
                        <div key={index} className={`text-sm ${themeClasses.textSecondary} animate-fade-in`}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
         {/* Right Sidebar - Thinking Tasks */}
        <div className="w-96 p-6 border-l border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="space-y-6">
            {/* Thinking Process Header */}
            <div>
              <h3 className={`text-lg font-bold ${themeClasses.text} mb-2 flex items-center`}>
                <GitBranch className="mr-2 text-blue-500" size={20} />
                AI Thinking Process
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Watch how AI analyzes and develops your campaign strategy
              </p>
            </div>

            {/* Thinking Tasks */}
            <div className="space-y-3">
              {thinkingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${getTaskStatusColor(task.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTaskStatusIcon(task.status)}
                      <h4 className={`font-medium ${themeClasses.text} text-sm`}>{task.title}</h4>
                    </div>
                    {task.status === 'processing' && task.progress && (
                      <span className="text-xs text-blue-600 font-medium">{Math.round(task.progress)}%</span>
                    )}
                  </div>
                  
                  <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>{task.description}</p>
                  
                  {task.status === 'processing' && task.progress && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {task.details && task.status !== 'pending' && (
                    <div className="space-y-1">
                      {task.details.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Campaign Queries Section */}
            {campaignQueries.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${themeClasses.text} flex items-center`}>
                    <Database className="mr-2 text-green-500" size={20} />
                    Campaign Queries
                  </h3>
                  <button
                    onClick={() => setShowQueryDetails(!showQueryDetails)}
                    className={`p-2 rounded-lg ${themeClasses.hover} transition-colors`}
                  >
                    <ChevronDown className={`transform transition-transform ${showQueryDetails ? 'rotate-180' : ''}`} size={16} />
                  </button>
                </div>

                {campaignQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-4 rounded-xl border-2 ${
                      query.status === 'applied' ? 'bg-green-50 border-green-200' :
                      query.status === 'confirmed' ? 'bg-blue-50 border-blue-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQueryStatusColor(query.status)}`}>
                        {query.status}
                      </span>
                      {query.status === 'applied' && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Layers size={12} />
                          <span className="text-xs">In Knowledge Graph</span>
                        </div>
                      )}
                    </div>

                    {showQueryDetails && (
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Query:</h5>
                          <p className="text-xs text-gray-600 bg-white p-2 rounded border">{query.query}</p>
                        </div>

                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Reasoning:</h5>
                          <p className="text-xs text-gray-600 bg-white p-2 rounded border">{query.reasoning}</p>
                        </div>

                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Key Insights:</h5>
                          <div className="space-y-1">
                            {query.keyInsights.map((insight, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Lightbulb size={10} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-600">{insight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {query.status === 'draft' && (
                          <button
                            onClick={() => confirmQuery(query.id)}
                            className="w-full py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
                          >
                            Confirm & Add to Knowledge Graph
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Knowledge Graph Status */}
            {campaignQueries.some(q => q.status === 'applied') && (
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="text-green-600" size={16} />
                  <h4 className="font-medium text-green-800 text-sm">Knowledge Graph Updated</h4>
                </div>
                <p className="text-xs text-green-700">
                  Campaign insights have been added to the knowledge graph for future query optimization.
                </p>
              </div>
            )}

                  {/* Key Insights */}
                {currentResponse?.insights&&<div className={`${theme === 'neon' ? 'bg-gradient-to-r from-blue-900/50 to-blue-900/50 border-blue-500' : 'bg-blue-50 border-blue-200'} border-2 rounded-2xl p-6 transform transition-all duration-500 hover:scale-[1.01]`}>
                  <div className="flex items-center mb-4">
                    <Lightbulb className={`${theme === 'neon' ? 'text-blue-400' : 'text-blue-600'} mr-3 animate-pulse`} size={24} />
                    <h4 className={`font-bold text-xl ${theme === 'neon' ? 'text-blue-400' : 'text-blue-900'}`}>
                      Key Insights
                    </h4>
                    <TrendingUp className={`${theme === 'neon' ? 'text-blue-400' : 'text-blue-600'} ml-auto animate-bounce`} size={20} />
                  </div>
                  <div className={`${theme === 'neon' ? 'bg-black/30' : 'bg-white/70'} rounded-xl p-4 ${themeClasses.border} border`}>
                    <ul className="space-y-2">
                      {currentResponse?.insights?.map((insight: string, index: number) => (
                        <li key={index} className={`flex items-center ${themeClasses.text}`}>
                          <ChevronDown className={`${theme === 'neon' ? 'text-blue-400' : 'text-blue-600'} mr-2 transform rotate-[-90deg]`} size={16} />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>}
          </div>
        </div>
        </div>
        {/* Quick Actions with Eccentric Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 hidden">
          {[
            { title: 'Strategy Templates', icon: Target, color: 'blue', gradient: 'from-blue-500 to-blue-500 ' },
            { title: 'Market Analysis', icon: TrendingUp, color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
            { title: 'Competitor Insights', icon: Sparkles, color: 'blue', gradient: 'from-blue-500 to-rose-500' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <div 
                key={index} 
                className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6 transition-all duration-500 transform hover:scale-110 hover:rotate-1 cursor-pointer group ${
                  theme === 'neon' ? 'hover:shadow-2xl hover:shadow-cyan-500/50' : 'hover:shadow-2xl'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:animate-spin transition-all duration-300`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h4 className={`font-bold text-lg ${themeClasses.text} group-hover:animate-pulse`}>
                  {action.title}
                </h4>
                <div className={`w-full h-1 bg-gradient-to-r ${action.gradient} rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>
      </div>
    );
      const renderManageCampaigns = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className={`pl-10 pr-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="running">Running</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <button className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all`}>
            <Plus size={16} className="mr-2" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all cursor-pointer`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-${campaignTypes.find(t => t.id === campaign.type)?.color || 'blue'}-100 rounded-xl flex items-center justify-center`}>
                  <Target className={`text-${campaignTypes.find(t => t.id === campaign.type)?.color || 'blue'}-600`} size={24} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${themeClasses.text}`}>{campaign.name}</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    {campaignTypes.find(t => t.id === campaign.type)?.label} • Created {campaign.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                  {getStatusIcon(campaign.status)}
                  <span className="ml-1 capitalize">{campaign.status}</span>
                </span>
                <button className={`p-2 ${themeClasses.textSecondary} hover:text-gray-600 transition-colors`}>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className={`p-3 ${themeClasses.cardBg} rounded-xl`}>
                <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Budget</p>
                <p className={`font-semibold ${themeClasses.text}`}>${campaign.budget.toLocaleString()}</p>
              </div>
              <div className={`p-3 ${themeClasses.cardBg} rounded-xl`}>
                <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Duration</p>
                <p className={`font-semibold ${themeClasses.text}`}>
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className={`p-3 ${themeClasses.cardBg} rounded-xl`}>
                <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Platforms</p>
                <div className="flex space-x-1">
                  {campaign.platforms.slice(0, 3).map((platformId) => {
                    const platform = platforms.find(p => p.id === platformId);
                    if (!platform) return null;
                    const Icon = platform.icon;
                    return (
                      <Icon key={platformId} className={`text-${platform.color}-600`} size={16} />
                    );
                  })}
                  {campaign.platforms.length > 3 && (
                    <span className={`text-xs ${themeClasses.textSecondary}`}>+{campaign.platforms.length - 3}</span>
                  )}
                </div>
              </div>
              <div className={`p-3 ${themeClasses.cardBg} rounded-xl`}>
                <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Audience</p>
                <p className={`font-semibold ${themeClasses.text} text-sm truncate`}>{campaign.audience}</p>
              </div>
            </div>
            
            {campaign.performance && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Impressions</p>
                  <p className={`font-bold ${themeClasses.text}`}>{(campaign.performance.impressions / 1000000).toFixed(1)}M</p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>CTR</p>
                  <p className={`font-bold ${themeClasses.text}`}>{campaign.performance.ctr.toFixed(2)}%</p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Conversions</p>
                  <p className={`font-bold ${themeClasses.text}`}>{campaign.performance.conversions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>ROAS</p>
                  <p className={`font-bold text-green-600`}>{campaign.performance.roas.toFixed(1)}x</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Campaign Analytics</h3>
        <div className={`h-80 ${themeClasses.gradient} rounded-2xl flex items-center justify-center`}>
          <div className="text-center">
            <BarChart3 className={`${themeClasses.textSecondary} mb-4 mx-auto`} size={48} />
            <p className={`${themeClasses.textSecondary} mb-2 font-semibold`}>Advanced Analytics Dashboard</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>Comprehensive campaign performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Custom Templates */}
      {customTemplates.length > 0 && (
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6 flex items-center`}>
            <Bookmark className="mr-2 text-green-500" size={24} />
            My Custom Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customTemplates.map((template) => (
              <div key={template.id} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${themeClasses.text} mb-1`}>{template.name}</h4>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>{template.industry}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className={`text-sm ${themeClasses.textSecondary} mb-4 line-clamp-2`}>{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all text-sm`}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default Templates */}
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Default Campaign Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Holiday Sale Template', type: 'Conversion', platforms: ['Facebook', 'Instagram'] },
            { name: 'Brand Awareness Template', type: 'Awareness', platforms: ['YouTube', 'LinkedIn'] },
            { name: 'Product Launch Template', type: 'Conversion', platforms: ['Google', 'Email'] },
          ].map((template, index) => (
            <div key={index} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all cursor-pointer`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-2`}>{template.name}</h4>
              <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>{template.type} Campaign</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {template.platforms.map((platform, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {platform}
                    </span>
                  ))}
                </div>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all text-sm`}>
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <div className={`min-h-screen max-h-screen overflow-auto transition-all duration-500  ${themeClasses.bg}`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
        {/* Header with Theme Switcher */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-start mb-2">
              <Brain className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
              <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                Strategy Studio AI
              </h2>
              {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
            </div>
            <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
              Next-generation AI-powered campaign creation and strategy development
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
              className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                showAdvancedFeatures ? `${themeClasses.accent} text-white` : `${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`
              }`}
            >
              <Settings size={16} className="mr-2" />
              Advanced
            </button>
          </div>
        </div>

        {/* Advanced Features Panel */}
        {showAdvancedFeatures && (
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 mb-6 animate-fade-in`}>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Advanced Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Campaign Templates */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Template</option>
                  {campaignTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Vertical */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Industry Vertical</label>
                <select
                  value={industryVertical}
                  onChange={(e) => setIndustryVertical(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Industry</option>
                  {industryVerticals.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campaign Status */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Status</label>
                <select
                  value={campaignStatus}
                  onChange={(e) => setCampaignStatus(e.target.value as any)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="draft">Draft</option>
                  <option value="review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="in-creation">In Creation</option>
                  <option value="live">Live</option>
                </select>
              </div>

              {/* Scheduled Launch */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Scheduled Launch</label>
                <input
                  type="datetime-local"
                  value={scheduledLaunch}
                  onChange={(e) => setScheduledLaunch(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Campaign Notes */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Notes</label>
                <textarea
                  value={campaignNotes}
                  onChange={(e) => setCampaignNotes(e.target.value)}
                  placeholder="Add notes or comments..."
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows={2}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className={`flex items-center px-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}
              >
                <Download size={16} className="mr-2" />
                Export Options
              </button>
              <button
                onClick={() => setShowCollaboration(!showCollaboration)}
                className={`flex items-center px-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}
              >
                <UsersIcon size={16} className="mr-2" />
                Collaborate
              </button>
              <button
                onClick={handleScheduleLaunch}
                disabled={!scheduledLaunch}
                className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors disabled:opacity-50`}
              >
                <Calendar size={16} className="mr-2" />
                Schedule Launch
              </button>
            </div>

            {/* Export Options */}
            {showExportOptions && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <h4 className={`font-medium ${themeClasses.text} mb-3`}>Export Campaign</h4>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleExportCampaign('pdf')}
                    className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FileText size={14} className="mr-1" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleExportCampaign('csv')}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Database size={14} className="mr-1" />
                    CSV
                  </button>
                  <button
                    onClick={() => handleExportCampaign('presentation')}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 size={14} className="mr-1" />
                    Presentation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

                 {/* Tab Navigation */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `${themeClasses.accent} text-white`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={16} className="mr-1 md:mr-2" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' && renderCreateCampaign()}
        {activeTab === 'legacy' && renderLegacyCampaigns()}
        {activeTab === 'manage' && renderManageCampaigns()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'templates' && renderTemplates()}
      </div>

      {/* Advance Modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border ${themeClasses.border}`}>
            {/* Modal Header */}
            <div className={`sticky top-0 ${themeClasses.cardBg} border-b ${themeClasses.border} p-6 flex items-center justify-between z-10`}>
              <div className="flex items-center">
                <Fence className="text-blue-500 mr-3" size={24} />
                <h3 className={`text-xl font-bold ${themeClasses.text}`}>Advanced Campaign Options</h3>
              </div>
              <button
                onClick={() => setShowAdvanceModal(false)}
                className={`p-2 rounded-lg ${themeClasses.hover} transition-all`}
              >
                <svg className={themeClasses.text} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Campaign Optimization */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-4`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                  <TrendingUp className="mr-2 text-green-500" size={18} />
                  Campaign Optimization
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Auto-optimize budget allocation</span>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>A/B testing enabled</span>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Dynamic content optimization</span>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  </label>
                </div>
              </div>

              {/* Target Audience */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-4`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                  <Target className="mr-2 text-red-500" size={18} />
                  Target Audience Refinement
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>Age Range</label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        className={`flex-1 p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className={`flex-1 p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>Geographic Targeting</label>
                    <select className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}>
                      <option>Global</option>
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Asia Pacific</option>
                      <option>Custom Regions</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-4`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                  <DollarSign className="mr-2 text-yellow-500" size={18} />
                  Budget & Timeline
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>Total Budget ($)</label>
                    <input
                      type="number"
                      placeholder="Enter budget amount"
                      className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>Start Date</label>
                      <input
                        type="date"
                        className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                      />
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>End Date</label>
                      <input
                        type="date"
                        className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Goals */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-4`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                  <Activity className="mr-2 text-blue-500" size={18} />
                  Performance Goals
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>Target ROAS</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 3.5"
                      className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.text} block mb-2`}>Target Conversions</label>
                    <input
                      type="number"
                      placeholder="Number of conversions"
                      className={`w-full p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text}`}
                    />
                  </div>
                </div>
              </div>

              {/* AI Assistance */}
              <div className={`bg-gradient-to-r from-blue-500/10 to-teal-500/10 border ${themeClasses.border} rounded-xl p-4`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                  <Sparkles className="mr-2 text-teal-500" size={18} />
                  AI-Powered Recommendations
                </h4>
                <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                  Let AI analyze your campaign and provide optimization suggestions
                </p>
                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-all flex items-center justify-center">
                  <Sparkles size={16} className="mr-2" />
                  Get AI Recommendations
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`sticky bottom-0 ${themeClasses.cardBg} border-t ${themeClasses.border} p-6 flex justify-end gap-3`}>
              <button
                onClick={() => setShowAdvanceModal(false)}
                className={`px-6 py-2 ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl ${themeClasses.text} hover:bg-gray-100 transition-all`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAdvanceModal(false);
                }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-all flex items-center"
              >
                <Check size={16} className="mr-2" />
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save as Template Modal */}
      {showSaveTemplateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-2xl shadow-2xl max-w-md w-full border ${themeClasses.border}`}>
            {/* Modal Header */}
            <div className={`border-b ${themeClasses.border} p-6 flex items-center justify-between`}>
              <div className="flex items-center">
                <Bookmark className="text-green-500 mr-3" size={24} />
                <h3 className={`text-xl font-bold ${themeClasses.text}`}>Save as Template</h3>
              </div>
              <button
                onClick={handleCancelSaveTemplate}
                className={`p-2 rounded-lg ${themeClasses.hover} transition-all`}
              >
                <X className={themeClasses.text} size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Summer Sale Campaign"
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Industry
                </label>
                <input
                  type="text"
                  value={templateIndustry}
                  onChange={(e) => setTemplateIndustry(e.target.value)}
                  placeholder="e.g., E-commerce, Technology, Healthcare"
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Brief description of this template..."
                  rows={3}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500 resize-none`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancelSaveTemplate}
                  className={`px-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} hover:bg-gray-100 transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSaveTemplate}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"
                >
                  <Bookmark size={16} className="mr-2" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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