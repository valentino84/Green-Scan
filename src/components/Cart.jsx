import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Camera,
  QrCode,
  Coins,
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Zap
} from 'lucide-react';

export function Cart({ onBack, cartId = 1, onGoToItemScanner, selectedVendor: propSelectedVendor }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Plastic Bottles",
      category: "Plastic",
      weight: 2.5,
      coinsPerKg: 25,
      verified: true
    },
    {
      id: 2,
      name: "Aluminum Cans",
      category: "Metal",
      weight: 1.2,
      coinsPerKg: 45,
      verified: true
    },
    {
      id: 3,
      name: "Cardboard Box",
      category: "Paper",
      weight: 0.8,
      coinsPerKg: 15,
      verified: false
    }
  ]);

  const [selectedVendor, setSelectedVendor] = useState(
    propSelectedVendor ? {
      name: propSelectedVendor.name,
      distance: `${propSelectedVendor.distance} miles`,
      rating: propSelectedVendor.rating,
      estimatedPickup: propSelectedVendor.estimatedWaitTime || "Today, 2-4 PM"
    } : {
      name: "EcoVendor NYC",
      distance: "0.3 miles",
      rating: 4.8,
      estimatedPickup: "Today, 2-4 PM"
    }
  );

  const [showVendorDropdown, setShowVendorDropdown] = useState(false);

  const availableVendors = [
    {
      name: "EcoVendor NYC",
      distance: "0.3 miles",
      rating: 4.8,
      estimatedPickup: "Today, 2-4 PM"
    },
    {
      name: "Green Collectors",
      distance: "0.5 miles",
      rating: 4.6,
      estimatedPickup: "Today, 3-5 PM"
    },
    {
      name: "Recycle Pro",
      distance: "0.8 miles",
      rating: 4.9,
      estimatedPickup: "Tomorrow, 10-12 PM"
    },
    {
      name: "EcoWaste Solutions",
      distance: "1.2 miles",
      rating: 4.7,
      estimatedPickup: "Tomorrow, 2-4 PM"
    }
  ];

  const calculateTotalCoins = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.weight * item.coinsPerKg);
    }, 0);
  };

  const calculateTotalWeight = () => {
    return cartItems.reduce((total, item) => total + item.weight, 0);
  };

  const isPickupEligible = () => {
    const totalWeight = calculateTotalWeight();
    return totalWeight >= 3 && totalWeight <= 6;
  };

  const updateItemWeight = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, weight: Math.max(0.1, item.weight + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const addNewItem = () => {
    if (onGoToItemScanner) {
      onGoToItemScanner();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-green-800 dark:text-green-200 font-semibold">My Cart #{cartId}</h1>
              <p className="text-green-600 dark:text-green-400 text-sm">
                {cartItems.length} items • {calculateTotalWeight().toFixed(1)} kg
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-800 px-3 py-1 rounded-full">
              <Coins className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-800 dark:text-green-200 font-medium">
                {calculateTotalCoins().toFixed(0)} coins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="px-4 py-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-green-800 dark:text-green-200 font-medium">Cart Summary</h3>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
              Draft
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{cartItems.length}</p>
              <p className="text-xs text-green-600 dark:text-green-400">Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{calculateTotalWeight().toFixed(1)}</p>
              <p className="text-xs text-green-600 dark:text-green-400">kg</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{calculateTotalCoins().toFixed(0)}</p>
              <p className="text-xs text-green-600 dark:text-green-400">GreenCoins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-green-800 dark:text-green-200 font-medium">Items in Cart</h3>
          <Button
            onClick={addNewItem}
            size="sm"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-green-200 dark:border-green-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-green-800 dark:text-green-200 font-medium">{item.name}</h4>
                          {item.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-green-600 dark:text-green-400 text-sm">{item.category}</p>
                        <p className="text-green-600 dark:text-green-400 text-sm">
                          {item.coinsPerKg} coins/kg
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <p className="text-sm text-green-600 dark:text-green-400">Weight:</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateItemWeight(item.id, -0.1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-green-800 dark:text-green-200 font-medium min-w-[60px] text-center">
                          {item.weight.toFixed(1)} kg
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateItemWeight(item.id, 0.1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        {(item.weight * item.coinsPerKg).toFixed(0)} coins
                      </p>
                    </div>
                  </div>

                  {!item.verified && (
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Camera className="w-4 h-4 mr-1" />
                        Verify Photo
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <QrCode className="w-4 h-4 mr-1" />
                        Scan Code
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vendor Selection Notification */}
        {propSelectedVendor && (
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-blue-800 dark:text-blue-200 font-medium">
                    Vendor Pre-selected
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    {propSelectedVendor.name} has been automatically selected for this cart
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Vendor */}
        <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Selected Vendor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-green-800 dark:text-green-200 font-medium">{selectedVendor.name}</h4>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  {selectedVendor.distance} • ⭐ {selectedVendor.rating}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVendorDropdown(!showVendorDropdown)}
              >
                Change
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Estimated pickup: {selectedVendor.estimatedPickup}</span>
            </div>

            {/* Vendor Dropdown */}
            {showVendorDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded-lg shadow-lg overflow-hidden"
              >
                {availableVendors.map((vendor, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowVendorDropdown(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors border-b border-green-100 dark:border-green-800 last:border-b-0 ${vendor.name === selectedVendor.name ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-green-800 dark:text-green-200 font-medium">{vendor.name}</h4>
                        <p className="text-green-600 dark:text-green-400 text-sm">
                          {vendor.distance} • ⭐ {vendor.rating}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 dark:text-green-400 text-sm">{vendor.estimatedPickup}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          {isPickupEligible() ? (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-4 text-lg font-medium"
            >
              <Zap className="w-5 h-5 mr-2" />
              Schedule Pickup ({calculateTotalCoins().toFixed(0)} coins)
            </Button>
          ) : (
            <div className="space-y-3">
              <Button
                disabled
                className="w-full bg-gray-400 text-white py-4 text-lg font-medium cursor-not-allowed"
              >
                <Zap className="w-5 h-5 mr-2" />
                Schedule Pickup (Minimum 3kg required)
              </Button>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-amber-700 dark:text-amber-300 text-sm text-center">
                  <strong>Cart saved as draft!</strong><br />
                  Add more items to reach 3-6kg for pickup scheduling.
                  <br />
                  Current weight: {calculateTotalWeight().toFixed(1)}kg
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
