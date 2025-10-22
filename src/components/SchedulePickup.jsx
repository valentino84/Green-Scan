import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ThemeToggle } from './ThemeToggle';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Truck,
  Plus,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Package,
  Star,
  Navigation
} from 'lucide-react';

export function SchedulePickup({ onBack }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow
  );
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [pickupAddress, setPickupAddress] = useState('123 Green Street, Apt 4B');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [contactPhone, setContactPhone] = useState('+1 (555) 123-4567');

  const vendors = [
    {
      id: 1,
      name: "EcoVendor NYC",
      distance: "0.3 miles",
      rating: 4.8,
      baseFee: 5,
      timeSlots: [
        { id: "morning1", time: "9:00 AM - 11:00 AM", available: true },
        { id: "morning2", time: "11:00 AM - 1:00 PM", available: true },
        { id: "afternoon1", time: "1:00 PM - 3:00 PM", available: false },
        { id: "afternoon2", time: "3:00 PM - 5:00 PM", available: true }
      ]
    },
    {
      id: 2,
      name: "Green Collectors",
      distance: "0.5 miles",
      rating: 4.6,
      baseFee: 3,
      timeSlots: [
        { id: "morning1", time: "8:00 AM - 10:00 AM", available: true },
        { id: "morning2", time: "10:00 AM - 12:00 PM", available: true },
        { id: "afternoon1", time: "2:00 PM - 4:00 PM", available: true },
        { id: "evening1", time: "4:00 PM - 6:00 PM", available: false }
      ]
    },
    {
      id: 3,
      name: "Recycle Pro",
      distance: "0.8 miles",
      rating: 4.9,
      baseFee: 7,
      timeSlots: [
        { id: "morning1", time: "9:30 AM - 11:30 AM", available: true },
        { id: "afternoon1", time: "1:30 PM - 3:30 PM", available: true },
        { id: "afternoon2", time: "3:30 PM - 5:30 PM", available: true }
      ]
    }
  ];

  const [upcomingPickups] = useState([
    {
      id: 1,
      vendor: "EcoVendor NYC",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      items: 3,
      estimatedCoins: 85
    },
    {
      id: 2,
      vendor: "Green Collectors",
      date: "2024-01-25",
      time: "10:00 AM - 12:00 PM",
      status: "pending",
      items: 5,
      estimatedCoins: 120
    }
  ]);

  const canSchedule = selectedVendor && selectedTimeSlot && pickupAddress && contactPhone;

  const handleSchedulePickup = () => {
    if (canSchedule) {
      console.log('Scheduling pickup:', {
        vendor: selectedVendor,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        address: pickupAddress,
        phone: contactPhone,
        instructions: specialInstructions
      });
      onBack();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

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
            <h1 className="text-green-800 dark:text-green-200 font-semibold">Schedule Pickup</h1>
          </div>

          <ThemeToggle />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Pickup Date Selection */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date" className="text-green-700 dark:text-green-300">
                Pickup Date
              </Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={tomorrow}
                max={nextWeek}
                className="mt-1"
              />
              <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                Available dates: Tomorrow to next week
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Selection */}
        <div className="space-y-4">
          <h3 className="text-green-800 dark:text-green-200 font-semibold">Choose Vendor</h3>

          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border-2 transition-all cursor-pointer ${selectedVendor === vendor.id
                    ? 'border-green-400 dark:border-green-500 shadow-lg'
                    : 'border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                onClick={() => setSelectedVendor(vendor.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-green-800 dark:text-green-200 font-medium">{vendor.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                        <MapPin className="w-3 h-3" />
                        <span>{vendor.distance}</span>
                        <Star className="w-3 h-3 fill-current" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-700 dark:text-green-300 font-medium">${vendor.baseFee}</p>
                      <p className="text-green-500 dark:text-green-500 text-sm">Base fee</p>
                    </div>
                  </div>

                  {selectedVendor === vendor.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-green-200 dark:border-green-700 pt-3 space-y-2"
                    >
                      <h5 className="text-green-700 dark:text-green-300 font-medium text-sm">
                        Available Time Slots:
                      </h5>
                      <div className="grid grid-cols-1 gap-2">
                        {vendor.timeSlots.map((slot) => (
                          <Button
                            key={slot.id}
                            variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => setSelectedTimeSlot(slot.id)}
                            className={`justify-start ${selectedTimeSlot === slot.id
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'border-green-300 text-green-700'
                              } ${!slot.available ? 'opacity-50' : ''}`}
                          >
                            <Clock className="w-3 h-3 mr-2" />
                            {slot.time}
                            {!slot.available && <span className="ml-auto text-xs">(Booked)</span>}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pickup Details */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Pickup Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-green-700 dark:text-green-300">
                Pickup Address
              </Label>
              <Input
                id="address"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Enter your address"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-green-700 dark:text-green-300">
                Contact Phone
              </Label>
              <Input
                id="phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="instructions" className="text-green-700 dark:text-green-300">
                Special Instructions (Optional)
              </Label>
              <Input
                id="instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g., Ring doorbell, Gate code, etc."
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule Button */}
        <Button
          onClick={handleSchedulePickup}
          disabled={!canSchedule}
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 py-4 text-lg"
        >
          <Truck className="w-5 h-5 mr-2" />
          Schedule Pickup
        </Button>

        {/* Upcoming Pickups */}
        <Card className="border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Upcoming Pickups
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingPickups.length > 0 ? (
              <div className="space-y-3">
                {upcomingPickups.map((pickup, index) => (
                  <motion.div
                    key={pickup.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-green-800 dark:text-green-200 font-medium">{pickup.vendor}</h4>
                        <div className="flex items-center space-x-3 text-sm text-green-600 dark:text-green-400">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {pickup.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {pickup.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${getStatusColor(pickup.status)}`}>
                          {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                        </div>
                        <p className="text-green-600 dark:text-green-400 text-sm">
                          {pickup.items} items • {pickup.estimatedCoins} coins
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Truck className="w-12 h-12 text-green-300 dark:text-green-600 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400">No upcoming pickups</p>
                <p className="text-green-500 dark:text-green-500 text-sm">Schedule your first pickup above!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pickup Tips */}
        <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4">
            <h4 className="text-green-800 dark:text-green-200 font-medium mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Pickup Tips:
            </h4>
            <ul className="text-green-600 dark:text-green-400 text-sm space-y-1">
              <li>• Have your items sorted and ready</li>
              <li>• Ensure items are clean and dry</li>
              <li>• Be available during the selected time slot</li>
              <li>• Payment will be processed as GreenCoins</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
