import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import PropTypes from 'prop-types';
import {
  Menu,
  MapPin,
  Coins,
  Truck,
  User,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Home,
  Package,
  DollarSign,
  Users
} from 'lucide-react';

export function DashboardVendor({
  onLogout,
  location = "New York, NY",
  onGoToDashboard,
  onGoToPickups,
  onGoToEarnings,
  onGoToProfile
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Placeholder values for undefined variables
  const totalPickups = 10;
  const rejectedPickups = 2;
  const earnings = 15420;

  const stats = {
    totalPickups,
    rejectedPickups,
    earnings,
    commissionPaid: 1542
  };

  const pendingPickups = [
    {
      id: 1,
      user: "Sarah Chen",
      address: "123 Green St, NYC",
      items: 3,
      estimatedCoins: 15,
      distance: "0.8 miles",
      scheduledTime: "2:30 PM"
    },
    {
      id: 2,
      user: "Mike Johnson",
      address: "456 Eco Ave, NYC",
      items: 5,
      estimatedCoins: 25,
      distance: "1.2 miles",
      scheduledTime: "3:15 PM"
    },
    {
      id: 3,
      user: "Lisa Wang",
      address: "789 Recycle Rd, NYC",
      items: 2,
      estimatedCoins: 10,
      distance: "2.1 miles",
      scheduledTime: "4:00 PM"
    }
  ];

  const nearbyUsers = 12;

  const locationCTA = location.includes("Delhi")
    ? "Delhi Peak Hours - 15% more earnings"
    : location.includes("Mumbai")
      ? "Mumbai Rush Active - High demand area"
      : "Good pickup opportunities in your area";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 pb-24">
      {/* Top Bar - Mobile Optimized */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900 p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Logo size="small" showText={false} animated={false} />

            <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-none">{location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1">
              <Truck className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Active</span>
              <span className="sm:hidden">•</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay - Mobile Optimized */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div
            className="bg-white dark:bg-gray-800 w-72 sm:w-80 h-full p-6 space-y-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-green-200 dark:border-green-700 pb-4">
              <h3 className="text-green-800 dark:text-green-200 text-lg font-semibold">Vendor Menu</h3>
              <p className="text-green-600 dark:text-green-400 text-sm mt-1">Manage your pickup service</p>
            </div>

            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-lg">
                <User className="w-5 h-5 mr-3" />
                <span className="text-base">Profile</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-lg">
                <Package className="w-5 h-5 mr-3" />
                <span className="text-base">Pickup History</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 mr-3" />
                <span className="text-base">Earnings Report</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-lg">
                <Users className="w-5 h-5 mr-3" />
                <span className="text-base">Manage Assistants</span>
              </Button>

              <div className="pt-4 mt-6 border-t border-green-200 dark:border-green-700">
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-lg"
                >
                  <span className="text-base">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Header - Mobile Optimized */}
      <div className="px-4 py-4 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-800 dark:to-green-800">
        <h2 className="text-green-800 dark:text-green-100 mb-2 text-lg sm:text-xl font-semibold">Welcome back, EcoVendor 🚛</h2>
        <p className="text-green-600 dark:text-green-300 text-sm leading-relaxed">{locationCTA}</p>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="px-4 py-6 space-y-6">
        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="border-green-200 dark:border-green-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">Total Pickups</p>
                  <p className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-200">{stats.totalPickups}</p>
                </div>
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-medium">Rejected</p>
                  <p className="text-lg sm:text-xl font-bold text-orange-800 dark:text-orange-200">{stats.rejectedPickups}</p>
                </div>
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">Earnings</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-200">₹{stats.earnings.toLocaleString()}</p>
                </div>
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-700">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium">Commission</p>
                  <p className="text-lg sm:text-xl font-bold text-purple-800 dark:text-purple-200">₹{stats.commissionPaid.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Map of Nearby Users - Mobile Optimized */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Live User Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl text-center">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-3" />
              <p className="text-green-700 dark:text-green-300 text-base font-medium mb-4">
                {nearbyUsers} users nearby with active carts
              </p>
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 font-medium">
                View Map
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Requests */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center text-lg">
              <Package className="w-5 h-5 mr-2" />
              Pickup Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-3 sm:px-6">
            {pendingPickups.map((pickup, index) => (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* User Info and Time */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium text-base">{pickup.user}</p>
                      <p className="text-green-600 dark:text-green-400 text-sm truncate max-w-[200px]">{pickup.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {pickup.scheduledTime}
                    </div>
                  </div>
                </div>

                {/* Item Details - Mobile Optimized */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <Package className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">{pickup.items}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">items</p>
                  </div>
                  <div className="text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <Coins className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">{pickup.estimatedCoins}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">coins</p>
                  </div>
                  <div className="text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">{pickup.distance}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">away</p>
                  </div>
                </div>

                {/* Action Buttons - Mobile First */}
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <motion.div className="flex-1" whileHover={{ scale: 1.05 }}>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium py-3 transition-all duration-200"
                      >
                        Accept
                      </Button>
                    </motion.div>
                    <motion.div className="flex-1" whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="outline"
                        className="w-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium py-3 transition-all duration-200"
                      >
                        Reject
                      </Button>
                    </motion.div>
                  </div>

                  <div className="flex space-x-3">
                    <motion.div className="flex-1" whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="outline"
                        className="w-full text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call User
                      </Button>
                    </motion.div>
                    <motion.div className="flex-1" whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="outline"
                        className="w-full text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-green-200 dark:border-green-700 px-2 py-2 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 px-3 py-2 min-h-[60px] hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={() => onGoToDashboard && onGoToDashboard()}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 px-3 py-2 min-h-[60px] hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={() => onGoToPickups && onGoToPickups()}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs font-medium">Pickups</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 px-3 py-2 min-h-[60px] hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={() => onGoToEarnings && onGoToEarnings()}
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-xs font-medium">Earnings</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 px-3 py-2 min-h-[60px] hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={() => onGoToProfile && onGoToProfile()}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

DashboardVendor.propTypes = {
  onLogout: PropTypes.func,
  location: PropTypes.string,
  onGoToDashboard: PropTypes.func,
  onGoToPickups: PropTypes.func,
  onGoToEarnings: PropTypes.func,
  onGoToProfile: PropTypes.func
};
