import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, User, Phone, Home, Building2, MapPinned, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';
import PropTypes from 'prop-types';
import axios from 'axios';

export function ProfileCompletion({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    latitude: 0,
    longitude: 0,
  });

  const [errors, setErrors] = useState({});
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     console.error("User ID not found in localStorage");
  //   }
  // }, []);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits';

    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    if (formData.latitude === 0 && formData.longitude === 0) newErrors.latitude = 'Please get your location';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetLocation = () => {
    setIsGettingLocation(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setErrors(prev => ({ ...prev, latitude: '' }));
          setIsGettingLocation(false);

          toast.success('Location captured successfully', {
            description: `Coordinates: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
            duration: 3000,
          });
        },
        (error) => {
          let errorMessage = 'Unable to get location. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location permission denied.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
          }
          console.error('Geolocation error:', errorMessage, error);

          setFormData(prev => ({
            ...prev,
            latitude: 19.0760, // Mumbai default
            longitude: 72.8777,
          }));
          setErrors(prev => ({ ...prev, latitude: '' }));
          setIsGettingLocation(false);

          toast.warning(errorMessage, {
            description: 'Using default location. You can update this later in your profile.',
            duration: 3000,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      toast.warning('Geolocation not supported', {
        description: 'Using default location. You can update this later in your profile.',
        duration: 3000,
      });
      setFormData(prev => ({
        ...prev,
        latitude: 19.0760,
        longitude: 72.8777,
      }));
      setErrors(prev => ({ ...prev, latitude: '' }));
      setIsGettingLocation(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) onComplete(formData);
  // };

  // ✅ API integration added here
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/mainuser/register/complete/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile completion success:", response.data);
      toast.success("Profile completed successfully!");
      onComplete(formData);
    } catch (error) {
      console.error("Profile completion failed:", error);
      toast.error("Profile completion failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-900 dark:via-gray-900 dark:to-emerald-900 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6 pt-4"
          >
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-green-600 dark:text-green-400" />
              </button>
            )}
            <div>
              <h1 className="text-green-800 dark:text-green-200">Complete Your Profile</h1>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Help us serve you better
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 space-y-6 shadow-lg"
          >
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-green-200 dark:border-green-700">
                <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="text-green-800 dark:text-green-200">Personal Information</h3>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 ${errors.name ? 'border-red-500' : ''
                    }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-700 dark:text-gray-300">
                  Mobile Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 pl-10 ${errors.mobile ? 'border-red-500' : ''
                      }`}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-sm">{errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-green-200 dark:border-green-700">
                <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="text-green-800 dark:text-green-200">Address Details</h3>
              </div>

              {/* Address Line 1 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine1" className="text-gray-700 dark:text-gray-300">
                  Address Line 1 *
                </Label>
                <Input
                  id="addressLine1"
                  type="text"
                  placeholder="Street address, building name"
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 ${errors.addressLine1 ? 'border-red-500' : ''
                    }`}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm">{errors.addressLine1}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine2" className="text-gray-700 dark:text-gray-300">
                  Address Line 2 (Optional)
                </Label>
                <Input
                  id="addressLine2"
                  type="text"
                  placeholder="Apartment, suite, unit, etc."
                  value={formData.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">
                    City *
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 pl-10 ${errors.city ? 'border-red-500' : ''
                        }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-700 dark:text-gray-300">
                    State *
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 ${errors.state ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-gray-700 dark:text-gray-300">
                  Pincode *
                </Label>
                <div className="relative">
                  <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="pincode"
                    type="tel"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 pl-10 ${errors.pincode ? 'border-red-500' : ''
                      }`}
                  />
                </div>
                {errors.pincode && (
                  <p className="text-red-500 text-sm">{errors.pincode}</p>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-green-200 dark:border-green-700">
                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="text-green-800 dark:text-green-200">Location</h3>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  We need your location to connect you with nearby vendors and schedule pickups.
                </p>

                <Button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation || (formData.latitude !== 0 && formData.longitude !== 0)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-70"
                >
                  {isGettingLocation ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Getting Location...
                    </>
                  ) : formData.latitude !== 0 && formData.longitude !== 0 ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Location Captured ({formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)})
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5 mr-2" />
                      Get Current Location
                    </>
                  )}
                </Button>

                {errors.latitude && (
                  <p className="text-red-500 text-sm mt-2">{errors.latitude}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6"
              >
                Continue to Onboarding
              </Button>
            </motion.div>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              * Required fields
            </p>
          </motion.form>
        </div>
      </div>
    </>
  );
}

ProfileCompletion.propTypes = { onBack: PropTypes.any, onComplete: PropTypes.any };
