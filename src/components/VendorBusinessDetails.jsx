import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Building2, FileText, MapPin, Clock, Package, DollarSign, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';
import axios from "axios";
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function VendorBusinessDetails({ onComplete, onBack, email, userId }) {
    const [formData, setFormData] = useState({
        mainUserId: userId,
        email: email,
        businessName: '',
        businessRegistrationNumber: '',
        gstNumber: '',
        panNumber: '',
        serviceCitiesList: [],
        serviceRadiusKm: 30,
        workingStartTime: '09:30',
        workingEndTime: '18:00',
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dailyPickupCapacity: 50,
        maxWeightPerPickupKg: 250.0,
        paymentLimit: 7500.0,
    });
    // console.log('Vendor Business Details - UserID:', userId, 'Email:', email);

    const [newCity, setNewCity] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleAddCity = () => {
        if (newCity.trim() && !formData.serviceCitiesList.includes(newCity.trim())) {
            setFormData(prev => ({
                ...prev,
                serviceCitiesList: [...prev.serviceCitiesList, newCity.trim()]
            }));
            setNewCity('');
            setErrors(prev => ({ ...prev, serviceCitiesList: undefined }));
        }
    };

    const handleRemoveCity = (city) => {
        setFormData(prev => ({
            ...prev,
            serviceCitiesList: prev.serviceCitiesList.filter(c => c !== city)
        }));
    };

    const handleToggleDay = (day) => {
        setFormData(prev => ({
            ...prev,
            workingDays: prev.workingDays.includes(day)
                ? prev.workingDays.filter(d => d !== day)
                : [...prev.workingDays, day]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.businessRegistrationNumber.trim()) {
            newErrors.businessRegistrationNumber = 'Registration number is required';
        }

        if (!formData.gstNumber.trim()) {
            newErrors.gstNumber = 'GST number is required';
        } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
            newErrors.gstNumber = 'Invalid GST format';
        }

        if (!formData.panNumber.trim()) {
            newErrors.panNumber = 'PAN number is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
            newErrors.panNumber = 'Invalid PAN format (e.g., ABCDE1234A)';
        }

        if (formData.serviceCitiesList.length === 0) {
            newErrors.serviceCitiesList = 'At least one service city is required';
        }

        if (formData.workingDays.length === 0) {
            newErrors.workingDays = 'At least one working day is required';
        }

        if (formData.serviceRadiusKm < 1) {
            newErrors.serviceRadiusKm = 'Service radius must be at least 1 km';
        }

        if (formData.dailyPickupCapacity < 1) {
            newErrors.dailyPickupCapacity = 'Capacity must be at least 1';
        }

        if (formData.maxWeightPerPickupKg < 1) {
            newErrors.maxWeightPerPickupKg = 'Max weight must be at least 1 kg';
        }

        if (formData.paymentLimit < 1) {
            newErrors.paymentLimit = 'Payment limit must be at least ₹1';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fix the errors', { description: 'Check all required fields' });
            return;
        }

        const formattedData = {
            ...formData,
            workingStartTime: formData.workingStartTime + ':00',
            workingEndTime: formData.workingEndTime + ':00',
        };

        try {
            setIsLoading(true);

            const response = await axios.post(
                "http://localhost:8080/api/v1/vendor/create",
                formattedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("✅ Vendor created:", response.data);
            toast.success('Business details saved successfully!', {
                description: 'Proceeding to document upload...',
                duration: 2000,
            });

            // Proceed to next step after a short delay
            setTimeout(() => {
                onComplete(formattedData);
            }, 800);
        } catch (error) {
            console.error("❌ Vendor creation failed:", error.response?.data || error.message);
            toast.error('Failed to save business details', {
                description: error.response?.data?.message || 'Server error. Try again.',
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }

        ///old code
        // if (validateForm()) {
        //     const formattedData = {
        //         ...formData,
        //         workingStartTime: formData.workingStartTime + ':00',
        //         workingEndTime: formData.workingEndTime + ':00',
        //     };

        //     console.log('Vendor Business Data:', formattedData);

        //     toast.success('Business details saved successfully!', {
        //         description: 'Proceeding to document upload...',
        //         duration: 2000,
        //     });

        //     setTimeout(() => {
        //         onComplete(formattedData);
        //     }, 500);
        // } else {
        //     toast.error('Please fix the errors', {
        //         description: 'Check all required fields',
        //         duration: 3000,
        //     });
        // }
    };
    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-900 dark:via-gray-900 dark:to-green-900 p-4">
                <div className="max-w-3xl mx-auto">
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
                                <ArrowLeft className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </button>
                        )}
                        <div>
                            <h1 className="text-blue-800 dark:text-blue-200">Vendor Business Details</h1>
                            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                Tell us about your recycling business
                            </p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Business Information */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                    <Building2 className="w-5 h-5" />
                                    Business Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="businessName" className="text-gray-700 dark:text-gray-300">
                                        Business Name *
                                    </Label>
                                    <Input
                                        id="businessName"
                                        type="text"
                                        placeholder="e.g., Eco-Cycle Solutions Pvt Ltd"
                                        value={formData.businessName}
                                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.businessName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="businessRegistrationNumber" className="text-gray-700 dark:text-gray-300">
                                        Business Registration Number *
                                    </Label>
                                    <Input
                                        id="businessRegistrationNumber"
                                        type="text"
                                        placeholder="e.g., BUS-REG-794859"
                                        value={formData.businessRegistrationNumber}
                                        onChange={(e) => handleInputChange('businessRegistrationNumber', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.businessRegistrationNumber ? 'border-red-500' : ''}`}
                                    />
                                    {errors.businessRegistrationNumber && <p className="text-red-500 text-sm">{errors.businessRegistrationNumber}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="gstNumber" className="text-gray-700 dark:text-gray-300">
                                            GST Number *
                                        </Label>
                                        <Input
                                            id="gstNumber"
                                            type="text"
                                            placeholder="22AGCDE1234F1Z5"
                                            value={formData.gstNumber}
                                            onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.gstNumber ? 'border-red-500' : ''}`}
                                            maxLength={15}
                                        />
                                        {errors.gstNumber && <p className="text-red-500 text-sm">{errors.gstNumber}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="panNumber" className="text-gray-700 dark:text-gray-300">
                                            PAN Number *
                                        </Label>
                                        <Input
                                            id="panNumber"
                                            type="text"
                                            placeholder="ABCGE1234A"
                                            value={formData.panNumber}
                                            onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.panNumber ? 'border-red-500' : ''}`}
                                            maxLength={10}
                                        />
                                        {errors.panNumber && <p className="text-red-500 text-sm">{errors.panNumber}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Areas */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                    <MapPin className="w-5 h-5" />
                                    Service Areas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-700 dark:text-gray-300">
                                        Service Cities *
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter city name"
                                            value={newCity}
                                            onChange={(e) => setNewCity(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCity())}
                                            className="bg-gray-50 dark:bg-gray-700"
                                        />
                                        <Button type="button" onClick={handleAddCity} className="bg-blue-600 hover:bg-blue-700">
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.serviceCitiesList.map((city) => (
                                            <Badge key={city} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1">
                                                {city}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCity(city)}
                                                    className="ml-2 hover:text-red-600"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    {errors.serviceCitiesList && <p className="text-red-500 text-sm">{errors.serviceCitiesList}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="serviceRadiusKm" className="text-gray-700 dark:text-gray-300">
                                        Service Radius (km) *
                                    </Label>
                                    <Input
                                        id="serviceRadiusKm"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={formData.serviceRadiusKm}
                                        onChange={(e) => handleInputChange('serviceRadiusKm', Number(e.target.value))}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.serviceRadiusKm ? 'border-red-500' : ''}`}
                                    />
                                    {errors.serviceRadiusKm && <p className="text-red-500 text-sm">{errors.serviceRadiusKm}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Working Hours */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                    <Clock className="w-5 h-5" />
                                    Working Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="workingStartTime" className="text-gray-700 dark:text-gray-300">
                                            Start Time *
                                        </Label>
                                        <Input
                                            id="workingStartTime"
                                            type="time"
                                            value={formData.workingStartTime}
                                            onChange={(e) => handleInputChange('workingStartTime', e.target.value)}
                                            className="bg-gray-50 dark:bg-gray-700"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="workingEndTime" className="text-gray-700 dark:text-gray-300">
                                            End Time *
                                        </Label>
                                        <Input
                                            id="workingEndTime"
                                            type="time"
                                            value={formData.workingEndTime}
                                            onChange={(e) => handleInputChange('workingEndTime', e.target.value)}
                                            className="bg-gray-50 dark:bg-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-700 dark:text-gray-300">
                                        Working Days *
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                        {daysOfWeek.map((day) => (
                                            <Badge
                                                key={day}
                                                variant={formData.workingDays.includes(day) ? 'default' : 'outline'}
                                                className={`cursor-pointer px-3 py-2 transition-all ${formData.workingDays.includes(day)
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                                    }`}
                                                onClick={() => handleToggleDay(day)}
                                            >
                                                {day.slice(0, 3)}
                                            </Badge>
                                        ))}
                                    </div>
                                    {errors.workingDays && <p className="text-red-500 text-sm">{errors.workingDays}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Capacity & Limits */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                    <Package className="w-5 h-5" />
                                    Capacity & Limits
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dailyPickupCapacity" className="text-gray-700 dark:text-gray-300">
                                            Daily Pickups *
                                        </Label>
                                        <Input
                                            id="dailyPickupCapacity"
                                            type="number"
                                            min="1"
                                            value={formData.dailyPickupCapacity}
                                            onChange={(e) => handleInputChange('dailyPickupCapacity', Number(e.target.value))}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.dailyPickupCapacity ? 'border-red-500' : ''}`}
                                        />
                                        {errors.dailyPickupCapacity && <p className="text-red-500 text-sm">{errors.dailyPickupCapacity}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="maxWeightPerPickupKg" className="text-gray-700 dark:text-gray-300">
                                            Max Weight (kg) *
                                        </Label>
                                        <Input
                                            id="maxWeightPerPickupKg"
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            value={formData.maxWeightPerPickupKg}
                                            onChange={(e) => handleInputChange('maxWeightPerPickupKg', Number(e.target.value))}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.maxWeightPerPickupKg ? 'border-red-500' : ''}`}
                                        />
                                        {errors.maxWeightPerPickupKg && <p className="text-red-500 text-sm">{errors.maxWeightPerPickupKg}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="paymentLimit" className="text-gray-700 dark:text-gray-300">
                                            Payment Limit (₹) *
                                        </Label>
                                        <Input
                                            id="paymentLimit"
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            value={formData.paymentLimit}
                                            onChange={(e) => handleInputChange('paymentLimit', Number(e.target.value))}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.paymentLimit ? 'border-red-500' : ''}`}
                                        />
                                        {errors.paymentLimit && <p className="text-red-500 text-sm">{errors.paymentLimit}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-6"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Continue to Document Upload
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