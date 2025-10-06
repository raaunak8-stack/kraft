import React, { useState } from 'react';
import { Shield, Users, Database, Settings, Activity, AlertTriangle, CheckCircle, Lock, Wrench, Brain, Zap, Network, Key, FileCheck, Clock, User, Calendar, DollarSign, Target, Eye, ThumbsUp, ThumbsDown, MessageSquare, Filter, Search, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const AdminControls: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);

  const pendingCampaigns = [
    {
      id: '1',
      name: 'Holiday Sale 2024 Campaign',
      type: 'Conversion',
      submittedBy: 'Sarah Johnson',
      submittedAt: '2024-12-20T10:30:00',
      budget: 25000,
      duration: '30 days',
      platforms: ['Facebook', 'Instagram', 'Google Ads'],
      status: 'pending',
      priority: 'high',
      description: 'Comprehensive holiday sales campaign targeting fashion-conscious consumers aged 25-45 with focus on gift purchases and seasonal promotions.',
      objectives: ['Increase sales by 40%', 'Drive website traffic', 'Build brand awareness'],
      targetAudience: 'Adults 25-45, fashion interested, holiday shoppers',
      estimatedReach: '2.5M',
      estimatedROAS: '4.2x'
    },
    {
      id: '2',
      name: 'Q1 Brand Awareness Push',
      type: 'Awareness',
      submittedBy: 'Mike Chen',
      submittedAt: '2024-12-19T14:15:00',
      budget: 15000,
      duration: '45 days',
      platforms: ['YouTube', 'LinkedIn', 'Twitter'],
      status: 'pending',
      priority: 'medium',
      description: 'Brand awareness campaign to establish market presence in new geographic regions with emphasis on thought leadership content.',
      objectives: ['Increase brand recognition', 'Generate qualified leads', 'Establish thought leadership'],
      targetAudience: 'Business professionals 30-55, decision makers',
      estimatedReach: '1.8M',
      estimatedROAS: '2.8x'
    },
    {
      id: '3',
      name: 'Product Launch - Smart Home Series',
      type: 'Conversion',
      submittedBy: 'Emily Rodriguez',
      submittedAt: '2024-12-18T09:45:00',
      budget: 35000,
      duration: '60 days',
      platforms: ['Google Ads', 'Facebook', 'Instagram', 'YouTube'],
      status: 'under_review',
      priority: 'high',
      description: 'Launch campaign for new smart home product line targeting tech-savvy homeowners with focus on innovation and convenience.',
      objectives: ['Drive pre-orders', 'Build product awareness', 'Generate leads'],
      targetAudience: 'Homeowners 28-50, tech enthusiasts, high income',
      estimatedReach: '3.2M',
      estimatedROAS: '5.1x'
    }
  ];

  const approvalHistory = [
    {
      id: '1',
      campaignName: 'Black Friday Mega Sale',
      approver: 'Admin User',
      action: 'approved',
      timestamp: '2024-12-15T16:20:00',
      comments: 'Excellent strategy and budget allocation. Approved for immediate launch.'
    },
    {
      id: '2',
      campaignName: 'Winter Collection Launch',
      approver: 'Marketing Director',
      action: 'rejected',
      timestamp: '2024-12-14T11:30:00',
      comments: 'Budget exceeds quarterly allocation. Please revise and resubmit with reduced spend.'
    },
    {
      id: '3',
      campaignName: 'Customer Retention Program',
      approver: 'Admin User',
      action: 'approved',
      timestamp: '2024-12-13T13:45:00',
      comments: 'Well-structured retention strategy. Approved with minor budget adjustments.'
    }
  ];

  const systemHealth = {
    database: 'healthy',
    apis: 'healthy',
    agents: 'warning',
    storage: 'healthy'
  };

  const recentActivities = [
    { id: 1, action: 'Agent permissions updated', user: 'Admin', timestamp: '2 hours ago', type: 'security' },
    { id: 2, action: 'New knowledge graph node created', user: 'System', timestamp: '4 hours ago', type: 'system' },
    { id: 3, action: 'Campaign approval workflow modified', user: 'Manager', timestamp: '6 hours ago', type: 'workflow' },
    { id: 4, action: 'Database backup completed', user: 'System', timestamp: '12 hours ago', type: 'system' },
  ];

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'error': return <AlertTriangle className="text-red-500" size={20} />;
      default: return <Activity className="text-gray-500" size={20} />;
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="text-red-500" size={16} />;
      case 'system': return <Database className="text-blue-500" size={16} />;
      case 'workflow': return <Settings className="text-green-500" size={16} />;
      default: return <Activity className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
         <div className="text-center flex-1">
                            <div className="flex items-center justify-start mb-2">
                              <Shield className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
                              <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                           Admin Controls
                              </h2>
                              {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
                            </div>
                            <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
                             System administration and security management
                            </p>
                          </div>

        {/* Admin Navigation */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'agents', label: 'Agents', icon: Users },
              { id: 'approvals', label: 'Campaign Approvals', icon: FileCheck },
              { id: 'tools', label: 'Tools', icon: Wrench },
              { id: 'guardrails', label: 'Guardrails', icon: Shield },
              { id: 'models', label: 'Models', icon: Brain },
              { id: 'workflows', label: 'Workflows', icon: Zap },
              { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center px-2 md:px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
                    activeSection === tab.id
                      ? `${themeClasses.accent} text-white`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={14} className="mr-1 md:mr-2" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.id === 'overview' ? 'Over' : tab.id === 'agents' ? 'Agnt' : tab.id === 'approvals' ? 'Appr' : tab.id === 'tools' ? 'Tool' : tab.id === 'guardrails' ? 'Guard' : tab.id === 'models' ? 'Model' : tab.id === 'workflows' ? 'Work' : tab.id === 'knowledge' ? 'Know' : tab.id === 'security' ? 'Sec' : 'Set'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Health Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {Object.entries(systemHealth).map(([component, status]) => (
                <div key={component} className={`border rounded-xl p-3 ${getHealthColor(status)} ${themeClasses.hover} transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getHealthIcon(status)}
                    </div>
                    <span className={`text-sm md:text-base font-bold capitalize ${themeClasses.text}`}>
                      {component}
                    </span>
                  </div>
                  <p className={`text-xs capitalize font-medium ${
                    status === 'healthy' ? 'text-green-700' :
                    status === 'warning' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {status}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-3 md:p-4`}>
              <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text} mb-3 md:mb-4`}>Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={`flex items-center justify-between p-2 md:p-3 ${themeClasses.cardBg} rounded-lg ${themeClasses.hover} transition-colors`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium ${themeClasses.text}`}>{activity.action}</h4>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>by {activity.user}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${themeClasses.textSecondary} hidden md:inline`}>{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Graph Status */}
            <div className={`${themeClasses.gradient} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Knowledge Graph Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
                  <h4 className={`font-medium ${themeClasses.text} mb-2`}>Total Nodes</h4>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>2,847</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>+127 this week</p>
                </div>
                <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
                  <h4 className={`font-medium ${themeClasses.text} mb-2`}>Connections</h4>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>8,932</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>+445 this week</p>
                </div>
                <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
                  <h4 className={`font-medium ${themeClasses.text} mb-2`}>Insights Generated</h4>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>156</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>+23 this week</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agents Management */}
        {activeSection === 'agents' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Agent Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add New Agent
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Active Agents</h4>
                  <p className="text-3xl font-bold text-blue-600">8</p>
                  <p className="text-sm text-blue-700">+2 this week</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Tasks Completed</h4>
                  <p className="text-3xl font-bold text-green-600">1,247</p>
                  <p className="text-sm text-green-700">Today</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Success Rate</h4>
                  <p className="text-3xl font-bold text-yellow-600">94.2%</p>
                  <p className="text-sm text-yellow-700">Average</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Agent Types & Permissions</h4>
              <div className="space-y-3">
                {['Content Creator', 'Performance Optimizer', 'Strategy Analyst', 'Quality Assurance'].map((agent) => (
                  <div key={agent} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{agent}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {agent === 'Content Creator' ? '2' : agent === 'Performance Optimizer' ? '2' : agent === 'Strategy Analyst' ? '2' : '2'} agents
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campaign Approvals */}
        {activeSection === 'approvals' && (
          <div className="space-y-6">
            {/* Approvals Overview */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Campaign Approval Dashboard</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Pending Approval</h4>
                  <p className="text-3xl font-bold text-yellow-600">{pendingCampaigns.filter(c => c.status === 'pending').length}</p>
                  <p className="text-sm text-yellow-700">Awaiting review</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Under Review</h4>
                  <p className="text-3xl font-bold text-blue-600">{pendingCampaigns.filter(c => c.status === 'under_review').length}</p>
                  <p className="text-sm text-blue-700">Being evaluated</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Approved Today</h4>
                  <p className="text-3xl font-bold text-green-600">5</p>
                  <p className="text-sm text-green-700">Ready to launch</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Rejected</h4>
                  <p className="text-3xl font-bold text-red-600">2</p>
                  <p className="text-sm text-red-700">Need revision</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={16} />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      className={`pl-9 pr-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div>
                  
                  <select className={`px-3 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}>
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                  
                  <select className={`px-3 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}>
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pending Campaigns */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-6`}>Campaigns Awaiting Approval</h4>
              
              <div className="space-y-4">
                {pendingCampaigns.map((campaign) => (
                  <div key={campaign.id} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-6 ${themeClasses.hover} transition-all`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h5 className={`text-lg font-semibold ${themeClasses.text}`}>{campaign.name}</h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.priority === 'high' ? 'bg-red-100 text-red-800' :
                            campaign.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {campaign.priority} priority
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {campaign.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>By {campaign.submittedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{new Date(campaign.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target size={14} />
                            <span>{campaign.type}</span>
                          </div>
                        </div>
                        
                        <p className={`${themeClasses.textSecondary} text-sm mb-4`}>{campaign.description}</p>
                      </div>
                    </div>
                    
                    {/* Campaign Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className={`p-3 ${themeClasses.cardBg} rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <DollarSign size={14} className="text-green-600" />
                          <span className="text-xs font-medium text-gray-600">Budget</span>
                        </div>
                        <p className={`font-semibold ${themeClasses.text}`}>${campaign.budget.toLocaleString()}</p>
                      </div>
                      
                      <div className={`p-3 ${themeClasses.cardBg} rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock size={14} className="text-blue-600" />
                          <span className="text-xs font-medium text-gray-600">Duration</span>
                        </div>
                        <p className={`font-semibold ${themeClasses.text}`}>{campaign.duration}</p>
                      </div>
                      
                      <div className={`p-3 ${themeClasses.cardBg} rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Eye size={14} className="text-purple-600" />
                          <span className="text-xs font-medium text-gray-600">Est. Reach</span>
                        </div>
                        <p className={`font-semibold ${themeClasses.text}`}>{campaign.estimatedReach}</p>
                      </div>
                      
                      <div className={`p-3 ${themeClasses.cardBg} rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp size={14} className="text-green-600" />
                          <span className="text-xs font-medium text-gray-600">Est. ROAS</span>
                        </div>
                        <p className={`font-semibold ${themeClasses.text}`}>{campaign.estimatedROAS}</p>
                      </div>
                    </div>
                    
                    {/* Platforms */}
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-600 mb-2 block">Platforms:</span>
                      <div className="flex flex-wrap gap-2">
                        {campaign.platforms.map((platform, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Objectives */}
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-600 mb-2 block">Objectives:</span>
                      <div className="space-y-1">
                        {campaign.objectives.map((objective, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Target Audience */}
                    <div className="mb-6">
                      <span className="text-xs font-medium text-gray-600 mb-2 block">Target Audience:</span>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{campaign.targetAudience}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setShowCampaignDetails(true);
                        }}
                        className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-lg ${themeClasses.text} ${themeClasses.hover} transition-colors text-sm`}
                      >
                        <Eye size={16} className="mr-2" />
                        View Details
                      </button>

                      <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                          <ThumbsDown size={16} className="mr-2" />
                          Reject
                        </button>
                        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                          <ThumbsUp size={16} className="mr-2" />
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval History */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-6`}>Recent Approval History</h4>
              
              <div className="space-y-4">
                {approvalHistory.map((item) => (
                  <div key={item.id} className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        item.action === 'approved' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {item.action === 'approved' ? (
                          <ThumbsUp className="text-green-600" size={20} />
                        ) : (
                          <ThumbsDown className="text-red-600" size={20} />
                        )}
                      </div>
                      <div>
                        <h5 className={`font-medium ${themeClasses.text}`}>{item.campaignName}</h5>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>
                          {item.action === 'approved' ? 'Approved' : 'Rejected'} by {item.approver} • {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                        {item.comments && (
                          <p className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded italic">
                            "{item.comments}"
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.action === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Settings */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-6`}>Approval Workflow Settings</h4>
              
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h5 className={`font-medium ${themeClasses.text}`}>Auto-approve campaigns under $5,000</h5>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Automatically approve low-budget campaigns</p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm">
                    Enabled
                  </button>
                </div>
                
                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h5 className={`font-medium ${themeClasses.text}`}>Require dual approval for high-budget campaigns</h5>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Campaigns over $25,000 need two approvals</p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm">
                    Enabled
                  </button>
                </div>
                
                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h5 className={`font-medium ${themeClasses.text}`}>Email notifications for pending approvals</h5>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Send daily digest of campaigns awaiting approval</p>
                  </div>
                  <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors text-sm`}>
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Management */}
        {activeSection === 'tools' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Tools Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add New Tool
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Active Tools</h4>
                  <p className="text-3xl font-bold text-green-600">12</p>
                  <p className="text-sm text-green-700">All systems</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Usage Today</h4>
                  <p className="text-3xl font-bold text-green-600">2,847</p>
                  <p className="text-sm text-green-700">API calls</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Success Rate</h4>
                  <p className="text-3xl font-bold text-orange-600">98.7%</p>
                  <p className="text-sm text-orange-700">Last 24h</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Available Tools</h4>
              <div className="space-y-3">
                {['Image Generator', 'Text Analyzer', 'Performance Tracker', 'Data Processor'].map((tool) => (
                  <div key={tool} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{tool}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guardrails Management */}
        {activeSection === 'guardrails' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Guardrails Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add Guardrail
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Active Rules</h4>
                  <p className="text-3xl font-bold text-red-600">15</p>
                  <p className="text-sm text-red-700">Safety checks</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Violations Today</h4>
                  <p className="text-3xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-yellow-700">Blocked actions</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Compliance Rate</h4>
                  <p className="text-3xl font-bold text-green-600">99.2%</p>
                  <p className="text-sm text-green-700">This month</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Safety Rules</h4>
              <div className="space-y-3">
                {['Content Moderation', 'Budget Limits', 'Brand Safety', 'Data Privacy'].map((rule) => (
                  <div key={rule} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{rule}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Enabled
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Models Management */}
        {activeSection === 'models' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Models Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Deploy Model
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Active Models</h4>
                  <p className="text-3xl font-bold text-blue-600">6</p>
                  <p className="text-sm text-blue-700">In production</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Avg Accuracy</h4>
                  <p className="text-3xl font-bold text-green-600">94.7%</p>
                  <p className="text-sm text-green-700">All models</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Inference Time</h4>
                  <p className="text-3xl font-bold text-green-600">45ms</p>
                  <p className="text-sm text-green-700">Average</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Model Registry</h4>
              <div className="space-y-3">
                {['GPT-4 Turbo', 'Claude-3 Sonnet', 'Gemini Pro', 'Custom Model v2.1'].map((model) => (
                  <div key={model} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{model}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Healthy
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Monitor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workflows Management */}
        {activeSection === 'workflows' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Workflows Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Create Workflow
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Active Workflows</h4>
                  <p className="text-3xl font-bold text-indigo-600">8</p>
                  <p className="text-sm text-indigo-700">Running</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Executions Today</h4>
                  <p className="text-3xl font-bold text-green-600">156</p>
                  <p className="text-sm text-green-700">Completed</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Success Rate</h4>
                  <p className="text-3xl font-bold text-orange-600">97.3%</p>
                  <p className="text-sm text-orange-700">This week</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Workflow Templates</h4>
              <div className="space-y-3">
                {['Campaign Creation', 'Content Approval', 'Performance Review', 'Budget Optimization'].map((workflow) => (
                  <div key={workflow} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{workflow}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Template
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Use
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Graph Management */}
        {activeSection === 'knowledge' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Knowledge Graph Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add Knowledge
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-cyan-900 mb-2">Knowledge Nodes</h4>
                  <p className="text-3xl font-bold text-cyan-600">15,847</p>
                  <p className="text-sm text-cyan-700">Total entries</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Connections</h4>
                  <p className="text-3xl font-bold text-blue-600">8,932</p>
                  <p className="text-sm text-blue-700">Relationships</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Query Success</h4>
                  <p className="text-3xl font-bold text-green-600">96.8%</p>
                  <p className="text-sm text-green-700">Accuracy</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Knowledge Categories</h4>
              <div className="space-y-3">
                {['Campaign Strategies', 'Creative Assets', 'Performance Data', 'Market Insights'].map((category) => (
                  <div key={category} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{category}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {category === 'Campaign Strategies' ? '2,847' : 
                         category === 'Creative Assets' ? '4,123' :
                         category === 'Performance Data' ? '6,234' : '2,643'} nodes
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Explore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Security Configuration</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Lock className="text-green-600" size={24} />
                    <div>
                      <h4 className="font-medium text-green-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-green-700">Enabled for all admin accounts</p>
                    </div>
                  </div>
                  <div className="text-green-600">
                    <CheckCircle size={24} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="text-blue-600" size={24} />
                    <div>
                      <h4 className="font-medium text-blue-900">API Security</h4>
                      <p className="text-sm text-blue-700">Rate limiting and authentication active</p>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <CheckCircle size={24} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Database className="text-yellow-600" size={24} />
                    <div>
                      <h4 className="font-medium text-yellow-900">Data Encryption</h4>
                      <p className="text-sm text-yellow-700">AES-256 encryption for sensitive data</p>
                    </div>
                  </div>
                  <div className="text-yellow-600">
                    <AlertTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Security Monitoring</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <h5 className="font-medium text-red-900 mb-2">Failed Login Attempts</h5>
                  <p className="text-2xl font-bold text-red-600">12</p>
                  <p className="text-sm text-red-700">Last 24 hours</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h5 className="font-medium text-blue-900 mb-2">Active Sessions</h5>
                  <p className="text-2xl font-bold text-blue-600">18</p>
                  <p className="text-sm text-blue-700">Currently online</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>System Settings</h3>
              
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Auto-scaling</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Automatically scale resources based on demand</p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    Enabled
                  </button>
                </div>

                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Backup Schedule</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Daily backups at 2:00 AM UTC</p>
                  </div>
                  <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                    Configure
                  </button>
                </div>

                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Maintenance Mode</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Temporarily disable public access</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors">
                    Disabled
                  </button>
                </div>
              </div>
            </div>

            {/* API Keys Section */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>API Keys Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Generate Key
                </button>
              </div>
              
              <div className="space-y-4">
                {['OpenAI API Key', 'Claude API Key', 'Google Analytics Key', 'Facebook Ads Key'].map((keyName) => (
                  <div key={keyName} className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                    <div className="flex items-center space-x-3">
                      <Key className="text-blue-600" size={20} />
                      <div>
                        <h4 className={`font-medium ${themeClasses.text}`}>{keyName}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>sk-...{Math.random().toString(36).substr(2, 8)}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                      <button className={`px-3 py-1 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-xs`}>
                        Rotate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Resource Usage</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h5 className="font-medium text-blue-900 mb-2">CPU Usage</h5>
                  <p className="text-2xl font-bold text-blue-600">45%</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <h5 className="font-medium text-green-900 mb-2">Memory Usage</h5>
                  <p className="text-2xl font-bold text-green-600">62%</p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <h5 className="font-medium text-green-900 mb-2">Storage Usage</h5>
                  <p className="text-2xl font-bold text-green-600">38%</p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCampaignDetails && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border ${themeClasses.border}`}>
            <div className={`sticky top-0 ${themeClasses.cardBg} border-b ${themeClasses.border} p-6 flex items-center justify-between z-10`}>
              <div className="flex items-center">
                <FileCheck className="text-blue-500 mr-3" size={24} />
                <div>
                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>{selectedCampaign.name}</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Campaign Approval Review</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCampaignDetails(false);
                  setSelectedCampaign(null);
                }}
                className={`p-2 rounded-lg ${themeClasses.hover} transition-all`}
              >
                <svg className={themeClasses.text} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                    <Target className="mr-2 text-blue-500" size={18} />
                    Campaign Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Type</span>
                      <span className={`text-sm font-medium ${themeClasses.text}`}>{selectedCampaign.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCampaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedCampaign.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Priority</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCampaign.priority === 'high' ? 'bg-red-100 text-red-800' :
                        selectedCampaign.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedCampaign.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Submitted By</span>
                      <span className={`text-sm font-medium ${themeClasses.text}`}>{selectedCampaign.submittedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Submitted Date</span>
                      <span className={`text-sm font-medium ${themeClasses.text}`}>
                        {new Date(selectedCampaign.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Budget</span>
                      <span className={`text-sm font-medium text-green-600`}>
                        ${selectedCampaign.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Duration</span>
                      <span className={`text-sm font-medium ${themeClasses.text}`}>{selectedCampaign.duration}</span>
                    </div>
                  </div>
                </div>

                <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                    <TrendingUp className="mr-2 text-green-500" size={18} />
                    Estimated Performance
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-700">Estimated Reach</span>
                        <Eye className="text-blue-600" size={16} />
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{selectedCampaign.estimatedReach}</p>
                      <p className="text-xs text-blue-600 mt-1">Expected impressions</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-green-700">Estimated ROAS</span>
                        <TrendingUp className="text-green-600" size={16} />
                      </div>
                      <p className="text-2xl font-bold text-green-900">{selectedCampaign.estimatedROAS}</p>
                      <p className="text-xs text-green-600 mt-1">Return on ad spend</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <MessageSquare className="mr-2 text-blue-500" size={18} />
                  Campaign Description
                </h4>
                <p className={`${themeClasses.text} leading-relaxed`}>{selectedCampaign.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                    <CheckCircle className="mr-2 text-green-500" size={18} />
                    Campaign Objectives
                  </h4>
                  <div className="space-y-2">
                    {selectedCampaign.objectives.map((objective: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className={`text-sm ${themeClasses.text}`}>{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                    <Users className="mr-2 text-green-500" size={18} />
                    Target Audience
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className={`text-sm ${themeClasses.text}`}>{selectedCampaign.targetAudience}</p>
                  </div>
                </div>
              </div>

              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Activity className="mr-2 text-blue-500" size={18} />
                  Platforms & Channels
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedCampaign.platforms.map((platform: string, index: number) => (
                    <div key={index} className="flex items-center px-4 py-2 bg-blue-100 rounded-lg">
                      <span className="text-sm font-medium text-blue-800">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <MessageSquare className="mr-2 text-green-500" size={18} />
                  Approval Comments
                </h4>
                <textarea
                  placeholder="Add your approval or rejection comments here..."
                  className={`w-full p-4 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]`}
                ></textarea>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCampaignDetails(false);
                    setSelectedCampaign(null);
                  }}
                  className={`px-6 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} hover:bg-gray-100 transition-all`}
                >
                  Close
                </button>
                <div className="flex space-x-3">
                  <button className="flex items-center px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all">
                    <ThumbsDown size={16} className="mr-2" />
                    Reject Campaign
                  </button>
                  <button className="flex items-center px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">
                    <ThumbsUp size={16} className="mr-2" />
                    Approve Campaign
                  </button>
                </div>
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