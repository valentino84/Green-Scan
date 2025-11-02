import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import {
    ArrowLeft,
    MapPin,
    Navigation,
    Building2,
    Package,
    Coins,
    CheckCircle,
    AlertCircle,
    Truck,
    Clock,
    Star,
    Search
} from 'lucide-react';

export function PickupDetailsForm({
    onBack,
    onScheduleComplete,
    cartData,
    preSelectedVendor
}) {
    // Address fields
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [pickupInstructions, setPickupInstructions] = useState('');

    // Location coordinates (in real app, would use geolocation or geocoding)
    const [latitude, setLatitude] = useState(18.5204);
    const [longitude, setLongitude] = useState(73.8567);

    // Vendor selection
    const [selectedVendor, setSelectedVendor] = useState(preSelectedVendor || null);
    const [showVendorList, setShowVendorList] = useState(false);
    const [vendorSearchQuery, setVendorSearchQuery] = useState('');

    // Available vendors (mock data - would come from API)
    const [availableVendors] = useState([
        {
            id: 1,
            name: "EcoVendor NYC",
            address: "123 Green St, New York, NY 10001",
            distance: 0.3,
            rating: 4.8,
            reviews: 324,
            phone: "(555) 123-4567",
            estimatedWaitTime: "Today, 2-4 PM"
        },
        {
            id: 2,
            name: "Green Collectors Co.",
            address: "456 Eco Ave, New York, NY 10002",
            distance: 0.5,
            rating: 4.6,
            reviews: 198,
            phone: "(555) 234-5678",
            estimatedWaitTime: "Today, 3-5 PM"
        },
        {
            id: 3,
            name: "Recycle Pro Solutions",
            address: "789 Sustainable Blvd, New York, NY 10003",
            distance: 0.8,
            rating: 4.9,
            reviews: 456,
            phone: "(555) 345-6789",
            estimatedWaitTime: "Tomorrow, 10-12 PM"
        },
        {
            id: 4,
            name: "EcoFriendly Recyclers",
            address: "654 Earth Way, New York, NY 10005",
            distance: 1.5,
            rating: 4.7,
            reviews: 267,
            phone: "(555) 567-8901",
            estimatedWaitTime: "Tomorrow, 2-4 PM"
        }
    ]);

    // Filter vendors based on search
    const filteredVendors = availableVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(vendorSearchQuery.toLowerCase()) ||
        vendor.address?.toLowerCase().includes(vendorSearchQuery.toLowerCase())
    );

    // Form validation
    const isFormValid = () => {
        return (
            addressLine1.trim() !== '' &&
            city.trim() !== '' &&
            pincode.trim() !== '' &&
            selectedVendor !== null
        );
    };

    // Auto-detect location (simulated)
    useEffect(() => {
        // In a real app, you would use browser geolocation API
        // navigator.geolocation.getCurrentPosition(...)
    }, []);

    const handleSchedulePickup = () => {
        if (!isFormValid()) {
            toast.error('Please fill in all required fields', {
                description: 'Vendor, address line 1, city, and pincode are required.'
            });
            return;
        }

        const pickupDetails = {
            vendorId: selectedVendor?.id,
            pickupInstructions: pickupInstructions || '',
            pickupAddressLine1: addressLine1,
            pickupAddressLine2: addressLine2,
            pickupCity: city,
            pickupPincode: pincode,
            pickupLatitude: latitude,
            pickupLongitude: longitude,
            cartId: cartData.id,
            cartNumber: cartData.cartNumber,
            items: cartData.items,
            totalEstimatedWeight: cartData.totalEstimatedWeight,
            totalEstimatedCoins: cartData.totalEstimatedCoins
        };

        console.log('Scheduling pickup with details:', pickupDetails);

        // Show loading toast
        toast.loading('Scheduling your pickup...', {
            id: 'schedule-pickup'
        });

        // Simulate API call delay
        setTimeout(() => {
            toast.dismiss('schedule-pickup');
            // In a real app, this would make an API call to create the pickup request
            onScheduleComplete(pickupDetails);
        }, 1500);
    };

    const handleUseCurrentLocation = () => {
        toast.loading('Getting your location...', {
            id: 'get-location'
        });

        setTimeout(() => {
            setAddressLine1('123 Green Lane');
            setCity('Pune');
            setPincode('411001');
            setLatitude(18.5204);
            setLongitude(73.8567);

            toast.success('Location detected!', {
                id: 'get-location',
                description: 'Address fields have been auto-filled'
            });
        }, 1000);
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
                            <h1 className="text-green-800 dark:text-green-200 font-semibold">Pickup Details</h1>
                            <p className="text-green-600 dark:text-green-400 text-sm">
                                Cart {cartData.cartNumber}
                            </p>
                        </div>
                    </div>

                    <ThemeToggle />
                </div>
            </div>

            <div className="px-4 py-6 space-y-6">
                {/* Cart Summary */}
                <Card className="border-green-200 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                            <Package className="w-5 h-5 mr-2" />
                            Cart Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                                    {cartData.items.length}
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400">Items</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                                    {cartData.totalEstimatedWeight.toFixed(1)}
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400">kg</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                                    {cartData.totalEstimatedCoins}
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    <Coins className="w-3 h-3 inline mr-1" />
                                    Coins
                                </p>
                            </div>
                        </div>

                        {/* Items preview */}
                        <div className="mt-4 space-y-2">
                            <p className="text-green-700 dark:text-green-300 text-sm font-medium">Items:</p>
                            {cartData.items.slice(0, 3).map((item, idx) => (
                                <div key={item.id} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 rounded-lg p-2">
                                    <span className="text-green-800 dark:text-green-200">{item.itemName}</span>
                                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                        <span>{item.estimatedWeight} kg</span>
                                        <span>•</span>
                                        <span>{item.estimatedCoins} coins</span>
                                    </div>
                                </div>
                            ))}
                            {cartData.items.length > 3 && (
                                <p className="text-green-600 dark:text-green-400 text-xs text-center">
                                    +{cartData.items.length - 3} more items
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Vendor Selection */}
                <Card className="border-green-200 dark:border-green-700">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-green-800 dark:text-green-200 flex items-center justify-between">
                            <div className="flex items-center">
                                <Truck className="w-5 h-5 mr-2" />
                                Select Vendor
                            </div>
                            {selectedVendor && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {selectedVendor ? (
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h4 className="text-green-800 dark:text-green-200 font-medium">
                                            {selectedVendor.name}
                                        </h4>
                                        <div className="flex items-center space-x-3 text-sm text-green-600 dark:text-green-400 mt-1">
                                            <span className="flex items-center">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {selectedVendor.distance} mi
                                            </span>
                                            <span className="flex items-center">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                {selectedVendor.rating}
                                            </span>
                                        </div>
                                        {selectedVendor.estimatedWaitTime && (
                                            <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {selectedVendor.estimatedWaitTime}
                                            </div>
                                        )}
                                    </div>
                                    {!preSelectedVendor && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowVendorList(!showVendorList)}
                                            className="ml-2"
                                        >
                                            Change
                                        </Button>
                                    )}
                                </div>
                                {preSelectedVendor && (
                                    <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                                        <p className="text-blue-700 dark:text-blue-300 text-xs flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            This vendor was pre-selected from your search
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <Button
                                    onClick={() => setShowVendorList(!showVendorList)}
                                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Choose Vendor
                                </Button>
                            </div>
                        )}

                        {/* Vendor List */}
                        {showVendorList && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-3 mt-4 max-h-96 overflow-y-auto"
                            >
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                                    <Input
                                        placeholder="Search vendors..."
                                        value={vendorSearchQuery}
                                        onChange={(e) => setVendorSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>

                                {filteredVendors.map((vendor) => (
                                    <div
                                        key={vendor.id}
                                        onClick={() => {
                                            setSelectedVendor(vendor);
                                            setShowVendorList(false);
                                            setVendorSearchQuery('');
                                        }}
                                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedVendor?.id === vendor.id
                                                ? 'border-green-400 bg-green-50 dark:border-green-500 dark:bg-green-900/20'
                                                : 'border-green-200 dark:border-green-700 bg-white dark:bg-gray-800'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="text-green-800 dark:text-green-200 font-medium">
                                                    {vendor.name}
                                                </h4>
                                                <div className="flex items-center space-x-3 text-sm text-green-600 dark:text-green-400 mt-1">
                                                    <span className="flex items-center">
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {vendor.distance} mi
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Star className="w-3 h-3 mr-1 fill-current" />
                                                        {vendor.rating}
                                                    </span>
                                                </div>
                                                {vendor.estimatedWaitTime && (
                                                    <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {vendor.estimatedWaitTime}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {filteredVendors.length === 0 && (
                                    <div className="text-center py-6">
                                        <AlertCircle className="w-8 h-8 text-green-300 dark:text-green-600 mx-auto mb-2" />
                                        <p className="text-green-600 dark:text-green-400 text-sm">
                                            No vendors found
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </CardContent>
                </Card>

                {/* Pickup Address */}
                <Card className="border-green-200 dark:border-green-700">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                Pickup Address
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleUseCurrentLocation}
                                className="text-xs"
                            >
                                <Navigation className="w-3 h-3 mr-1" />
                                Use Current
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="addressLine1" className="text-green-700 dark:text-green-300">
                                Address Line 1 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="addressLine1"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                placeholder="Street address, house/apartment number"
                                className="mt-1"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="addressLine2" className="text-green-700 dark:text-green-300">
                                Address Line 2 <span className="text-gray-400 text-sm">(Optional)</span>
                            </Label>
                            <Input
                                id="addressLine2"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                                placeholder="Building, floor, landmark"
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city" className="text-green-700 dark:text-green-300">
                                    City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="pincode" className="text-green-700 dark:text-green-300">
                                    Pincode <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    placeholder="411001"
                                    className="mt-1"
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>

                        {/* Coordinates (hidden from user but captured) */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-600 dark:text-gray-400 text-xs flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pickup Instructions */}
                <Card className="border-green-200 dark:border-green-700">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                            <Building2 className="w-5 h-5 mr-2" />
                            Pickup Instructions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label htmlFor="instructions" className="text-green-700 dark:text-green-300">
                            Special instructions for the pickup assistant <span className="text-gray-400 text-sm">(Optional)</span>
                        </Label>
                        <Textarea
                            id="instructions"
                            value={pickupInstructions}
                            onChange={(e) => setPickupInstructions(e.target.value)}
                            placeholder="e.g., Leave cart at front door, ring doorbell once, gate code: 1234"
                            className="mt-1 min-h-[80px]"
                            maxLength={500}
                        />
                        <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                            {pickupInstructions.length}/500 characters
                        </p>
                    </CardContent>
                </Card>

                {/* Validation Warning */}
                {!isFormValid() && (
                    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                                <div>
                                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                                        Complete Required Fields
                                    </p>
                                    <ul className="text-amber-700 dark:text-amber-300 text-sm mt-1 space-y-1">
                                        {!selectedVendor && <li>• Select a vendor</li>}
                                        {!addressLine1 && <li>• Enter address line 1</li>}
                                        {!city && <li>• Enter city</li>}
                                        {!pincode && <li>• Enter pincode</li>}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Schedule Button */}
                <div className="space-y-3 pt-2">
                    <Button
                        onClick={handleSchedulePickup}
                        disabled={!isFormValid()}
                        className={`w-full py-6 text-lg font-medium ${isFormValid()
                                ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Schedule Pickup ({cartData.totalEstimatedCoins} coins)
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onBack}
                        className="w-full border-green-300 text-green-700 dark:border-green-600 dark:text-green-300"
                    >
                        Back to Cart
                    </Button>
                </div>

                {/* Tips */}
                <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4">
                        <h4 className="text-green-800 dark:text-green-200 font-medium mb-2 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Before Scheduling:
                        </h4>
                        <ul className="text-green-600 dark:text-green-400 text-sm space-y-1">
                            <li>• Ensure all items are sorted and ready for pickup</li>
                            <li>• Items should be clean and dry</li>
                            <li>• Be available at the address during pickup time</li>
                            <li>• The pickup assistant will verify items and weights</li>
                            <li>• GreenCoins will be credited after verification</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}