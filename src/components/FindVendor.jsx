import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ThemeToggle } from './ThemeToggle';
import {
  ArrowLeft,
  MapPin,
  Search,
  Star,
  Truck,
  Phone,
  Clock,
  Navigation,
  Filter,
  Map,
  List,
  Coins,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Removed interfaces (JSX doesn’t support TypeScript types)

export function FindVendor({ onBack, onGetDirections, onSelectVendor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    distance: 'all',
    rating: 'all',
    services: 'all',
    verified: false
  });

  const allVendors = [
    {
      id: 1,
      name: "EcoVendor NYC",
      address: "123 Green St, New York, NY 10001",
      distance: 0.3,
      rating: 4.8,
      reviews: 324,
      phone: "(555) 123-4567",
      hours: "8:00 AM - 6:00 PM",
      specialties: ["Plastic", "Metal", "Glass"],
      coinsPerKg: 25,
      verified: true,
      acceptsPickup: true,
      acceptsDropoff: true,
      estimatedWaitTime: "5-10 min"
    },
    {
      id: 2,
      name: "Green Collectors Co.",
      address: "456 Eco Ave, New York, NY 10002",
      distance: 0.5,
      rating: 4.6,
      reviews: 198,
      phone: "(555) 234-5678",
      hours: "9:00 AM - 5:00 PM",
      specialties: ["Paper", "Cardboard", "Electronics"],
      coinsPerKg: 22,
      verified: true,
      acceptsPickup: true,
      acceptsDropoff: false,
      estimatedWaitTime: "10-15 min"
    },
    {
      id: 3,
      name: "Recycle Pro Solutions",
      address: "789 Sustainable Blvd, New York, NY 10003",
      distance: 0.8,
      rating: 4.9,
      reviews: 456,
      phone: "(555) 345-6789",
      hours: "7:00 AM - 7:00 PM",
      specialties: ["All Materials", "Hazardous Waste"],
      coinsPerKg: 30,
      verified: true,
      acceptsPickup: true,
      acceptsDropoff: true,
      estimatedWaitTime: "15-20 min"
    },
    {
      id: 4,
      name: "City Waste Management",
      address: "321 Recycle Rd, New York, NY 10004",
      distance: 1.2,
      rating: 4.3,
      reviews: 89,
      phone: "(555) 456-7890",
      hours: "8:00 AM - 4:00 PM",
      specialties: ["Bulk Items", "Construction"],
      coinsPerKg: 18,
      verified: false,
      acceptsPickup: false,
      acceptsDropoff: true,
      estimatedWaitTime: "20-30 min"
    },
    {
      id: 5,
      name: "EcoFriendly Recyclers",
      address: "654 Earth Way, New York, NY 10005",
      distance: 1.5,
      rating: 4.7,
      reviews: 267,
      phone: "(555) 567-8901",
      hours: "9:00 AM - 6:00 PM",
      specialties: ["Organic", "Compost", "Textiles"],
      coinsPerKg: 28,
      verified: true,
      acceptsPickup: true,
      acceptsDropoff: true,
      estimatedWaitTime: "5-15 min"
    }
  ];

  const filteredVendors = allVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDistance = selectedFilters.distance === 'all' ||
      (selectedFilters.distance === '1' && vendor.distance <= 1) ||
      (selectedFilters.distance === '2' && vendor.distance <= 2);

    const matchesRating = selectedFilters.rating === 'all' ||
      vendor.rating >= parseFloat(selectedFilters.rating);

    const matchesServices = selectedFilters.services === 'all' ||
      (selectedFilters.services === 'pickup' && vendor.acceptsPickup) ||
      (selectedFilters.services === 'dropoff' && vendor.acceptsDropoff);

    const matchesVerified = !selectedFilters.verified || vendor.verified;

    return matchesSearch && matchesDistance && matchesRating && matchesServices && matchesVerified;
  });

  const handleContact = (vendor) => {
    if (vendor.phone) {
      window.location.href = `tel:${vendor.phone}`;
    }
  };

  const handleGetDirectionsClick = (vendor) => {
    if (onGetDirections) {
      onGetDirections(vendor);
    }
  };

  const handleSelectVendorClick = (vendor) => {
    if (onSelectVendor) {
      onSelectVendor(vendor);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900 pb-6">
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
            <h1 className="text-green-800 dark:text-green-200 font-semibold">Find Vendors</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterOpen(!filterOpen)}
              className="text-green-700 dark:text-green-300"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            <Input
              placeholder="Search vendors by name, location, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-4 pb-3 border-t border-green-200 dark:border-green-700 pt-3"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-green-700 dark:text-green-300 text-sm">Distance</label>
                <select
                  value={selectedFilters.distance}
                  onChange={(e) => setSelectedFilters({ ...selectedFilters, distance: e.target.value })}
                  className="w-full mt-1 p-2 border border-green-300 dark:border-green-600 rounded bg-white dark:bg-gray-800 text-green-800 dark:text-green-200"
                >
                  <option value="all">Any distance</option>
                  <option value="1">Within 1 mile</option>
                  <option value="2">Within 2 miles</option>
                </select>
              </div>

              <div>
                <label className="text-green-700 dark:text-green-300 text-sm">Rating</label>
                <select
                  value={selectedFilters.rating}
                  onChange={(e) => setSelectedFilters({ ...selectedFilters, rating: e.target.value })}
                  className="w-full mt-1 p-2 border border-green-300 dark:border-green-600 rounded bg-white dark:bg-gray-800 text-green-800 dark:text-green-200"
                >
                  <option value="all">Any rating</option>
                  <option value="4.5">4.5+ stars</option>
                  <option value="4.0">4.0+ stars</option>
                  <option value="3.5">3.5+ stars</option>
                </select>
              </div>

              <div>
                <label className="text-green-700 dark:text-green-300 text-sm">Services</label>
                <select
                  value={selectedFilters.services}
                  onChange={(e) => setSelectedFilters({ ...selectedFilters, services: e.target.value })}
                  className="w-full mt-1 p-2 border border-green-300 dark:border-green-600 rounded bg-white dark:bg-gray-800 text-green-800 dark:text-green-200"
                >
                  <option value="all">All services</option>
                  <option value="pickup">Pickup only</option>
                  <option value="dropoff">Drop-off only</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center space-x-2 text-green-700 dark:text-green-300 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedFilters.verified}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, verified: e.target.checked })}
                    className="rounded border-green-300"
                  />
                  <span>Verified only</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* View Toggle */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <p className="text-green-600 dark:text-green-400 text-sm">
              {filteredVendors.length} vendors found
            </p>
            <div className="flex bg-green-100 dark:bg-green-900 rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 py-1"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="px-3 py-1"
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-green-800 dark:text-green-200 font-semibold">{vendor.name}</h3>
                            {vendor.verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-green-600 dark:text-green-400">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {vendor.distance} mi
                            </span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              {vendor.rating} ({vendor.reviews})
                            </span>
                            <span className="flex items-center">
                              <Coins className="w-3 h-3 mr-1" />
                              {vendor.coinsPerKg}/kg
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Address & Hours */}
                      <div className="text-green-700 dark:text-green-300 text-sm">
                        <p className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {vendor.address}
                        </p>
                        <p className="flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {vendor.hours} • Wait: {vendor.estimatedWaitTime}
                        </p>
                      </div>

                      {/* Services */}
                      <div className="flex items-center space-x-2">
                        {vendor.acceptsPickup && (
                          <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                            <Truck className="w-3 h-3 inline mr-1" />
                            Pickup
                          </span>
                        )}
                        {vendor.acceptsDropoff && (
                          <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            Drop-off
                          </span>
                        )}
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContact(vendor)}
                          className="flex-1 border-green-300 text-green-700"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGetDirectionsClick(vendor)}
                          className="flex-1 border-blue-300 text-blue-700"
                        >
                          <Navigation className="w-3 h-3 mr-1" />
                          Directions
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSelectVendorClick(vendor)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-green-300 dark:text-green-600 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400 mb-2">No vendors found</p>
                <p className="text-green-500 dark:text-green-500 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Map View Placeholder */
          <Card className="border-green-200 dark:border-green-700 h-96">
            <CardContent className="p-6 flex items-center justify-center h-full">
              <div className="text-center">
                <Map className="w-16 h-16 text-green-300 dark:text-green-600 mx-auto mb-4" />
                <h3 className="text-green-800 dark:text-green-200 font-semibold mb-2">Map View</h3>
                <p className="text-green-600 dark:text-green-400 text-sm mb-4">
                  Interactive map with vendor locations would appear here
                </p>
                <p className="text-green-500 dark:text-green-500 text-xs">
                  Showing {filteredVendors.length} vendors in your area
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <Card className="border-green-200 dark:border-green-700 mt-6 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4">
            <h4 className="text-green-800 dark:text-green-200 font-medium mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Vendor Network Stats
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {allVendors.length}
                </p>
                <p className="text-green-700 dark:text-green-300 text-sm">Total Vendors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {allVendors.filter(v => v.verified).length}
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">Verified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.round(allVendors.reduce((sum, v) => sum + v.rating, 0) / allVendors.length * 10) / 10}
                </p>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
