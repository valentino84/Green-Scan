import { useState } from 'react';
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
  Plus,
  Play,
  Home,
  ShoppingCart,
  Navigation,
  User,
  ChevronDown,
  Truck,
  Gift,
  Heart
} from 'lucide-react';

export function DashboardUser({
  onLogout,
  location = "New York, NY",
  onGoToCart,
  onGoToMyCarts,
  onGoToProfile,
  onGoToDonate,
  onGoToSchedulePickup,
  onGoToFindVendor,
  onGoToTrackAssistant,
  onGoToRedeem,
  onGoToWallet,
  onSelectVendor
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greenCoins, setGreenCoins] = useState(1250);

  const draftCarts = [
    { id: 1, items: 3, estimatedCoins: 450 },
    { id: 2, items: 5, estimatedCoins: 700 }
  ];

  const nearbyVendors = [
    {
      id: 1,
      name: "EcoVendor NYC",
      distance: 1.2,
      rating: 4.5,
      coinsPerKg: 50,
      phone: "(555) 123-4567",
      address: "123 Green St, New York, NY 10001",
      hours: "8:00 AM - 6:00 PM",
      estimatedWaitTime: "5-10 min",
      verified: true,
      specialties: ["Plastic", "Metal", "Glass"]
    },
    {
      id: 2,
      name: "Green Collectors",
      distance: 2.5,
      rating: 4.0,
      coinsPerKg: 45,
      phone: "(555) 234-5678",
      address: "456 Eco Ave, New York, NY 10002",
      hours: "9:00 AM - 5:00 PM",
      estimatedWaitTime: "10-15 min",
      verified: true,
      specialties: ["Paper", "Cardboard", "Electronics"]
    },
    {
      id: 3,
      name: "Recycle Pro",
      distance: 3.8,
      rating: 4.8,
      coinsPerKg: 60,
      phone: "(555) 345-6789",
      address: "789 Sustainable Blvd, New York, NY 10003",
      hours: "7:00 AM - 7:00 PM",
      estimatedWaitTime: "15-20 min",
      verified: true,
      specialties: ["All Materials", "Hazardous Waste"]
    }
  ];

  const locationCTA = location.includes("Delhi")
    ? "Join Delhi Recycling Drive this week - Extra 50 coins"
    : location.includes("Mumbai")
      ? "Mumbai Clean City Challenge - Double rewards"
      : "Start Recycling in your area today";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900 pb-20">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Logo size="small" showText={false} animated={false} />

            <div className="flex items-center space-x-1 text-green-700 dark:text-green-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-800 px-3 py-1 rounded-full">
              <Coins className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-800 dark:text-green-200">{greenCoins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white dark:bg-gray-800 w-64 h-full p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-green-800 dark:text-green-200">Menu</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => onGoToProfile && onGoToProfile()}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => onGoToMyCarts && onGoToMyCarts()}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                My Carts
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => onGoToWallet && onGoToWallet()}
              >
                <Coins className="w-4 h-4 mr-2" />
                GreenCoins Wallet
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => onGoToDonate && onGoToDonate()}
              >
                <Heart className="w-4 h-4 mr-2" />
                Donation
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => onGoToRedeem && onGoToRedeem()}
              >
                <Gift className="w-4 h-4 mr-2" />
                Rewards Store
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => onGoToTrackAssistant && onGoToTrackAssistant()}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Track Assistant
              </Button>
              <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Welcome Header */}
      <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800">
        <h2 className="text-green-800 dark:text-green-100 mb-1">Welcome back, Eco-Warrior 🌱</h2>
        <p className="text-green-600 dark:text-green-300 text-sm">{locationCTA}</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Coin Balance Widget */}
        <Card
          className="border-green-200 bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-pointer hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
          onClick={() => onGoToWallet && onGoToWallet()}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Your GreenCoins</p>
                <p className="text-2xl font-bold">{greenCoins.toLocaleString()}</p>
                <p className="text-green-100 text-xs mt-1">Tap to view wallet</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Coins className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-green-600 hover:bg-green-700 h-16 flex-col space-y-1"
            onClick={() => onGoToSchedulePickup && onGoToSchedulePickup()}
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Schedule Pickup</span>
          </Button>
          <Button
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 h-16 flex-col space-y-1"
            onClick={() => onGoToFindVendor && onGoToFindVendor()}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm">Find Vendors</span>
          </Button>
        </div>

        {/* Nearby Vendors Map */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Nearest Vendors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyVendors.map((vendor, index) => (
              <div key={vendor.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-green-800 dark:text-green-200">{vendor.name}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{vendor.distance} mi • ⭐ {vendor.rating}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-700 dark:text-green-300">{vendor.coinsPerKg} coins/kg</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-green-300 text-green-700 hover:bg-green-600 hover:text-white transition-colors"
                    onClick={() => onSelectVendor && onSelectVendor(vendor)}
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Carts */}
        <div className="space-y-4">
          <h3 className="text-[rgba(5,101,12,1)] font-bold">Your Carts</h3>

          {draftCarts.length > 0 ? (
            <div className="space-y-3">
              {draftCarts.map((cart) => (
                <Card key={cart.id} className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            Draft
                          </Badge>
                          <span className="text-sm text-green-600">
                            {cart.items} items
                          </span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">
                          Est. {cart.estimatedCoins} GreenCoins
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onGoToCart && onGoToCart(cart.id)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-green-200">
              <CardContent className="p-6 text-center">
                <Truck className="w-12 h-12 text-green-300 mx-auto mb-3" />
                <p className="text-green-600 mb-4">No active carts</p>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => onGoToCart && onGoToCart()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Cart
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Donation/Reward Store */}
        <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Gift className="w-5 h-5 mr-2" />
              Rewards & Donations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 mr-2 border-blue-200 text-blue-700"
                onClick={() => onGoToDonate && onGoToDonate()}
              >
                <Heart className="w-4 h-4 mr-1" />
                Donate
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-green-200 text-green-700" onClick={onGoToRedeem}>
                <Gift className="w-4 h-4 mr-1" />
                Redeem
              </Button>
            </div>
            <p className="text-xs text-green-600 text-center">Use your GreenCoins for good causes or rewards</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-green-200 dark:border-green-700 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
            onClick={() => onGoToMyCarts && onGoToMyCarts()}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">My Carts</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
            onClick={() => onGoToTrackAssistant && onGoToTrackAssistant()}
          >
            <Navigation className="w-5 h-5" />
            <span className="text-xs">Track Assistant</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col space-y-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
            onClick={() => onGoToProfile && onGoToProfile()}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// DashboardUser.propTypes = {
//   onGoToCart: PropTypes.func,
//   onGoToDonate: PropTypes.func,
//   onGoToRedeem: PropTypes.func,
//   onGoToMyCarts: PropTypes.func,
//   onGoToTrackAssistant: PropTypes.func,
//   onGoToProfile: PropTypes.func,
// };
DashboardUser.propTypes = {
  onLogout: PropTypes.func.isRequired,
  location: PropTypes.string,
  onGoToCart: PropTypes.func,
  onGoToMyCarts: PropTypes.func,
  onGoToProfile: PropTypes.func,
  onGoToDonate: PropTypes.func,
  onGoToSchedulePickup: PropTypes.func,
  onGoToFindVendor: PropTypes.func,
  onGoToTrackAssistant: PropTypes.func,
  onGoToRedeem: PropTypes.func,
  onGoToWallet: PropTypes.func,
  onSelectVendor: PropTypes.func,
};
