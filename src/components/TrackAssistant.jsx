import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Truck,
  CheckCircle,
  Navigation,
  User,
  Star,
  Calendar,
  Package,
  ChevronRight,
  Eye
} from 'lucide-react';

export function TrackAssistant({ onBack }) {
  const [viewMode, setViewMode] = useState('list');
  const [selectedCart, setSelectedCart] = useState(null);

  const [scheduledCarts] = useState([
    {
      id: 'CART-001',
      pickupId: 'PU-2024-001',
      scheduledDate: 'Today',
      scheduledTime: '2:00 PM - 4:00 PM',
      address: '123 Green Street, Eco City, NY 10001',
      items: 12,
      estimatedCoins: 180,
      vendorName: 'EcoVendor NYC',
      status: 'assigned',
      assistantAssigned: {
        id: 'AST-001',
        name: 'Alex Kumar',
        photo: '👨‍💼',
        rating: 4.8,
        phone: '+1 (555) 123-4567',
        vehicleType: 'Electric Van',
        vehicleNumber: 'ECO-VAN-042',
        currentLocation: 'Green Avenue & 5th Street',
        estimatedArrival: '15 minutes',
        status: 'on-way'
      }
    },
    {
      id: 'CART-002',
      pickupId: 'PU-2024-002',
      scheduledDate: 'Tomorrow',
      scheduledTime: '10:00 AM - 12:00 PM',
      address: '456 Eco Lane, Green City, NY 10002',
      items: 8,
      estimatedCoins: 120,
      vendorName: 'Green Collectors',
      status: 'confirmed'
    },
    {
      id: 'CART-003',
      pickupId: 'PU-2024-003',
      scheduledDate: 'Dec 19',
      scheduledTime: '3:00 PM - 5:00 PM',
      address: '789 Recycle Road, Eco City, NY 10003',
      items: 15,
      estimatedCoins: 225,
      vendorName: 'Recycle Pro',
      status: 'scheduled'
    },
    {
      id: 'CART-004',
      pickupId: 'PU-2024-004',
      scheduledDate: 'Dec 15',
      scheduledTime: '1:00 PM - 3:00 PM',
      address: '321 Green Avenue, Eco City, NY 10004',
      items: 20,
      estimatedCoins: 300,
      vendorName: 'EcoVendor NYC',
      status: 'completed'
    }
  ]);

  const getPickupStatusInfo = (status) => {
    switch (status) {
      case 'scheduled':
        return {
          text: 'Scheduled',
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
          icon: <Calendar className="w-4 h-4" />
        };
      case 'confirmed':
        return {
          text: 'Confirmed',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'assigned':
        return {
          text: 'Assistant Assigned',
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
          icon: <User className="w-4 h-4" />
        };
      case 'picked-up':
        return {
          text: 'Picked Up',
          color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
          icon: <Truck className="w-4 h-4" />
        };
      case 'completed':
        return {
          text: 'Completed',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          icon: <CheckCircle className="w-4 h-4" />
        };
      default:
        return {
          text: 'Unknown',
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  const getAssistantStatusInfo = (status) => {
    switch (status) {
      case 'on-way':
        return {
          text: 'On the Way',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
          icon: <Truck className="w-4 h-4" />
        };
      case 'nearby':
        return {
          text: 'Nearby',
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
          icon: <Navigation className="w-4 h-4" />
        };
      case 'arrived':
        return {
          text: 'Arrived',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'collecting':
        return {
          text: 'Collecting Items',
          color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
          icon: <Package className="w-4 h-4" />
        };
      default:
        return {
          text: 'Unknown',
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  const handleViewCartDetails = (cart) => {
    setSelectedCart(cart);
    setViewMode('details');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCart(null);
  };

  const handleCallAssistant = () => {
    if (selectedCart?.assistantAssigned) {
      alert(`Calling ${selectedCart.assistantAssigned.name} at ${selectedCart.assistantAssigned.phone}`);
    }
  };

  const handleMessageAssistant = () => {
    if (selectedCart?.assistantAssigned) {
      alert(`Opening chat with ${selectedCart.assistantAssigned.name}`);
    }
  };

  // Render List View
  if (viewMode === 'list') {
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

              <h1 className="text-green-800 dark:text-green-200">Track Pickups</h1>
            </div>

            <ThemeToggle />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {scheduledCarts.filter(cart => cart.status !== 'completed').length}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">Active Pickups</p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {scheduledCarts.filter(cart => cart.status === 'completed').length}
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Carts List */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Scheduled Pickups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduledCarts.map((cart) => {
                const statusInfo = getPickupStatusInfo(cart.status);
                return (
                  <div
                    key={cart.id}
                    className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-100 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-800 transition-colors cursor-pointer"
                    onClick={() => handleViewCartDetails(cart)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={statusInfo.color}>
                            {statusInfo.icon}
                            <span className="ml-1">{statusInfo.text}</span>
                          </Badge>
                          <span className="text-sm text-green-600 dark:text-green-400">
                            {cart.pickupId}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                            <span className="text-green-800 dark:text-green-200">
                              {cart.scheduledDate} • {cart.scheduledTime}
                            </span>
                          </div>

                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                            <span className="text-green-700 dark:text-green-300 truncate">
                              {cart.address}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-green-600 dark:text-green-400">
                              {cart.items} items • {cart.estimatedCoins} coins
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                              {cart.vendorName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-3">
                        {cart.status === 'assigned' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 min-w-0 flex-shrink-0 absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto sm:ml-3">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden xs:inline sm:inline">Track</span>
                            <span className="xs:hidden sm:hidden">•</span>
                          </Button>
                        )}
                        {cart.status !== 'assigned' && (
                          <ChevronRight className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
            <CardContent className="p-4">
              <h3 className="text-green-800 dark:text-green-200 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                How Pickup Tracking Works
              </h3>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  Click on any pickup to view detailed tracking information
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  Live tracking available once assistant is assigned
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  Get real-time updates on pickup status
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  Direct communication with your assigned assistant
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render Details View
  if (viewMode === 'details' && selectedCart) {
    const assistantStatusInfo = selectedCart.assistantAssigned
      ? getAssistantStatusInfo(selectedCart.assistantAssigned.status)
      : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToList}
                className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <Logo size="small" showText={false} animated={false} />

              <h1 className="text-green-800 dark:text-green-200">Track Assistant</h1>
            </div>

            <ThemeToggle />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Current Status */}
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Current Pickup
                </CardTitle>
                {assistantStatusInfo && (
                  <Badge className={assistantStatusInfo.color}>
                    {assistantStatusInfo.icon}
                    <span className="ml-1">{assistantStatusInfo.text}</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Pickup ID</p>
                  <p className="text-green-700 dark:text-green-300">{selectedCart.pickupId}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Scheduled Time</p>
                  <p className="text-green-700 dark:text-green-300">{selectedCart.scheduledTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 dark:text-gray-400">Pickup Address</p>
                  <p className="text-green-700 dark:text-green-300">{selectedCart.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assistant Information */}
          {selectedCart.assistantAssigned ? (
            <>
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Your Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{selectedCart.assistantAssigned.photo}</div>
                    <div className="flex-1">
                      <h3 className="text-green-800 dark:text-green-200">{selectedCart.assistantAssigned.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCart.assistantAssigned.rating}</span>
                        <span className="text-sm text-gray-500">• Pickup Assistant</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Vehicle</p>
                      <p className="text-green-700 dark:text-green-300">{selectedCart.assistantAssigned.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Vehicle No.</p>
                      <p className="text-green-700 dark:text-green-300">{selectedCart.assistantAssigned.vehicleNumber}</p>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={handleCallAssistant}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-green-200 text-green-700"
                      onClick={handleMessageAssistant}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Location */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Live Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current Location</p>
                        <p className="text-green-700 dark:text-green-300">{selectedCart.assistantAssigned.currentLocation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">ETA</p>
                        <p className="text-green-700 dark:text-green-300 font-medium">{selectedCart.assistantAssigned.estimatedArrival}</p>
                      </div>
                    </div>

                    {/* Mock Map Area */}
                    <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-800 dark:to-blue-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Navigation className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-700 dark:text-green-300">Live Tracking Active</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
              <CardContent className="p-6 text-center">
                <User className="w-12 h-12 text-green-300 mx-auto mb-3" />
                <h3 className="text-green-800 dark:text-green-200 mb-2">Assistant Not Yet Assigned</h3>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  We'll assign a pickup assistant closer to your scheduled time. You'll receive a notification once assigned.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Pickup Details */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{selectedCart.items}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Est. GreenCoins</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">{selectedCart.estimatedCoins}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Vendor</p>
                <p className="text-green-700 dark:text-green-300">{selectedCart.vendorName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
            <CardContent className="p-4">
              <h3 className="text-green-800 dark:text-green-200 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                What to Expect
              </h3>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  Assistant will call when they arrive
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  Items will be weighed and verified
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  GreenCoins will be credited instantly
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                  You'll receive a pickup completion receipt
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
