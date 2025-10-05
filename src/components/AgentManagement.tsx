import React, { useState } from "react";
import { Users, Shield, CheckCircle, Clock, AlertTriangle, Settings, Plus, Play, Pause, RotateCcw, CreditCard as Edit3, Trash2, MessageSquare, Brain, Zap, Target, BarChart3, Activity, Send, Bot, User, ChevronRight, ChevronLeft, Save, Download, Upload, Eye, Code, Sliders, TestTube, Cpu, Database, Network, Key, Lock, Unlock, RefreshCw, TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending' | 'training';
  permissions: string[];
  lastActive: string;
  performance: 'excellent' | 'good' | 'fair' | 'poor';
  tasksCompleted: number;
  description: string;
  model: string;
  version: string;
  accuracy: number;
  responseTime: number;
  successRate: number;
  capabilities: string[];
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
  };
  trainingData: {
    lastUpdated: string;
    dataPoints: number;
    sources: string[];
  };
  testResults: {
    id: string;
    query: string;
    response: string;
    score: number;
    timestamp: Date;
  }[];
}

interface TestMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  score?: number;
  metadata?: {
    responseTime: number;
    confidence: number;
    tokens: number;
  };
}

export const AgentManagement: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'testing' | 'tuning' | 'performance'>('overview');
  const [testMessages, setTestMessages] = useState<TestMessage[]>([]);
  const [testInput, setTestInput] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // const agents: Agent[] = [
  //   {
  //     id: "1",
  //     name: "Content Creator Agent",
  //     role: "Creative Generation",
  //     status: "active",
  //     permissions: ["create_campaigns", "edit_creatives", "view_analytics"],
  //     lastActive: "2 hours ago",
  //     performance: "excellent",
  //     tasksCompleted: 45,
  //     description: "Specialized in creating engaging marketing content across multiple platforms with brand consistency.",
  //     model: "GPT-4 Turbo",
  //     version: "v2.1.3",
  //     accuracy: 94.2,
  //     responseTime: 1.3,
  //     successRate: 87.8,
  //     capabilities: ["Content Writing", "Creative Ideation", "Brand Voice", "Multi-platform Adaptation"],
  //     parameters: {
  //       temperature: 0.7,
  //       maxTokens: 2048,
  //       topP: 0.9,
  //       frequencyPenalty: 0.1
  //     },
  //     trainingData: {
  //       lastUpdated: "2024-12-15",
  //       dataPoints: 15000,
  //       sources: ["Brand Guidelines", "Previous Campaigns", "Industry Best Practices"]
  //     },
  //     testResults: [
  //       {
  //         id: "1",
  //         query: "Create a social media post for holiday sale",
  //         response: "🎄 Holiday Magic is Here! ✨\n\nUnwrap incredible savings with our Holiday Sale! Get up to 50% off your favorite items and make this season unforgettable.\n\n🎁 Free shipping on orders over $75\n🎁 Extended returns through January\n🎁 Gift wrapping available\n\nShop now and spread the joy! Link in bio 👆\n\n#HolidaySale #GiftIdeas #ShopNow",
  //         score: 92,
  //         timestamp: new Date('2024-12-20T10:30:00')
  //       }
  //     ]
  //   },
  //   {
  //     id: "2",
  //     name: "Performance Optimizer",
  //     role: "Campaign Optimization",
  //     status: "active",
  //     permissions: ["optimize_campaigns", "view_analytics", "generate_reports"],
  //     lastActive: "15 minutes ago",
  //     performance: "good",
  //     tasksCompleted: 32,
  //     description: "Analyzes campaign performance data and provides optimization recommendations for better ROI.",
  //     model: "Claude-3 Sonnet",
  //     version: "v1.8.2",
  //     accuracy: 91.5,
  //     responseTime: 0.8,
  //     successRate: 89.3,
  //     capabilities: ["Data Analysis", "Performance Optimization", "A/B Testing", "ROI Calculation"],
  //     parameters: {
  //       temperature: 0.3,
  //       maxTokens: 1024,
  //       topP: 0.8,
  //       frequencyPenalty: 0.0
  //     },
  //     trainingData: {
  //       lastUpdated: "2024-12-18",
  //       dataPoints: 25000,
  //       sources: ["Campaign Data", "Performance Metrics", "Industry Benchmarks"]
  //     },
  //     testResults: []
  //   },
  //   {
  //     id: "3",
  //     name: "Strategy Analyst",
  //     role: "Strategic Planning",
  //     status: "training",
  //     permissions: ["create_strategies", "approve_campaigns", "view_all_data"],
  //     lastActive: "1 day ago",
  //     performance: "fair",
  //     tasksCompleted: 28,
  //     description: "Develops comprehensive marketing strategies based on market analysis and business objectives.",
  //     model: "GPT-4",
  //     version: "v1.5.1",
  //     accuracy: 88.7,
  //     responseTime: 2.1,
  //     successRate: 82.4,
  //     capabilities: ["Strategic Planning", "Market Analysis", "Competitive Research", "Goal Setting"],
  //     parameters: {
  //       temperature: 0.5,
  //       maxTokens: 3072,
  //       topP: 0.85,
  //       frequencyPenalty: 0.2
  //     },
  //     trainingData: {
  //       lastUpdated: "2024-12-10",
  //       dataPoints: 12000,
  //       sources: ["Market Research", "Strategy Frameworks", "Case Studies"]
  //     },
  //     testResults: []
  //   },
  //   {
  //     id: "4",
  //     name: "Quality Assurance Bot",
  //     role: "Content Review",
  //     status: "inactive",
  //     permissions: ["review_content", "approve_creatives"],
  //     lastActive: "3 days ago",
  //     performance: "good",
  //     tasksCompleted: 15,
  //     description: "Reviews and validates content for brand compliance, quality standards, and regulatory requirements.",
  //     model: "Custom Model",
  //     version: "v3.0.1",
  //     accuracy: 96.8,
  //     responseTime: 0.5,
  //     successRate: 94.2,
  //     capabilities: ["Content Review", "Brand Compliance", "Quality Control", "Regulatory Check"],
  //     parameters: {
  //       temperature: 0.1,
  //       maxTokens: 512,
  //       topP: 0.7,
  //       frequencyPenalty: 0.0
  //     },
  //     trainingData: {
  //       lastUpdated: "2024-12-12",
  //       dataPoints: 8000,
  //       sources: ["Brand Guidelines", "Compliance Rules", "Quality Standards"]
  //     },
  //     testResults: []
  //   }
  // ];
    const agents: Agent[] = [
    {
      id: "1",
      name: "Segmentation Agent",
      role: "Creative Generation",
      status: "active",
      permissions: ["create_campaigns", "edit_creatives", "view_analytics"],
      lastActive: "2 hours ago",
      performance: "excellent",
      tasksCompleted: 45,
      description: "Specialized in creating engaging marketing content across multiple platforms with brand consistency.",
      model: "GPT-4 Turbo",
      version: "v2.1.3",
      accuracy: 94.2,
      responseTime: 1.3,
      successRate: 87.8,
      capabilities: ["Content Writing", "Creative Ideation", "Brand Voice", "Multi-platform Adaptation"],
      parameters: {
        temperature: 0.7,
        maxTokens: 2048,
        topP: 0.9,
        frequencyPenalty: 0.1
      },
      trainingData: {
        lastUpdated: "2024-12-15",
        dataPoints: 15000,
        sources: ["Brand Guidelines", "Previous Campaigns", "Industry Best Practices"]
      },
      testResults: [
        {
          id: "1",
          query: "Create a social media post for holiday sale",
          response: "🎄 Holiday Magic is Here! ✨\n\nUnwrap incredible savings with our Holiday Sale! Get up to 50% off your favorite items and make this season unforgettable.\n\n🎁 Free shipping on orders over $75\n🎁 Extended returns through January\n🎁 Gift wrapping available\n\nShop now and spread the joy! Link in bio 👆\n\n#HolidaySale #GiftIdeas #ShopNow",
          score: 92,
          timestamp: new Date('2024-12-20T10:30:00')
        }
      ]
    },
    {
      id: "2",
      name: "Performance Agent",
      role: "Campaign Optimization",
      status: "active",
      permissions: ["optimize_campaigns", "view_analytics", "generate_reports"],
      lastActive: "15 minutes ago",
      performance: "good",
      tasksCompleted: 32,
      description: "Analyzes campaign performance data and provides optimization recommendations for better ROI.",
      model: "Claude-3 Sonnet",
      version: "v1.8.2",
      accuracy: 91.5,
      responseTime: 0.8,
      successRate: 89.3,
      capabilities: ["Data Analysis", "Performance Optimization", "A/B Testing", "ROI Calculation"],
      parameters: {
        temperature: 0.3,
        maxTokens: 1024,
        topP: 0.8,
        frequencyPenalty: 0.0
      },
      trainingData: {
        lastUpdated: "2024-12-18",
        dataPoints: 25000,
        sources: ["Campaign Data", "Performance Metrics", "Industry Benchmarks"]
      },
      testResults: []
    },
    {
      id: "3",
      name: "Causal Agent",
      role: "Strategic Planning",
      status: "training",
      permissions: ["create_strategies", "approve_campaigns", "view_all_data"],
      lastActive: "1 day ago",
      performance: "fair",
      tasksCompleted: 28,
      description: "Develops comprehensive marketing strategies based on market analysis and business objectives.",
      model: "GPT-4",
      version: "v1.5.1",
      accuracy: 88.7,
      responseTime: 2.1,
      successRate: 82.4,
      capabilities: ["Strategic Planning", "Market Analysis", "Competitive Research", "Goal Setting"],
      parameters: {
        temperature: 0.5,
        maxTokens: 3072,
        topP: 0.85,
        frequencyPenalty: 0.2
      },
      trainingData: {
        lastUpdated: "2024-12-10",
        dataPoints: 12000,
        sources: ["Market Research", "Strategy Frameworks", "Case Studies"]
      },
      testResults: []
    },
    {
      id: "4",
      name: "Quality Assurance Bot",
      role: "Content Review",
      status: "inactive",
      permissions: ["review_content", "approve_creatives"],
      lastActive: "3 days ago",
      performance: "good",
      tasksCompleted: 15,
      description: "Reviews and validates content for brand compliance, quality standards, and regulatory requirements.",
      model: "Custom Model",
      version: "v3.0.1",
      accuracy: 96.8,
      responseTime: 0.5,
      successRate: 94.2,
      capabilities: ["Content Review", "Brand Compliance", "Quality Control", "Regulatory Check"],
      parameters: {
        temperature: 0.1,
        maxTokens: 512,
        topP: 0.7,
        frequencyPenalty: 0.0
      },
      trainingData: {
        lastUpdated: "2024-12-12",
        dataPoints: 8000,
        sources: ["Brand Guidelines", "Compliance Rules", "Quality Standards"]
      },
      testResults: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "training": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle size={16} className="text-green-600" />;
      case "training": return <RefreshCw size={16} className="text-blue-600 animate-spin" />;
      case "pending": return <Clock size={16} className="text-yellow-600" />;
      case "inactive": return <AlertTriangle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "fair": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const handleTestAgent = async () => {
    if (!testInput.trim() || !selectedAgent) return;

    const userMessage: TestMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: testInput,
      timestamp: new Date()
    };

    setTestMessages(prev => [...prev, userMessage]);
    setTestInput('');
    setIsTesting(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: TestMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateAgentResponse(selectedAgent, testInput),
        timestamp: new Date(),
        score: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
        metadata: {
          responseTime: Math.random() * 2 + 0.5, // Random response time
          confidence: Math.random() * 0.3 + 0.7, // Random confidence 70-100%
          tokens: Math.floor(Math.random() * 200) + 50 // Random token count
        }
      };

      setTestMessages(prev => [...prev, agentResponse]);
      setIsTesting(false);
    }, 1500);
  };

  const generateAgentResponse = (agent: Agent, input: string): string => {
    const responses = {
      "Content Creator Agent": [
        "I'll create engaging content that aligns with your brand voice and resonates with your target audience. Here's my recommendation...",
        "Based on current trends and your brand guidelines, I suggest this creative approach...",
        "Let me craft compelling copy that drives engagement and conversions..."
      ],
      "Performance Optimizer": [
        "Analyzing your campaign data, I've identified several optimization opportunities...",
        "Based on performance metrics, I recommend adjusting these parameters for better ROI...",
        "The data shows we can improve performance by focusing on these key areas..."
      ],
      "Strategy Analyst": [
        "After analyzing market conditions and competitive landscape, here's my strategic recommendation...",
        "Based on your business objectives, I suggest this comprehensive approach...",
        "The market analysis indicates we should focus on these strategic priorities..."
      ],
      "Quality Assurance Bot": [
        "Content review complete. I've identified these areas for improvement...",
        "Brand compliance check passed. The content meets all guidelines...",
        "Quality assessment shows high standards with minor suggestions for enhancement..."
      ]
    };

    const agentResponses = responses[agent.name as keyof typeof responses] || [
      "I'm processing your request and will provide a detailed response based on my training..."
    ];

    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  const updateAgentParameter = (agent: Agent, parameter: keyof Agent['parameters'], value: number) => {
    // In a real app, this would update the agent's parameters
    console.log(`Updating ${agent.name} ${parameter} to ${value}`);
  };

  if (selectedAgent) {
    return (
      <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
        <div className="space-y-6 p-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedAgent(null)}
                className={`p-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors`}
              >
                <ChevronLeft size={20} className={themeClasses.text} />
              </button>
              <div>
                <h2 className={`text-2xl font-bold ${themeClasses.text}`}>{selectedAgent.name}</h2>
                <p className={`${themeClasses.textSecondary}`}>{selectedAgent.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAgent.status)}`}>
                {getStatusIcon(selectedAgent.status)}
                <span className="ml-1 capitalize">{selectedAgent.status}</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'testing', label: 'Testing', icon: TestTube },
                { id: 'tuning', label: 'Tuning', icon: Sliders },
                { id: 'performance', label: 'Performance', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id as any)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeView === tab.id
                        ? `${themeClasses.accent} text-white`
                        : `${themeClasses.text} ${themeClasses.hover}`
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overview Tab */}
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Agent Details */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Agent Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Model</p>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedAgent.model}</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>Version {selectedAgent.version}</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Accuracy</p>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedAgent.accuracy}%</p>
                    <p className={`text-xs ${getPerformanceColor(selectedAgent.performance)}`}>{selectedAgent.performance}</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Response Time</p>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedAgent.responseTime}s</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>Average</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Success Rate</p>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedAgent.successRate}%</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>Last 30 days</p>
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Permissions</h3>
                <div className="space-y-2">
                  {selectedAgent.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className={`font-medium ${themeClasses.text}`}>{permission.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <Lock className="text-green-600" size={16} />
                        <span className="text-sm text-green-600">Granted</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Data */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Training Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Last Updated</p>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedAgent.trainingData.lastUpdated}</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Data Points</p>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedAgent.trainingData.dataPoints.toLocaleString()}</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Sources</p>
                    <div className="space-y-1">
                      {selectedAgent.trainingData.sources.map((source, index) => (
                        <p key={index} className={`text-sm ${themeClasses.text}`}>• {source}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testing Tab */}
          {activeView === 'testing' && (
            <div className="space-y-6">
              {/* Test Interface */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Agent Testing Interface</h3>
                
                {/* Chat Interface */}
                <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl mb-4`}>
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {testMessages.length === 0 ? (
                      <div className="text-center py-12">
                        <Bot className={`${themeClasses.textSecondary} mx-auto mb-4`} size={48} />
                        <p className={`${themeClasses.textSecondary} text-lg mb-4`}>
                          Test {selectedAgent.name} by sending queries and evaluating responses
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                          {[
                            'Create a social media post for our new product',
                            'Analyze the performance of our last campaign',
                            'Suggest improvements for our content strategy',
                            'Review this ad copy for brand compliance'
                          ].map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setTestInput(suggestion)}
                              className={`px-4 py-3 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-sm text-left`}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {testMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-3xl ${
                              message.type === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : `${themeClasses.cardBg} ${themeClasses.border} border`
                            } rounded-xl p-4`}>
                              <div className="flex items-start space-x-3">
                                {message.type === 'agent' && (
                                  <Bot className="text-blue-500 mt-1" size={20} />
                                )}
                                <div className="flex-1">
                                  <p className={`${message.type === 'user' ? 'text-white' : themeClasses.text}`}>
                                    {message.content}
                                  </p>
                                  {message.metadata && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                        Score: {message.score}%
                                      </span>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                        {message.metadata.responseTime.toFixed(1)}s
                                      </span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                        {Math.round(message.metadata.confidence * 100)}% confidence
                                      </span>
                                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                                        {message.metadata.tokens} tokens
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {message.type === 'user' && (
                                  <User className="text-white mt-1" size={20} />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isTesting && (
                          <div className="flex justify-start">
                            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4`}>
                              <div className="flex items-center space-x-3">
                                <Bot className="text-blue-500 animate-pulse" size={20} />
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className={`${themeClasses.textSecondary} text-sm`}>Processing...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className={`border-t ${themeClasses.border} p-4`}>
                    <div className="flex items-center space-x-3">
                      <textarea
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        placeholder="Enter your test query for the agent..."
                        className={`flex-1 p-3 bg-transparent ${themeClasses.text} placeholder-gray-400 resize-none focus:outline-none`}
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleTestAgent();
                          }
                        }}
                      />
                      <button
                        onClick={handleTestAgent}
                        disabled={!testInput.trim() || isTesting}
                        className={`p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.accent} text-white`}
                      >
                        {isTesting ? (
                          <div className="animate-spin">
                            <RefreshCw size={20} />
                          </div>
                        ) : (
                          <Send size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Test Actions */}
                <div className="flex space-x-3">
                  <button className={`px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
                    <Download size={16} className="mr-2" />
                    Export Test Results
                  </button>
                  <button 
                    onClick={() => setTestMessages([])}
                    className={`px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tuning Tab */}
          {activeView === 'tuning' && (
            <div className="space-y-6">
              {/* Model Parameters */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Model Parameters</h3>
                <div className="space-y-6">
                  {Object.entries(selectedAgent.parameters).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className={`font-medium ${themeClasses.text} capitalize`}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <span className={`text-sm ${themeClasses.textSecondary}`}>{value}</span>
                      </div>
                      <input
                        type="range"
                        min={key === 'maxTokens' ? 100 : 0}
                        max={key === 'maxTokens' ? 4096 : 1}
                        step={key === 'maxTokens' ? 100 : 0.1}
                        value={value}
                        onChange={(e) => updateAgentParameter(selectedAgent, key as keyof Agent['parameters'], parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{key === 'maxTokens' ? '100' : '0'}</span>
                        <span>{key === 'maxTokens' ? '4096' : '1'}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                    <Save size={16} className="mr-2" />
                    Save Parameters
                  </button>
                  <button className={`px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
                    <RotateCcw size={16} className="mr-2" />
                    Reset to Default
                  </button>
                </div>
              </div>

              {/* Training Configuration */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Training Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Training Data Sources</label>
                    <div className="space-y-2">
                      {selectedAgent.trainingData.sources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className={`font-medium ${themeClasses.text}`}>{source}</span>
                          <button className="text-red-500 hover:text-red-700 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className={`mt-2 px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
                      <Plus size={16} className="mr-2" />
                      Add Data Source
                    </button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                      <RefreshCw size={16} className="mr-2" />
                      Retrain Agent
                    </button>
                    <button className={`px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
                      <Upload size={16} className="mr-2" />
                      Upload Training Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeView === 'performance' && (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Performance Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Tasks Completed</p>
                      <TrendingUp className="text-green-500" size={16} />
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{selectedAgent.tasksCompleted}</p>
                    <p className="text-xs text-green-600">+12% this week</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Accuracy</p>
                      <TrendingUp className="text-green-500" size={16} />
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{selectedAgent.accuracy}%</p>
                    <p className="text-xs text-green-600">+2.1% this month</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Response Time</p>
                      <TrendingDown className="text-green-500" size={16} />
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{selectedAgent.responseTime}s</p>
                    <p className="text-xs text-green-600">-0.3s improvement</p>
                  </div>
                  <div className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Success Rate</p>
                      <TrendingUp className="text-green-500" size={16} />
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{selectedAgent.successRate}%</p>
                    <p className="text-xs text-green-600">+5.2% this month</p>
                  </div>
                </div>
              </div>

              {/* Recent Test Results */}
              {selectedAgent.testResults.length > 0 && (
                <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                  <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Recent Test Results</h3>
                  <div className="space-y-4">
                    {selectedAgent.testResults.map((result) => (
                      <div key={result.id} className={`p-4 ${themeClasses.cardBg} rounded-xl`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${themeClasses.text}`}>Test Query</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.score >= 90 ? 'bg-green-100 text-green-800' :
                            result.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Score: {result.score}%
                          </span>
                        </div>
                        <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>{result.query}</p>
                        <p className={`text-sm ${themeClasses.text} bg-gray-50 p-3 rounded-lg`}>{result.response}</p>
                        <p className={`text-xs ${themeClasses.textSecondary} mt-2`}>
                          {result.timestamp.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main agents list view
  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
        <div className="text-center flex-1">
          <div className="flex items-center justify-start mb-2">
            <Users className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
            <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
              Agent Management
            </h2>
          </div>
          <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
            Monitor, test, and tune your AI agents with individual control panels
          </p>
        </div>

        {/* Agent Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300 cursor-pointer transform hover:scale-105 ${themeClasses.shadow}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bot className="text-blue-600" size={24} />
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(agent.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
              
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{agent.name}</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>{agent.role}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={`${themeClasses.textSecondary}`}>Accuracy:</span>
                  <span className={`font-medium ${themeClasses.text}`}>{agent.accuracy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`${themeClasses.textSecondary}`}>Tasks:</span>
                  <span className={`font-medium ${themeClasses.text}`}>{agent.tasksCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`${themeClasses.textSecondary}`}>Performance:</span>
                  <span className={`font-medium ${getPerformanceColor(agent.performance)}`}>
                    {agent.performance}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <span className={`text-xs ${themeClasses.textSecondary}`}>
                  Last active: {agent.lastActive}
                </span>
                <ChevronRight className={`${themeClasses.textSecondary}`} size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className={`p-4 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-left`}>
              <Plus className="text-blue-600 mb-2" size={24} />
              <h4 className={`font-medium ${themeClasses.text} mb-1`}>Create New Agent</h4>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Deploy a new AI agent with custom capabilities</p>
            </button>
            <button className={`p-4 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-left`}>
              <Upload className="text-green-600 mb-2" size={24} />
              <h4 className={`font-medium ${themeClasses.text} mb-1`}>Import Agent</h4>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Import pre-trained agent from marketplace</p>
            </button>
            <button className={`p-4 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-left`}>
              <Settings className="text-purple-600 mb-2" size={24} />
              <h4 className={`font-medium ${themeClasses.text} mb-1`}>Global Settings</h4>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Configure system-wide agent policies</p>
            </button>
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
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};