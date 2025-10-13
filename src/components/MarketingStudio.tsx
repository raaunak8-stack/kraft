import React, { useState } from "react";
import { CheckCircle, Calendar, Play, Pause, TrendingUp, Eye, MousePointer, DollarSign, Target, Sparkles, Image as ImageIcon, Video, FileText, Download, CreditCard as Edit3, Copy, Trash2, Settings, BarChart3, AlertTriangle, ThumbsUp, Clock, Users, Globe, Activity, Zap, Bot, ArrowRight, ChevronRight, ExternalLink, Filter, Search, CalendarCheck, FolderOpen, TrendingDown, AlertCircle, Plus, ChevronDown, ChevronUp, CheckCircle2, Info, Settings2, Rocket } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { PromotionCalendar } from "./PromotionCalendar";
import { CampaignDetailView } from "./CampaignDetailView";
import { CampaignExecution } from "./CampaignExecution";

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

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: React.ComponentType<any>;
  substeps: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
}

export const MarketingStudio: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeSection, setActiveSection] = useState<"overview" | "scheduler" | "calendar" | "run">("overview");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignToRun, setCampaignToRun] = useState<Campaign | null>(null);
  const [campaignStatus, setCampaignStatus] = useState<"paused" | "running">("paused");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [campaignDetailTab, setCampaignDetailTab] = useState<"overview" | "creatives" | "performance" | "timeline">("overview");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const sections = [
    { id: "overview", label: "Campaign Overview", icon: FolderOpen },
    { id: "scheduler", label: "Campaign Scheduler", icon: Target },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "run", label: "Run Campaign", icon: Rocket },
  ];

  const approvedCampaigns: Campaign[] = [
    {
      id: "camp-001",
      name: "Summer Sale 2025",
      status: "approved",
      objective: "Drive conversions and increase sales",
      budget: 50000,
      spent: 0,
      startDate: "2025-10-15",
      endDate: "2025-11-15",
      platforms: ["Facebook", "Instagram", "Google Ads", "LinkedIn"],
      audience: "Age 25-45, Urban, Tech-savvy professionals",
      targetAge: "25-45",
      targetGender: "All",
      targetLocation: "United States, Canada, UK",
      category: "E-commerce",
      tags: ["Summer", "Sale", "Conversion", "Seasonal"],
      approvedBy: "Sarah Johnson",
      approvedDate: "2025-10-05",
      kpis: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        roas: 0,
      },
      creatives: [
        {
          id: "cr-001",
          type: "image",
          name: "Hero Banner - Desktop",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
          id: "cr-002",
          type: "video",
          name: "Product Showcase 30s",
          status: "approved",
        },
        {
          id: "cr-003",
          type: "image",
          name: "Mobile Banner",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
          id: "cr-004",
          type: "text",
          name: "Ad Copy - Primary",
          status: "approved",
        },
      ],
    },
    {
      id: "camp-002",
      name: "Brand Awareness Q4",
      status: "running",
      objective: "Increase brand visibility and engagement",
      budget: 35000,
      spent: 18500,
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      platforms: ["YouTube", "TikTok", "Instagram"],
      audience: "Age 18-35, Social media active users",
      targetAge: "18-35",
      targetGender: "All",
      targetLocation: "Global",
      category: "Brand Building",
      tags: ["Awareness", "Social", "Video", "Q4"],
      approvedBy: "Michael Chen",
      approvedDate: "2025-09-25",
      kpis: {
        impressions: 2500000,
        clicks: 62500,
        conversions: 4200,
        ctr: 2.5,
        cpc: 0.30,
        roas: 3.8,
      },
      creatives: [
        {
          id: "cr-005",
          type: "video",
          name: "Brand Story Video",
          status: "approved",
        },
        {
          id: "cr-006",
          type: "image",
          name: "Social Media Card",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
      ],
    },
    {
      id: "camp-003",
      name: "Product Launch Teaser",
      status: "approved",
      objective: "Generate buzz for new product launch",
      budget: 25000,
      startDate: "2025-10-20",
      endDate: "2025-11-10",
      platforms: ["Twitter", "LinkedIn", "Facebook"],
      audience: "Tech enthusiasts, Early adopters",
      creatives: [
        {
          id: "cr-007",
          type: "video",
          name: "Teaser Video 15s",
          status: "approved",
        },
        {
          id: "cr-008",
          type: "image",
          name: "Product Teaser Banner",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
      ],
    },
    {
      id: "camp-004",
      name: "Holiday Special Promotion",
      status: "paused",
      objective: "Drive holiday season sales",
      budget: 60000,
      startDate: "2025-11-01",
      endDate: "2025-12-25",
      platforms: ["Facebook", "Instagram", "Google Ads", "Pinterest"],
      audience: "Shoppers, Gift buyers",
      creatives: [
        {
          id: "cr-009",
          type: "image",
          name: "Holiday Banner Set",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
          id: "cr-010",
          type: "video",
          name: "Holiday Promo 30s",
          status: "approved",
        },
      ],
    },
    {
      id: "camp-005",
      name: "Customer Retention Campaign",
      status: "completed",
      objective: "Increase customer loyalty and repeat purchases",
      budget: 18000,
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      platforms: ["Email", "Facebook", "Instagram"],
      audience: "Existing customers",
      creatives: [
        {
          id: "cr-011",
          type: "image",
          name: "Loyalty Program Banner",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
      ],
    },
  ];

  const steps: Step[] = [
    {
      id: 1,
      title: 'Platform & Calendar Setup',
      description: 'Configure campaign platforms, scheduling, and target audience',
      status: 'in-progress',
      icon: Calendar,
      substeps: [
        { id: '1-1', title: 'Select marketing platforms', completed: true },
        { id: '1-2', title: 'Set campaign dates and schedule', completed: true },
        { id: '1-3', title: 'Define target audience segments', completed: false },
        { id: '1-4', title: 'Configure budget allocation', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Campaign Launch',
      description: 'Activate campaign across selected platforms',
      status: 'pending',
      icon: Play,
      substeps: [
        { id: '2-1', title: 'Review campaign settings', completed: false },
        { id: '2-2', title: 'Verify creative assets', completed: false },
        { id: '2-3', title: 'Confirm budget and targeting', completed: false },
        { id: '2-4', title: 'Launch campaign live', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Performance Monitoring',
      description: 'Track real-time metrics and campaign performance',
      status: 'pending',
      icon: TrendingUp,
      substeps: [
        { id: '3-1', title: 'Monitor impressions and reach', completed: false },
        { id: '3-2', title: 'Track click-through rates', completed: false },
        { id: '3-3', title: 'Analyze conversion metrics', completed: false },
        { id: '3-4', title: 'Review budget utilization', completed: false }
      ]
    },
    {
      id: 4,
      title: 'AI-Driven Optimization',
      description: 'Receive and apply AI-powered optimization suggestions',
      status: 'pending',
      icon: Bot,
      substeps: [
        { id: '4-1', title: 'Review AI recommendations', completed: false },
        { id: '4-2', title: 'Optimize budget allocation', completed: false },
        { id: '4-3', title: 'Adjust targeting parameters', completed: false },
        { id: '4-4', title: 'Test creative variations', completed: false }
      ]
    }
  ];

  const realTimeMetrics: MetricCard[] = [
    {
      label: 'Impressions',
      value: '1.2M',
      change: '+18.5%',
      trend: 'up',
      icon: Eye
    },
    {
      label: 'Clicks',
      value: '32.4K',
      change: '+12.3%',
      trend: 'up',
      icon: MousePointer
    },
    {
      label: 'CTR',
      value: '2.7%',
      change: '+0.4%',
      trend: 'up',
      icon: Activity
    },
    {
      label: 'Spend',
      value: '$8,450',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign
    }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'optimization',
      title: 'Budget Reallocation',
      message: 'Facebook ads showing 15% higher CTR. Consider increasing budget by 20%.',
      impact: 'high',
      action: 'Apply Now'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Creative Fatigue',
      message: 'Ad creative performance dropped 8% over last 2 days. Consider refreshing assets.',
      impact: 'medium',
      action: 'Review'
    },
    {
      id: 3,
      type: 'success',
      title: 'Peak Performance Window',
      message: 'Best engagement detected between 6-9 PM. Schedule adjusted automatically.',
      impact: 'low',
      action: 'View Details'
    }
  ];

  const platforms = [
    { name: 'Facebook', enabled: true, status: 'active' },
    { name: 'Instagram', enabled: true, status: 'active' },
    { name: 'Google Ads', enabled: false, status: 'inactive' },
    { name: 'LinkedIn', enabled: true, status: 'active' },
    { name: 'Twitter', enabled: false, status: 'inactive' }
  ];

  React.useEffect(() => {
    if (approvedCampaigns.length > 0) {
      setSelectedCampaign(approvedCampaigns[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "running":
        return "bg-blue-100 text-blue-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="text-white" size={20} />;
      case 'in-progress':
        return <Clock className="text-white" size={20} />;
      case 'pending':
        return <AlertCircle className="text-white" size={20} />;
      default:
        return <AlertCircle className="text-white" size={20} />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-400 bg-red-50';
      case 'medium':
        return 'border-yellow-400 bg-yellow-50';
      case 'low':
        return 'border-green-400 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const filteredCampaigns = approvedCampaigns.filter((campaign) => {
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const campaignStats = {
    total: approvedCampaigns.length,
    approved: approvedCampaigns.filter((c) => c.status === "approved").length,
    running: approvedCampaigns.filter((c) => c.status === "running").length,
    paused: approvedCampaigns.filter((c) => c.status === "paused").length,
    completed: approvedCampaigns.filter((c) => c.status === "completed").length,
    totalBudget: approvedCampaigns.reduce((sum, c) => sum + c.budget, 0),
  };

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const calculateProgress = (substeps: { completed: boolean }[]) => {
    const completed = substeps.filter(s => s.completed).length;
    return (completed / substeps.length) * 100;
  };

  const renderCampaignOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FolderOpen className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-blue-600">{campaignStats.total}</span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Total Campaigns</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>All campaigns in system</p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-green-600">{campaignStats.approved}</span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Approved</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Ready to launch</p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Play className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-blue-600">{campaignStats.running}</span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Running</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Currently live</p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              ${(campaignStats.totalBudget / 1000).toFixed(0)}K
            </span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Total Budget</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Across all campaigns</p>
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-1`}>Campaign List</h3>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64`}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="running">Running</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
                selectedCampaign?.id === campaign.id
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : `${themeClasses.border} ${themeClasses.hover}`
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className={`font-bold ${themeClasses.text} text-lg`}>{campaign.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>

              <p className={`text-sm ${themeClasses.textSecondary} mb-4 line-clamp-2`}>
                {campaign.objective}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${themeClasses.textSecondary}`}>Budget</span>
                  <span className={`text-sm font-bold ${themeClasses.text}`}>
                    ${campaign.budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${themeClasses.textSecondary}`}>Duration</span>
                  <span className={`text-sm font-semibold ${themeClasses.text}`}>
                    {Math.ceil(
                      (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 mb-3">
                <div className="flex items-center space-x-1">
                  <Globe className="text-gray-400" size={14} />
                  <span className={`text-xs ${themeClasses.textSecondary}`}>
                    {campaign.platforms.length} platforms
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ImageIcon className="text-gray-400" size={14} />
                  <span className={`text-xs ${themeClasses.textSecondary}`}>
                    {campaign.creatives.length} creatives
                  </span>
                </div>
              </div>

              {campaign.status === 'approved' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCampaignToRun(campaign);
                    setActiveSection('run');
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md"
                >
                  <Rocket size={16} />
                  <span className="text-sm font-medium">Run Campaign</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
            <p className={`text-lg font-semibold ${themeClasses.text} mb-1`}>No campaigns found</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {selectedCampaign && (
        <CampaignDetailView
          campaign={selectedCampaign}
          themeClasses={themeClasses}
          activeTab={campaignDetailTab}
          onTabChange={setCampaignDetailTab}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );

  const renderCampaignScheduler = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Campaign Progress</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${themeClasses.textSecondary}`}>Step {currentStep} of 4</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isExpanded = expandedStep === step.id;
              const progress = calculateProgress(step.substeps);

              return (
                <div
                  key={step.id}
                  className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                    step.status === 'in-progress' ? 'border-blue-500 shadow-lg' : ''
                  }`}
                >
                  <div
                    className={`p-5 cursor-pointer ${themeClasses.hover} transition-colors`}
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 ${getStepStatusColor(step.status)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          {getStepStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className={`text-lg font-semibold ${themeClasses.text}`}>
                              {step.id}. {step.title}
                            </h4>
                            {step.status === 'in-progress' && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                Active
                              </span>
                            )}
                            {step.status === 'completed' && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Complete
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                            {step.description}
                          </p>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-medium ${themeClasses.textSecondary}`}>
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className={`${themeClasses.textSecondary} hover:text-blue-600 transition-colors ml-4`}>
                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-gray-200 bg-gray-50">
                      <div className="space-y-3">
                        {step.substeps.map((substep) => (
                          <label
                            key={substep.id}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={substep.completed}
                              onChange={() => {}}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className={`flex-1 ${substep.completed ? 'line-through text-gray-500' : themeClasses.text}`}>
                              {substep.title}
                            </span>
                            {substep.completed && (
                              <CheckCircle2 className="text-green-600" size={18} />
                            )}
                          </label>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                          <Info size={16} />
                          <span className="text-sm font-medium">View Guidelines</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <span className="text-sm font-medium">Continue</span>
                          <ChevronDown size={16} className="rotate-[-90deg]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="text-blue-600" size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Platform Configuration</h3>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Settings2 size={16} />
              <span className="text-sm font-medium">Manage</span>
            </button>
          </div>

          <div className="space-y-3">
            {platforms.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platform.enabled}
                      onChange={() => {}}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className={`font-medium ${themeClasses.text}`}>{platform.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  platform.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {platform.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Real-Time Metrics</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {realTimeMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className={`p-4 rounded-xl ${themeClasses.gradient} hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="text-blue-600" size={20} />
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      metric.trend === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{metric.value}</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <h3 className={`text-lg font-semibold ${themeClasses.text}`}>AI Insights</h3>
          </div>

          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-xl border-l-4 ${getImpactColor(insight.impact)}`}
              >
                <div className="flex items-start space-x-3 mb-3">
                  {insight.type === 'optimization' && <Zap className="text-blue-600 flex-shrink-0 mt-1" size={18} />}
                  {insight.type === 'warning' && <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={18} />}
                  {insight.type === 'success' && <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />}
                  <div className="flex-1">
                    <h4 className={`font-semibold ${themeClasses.text} text-sm mb-1`}>
                      {insight.title}
                    </h4>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>
                      {insight.message}
                    </p>
                  </div>
                </div>
                <button className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  {insight.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="text-green-600" size={20} />
            <h4 className={`font-semibold ${themeClasses.text}`}>Campaign Health</h4>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${themeClasses.text}`}>Performance Score</span>
                <span className="text-sm font-bold text-green-600">87%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${themeClasses.text}`}>Budget Utilization</span>
                <span className="text-sm font-bold text-blue-600">68%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${themeClasses.text}`}>Audience Reach</span>
                <span className="text-sm font-bold text-purple-600">92%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
          <div className="flex space-x-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? `${themeClasses.accent} text-white shadow-lg`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeSection === "overview" && renderCampaignOverview()}
        {activeSection === "scheduler" && renderCampaignScheduler()}
        {activeSection === "calendar" && <PromotionCalendar />}
        {activeSection === "run" && campaignToRun && (
          <CampaignExecution
            campaign={campaignToRun}
            onBack={() => {
              setActiveSection('overview');
              setCampaignToRun(null);
            }}
            onLaunch={() => {
              alert(`Campaign "${campaignToRun.name}" launched successfully!`);
              setActiveSection('overview');
              setCampaignToRun(null);
            }}
          />
        )}
        {activeSection === "run" && !campaignToRun && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
            <p className={`text-lg font-semibold ${themeClasses.text} mb-1`}>No Campaign Selected</p>
            <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
              Please select an approved campaign to run
            </p>
            <button
              onClick={() => setActiveSection('overview')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
