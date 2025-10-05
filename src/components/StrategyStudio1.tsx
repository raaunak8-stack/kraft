import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Target, TrendingUp, Zap, Send, Bot, User, Lightbulb, Brain, Rocket, Wand2, ChevronDown, Palette, Settings, Plus, Calendar, DollarSign, Users, Eye, MousePointer, BarChart3, Globe, Smartphone, Monitor, Tablet, Facebook, Instagram, Twitter, Youtube, Linkedin, Search, Mail, MessageSquare, Image, Video, FileText, PieChart, Clock, CheckCircle, AlertCircle, Play, Pause, RotateCcw, Download, Share2, Copy, CreditCard as Edit3, Trash2, Filter, Import as SortAsc, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
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

export const StrategyStudio1: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  
  const [activeTab, setActiveTab] = useState('create');
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCampaignType, setSelectedCampaignType] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [campaignBudget, setCampaignBudget] = useState('');
  const [campaignDuration, setCampaignDuration] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [campaignObjectives, setCampaignObjectives] = useState<string[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'create', label: 'Create Campaign', icon: Plus },
    { id: 'legacy', label: 'Legacy Campaigns', icon: Target },
    { id: 'manage', label: 'Manage Campaigns', icon: Settings },
    { id: 'analytics', label: 'Campaign Analytics', icon: BarChart3 },
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

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!campaignPrompt.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: campaignPrompt,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCampaignPrompt('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
        suggestions: [
          'Create a detailed campaign brief',
          'Set up audience targeting',
          'Generate creative assets',
          'Schedule campaign launch'
        ]
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateAIResponse = (prompt: string): string => {
    const responses = [
      `Based on your request, I recommend a multi-platform campaign focusing on ${selectedCampaignType || 'conversion'}. Here's a strategic approach:\n\n1. **Target Audience**: ${targetAudience || 'Define your core demographic'}\n2. **Budget Allocation**: ${campaignBudget ? `$${campaignBudget} distributed across platforms` : 'Optimize budget based on platform performance'}\n3. **Key Platforms**: ${selectedPlatforms.length > 0 ? selectedPlatforms.join(', ') : 'Facebook, Instagram, Google Ads'}\n4. **Campaign Duration**: ${campaignDuration || '30 days for optimal results'}\n\nWould you like me to create a detailed campaign brief?`,
      
      `Excellent campaign idea! I've analyzed your requirements and here's my strategic recommendation:\n\n**Campaign Strategy:**\n- Focus on high-converting audiences\n- Implement A/B testing for creatives\n- Use retargeting for better ROI\n- Monitor performance daily\n\n**Expected Results:**\n- 15-25% increase in conversions\n- 2.5x ROAS within first month\n- 40% improvement in CTR\n\nShall I proceed with campaign setup?`,
      
      `Great vision for your campaign! Here's how we can bring it to life:\n\n**Phase 1**: Audience research and segmentation\n**Phase 2**: Creative development and testing\n**Phase 3**: Campaign launch and optimization\n**Phase 4**: Performance analysis and scaling\n\nThis approach typically delivers 30% better results than standard campaigns. Ready to get started?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

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

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderCreateCampaign = () => (
    <div className="space-y-8">
      {/* AI Campaign Assistant */}
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-4 md:p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-lg md:text-xl font-bold ${themeClasses.text} mb-2 flex items-center`}>
              <Brain className="mr-2 text-green-500" size={20} />
              KRAFT AI Campaign Assistant
            </h3>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              Describe your campaign goals and let AI create a comprehensive strategy
            </p>
          </div>
          <div className="hidden md:block">
            <div className={`w-16 h-16 ${themeClasses.gradient} rounded-xl flex items-center justify-center`}>
              <Wand2 size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-xl mb-4`}>
          <div className="h-64 md:h-80 overflow-y-auto p-3 md:p-4 space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center py-8">
                <Bot className={`${themeClasses.textSecondary} mx-auto mb-3`} size={32} />
                <p className={`${themeClasses.textSecondary} text-sm md:text-base`}>
                  Hi! I'm KRAFT AI. Tell me about your campaign goals and I'll help you create a winning strategy.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {[
                    'Create a holiday sales campaign',
                    'Launch a new product campaign',
                    'Increase brand awareness',
                    'Generate more leads'
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setCampaignPrompt(suggestion)}
                      className={`px-3 py-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors text-xs md:text-sm`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${
                      message.type === 'user' 
                        ? 'bg-green-500 text-white' 
                        : `${themeClasses.cardBg} ${themeClasses.border} border`
                    } rounded-xl p-3`}>
                      <div className="flex items-start space-x-3">
                        {message.type === 'assistant' && (
                          <Bot className="text-green-500 mt-1 flex-shrink-0" size={16} />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${message.type === 'user' ? 'text-white' : themeClasses.text} whitespace-pre-line`}>
                            {message.content}
                          </p>
                          {message.suggestions && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.type === 'user' && (
                          <User className="text-white mt-1 flex-shrink-0" size={16} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-3`}>
                      <div className="flex items-center space-x-3">
                        <Bot className="text-green-500 animate-pulse" size={16} />
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className={`border-t ${themeClasses.border} p-3`}>
            <div className="flex items-center space-x-3">
              <textarea
                value={campaignPrompt}
                onChange={(e) => setCampaignPrompt(e.target.value)}
                placeholder="Describe your campaign goals, target audience, budget, or any specific requirements..."
                className={`flex-1 p-3 bg-transparent ${themeClasses.text} placeholder-gray-400 resize-none focus:outline-none text-sm md:text-base`}
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!campaignPrompt.trim() || isGenerating}
                className={`p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.accent} text-white`}
              >
                {isGenerating ? (
                  <div className="animate-spin">
                    <Sparkles size={20} />
                  </div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Configuration */}
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-3 md:p-4`}>
        <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text} mb-4`}>Campaign Configuration</h3>
        
        <div className="space-y-4">
          {/* Campaign Type Selection */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {campaignTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedCampaignType === type.id;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedCampaignType(type.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      isSelected 
                        ? `border-${type.color}-500 bg-${type.color}-50` 
                        : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
                    }`}
                  >
                    <Icon 
                      className={`mx-auto mb-3 ${
                        isSelected ? `text-${type.color}-600` : themeClasses.textSecondary
                      }`} 
                      size={24} 
                    />
                    <h4 className={`text-sm font-medium ${
                      isSelected ? `text-${type.color}-900` : themeClasses.text
                    } mb-1`}>
                      {type.label}
                    </h4>
                    <p className={`text-xs ${themeClasses.textSecondary} hidden md:block`}>{type.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Platforms</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
                    className={`p-2 md:p-3 rounded-lg border transition-all duration-300 ${
                      isSelected 
                        ? `border-${platform.color}-500 bg-${platform.color}-50` 
                        : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
                    }`}
                  >
                    <Icon 
                      className={`mx-auto mb-2 ${
                        isSelected ? `text-${platform.color}-600` : themeClasses.textSecondary
                      }`} 
                      size={20} 
                    />
                    <p className={`text-xs font-medium text-center ${
                      isSelected ? `text-${platform.color}-900` : themeClasses.text
                    }`}>
                      {platform.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Budget ($)</label>
              <input
                type="number"
                value={campaignBudget}
                onChange={(e) => setCampaignBudget(e.target.value)}
                placeholder="Enter campaign budget"
                className={`w-full p-2 md:p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Duration (days)</label>
              <input
                type="number"
                value={campaignDuration}
                onChange={(e) => setCampaignDuration(e.target.value)}
                placeholder="Campaign duration"
                className={`w-full p-2 md:p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Target Audience</label>
            <textarea
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Describe your target audience (age, interests, demographics, etc.)"
              className={`w-full p-2 md:p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
              rows={3}
            />
          </div>

          {/* Campaign Objectives */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Campaign Objectives</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {objectives.map((objective) => (
                <label key={objective} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={campaignObjectives.includes(objective)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCampaignObjectives(prev => [...prev, objective]);
                      } else {
                        setCampaignObjectives(prev => prev.filter(obj => obj !== objective));
                      }
                    }}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className={`text-xs md:text-sm ${themeClasses.text}`}>{objective}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button className={`flex-1 py-2 md:py-3 px-4 md:px-6 ${themeClasses.accent} text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm md:text-base`}>
              Create Campaign
            </button>
            <button className={`px-4 md:px-6 py-2 md:py-3 ${themeClasses.border} border rounded-lg ${themeClasses.text} ${themeClasses.hover} transition-colors font-medium text-sm md:text-base`}>
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Campaign Templates</h3>
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
           <div className="text-center flex-1">
                            <div className="flex items-center justify-start mb-2">
                              <Brain className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
                              <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                           Campaign Simulations
                              </h2>
                            </div>
                            <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
                            Create, manage, and optimize your marketing campaigns with AI assistance
                            </p>
                          </div>

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