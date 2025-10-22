import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  Coins,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Trophy,
  Gift,
  Recycle,
  Heart,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  PiggyBank,
  Target,
  Zap
} from 'lucide-react';

// ✅ Removed TypeScript interfaces
// interface GreenCoinWalletProps { onBack: () => void; }
// interface Transaction { ... }
// interface Stat { ... }

export function GreenCoinWallet({ onBack }) {
  const [currentBalance] = useState(1250);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const [transactions] = useState([
    {
      id: 'TXN-001',
      type: 'earned',
      amount: 180,
      description: 'Recycling pickup completed',
      date: '2024-12-18',
      status: 'completed',
      relatedTo: 'PU-2024-001',
      category: 'Recycling'
    },
    {
      id: 'TXN-002',
      type: 'earned',
      amount: 50,
      description: 'Weekly challenge bonus',
      date: '2024-12-17',
      status: 'completed',
      category: 'Bonus'
    },
    {
      id: 'TXN-003',
      type: 'redeemed',
      amount: -100,
      description: 'Amazon Gift Card $10',
      date: '2024-12-16',
      status: 'completed',
      category: 'Rewards'
    },
    {
      id: 'TXN-004',
      type: 'donated',
      amount: -50,
      description: 'Tree Planting Initiative',
      date: '2024-12-15',
      status: 'completed',
      category: 'Donation'
    },
    {
      id: 'TXN-005',
      type: 'earned',
      amount: 120,
      description: 'Recycling pickup completed',
      date: '2024-12-14',
      status: 'completed',
      relatedTo: 'PU-2024-002',
      category: 'Recycling'
    },
    {
      id: 'TXN-006',
      type: 'earned',
      amount: 75,
      description: 'Plastic bottles & containers',
      date: '2024-12-13',
      status: 'completed',
      relatedTo: 'PU-2024-003',
      category: 'Recycling'
    },
    {
      id: 'TXN-007',
      type: 'bonus',
      amount: 25,
      description: 'First-time vendor bonus',
      date: '2024-12-12',
      status: 'completed',
      category: 'Bonus'
    },
    {
      id: 'TXN-008',
      type: 'earned',
      amount: 90,
      description: 'Mixed recyclables',
      date: '2024-12-11',
      status: 'pending',
      relatedTo: 'PU-2024-004',
      category: 'Recycling'
    }
  ]);

  const stats = [
    {
      label: 'Total Earned',
      value: '2,450',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      label: 'This Month',
      value: '520',
      change: '+25%',
      trend: 'up',
      icon: Calendar
    },
    {
      label: 'Total Donated',
      value: '150',
      change: '+8%',
      trend: 'up',
      icon: Heart
    },
    {
      label: 'Avg/Pickup',
      value: '125',
      change: '+3%',
      trend: 'up',
      icon: Target
    }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'earned':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'redeemed':
        return <ArrowDownLeft className="w-4 h-4 text-blue-600" />;
      case 'donated':
        return <ArrowDownLeft className="w-4 h-4 text-purple-600" />;
      case 'bonus':
        return <Zap className="w-4 h-4 text-yellow-600" />;
      default:
        return <Coins className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'earned':
        return 'text-green-600 dark:text-green-400';
      case 'redeemed':
        return 'text-blue-600 dark:text-blue-400';
      case 'donated':
        return 'text-purple-600 dark:text-purple-400';
      case 'bonus':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const now = new Date();

    switch (selectedPeriod) {
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return txDate >= weekAgo;
      }
      case 'month': {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return txDate >= monthAgo;
      }
      case 'year': {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        return txDate >= yearAgo;
      }
      default:
        return true;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900">
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

            <Logo size="small" showText={false} animated={false} />

            <h1 className="text-green-800 dark:text-green-200">GreenCoin Wallet</h1>
          </div>

          <ThemeToggle />
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Current Balance */}
        <Card className="border-green-200 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <CardContent className="p-4 sm:p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-green-100 text-sm">Current Balance</p>
                <p className="text-3xl sm:text-4xl font-bold">{currentBalance.toLocaleString()}</p>
                <p className="text-green-100 text-sm mt-1">GreenCoins</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Coins className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/80 text-xs">This Week</p>
                <p className="text-white font-semibold">+295</p>
              </div>
              <div className="text-center">
                <p className="text-white/80 text-xs">This Month</p>
                <p className="text-white font-semibold">+520</p>
              </div>
              <div className="text-center">
                <p className="text-white/80 text-xs">Total Earned</p>
                <p className="text-white font-semibold">2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-green-200">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                    <stat.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${stat.trend === 'up'
                      ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-200">{stat.value}</p>
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex-col space-y-1">
            <Gift className="w-5 h-5" />
            <span className="text-xs">Redeem</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col space-y-1">
            <Heart className="w-5 h-5" />
            <span className="text-xs">Donate</span>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 h-16 flex-col space-y-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Earn More</span>
          </Button>
        </div>

        {/* Transactions */}
        <Card className="border-green-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Transaction History
              </CardTitle>

              <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value)}>
                <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                  <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg border border-green-100 dark:border-green-800"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200 truncate">
                          {transaction.description}
                        </p>
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400">
                        <span>{formatDate(transaction.date)}</span>
                        {transaction.category && (
                          <>
                            <span>•</span>
                            <span>{transaction.category}</span>
                          </>
                        )}
                        {transaction.relatedTo && (
                          <>
                            <span>•</span>
                            <span>{transaction.relatedTo}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Coins className="w-12 h-12 text-green-300 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400">No transactions found for this period</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements & Goals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Goals */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center text-base">
                <Target className="w-5 h-5 mr-2" />
                Monthly Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600 dark:text-green-400">Progress</span>
                    <span className="text-green-800 dark:text-green-200">520 / 750</span>
                  </div>
                  <div className="w-full bg-green-100 dark:bg-green-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(520 / 750) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  230 more coins to reach your monthly goal!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievement */}
          <Card className="border-green-200 bg-gradient-to-br from-yellow-50 to-green-50 dark:from-yellow-900 dark:to-green-900">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center text-base">
                <Trophy className="w-5 h-5 mr-2" />
                Latest Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-full">
                  <Recycle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Eco Champion</p>
                  <p className="text-xs text-green-600 dark:text-green-400">50+ items recycled this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
          <CardContent className="p-4">
            <h3 className="text-green-800 dark:text-green-200 mb-3 flex items-center">
              <PiggyBank className="w-5 h-5 mr-2" />
              Earning Tips
            </h3>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                Schedule regular pickups to maintain consistent earnings
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                Sort your recyclables properly for bonus coins
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                Complete weekly challenges for extra rewards
              </li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
