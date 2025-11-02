import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import {
    Heart,
    Users,
    TrendingUp,
    DollarSign,
    Award,
    CheckCircle,
    Clock,
    AlertCircle,
    Gift,
    Target,
    Calendar
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function DashboardNgo({ onLogout, location = "Mumbai, India", approvalStatus }) {
    // Mock data for NGO dashboard
    const stats = {
        totalDonations: 15420,
        totalDonors: 342,
        activeCampaigns: 3,
        beneficiariesHelped: 1250
    };

    const recentDonations = [
        { id: 1, donor: 'Anonymous', amount: 500, date: '2 hours ago', cause: 'Tree Plantation' },
        { id: 2, donor: 'Ravi Kumar', amount: 250, date: '5 hours ago', cause: 'Clean Water' },
        { id: 3, donor: 'Priya Sharma', amount: 1000, date: '1 day ago', cause: 'Tree Plantation' },
        { id: 4, donor: 'Anonymous', amount: 750, date: '2 days ago', cause: 'Education' },
    ];

    const campaigns = [
        {
            id: 1,
            name: 'Tree Plantation Drive 2025',
            goal: 50000,
            raised: 35420,
            donors: 145,
            endDate: 'Mar 31, 2025'
        },
        {
            id: 2,
            name: 'Clean Water Initiative',
            goal: 30000,
            raised: 18250,
            donors: 89,
            endDate: 'Apr 15, 2025'
        },
        {
            id: 3,
            name: 'Education for All',
            goal: 40000,
            raised: 22100,
            donors: 108,
            endDate: 'May 20, 2025'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900 dark:via-gray-900 dark:to-pink-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-purple-200 dark:border-purple-700 sticky top-0 z-10">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Logo size={32} />
                            <div>
                                <h1 className="text-lg text-purple-800 dark:text-purple-200">NGO Dashboard</h1>
                                <p className="text-xs text-purple-600 dark:text-purple-400">{location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onLogout}
                                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-4 space-y-6">
                {/* Approval Status Banner */}
                {approvalStatus === 'pending' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <AlertDescription className="text-amber-800 dark:text-amber-200">
                                <strong>Verification Pending:</strong> Your NGO profile is under review. You'll be able to receive donations once approved (usually within 24-48 hours).
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                {approvalStatus === 'rejected' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <AlertDescription className="text-red-800 dark:text-red-200">
                                <strong>Profile Rejected:</strong> Your NGO profile verification was rejected. Please contact support for more information.
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                {approvalStatus === 'approved' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                <strong>Profile Approved:</strong> Your NGO is verified and can now receive donations through GreenScan!
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <p className="text-2xl text-purple-800 dark:text-purple-200">{stats.totalDonations}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">GreenCoins Received</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Users className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                                </div>
                                <p className="text-2xl text-purple-800 dark:text-purple-200">{stats.totalDonors}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Donors</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="text-2xl text-purple-800 dark:text-purple-200">{stats.activeCampaigns}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <p className="text-2xl text-purple-800 dark:text-purple-200">{stats.beneficiariesHelped}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Lives Impacted</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Active Campaigns */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                <Target className="w-5 h-5" />
                                Active Campaigns
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {campaigns.map((campaign, index) => {
                                const progress = (campaign.raised / campaign.goal) * 100;
                                return (
                                    <motion.div
                                        key={campaign.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-medium text-purple-800 dark:text-purple-200">{campaign.name}</h4>
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {campaign.donors} donors
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        Ends: {campaign.endDate}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-purple-700 dark:text-purple-300">
                                                    {campaign.raised.toLocaleString()} / {campaign.goal.toLocaleString()} coins
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{progress.toFixed(1)}% funded</p>
                                    </motion.div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Recent Donations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Card className="border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                <Gift className="w-5 h-5" />
                                Recent Donations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentDonations.map((donation, index) => (
                                <motion.div
                                    key={donation.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.05 }}
                                    className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-purple-800 dark:text-purple-200">{donation.donor}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{donation.cause} • {donation.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
                                        <Award className="w-4 h-4" />
                                        <span className="font-medium">{donation.amount}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
