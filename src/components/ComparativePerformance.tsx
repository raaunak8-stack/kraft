import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Zap, AlertCircle, CheckCircle2, ArrowRight, BarChart3, Activity, Eye, MousePointer } from 'lucide-react';
import { fetchCampaignsByProduct, fetchCampaignPerformance, fetchMMMAnalysis, CampaignData, PerformanceData, MMMAnalysis } from '../services/campaignService';
import { useTheme } from '../contexts/ThemeContext';

interface ComparativePerformanceProps {
  productId: string;
  productName: string;
}

export const ComparativePerformance: React.FC<ComparativePerformanceProps> = ({ productId, productName }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [performanceData, setPerformanceData] = useState<Record<string, PerformanceData>>({});
  const [mmmAnalysis, setMMMAnalysis] = useState<MMMAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const campaignsData = await fetchCampaignsByProduct(productId);
      setCampaigns(campaignsData);

      const perfData: Record<string, PerformanceData> = {};
      for (const campaign of campaignsData) {
        const perf = await fetchCampaignPerformance(campaign.id);
        if (perf.length > 0) {
          perfData[campaign.id] = perf[0];
        }
      }
      setPerformanceData(perfData);

      const analysis = await fetchMMMAnalysis(productId);
      setMMMAnalysis(analysis);

      if (campaignsData.length > 0) {
        setSelectedCampaigns(campaignsData.map(c => c.id));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignSelection = (campaignId: string) => {
    setSelectedCampaigns(prev =>
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const getMetricComparison = (metric: 'roas' | 'ctr' | 'cpc' | 'conversions') => {
    const values = selectedCampaigns
      .map(id => performanceData[id])
      .filter(Boolean)
      .map(p => {
        switch (metric) {
          case 'roas': return p.roas;
          case 'ctr': return p.ctr;
          case 'cpc': return p.cpc;
          case 'conversions': return p.conversions;
        }
      });

    if (values.length === 0) return { best: 0, worst: 0, avg: 0 };

    return {
      best: Math.max(...values),
      worst: Math.min(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length
    };
  };

  const getBestPerformingCampaign = () => {
    let best = null;
    let bestROAS = 0;

    selectedCampaigns.forEach(id => {
      const perf = performanceData[id];
      if (perf && perf.roas > bestROAS) {
        bestROAS = perf.roas;
        best = campaigns.find(c => c.id === id);
      }
    });

    return best;
  };

  const getContributionData = (campaignId: string) => {
    if (!mmmAnalysis?.campaign_contributions) return null;
    return mmmAnalysis.campaign_contributions[campaignId];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (campaigns.length < 2) {
    return (
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-8 text-center`}>
        <BarChart3 className="mx-auto text-gray-400 mb-3" size={48} />
        <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
          Insufficient Data for Comparison
        </h3>
        <p className={`text-sm ${themeClasses.textSecondary}`}>
          At least 2 running campaigns are required for {productName} to enable comparative performance analysis.
        </p>
      </div>
    );
  }

  const roasComparison = getMetricComparison('roas');
  const ctrComparison = getMetricComparison('ctr');
  const bestCampaign = getBestPerformingCampaign();

  return (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-xl font-bold ${themeClasses.text} mb-1`}>
              Comparative Performance Analysis
            </h3>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              Market Mix Modeling insights for {productName}
            </p>
          </div>
          {mmmAnalysis && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <Activity className="text-green-600" size={18} />
              <div>
                <p className="text-xs text-green-600 font-medium">Model Confidence</p>
                <p className="text-sm font-bold text-green-700">
                  {mmmAnalysis.model_metrics.confidence?.toUpperCase() || 'HIGH'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-blue-600" size={20} />
              <span className="text-xs font-semibold text-blue-600">ROAS</span>
            </div>
            <p className="text-2xl font-bold text-blue-700 mb-1">
              {roasComparison.best.toFixed(1)}x
            </p>
            <p className="text-xs text-blue-600">Best Performance</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <Activity className="text-green-600" size={20} />
              <span className="text-xs font-semibold text-green-600">CTR</span>
            </div>
            <p className="text-2xl font-bold text-green-700 mb-1">
              {ctrComparison.best.toFixed(1)}%
            </p>
            <p className="text-xs text-green-600">Best Performance</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Target className="text-purple-600" size={20} />
              <span className="text-xs font-semibold text-purple-600">Campaigns</span>
            </div>
            <p className="text-2xl font-bold text-purple-700 mb-1">
              {campaigns.length}
            </p>
            <p className="text-xs text-purple-600">Running</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="text-orange-600" size={20} />
              <span className="text-xs font-semibold text-orange-600">Total Budget</span>
            </div>
            <p className="text-2xl font-bold text-orange-700 mb-1">
              ${(campaigns.reduce((sum, c) => sum + c.budget, 0) / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-orange-600">Allocated</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className={`font-semibold ${themeClasses.text} text-sm mb-3`}>
            Select Campaigns to Compare
          </h4>
          {campaigns.map(campaign => {
            const perf = performanceData[campaign.id];
            const contribution = getContributionData(campaign.id);
            const isSelected = selectedCampaigns.includes(campaign.id);
            const isBest = bestCampaign?.id === campaign.id;

            return (
              <div
                key={campaign.id}
                onClick={() => toggleCampaignSelection(campaign.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className={`font-bold ${themeClasses.text}`}>
                          {campaign.name}
                        </h5>
                        {isBest && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center space-x-1">
                            <TrendingUp size={12} />
                            <span>Top Performer</span>
                          </span>
                        )}
                      </div>

                      {perf && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div>
                            <p className={`text-xs ${themeClasses.textSecondary}`}>ROAS</p>
                            <p className="text-sm font-bold text-blue-600">{perf.roas.toFixed(1)}x</p>
                          </div>
                          <div>
                            <p className={`text-xs ${themeClasses.textSecondary}`}>CTR</p>
                            <p className="text-sm font-bold text-green-600">{perf.ctr.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className={`text-xs ${themeClasses.textSecondary}`}>Conversions</p>
                            <p className="text-sm font-bold text-purple-600">{perf.conversions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${themeClasses.textSecondary}`}>Revenue</p>
                            <p className="text-sm font-bold text-orange-600">${(perf.revenue / 1000).toFixed(1)}K</p>
                          </div>
                        </div>
                      )}

                      {contribution && (
                        <div className="flex items-center space-x-4 pt-3 border-t border-gray-200">
                          <div className="flex-1">
                            <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>
                              Contribution Score
                            </p>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                style={{ width: `${contribution.contribution * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              {(contribution.contribution * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {mmmAnalysis?.recommendations && mmmAnalysis.recommendations.length > 0 && (
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${themeClasses.text}`}>
                AI-Powered Recommendations
              </h3>
              <p className={`text-xs ${themeClasses.textSecondary}`}>
                Based on Market Mix Modeling analysis
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {mmmAnalysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border-l-4 ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    {rec.type === 'budget_reallocation' && (
                      <DollarSign className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    )}
                    {rec.type === 'optimization' && (
                      <TrendingUp className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    )}
                    {rec.type === 'platform_optimization' && (
                      <Target className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className={`font-bold ${themeClasses.text}`}>
                          {rec.type === 'budget_reallocation' && 'Budget Reallocation'}
                          {rec.type === 'optimization' && 'Performance Optimization'}
                          {rec.type === 'platform_optimization' && 'Platform Strategy'}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(rec.priority)}`}>
                          {rec.priority} priority
                        </span>
                      </div>
                      <p className={`text-sm ${themeClasses.text} mb-3`}>
                        {rec.message}
                      </p>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                        <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                        <p className="text-xs font-medium text-green-700">
                          {rec.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <span className="text-sm font-medium">Apply Recommendation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {mmmAnalysis?.optimal_allocations && (
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="text-blue-600" size={24} />
            <h3 className={`text-lg font-bold ${themeClasses.text}`}>
              Optimal Budget Allocation
            </h3>
          </div>

          <div className="space-y-4">
            {Object.entries(mmmAnalysis.optimal_allocations).map(([campaignId, allocation]: [string, any]) => {
              const campaign = campaigns.find(c => c.id === campaignId);
              if (!campaign) return null;

              const changePct = allocation.change_pct;
              const isIncrease = changePct > 0;

              return (
                <div key={campaignId} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className={`font-bold ${themeClasses.text}`}>{campaign.name}</h5>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      isIncrease ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span className="text-sm font-bold">
                        {isIncrease ? '+' : ''}{changePct.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Current Budget</p>
                      <p className="text-lg font-bold text-gray-700">
                        ${allocation.current.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Recommended</p>
                      <p className="text-lg font-bold text-blue-600">
                        ${allocation.recommended.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={themeClasses.textSecondary}>Budget Shift</span>
                      <span className={`font-semibold ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                        {isIncrease ? '+' : ''}{(allocation.recommended - allocation.current).toLocaleString()} USD
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isIncrease ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.abs(changePct)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
