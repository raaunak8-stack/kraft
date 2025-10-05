import React, { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Gauge,
  LineChart,
  Loader,
  MousePointer,
  PlayCircle,
  RefreshCw,
  Settings,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
  AlertCircle,
  Server,
  Database,
  Cpu,
  Bot,
  Sparkles,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { PromotionCalendar } from "./PromotionCalendar";

interface Trigger {
  id: string;
  type: "warning" | "alert" | "info";
  message: string;
  timestamp: Date;
  metric: string;
  value: string;
}

interface AgentAction {
  id: string;
  agent: string;
  action: string;
  status: "completed" | "in_progress" | "pending";
  timestamp: Date;
  impact: string;
}

export const PerformanceAgentView: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeView, setActiveView] = useState("overview");
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const views = [
    { id: "overview", label: "System Overview" },
    { id: "calendar", label: "Campaign Calendar" },
    { id: "perception", label: "Perception Layer" },
    { id: "reasoning", label: "Reasoning Engine" },
    { id: "actions", label: "Actions & Tools" },
    { id: "learning", label: "Learning & Memory" },
  ];

  const systemKPIs = [
    {
      title: "Campaign KPIs",
      value: "12 Active",
      change: "+18.2%",
      status: "excellent",
      icon: Target,
      color: "blue",
    },
    {
      title: "Agent Performance",
      value: "94.5%",
      change: "+2.3%",
      status: "excellent",
      icon: Bot,
      color: "green",
    },
    {
      title: "Budget Tracking",
      value: "$24.5K",
      change: "+8.7%",
      status: "good",
      icon: DollarSign,
      color: "orange",
    },
    {
      title: "System Health",
      value: "Optimal",
      change: "100%",
      status: "excellent",
      icon: Activity,
      color: "emerald",
    },
  ];

  const perceptionData = {
    triggers: [
      {
        id: "1",
        type: "warning" as const,
        message: "Budget overspend alert - Campaign A",
        timestamp: new Date(),
        metric: "Budget Utilization",
        value: "105%",
      },
      {
        id: "2",
        type: "alert" as const,
        message: "CTR below threshold - Holiday Campaign",
        timestamp: new Date(),
        metric: "Click-Through Rate",
        value: "1.2%",
      },
      {
        id: "3",
        type: "info" as const,
        message: "Creative fatigue detected - Ad Set B",
        timestamp: new Date(),
        metric: "Engagement Rate",
        value: "-15%",
      },
    ],
    dataStreams: [
      { name: "Campaign KPIs", status: "active", rate: "1.2K/s" },
      { name: "Segment Performance", status: "active", rate: "850/s" },
      { name: "Channel Saturation", status: "active", rate: "420/s" },
      { name: "Budget Tracking", status: "active", rate: "180/s" },
      { name: "Live Performance", status: "active", rate: "2.1K/s" },
    ],
  };

  const reasoningData = {
    analyses: [
      {
        id: "1",
        campaign: "Campaign X",
        issue: "Getting impressions but no leads",
        recommendation: "Calls Segment Agent - reassess scores",
        confidence: 92,
        priority: "high",
      },
      {
        id: "2",
        campaign: "Campaign A",
        issue: "Budget overspend detected",
        recommendation: "Pause Campaign A, prioritize B due to better CTR",
        confidence: 88,
        priority: "critical",
      },
      {
        id: "3",
        campaign: "Segment Analysis",
        issue: "Overlapping campaigns detected",
        recommendation: "Segment has overlapping campaigns",
        confidence: 95,
        priority: "medium",
      },
      {
        id: "4",
        campaign: "Creative Performance",
        issue: "Creative fatigue detected",
        recommendation: "Calls Creative Agent - generate fresh content",
        confidence: 85,
        priority: "high",
      },
    ],
    patterns: [
      { name: "Response by channel/segment", status: "identified", impact: "high" },
      { name: "Ongoing campaign results", status: "monitoring", impact: "medium" },
      { name: "Past decisions & outcomes", status: "learning", impact: "high" },
      { name: "Attribution patterns", status: "analyzing", impact: "medium" },
    ],
  };

  const actionsData = {
    tools: [
      {
        name: "LLM Analysis",
        description: "Summarize, correlate, recommend",
        status: "active",
        usage: "2.4M tokens",
      },
      {
        name: "Analytics & BI",
        description: "Track KPIs, generate dashboards",
        status: "active",
        usage: "1.2K queries",
      },
      {
        name: "Marketing Platform APIs",
        description: "Live Performance Data",
        status: "active",
        usage: "850 calls",
      },
    ],
    recentActions: [
      {
        id: "1",
        agent: "Campaign Agent",
        action: "Paused Campaign A",
        status: "completed" as const,
        timestamp: new Date(Date.now() - 120000),
        impact: "Prevented $450 overspend",
      },
      {
        id: "2",
        agent: "Segment Agent",
        action: "Reassessed audience scores",
        status: "completed" as const,
        timestamp: new Date(Date.now() - 180000),
        impact: "Improved targeting accuracy by 12%",
      },
      {
        id: "3",
        agent: "Creative Agent",
        action: "Generating fresh content",
        status: "in_progress" as const,
        timestamp: new Date(Date.now() - 60000),
        impact: "Expected +18% engagement",
      },
    ],
  };

  const learningData = {
    memory: {
      pastDecisions: "15,847 patterns",
      knowledgeNodes: "8,932 connections",
      exceptionsTracked: "342 edge cases",
      totalMemory: "2.4 GB",
    },
    insights: [
      {
        title: "KPIs by campaign/channel/segment/time",
        description: "Historical performance patterns identified across all dimensions",
        impact: "Improved prediction accuracy by 23%",
      },
      {
        title: "Exceptions & Human Overrides",
        description: "Learning from manual interventions and edge cases",
        impact: "Reduced false positives by 34%",
      },
      {
        title: "Cross-agent Optimization Patterns",
        description: "Identifying successful multi-agent collaboration strategies",
        impact: "Enhanced coordination efficiency by 28%",
      },
    ],
  };

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTriggerColor = (type: string) => {
    switch (type) {
      case "alert":
        return "border-red-500 bg-red-50";
      case "warning":
        return "border-yellow-500 bg-yellow-50";
      case "info":
        return "border-blue-500 bg-blue-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="text-red-500" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={20} />;
      default:
        return <Eye className="text-blue-500" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change.startsWith("+");
          return (
            <div
              key={index}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${kpi.color}-100 rounded-xl`}>
                  <Icon className={`text-${kpi.color}-600`} size={24} />
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{kpi.value}</h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>{kpi.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
              Agentic Key Components
            </h3>
            <Sparkles className="text-purple-500" size={20} />
          </div>
          <div className="space-y-3">
            {[
              { component: "Orchestration - Control", status: "active" },
              { component: "Cognition - Perception & Reasoning", status: "active" },
              { component: "Execution - Action & Tools", status: "active" },
              { component: "Adaption - Learning & Memory", status: "active" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg ${themeClasses.hover}`}
              >
                <span className={`${themeClasses.text} font-medium`}>{item.component}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Agent Key Objectives</h3>
            <Target className="text-blue-500" size={20} />
          </div>
          <div className="space-y-3">
            {[
              { objective: "System wide KPI monitoring", progress: 94 },
              { objective: "Cross agent optimization", progress: 87 },
              { objective: "Budget & resource allocation/tracking", progress: 92 },
              { objective: "Dashboard & Human-in-the-loop", progress: 89 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`${themeClasses.text} text-sm font-medium`}>
                    {item.objective}
                  </span>
                  <span className={`${themeClasses.textSecondary} text-sm`}>
                    {item.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerception = () => (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Eye className="text-blue-500" size={24} />
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Active Triggers</h3>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Live Monitoring</span>
          </div>
        </div>

        <div className="space-y-4">
          {perceptionData.triggers.map((trigger) => (
            <div
              key={trigger.id}
              className={`border-l-4 rounded-lg p-4 ${getTriggerColor(trigger.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getTriggerIcon(trigger.type)}
                  <div>
                    <h4 className={`font-semibold ${themeClasses.text}`}>{trigger.message}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>
                        {trigger.metric}
                      </span>
                      <span className="text-sm font-bold text-red-600">{trigger.value}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs ${themeClasses.textSecondary}`}>
                  {trigger.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <Database className="text-purple-500" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Data Streams</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {perceptionData.dataStreams.map((stream, idx) => (
            <div
              key={idx}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4 ${themeClasses.hover}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${themeClasses.text}`}>{stream.name}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.textSecondary}`}>{stream.status}</span>
                <span className={`text-sm font-semibold ${themeClasses.text}`}>
                  {stream.rate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReasoning = () => (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="text-purple-500" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Active Analysis</h3>
        </div>
        <div className="space-y-4">
          {reasoningData.analyses.map((analysis) => (
            <div
              key={analysis.id}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5 ${themeClasses.hover}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className={`font-semibold ${themeClasses.text}`}>{analysis.campaign}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(analysis.priority)}`}>
                      {analysis.priority}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>{analysis.issue}</p>
                  <div className="flex items-start space-x-2">
                    <ChevronRight className="text-blue-500 mt-0.5" size={16} />
                    <p className={`text-sm font-medium ${themeClasses.text}`}>
                      {analysis.recommendation}
                    </p>
                  </div>
                </div>
                <div className="ml-4 text-center">
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - analysis.confidence / 100)}`}
                        className="text-blue-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-bold ${themeClasses.text}`}>
                        {analysis.confidence}%
                      </span>
                    </div>
                  </div>
                  <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>Confidence</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <LineChart className="text-green-500" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Pattern Recognition</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasoningData.patterns.map((pattern, idx) => (
            <div
              key={idx}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${themeClasses.text}`}>{pattern.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pattern.status === "identified"
                      ? "bg-green-100 text-green-700"
                      : pattern.status === "monitoring"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {pattern.status}
                </span>
              </div>
              <span
                className={`text-sm ${
                  pattern.impact === "high" ? "text-red-600" : "text-yellow-600"
                } font-medium`}
              >
                {pattern.impact} impact
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="text-yellow-500" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Available Tools</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionsData.tools.map((tool, idx) => (
            <div
              key={idx}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold ${themeClasses.text}`}>{tool.name}</h4>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{tool.status}</span>
                <span className={`text-xs font-semibold ${themeClasses.text}`}>
                  {tool.usage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <PlayCircle className="text-blue-500" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Recent Actions</h3>
        </div>
        <div className="space-y-4">
          {actionsData.recentActions.map((action) => (
            <div
              key={action.id}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5 ${themeClasses.hover}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bot className="text-purple-500" size={18} />
                    <span className={`font-semibold ${themeClasses.text}`}>{action.agent}</span>
                  </div>
                  <p className={`${themeClasses.text} font-medium mb-2`}>{action.action}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    {action.status === "completed" ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : action.status === "in_progress" ? (
                      <Loader className="text-blue-500 animate-spin" size={16} />
                    ) : (
                      <Clock className="text-gray-400" size={16} />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        action.status === "completed"
                          ? "text-green-600"
                          : action.status === "in_progress"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {action.status.replace("_", " ")}
                    </span>
                    <span className={`text-xs ${themeClasses.textSecondary}`}>
                      {action.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary} flex items-center`}>
                    <ArrowUpRight className="text-green-500 mr-1" size={14} />
                    {action.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(learningData.memory).map(([key, value], idx) => (
          <div
            key={idx}
            className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}
          >
            <Database className="text-purple-500 mb-3" size={24} />
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{value}</h3>
            <p className={`${themeClasses.textSecondary} text-sm capitalize`}>
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
          </div>
        ))}
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="text-yellow-500" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Learning Insights</h3>
        </div>
        <div className="space-y-4">
          {learningData.insights.map((insight, idx) => (
            <div
              key={idx}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5 ${themeClasses.hover}`}
            >
              <h4 className={`font-semibold ${themeClasses.text} mb-2`}>{insight.title}</h4>
              <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                {insight.description}
              </p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm font-medium text-green-600">{insight.impact}</span>
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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Gauge className={`${themeClasses.text}`} size={32} />
              <h2
                className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
              >
                Agency Performance Monitor
              </h2>
            </div>
            <p className={`${themeClasses.textSecondary}`}>
              Real-time Campaign Oversight for Marketing Agencies
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isLive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {isLive ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  <span>Paused</span>
                </>
              )}
            </button>
            <span className={`text-sm ${themeClasses.textSecondary}`}>
              Updated {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}
        >
          <div className="flex space-x-2 overflow-x-auto">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                  activeView === view.id
                    ? `${themeClasses.accent} text-white shadow-lg`
                    : `${themeClasses.text} ${themeClasses.hover}`
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {activeView === "overview" && renderOverview()}
        {activeView === "calendar" && <PromotionCalendar />}
        {activeView === "perception" && renderPerception()}
        {activeView === "reasoning" && renderReasoning()}
        {activeView === "actions" && renderActions()}
        {activeView === "learning" && renderLearning()}
      </div>
    </div>
  );
};
