import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Eye,
  Coins,
  Package,
  Clock,
  Target,
  Award,
  BarChart3
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function VendorEarnings({ onBack }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const earningsData = {
    week: {
      total: 2840,
      commission: 284,
      net: 2556,
      pickups: 32,
      avgPerPickup: 88.8,
      change: 12.5,
      trend: 'up'
    },
    month: {
      total: 15420,
      commission: 1542,
      net: 13878,
      pickups: 156,
      avgPerPickup: 98.8,
      change: 8.2,
      trend: 'up'
    },
    year: {
      total: 142350,
      commission: 14235,
      net: 128115,
      pickups: 1247,
      avgPerPickup: 114.2,
      change: -2.1,
      trend: 'down'
    }
  };

  const weeklyBreakdown = [
    { day: 'Mon', earnings: 420, pickups: 5 },
    { day: 'Tue', earnings: 380, pickups: 4 },
    { day: 'Wed', earnings: 520, pickups: 6 },
    { day: 'Thu', earnings: 460, pickups: 5 },
    { day: 'Fri', earnings: 640, pickups: 8 },
    { day: 'Sat', earnings: 720, pickups: 9 },
    { day: 'Sun', earnings: 340, pickups: 4 }
  ];

  const recentTransactions = [
    {
      id: 1,
      date: 'Today, 2:30 PM',
      user: 'Sarah Chen',
      items: 8,
      coins: 95,
      earnings: 9.5,
      commission: 0.95,
      net: 8.55,
      status: 'completed'
    },
    {
      id: 2,
      date: 'Today, 11:15 AM',
      user: 'Mike Johnson',
      items: 5,
      coins: 60,
      earnings: 6.0,
      commission: 0.60,
      net: 5.40,
      status: 'completed'
    },
    {
      id: 3,
      date: 'Yesterday, 4:45 PM',
      user: 'Lisa Wang',
      items: 12,
      coins: 140,
      earnings: 14.0,
      commission: 1.40,
      net: 12.60,
      status: 'completed'
    },
    {
      id: 4,
      date: 'Yesterday, 2:20 PM',
      user: 'John Smith',
      items: 6,
      coins: 85,
      earnings: 8.5,
      commission: 0.85,
      net: 7.65,
      status: 'completed'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Top Performer',
      description: 'Completed 150+ pickups this month',
      icon: Award,
      earned: true,
      bonus: 500
    },
    {
      id: 2,
      title: 'Perfect Week',
      description: 'No rejected pickups for 7 days',
      icon: Target,
      earned: true,
      bonus: 200
    },
    {
      id: 3,
      title: 'Early Bird',
      description: 'Complete 10 morning pickups',
      icon: Clock,
      earned: false,
      progress: '7/10'
    }
  ];

  const currentData = earningsData[selectedPeriod];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-green-800 dark:text-green-200 font-semibold">Earnings Dashboard</h1>
              <p className="text-green-600 dark:text-green-400 text-sm">Track your income and performance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Period Selector */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-green-200 dark:border-green-700">
            {[
              { id: 'week', label: 'This Week' },
              { id: 'month', label: 'This Month' },
              { id: 'year', label: 'This Year' }
            ].map((period) => (
              <Button
                key={period.id}
                variant={selectedPeriod === period.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period.id)}
                className={`${selectedPeriod === period.id
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Earnings */}
          <Card className="border-green-200 dark:border-green-700 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{currentData.total.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    {currentData.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span className="text-sm">
                      {Math.abs(currentData.change)}% {currentData.trend === 'up' ? 'increase' : 'decrease'}
                    </span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          {/* Net Income */}
          <Card className="border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Net Income</p>
                  <p className="text-2xl font-bold">₹{currentData.net.toLocaleString()}</p>
                  <p className="text-blue-100 text-xs mt-1">After commission</p>
                </div>
                <Coins className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          {/* Total Pickups */}
          <Card className="border-purple-200 dark:border-purple-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">Total Pickups</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{currentData.pickups}</p>
                  <p className="text-purple-600 dark:text-purple-400 text-xs mt-1">Completed</p>
                </div>
                <Package className="w-6 h-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          {/* Average Per Pickup */}
          <Card className="border-orange-200 dark:border-orange-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 dark:text-orange-400 text-sm">Avg per Pickup</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">₹{currentData.avgPerPickup}</p>
                  <p className="text-orange-600 dark:text-orange-400 text-xs mt-1">Per completed pickup</p>
                </div>
                <BarChart3 className="w-6 h-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Breakdown (for week/month view) */}
        {(selectedPeriod === 'week' || selectedPeriod === 'month') && (
          <Card className="border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Daily Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyBreakdown.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 text-center">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">{day.day}</p>
                      </div>
                      <div className="flex-1 bg-green-200 dark:bg-green-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 dark:bg-green-400 rounded-full transition-all duration-500"
                          style={{ width: `${(day.earnings / 720) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">₹{day.earnings}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">{day.pickups} pickups</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Achievements & Bonuses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${achievement.earned
                    ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                      <achievement.icon className={`w-5 h-5 ${achievement.earned ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                        }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${achievement.earned ? 'text-green-800 dark:text-green-200' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                        {achievement.title}
                      </p>
                      <p className={`text-sm ${achievement.earned ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {achievement.earned ? (
                      <div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
                          Completed
                        </Badge>
                        {achievement.bonus && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            +₹{achievement.bonus}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Badge variant="outline" className="border-gray-300 text-gray-600">
                          {achievement.progress || 'Locked'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Transactions
              </div>
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">{transaction.user}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">{transaction.date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
                    {transaction.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Items</p>
                    <p className="font-medium text-green-800 dark:text-green-200">{transaction.items}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Coins</p>
                    <p className="font-medium text-green-800 dark:text-green-200">{transaction.coins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Commission</p>
                    <p className="font-medium text-red-600 dark:text-red-400">-₹{transaction.commission}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Net</p>
                    <p className="font-medium text-green-700 dark:text-green-300">₹{transaction.net}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
