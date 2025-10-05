import { useState } from 'react';

import {
  Sparkles,
  Download,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Eye,
  Play,
  Pause,
  Edit,
  Image,
  BarChart3,
  Lightbulb,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Radio,
  Settings,
  Send,
  FileCheck
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { useTheme } from '../contexts/ThemeContext';

export default function Marketing() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, performance, calendar, execution

  // Handler functions
  const handleExportReport = () => {
    toast.success('Exporting campaign report...');
  };

  const handleApplySuggestion = (title: string) => {
    toast.success(`Applied: ${title}`);
  };

  const handleLearnMore = (title: string) => {
    toast.info(`Learn more about: ${title}`);
  };

  const handleLaunchCampaign = (campaignName: string) => {
    toast.success(`Launching campaign: ${campaignName}`);
  };

  const handlePauseCampaign = (campaignName: string) => {
    toast.warning(`Pausing campaign: ${campaignName}`);
  };

  const handleResumeCampaign = (campaignName: string) => {
    toast.success(`Resuming campaign: ${campaignName}`);
  };

  const handleAddSchedule = () => {
    toast.info('Add schedule dialog would open here');
  };

  const handleSaveDraft = () => {
    toast.success('Campaign saved as draft');
  };

  const handleManageAds = (platform: string) => {
    toast.info(`Managing ads for ${platform}`);
  };

  // Mock campaign data
  const campaigns = [
    {
      id: 'CAMP-001',
      name: 'Nexa Premium Launch Q1',
      status: 'Active',
      description: 'Launch campaign for Nexa Premium with focus on tech-savvy millennials',
      product: 'Nexa',
      channel: 'Multi-channel',
      budget: '₹15L',
      spent: '₹8.2L',
      startDate: '2025-01-15',
      endDate: '2025-03-31',
      segment: 'Tech Millennials',
      segmentSize: '250K',
      objective: 'Brand Awareness & Lead Generation',
      platforms: ['Instagram', 'Facebook', 'LinkedIn'],
      creatives: [
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0', name: 'Hero Banner' },
        { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', name: 'Product Focus' },
        { id: 3, type: 'video', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692', name: 'Story Ad' },
        { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf', name: 'Testimonial' }
      ],
      metrics: {
        impressions: '2.4M',
        clicks: '48K',
        conversions: '3,240',
        ctr: '2.0%',
        roas: '4.2x'
      }
    },
    {
      id: 'CAMP-002',
      name: 'Standard Model Festive Offer',
      status: 'Scheduled',
      description: 'Festive season campaign targeting family-oriented buyers',
      product: 'Standard',
      channel: 'Facebook',
      budget: '₹8L',
      spent: '₹0',
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      segment: 'Family Buyers',
      segmentSize: '180K',
      objective: 'Sales Conversion',
      platforms: ['Facebook', 'Instagram'],
      creatives: [
        { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c', name: 'Family Campaign' },
        { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72', name: 'Offer Banner' }
      ],
      metrics: {
        impressions: '-',
        clicks: '-',
        conversions: '-',
        ctr: '-',
        roas: '-'
      }
    },
    {
      id: 'CAMP-003',
      name: 'LinkedIn B2B Premium Drive',
      status: 'Paused',
      description: 'Corporate sales campaign for premium segment',
      product: 'Premium',
      channel: 'LinkedIn',
      budget: '₹12L',
      spent: '₹4.5L',
      startDate: '2024-12-01',
      endDate: '2025-01-31',
      segment: 'Corporate Executives',
      segmentSize: '85K',
      objective: 'Lead Generation',
      platforms: ['LinkedIn'],
      creatives: [
        { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', name: 'Executive Appeal' },
        { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf', name: 'Premium Lifestyle' }
      ],
      metrics: {
        impressions: '890K',
        clicks: '22K',
        conversions: '1,850',
        ctr: '2.5%',
        roas: '3.8x'
      }
    }
  ];

  // AI Suggestions
  const aiSuggestions = [
    {
      type: 'optimization',
      priority: 'high',
      title: 'Increase Instagram Budget',
      description: 'Instagram shows 35% better CTR. Recommend shifting 20% budget from Facebook.',
      impact: '+15% expected conversions'
    },
    {
      type: 'creative',
      priority: 'medium',
      title: 'Refresh Creative #2',
      description: 'Creative fatigue detected. CTR dropped 40% in last 7 days.',
      impact: 'Restore CTR to baseline'
    },
    {
      type: 'timing',
      priority: 'medium',
      title: 'Optimal Posting Time',
      description: 'Peak engagement at 7-9 PM. Current schedule is 2-4 PM.',
      impact: '+25% engagement rate'
    },
    {
      type: 'audience',
      priority: 'low',
      title: 'Expand Lookalike Audience',
      description: 'High-performing segment identified. Expand to similar profiles.',
      impact: '+10K qualified leads'
    }
  ];

  // Performance chart data
  const performanceData = [
    { date: 'Jan 15', impressions: 180000, clicks: 3600, conversions: 240 },
    { date: 'Jan 22', impressions: 220000, clicks: 4400, conversions: 290 },
    { date: 'Jan 29', impressions: 280000, clicks: 5600, conversions: 380 },
    { date: 'Feb 5', impressions: 320000, clicks: 6400, conversions: 420 },
    { date: 'Feb 12', impressions: 380000, clicks: 7600, conversions: 510 },
    { date: 'Feb 19', impressions: 420000, clicks: 8400, conversions: 580 },
    { date: 'Feb 26', impressions: 480000, clicks: 9600, conversions: 650 },
    { date: 'Mar 5', impressions: 540000, clicks: 10800, conversions: 720 }
  ];

  const channelPerformance = [
    { name: 'Instagram', value: 45, color: '#E1306C' },
    { name: 'Facebook', value: 30, color: '#1877F2' },
    { name: 'LinkedIn', value: 25, color: '#0A66C2' }
  ];

  const conversionFunnel = [
    { stage: 'Impressions', count: 2400000, percentage: 100 },
    { stage: 'Clicks', count: 48000, percentage: 2.0 },
    { stage: 'Leads', count: 9600, percentage: 0.4 },
    { stage: 'Conversions', count: 3240, percentage: 0.135 }
  ];

  // Campaign calendar events
  const calendarEvents = [
    { date: '2025-02-01', platform: 'Instagram', type: 'Story Ad', creative: 'Hero Banner', time: '19:00' },
    { date: '2025-02-01', platform: 'Facebook', type: 'Feed Post', creative: 'Product Focus', time: '20:00' },
    { date: '2025-02-03', platform: 'LinkedIn', type: 'Sponsored Post', creative: 'Testimonial', time: '09:00' },
    { date: '2025-02-05', platform: 'Instagram', type: 'Reel', creative: 'Story Ad', time: '18:30' },
    { date: '2025-02-07', platform: 'Facebook', type: 'Video Ad', creative: 'Story Ad', time: '19:00' },
    { date: '2025-02-10', platform: 'Instagram', type: 'Story Ad', creative: 'Hero Banner', time: '20:00' }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    if (selectedStatus !== 'all' && campaign.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    if (selectedChannel !== 'all' && campaign.channel !== selectedChannel) return false;
    if (selectedProduct !== 'all' && campaign.product !== selectedProduct) return false;
    return true;
  });

  const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign);
    const { getThemeClasses } = useTheme();
    const themeClasses = getThemeClasses();

  return (
     <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg}`}>
          <div className="space-y-6 md:space-y-8 p-6 md:p-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Target className={`${themeClasses.text}`} size={32} />
                <h2
                  className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent`}
                >
                  Marketing Studio
                </h2>
              </div>
              <p className={`${themeClasses.textSecondary}`}>
                Execute, monitor, and optimize your approved campaigns
              </p>
            </div>


      <div className=" mx-auto  space-y-8">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-purple-600" />
              Filter Campaigns
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Channel
              </label>
              <select 
                value={selectedChannel} 
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Channels</option>
                <option value="Multi-channel">Multi-channel</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product
              </label>
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Products</option>
                <option value="Nexa">Nexa</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Approved Campaigns</h3>
          
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer"
                onClick={() => setSelectedCampaign(campaign.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-blue-600">{campaign.id}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {campaign.name}
                      </h4>
                      <p className="text-sm text-slate-600">{campaign.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={
                        campaign.status === 'Active'
                          ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200'
                          : campaign.status === 'Paused'
                          ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200'
                          : campaign.status === 'Scheduled'
                          ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200'
                          : 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200'
                      }
                    >
                      {campaign.status === 'Active' && <Play className="h-3 w-3 mr-1" />}
                      {campaign.status === 'Paused' && <Pause className="h-3 w-3 mr-1" />}
                      {campaign.status === 'Scheduled' && <Clock className="h-3 w-3 mr-1" />}
                      {campaign.status}
                    </span>
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Product</p>
                    <p className="text-sm text-slate-800 font-medium">{campaign.product}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Channel</p>
                    <p className="text-sm text-slate-800 font-medium">{campaign.channel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Budget</p>
                    <p className="text-sm text-slate-800 font-medium">{campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Spent</p>
                    <p className="text-sm text-slate-800 font-medium">{campaign.spent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Duration</p>
                    <p className="text-sm text-slate-800 font-medium">
                      {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                      {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500">Platforms:</span>
                    {campaign.platforms.map((platform) => (
                      <span key={platform} className="inline-flex items-center px-2 py-1 bg-white rounded text-xs text-slate-700 border border-slate-200">
                        {platform === 'Instagram' && <Instagram className="h-3 w-3 mr-1 text-pink-500" />}
                        {platform === 'Facebook' && <Facebook className="h-3 w-3 mr-1 text-blue-600" />}
                        {platform === 'LinkedIn' && <Linkedin className="h-3 w-3 mr-1 text-blue-700" />}
                        {platform}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Details Modal/Section */}
        {selectedCampaignData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Campaign Details: {selectedCampaignData.name}
              </h3>
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-2 mb-6 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'performance'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'calendar'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('execution')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'execution'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                Execution
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Campaign Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-slate-700">Objective</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{selectedCampaignData.objective}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-slate-700">Segment</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{selectedCampaignData.segment}</p>
                    <p className="text-sm text-slate-600">{selectedCampaignData.segmentSize} users</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-sm font-medium text-slate-700">Budget Status</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{selectedCampaignData.spent} / {selectedCampaignData.budget}</p>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                        style={{ width: selectedCampaignData.spent === '₹0' ? '0%' : '55%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Creatives Gallery */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <Image className="h-5 w-5 mr-2 text-purple-600" />
                    Creatives Created ({selectedCampaignData.creatives.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCampaignData.creatives.map((creative) => (
                      <div 
                        key={creative.id}
                        className="group relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-blue-400 transition-all cursor-pointer"
                      >
                        <img 
                          src={creative.url} 
                          alt={creative.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-3 w-full">
                            <p className="text-white text-sm font-medium">{creative.name}</p>
                            <p className="text-white/80 text-xs">{creative.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Impressions</p>
                      <p className="text-xl font-bold text-slate-800">{selectedCampaignData.metrics.impressions}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Clicks</p>
                      <p className="text-xl font-bold text-slate-800">{selectedCampaignData.metrics.clicks}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Conversions</p>
                      <p className="text-xl font-bold text-slate-800">{selectedCampaignData.metrics.conversions}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">CTR</p>
                      <p className="text-xl font-bold text-slate-800">{selectedCampaignData.metrics.ctr}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">ROAS</p>
                      <p className="text-xl font-bold text-green-600">{selectedCampaignData.metrics.roas}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Performance Over Time */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Campaign Performance Trends</h4>
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }} 
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Area type="monotone" dataKey="impressions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorImpressions)" />
                        <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorClicks)" />
                        <Area type="monotone" dataKey="conversions" stroke="#10b981" fillOpacity={1} fill="url(#colorConversions)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Channel Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Channel Performance Distribution</h4>
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={channelPerformance}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {channelPerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Conversion Funnel</h4>
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={conversionFunnel} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
                          <YAxis dataKey="stage" type="category" stroke="#64748b" style={{ fontSize: '12px' }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }} 
                          />
                          <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Platform Breakdown */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Platform-Specific Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Instagram className="h-5 w-5 text-pink-600 mr-2" />
                          <span className="font-semibold text-slate-800">Instagram</span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Best CTR</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Impressions:</span>
                          <span className="font-semibold text-slate-800">1.08M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Clicks:</span>
                          <span className="font-semibold text-slate-800">27.2K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">CTR:</span>
                          <span className="font-semibold text-green-600">2.52%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-slate-800">Facebook</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Balanced</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Impressions:</span>
                          <span className="font-semibold text-slate-800">720K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Clicks:</span>
                          <span className="font-semibold text-slate-800">14.4K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">CTR:</span>
                          <span className="font-semibold text-blue-600">2.0%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Linkedin className="h-5 w-5 text-blue-700 mr-2" />
                          <span className="font-semibold text-slate-800">LinkedIn</span>
                        </div>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Premium</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Impressions:</span>
                          <span className="font-semibold text-slate-800">600K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Clicks:</span>
                          <span className="font-semibold text-slate-800">15K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">CTR:</span>
                          <span className="font-semibold text-purple-600">2.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                    Campaign Schedule
                  </h4>
                  <button 
                    onClick={handleAddSchedule}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-md hover:shadow-lg transition-shadow"
                  >
                    Add Schedule
                  </button>
                </div>

                <div className="space-y-3">
                  {calendarEvents.map((event, index) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white rounded-lg p-3 border border-slate-200">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <p className="text-xs text-slate-600 mt-1">
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {event.platform === 'Instagram' && <Instagram className="h-4 w-4 text-pink-500" />}
                              {event.platform === 'Facebook' && <Facebook className="h-4 w-4 text-blue-600" />}
                              {event.platform === 'LinkedIn' && <Linkedin className="h-4 w-4 text-blue-700" />}
                              <span className="font-semibold text-slate-800">{event.platform}</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-sm text-slate-600">{event.type}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <Image className="h-3 w-3" />
                              <span>{event.creative}</span>
                              <span className="text-slate-400">•</span>
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <Edit className="h-4 w-4 text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* A/B Testing Section */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-orange-600" />
                    A/B Testing Configurations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-slate-800">Test A: Hero Banner</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">Testing headline variations</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Variant A CTR:</span>
                        <span className="font-semibold text-green-600">2.8%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Variant B CTR:</span>
                        <span className="font-semibold text-slate-800">2.3%</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-slate-800">Test B: CTA Button</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Scheduled</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">Testing button color & text</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Start Date:</span>
                        <span className="font-semibold text-slate-800">Feb 15, 2025</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Duration:</span>
                        <span className="font-semibold text-slate-800">7 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Execution Tab */}
            {activeTab === 'execution' && (
              <div className="space-y-6">
                {/* Campaign Status */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-1">Campaign Execution Status</h4>
                      <p className="text-sm text-slate-600">Current status and controls for campaign deployment</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedCampaignData.status === 'Active' ? (
                        <button 
                          onClick={() => handlePauseCampaign(selectedCampaignData.name)}
                          className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause Campaign
                        </button>
                      ) : selectedCampaignData.status === 'Paused' ? (
                        <button 
                          onClick={() => handleResumeCampaign(selectedCampaignData.name)}
                          className="inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume Campaign
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleLaunchCampaign(selectedCampaignData.name)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-md hover:shadow-lg transition-shadow"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Launch Campaign
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pre-Launch Checklist */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <FileCheck className="h-5 w-5 mr-2 text-green-600" />
                    Pre-Launch Checklist
                  </h4>
                  <div className="space-y-3">
                    {[
                      { task: 'Campaign objectives defined', status: 'complete' },
                      { task: 'Target audience configured', status: 'complete' },
                      { task: 'Budget allocated across platforms', status: 'complete' },
                      { task: 'Creatives approved and uploaded', status: 'complete' },
                      { task: 'Ad copy reviewed', status: 'complete' },
                      { task: 'Tracking pixels installed', status: 'pending' },
                      { task: 'Conversion goals set', status: 'complete' },
                      { task: 'Stakeholder approval received', status: 'pending' }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border border-slate-200"
                      >
                        <span className="text-sm text-slate-700">{item.task}</span>
                        {item.status === 'complete' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Creative Assignment */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <Image className="h-5 w-5 mr-2 text-purple-600" />
                    Creative Assignment to Platforms
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedCampaignData.platforms.map((platform) => (
                      <div key={platform} className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center mb-3">
                          {platform === 'Instagram' && <Instagram className="h-5 w-5 text-pink-500 mr-2" />}
                          {platform === 'Facebook' && <Facebook className="h-5 w-5 text-blue-600 mr-2" />}
                          {platform === 'LinkedIn' && <Linkedin className="h-5 w-5 text-blue-700 mr-2" />}
                          <span className="font-semibold text-slate-800">{platform}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Creatives:</span>
                            <span className="font-medium text-slate-800">2 assigned</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Budget:</span>
                            <span className="font-medium text-slate-800">₹5L</span>
                          </div>
                          <button 
                            onClick={() => handleManageAds(platform)}
                            className="w-full mt-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
                          >
                            Manage Ads
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch Actions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Ready to Launch?</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    All systems are configured and ready. Review the checklist above and click Launch when you're ready to go live.
                  </p>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleLaunchCampaign(selectedCampaignData.name)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-md hover:shadow-lg transition-shadow"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Launch Campaign Now
                    </button>
                    <button 
                      onClick={handleSaveDraft}
                      className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors"
                    >
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Performance Agent */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-6 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl mr-3">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">AI Performance Agent</h3>
              <p className="text-sm text-slate-600">Intelligent recommendations to optimize your campaigns</p>
            </div>
          </div>

          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      suggestion.type === 'optimization' ? 'bg-blue-100' :
                      suggestion.type === 'creative' ? 'bg-purple-100' :
                      suggestion.type === 'timing' ? 'bg-green-100' :
                      'bg-orange-100'
                    }`}>
                      {suggestion.type === 'optimization' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      {suggestion.type === 'creative' && <Image className="h-4 w-4 text-purple-600" />}
                      {suggestion.type === 'timing' && <Clock className="h-4 w-4 text-green-600" />}
                      {suggestion.type === 'audience' && <Users className="h-4 w-4 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-slate-800 mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{suggestion.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {suggestion.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {suggestion.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleApplySuggestion(suggestion.title)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-md hover:shadow-lg transition-shadow"
                  >
                    Apply Suggestion
                  </button>
                  <button 
                    onClick={() => handleLearnMore(suggestion.title)}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
