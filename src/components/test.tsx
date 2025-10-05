import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Target, TrendingUp, Zap, Send, Bot, User, Lightbulb, Brain, Rocket, Wand2, ChevronDown, Palette, Settings, Plus, Calendar, DollarSign, Users, Eye, MousePointer, BarChart3, Globe, Smartphone, Monitor, Tablet, Facebook, Instagram, Twitter, Youtube, Linkedin, Search, Mail, MessageSquare, Image, Video, FileText, PieChart, Clock, CheckCircle, AlertCircle, Play, Pause, RotateCcw, Download, Share2, Copy, CreditCard as Edit3, Trash2, Filter, Import as SortAsc, MoreHorizontal, Database, Layers, GitBranch } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ThinkingTask {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed';
  description: string;
  details?: string[];
  progress?: number;
}

interface CampaignQuery {
  id: string;
  query: string;
  reasoning: string;
  keyInsights: string[];
  status: 'draft' | 'confirmed' | 'applied';
  timestamp: Date;
}

export const StrategyStudio: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [thinkingTasks, setThinkingTasks] = useState<ThinkingTask[]>([]);
  const [campaignQueries, setCampaignQueries] = useState<CampaignQuery[]>([]);
  const [activeQuery, setActiveQuery] = useState<CampaignQuery | null>(null);
  const [showQueryDetails, setShowQueryDetails] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const simulateThinkingTasks = () => {
    const tasks: ThinkingTask[] = [
      {
        id: '1',
        title: 'Market Analysis',
        status: 'processing',
        description: 'Analyzing target market and competition',
        details: ['Identifying target demographics', 'Competitive landscape research', 'Market size estimation'],
        progress: 65
      },
      {
        id: '2',
        title: 'Audience Segmentation',
        status: 'processing',
        description: 'Defining audience segments and personas',
        details: ['Primary audience identification', 'Secondary audience analysis', 'Behavioral patterns'],
        progress: 40
      },
      {
        id: '3',
        title: 'Channel Strategy',
        status: 'pending',
        description: 'Selecting optimal marketing channels',
        details: ['Platform effectiveness analysis', 'Budget allocation planning', 'Timeline optimization']
      },
      {
        id: '4',
        title: 'Creative Direction',
        status: 'pending',
        description: 'Developing creative concepts and messaging',
        details: ['Brand voice alignment', 'Visual concept development', 'Message testing strategy']
      },
      {
        id: '5',
        title: 'Performance Metrics',
        status: 'pending',
        description: 'Setting KPIs and success metrics',
        details: ['Goal definition', 'Measurement framework', 'Attribution modeling']
      }
    ];

    setThinkingTasks(tasks);

    // Simulate task progression
    let taskIndex = 0;
    const interval = setInterval(() => {
      if (taskIndex < tasks.length) {
        setThinkingTasks(prev => prev.map((task, index) => {
          if (index === taskIndex) {
            return { ...task, status: 'processing', progress: 0 };
          }
          if (index < taskIndex) {
            return { ...task, status: 'completed', progress: 100 };
          }
          return task;
        }));

        // Progress the current task
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setThinkingTasks(prev => prev.map((task, index) => 
              index === taskIndex ? { ...task, status: 'completed', progress: 100 } : task
            ));
            taskIndex++;
          } else {
            setThinkingTasks(prev => prev.map((task, index) => 
              index === taskIndex ? { ...task, progress } : task
            ));
          }
        }, 300);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  const handleSendMessage = async () => {
    if (!campaignPrompt.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: campaignPrompt,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCampaignPrompt('');
    setIsGenerating(true);

    // Start thinking tasks simulation
    simulateThinkingTasks();

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
        suggestions: [
          'Create detailed campaign brief',
          'Generate audience personas',
          'Develop creative concepts',
          'Set performance targets'
        ]
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);

      // Generate campaign query
      const newQuery: CampaignQuery = {
        id: Date.now().toString(),
        query: userMessage.content,
        reasoning: "Based on market analysis and competitive research, this campaign should focus on digital-first approach with emphasis on video content and social media engagement.",
        keyInsights: [
          "Target audience shows 65% higher engagement with video content",
          "Competitor analysis reveals gap in mobile-first messaging",
          "Seasonal trends indicate 40% increase in conversion rates during Q4",
          "Cross-platform attribution shows 3.2x ROAS with integrated approach"
        ],
        status: 'draft',
        timestamp: new Date()
      };

      setCampaignQueries(prev => [...prev, newQuery]);
      setActiveQuery(newQuery);
    }, 8000);
  };

  const generateAIResponse = (prompt: string): string => {
    return `I've analyzed your campaign requirements and developed a comprehensive strategy. Here's my recommendation:

**Campaign Overview:**
Based on your objectives, I recommend a multi-channel approach focusing on digital engagement with strong emphasis on data-driven optimization.

**Key Strategic Elements:**
• **Target Audience**: Primary focus on 25-45 demographic with high digital engagement
• **Channel Mix**: 60% social media, 25% search, 15% display advertising
• **Budget Allocation**: Front-loaded approach with 40% in first month for maximum impact
• **Creative Strategy**: Video-first content with strong brand storytelling

**Expected Outcomes:**
• 25-35% increase in brand awareness
• 15-20% improvement in conversion rates
• 3.5x return on advertising spend
• 40% growth in qualified leads

The thinking process on the right shows how I arrived at these recommendations. Would you like me to proceed with creating the detailed campaign brief?`;
  };

  const confirmQuery = (queryId: string) => {
    setCampaignQueries(prev => prev.map(query => 
      query.id === queryId ? { ...query, status: 'confirmed' } : query
    ));
    
    // Simulate knowledge graph update
    setTimeout(() => {
      setCampaignQueries(prev => prev.map(query => 
        query.id === queryId ? { ...query, status: 'applied' } : query
      ));
    }, 1500);
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'pending': return <Clock size={16} className="text-gray-400" />;
      default: return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-200';
      case 'processing': return 'bg-blue-100 border-blue-200';
      case 'pending': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getQueryStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-all duration-500`}>
      <div className="flex h-screen">
        {/* Main Content Area - Centered */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto p-6">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Strategy Studio</h2>
            <p className={`${themeClasses.textSecondary}`}>
              AI-powered campaign strategy development with intelligent reasoning
            </p>
          </div>

          {/* AI Campaign Assistant */}
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-3xl p-8 ${themeClasses.shadow} flex-1 flex flex-col`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2 flex items-center`}>
                  <Brain className="mr-3 text-purple-500" size={28} />
                  KRAFT AI Strategy Assistant
                </h3>
                <p className={`${themeClasses.textSecondary}`}>
                  Describe your campaign goals and watch AI develop comprehensive strategy
                </p>
              </div>
              <div className="hidden md:block">
                <div className={`w-20 h-20 ${themeClasses.gradient} rounded-2xl flex items-center justify-center`}>
                  <Wand2 size={32} className="text-white" />
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl mb-6 flex-1 flex flex-col`}>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className={`${themeClasses.textSecondary} mx-auto mb-4`} size={48} />
                    <p className={`${themeClasses.textSecondary} text-lg mb-6`}>
                      Hi! I'm KRAFT AI. Tell me about your campaign goals and I'll develop a comprehensive strategy with detailed reasoning.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {[
                        'Create a holiday sales campaign for fashion brand',
                        'Launch awareness campaign for new SaaS product',
                        'Develop retention campaign for existing customers',
                        'Build lead generation campaign for B2B services'
                      ].map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setCampaignPrompt(suggestion)}
                          className={`px-4 py-3 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-sm text-left`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-3xl ${
                          message.type === 'user' 
                            ? 'bg-purple-500 text-white' 
                            : `${themeClasses.cardBg} ${themeClasses.border} border`
                        } rounded-2xl p-6`}>
                          <div className="flex items-start space-x-3">
                            {message.type === 'assistant' && (
                              <Bot className="text-purple-500 mt-1" size={20} />
                            )}
                            <div className="flex-1">
                              <p className={`${message.type === 'user' ? 'text-white' : themeClasses.text} whitespace-pre-line`}>
                                {message.content}
                              </p>
                              {message.suggestions && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {message.suggestions.map((suggestion, index) => (
                                    <button
                                      key={index}
                                      className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors"
                                    >
                                      {suggestion}
                                    </button>
                                  ))}
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
                    {isGenerating && (
                      <div className="flex justify-start">
                        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
                          <div className="flex items-center space-x-3">
                            <Bot className="text-purple-500 animate-pulse" size={20} />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className={`${themeClasses.textSecondary} text-sm`}>Analyzing and strategizing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className={`border-t ${themeClasses.border} p-4`}>
                <div className="flex items-center space-x-3">
                  <textarea
                    value={campaignPrompt}
                    onChange={(e) => setCampaignPrompt(e.target.value)}
                    placeholder="Describe your campaign goals, target audience, budget, timeline, or any specific requirements..."
                    className={`flex-1 p-4 bg-transparent ${themeClasses.text} placeholder-gray-400 resize-none focus:outline-none text-lg`}
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!campaignPrompt.trim() || isGenerating}
                    className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.accent} text-white ${themeClasses.shadow}`}
                  >
                    {isGenerating ? (
                      <div className="animate-spin">
                        <Sparkles size={24} />
                      </div>
                    ) : (
                      <Send size={24} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Thinking Tasks */}
        <div className="w-96 p-6 border-l border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="space-y-6">
            {/* Thinking Process Header */}
            <div>
              <h3 className={`text-lg font-bold ${themeClasses.text} mb-2 flex items-center`}>
                <GitBranch className="mr-2 text-blue-500" size={20} />
                AI Thinking Process
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Watch how AI analyzes and develops your campaign strategy
              </p>
            </div>

            {/* Thinking Tasks */}
            <div className="space-y-3">
              {thinkingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${getTaskStatusColor(task.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTaskStatusIcon(task.status)}
                      <h4 className={`font-medium ${themeClasses.text} text-sm`}>{task.title}</h4>
                    </div>
                    {task.status === 'processing' && task.progress && (
                      <span className="text-xs text-blue-600 font-medium">{Math.round(task.progress)}%</span>
                    )}
                  </div>
                  
                  <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>{task.description}</p>
                  
                  {task.status === 'processing' && task.progress && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {task.details && task.status !== 'pending' && (
                    <div className="space-y-1">
                      {task.details.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Campaign Queries Section */}
            {campaignQueries.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${themeClasses.text} flex items-center`}>
                    <Database className="mr-2 text-green-500" size={20} />
                    Campaign Queries
                  </h3>
                  <button
                    onClick={() => setShowQueryDetails(!showQueryDetails)}
                    className={`p-2 rounded-lg ${themeClasses.hover} transition-colors`}
                  >
                    <ChevronDown className={`transform transition-transform ${showQueryDetails ? 'rotate-180' : ''}`} size={16} />
                  </button>
                </div>

                {campaignQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-4 rounded-xl border-2 ${
                      query.status === 'applied' ? 'bg-green-50 border-green-200' :
                      query.status === 'confirmed' ? 'bg-blue-50 border-blue-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQueryStatusColor(query.status)}`}>
                        {query.status}
                      </span>
                      {query.status === 'applied' && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Layers size={12} />
                          <span className="text-xs">In Knowledge Graph</span>
                        </div>
                      )}
                    </div>

                    {showQueryDetails && (
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Query:</h5>
                          <p className="text-xs text-gray-600 bg-white p-2 rounded border">{query.query}</p>
                        </div>

                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Reasoning:</h5>
                          <p className="text-xs text-gray-600 bg-white p-2 rounded border">{query.reasoning}</p>
                        </div>

                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Key Insights:</h5>
                          <div className="space-y-1">
                            {query.keyInsights.map((insight, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Lightbulb size={10} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-600">{insight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {query.status === 'draft' && (
                          <button
                            onClick={() => confirmQuery(query.id)}
                            className="w-full py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
                          >
                            Confirm & Add to Knowledge Graph
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Knowledge Graph Status */}
            {campaignQueries.some(q => q.status === 'applied') && (
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="text-green-600" size={16} />
                  <h4 className="font-medium text-green-800 text-sm">Knowledge Graph Updated</h4>
                </div>
                <p className="text-xs text-green-700">
                  Campaign insights have been added to the knowledge graph for future query optimization.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};