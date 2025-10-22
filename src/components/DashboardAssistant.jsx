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
  Package,
  User,
  Phone,
  Camera,
  CheckCircle,
  QrCode,
  Navigation,
  Home,
  History,
  Scan
} from 'lucide-react';

export function DashboardAssistant({ onLogout, location = "New York, NY" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState('');
  const [assignedPickups, setAssignedPickups] = useState([]); // removed TS <any[]>  

  const examplePickups = [
    {
      id: "PK001",
      user: "Sarah Chen",
      address: "123 Green St, NYC",
      items: ["2x Plastic Bottles", "1x Cardboard Box", "3x Aluminum Cans"],
      status: "assigned",
      vendorName: "EcoVendor NYC",
      userContact: "+1-555-0123"
    },
    {
      id: "PK002",
      user: "Mike Johnson",
      address: "456 Eco Ave, NYC",
      items: ["1x Electronic Waste", "5x Glass Bottles"],
      status: "in_progress",
      vendorName: "EcoVendor NYC",
      userContact: "+1-555-0456"
    }
  ];

  const handleIdSubmit = (e) => {
    e.preventDefault();
    // Simulate fetching assigned pickups
    if (uniqueId.length >= 4) {
      setAssignedPickups(examplePickups);
    }
  };

  const confirmPickup = (pickupId) => {
    setAssignedPickups(prev =>
      prev.map(p => p.id === pickupId
        ? { ...p, status: 'completed' }
        : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-orange-950 dark:to-green-950 pb-20">
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
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300">
              <Package className="w-3 h-3 mr-1" />
              Assistant
            </Badge>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white w-64 h-full p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-green-800">Assistant Menu</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <History className="w-4 h-4 mr-2" />
                Pickup History
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Scan className="w-4 h-4 mr-2" />
                Scan QR Code
              </Button>
              <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="p-4 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-800 dark:to-green-800">
        <h2 className="text-green-800 dark:text-green-100 mb-1">Pickup Assistant Dashboard 📦</h2>
        <p className="text-green-600 dark:text-green-300 text-sm">Help vendors complete pickups efficiently</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* ID Entry Section */}
        {assignedPickups.length === 0 && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Enter Pickup Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleIdSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Unique ID or scan QR code"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:border-green-400 outline-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={uniqueId.length < 4}
                  >
                    Get Assignments
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-green-200 text-green-700"
                  >
                    <QrCode className="w-4 h-4 mr-1" />
                    Scan QR
                  </Button>
                </div>
              </form>

              <div className="text-center text-sm text-green-600">
                Enter the unique ID provided by your vendor or scan the QR code to view assigned pickups.
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assigned Pickups */}
        {assignedPickups.length > 0 && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Assigned Pickups ({assignedPickups.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignedPickups.map((pickup) => (
                <div key={pickup.id} className="border border-green-200 p-4 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-green-800">{pickup.user}</p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${pickup.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : pickup.status === 'in_progress'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                        >
                          {pickup.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-green-600 mb-2">{pickup.address}</p>

                      <div className="text-sm text-green-600">
                        <p className="font-medium mb-1">Items to collect:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {pickup.items.map((item, idx) => (
                            <li key={idx} className="text-xs">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="text-xs text-green-600">ID: {pickup.id}</p>
                      <p className="text-xs text-green-600">Vendor: {pickup.vendorName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-green-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                        <Phone className="w-3 h-3 mr-1" />
                        Call User
                      </Button>
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                        <Navigation className="w-3 h-3 mr-1" />
                        Directions
                      </Button>
                    </div>

                    {pickup.status !== 'completed' ? (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-orange-600 border-orange-200">
                          <Camera className="w-3 h-3 mr-1" />
                          Photo
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => confirmPickup(pickup.id)}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      </div>
                    ) : (
                      <Badge className="bg-green-600 text-xs">
                        ✓ Completed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Instructions Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 text-base">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-blue-700">• Get the unique ID or QR code from your vendor</p>
            <p className="text-sm text-blue-700">• Navigate to user locations using the directions button</p>
            <p className="text-sm text-blue-700">• Take a photo of collected items before confirming pickup</p>
            <p className="text-sm text-blue-700">• Complete the pickup to update both user and vendor</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <Home className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">Scan</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col space-y-1 text-green-600">
            <History className="w-5 h-5" />
            <span className="text-xs">History</span>
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

DashboardAssistant.propTypes = {
  onLogout: PropTypes.func.isRequired,
  location: PropTypes.string
};
