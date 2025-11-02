import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, FileText, Building2, Globe, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

export function NgoOrganizationDetails({ onComplete, onBack, email, userId }) {
    const [formData, setFormData] = useState({
        userId: userId,
        email: email,
        organizationName: '',
        registrationNumber: '',
        causeDescription: '',
        websiteUrl: '',
        bankAccountNumber: '',
        bankIfscCode: '',
        bankAccountHolderName: '',
        bankName: '',
        impactBeneficiaries: 0,
        impactDescription: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.organizationName.trim()) {
            newErrors.organizationName = 'Organization name is required';
        }

        if (!formData.registrationNumber.trim()) {
            newErrors.registrationNumber = 'Registration number is required';
        }

        if (!formData.causeDescription.trim()) {
            newErrors.causeDescription = 'Cause description is required';
        } else if (formData.causeDescription.trim().length < 20) {
            newErrors.causeDescription = 'Please provide at least 20 characters';
        }

        if (formData.websiteUrl.trim() && !/^https?:\/\/.+/.test(formData.websiteUrl)) {
            newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.org)';
        }

        if (!formData.bankAccountNumber.trim()) {
            newErrors.bankAccountNumber = 'Bank account number is required';
        } else if (!/^\d{9,18}$/.test(formData.bankAccountNumber)) {
            newErrors.bankAccountNumber = 'Bank account number must be 9-18 digits';
        }

        if (!formData.bankIfscCode.trim()) {
            newErrors.bankIfscCode = 'IFSC code is required';
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.bankIfscCode)) {
            newErrors.bankIfscCode = 'Invalid IFSC format (e.g., SBIN0001234)';
        }

        if (!formData.bankAccountHolderName.trim()) {
            newErrors.bankAccountHolderName = 'Account holder name is required';
        }

        if (!formData.bankName.trim()) {
            newErrors.bankName = 'Bank name is required';
        }

        if (formData.impactBeneficiaries < 0) {
            newErrors.impactBeneficiaries = 'Number of beneficiaries cannot be negative';
        }

        if (!formData.impactDescription.trim()) {
            newErrors.impactDescription = 'Impact description is required';
        } else if (formData.impactDescription.trim().length < 20) {
            newErrors.impactDescription = 'Please provide at least 20 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate API call
            console.log('NGO Organization Data:', formData);

            toast.success('Organization details saved successfully!', {
                description: 'Proceeding to document upload...',
                duration: 2000,
            });

            // Wait for toast to be visible before proceeding
            setTimeout(() => {
                onComplete(formData);
            }, 500);
        } else {
            toast.error('Please fix the errors', {
                description: 'Check all required fields',
                duration: 3000,
            });
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900 dark:via-gray-900 dark:to-pink-900 p-4">
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
                                <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </button>
                        )}
                        <div>
                            <h1 className="text-purple-800 dark:text-purple-200">NGO Organization Details</h1>
                            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                                Tell us about your organization and its impact
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
                        {/* Organization Information */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                    <Building2 className="w-5 h-5" />
                                    Organization Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="organizationName" className="text-gray-700 dark:text-gray-300">
                                        Organization Name *
                                    </Label>
                                    <Input
                                        id="organizationName"
                                        type="text"
                                        placeholder="e.g., Eco Green Foundation"
                                        value={formData.organizationName}
                                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.organizationName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.organizationName && <p className="text-red-500 text-sm">{errors.organizationName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="registrationNumber" className="text-gray-700 dark:text-gray-300">
                                        Registration Number *
                                    </Label>
                                    <Input
                                        id="registrationNumber"
                                        type="text"
                                        placeholder="e.g., REG-987654"
                                        value={formData.registrationNumber}
                                        onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.registrationNumber ? 'border-red-500' : ''}`}
                                    />
                                    {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="websiteUrl" className="text-gray-700 dark:text-gray-300">
                                        Website URL (Optional)
                                    </Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="websiteUrl"
                                            type="url"
                                            placeholder="https://example.org"
                                            value={formData.websiteUrl}
                                            onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                                            className={`bg-gray-50 dark:bg-gray-700 pl-10 ${errors.websiteUrl ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.websiteUrl && <p className="text-red-500 text-sm">{errors.websiteUrl}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cause & Impact */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                    <Heart className="w-5 h-5" />
                                    Cause & Impact
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="causeDescription" className="text-gray-700 dark:text-gray-300">
                                        Cause Description *
                                    </Label>
                                    <Textarea
                                        id="causeDescription"
                                        placeholder="Describe your organization's mission and cause (min 20 characters)"
                                        value={formData.causeDescription}
                                        onChange={(e) => handleInputChange('causeDescription', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 min-h-[100px] ${errors.causeDescription ? 'border-red-500' : ''}`}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formData.causeDescription.length} characters
                                    </p>
                                    {errors.causeDescription && <p className="text-red-500 text-sm">{errors.causeDescription}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="impactBeneficiaries" className="text-gray-700 dark:text-gray-300">
                                            Number of Beneficiaries *
                                        </Label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="impactBeneficiaries"
                                                type="number"
                                                min="0"
                                                placeholder="e.g., 1000"
                                                value={formData.impactBeneficiaries || ''}
                                                onChange={(e) => handleInputChange('impactBeneficiaries', Number(e.target.value))}
                                                className={`bg-gray-50 dark:bg-gray-700 pl-10 ${errors.impactBeneficiaries ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {errors.impactBeneficiaries && <p className="text-red-500 text-sm">{errors.impactBeneficiaries}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Impact Summary
                                        </Label>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            <div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    Lives Impacted
                                                </p>
                                                <p className="text-purple-800 dark:text-purple-200">
                                                    {formData.impactBeneficiaries.toLocaleString()} people
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="impactDescription" className="text-gray-700 dark:text-gray-300">
                                        Impact Description *
                                    </Label>
                                    <Textarea
                                        id="impactDescription"
                                        placeholder="Describe your organization's impact and achievements (min 20 characters)"
                                        value={formData.impactDescription}
                                        onChange={(e) => handleInputChange('impactDescription', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 min-h-[100px] ${errors.impactDescription ? 'border-red-500' : ''}`}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formData.impactDescription.length} characters
                                    </p>
                                    {errors.impactDescription && <p className="text-red-500 text-sm">{errors.impactDescription}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bank Details */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                    <DollarSign className="w-5 h-5" />
                                    Bank Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bankName" className="text-gray-700 dark:text-gray-300">
                                        Bank Name *
                                    </Label>
                                    <Input
                                        id="bankName"
                                        type="text"
                                        placeholder="e.g., State Bank of India"
                                        value={formData.bankName}
                                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.bankName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bankAccountHolderName" className="text-gray-700 dark:text-gray-300">
                                        Account Holder Name *
                                    </Label>
                                    <Input
                                        id="bankAccountHolderName"
                                        type="text"
                                        placeholder="e.g., Eco Green Foundation"
                                        value={formData.bankAccountHolderName}
                                        onChange={(e) => handleInputChange('bankAccountHolderName', e.target.value)}
                                        className={`bg-gray-50 dark:bg-gray-700 ${errors.bankAccountHolderName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.bankAccountHolderName && <p className="text-red-500 text-sm">{errors.bankAccountHolderName}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bankAccountNumber" className="text-gray-700 dark:text-gray-300">
                                            Account Number *
                                        </Label>
                                        <Input
                                            id="bankAccountNumber"
                                            type="text"
                                            placeholder="9-18 digits"
                                            value={formData.bankAccountNumber}
                                            onChange={(e) => handleInputChange('bankAccountNumber', e.target.value.replace(/\D/g, ''))}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.bankAccountNumber ? 'border-red-500' : ''}`}
                                            maxLength={18}
                                        />
                                        {errors.bankAccountNumber && <p className="text-red-500 text-sm">{errors.bankAccountNumber}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bankIfscCode" className="text-gray-700 dark:text-gray-300">
                                            IFSC Code *
                                        </Label>
                                        <Input
                                            id="bankIfscCode"
                                            type="text"
                                            placeholder="e.g., SBIN0001234"
                                            value={formData.bankIfscCode}
                                            onChange={(e) => handleInputChange('bankIfscCode', e.target.value.toUpperCase())}
                                            className={`bg-gray-50 dark:bg-gray-700 ${errors.bankIfscCode ? 'border-red-500' : ''}`}
                                            maxLength={11}
                                        />
                                        {errors.bankIfscCode && <p className="text-red-500 text-sm">{errors.bankIfscCode}</p>}
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
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
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
