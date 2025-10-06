import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  currentPage?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ currentPage = 'Creator Studio' }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your AI assistant for ${currentPage}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pageContextInfo: Record<string, any> = {
    'Creator Studio': {
      description: 'AI-powered creative asset generation platform',
      features: [
        'Generate images and videos with AI',
        'Create brand-compliant content',
        'Multi-platform optimization',
        'Reference image verification',
        'Real-time preview across platforms'
      ],
      commonQuestions: [
        'How do I generate images?',
        'What is Brand Kit?',
        'How to upload reference images?',
        'Can I preview on different platforms?'
      ]
    },
    'Brand Kit': {
      description: 'Manage your brand identity assets',
      features: [
        'Store and manage logos',
        'Define color palettes',
        'Set typography standards',
        'Save image styles'
      ],
      commonQuestions: [
        'How to add a new logo?',
        'How to create color palette?',
        'What file formats are supported?'
      ]
    },
    'Marketing Studio': {
      description: 'Execute and monitor marketing campaigns',
      features: [
        'Run approved campaigns',
        'Real-time metrics tracking',
        'AI-powered insights',
        'Multi-platform management'
      ],
      commonQuestions: [
        'How to run a campaign?',
        'What are AI Insights?',
        'How to schedule campaigns?'
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPageInfo = () => {
    return pageContextInfo[currentPage] || pageContextInfo['Creator Studio'];
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const pageInfo = getPageInfo();

    if (lowerMessage.includes('what') && (lowerMessage.includes('page') || lowerMessage.includes('features'))) {
      return `This is the ${currentPage}. ${pageInfo.description}.\n\nKey features:\n${pageInfo.features.map((f: string, i: number) => `${i + 1}. ${f}`).join('\n')}`;
    }

    if (lowerMessage.includes('how') && lowerMessage.includes('generate')) {
      return 'To generate content:\n1. Select your Brand Kit from the dropdown\n2. Choose logo placement and format\n3. Enter your creative prompt\n4. Click "Generate Images" or "Generate Videos"\n5. Select your favorite results and save them!';
    }

    if (lowerMessage.includes('brand kit')) {
      return 'Brand Kit helps you maintain consistent branding. Click "+ Add New Brand Kit" to create a new one. You can add logos, colors, fonts, and image styles to ensure all your generated content follows your brand guidelines.';
    }

    if (lowerMessage.includes('reference image')) {
      return 'Reference images guide AI generation. Upload an image, and our AI will verify it against your brand guidelines. If it passes, the AI will use it as inspiration for generating new content that matches your brand style.';
    }

    if (lowerMessage.includes('platform') && lowerMessage.includes('preview')) {
      return 'After generating content, you can preview how it looks on different platforms like Instagram, Facebook, Twitter, YouTube, and LinkedIn. Each platform has different aspect ratios and display formats!';
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('question')) {
      return `Common questions about ${currentPage}:\n${pageInfo.commonQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}\n\nFeel free to ask me anything!`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! Welcome to ${currentPage}. I'm here to help you navigate and make the most of this platform. What would you like to know?`;
    }

    return `I understand you're asking about "${userMessage}". In ${currentPage}, you can ${pageInfo.features[0].toLowerCase()}. Would you like more details about any specific feature?`;
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
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <div className={`${themeClasses.cardBg} rounded-2xl shadow-2xl border-2 ${themeClasses.border} overflow-hidden`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-blue-100">{currentPage}</p>
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
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
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

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="text-blue-500" size={16} />
                <p className={`text-xs font-semibold ${themeClasses.text}`}>Quick Questions:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {getPageInfo().commonQuestions.slice(0, 2).map((question: string, index: number) => (
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

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
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
