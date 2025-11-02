import { useState } from "react";
import { motion } from "motion/react";
import {
    ArrowLeft,
    Upload,
    FileText,
    CheckCircle2,
    AlertCircle,
    CreditCard,
    IdCard,
    Building,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import axios from "axios";

export function VendorDocumentUpload({ onComplete, onBack }) {
    const [documents, setDocuments] = useState({
        pancard: { file: null, uploaded: false, uploading: false },
        aadhaar: { file: null, uploaded: false, uploading: false },
        bankPassbook: { file: null, uploaded: false, uploading: false },
    });

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const documentInfo = {
        pancard: {
            title: "PAN Card",
            icon: <CreditCard className="w-6 h-6" />,
            description: "Upload a clear photo/scan of your PAN card",
        },
        aadhaar: {
            title: "Aadhaar Card",
            icon: <IdCard className="w-6 h-6" />,
            description: "Upload a clear photo/scan of your Aadhaar card",
        },
        bankPassbook: {
            title: "Bank Passbook",
            icon: <Building className="w-6 h-6" />,
            description: "Upload first page showing account details",
        },
    };

    // ✅ File Upload Function
    const handleFileSelect = async (type, file) => {
        if (!file) return;

        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
        ];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type", {
                description: "Please upload JPG, PNG, or PDF files only",
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File too large", {
                description: "Please upload files smaller than 5MB",
            });
            return;
        }

        // Start uploading
        setDocuments((prev) => ({
            ...prev,
            [type]: { ...prev[type], file, uploading: true },
        }));

        try {
            const formData = new FormData();
            formData.append("file", file); // ✅ backend expects this field name

            const response = await axios.post(
                `http://localhost:8080/api/v1/vendor/upload-kyc/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(`${type} upload success:`, response.data);

            setDocuments((prev) => ({
                ...prev,
                [type]: { ...prev[type], uploaded: true, uploading: false },
            }));

            toast.success(`${documentInfo[type].title} uploaded successfully!`);
        } catch (error) {
            console.error("❌ Upload failed:", error);

            const msg =
                error.response?.data?.message || "Server error. Please try again.";

            setDocuments((prev) => ({
                ...prev,
                [type]: { ...prev[type], uploading: false },
            }));

            toast.error("Upload failed", { description: msg });
        }
    };

    const handleRemoveDocument = (type) => {
        setDocuments((prev) => ({
            ...prev,
            [type]: { file: null, uploaded: false, uploading: false },
        }));
    };

    const allDocumentsUploaded = Object.values(documents).every(
        (doc) => doc.uploaded
    );

    const handleSubmit = async () => {
        if (!allDocumentsUploaded) {
            toast.error("Please upload all documents", {
                description: "All three documents are required.",
            });
            return;
        }

        toast.success("Documents submitted successfully!", {
            description: "Your vendor profile is pending approval.",
        });

        setTimeout(() => {
            onComplete();
        }, 800);
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
                            <h1 className="text-blue-800 dark:text-blue-200 text-xl font-semibold">
                                Upload Documents
                            </h1>
                            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                Verify your identity with required documents
                            </p>
                        </div>
                    </motion.div>

                    {/* Upload Progress */}
                    <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl mb-6 border border-blue-200 dark:border-blue-700">
                        <div className="flex justify-between mb-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Upload Progress
                            </p>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {
                                    Object.values(documents).filter((doc) => doc.uploaded).length
                                }{" "}
                                / 3 Completed
                            </p>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                                style={{
                                    width: `${(Object.values(documents).filter((d) => d.uploaded).length /
                                        3) *
                                        100
                                        }%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* File Upload Sections */}
                    <div className="space-y-4">
                        {Object.keys(documents).map((type) => {
                            const doc = documents[type];
                            const info = documentInfo[type];

                            return (
                                <Card
                                    key={type}
                                    className="bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-blue-700"
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                    {info.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-blue-800 dark:text-blue-200">
                                                        {info.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
                                            <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                                <input
                                                    type="file"
                                                    id={`file-${type}`}
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                    onChange={(e) =>
                                                        handleFileSelect(type, e.target.files[0])
                                                    }
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor={`file-${type}`}
                                                    className="cursor-pointer flex flex-col items-center"
                                                >
                                                    <Upload className="w-10 h-10 text-blue-400 mb-3" />
                                                    <p className="text-blue-700 dark:text-blue-300 font-medium">
                                                        Click to upload {info.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        JPG, PNG or PDF (Max 5MB)
                                                    </p>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-8 h-8 text-blue-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                            {doc.file.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {(doc.file.size / 1024).toFixed(1)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                {doc.uploading ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                                        <span className="text-sm text-blue-600">
                                                            Uploading...
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveDocument(type)}
                                                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Info Section */}
                    <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                Document Verification Required
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                                Verification may take 24–48 hours. You’ll be notified after
                                approval.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={!allDocumentsUploaded}
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-6 disabled:opacity-50"
                    >
                        {allDocumentsUploaded ? (
                            <>
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                Submit for Verification
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5 mr-2" />
                                Upload All Documents to Continue
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
