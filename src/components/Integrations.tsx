import React, { useState } from 'react';
import { Settings, Plus, CheckCircle, AlertTriangle, Clock, Zap, Database, Globe, Smartphone, BarChart3, Mail, ShoppingCart, Users, CreditCard, MessageSquare, Search, Youtube, Facebook, Instagram, Twitter, Linkedin, RefreshCw, ExternalLink, Trash2, CreditCard as Edit3, Power, Key, Shield, Activity, TrendingUp, Eye, Filter, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Integration {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  lastSync?: string;
  dataPoints?: number;
  apiCalls?: number;
  isActive: boolean;
}

export const Integrations: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const categories = [
    { id: 'all', label: 'All Integrations', count: 24 },
    { id: 'advertising', label: 'Advertising', count: 8 },
    { id: 'analytics', label: 'Analytics', count: 5 },
    { id: 'ecommerce', label: 'E-commerce', count: 4 },
    { id: 'crm', label: 'CRM', count: 3 },
    { id: 'email', label: 'Email Marketing', count: 2 },
    { id: 'social', label: 'Social Media', count: 2 },
  ];

  const integrations: Integration[] = [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'analytics',
      status: 'connected',
      icon: BarChart3,
      color: 'orange',
      description: 'Web analytics and reporting platform',
      lastSync: '2 minutes ago',
      dataPoints: 1250000,
      apiCalls: 45000,
      isActive: true
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      category: 'advertising',
      status: 'connected',
      icon: Facebook,
      color: 'blue',
      description: 'Social media advertising platform',
      lastSync: '5 minutes ago',
      dataPoints: 890000,
      apiCalls: 32000,
      isActive: true
    },
    {
      id: 'google-ads',
      name: 'Google Ads',
      category: 'advertising',
      status: 'connected',
      icon: Search,
      color: 'green',
      description: 'Search and display advertising',
      lastSync: '1 minute ago',
      dataPoints: 2100000,
      apiCalls: 67000,
      isActive: true
    },
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'ecommerce',
      status: 'syncing',
      icon: ShoppingCart,
      color: 'green',
      description: 'E-commerce platform integration',
      lastSync: 'Syncing now...',
      dataPoints: 450000,
      apiCalls: 18000,
      isActive: true
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'crm',
      status: 'connected',
      icon: Users,
      color: 'orange',
      description: 'Customer relationship management',
      lastSync: '3 minutes ago',
      dataPoints: 125000,
      apiCalls: 8500,
      isActive: true
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      category: 'email',
      status: 'error',
      icon: Mail,
      color: 'yellow',
      description: 'Email marketing automation',
      lastSync: '2 hours ago',
      dataPoints: 75000,
      apiCalls: 3200,
      isActive: false
    },
    {
      id: 'instagram-ads',
      name: 'Instagram Ads',
      category: 'advertising',
      status: 'connected',
      icon: Instagram,
      color: 'blue',
      description: 'Visual social media advertising',
      lastSync: '4 minutes ago',
      dataPoints: 650000,
      apiCalls: 28000,
      isActive: true
    },
    {
      id: 'linkedin-ads',
      name: 'LinkedIn Ads',
      category: 'advertising',
      status: 'disconnected',
      icon: Linkedin,
      color: 'blue',
      description: 'Professional network advertising',
      lastSync: 'Never',
      dataPoints: 0,
      apiCalls: 0,
      isActive: false
    },
    {
      id: 'youtube-ads',
      name: 'YouTube Ads',
      category: 'advertising',
      status: 'connected',
      icon: Youtube,
      color: 'red',
      description: 'Video advertising platform',
      lastSync: '8 minutes ago',
      dataPoints: 340000,
      apiCalls: 15000,
      isActive: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'ecommerce',
      status: 'connected',
      icon: CreditCard,
      color: 'green',
      description: 'Payment processing platform',
      lastSync: '1 minute ago',
      dataPoints: 89000,
      apiCalls: 12000,
      isActive: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} className="text-green-600" />;
      case 'syncing': return <RefreshCw size={16} className="text-blue-600 animate-spin" />;
      case 'error': return <AlertTriangle size={16} className="text-red-600" />;
      case 'disconnected': return <Power size={16} className="text-gray-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const totalApiCalls = integrations.reduce((sum, i) => sum + (i.apiCalls || 0), 0);
  const totalDataPoints = integrations.reduce((sum, i) => sum + (i.dataPoints || 0), 0);
  const errorCount = integrations.filter(i => i.status === 'error').length;

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
            <div className="text-center flex-1">
                            <div className="flex items-center justify-start mb-2">
                              <Settings className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
                              <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                              Integrations & Data Sources
                              </h2>
                              {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
                            </div>
                            <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
                             Connect and manage your marketing data sources and third-party integrations
                            </p>
                          </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full text-green-700 bg-green-100">
                Active
              </span>
            </div>
            <h3 className={`text-lg md:text-xl font-bold ${themeClasses.text} mb-1`}>{connectedCount}</h3>
            <p className={`${themeClasses.textSecondary} text-xs`}>Connected Sources</p>
          </div>

          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="text-blue-600" size={24} />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full text-blue-700 bg-blue-100">
                24/7
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{(totalApiCalls / 1000).toFixed(0)}K</h3>
            <p className={`${themeClasses.textSecondary} text-sm`}>API Calls Today</p>
          </div>

          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Database className="text-green-600" size={24} />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full text-green-700 bg-green-100">
                Live
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{(totalDataPoints / 1000000).toFixed(1)}M</h3>
            <p className={`${themeClasses.textSecondary} text-sm`}>Data Points</p>
          </div>

          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full text-orange-700 bg-orange-100">
                99.9%
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
              {errorCount > 0 ? errorCount : '0'}
            </h3>
            <p className={`${themeClasses.textSecondary} text-sm`}>Issues Detected</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search integrations..."
                  className={`pl-10 pr-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                      activeCategory === category.id
                        ? `${themeClasses.accent} text-white`
                        : `${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            
            <button className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all`}>
              <Plus size={16} className="mr-2" />
              Add Integration
            </button>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            
            return (
              <div
                key={integration.id}
                className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 cursor-pointer transform hover:scale-105 ${themeClasses.shadow}`}
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${integration.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`text-${integration.color}-600`} size={24} />
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{integration.name}</h3>
                <p className={`${themeClasses.textSecondary} text-sm mb-4`}>{integration.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={`${themeClasses.textSecondary}`}>Last Sync:</span>
                    <span className={`font-medium ${themeClasses.text}`}>{integration.lastSync}</span>
                  </div>
                  
                  {integration.dataPoints && integration.dataPoints > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className={`${themeClasses.textSecondary}`}>Data Points:</span>
                      <span className={`font-medium ${themeClasses.text}`}>
                        {integration.dataPoints.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {integration.apiCalls && integration.apiCalls > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className={`${themeClasses.textSecondary}`}>API Calls:</span>
                      <span className={`font-medium ${themeClasses.text}`}>
                        {integration.apiCalls.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <button className={`flex-1 p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}>
                    <Settings size={16} className={`${themeClasses.textSecondary} mx-auto`} />
                  </button>
                  <button className={`flex-1 p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}>
                    <RefreshCw size={16} className={`${themeClasses.textSecondary} mx-auto`} />
                  </button>
                  <button className={`flex-1 p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}>
                    <ExternalLink size={16} className={`${themeClasses.textSecondary} mx-auto`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Integrations */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Available Integrations</h3>
            <button className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
              <Eye size={16} className="mr-2" />
              Browse All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'TikTok Ads', icon: MessageSquare, color: 'black' },
              { name: 'Pinterest Ads', icon: Eye, color: 'red' },
              { name: 'Snapchat Ads', icon: Zap, color: 'yellow' },
              { name: 'Twitter Ads', icon: Twitter, color: 'blue' },
              { name: 'Amazon Ads', icon: ShoppingCart, color: 'orange' },
              { name: 'Microsoft Ads', icon: Search, color: 'blue' },
            ].map((integration, index) => {
              const Icon = integration.icon;
              
              return (
                <div
                  key={index}
                  className={`p-4 ${themeClasses.border} border-2 border-dashed rounded-xl ${themeClasses.hover} transition-all cursor-pointer text-center`}
                >
                  <Icon className={`${themeClasses.textSecondary} mx-auto mb-2`} size={24} />
                  <p className={`text-sm font-medium ${themeClasses.text}`}>{integration.name}</p>
                  <button className={`mt-2 px-3 py-1 ${themeClasses.accent} text-white rounded-lg hover:opacity-90 transition-colors text-xs`}>
                    Connect
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div className={`${themeClasses.gradient} ${themeClasses.border} border rounded-2xl p-6`}>
          <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Data Flow Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
              <h4 className={`font-medium ${themeClasses.text} mb-2`}>Data Collection</h4>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>{connectedCount}</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Active sources collecting data</p>
            </div>
            <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
              <h4 className={`font-medium ${themeClasses.text} mb-2`}>Processing</h4>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>Real-time</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Data processing and enrichment</p>
            </div>
            <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
              <h4 className={`font-medium ${themeClasses.text} mb-2`}>Insights</h4>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>AI-Powered</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Automated insights generation</p>
            </div>
          </div>
        </div>
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