import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertCircle, CreditCard, IdCard, FileCheck, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

export function NgoDocumentUpload({ onComplete, onBack }) {
    const [documents, setDocuments] = useState({
        aadhaar: { file: null, uploaded: false, uploading: false },
        panCard: { file: null, uploaded: false, uploading: false },
        gstReceipt: { file: null, uploaded: false, uploading: false },
        ngoCertificate: { file: null, uploaded: false, uploading: false },
    });

    const [uploadedDocuments, setUploadedDocuments] = useState([]);

    const documentInfo = {
        aadhaar: {
            title: 'Aadhaar Card',
            icon: <IdCard className="w-6 h-6" />,
            description: 'Upload Aadhaar card of authorized signatory',
            required: true,
        },
        panCard: {
            title: 'PAN Card',
            icon: <CreditCard className="w-6 h-6" />,
            description: 'Upload organization PAN card',
            required: true,
        },
        gstReceipt: {
            title: 'GST Registration',
            icon: <FileCheck className="w-6 h-6" />,
            description: 'Upload GST registration certificate (if applicable)',
            required: false,
        },
        ngoCertificate: {
            title: 'NGO Certificate',
            icon: <Shield className="w-6 h-6" />,
            description: 'Upload NGO registration certificate / 12A & 80G certificate',
            required: true,
        },
    };

    const handleFileSelect = async (type, file) => {
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type', {
                description: 'Please upload JPG, PNG, or PDF files only',
                duration: 3000,
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File too large', {
                description: 'Please upload files smaller than 5MB',
                duration: 3000,
            });
            return;
        }

        setDocuments(prev => ({
            ...prev,
            [type]: { ...prev[type], file, uploading: true },
        }));

        try {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('documentType', type);
            formData.append('userId', 'mock-user-id');

            console.log(`Uploading ${type}:`, file.name);
            await new Promise(resolve => setTimeout(resolve, 1500));

            setDocuments(prev => ({
                ...prev,
                [type]: { ...prev[type], uploaded: true, uploading: false },
            }));

            setUploadedDocuments(prev => [...prev, type]);

            toast.success(`${documentInfo[type].title} uploaded!`, {
                description: 'Document uploaded successfully',
                duration: 2000,
            });
        } catch (error) {
            setDocuments(prev => ({
                ...prev,
                [type]: { ...prev[type], uploading: false },
            }));

            toast.error('Upload failed', {
                description: 'Please try again',
                duration: 3000,
            });
        }
    };

    const handleRemoveDocument = (type) => {
        setDocuments(prev => ({
            ...prev,
            [type]: { file: null, uploaded: false, uploading: false },
        }));
        setUploadedDocuments(prev => prev.filter(d => d !== type));
    };

    const allRequiredDocumentsUploaded = Object.keys(documentInfo)
        .filter(type => documentInfo[type].required)
        .every(type => documents[type].uploaded);

    const totalRequiredDocs = Object.keys(documentInfo).filter(
        type => documentInfo[type].required
    ).length;

    const uploadedRequiredDocs = uploadedDocuments.filter(
        type => documentInfo[type].required
    ).length;

    const handleSubmit = async () => {
        if (!allRequiredDocumentsUploaded) {
            toast.error('Please upload all required documents', {
                description: `${uploadedRequiredDocs} of ${totalRequiredDocs} required documents uploaded`,
                duration: 3000,
            });
            return;
        }

        toast.success('Documents submitted successfully!', {
            description: 'Your NGO profile is pending approval',
            duration: 2000,
        });

        setTimeout(() => {
            onComplete();
        }, 500);
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900 dark:via-gray-900 dark:to-pink-900 p-4">
                <div className="max-w-3xl mx-auto">
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
                            <h1 className="text-purple-800 dark:text-purple-200">Upload Documents</h1>
                            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                                Verify your NGO with required documents
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-purple-200 dark:border-purple-700"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Upload Progress (Required Documents)
                            </p>
                            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                {uploadedRequiredDocs} / {totalRequiredDocs} Completed
                            </p>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(uploadedRequiredDocs / totalRequiredDocs) * 100}%` }}
                            />
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        {Object.keys(documents).map((type, index) => {
                            const doc = documents[type];
                            const info = documentInfo[type];

                            return (
                                <motion.div
                                    key={type}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700">
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between text-purple-800 dark:text-purple-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                                                        {info.icon}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg">{info.title}</h3>
                                                            {!info.required && (
                                                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                                                                    Optional
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                                                            {info.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                {doc.uploaded && (
                                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                )}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {!doc.file ? (
                                                <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-6 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                                                    <input
                                                        type="file"
                                                        id={`file-${type}`}
                                                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                                                        onChange={(e) => handleFileSelect(type, e.target.files?.[0] || null)}
                                                        className="hidden"
                                                    />
                                                    <label htmlFor={`file-${type}`} className="cursor-pointer">
                                                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                                                        <p className="text-purple-700 dark:text-purple-300 font-medium mb-1">
                                                            Click to upload {info.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            JPG, PNG or PDF (Max 5MB)
                                                        </p>
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                                            <div>
                                                                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                                                    {doc.file.name}
                                                                </p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {(doc.file.size / 1024).toFixed(2)} KB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {doc.uploading ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                                                                <span className="text-sm text-purple-600 dark:text-purple-400">Uploading...</span>
                                                            </div>
                                                        ) : doc.uploaded ? (
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleRemoveDocument(type)}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                            >
                                                                Remove
                                                            </Button>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
                    >
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                                    Document Verification Required
                                </p>
                                <p className="text-xs text-amber-700 dark:text-amber-300">
                                    Your documents will be verified by our team. This process typically takes 24-48 hours.
                                    You'll be notified once your NGO account is approved and can start receiving donations.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6"
                    >
                        <Button
                            onClick={handleSubmit}
                            disabled={!allRequiredDocumentsUploaded}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {allRequiredDocumentsUploaded ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Submit for Verification
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5 mr-2" />
                                    Upload Required Documents to Continue ({uploadedRequiredDocs}/{totalRequiredDocs})
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
