import { useState } from 'react';
import { motion } from 'motion/react';
import {
  LogOut,
  MapPin,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Eye,
  MousePointer,
  BarChart3,
  PieChart,
  Calendar,
  Bell
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import PropTypes from 'prop-types';

export function DashboardAdvertisement({ onLogout, location }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaignStats = {
    totalSpent: 12000,
    impressions: 340000,
    clicks: 12000,
    conversions: 156,
    ctr: 3.5,
    cpc: 0.75,
    roas: 3.2
  };

  const activeCampaigns = [
    {
      id: 'camp-1',
      name: 'Eco-Friendly Rewards',
      status: 'active',
      budget: 5000,
      spent: 3200,
      impressions: 100000,
      clicks: 4000,
      conversions: 89
    },
    {
      id: 'camp-2',
      name: 'Green Shopping Vouchers',
      status: 'active',
      budget: 7000,
      spent: 5000,
      impressions: 120000,
      clicks: 6000,
      conversions: 45
    },
    {
      id: 'camp-3',
      name: 'Sustainable Living Tips',
      status: 'paused',
      budget: 3000,
      spent: 1500,
      impressions: 80000,
      clicks: 2000,
      conversions: 22
    }
  ];

  const targetAudience = [
    { segment: 'Eco-conscious Users', percentage: 45, color: 'bg-green-500' },
    { segment: 'New Recyclers', percentage: 25, color: 'bg-blue-500' },
    { segment: 'Frequent Vendors', percentage: 20, color: 'bg-purple-500' },
    { segment: 'Premium Users', percentage: 10, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-900 dark:via-gray-900 dark:to-emerald-900">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100 dark:border-green-800"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-green-800 dark:text-green-200">Advertisement Dashboard</h1>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="p-6">
        {/* Key Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${campaignStats.totalSpent.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Impressions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaignStats.impressions.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clicks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaignStats.clicks.toLocaleString()}</p>
              </div>
              <MousePointer className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ROAS</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaignStats.roas}x</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Campaigns */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Campaigns</h2>
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>

            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer border-2 border-transparent hover:border-green-200 dark:hover:border-green-700"
                  onClick={() => setSelectedCampaign(campaign.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${campaign.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                      {campaign.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="font-semibold text-gray-900 dark:text-white">${campaign.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Spent</p>
                      <p className="font-semibold text-gray-900 dark:text-white">${campaign.spent}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Conversions</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{campaign.conversions}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Target Audience */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Target Audience</h2>
              <Users className="w-6 h-6 text-green-500" />
            </div>

            <div className="space-y-4">
              {targetAudience.map((segment, index) => (
                <motion.div
                  key={segment.segment}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${segment.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{segment.segment}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{segment.percentage}%</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Bell className="w-4 h-4 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-800 dark:text-green-200">Optimization Tip</h3>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Consider increasing budget allocation to "Eco-conscious Users" segment shows the highest conversion rate.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Performance Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Overview</h2>
            <PieChart className="w-6 h-6 text-green-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{campaignStats.ctr}%</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click-Through Rate</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">${campaignStats.cpc}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cost Per Click</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{campaignStats.conversions}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Conversions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

DashboardAdvertisement.propTypes = {
  location: PropTypes.any,
  onLogout: PropTypes.any
};
