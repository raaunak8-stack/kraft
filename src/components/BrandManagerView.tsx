import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  Calendar,
  Filter,
  ChevronDown,
  Download,
  RefreshCw,
  Search,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Zap,
  Award
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PerformanceMetric {
  label: string;
  value: string;
  previousValue: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
}

interface CampaignSummary {
  id: string;
  product: string;
  totalSpend: number;
  totalLeads: number;
  totalSales: number;
  totalRevenue: number;
  avgConversionRate: number;
  roas: number;
  activeCampaigns: number;
  completedCampaigns: number;
}

export const BrandManagerView: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const [selectedTimeframe, setSelectedTimeframe] = useState('last-90-days');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const overallMetrics: PerformanceMetric[] = [
    {
      label: 'Total Revenue',
      value: '₹8,31,00,000',
      previousValue: '₹7,24,00,000',
      change: '+14.8%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Total Sales',
      value: '385',
      previousValue: '342',
      change: '+12.6%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      label: 'Total Leads',
      value: '3,420',
      previousValue: '3,030',
      change: '+12.9%',
      trend: 'up',
      icon: Users,
      color: 'yellow'
    },
    {
      label: 'Marketing Spend',
      value: '₹11,00,000',
      previousValue: '₹9,50,000',
      change: '+15.8%',
      trend: 'up',
      icon: Target,
      color: 'red'
    },
    {
      label: 'Avg Conversion',
      value: '11.3%',
      previousValue: '11.3%',
      change: '0%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      label: 'ROAS',
      value: '7.55x',
      previousValue: '7.62x',
      change: '-0.9%',
      trend: 'down',
      icon: Award,
      color: 'orange'
    }
  ];

  const productPerformance: CampaignSummary[] = [
    {
      id: '1',
      product: 'Nexa',
      totalSpend: 280000,
      totalLeads: 1200,
      totalSales: 135,
      totalRevenue: 27000000,
      avgConversionRate: 11.25,
      roas: 9.64,
      activeCampaigns: 3,
      completedCampaigns: 8
    },
    {
      id: '2',
      product: 'Arena',
      totalSpend: 150000,
      totalLeads: 850,
      totalSales: 95,
      totalRevenue: 13300000,
      avgConversionRate: 11.18,
      roas: 8.87,
      activeCampaigns: 2,
      completedCampaigns: 5
    },
    {
      id: '3',
      product: 'Vitara',
      totalSpend: 320000,
      totalLeads: 980,
      totalSales: 110,
      totalRevenue: 30800000,
      avgConversionRate: 11.22,
      roas: 9.63,
      activeCampaigns: 4,
      completedCampaigns: 12
    },
    {
      id: '4',
      product: 'Swift',
      totalSpend: 180000,
      totalLeads: 720,
      totalSales: 82,
      totalRevenue: 8200000,
      avgConversionRate: 11.39,
      roas: 4.56,
      activeCampaigns: 2,
      completedCampaigns: 6
    },
    {
      id: '5',
      product: 'Baleno',
      totalSpend: 170000,
      totalLeads: 670,
      totalSales: 75,
      totalRevenue: 5625000,
      avgConversionRate: 11.19,
      roas: 3.31,
      activeCampaigns: 1,
      completedCampaigns: 4
    }
  ];

  const timeframes = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 6 months', 'Last year'];
  const products = ['All Products', 'Nexa', 'Arena', 'Vitara', 'Swift', 'Baleno'];

  const filteredProducts = productPerformance.filter(product => {
    const matchesProduct = selectedProduct === 'all' || product.product.toLowerCase() === selectedProduct.toLowerCase();
    const matchesSearch = product.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProduct && matchesSearch;
  });

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
        <div className="text-center">
          <div className="flex items-center justify-start mb-2">
            <BarChart3 className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
            <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
              Brand Manager Performance Monitor
            </h2>
          </div>
          <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
            Overall campaign performance tracking: sales, revenue, and marketing effectiveness
          </p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Performance Filters</h3>
            <button className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
              <Filter size={16} className="mr-2" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Timeframe</label>
              <div className="relative">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                >
                  {timeframes.map((timeframe) => (
                    <option key={timeframe} value={timeframe.toLowerCase().replace(/\s+/g, '-')}>
                      {timeframe}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} pointer-events-none`} size={16} />
              </div>
            </div>

            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Product</label>
              <div className="relative">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                >
                  {products.map((product) => (
                    <option key={product} value={product === 'All Products' ? 'all' : product}>
                      {product}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} pointer-events-none`} size={16} />
              </div>
            </div>

            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Search</label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className={`w-full pl-10 pr-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-3xl p-6 md:p-8 ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl md:text-2xl font-bold ${themeClasses.text}`}>Overall Performance - Last 90 Days</h3>
            <div className="flex items-center space-x-2">
              <RefreshCw className={`${themeClasses.textSecondary} cursor-pointer hover:text-blue-600 transition-colors`} size={20} />
              <Download className={`${themeClasses.textSecondary} cursor-pointer hover:text-blue-600 transition-colors`} size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {overallMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6 ${themeClasses.hover} transition-all duration-300`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                      <Icon size={24} className={`text-${metric.color}-600`} />
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight size={14} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={14} className="text-red-600" />
                      )}
                      <span className={`text-xs font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <h4 className={`text-2xl md:text-3xl font-bold ${themeClasses.text} mb-1`}>{metric.value}</h4>
                  <p className={`text-sm ${themeClasses.text} mb-2`}>{metric.label}</p>
                  <p className={`text-xs ${themeClasses.textSecondary}`}>vs {metric.previousValue}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Product-wise Performance</h3>
            <div className="flex items-center space-x-2">
              <button className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
                <Calendar size={16} className="mr-2" />
                Date Range
              </button>
              <button className={`flex items-center px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                <Download size={16} className="mr-2" />
                Export Report
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${themeClasses.border} border-b`}>
                  <th className={`text-left p-4 ${themeClasses.text} font-semibold`}>Product</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>Total Spend</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>Leads</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>Sales</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>Revenue</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>Avg CNV</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>ROAS</th>
                  <th className={`text-right p-4 ${themeClasses.text} font-semibold`}>Campaigns</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={`${themeClasses.border} border-b ${themeClasses.hover} transition-colors`}>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-white" />
                        </div>
                        <div>
                          <p className={`font-semibold ${themeClasses.text}`}>{product.product}</p>
                          <p className={`text-xs ${themeClasses.textSecondary}`}>
                            {product.activeCampaigns} active
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`text-right p-4 ${themeClasses.text} font-medium`}>
                      {formatCurrency(product.totalSpend)}
                    </td>
                    <td className={`text-right p-4 ${themeClasses.text} font-medium`}>
                      {product.totalLeads.toLocaleString()}
                    </td>
                    <td className={`text-right p-4 ${themeClasses.text} font-medium`}>
                      {product.totalSales.toLocaleString()}
                    </td>
                    <td className={`text-right p-4 ${themeClasses.text} font-medium`}>
                      {formatCurrency(product.totalRevenue)}
                    </td>
                    <td className={`text-right p-4`}>
                      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-100 text-green-800 text-sm font-semibold">
                        {product.avgConversionRate.toFixed(2)}%
                      </span>
                    </td>
                    <td className={`text-right p-4`}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg ${
                        product.roas >= 7 ? 'bg-green-100 text-green-800' :
                        product.roas >= 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      } text-sm font-semibold`}>
                        {product.roas.toFixed(2)}x
                      </span>
                    </td>
                    <td className={`text-right p-4 ${themeClasses.textSecondary} text-sm`}>
                      {product.activeCampaigns + product.completedCampaigns} total
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Top Performer</h4>
              <Award className="text-yellow-500" size={24} />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package size={28} className="text-white" />
              </div>
              <h5 className={`text-xl font-bold ${themeClasses.text} mb-1`}>Vitara</h5>
              <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>Best ROAS Performance</p>
              <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                <p className={`text-2xl font-bold text-green-600`}>9.63x</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>Return on Ad Spend</p>
              </div>
            </div>
          </div>

          <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Campaign Velocity</h4>
              <Zap className="text-blue-500" size={24} />
            </div>
            <div className="space-y-3">
              <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${themeClasses.text}`}>Active Campaigns</span>
                  <span className="text-xl font-bold text-green-600">12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${themeClasses.text}`}>Completed</span>
                  <span className="text-xl font-bold text-blue-600">35</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-2xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Efficiency Score</h4>
              <Target className="text-green-500" size={24} />
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-3">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.87)}`}
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${themeClasses.text}`}>87%</span>
                </div>
              </div>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Marketing Effectiveness</p>
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
