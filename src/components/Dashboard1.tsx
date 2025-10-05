import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Activity,
  Eye,
  DollarSign,
  ShoppingCart,
  Percent,
  Filter,
  Calendar,
  ChevronDown,
  MoreVertical,
  Copy,
  CreditCard as Edit,
  Play,
  Pause,
  Trash2,
  Settings,
  MapPin,
  Clock,
  Hash,
  MessageSquare,
  Plus,
  Lightbulb,
  Brain,
  Sparkles,
  Rocket,
  Wand2,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [selectedProduct, setSelectedProduct] = useState("Nexa Jimmy");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 90 days");
  const [selectedChannel, setSelectedChannel] = useState("Instagram");
  const [selectedSpend, setSelectedSpend] = useState("₹5L - ₹10L");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [showSpendDropdown, setShowSpendDropdown] = useState(false);
  const [activeCampaignMenu, setActiveCampaignMenu] = useState<string | null>(
    null
  );

  // KPI Data for Last 90 Days Snapshot
  const kpiData = {
    totalSpends: {
      value: "₹11,00,000",
      change: "+₹3,50,000 last Month",
      chartData: [65, 70, 75, 80, 85, 90, 95, 88, 92, 96, 100, 105],
    },
    totalLeads: {
      value: "340",
      change: "vs. 303 last month",
      monthlyData: [
        { month: "Jan", value: 85 },
        { month: "Feb", value: 92 },
        { month: "Mar", value: 78 },
      ],
    },
    totalSales: {
      value: "₹83,10,000",
      change: "vs. ₹72,40,000 last Month",
      chartData: [72, 75, 78, 80, 82, 83],
    },
    conversionRate: {
      value: "5%",
      segments: [
        { name: "Direct", rate: "8.2%", leads: "45 leads", sales: "3 sales" },
        { name: "Organic", rate: "6.5%", leads: "65 leads", sales: "4 sales" },
        { name: "Paid", rate: "4.8%", leads: "145 leads", sales: "7 sales" },
      ],
      insight: "2.5 Min (month) lead to sale = 120/5",
    },
  };

  // Performance Metrics for Selected Filters
  const performanceMetrics = {
    spend: "₹3,80,000",
    leads: "120",
    sales: "8",
    cnv: "5%",
  };

  // Campaign Data
  const campaigns = [
    {
      id: "campaign-01",
      name: "Campaign #01",
      status: "Active",
      activationDate: "July-01-2025",
      segmentName: "Millennials",
      segmentSize: "15,000",
      channels: "Instagram",
      description: "Driving Millennial leads for Nexa Jimmy",
      spend: "₹2,50,000",
      leads: 85,
      sales: 5,
      cnv: "5.9%",
      performance: "High",
    },
    {
      id: "campaign-02",
      name: "Campaign #02",
      status: "Paused",
      activationDate: "June-15-2025",
      segmentName: "Gen Z",
      segmentSize: "12,500",
      channels: "Facebook, Instagram",
      description: "Youth-focused campaign for brand awareness",
      spend: "₹1,80,000",
      leads: 62,
      sales: 3,
      cnv: "4.8%",
      performance: "Medium",
    },
    {
      id: "campaign-03",
      name: "Campaign #03",
      status: "Completed",
      activationDate: "May-20-2025",
      segmentName: "Working Professionals",
      segmentSize: "20,000",
      channels: "LinkedIn, Google Ads",
      description: "B2B lead generation for premium products",
      spend: "₹3,20,000",
      leads: 95,
      sales: 8,
      cnv: "8.4%",
      performance: "High",
    },
  ];

  const productOptions = [
    "All Products",
    "Nexa Jimmy",
    "Product A",
    "Product B",
    "Product C",
  ];
  const timeframeOptions = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 6 months",
    "Last year",
  ];
  const channelOptions = [
    "All Channels",
    "Instagram",
    "Facebook",
    "Google Ads",
    "LinkedIn",
    "YouTube",
  ];
  const spendOptions = [
    "All Spend",
    "< ₹1L",
    "₹1L - ₹5L",
    "₹5L - ₹10L",
    "> ₹10L",
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCampaignAction = (campaignId: string, action: string) => {
    console.log(`${action} campaign:`, campaignId);
    setActiveCampaignMenu(null);
    // Here you would implement the actual actions
  };

  return (
    <div
      className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}
    >
      <div className="space-y-8 p-8">
        <div className="text-center flex-1">
          <div className="flex items-center justify-start mb-2">
            <Settings
              className={`${themeClasses.text} mr-3 animate-pulse`}
              size={32}
            />
            <h2
              className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}
            >
              Campaign Orchestrator Dashboard
            </h2>
            {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
          </div>
          <p
            className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}
          >
           Manage your campaigns, agents, and performance analytics
          </p>
        </div>
        {/* Enhanced Header with Stats */}

        {/* Enhanced KPI Section */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-3xl p-8 ${themeClasses.shadow}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
                Performance Snapshot
              </h2>
              <p className={`${themeClasses.textSecondary}`}>
                Last 90 days comprehensive overview
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span
                className={`text-sm ${themeClasses.textSecondary} font-medium`}
              >
                Real-time data
              </span>
            </div>
          </div>

          {/* Enhanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Spends */}
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <DollarSign size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <TrendingUp size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium opacity-90 mb-3">
                  Total Investment
                </h4>
                <p className="text-4xl font-bold mb-3">
                  {kpiData.totalSpends.value}
                </p>
                <p className="text-sm opacity-90 bg-white/10 rounded-full px-3 py-1 inline-block">
                  {kpiData.totalSpends.change}
                </p>
              </div>
              {/* Enhanced Mini Chart */}
              <div className="absolute bottom-0 right-0 w-32 h-20 opacity-20">
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    points={kpiData.totalSpends.chartData
                      .map(
                        (value, index) =>
                          `${index * 9},${60 - (value - 60) * 0.8}`
                      )
                      .join(" ")}
                  />
                </svg>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            </div>

            {/* Total Leads */}
            <div className="bg-gradient-to-br from-orange-400 via-yellow-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <Target size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium opacity-90 mb-3">
                  Quality Leads
                </h4>
                <p className="text-4xl font-bold mb-4">
                  {kpiData.totalLeads.value}
                </p>
              </div>
              <div className="space-y-3 relative z-10">
                {kpiData.totalLeads.monthlyData.map((month, index) => (
                  <div
                    key={month.month}
                    className="flex items-center justify-between bg-white/10 rounded-xl p-2"
                  >
                    <span className="text-sm font-medium opacity-90">
                      {month.month}
                    </span>
                    <div className="flex-1 mx-3">
                      <div className="bg-white/30 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-1000"
                          style={{ width: `${month.value}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs font-bold">{month.value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-sm opacity-90 bg-white/10 rounded-full px-3 py-1 inline-block mt-3 relative z-10">
                {kpiData.totalLeads.change}
              </p>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>

            {/* Total Sales */}
            <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <ShoppingCart size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <DollarSign size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium opacity-90 mb-3">
                  Revenue Generated
                </h4>
                <p className="text-4xl font-bold mb-3">
                  {kpiData.totalSales.value}
                </p>
                <p className="text-sm opacity-90 bg-white/10 rounded-full px-3 py-1 inline-block mb-4">
                  {kpiData.totalSales.change}
                </p>
              </div>
              {/* Enhanced Mini Bar Chart */}
              <div className="flex items-end space-x-2 h-12 relative z-10">
                {kpiData.totalSales.chartData.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white/40 rounded-lg flex-1 transition-all duration-1000 hover:bg-white/60"
                    style={{ height: `${(value / 83) * 100}%` }}
                  ></div>
                ))}
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Percent size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <Activity size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium opacity-90 mb-3">
                  Conversion Excellence
                </h4>
                <p className="text-4xl font-bold mb-4">
                  {kpiData.conversionRate.value}
                </p>
              </div>
              <div className="space-y-3 relative z-10">
                {kpiData.conversionRate.segments.map((segment, index) => (
                  <div
                    key={segment.name}
                    className="flex items-center justify-between bg-white/10 rounded-xl p-2 text-sm"
                  >
                    <span className="font-medium opacity-90">
                      {segment.name}
                    </span>
                    <span className="font-bold text-yellow-300">
                      {segment.rate}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs opacity-80 mt-4 bg-white/10 rounded-full px-3 py-1 inline-block relative z-10">
                {kpiData.conversionRate.insight}
              </p>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-3xl p-8 ${themeClasses.shadow}`}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
                Smart Filters
              </h2>
              <p className={`${themeClasses.textSecondary}`}>
                Customize your data view with intelligent filtering
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-105`}
              >
                Save View
              </button>
              <button
                className={`px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-all`}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Enhanced Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Product Filter */}
            <div className="relative">
              <label
                className={`block text-sm font-semibold ${themeClasses.text} mb-3`}
              >
                Product Focus
              </label>
              <button
                onClick={() => setShowProductDropdown(!showProductDropdown)}
                className={`w-full flex items-center justify-between px-6 py-4 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Target size={16} className="text-blue-600" />
                  </div>
                  <span className={`${themeClasses.text} font-medium`}>
                    {selectedProduct}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`${
                    themeClasses.textSecondary
                  } transition-transform ${
                    showProductDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showProductDropdown && (
                <div
                  className={`absolute top-full left-0 right-0 mt-3 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl shadow-2xl z-50 backdrop-blur-sm`}
                >
                  {productOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedProduct(option);
                        setShowProductDropdown(false);
                      }}
                      className={`w-full text-left px-6 py-4 ${
                        themeClasses.hover
                      } transition-all first:rounded-t-2xl last:rounded-b-2xl ${
                        selectedProduct === option
                          ? `${themeClasses.accent} text-white font-semibold`
                          : themeClasses.text
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Timeframe Filter */}
            <div className="relative">
              <label
                className={`block text-sm font-semibold ${themeClasses.text} mb-3`}
              >
                Time Period
              </label>
              <button
                onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
                className={`w-full flex items-center justify-between px-6 py-4 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock size={16} className="text-green-600" />
                  </div>
                  <span className={`${themeClasses.text} font-medium`}>
                    {selectedTimeframe}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`${
                    themeClasses.textSecondary
                  } transition-transform ${
                    showTimeframeDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showTimeframeDropdown && (
                <div
                  className={`absolute top-full left-0 right-0 mt-3 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl shadow-2xl z-50 backdrop-blur-sm`}
                >
                  {timeframeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTimeframe(option);
                        setShowTimeframeDropdown(false);
                      }}
                      className={`w-full text-left px-6 py-4 ${
                        themeClasses.hover
                      } transition-all first:rounded-t-2xl last:rounded-b-2xl ${
                        selectedTimeframe === option
                          ? `${themeClasses.accent} text-white font-semibold`
                          : themeClasses.text
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Channel Filter */}
            <div className="relative">
              <label
                className={`block text-sm font-semibold ${themeClasses.text} mb-3`}
              >
                Marketing Channel
              </label>
              <button
                onClick={() => setShowChannelDropdown(!showChannelDropdown)}
                className={`w-full flex items-center justify-between px-6 py-4 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Activity size={16} className="text-purple-600" />
                  </div>
                  <span className={`${themeClasses.text} font-medium`}>
                    {selectedChannel}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`${
                    themeClasses.textSecondary
                  } transition-transform ${
                    showChannelDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showChannelDropdown && (
                <div
                  className={`absolute top-full left-0 right-0 mt-3 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl shadow-2xl z-50 backdrop-blur-sm`}
                >
                  {channelOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedChannel(option);
                        setShowChannelDropdown(false);
                      }}
                      className={`w-full text-left px-6 py-4 ${
                        themeClasses.hover
                      } transition-all first:rounded-t-2xl last:rounded-b-2xl ${
                        selectedChannel === option
                          ? `${themeClasses.accent} text-white font-semibold`
                          : themeClasses.text
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Spend Filter */}
            <div className="relative">
              <label
                className={`block text-sm font-semibold ${themeClasses.text} mb-3`}
              >
                Budget Range
              </label>
              <button
                onClick={() => setShowSpendDropdown(!showSpendDropdown)}
                className={`w-full flex items-center justify-between px-6 py-4 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <DollarSign size={16} className="text-orange-600" />
                  </div>
                  <span className={`${themeClasses.text} font-medium`}>
                    {selectedSpend}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`${
                    themeClasses.textSecondary
                  } transition-transform ${
                    showSpendDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showSpendDropdown && (
                <div
                  className={`absolute top-full left-0 right-0 mt-3 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl shadow-2xl z-50 backdrop-blur-sm`}
                >
                  {spendOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedSpend(option);
                        setShowSpendDropdown(false);
                      }}
                      className={`w-full text-left px-6 py-4 ${
                        themeClasses.hover
                      } transition-all first:rounded-t-2xl last:rounded-b-2xl ${
                        selectedSpend === option
                          ? `${themeClasses.accent} text-white font-semibold`
                          : themeClasses.text
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Applied Filters Display */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={16} className={`${themeClasses.textSecondary}`} />
              <span className={`text-sm font-semibold ${themeClasses.text}`}>
                Active Filters:
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {selectedProduct}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {selectedTimeframe}
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {selectedChannel}
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {selectedSpend}
              </span>
            </div>
          </div>

          {/* Enhanced Performance Metrics */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                Live Performance Metrics
              </h3>
              <span
                className={`text-sm ${themeClasses.textSecondary} px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium flex items-center`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Real-time Data
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign size={18} className="text-white" />
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-blue-600">
                    {performanceMetrics.spend}
                  </p>
                  <p
                    className={`text-sm ${themeClasses.textSecondary} font-medium`}
                  >
                    Total Spend
                  </p>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Users size={18} className="text-white" />
                  </div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-yellow-600">
                    {performanceMetrics.leads}
                  </p>
                  <p
                    className={`text-sm ${themeClasses.textSecondary} font-medium`}
                  >
                    Total Leads
                  </p>
                  <div className="w-full bg-yellow-100 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp size={18} className="text-white" />
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-green-600">
                    {performanceMetrics.sales}
                  </p>
                  <p
                    className={`text-sm ${themeClasses.textSecondary} font-medium`}
                  >
                    Total Sales
                  </p>
                  <div className="w-full bg-green-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 ${themeClasses.hover} transition-all duration-300 transform hover:scale-105 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Percent size={18} className="text-white" />
                  </div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-purple-600">
                    {performanceMetrics.cnv}
                  </p>
                  <p
                    className={`text-sm ${themeClasses.textSecondary} font-medium`}
                  >
                    Conversion Rate
                  </p>
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Campaign Details */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-3xl p-8 ${themeClasses.shadow}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                  Campaign Portfolio
                </h2>
              </div>
              <p className={`${themeClasses.textSecondary}`}>
                Detailed insights and performance analytics for your active
                campaigns
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span
                className={`text-xs ${themeClasses.textSecondary} font-medium`}
              >
                {campaigns.length} campaigns found
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-3xl p-8 relative ${themeClasses.hover} transition-all duration-300 transform hover:scale-[1.02] shadow-2xl group`}
              >
                {/* Campaign Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Target size={24} className="text-white" />
                    </div>
                    <div>
                      <h4
                        className={`text-xl font-bold ${themeClasses.text} mb-2`}
                      >
                        {campaign.name}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getPerformanceColor(
                            campaign.performance
                          )}`}
                        >
                          {campaign.performance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Three Dots Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveCampaignMenu(
                          activeCampaignMenu === campaign.id
                            ? null
                            : campaign.id
                        )
                      }
                      className={`p-4 ${themeClasses.hover} rounded-2xl transition-all transform hover:scale-110`}
                    >
                      <MoreVertical
                        size={24}
                        className={`${themeClasses.textSecondary}`}
                      />
                    </button>

                    {activeCampaignMenu === campaign.id && (
                      <div
                        className={`absolute right-0 top-full mt-3 w-56 ${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl shadow-2xl z-50 backdrop-blur-sm`}
                      >
                        <button
                          onClick={() =>
                            handleCampaignAction(campaign.id, "clone")
                          }
                          className={`w-full flex items-center px-6 py-4 ${themeClasses.hover} transition-all text-left first:rounded-t-2xl`}
                        >
                          <Copy
                            size={18}
                            className={`${themeClasses.textSecondary} mr-4`}
                          />
                          <span className={`${themeClasses.text} font-medium`}>
                            Clone Campaign
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleCampaignAction(campaign.id, "edit")
                          }
                          className={`w-full flex items-center px-6 py-4 ${themeClasses.hover} transition-all text-left`}
                        >
                          <Edit
                            size={18}
                            className={`${themeClasses.textSecondary} mr-4`}
                          />
                          <span className={`${themeClasses.text} font-medium`}>
                            Edit in Campaign Studio
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleCampaignAction(
                              campaign.id,
                              campaign.status === "Active" ? "pause" : "resume"
                            )
                          }
                          className={`w-full flex items-center px-6 py-4 ${themeClasses.hover} transition-all text-left`}
                        >
                          {campaign.status === "Active" ? (
                            <>
                              <Pause
                                size={18}
                                className={`${themeClasses.textSecondary} mr-4`}
                              />
                              <span
                                className={`${themeClasses.text} font-medium`}
                              >
                                Pause Campaign
                              </span>
                            </>
                          ) : (
                            <>
                              <Play
                                size={18}
                                className={`${themeClasses.textSecondary} mr-4`}
                              />
                              <span
                                className={`${themeClasses.text} font-medium`}
                              >
                                Resume Campaign
                              </span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleCampaignAction(campaign.id, "delete")
                          }
                          className={`w-full flex items-center px-6 py-4 hover:bg-red-50 transition-all text-left border-t-2 ${themeClasses.border} last:rounded-b-2xl`}
                        >
                          <Trash2 size={18} className="text-red-500 mr-4" />
                          <span className="text-red-600 font-medium">
                            Delete Campaign
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Campaign Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.border} border-2 ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar size={16} className="text-white" />
                      </div>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Launch Date
                      </p>
                    </div>
                    <p className={`text-base font-bold ${themeClasses.text}`}>
                      {campaign.activationDate}
                    </p>
                  </div>

                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.border} border-2 ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users size={16} className="text-white" />
                      </div>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Target Audience
                      </p>
                    </div>
                    <p className={`text-base font-bold ${themeClasses.text}`}>
                      {campaign.segmentName}
                    </p>
                    <p
                      className={`text-sm ${themeClasses.textSecondary} font-medium`}
                    >
                      {campaign.segmentSize} people
                    </p>
                  </div>

                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.border} border-2 ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Activity size={16} className="text-white" />
                      </div>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Channels
                      </p>
                    </div>
                    <p className={`text-base font-bold ${themeClasses.text}`}>
                      {campaign.channels}
                    </p>
                  </div>

                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.border} border-2 ${themeClasses.hover} transition-all transform hover:scale-105 shadow-lg`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <MessageSquare size={16} className="text-white" />
                      </div>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Objective
                      </p>
                    </div>
                    <p className={`text-base font-bold ${themeClasses.text}`}>
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div
                  className={`bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-t-2 ${themeClasses.border}`}
                >
                  <h5 className={`text-lg font-bold ${themeClasses.text} mb-4`}>
                    Performance Dashboard
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xl transform hover:scale-110 transition-transform">
                        <DollarSign size={20} className="text-white" />
                      </div>
                      <p
                        className={`text-xl font-bold ${themeClasses.text} mb-1`}
                      >
                        {campaign.spend}
                      </p>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Investment
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xl transform hover:scale-110 transition-transform">
                        <Users size={20} className="text-white" />
                      </div>
                      <p
                        className={`text-xl font-bold ${themeClasses.text} mb-1`}
                      >
                        {campaign.leads}
                      </p>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Quality Leads
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xl transform hover:scale-110 transition-transform">
                        <TrendingUp size={20} className="text-white" />
                      </div>
                      <p
                        className={`text-xl font-bold ${themeClasses.text} mb-1`}
                      >
                        {campaign.sales}
                      </p>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Conversions
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xl transform hover:scale-110 transition-transform">
                        <Percent size={20} className="text-white" />
                      </div>
                      <p className={`text-xl font-bold text-green-600 mb-1`}>
                        {campaign.cnv}
                      </p>
                      <p
                        className={`text-sm ${themeClasses.textSecondary} font-semibold`}
                      >
                        Success Rate
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-6 pt-6 border-t-2 border-gray-100">
                  <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-110 font-semibold shadow-2xl">
                    <Copy size={16} className="mr-3" />
                    Clone Campaign
                  </button>
                  <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-110 font-semibold shadow-2xl">
                    <Eye size={16} className="mr-3" />
                    Deep Dive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Create Campaign CTA */}
        <div className="relative hidden">
          <div
            className={`${themeClasses.gradient} ${themeClasses.border}  border-2 rounded-3xl p-12 relative overflow-hidden shadow-2xl`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 ">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-white/20 relative">
                    <div
                      className="absolute bottom-0 w-full bg-white/20 transition-all duration-2000"
                      style={{ height: `${Math.random() * 70 + 30}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

             <div className={`relative z-10 text-center `}>
      {/* Header */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold ${themeClasses.text} mb-4`}>
          AI-Powered Campaign Creation
        </h2>
        <p className={`text-xl max-w-2xl mx-auto ${themeClasses.textSecondary}`}>
          Leverage advanced AI intelligence to create high-performing campaigns based on your historical data and market insights
        </p>
      </div>

      {/* KRAFT AI Agent Feature */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 border ${themeClasses.border} border-white/20 shadow-2xl`}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-2xl">
              <Brain size={28} className={themeClasses.text} />
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
            KRAFT AI Agent
          </h3>
          <p className={`text-lg mb-6 ${themeClasses.textSecondary}`}>
            Our intelligent agent analyzes your campaign performance, market trends, and audience behavior to generate optimized campaign strategies
          </p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className={`font-medium ${themeClasses.textSecondary}`}>
              Powered by AI intelligence
            </span>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={() => onTabChange("strategy")}
          className={`bg-gradient-to-r ${themeClasses.accent} ${themeClasses.text} px-12 py-6 rounded-3xl font-bold text-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-4 group shadow-2xl`}
        >
          <Rocket size={32} className="group-hover:animate-bounce" />
          <span>Launch Campaign Studio</span>
          <Wand2 size={28} className="group-hover:rotate-12 transition-transform" />
        </button>

        <div className="flex items-center justify-center space-x-8 text-lg">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg"></div>
            <span className={`font-medium ${themeClasses.textSecondary}`}>
              AI-Powered Strategy
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-400 rounded-full shadow-lg"></div>
            <span className={`font-medium ${themeClasses.textSecondary}`}>
              Data-Driven Insights
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-purple-400 rounded-full shadow-lg"></div>
            <span className={`font-medium ${themeClasses.textSecondary}`}>
              Performance Optimized
            </span>
          </div>
        </div>
      </div>
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
