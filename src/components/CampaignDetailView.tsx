import React from "react";
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
} from "lucide-react";

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
  activeTab: "overview" | "creatives" | "performance" | "timeline";
  onTabChange: (tab: "overview" | "creatives" | "performance" | "timeline") => void;
  getStatusColor: (status: string) => string;
}

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
          <button
            onClick={() => onTabChange("timeline")}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === "timeline"
                ? "border-blue-500 text-blue-600"
                : `border-transparent ${themeClasses.textSecondary} hover:text-blue-500`
            }`}
          >
            Timeline
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
      </div>
    </div>
  );
};
