import React, { useState } from 'react';
import {
  Play,
  Calendar,
  Globe,
  DollarSign,
  Users,
  Target,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Save,
  Settings,
  AlertCircle,
  TrendingUp,
  Zap,
  ChevronDown,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  budget: number;
  platforms: string[];
  audience: string;
  startDate: string;
  endDate: string;
}

interface PlatformConfig {
  platform: string;
  enabled: boolean;
  budget: number;
  bidStrategy: string;
  targeting: {
    age: string;
    gender: string;
    location: string;
    interests: string[];
  };
  schedule: {
    startDate: string;
    endDate: string;
    dayParting: string[];
  };
}

interface CampaignExecutionProps {
  campaign: Campaign;
  onBack: () => void;
  onLaunch: () => void;
}

export const CampaignExecution: React.FC<CampaignExecutionProps> = ({ campaign, onBack, onLaunch }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const [platformConfigs, setPlatformConfigs] = useState<PlatformConfig[]>(
    campaign.platforms.map((platform) => ({
      platform,
      enabled: true,
      budget: Math.floor(campaign.budget / campaign.platforms.length),
      bidStrategy: 'auto',
      targeting: {
        age: '18-65',
        gender: 'All',
        location: 'United States',
        interests: []
      },
      schedule: {
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        dayParting: ['all-day']
      }
    }))
  );

  const [activeStep, setActiveStep] = useState(1);

  const bidStrategies = [
    { value: 'auto', label: 'Automatic Bidding' },
    { value: 'manual', label: 'Manual CPC' },
    { value: 'target-cpa', label: 'Target CPA' },
    { value: 'maximize-clicks', label: 'Maximize Clicks' },
    { value: 'maximize-conversions', label: 'Maximize Conversions' }
  ];

  const dayPartingOptions = [
    { value: 'all-day', label: 'All Day' },
    { value: 'morning', label: 'Morning (6AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { value: 'evening', label: 'Evening (6PM - 12AM)' },
    { value: 'night', label: 'Night (12AM - 6AM)' }
  ];

  const handlePlatformToggle = (index: number) => {
    const updated = [...platformConfigs];
    updated[index].enabled = !updated[index].enabled;
    setPlatformConfigs(updated);
  };

  const handleBudgetChange = (index: number, value: number) => {
    const updated = [...platformConfigs];
    updated[index].budget = value;
    setPlatformConfigs(updated);
  };

  const handleBidStrategyChange = (index: number, value: string) => {
    const updated = [...platformConfigs];
    updated[index].bidStrategy = value;
    setPlatformConfigs(updated);
  };

  const handleScheduleChange = (index: number, field: string, value: any) => {
    const updated = [...platformConfigs];
    updated[index].schedule = {
      ...updated[index].schedule,
      [field]: value
    };
    setPlatformConfigs(updated);
  };

  const handleTargetingChange = (index: number, field: string, value: any) => {
    const updated = [...platformConfigs];
    updated[index].targeting = {
      ...updated[index].targeting,
      [field]: value
    };
    setPlatformConfigs(updated);
  };

  const getTotalBudget = () => {
    return platformConfigs
      .filter(p => p.enabled)
      .reduce((sum, p) => sum + p.budget, 0);
  };

  const getEnabledPlatforms = () => {
    return platformConfigs.filter(p => p.enabled).length;
  };

  const steps = [
    { id: 1, title: 'Platform Setup', icon: Globe },
    { id: 2, title: 'Budget Allocation', icon: DollarSign },
    { id: 3, title: 'Targeting', icon: Target },
    { id: 4, title: 'Schedule', icon: Calendar },
    { id: 5, title: 'Review & Launch', icon: Play }
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Select Platforms</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                Choose which platforms to run this campaign on
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformConfigs.map((config, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    config.enabled
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  onClick={() => handlePlatformToggle(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        config.enabled ? 'bg-blue-600' : 'bg-gray-400'
                      }`}>
                        <Globe className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${themeClasses.text}`}>{config.platform}</h4>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>
                          {config.enabled ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.enabled}
                        onChange={() => handlePlatformToggle(index)}
                        className="sr-only peer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {config.enabled && (
                    <div className={`p-3 rounded-lg ${themeClasses.gradient}`}>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Estimated Budget</p>
                      <p className={`text-lg font-bold ${themeClasses.text}`}>
                        ${config.budget.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-xl bg-blue-50 border border-blue-200`}>
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-blue-600" size={20} />
                <p className={`font-semibold ${themeClasses.text}`}>Platform Summary</p>
              </div>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                {getEnabledPlatforms()} platform{getEnabledPlatforms() !== 1 ? 's' : ''} selected with a total budget of ${getTotalBudget().toLocaleString()}
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Budget Allocation</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                Distribute your campaign budget across selected platforms
              </p>
            </div>

            <div className="space-y-4">
              {platformConfigs.filter(p => p.enabled).map((config, index) => {
                const actualIndex = platformConfigs.findIndex(p => p.platform === config.platform);
                return (
                  <div key={index} className={`p-6 rounded-xl ${themeClasses.border} border-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Globe className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${themeClasses.text}`}>{config.platform}</h4>
                          <p className={`text-xs ${themeClasses.textSecondary}`}>
                            {((config.budget / getTotalBudget()) * 100).toFixed(1)}% of total budget
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Budget Amount
                        </label>
                        <input
                          type="number"
                          value={config.budget}
                          onChange={(e) => handleBudgetChange(actualIndex, parseInt(e.target.value) || 0)}
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Bid Strategy
                        </label>
                        <select
                          value={config.bidStrategy}
                          onChange={(e) => handleBidStrategyChange(actualIndex, e.target.value)}
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          {bidStrategies.map((strategy) => (
                            <option key={strategy.value} value={strategy.value}>
                              {strategy.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total Campaign Budget</p>
                  <p className="text-3xl font-bold">${getTotalBudget().toLocaleString()}</p>
                </div>
                <DollarSign size={48} className="opacity-20" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Audience Targeting</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                Define targeting parameters for each platform
              </p>
            </div>

            <div className="space-y-4">
              {platformConfigs.filter(p => p.enabled).map((config, index) => {
                const actualIndex = platformConfigs.findIndex(p => p.platform === config.platform);
                return (
                  <div key={index} className={`p-6 rounded-xl ${themeClasses.border} border-2`}>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Target className="text-purple-600" size={20} />
                      </div>
                      <h4 className={`font-semibold ${themeClasses.text}`}>{config.platform}</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Age Range
                        </label>
                        <select
                          value={config.targeting.age}
                          onChange={(e) => handleTargetingChange(actualIndex, 'age', e.target.value)}
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55-64">55-64</option>
                          <option value="18-65">18-65 (All Ages)</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Gender
                        </label>
                        <select
                          value={config.targeting.gender}
                          onChange={(e) => handleTargetingChange(actualIndex, 'gender', e.target.value)}
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="All">All Genders</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Location
                        </label>
                        <input
                          type="text"
                          value={config.targeting.location}
                          onChange={(e) => handleTargetingChange(actualIndex, 'location', e.target.value)}
                          placeholder="e.g., United States, New York"
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Campaign Schedule</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                Set the timing and schedule for your campaign
              </p>
            </div>

            <div className="space-y-4">
              {platformConfigs.filter(p => p.enabled).map((config, index) => {
                const actualIndex = platformConfigs.findIndex(p => p.platform === config.platform);
                return (
                  <div key={index} className={`p-6 rounded-xl ${themeClasses.border} border-2`}>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-green-600" size={20} />
                      </div>
                      <h4 className={`font-semibold ${themeClasses.text}`}>{config.platform}</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={config.schedule.startDate}
                          onChange={(e) => handleScheduleChange(actualIndex, 'startDate', e.target.value)}
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          End Date
                        </label>
                        <input
                          type="date"
                          value={config.schedule.endDate}
                          onChange={(e) => handleScheduleChange(actualIndex, 'endDate', e.target.value)}
                          className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                          Day Parting
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {dayPartingOptions.map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                config.schedule.dayParting.includes(option.value)
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={config.schedule.dayParting.includes(option.value)}
                                onChange={(e) => {
                                  const updated = [...platformConfigs];
                                  if (e.target.checked) {
                                    updated[actualIndex].schedule.dayParting = [
                                      ...updated[actualIndex].schedule.dayParting,
                                      option.value
                                    ];
                                  } else {
                                    updated[actualIndex].schedule.dayParting = updated[actualIndex].schedule.dayParting.filter(
                                      v => v !== option.value
                                    );
                                  }
                                  setPlatformConfigs(updated);
                                }}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                              />
                              <span className={`text-sm ${themeClasses.text}`}>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text}`}>AI Insights</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-red-50 border-l-4 border-red-500">
                  <div className="flex items-start space-x-3 mb-4">
                    <Zap className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <div className="flex-1">
                      <h4 className={`font-bold ${themeClasses.text} mb-1`}>Budget Reallocation</h4>
                      <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                        Facebook ads showing 15% higher CTR. Consider increasing budget by 20%.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Apply Now
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-yellow-50 border-l-4 border-yellow-500">
                  <div className="flex items-start space-x-3 mb-4">
                    <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="flex-1">
                      <h4 className={`font-bold ${themeClasses.text} mb-1`}>Creative Fatigue</h4>
                      <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                        Ad creative performance dropped 8% over last 2 days. Consider refreshing assets.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Review
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-green-50 border-l-4 border-green-500">
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <div className="flex-1">
                      <h4 className={`font-bold ${themeClasses.text} mb-1`}>Peak Performance Window</h4>
                      <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                        Best engagement detected between 6-9 PM. Schedule adjusted automatically.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Review & Launch Campaign</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                Review your campaign configuration before launching
              </p>
            </div>

            <div className={`p-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white`}>
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle2 size={32} />
                <div>
                  <h4 className="text-2xl font-bold">{campaign.name}</h4>
                  <p className="text-sm opacity-90">{campaign.objective}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-xs opacity-75 mb-1">Platforms</p>
                  <p className="text-2xl font-bold">{getEnabledPlatforms()}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75 mb-1">Total Budget</p>
                  <p className="text-2xl font-bold">${getTotalBudget().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75 mb-1">Duration</p>
                  <p className="text-2xl font-bold">
                    {Math.ceil(
                      (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )} days
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {platformConfigs.filter(p => p.enabled).map((config, index) => (
                <div key={index} className={`p-6 rounded-xl ${themeClasses.border} border-2`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold text-lg ${themeClasses.text}`}>{config.platform}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Ready to Launch
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Budget</p>
                      <p className={`font-semibold ${themeClasses.text}`}>${config.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Bid Strategy</p>
                      <p className={`font-semibold ${themeClasses.text}`}>
                        {bidStrategies.find(s => s.value === config.bidStrategy)?.label}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Targeting</p>
                      <p className={`font-semibold ${themeClasses.text}`}>
                        {config.targeting.age}, {config.targeting.gender}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Schedule</p>
                      <p className={`font-semibold ${themeClasses.text}`}>
                        {config.schedule.dayParting.length} time slots
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-xl bg-blue-50 border border-blue-200`}>
              <div className="flex items-start space-x-3">
                <Zap className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className={`font-semibold ${themeClasses.text} mb-2`}>AI Optimization Active</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Your campaign will be automatically optimized based on real-time performance data. Budget allocation and targeting may be adjusted to maximize results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Overview</span>
          </button>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Save size={18} />
              <span className="font-medium">Save Draft</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Run Campaign: {campaign.name}</h2>
          <p className={`${themeClasses.textSecondary}`}>Configure platform settings and launch your campaign</p>
        </div>

        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500'
                        : isActive
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="text-white" size={24} />
                    ) : (
                      <Icon className="text-white" size={24} />
                    )}
                  </div>
                  <p className={`text-xs mt-2 text-center ${isActive ? 'font-semibold text-blue-600' : themeClasses.textSecondary}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        {renderStepContent()}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              activeStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Previous</span>
          </button>

          {activeStep < 5 ? (
            <button
              onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="font-medium">Next Step</span>
              <ChevronDown size={18} className="rotate-[-90deg]" />
            </button>
          ) : (
            <button
              onClick={onLaunch}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors shadow-lg"
            >
              <Play size={20} />
              <span className="font-medium">Launch Campaign</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
