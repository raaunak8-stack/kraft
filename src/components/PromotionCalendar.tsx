import React, { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Download,
  Sparkles,
  Filter,
  Clock,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  startDate: Date;
  endDate: Date;
  status: "scheduled" | "active" | "completed";
  color: string;
  optimizationScore: number;
}

interface PromotionCalendarProps {
  onSchedule?: (campaign: Campaign) => void;
}

export const PromotionCalendar: React.FC<PromotionCalendarProps> = ({ onSchedule }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [showAIOptimizer, setShowAIOptimizer] = useState(false);

  const channels = [
    "TV",
    "Radio",
    "Newspaper",
    "Display",
    "Exhibition",
    "CSP",
    "OOH",
    "OFM",
    "Bazaar_day",
    "Crop_seminar",
    "Demo",
    "JCSP",
    "Sub_dealer_coop_meeting",
    "Exhibition_yatra",
    "Misc",
  ];

  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Sale Campaign",
      channel: "TV",
      startDate: new Date(2025, 9, 5),
      endDate: new Date(2025, 9, 15),
      status: "scheduled",
      color: "bg-blue-600",
      optimizationScore: 92,
    },
    {
      id: "2",
      name: "Brand Awareness Q4",
      channel: "Radio",
      startDate: new Date(2025, 9, 8),
      endDate: new Date(2025, 9, 22),
      status: "scheduled",
      color: "bg-green-600",
      optimizationScore: 88,
    },
    {
      id: "3",
      name: "Product Launch Event",
      channel: "Display",
      startDate: new Date(2025, 9, 12),
      endDate: new Date(2025, 9, 18),
      status: "active",
      color: "bg-purple-600",
      optimizationScore: 95,
    },
    {
      id: "4",
      name: "OOH Campaign",
      channel: "OOH",
      startDate: new Date(2025, 9, 3),
      endDate: new Date(2025, 10, 15),
      status: "active",
      color: "bg-orange-600",
      optimizationScore: 87,
    },
    {
      id: "5",
      name: "Exhibition Yatra",
      channel: "Exhibition_yatra",
      startDate: new Date(2025, 9, 20),
      endDate: new Date(2025, 9, 28),
      status: "scheduled",
      color: "bg-teal-600",
      optimizationScore: 91,
    },
    {
      id: "6",
      name: "Newspaper Ad Campaign",
      channel: "Newspaper",
      startDate: new Date(2025, 9, 10),
      endDate: new Date(2025, 9, 24),
      status: "active",
      color: "bg-red-600",
      optimizationScore: 85,
    },
  ];

  const getWeeksInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      currentWeek.push(new Date(year, month, 1 - startPadding + i));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentWeek.push(new Date(year, month, day));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        const lastDate = currentWeek[currentWeek.length - 1];
        currentWeek.push(new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1));
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const getCampaignsForChannel = (channel: string) => {
    return campaigns.filter((c) => c.channel === channel);
  };

  const isCampaignActive = (campaign: Campaign, date: Date) => {
    const startDate = new Date(campaign.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(campaign.endDate);
    endDate.setHours(23, 59, 59, 999);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate >= startDate && checkDate <= endDate;
  };

  const getCampaignPosition = (campaign: Campaign, week: Date[]) => {
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);

    const weekStart = week[0];
    const weekEnd = week[6];

    const start = startDate < weekStart ? 0 : week.findIndex((d) => d.toDateString() === startDate.toDateString());
    const end = endDate > weekEnd ? 6 : week.findIndex((d) => d.toDateString() === endDate.toDateString());

    if (start === -1 || end === -1) {
      return null;
    }

    return { start, end };
  };

  const filteredChannels = selectedChannels.length > 0
    ? channels.filter(c => selectedChannels.includes(c))
    : channels;

  const weeks = getWeeksInMonth(selectedMonth);

  const previousMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev =>
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <div className={`${themeClasses.cardBg} rounded-2xl ${themeClasses.border} border p-6`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="text-purple-600" size={28} />
            <div>
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                Promotion Calendar
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                AI-Optimized Campaign Scheduling
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAIOptimizer(!showAIOptimizer)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                showAIOptimizer
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : `${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.hover}`
              }`}
            >
              <Sparkles size={16} />
              <span>AI Optimizer</span>
            </button>
            <button
              className={`p-2 rounded-lg ${themeClasses.hover}`}
              title="Filter Channels"
            >
              <Filter size={20} className={themeClasses.textSecondary} />
            </button>
            <button
              className={`p-2 rounded-lg ${themeClasses.hover}`}
              title="Settings"
            >
              <Settings size={20} className={themeClasses.textSecondary} />
            </button>
            <button
              className={`p-2 rounded-lg ${themeClasses.hover}`}
              title="Download"
            >
              <Download size={20} className={themeClasses.textSecondary} />
            </button>
          </div>
        </div>

        {showAIOptimizer && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-start space-x-3">
              <Sparkles className="text-purple-600 mt-1" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">AI Scheduling Recommendations</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-green-600" size={16} />
                    <span>Best performing time slots: Oct 12-18 (High engagement predicted)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="text-blue-600" size={16} />
                    <span>Recommended channels: TV + Display for maximum reach</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="text-orange-600" size={16} />
                    <span>Avoid overlap: Current OOH campaign conflicts with Oct 5-15</span>
                  </div>
                </div>
                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Apply Recommendations
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={previousMonth}
              className={`p-2 rounded-lg ${themeClasses.hover}`}
            >
              <ChevronLeft size={20} />
            </button>
            <h4 className={`text-lg font-semibold ${themeClasses.text} min-w-[150px] text-center`}>
              {selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h4>
            <button
              onClick={nextMonth}
              className={`p-2 rounded-lg ${themeClasses.hover}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-sm ${themeClasses.textSecondary}`}>
              {campaigns.length} campaigns
            </span>
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Campaign</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {channels.slice(0, 10).map((channel) => (
            <button
              key={channel}
              onClick={() => toggleChannel(channel)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedChannels.includes(channel)
                  ? "bg-purple-100 text-purple-700 border border-purple-300"
                  : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
              }`}
            >
              {channel.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className={`text-sm font-semibold ${themeClasses.text} p-2`}>
                Channel
              </div>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className={`text-sm font-semibold ${themeClasses.text} text-center p-2`}>
                  {day}
                </div>
              ))}
            </div>

            {filteredChannels.map((channel) => (
              <div key={channel} className="mb-1">
                <div className="grid grid-cols-8 gap-1">
                  <div
                    className={`text-sm ${themeClasses.text} p-2 font-medium flex items-center border-r ${themeClasses.border}`}
                  >
                    {channel.replace(/_/g, " ")}
                  </div>

                  <div className="col-span-7 relative">
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="grid grid-cols-7 gap-1 mb-1">
                        {week.map((date, dayIdx) => {
                          const isCurrentMonth = date.getMonth() === selectedMonth.getMonth();
                          const channelCampaigns = getCampaignsForChannel(channel);
                          const activeCampaign = channelCampaigns.find((c) =>
                            isCampaignActive(c, date)
                          );

                          return (
                            <div
                              key={dayIdx}
                              className={`h-12 border rounded ${
                                isCurrentMonth
                                  ? themeClasses.border
                                  : "border-gray-200 bg-gray-50"
                              } relative overflow-hidden`}
                            >
                              <span
                                className={`text-xs p-1 ${
                                  isCurrentMonth
                                    ? themeClasses.textSecondary
                                    : "text-gray-400"
                                }`}
                              >
                                {date.getDate()}
                              </span>
                              {activeCampaign && dayIdx === 0 && weekIdx === 0 && (
                                <div
                                  className={`absolute top-0 left-0 right-0 bottom-0 ${activeCampaign.color} opacity-80 flex items-center justify-center`}
                                >
                                  <span className="text-white text-xs font-medium px-1 truncate">
                                    {activeCampaign.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    {getCampaignsForChannel(channel).map((campaign) => {
                      return weeks.map((week, weekIdx) => {
                        const position = getCampaignPosition(campaign, week);
                        if (!position) return null;

                        const width = ((position.end - position.start + 1) / 7) * 100;
                        const left = (position.start / 7) * 100;

                        return (
                          <div
                            key={`${campaign.id}-${weekIdx}`}
                            className={`absolute ${campaign.color} opacity-80 rounded px-2 py-1 flex items-center justify-between group hover:opacity-100 transition-opacity cursor-pointer`}
                            style={{
                              width: `${width}%`,
                              left: `${left}%`,
                              top: `${weekIdx * 52}px`,
                              height: "48px",
                            }}
                            title={`${campaign.name} (Score: ${campaign.optimizationScore})`}
                          >
                            <span className="text-white text-xs font-medium truncate">
                              {campaign.name}
                            </span>
                            <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100">
                              {campaign.optimizationScore}%
                            </span>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className={`text-sm ${themeClasses.textSecondary}`}>Scheduled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span className={`text-sm ${themeClasses.textSecondary}`}>Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className={`text-sm ${themeClasses.textSecondary}`}>Completed</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className={themeClasses.textSecondary} />
            <span className={`text-sm ${themeClasses.textSecondary}`}>
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
