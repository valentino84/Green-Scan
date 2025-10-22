import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from './ui/badge';
import PropTypes from 'prop-types';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock,
  Phone,
  Star,
  Car,
  Route,
  Compass,
  Timer,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

export function VendorDirections({ onBack, vendor, userLocation }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('8 mins');
  const [distance, setDistance] = useState('0.3 miles');

  // Mock route steps
  const routeSteps = [
    { instruction: 'Head north on 5th Avenue', distance: '0.1 mi', icon: Navigation },
    { instruction: 'Turn right onto Green Street', distance: '0.1 mi', icon: Navigation },
    { instruction: 'Continue straight for 2 blocks', distance: '0.1 mi', icon: Navigation },
    { instruction: 'Destination will be on your left', distance: '0.0 mi', icon: Navigation }
  ];

  // Simulate navigation updates
  useEffect(() => {
    if (isNavigating) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < routeSteps.length - 1) {
            return prev + 1;
          } else {
            setIsNavigating(false);
            return prev;
          }
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isNavigating, routeSteps.length]);

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setCurrentStep(0);
  };

  const handleCallVendor = () => {
    if (vendor?.phone) {
      window.location.href = `tel:${vendor.phone}`;
    }
  };

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <p className="text-green-600 dark:text-green-400">Vendor information not available</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-green-800 dark:text-green-200">Directions</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Route Overview */}
        <Card className="border-green-200 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">{vendor.name}</h2>
                <p className="text-blue-100 text-sm mb-2">{vendor.address}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Timer className="w-4 h-4 mr-1" />
                    {estimatedTime}
                  </span>
                  <span className="flex items-center">
                    <Route className="w-4 h-4 mr-1" />
                    {distance}
                  </span>
                  <span className="flex items-center">
                    <Car className="w-4 h-4 mr-1" />
                    Driving
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 p-3 rounded-full mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-xs text-blue-100">{vendor.distance} mi away</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleStartNavigation}
            disabled={isNavigating}
            className="bg-blue-600 hover:bg-blue-700 h-14 flex-col space-y-1"
          >
            <Navigation className="w-5 h-5" />
            <span className="text-sm">{isNavigating ? 'Navigating...' : 'Start Navigation'}</span>
          </Button>
          <Button
            onClick={handleCallVendor}
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 h-14 flex-col space-y-1"
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm">Call Vendor</span>
          </Button>
        </div>

        {/* Navigation Status */}
        {isNavigating && (
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Compass className="w-5 h-5 text-white animate-spin" />
                </div>
                <div>
                  <p className="text-blue-800 dark:text-blue-200 font-medium">
                    Step {currentStep + 1} of {routeSteps.length}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    {routeSteps[currentStep]?.instruction}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map Placeholder */}
        <Card className="border-green-200 h-64">
          <CardContent className="p-0 h-full relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-800 dark:to-blue-800">
              <div className="absolute top-4 left-4 bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 bg-blue-500 w-3 h-3 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">Live Map</p>
                  <p className="text-green-600 dark:text-green-400 text-xs">
                    Interactive navigation would appear here
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Steps */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <Route className="w-5 h-5 mr-2" />
              Turn-by-Turn Directions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routeSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${isNavigating && index === currentStep
                  ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300'
                  : isNavigating && index < currentStep
                    ? 'bg-green-100 dark:bg-green-900 border border-green-300'
                    : 'bg-gray-50 dark:bg-gray-800'
                  }`}
              >
                <div className={`p-2 rounded-full ${isNavigating && index === currentStep
                  ? 'bg-blue-600'
                  : isNavigating && index < currentStep
                    ? 'bg-green-600'
                    : 'bg-gray-400'
                  }`}>
                  {isNavigating && index < currentStep ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <step.icon className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isNavigating && index === currentStep
                    ? 'text-blue-800 dark:text-blue-200'
                    : isNavigating && index < currentStep
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-gray-700 dark:text-gray-300'
                    }`}>
                    {step.instruction}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.distance}</p>
                </div>
                {isNavigating && index === currentStep && (
                  <Badge className="bg-blue-600 text-white">Current</Badge>
                )}
                {isNavigating && index < currentStep && (
                  <Badge className="bg-green-600 text-white">Completed</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vendor Info */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Vendor Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-600 dark:text-green-400 text-sm">Rating:</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-green-800 dark:text-green-200">{vendor.rating}</span>
                <span className="text-green-600 dark:text-green-400 text-sm">({vendor.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-green-600 dark:text-green-400 text-sm">Hours:</span>
              <span className="text-green-800 dark:text-green-200">{vendor.hours}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-green-600 dark:text-green-400 text-sm">Phone:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCallVendor}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto"
              >
                {vendor.phone}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-green-600 dark:text-green-400 text-sm">Estimated Wait:</span>
              <span className="text-green-800 dark:text-green-200">{vendor.estimatedWaitTime}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {vendor.specialties?.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tips */}
        <Card className="border-green-200 bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-900 dark:to-green-900">
          <CardContent className="p-4">
            <h3 className="text-green-800 dark:text-green-200 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Navigation Tips
            </h3>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                Call ahead to confirm vendor availability
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                Parking may be limited during peak hours
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                Have your GreenScan app ready for quick processing
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

VendorDirections.propTypes = { onBack: PropTypes.any, userLocation: PropTypes.any, vendor: PropTypes.any };
