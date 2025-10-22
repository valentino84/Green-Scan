import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import PropTypes from 'prop-types';
import {
  Menu,
  MapPin,
  Coins,
  Plus,
  Play,
  Home,
  ShoppingCart,
  Trophy,
  User,
  ChevronDown
} from 'lucide-react';

export function Dashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("New York, NY");
  const [greenCoins, setGreenCoins] = useState(1250);

  const draftCarts = [
    { id: 1, items: 3, estimatedCoins: 450 },
    { id: 2, items: 5, estimatedCoins: 700 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Top Bar */}
      <div className="bg-white border-b border-green-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-green-700 hover:bg-green-50"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-1 text-green-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{currentLocation}</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
            <Coins className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">{greenCoins.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white w-64 h-full p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-green-800">Menu</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart Info
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <User className="w-4 h-4 mr-2" />
                Manage Account
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Coins className="w-4 h-4 mr-2" />
                GreenCoins
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Home className="w-4 h-4 mr-2" />
                Donation
              </Button>
              <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Ongoing/Draft Carts Section */}
        <div className="space-y-4">
          <h2 className="text-green-800">Your Carts</h2>

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
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
                <p className="text-green-600 mb-4">No active carts</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Cart
                </Button>
              </CardContent>
            </Card>
          )}

          <Button
            variant="outline"
            className="w-full border-green-200 text-green-700 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Cart
          </Button>
        </div>

        {/* Gamification Section */}
        <Card className="border-green-200 bg-gradient-to-r from-green-100 to-emerald-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Eco Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-800">Weekly Recycler</p>
                  <p className="text-xs text-green-600">Recycle 10 items this week</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-700">7/10</p>
                  <div className="w-16 h-2 bg-green-200 rounded-full mt-1">
                    <div className="w-2/3 h-full bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-800">Coin Collector</p>
                  <p className="text-xs text-green-600">Earn 500 GreenCoins</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-700">1250/500</p>
                  <Badge className="bg-green-600 text-xs mt-1">Complete</Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full border-green-300 text-green-700">
              View All Challenges
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">My Carts</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Challenges</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = { onLogout: PropTypes.any };
