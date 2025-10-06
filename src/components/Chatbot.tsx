import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Sparkles, Lightbulb } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  activeTab?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ activeTab = 'dashboard' }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousTabRef = useRef<string>(activeTab);

  const tabContextInfo: Record<string, any> = {
    'dashboard': {
      name: 'Dashboard',
      description: 'Your central hub for campaign overview and quick insights',
      features: [
        'View all active campaigns at a glance',
        'Monitor real-time performance metrics',
        'Quick access to key actions',
        'AI-powered insights and recommendations',
        'Track campaign health and status'
      ],
      suggestions: [
        'What campaigns are currently running?',
        'Show me top performing campaigns',
        'How do I create a new campaign?',
        'What are AI Insights?'
      ],
      tips: [
        'Use the dashboard to get a quick overview of all your marketing activities',
        'Check the AI Insights section for optimization recommendations',
        'Click on any campaign card to see detailed analytics'
      ]
    },
    'strategy': {
      name: 'Strategy Studio',
      description: 'AI-powered campaign strategy creation and planning',
      features: [
        'Create campaigns with AI assistance',
        'Generate comprehensive campaign strategies',
        'Set campaign objectives and target audience',
        'Define budget and timeline',
        'Get AI-powered market insights',
        'Manage and track campaign progress'
      ],
      suggestions: [
        'How do I create a new campaign?',
        'What makes a good campaign strategy?',
        'How to set campaign objectives?',
        'Can AI help with budget allocation?'
      ],
      tips: [
        'Be specific with your campaign goals for better AI suggestions',
        'Use the advanced options to fine-tune your strategy',
        'Review AI-generated insights before finalizing your campaign'
      ]
    },
    'creator': {
      name: 'Creator Studio',
      description: 'AI-powered creative asset generation platform',
      features: [
        'Generate images and videos with AI',
        'Create brand-compliant content',
        'Multi-platform optimization',
        'Reference image verification',
        'Real-time preview across platforms',
        'Batch asset generation',
        'Edit and refine AI-generated content'
      ],
      suggestions: [
        'How do I generate images?',
        'What is Brand Kit integration?',
        'How to upload reference images?',
        'Can I preview on different platforms?'
      ],
      tips: [
        'Select your Brand Kit before generating to ensure brand consistency',
        'Use reference images for more targeted AI generation',
        'Preview your assets on multiple platforms before finalizing'
      ]
    },
    'brandkit': {
      name: 'Brand Kit',
      description: 'Manage your brand identity and assets',
      features: [
        'Store and manage logos',
        'Define color palettes',
        'Set typography standards',
        'Save image styles and preferences',
        'Create multiple brand kits',
        'Ensure brand consistency across all content'
      ],
      suggestions: [
        'How to add a new logo?',
        'How to create a color palette?',
        'What file formats are supported?',
        'Can I have multiple brand kits?'
      ],
      tips: [
        'Create separate brand kits for different sub-brands or campaigns',
        'Upload high-quality logos for best results',
        'Define your brand colors to maintain consistency'
      ]
    },
    'marketingstudio': {
      name: 'Marketing Studio',
      description: 'Execute and monitor marketing campaigns',
      features: [
        'Launch approved campaigns',
        'Real-time metrics tracking',
        'AI-powered performance insights',
        'Multi-platform management',
        'Budget monitoring and alerts',
        'A/B testing management',
        'Campaign scheduling'
      ],
      suggestions: [
        'How to launch a campaign?',
        'What are AI Insights?',
        'How to monitor performance?',
        'Can I schedule campaigns?'
      ],
      tips: [
        'Monitor your campaigns regularly for optimal performance',
        'Use AI insights to optimize your campaigns',
        'Set up alerts for important metrics'
      ]
    },
    'performance': {
      name: 'Performance Cockpit',
      description: 'Advanced analytics and performance monitoring',
      features: [
        'Deep-dive campaign analytics',
        'Custom reporting and dashboards',
        'ROI and ROAS tracking',
        'Cross-platform performance comparison',
        'Predictive analytics',
        'Export reports and data'
      ],
      suggestions: [
        'How to create custom reports?',
        'What metrics should I track?',
        'How to compare campaign performance?',
        'Can I export performance data?'
      ],
      tips: [
        'Set up custom dashboards for different stakeholders',
        'Use predictive analytics to forecast campaign outcomes',
        'Compare performance across platforms to optimize budget allocation'
      ]
    },
    'admin': {
      name: 'Admin Controls',
      description: 'System administration and security management',
      features: [
        'Manage user permissions and roles',
        'Configure AI agents',
        'Campaign approval workflows',
        'System health monitoring',
        'Security settings',
        'Knowledge graph management',
        'API and integration settings'
      ],
      suggestions: [
        'How to approve campaigns?',
        'How to manage user permissions?',
        'What are AI agents?',
        'How to configure approval workflows?'
      ],
      tips: [
        'Review pending campaign approvals regularly',
        'Set up approval workflows based on budget thresholds',
        'Monitor system health to ensure optimal performance'
      ]
    },
    'agents': {
      name: 'Agent Management',
      description: 'Configure and manage AI agents',
      features: [
        'Create custom AI agents',
        'Define agent roles and permissions',
        'Monitor agent performance',
        'Configure agent behaviors',
        'Set up agent workflows'
      ],
      suggestions: [
        'What are AI agents?',
        'How to create a new agent?',
        'How to configure agent permissions?',
        'Can agents work together?'
      ],
      tips: [
        'Assign specific roles to agents for better efficiency',
        'Monitor agent performance regularly',
        'Use multiple agents for complex workflows'
      ]
    },
    'integrations': {
      name: 'Integrations',
      description: 'Connect with external platforms and tools',
      features: [
        'Connect social media platforms',
        'Integrate ad networks',
        'Link analytics tools',
        'CRM integrations',
        'API management'
      ],
      suggestions: [
        'How to connect social media accounts?',
        'What integrations are available?',
        'How to set up API access?',
        'Can I integrate custom tools?'
      ],
      tips: [
        'Connect all your platforms for centralized management',
        'Verify integration status regularly',
        'Use API keys securely'
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (previousTabRef.current !== activeTab) {
      const tabInfo = getTabInfo();
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Welcome to ${tabInfo.name}! 🎯\n\n${tabInfo.description}\n\nI can help you with:\n${tabInfo.features.slice(0, 3).map((f: string, i: number) => `• ${f}`).join('\n')}\n\nFeel free to ask me anything!`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      previousTabRef.current = activeTab;
    }
  }, [activeTab]);

  const getTabInfo = () => {
    return tabContextInfo[activeTab] || tabContextInfo['dashboard'];
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const tabInfo = getTabInfo();

    if (lowerMessage.includes('what') && (lowerMessage.includes('tab') || lowerMessage.includes('page') || lowerMessage.includes('section'))) {
      return `You're currently in the ${tabInfo.name}. ${tabInfo.description}\n\nKey features:\n${tabInfo.features.map((f: string, i: number) => `${i + 1}. ${f}`).join('\n')}`;
    }

    if (lowerMessage.includes('how') && lowerMessage.includes('create') && (lowerMessage.includes('campaign') || activeTab === 'strategy')) {
      return 'To create a campaign:\n1. Go to Strategy Studio\n2. Click "Create Campaign" tab\n3. Enter your campaign prompt or select a template\n4. Define your target audience and budget\n5. Review AI-generated strategy\n6. Save or submit for approval';
    }

    if (lowerMessage.includes('generate') && (lowerMessage.includes('image') || lowerMessage.includes('video') || lowerMessage.includes('content'))) {
      return 'To generate content:\n1. Go to Creator Studio\n2. Select your Brand Kit\n3. Choose asset type (image or video)\n4. Enter your creative prompt\n5. Optionally upload reference images\n6. Click "Generate"\n7. Preview and save your favorites';
    }

    if (lowerMessage.includes('brand kit') || (lowerMessage.includes('brand') && lowerMessage.includes('manage'))) {
      return 'Brand Kit helps maintain consistent branding:\n1. Go to Brand Kit section\n2. Click "+ Add New Brand Kit"\n3. Upload your logo\n4. Define color palette\n5. Set typography preferences\n6. Save your brand kit\n\nYou can then use it in Creator Studio for brand-compliant content generation.';
    }

    if (lowerMessage.includes('approve') || lowerMessage.includes('approval')) {
      return 'Campaign Approval Process:\n1. Go to Admin Controls\n2. Click "Campaign Approvals" tab\n3. Review pending campaigns\n4. Click "View Details" on any campaign\n5. Review all information\n6. Add approval comments\n7. Click "Approve" or "Reject"';
    }

    if (lowerMessage.includes('performance') || lowerMessage.includes('metric') || lowerMessage.includes('analytic')) {
      return 'To monitor performance:\n1. Go to Performance Cockpit or Marketing Studio\n2. View real-time metrics and KPIs\n3. Use filters to focus on specific campaigns\n4. Check AI Insights for optimization tips\n5. Create custom reports as needed\n6. Export data for further analysis';
    }

    if (lowerMessage.includes('launch') || lowerMessage.includes('run campaign')) {
      return 'To launch a campaign:\n1. Ensure campaign is approved (check Admin Controls)\n2. Go to Marketing Studio\n3. Find your approved campaign\n4. Click "Launch Campaign"\n5. Confirm launch settings\n6. Monitor performance in real-time';
    }

    if (lowerMessage.includes('agent') && (lowerMessage.includes('what') || lowerMessage.includes('ai'))) {
      return 'AI Agents are intelligent assistants that help automate tasks:\n• Content Creator Agent: Generates creative assets\n• Performance Optimizer: Optimizes campaign performance\n• Strategy Analyst: Analyzes market data\n• Quality Assurance: Reviews content for compliance\n\nManage them in Agent Management section.';
    }

    if (lowerMessage.includes('integration') || lowerMessage.includes('connect')) {
      return 'To set up integrations:\n1. Go to Integrations section\n2. Choose platform (Facebook, Google, etc.)\n3. Click "Connect"\n4. Authorize access\n5. Configure settings\n6. Test connection\n\nIntegrations allow centralized campaign management across all platforms.';
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('question') || lowerMessage.includes('guide')) {
      return `Here's what I can help you with in ${tabInfo.name}:\n\n${tabInfo.suggestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}\n\n💡 Quick Tips:\n${tabInfo.tips.map((t: string) => `• ${t}`).join('\n')}\n\nAsk me anything!`;
    }

    if (lowerMessage.includes('tip') || lowerMessage.includes('best practice')) {
      return `💡 Tips for ${tabInfo.name}:\n\n${tabInfo.tips.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')}\n\nWould you like specific guidance on any of these?`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! 👋 I'm your AI assistant for the entire KRAFT platform.\n\nYou're currently in ${tabInfo.name}. I can help you with any questions about:\n• Campaign creation and strategy\n• Creative content generation\n• Performance monitoring\n• System administration\n• And much more!\n\nWhat would you like to know?`;
    }

    if (lowerMessage.includes('switch') || lowerMessage.includes('go to') || lowerMessage.includes('navigate')) {
      return 'You can navigate to different sections using the sidebar:\n• Dashboard - Overview and quick insights\n• Strategy Studio - Create campaigns\n• Creator Studio - Generate content\n• Marketing Studio - Execute campaigns\n• Performance Cockpit - Analytics\n• Admin Controls - Management\n• And more!\n\nWhich section would you like to learn about?';
    }

    return `I understand you're asking about "${userMessage}" in ${tabInfo.name}.\n\n${tabInfo.features[0]}. Would you like more details about this or any other feature?\n\nYou can also ask me about:\n${tabInfo.suggestions.slice(0, 2).map((s: string) => `• ${s}`).join('\n')}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center transition-all hover:scale-110 z-50 group"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <div className={`${themeClasses.cardBg} rounded-2xl shadow-2xl border-2 ${themeClasses.border} overflow-hidden`}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">KRAFT AI Assistant</h3>
              <p className="text-xs text-blue-100">{getTabInfo().name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="text-white" size={18} />
              ) : (
                <Minimize2 className="text-white" size={18} />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="text-white" size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <Bot className={`mx-auto mb-4 ${themeClasses.textSecondary}`} size={48} />
                    <p className={`${themeClasses.textSecondary} text-sm`}>
                      Ask me anything about KRAFT!
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-br from-blue-400 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="text-white" size={16} />
                      ) : (
                        <Bot className="text-white" size={16} />
                      )}
                    </div>
                    <div>
                      <div className={`rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : `${themeClasses.gradient} ${themeClasses.text}`
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      <p className={`text-xs ${themeClasses.textSecondary} mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={16} />
                    </div>
                    <div className={`${themeClasses.gradient} rounded-2xl p-3`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className={`p-4 border-t ${themeClasses.border}`}>
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="text-yellow-500" size={16} />
                <p className={`text-xs font-semibold ${themeClasses.text}`}>Quick Questions:</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {getTabInfo().suggestions.slice(0, 3).map((question: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-4 border-t ${themeClasses.border}`}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className={`flex-1 px-4 py-3 ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
