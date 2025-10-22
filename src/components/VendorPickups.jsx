import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Clock,
  Coins,
  Phone,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  Search,
  Truck
} from 'lucide-react';
import { Input } from './ui/input';

export function VendorPickups({ onBack }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const pendingPickups = [
    {
      id: 1,
      user: "Sarah Chen",
      address: "123 Green St, NYC",
      items: 8,
      estimatedCoins: 95,
      distance: "0.8 miles",
      scheduledTime: "2:30 PM",
      status: "pending",
      phone: "(555) 123-4567",
      itemTypes: ["Plastic bottles", "Paper", "Glass"],
      requestTime: "1 hour ago"
    },
    {
      id: 2,
      user: "Mike Johnson",
      address: "456 Eco Ave, NYC",
      items: 5,
      estimatedCoins: 60,
      distance: "1.2 miles",
      scheduledTime: "3:15 PM",
      status: "pending",
      phone: "(555) 234-5678",
      itemTypes: ["Cardboard", "Metal cans"],
      requestTime: "2 hours ago"
    },
    {
      id: 3,
      user: "Lisa Wang",
      address: "789 Recycle Rd, NYC",
      items: 12,
      estimatedCoins: 140,
      distance: "2.1 miles",
      scheduledTime: "4:00 PM",
      status: "pending",
      phone: "(555) 345-6789",
      itemTypes: ["Electronics", "Batteries", "Paper"],
      requestTime: "30 minutes ago"
    }
  ];

  const completedPickups = [
    {
      id: 4,
      user: "John Smith",
      address: "321 Eco Street, NYC",
      items: 6,
      actualCoins: 85,
      distance: "0.5 miles",
      completedTime: "11:30 AM",
      status: "completed",
      earnings: 8.5,
      itemTypes: ["Plastic", "Glass"],
      completedDate: "Today"
    },
    {
      id: 5,
      user: "Emma Davis",
      address: "654 Green Ave, NYC",
      items: 10,
      actualCoins: 120,
      distance: "1.8 miles",
      completedTime: "10:15 AM",
      status: "completed",
      earnings: 12.0,
      itemTypes: ["Paper", "Cardboard", "Metal"],
      completedDate: "Today"
    }
  ];

  const rejectedPickups = [
    {
      id: 6,
      user: "Alex Brown",
      address: "987 Recycle Blvd, NYC",
      items: 3,
      estimatedCoins: 35,
      distance: "3.2 miles",
      rejectedTime: "Yesterday",
      status: "rejected",
      reason: "Too far from route",
      itemTypes: ["Plastic bottles"]
    }
  ];

  const getCurrentPickups = () => {
    switch (activeTab) {
      case 'pending':
        return pendingPickups;
      case 'completed':
        return completedPickups;
      case 'rejected':
        return rejectedPickups;
      default:
        return pendingPickups;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
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
              <h1 className="text-green-800 dark:text-green-200 font-semibold">Pickup Management</h1>
              <p className="text-green-600 dark:text-green-400 text-sm">Manage your pickup requests</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 px-4 py-2">
        <div className="flex space-x-1">
          {[
            { id: 'pending', label: 'Pending', count: pendingPickups.length },
            { id: 'completed', label: 'Completed', count: completedPickups.length },
            { id: 'rejected', label: 'Rejected', count: rejectedPickups.length }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 ${activeTab === tab.id
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
            >
              <span>{tab.label}</span>
              <Badge variant="secondary" className="bg-white/20 text-current">
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <Input
              placeholder="Search by user name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-green-200 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400"
            />
          </div>
          <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Pickup List */}
      <div className="p-4 space-y-4">
        {getCurrentPickups().map((pickup, index) => (
          <motion.div
            key={pickup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card className="border-green-200 dark:border-green-700 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Header with User and Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">{pickup.user}</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">{pickup.address}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(pickup.status)}>
                    {pickup.status}
                  </Badge>
                </div>

                {/* Item Types */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {pickup.itemTypes.map((type, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <Package className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">{pickup.items}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">items</p>
                  </div>
                  <div className="text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <Coins className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      {'estimatedCoins' in pickup ? pickup.estimatedCoins : pickup.actualCoins}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">coins</p>
                  </div>
                  <div className="text-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">{pickup.distance}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">away</p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {'scheduledTime' in pickup ? `Scheduled: ${pickup.scheduledTime}` :
                      'completedTime' in pickup ? `Completed: ${pickup.completedTime}` :
                        'rejectedTime' in pickup ? `Rejected: ${pickup.rejectedTime}` : ''}
                  </div>
                  {'earnings' in pickup && (
                    <div className="text-green-700 dark:text-green-300 font-medium">
                      Earned: ₹{pickup.earnings}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {activeTab === 'pending' && (
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1 text-green-600 border-green-200 hover:bg-green-50">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="flex-1 text-green-600 border-green-200 hover:bg-green-50">
                        <MapPin className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'completed' && (
                  <div className="flex justify-center">
                    <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                      <Truck className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                )}

                {activeTab === 'rejected' && pickup.reason && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      <strong>Reason:</strong> {pickup.reason}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {getCurrentPickups().length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-green-300 mx-auto mb-4" />
            <p className="text-green-600 dark:text-green-400">No {activeTab} pickups found</p>
          </div>
        )}
      </div>
    </div>
  );
}
