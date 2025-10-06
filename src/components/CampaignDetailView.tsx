import React, { useState } from "react";
import {
  Eye,
  MousePointer,
  DollarSign,
  Target,
  TrendingUp,
  Activity,
  Users,
  Globe,
  Video,
  FileText,
  Image as ImageIcon,
  Download,
  Plus,
  MoreHorizontal,
  AlertCircle,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingDown,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Creative {
  id: string;
  type: "image" | "video" | "text";
  name: string;
  thumbnail?: string;
  status: "approved" | "pending" | "rejected";
  performance?: {
    impressions: number;
    clicks: number;
    ctr: number;
  };
}

interface Campaign {
  id: string;
  name: string;
  status: "approved" | "running" | "paused" | "completed";
  objective: string;
  budget: number;
  spent?: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  audience: string;
  targetAge?: string;
  targetGender?: string;
  targetLocation?: string;
  kpis?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    ctr?: number;
    cpc?: number;
    roas?: number;
  };
  creatives: Creative[];
  approvedBy?: string;
  approvedDate?: string;
  category?: string;
  tags?: string[];
}

interface CampaignDetailViewProps {
  campaign: Campaign;
  themeClasses: any;
  activeTab: "overview" | "creatives" | "performance" | "timeline" | "schedule";
  onTabChange: (tab: "overview" | "creatives" | "performance" | "timeline" | "schedule") => void;
  getStatusColor: (status: string) => string;
}

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



export const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({
  campaign,
  themeClasses,
  activeTab,
  onTabChange,
  getStatusColor,
}) => {
  return (
    <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl overflow-hidden`}>
      <div className={`p-6 border-b ${themeClasses.border}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className={`text-2xl font-bold ${themeClasses.text}`}>{campaign.name}</h3>
            <p className={`${themeClasses.textSecondary} mt-1`}>{campaign.objective}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(
              campaign.status
            )} self-start md:self-auto`}
          >
            {campaign.status}
          </span>
        </div>

        <div className={`flex gap-2 border-b ${themeClasses.border} -mb-px`}>
          <button
            onClick={() => onTabChange("overview")}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : `border-transparent ${themeClasses.textSecondary} hover:text-blue-500`
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onTabChange("creatives")}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === "creatives"
                ? "border-blue-500 text-blue-600"
                : `border-transparent ${themeClasses.textSecondary} hover:text-blue-500`
            }`}
          >
            Creatives ({campaign.creatives.length})
          </button>
          <button
            onClick={() => onTabChange("performance")}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === "performance"
                ? "border-blue-500 text-blue-600"
                : `border-transparent ${themeClasses.textSecondary} hover:text-blue-500`
            }`}
          >
            Performance
          </button>
          {/* <button
            onClick={() => onTabChange("timeline")}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === "timeline"
                ? "border-blue-500 text-blue-600"
                : `border-transparent ${themeClasses.textSecondary} hover:text-blue-500`
            }`}
          >
            Timeline
          </button> */}
          <button
            onClick={() => onTabChange("schedule")}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === "schedule"
                ? "border-blue-500 text-blue-600"
                : `border-transparent ${themeClasses.textSecondary} hover:text-blue-500`
            }`}
          >
            Schedule & Optimize
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${themeClasses.hover} border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Total Budget</p>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  ${campaign.budget.toLocaleString()}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${themeClasses.hover} border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Spent</p>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  ${campaign.spent?.toLocaleString() || 0}
                </p>
                {campaign.budget && campaign.spent !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">
                    {((campaign.spent / campaign.budget) * 100).toFixed(1)}% used
                  </p>
                )}
              </div>
              <div className={`p-4 rounded-xl ${themeClasses.hover} border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Duration</p>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  {Math.ceil(
                    (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
              </div>
              <div className={`p-4 rounded-xl ${themeClasses.hover} border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Platforms</p>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>{campaign.platforms.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-5 rounded-xl border ${themeClasses.border}`}>
                <h4 className={`text-sm font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Target className="mr-2 text-blue-500" size={18} />
                  Campaign Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Campaign ID</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>{campaign.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Category</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {campaign.category || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Start Date</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>End Date</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Approved By</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {campaign.approvedBy || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Approved Date</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {campaign.approvedDate
                        ? new Date(campaign.approvedDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`p-5 rounded-xl border ${themeClasses.border}`}>
                <h4 className={`text-sm font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Users className="mr-2 text-green-500" size={18} />
                  Target Audience
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Age Range</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {campaign.targetAge || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Gender</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {campaign.targetGender || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Location</span>
                    <span className={`text-sm font-medium ${themeClasses.text}`}>
                      {campaign.targetLocation || "N/A"}
                    </span>
                  </div>
                  <div className="pt-2">
                    <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>Description</p>
                    <p className={`text-sm ${themeClasses.text}`}>{campaign.audience}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl border ${themeClasses.border}`}>
              <h4 className={`text-sm font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                <Globe className="mr-2 text-blue-500" size={18} />
                Selected Platforms
              </h4>
              <div className="flex flex-wrap gap-2">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {campaign.tags && campaign.tags.length > 0 && (
              <div className={`p-5 rounded-xl border ${themeClasses.border}`}>
                <h4 className={`text-sm font-semibold ${themeClasses.text} mb-3`}>Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "creatives" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${themeClasses.text}`}>
                Approved Creatives ({campaign.creatives.length})
              </h4>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center">
                <Plus size={16} className="mr-2" />
                Add Creative
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaign.creatives.map((creative) => (
                <div
                  key={creative.id}
                  className={`${themeClasses.border} border rounded-xl overflow-hidden ${themeClasses.hover} transition-all`}
                >
                  {creative.thumbnail ? (
                    <img src={creative.thumbnail} alt={creative.name} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      {creative.type === "video" ? (
                        <Video className="text-blue-500" size={48} />
                      ) : creative.type === "text" ? (
                        <FileText className="text-purple-500" size={48} />
                      ) : (
                        <ImageIcon className="text-green-500" size={48} />
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-semibold ${themeClasses.text} text-sm`}>{creative.name}</h5>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          creative.status
                        )}`}
                      >
                        {creative.status}
                      </span>
                    </div>
                    <p className={`text-xs ${themeClasses.textSecondary} capitalize mb-3`}>
                      {creative.type} Creative
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                          <Download size={14} />
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Impressions</p>
                  <Eye className="text-blue-500" size={16} />
                </div>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  {campaign.kpis?.impressions?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-green-600 mt-1">+12.5%</p>
              </div>

              <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Clicks</p>
                  <MousePointer className="text-green-500" size={16} />
                </div>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  {campaign.kpis?.clicks?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-green-600 mt-1">+8.3%</p>
              </div>

              <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Conversions</p>
                  <Target className="text-purple-500" size={16} />
                </div>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  {campaign.kpis?.conversions?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-green-600 mt-1">+15.2%</p>
              </div>

              <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>CTR</p>
                  <TrendingUp className="text-orange-500" size={16} />
                </div>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>{campaign.kpis?.ctr || 0}%</p>
                <p className="text-xs text-green-600 mt-1">+0.3%</p>
              </div>

              <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>CPC</p>
                  <DollarSign className="text-yellow-500" size={16} />
                </div>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  ${campaign.kpis?.cpc?.toFixed(2) || 0}
                </p>
                <p className="text-xs text-red-600 mt-1">+$0.05</p>
              </div>

              <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>ROAS</p>
                  <Activity className="text-teal-500" size={16} />
                </div>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>
                  {campaign.kpis?.roas?.toFixed(1) || 0}x
                </p>
                <p className="text-xs text-green-600 mt-1">+0.4x</p>
              </div>
            </div>

            {campaign.status === "approved" && (
              <div className={`p-5 rounded-xl border ${themeClasses.border} bg-blue-50`}>
                <div className="flex items-center">
                  <AlertCircle className="text-blue-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Campaign Not Started</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Performance metrics will be available once the campaign is launched.
                    </p>
                  </div>
                </div>
              </div>
            )}
             {campaign.status !== "approved" && (
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
             <div className="space-y-4">
                <h4 className={`text-lg font-semibold ${themeClasses.text} flex items-center mb-4`}>
                  <Sparkles className="mr-2 text-purple-500" size={20} />
                  AI Insights & Optimization
                </h4>
                <div className="grid gap-4 grid-cols-3">
                <div className="p-5 rounded-xl border-2 border-red-200 bg-red-50">
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-red-100 rounded-lg mr-3">
                      <Zap className="text-red-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-red-900 mb-1">Budget Reallocation</h5>
                      <p className="text-sm text-red-800">
                        Facebook ads showing 15% higher CTR. Consider reallocating budget by 20% from LinkedIn.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Apply Now
                  </button>
                </div>

                <div className="p-5 rounded-xl border-2 border-yellow-200 bg-yellow-50">
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                      <AlertCircle className="text-yellow-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-yellow-900 mb-1">Creative Fatigue</h5>
                      <p className="text-sm text-yellow-800">
                        Ad creative performance dropped 8% over last 2 days. Consider refreshing assets.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                    Review
                  </button>
                </div>

                <div className="p-5 rounded-xl border-2 border-green-200 bg-green-50">
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <TrendingUp className="text-green-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-green-900 mb-1">Peak Performance Window</h5>
                      <p className="text-sm text-green-800">
                        Best engagement detected 6-9 PM. Schedule adjusted automatically for optimal reach.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    View Details
                  </button>
                </div>

               
                </div>
                 <div className={`p-5 rounded-xl border ${themeClasses.border} bg-gradient-to-br from-purple-50 to-blue-50`}>
                  <h5 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <Sparkles className="mr-2 text-purple-600" size={18} />
                    Optimization Score
                  </h5>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.82)}`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-purple-900">82</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-700 mb-3">
                    Your campaign is well optimized. Apply AI suggestions to reach 95+
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Get AI Recommendations
                  </button>
                </div>
              </div>
          </div>
        )}

          

        {activeTab === "timeline" && (
          <div className="space-y-4">
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="mb-6 relative">
                <div className="absolute -left-[26px] w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                <div className={`p-4 rounded-xl border ${themeClasses.border} ml-2`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-semibold ${themeClasses.text}`}>Campaign Approved</h5>
                    <span className="text-xs text-gray-500">
                      {campaign.approvedDate
                        ? new Date(campaign.approvedDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Campaign approved by {campaign.approvedBy || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mb-6 relative">
                <div className="absolute -left-[26px] w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className={`p-4 rounded-xl border ${themeClasses.border} ml-2`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-semibold ${themeClasses.text}`}>Scheduled Start Date</h5>
                    <span className="text-xs text-gray-500">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Campaign is scheduled to go live</p>
                </div>
              </div>

              <div className="mb-6 relative">
                <div className="absolute -left-[26px] w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className={`p-4 rounded-xl border ${themeClasses.border} ml-2 opacity-60`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-semibold ${themeClasses.text}`}>Campaign End Date</h5>
                    <span className="text-xs text-gray-500">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Campaign completion scheduled</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className=" gap-6">
              <div className="space-y-4">
                <h4 className={`text-lg font-semibold ${themeClasses.text} flex items-center mb-4`}>
                  <Calendar className="mr-2 text-blue-500" size={20} />
                  Campaign Schedule
                </h4>

                <div className={`p-5 rounded-xl border ${themeClasses.border} bg-gradient-to-br from-blue-50 to-blue-100`}>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-blue-900">Campaign Duration</h5>
                    <Clock className="text-blue-600" size={18} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-blue-700 font-medium">Start Date</label>
                      <input
                        type="date"
                        value={campaign.startDate}
                        readOnly
                        className="w-full mt-1 p-2 bg-white border border-blue-200 rounded-lg text-sm text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-700 font-medium">End Date</label>
                      <input
                        type="date"
                        value={campaign.endDate}
                        readOnly
                        className="w-full mt-1 p-2 bg-white border border-blue-200 rounded-lg text-sm text-gray-800"
                      />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700">Total Duration</span>
                        <span className="font-bold text-blue-900">
                          {Math.ceil(
                            (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-5 rounded-xl border ${themeClasses.border}`}>
                  <h5 className={`font-semibold ${themeClasses.text} mb-3`}>Day Parting Schedule</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${themeClasses.text}`}>All Day</p>
                        <p className="text-xs text-gray-500">24/7 campaign running</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${themeClasses.text}`}>Peak Hours (6-9 PM)</p>
                        <p className="text-xs text-gray-500">Increase budget during peak</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${themeClasses.text}`}>Weekend Boost</p>
                        <p className="text-xs text-gray-500">Higher budget on weekends</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                  </div>
                </div>

                <div className={`p-5 rounded-xl border ${themeClasses.border}`}>
                  <h5 className={`font-semibold ${themeClasses.text} mb-3`}>Budget Pacing</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className={themeClasses.textSecondary}>Daily Budget</span>
                        <span className={`font-bold ${themeClasses.text}`}>
                          $
                          {(
                            campaign.budget /
                            Math.ceil(
                              (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          ).toFixed(0)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: campaign.spent
                              ? `${(campaign.spent / campaign.budget) * 100}%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {campaign.spent
                          ? `${((campaign.spent / campaign.budget) * 100).toFixed(1)}% spent`
                          : "Not started"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-600">Auto-adjust pacing</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
