import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Target,
  Eye,
  MousePointer,
  DollarSign,
  BarChart3,
  Filter,
  Activity,
  Brain,
  Database,
  Cpu,
  MemoryStick as Memory,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Bot,
  Server,
  HardDrive,
  Gauge,
  Calendar,
  Search,
  Bookmark,
  Bell,
  BellOff,
  Play,
  Pause,
  RefreshCw,
  Download,
  Settings,
  Layers,
  GitCompare,
  AlertCircle,
  TrendingDown,
  Wifi,
  WifiOff,
  X,
  Plus,
  Star,
  StarOff,
  Sliders,
  Hash,
  MapPin,
  Flame,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const PerformanceCockpit: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeSection, setActiveSection] = useState("campaigns");
  const [timeRange, setTimeRange] = useState("24h");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [campaignUpdates, setCampaignUpdates] = useState<{
    [key: string]: "up" | "down" | "neutral";
  }>({});
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [refreshRate, setRefreshRate] = useState(3000);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    campaignType: [] as string[],
    status: [] as string[],
    performance: [] as string[],
    agentType: [] as string[],
  });
  const [savedViews, setSavedViews] = useState<
    { id: string; name: string; filters: any }[]
  >([]);
  const [showSaveView, setShowSaveView] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "warning",
      message: "Campaign CTR below threshold",
      campaign: "Holiday Sale 2024",
      timestamp: new Date(),
      status: "active",
    },
    {
      id: "2",
      type: "success",
      message: "ROAS target exceeded",
      campaign: "Brand Awareness Q1",
      timestamp: new Date(),
      status: "resolved",
    },
    {
      id: "3",
      type: "error",
      message: "Budget overspend detected",
      campaign: "Product Launch",
      timestamp: new Date(),
      status: "active",
    },
  ]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [anomalies, setAnomalies] = useState<{ [key: string]: boolean }>({});
  const [predictiveData, setPredictiveData] = useState({
    nextWeekROAS: "+12.5%",
    budgetOptimization: "Shift 15% to Video",
    riskScore: "Low",
    attributionScore: "87%",
  });

  const sections = [
    { id: "campaigns", label: "Campaign Monitoring", icon: Target },
    { id: "agents", label: "Agent Performance", icon: Bot },
    { id: "memory", label: "Agent Memory", icon: Database },
    { id: "models", label: "ML Model KPIs", icon: Brain },
  ];

  // Campaign Monitoring Data
  const campaignMetrics = [
    {
      title: "Active Campaigns",
      value: "12",
      change: "+2",
      icon: Target,
      color: "blue",
    },
    {
      title: "Total Impressions",
      value: "12.4M",
      change: "+18.2%",
      icon: Eye,
      color: "green",
    },
    {
      title: "Click-Through Rate",
      value: "2.8%",
      change: "+0.4%",
      icon: MousePointer,
      color: "green",
    },
    {
      title: "Total Spend",
      value: "$24,580",
      change: "+8.7%",
      icon: DollarSign,
      color: "orange",
    },
  ];

  const campaigns = [
    {
      id: "holiday-2024",
      name: "Holiday Sale 2024",
      status: "active",
      impressions: "2.1M",
      clicks: "45.2K",
      conversions: "1,234",
      spend: "$5,680",
      roas: "4.2x",
      performance: "excellent",
      ctr: "2.15%",
      cpc: "$0.126",
      cpa: "$4.60",
    },
    {
      id: "brand-awareness-q1",
      name: "Brand Awareness Q1",
      status: "active",
      impressions: "1.8M",
      clicks: "38.7K",
      conversions: "892",
      spend: "$4,230",
      roas: "3.1x",
      performance: "good",
      ctr: "2.15%",
      cpc: "$0.109",
      cpa: "$4.74",
    },
    {
      id: "product-launch",
      name: "Product Launch",
      status: "completed",
      impressions: "3.2M",
      clicks: "68.9K",
      conversions: "2,156",
      spend: "$8,940",
      roas: "3.8x",
      performance: "excellent",
      ctr: "2.15%",
      cpc: "$0.130",
      cpa: "$4.15",
    },
  ];

  // Agent Performance Data
  const agentMetrics = [
    {
      title: "Active Agents",
      value: "8",
      change: "+1",
      icon: Users,
      color: "blue",
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
      color: "green",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Tasks Completed",
      value: "1,247",
      change: "+156",
      icon: Activity,
      color: "orange",
    },
  ];

  const agents = [
    {
      name: "Content Creator Agent",
      type: "Creative Generation",
      status: "active",
      responseTime: "0.8s",
      successRate: "96.5%",
      tasksCompleted: 342,
      llmModel: "GPT-4",
      tokensUsed: "2.4M",
      cost: "$48.20",
    },
    {
      name: "Performance Optimizer",
      type: "Campaign Optimization",
      status: "active",
      responseTime: "1.1s",
      successRate: "92.8%",
      tasksCompleted: 287,
      llmModel: "Claude-3",
      tokensUsed: "1.8M",
      cost: "$32.15",
    },
    {
      name: "Strategy Analyst",
      type: "Strategic Planning",
      status: "active",
      responseTime: "1.5s",
      successRate: "89.3%",
      tasksCompleted: 156,
      llmModel: "GPT-4",
      tokensUsed: "3.1M",
      cost: "$62.40",
    },
  ];

  // Agent Memory Data
  const memoryMetrics = [
    {
      title: "Total Memory Usage",
      value: "2.4 GB",
      change: "+0.3 GB",
      icon: HardDrive,
      color: "blue",
    },
    {
      title: "Knowledge Nodes",
      value: "15,847",
      change: "+234",
      icon: Database,
      color: "green",
    },
    {
      title: "Active Connections",
      value: "8,932",
      change: "+445",
      icon: Activity,
      color: "green",
    },
    {
      title: "Memory Efficiency",
      value: "87.3%",
      change: "+2.1%",
      icon: Gauge,
      color: "orange",
    },
  ];

  const memoryUsage = [
    {
      agent: "Content Creator Agent",
      memoryUsed: "512 MB",
      knowledgeNodes: 4250,
      connections: 2100,
      lastUpdate: "2 minutes ago",
      efficiency: "92%",
    },
    {
      agent: "Performance Optimizer",
      memoryUsed: "384 MB",
      knowledgeNodes: 3180,
      connections: 1850,
      lastUpdate: "5 minutes ago",
      efficiency: "89%",
    },
    {
      agent: "Strategy Analyst",
      memoryUsed: "768 MB",
      knowledgeNodes: 5420,
      connections: 3200,
      lastUpdate: "1 minute ago",
      efficiency: "94%",
    },
  ];

  // ML Model KPIs Data
  const modelMetrics = [
    {
      title: "Model Accuracy",
      value: "94.7%",
      change: "+1.2%",
      icon: Target,
      color: "blue",
    },
    {
      title: "Inference Time",
      value: "45ms",
      change: "-5ms",
      icon: Zap,
      color: "green",
    },
    {
      title: "Model Drift",
      value: "2.1%",
      change: "+0.3%",
      icon: TrendingUp,
      color: "yellow",
    },
    {
      title: "Throughput",
      value: "1.2K/s",
      change: "+150/s",
      icon: Activity,
      color: "green",
    },
  ];

  const models = [
    {
      name: "Campaign Performance Predictor",
      version: "v2.1.3",
      accuracy: "96.2%",
      latency: "32ms",
      throughput: "850/s",
      status: "healthy",
      lastTrained: "2 days ago",
      dataPoints: "2.4M",
    },
    {
      name: "Audience Segmentation Model",
      version: "v1.8.7",
      accuracy: "91.5%",
      latency: "28ms",
      throughput: "1.1K/s",
      status: "healthy",
      lastTrained: "5 days ago",
      dataPoints: "1.8M",
    },
    {
      name: "Creative Optimization Engine",
      version: "v3.0.1",
      accuracy: "89.3%",
      latency: "65ms",
      throughput: "420/s",
      status: "warning",
      lastTrained: "1 day ago",
      dataPoints: "3.2M",
    },
  ];

  // Live update simulation
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());

      // Simulate random updates for campaigns
      const updates: { [key: string]: "up" | "down" | "neutral" } = {};
      const newAnomalies: { [key: string]: boolean } = {};
      campaigns.forEach((campaign) => {
        const rand = Math.random();
        if (rand > 0.7) {
          updates[campaign.id] = "up";
        } else if (rand < 0.3) {
          updates[campaign.id] = "down";
        } else {
          updates[campaign.id] = "neutral";
        }

        // Simulate anomaly detection
        if (Math.random() > 0.95) {
          newAnomalies[campaign.id] = true;
        }
      });

      setCampaignUpdates(updates);
      setAnomalies(newAnomalies);

      // Clear animations after 2 seconds
      setTimeout(() => {
        setCampaignUpdates({});
        setAnomalies({});
      }, 2000);
    }, refreshRate);

    return () => clearInterval(interval);
  }, [isLiveMode, refreshRate]);

  // Enhanced time range options
  const timeRangeOptions = [
    { id: "live", label: "Live", category: "Real-time", refresh: 5000 },
    { id: "15m", label: "15m", category: "Short-term", refresh: 30000 },
    { id: "1h", label: "1h", category: "Short-term", refresh: 60000 },
    { id: "6h", label: "6h", category: "Short-term", refresh: 300000 },
    { id: "12h", label: "12h", category: "Short-term", refresh: 600000 },
    { id: "1d", label: "1d", category: "Medium-term", refresh: 1800000 },
    { id: "3d", label: "3d", category: "Medium-term", refresh: 3600000 },
    { id: "7d", label: "7d", category: "Medium-term", refresh: 3600000 },
    { id: "30d", label: "30d", category: "Long-term", refresh: 7200000 },
    { id: "90d", label: "90d", category: "Long-term", refresh: 7200000 },
  ];

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedFilters.status.length === 0 ||
      selectedFilters.status.includes(campaign.status);
    const matchesPerformance =
      selectedFilters.performance.length === 0 ||
      selectedFilters.performance.includes(campaign.performance);
    return matchesSearch && matchesStatus && matchesPerformance;
  });

  // Save view functionality
  const handleSaveView = () => {
    if (newViewName.trim()) {
      const newView = {
        id: Date.now().toString(),
        name: newViewName,
        filters: { ...selectedFilters, searchQuery, timeRange },
      };
      setSavedViews([...savedViews, newView]);
      setNewViewName("");
      setShowSaveView(false);
    }
  };

  // Load saved view
  const loadSavedView = (view: any) => {
    setSelectedFilters(view.filters);
    setSearchQuery(view.filters.searchQuery || "");
    setTimeRange(view.filters.timeRange || "24h");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "fair":
        return "text-yellow-600 bg-yellow-100";
      case "poor":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const renderCampaignMonitoring = () => (
    <div className="space-y-6">
      {/* Campaign Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campaignMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith("+");

          return (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                  <Icon className={`text-${metric.color}-600`} size={24} />
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    isPositive
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
                {metric.value}
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                {metric.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Campaign Performance Table */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
              Campaign Performance
            </h3>
            <div
              className={`flex items-center space-x-2 px-3 py-1 ${themeClasses.gradient} rounded-lg`}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">
                Live Updates
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Updates every 3s</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{campaigns.length} active campaigns</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${themeClasses.border}`}>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Campaign
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Status
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Impressions
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Clicks
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  CTR
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Conversions
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Spend
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  CPC
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  CPA
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  ROAS
                </th>
                <th
                  className={`text-center py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={campaign.id}
                  className={`border-b ${
                    themeClasses.border
                  } transition-all duration-500 ${
                    campaignUpdates[campaign.id] === "up"
                      ? "bg-green-50 border-green-200"
                      : campaignUpdates[campaign.id] === "down"
                      ? "bg-red-50 border-red-200"
                      : themeClasses.hover
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${themeClasses.text}`}>
                        {campaign.name}
                      </h4>
                      {campaignUpdates[campaign.id] && (
                        <div
                          className={`w-2 h-2 rounded-full animate-pulse ${
                            campaignUpdates[campaign.id] === "up"
                              ? "bg-green-500"
                              : campaignUpdates[campaign.id] === "down"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-green-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-red-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.impressions}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-green-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-red-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-green-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-red-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.clicks}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-green-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-red-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-green-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-red-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.ctr}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-green-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-red-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-green-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-red-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.conversions}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-green-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-red-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-red-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-green-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.spend}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-red-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-green-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-red-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-green-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.cpc}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-red-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-green-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-red-600 font-bold"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-green-600 font-bold"
                        : themeClasses.text
                    }`}
                  >
                    {campaign.cpa}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-red-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-green-500">↘</span>
                    )}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-bold transition-all duration-300 ${
                      campaignUpdates[campaign.id] === "up"
                        ? "text-green-600 text-lg"
                        : campaignUpdates[campaign.id] === "down"
                        ? "text-red-600 text-lg"
                        : "text-green-600"
                    }`}
                  >
                    {campaign.roas}
                    {campaignUpdates[campaign.id] === "up" && (
                      <span className="ml-1 text-green-500">↗</span>
                    )}
                    {campaignUpdates[campaign.id] === "down" && (
                      <span className="ml-1 text-red-500">↘</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(
                        campaign.performance
                      )}`}
                    >
                      {campaign.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAgentPerformance = () => (
    <div className="space-y-6">
      {/* Agent Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive =
            metric.change.startsWith("+") ||
            (metric.change.startsWith("-") &&
              metric.title.includes("Response Time"));

          return (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                  <Icon className={`text-${metric.color}-600`} size={24} />
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    isPositive
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
                {metric.value}
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                {metric.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Agent Performance Table */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
      >
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>
          Agent Performance & LLM Metrics
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${themeClasses.border}`}>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Agent
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Status
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Response Time
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Success Rate
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Tasks
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  LLM Model
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Tokens Used
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr
                  key={index}
                  className={`border-b ${themeClasses.border} ${themeClasses.hover} transition-colors`}
                >
                  <td className="py-4 px-4">
                    <div>
                      <h4 className={`font-medium ${themeClasses.text}`}>
                        {agent.name}
                      </h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        {agent.type}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        agent.status
                      )}`}
                    >
                      {agent.status}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {agent.responseTime}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {agent.successRate}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {agent.tasksCompleted}
                  </td>
                  <td className={`py-4 px-4 font-medium ${themeClasses.text}`}>
                    {agent.llmModel}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {agent.tokensUsed}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-bold text-orange-600`}
                  >
                    {agent.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAgentMemory = () => (
    <div className="space-y-6">
      {/* Memory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {memoryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith("+");

          return (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                  <Icon className={`text-${metric.color}-600`} size={24} />
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    isPositive
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
                {metric.value}
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                {metric.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Memory Usage Table */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
      >
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>
          Agent Memory Usage
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${themeClasses.border}`}>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Agent
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Memory Used
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Knowledge Nodes
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Connections
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Efficiency
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody>
              {memoryUsage.map((memory, index) => (
                <tr
                  key={index}
                  className={`border-b ${themeClasses.border} ${themeClasses.hover} transition-colors`}
                >
                  <td className="py-4 px-4">
                    <h4 className={`font-medium ${themeClasses.text}`}>
                      {memory.agent}
                    </h4>
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {memory.memoryUsed}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {memory.knowledgeNodes.toLocaleString()}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {memory.connections.toLocaleString()}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-bold text-blue-600`}
                  >
                    {memory.efficiency}
                  </td>
                  <td className={`py-4 px-4 ${themeClasses.textSecondary}`}>
                    {memory.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Memory Visualization */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
      >
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>
          Memory Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {memoryUsage.map((memory, index) => (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4`}
            >
              <h4 className={`font-medium ${themeClasses.text} mb-3`}>
                {memory.agent}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={`${themeClasses.textSecondary}`}>
                    Memory:
                  </span>
                  <span className={`font-medium ${themeClasses.text}`}>
                    {memory.memoryUsed}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${parseInt(memory.efficiency)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className={`${themeClasses.textSecondary}`}>
                    Efficiency:
                  </span>
                  <span className={`font-medium ${themeClasses.text}`}>
                    {memory.efficiency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMLModelKPIs = () => (
    <div className="space-y-6">
      {/* Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modelMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith("+")
            ? !metric.title.includes("Drift")
            : metric.title.includes("Drift") || metric.title.includes("Time");

          return (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 ${themeClasses.shadow}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                  <Icon className={`text-${metric.color}-600`} size={24} />
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    isPositive
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
                {metric.value}
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                {metric.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Model Performance Table */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
      >
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>
          ML Model Performance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${themeClasses.border}`}>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Model
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Version
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Accuracy
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Latency
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Throughput
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Status
                </th>
                <th
                  className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Last Trained
                </th>
                <th
                  className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}
                >
                  Data Points
                </th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr
                  key={index}
                  className={`border-b ${themeClasses.border} ${themeClasses.hover} transition-colors`}
                >
                  <td className="py-4 px-4">
                    <h4 className={`font-medium ${themeClasses.text}`}>
                      {model.name}
                    </h4>
                  </td>
                  <td
                    className={`py-4 px-4 font-mono text-sm ${themeClasses.text}`}
                  >
                    {model.version}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {model.accuracy}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {model.latency}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {model.throughput}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        model.status
                      )}`}
                    >
                      {model.status}
                    </span>
                  </td>
                  <td className={`py-4 px-4 ${themeClasses.textSecondary}`}>
                    {model.lastTrained}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}
                  >
                    {model.dataPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Health Dashboard */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
      >
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>
          Model Health Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model, index) => (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-medium ${themeClasses.text} text-sm`}>
                  {model.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    model.status
                  )}`}
                >
                  {model.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`${themeClasses.textSecondary}`}>
                      Accuracy
                    </span>
                    <span className={`font-medium ${themeClasses.text}`}>
                      {model.accuracy}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: model.accuracy }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className={`${themeClasses.textSecondary}`}>
                      Latency
                    </span>
                    <p className={`font-medium ${themeClasses.text}`}>
                      {model.latency}
                    </p>
                  </div>
                  <div>
                    <span className={`${themeClasses.textSecondary}`}>
                      Throughput
                    </span>
                    <p className={`font-medium ${themeClasses.text}`}>
                      {model.throughput}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}
    >
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
        <div className="text-center flex-1">
          <div className="flex items-center justify-start mb-2">
            <TrendingUp
              className={`${themeClasses.text} mr-3 animate-pulse`}
              size={32}
            />
            <h2
              className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}
            >
              Performance Cockpit
            </h2>
            {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
          </div>
          <p
            className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}
          >
            Comprehensive monitoring and analytics dashboard
          </p>
        </div>

        {/* Section Navigation */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}
        >
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? `${themeClasses.accent} text-white`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={16} className="mr-1 md:mr-2" />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className={`${themeClasses.textSecondary}`} size={16} />
            <span
              className={`text-sm font-medium ${themeClasses.text} hidden md:inline`}
            >
              Time Range:
            </span>
            <div className="flex space-x-1 md:space-x-2">
              {["1h", "6h", "24h", "7d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2 md:px-3 py-1 md:py-2 rounded-lg font-medium transition-colors text-sm ${
                    timeRange === range
                      ? `${themeClasses.accent} text-white`
                      : `${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  {range}
                </button>
              ))}
              <button
                onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                className={`flex items-center px-2 md:px-3 py-1 md:py-2 rounded-lg font-medium transition-colors text-sm ${
                  showCustomDatePicker
                    ? `${themeClasses.accent} text-white`
                    : `${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`
                }`}
              >
                <Calendar size={14} className="mr-1" />
                <span className="hidden md:inline">Custom</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Content Based on Active Section */}
        {activeSection === "campaigns" && renderCampaignMonitoring()}
        {activeSection === "agents" && renderAgentPerformance()}
        {activeSection === "memory" && renderAgentMemory()}
        {activeSection === "models" && renderMLModelKPIs()}

        {/* Performance Chart */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-3 md:p-4`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h3
                className={`text-lg md:text-xl font-semibold ${themeClasses.text}`}
              >
                Performance Trends
              </h3>
              {comparisonMode && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Comparison Mode
                </span>
              )}
            </div>
            <div className="hidden md:flex space-x-2">
              {["Overview", "Detailed", "Heatmap", "Correlation"].map(
                (view) => (
                  <button
                    key={view}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`}
                  >
                    {view}
                  </button>
                )
              )}
            </div>
          </div>

          <div
            className={`h-48 md:h-64 ${themeClasses.gradient} rounded-xl flex items-center justify-center relative overflow-hidden`}
          >
            {/* Simulated Chart Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 md:grid-cols-12 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-white/20 relative">
                    <div
                      className="absolute bottom-0 w-full bg-white/30 transition-all duration-1000"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <BarChart3
                className={`${themeClasses.textSecondary} mb-2 mx-auto`}
                size={32}
              />
              <p
                className={`${themeClasses.textSecondary} mb-1 font-semibold text-sm`}
              >
                Advanced Analytics Dashboard
              </p>
              <p className={`text-xs ${themeClasses.textSecondary}`}>
                {activeSection === "campaigns"
                  ? `${filteredCampaigns.length} campaigns`
                  : activeSection === "agents"
                  ? `${agents.length} agents`
                  : activeSection === "models"
                  ? `${models.length} models`
                  : activeSection === "analytics"
                  ? "predictive analytics"
                  : "analytics"}{" "}
                •{" "}
                {timeRange === "custom" && customStartDate && customEndDate
                  ? `${new Date(
                      customStartDate
                    ).toLocaleDateString()} - ${new Date(
                      customEndDate
                    ).toLocaleDateString()}`
                  : timeRange}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
