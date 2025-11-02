import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import {
    ArrowLeft,
    Building,
    MapPin,
    Timer,
    FileText,
    Shield,
    CheckCircle2,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Download,
    X
} from 'lucide-react';

export function VendorVerificationDetails({
    request,
    onBack,
    onApprove,
    onReject
}) {
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const downloadBase64File = (base64Data, fileName) => {
        try {
            const extension = fileName.split('.').pop()?.toLowerCase() || '';
            let mimeType = 'application/octet-stream';

            if (extension === 'pdf') {
                mimeType = 'application/pdf';
            } else if (['jpg', 'jpeg'].includes(extension)) {
                mimeType = 'image/jpeg';
            } else if (extension === 'png') {
                mimeType = 'image/png';
            } else if (extension === 'gif') {
                mimeType = 'image/gif';
            } else if (extension === 'txt') {
                mimeType = 'text/plain';
            }

            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Error downloading file. The file data may be corrupted.');
        }
    };

    const viewDocument = (fileName, base64Data) => {
        setSelectedDocument({ fileName, base64Data });
    };

    const getDocumentPreview = (fileName, base64Data) => {
        const extension = fileName.split('.').pop()?.toLowerCase() || '';
        let mimeType = 'application/octet-stream';

        if (extension === 'pdf') {
            mimeType = 'application/pdf';
        } else if (['jpg', 'jpeg'].includes(extension)) {
            mimeType = 'image/jpeg';
        } else if (extension === 'png') {
            mimeType = 'image/png';
        } else if (extension === 'gif') {
            mimeType = 'image/gif';
        }

        if (mimeType.startsWith('image/')) {
            return <img src={`data:${mimeType};base64,${base64Data}`} alt={fileName} className="max-w-full h-auto rounded" />;
        } else if (mimeType === 'application/pdf') {
            return (
                <iframe
                    src={`data:${mimeType};base64,${base64Data}`}
                    className="w-full h-[600px] rounded"
                    title={fileName}
                />
            );
        } else {
            return (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Preview not available for this file type</p>
                    <p className="text-sm mt-2">Click download to view the file</p>
                </div>
            );
        }
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop()?.toLowerCase() || '';
        if (extension === 'pdf') {
            return <FileText className="w-4 h-4 text-red-600" />;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            return <FileText className="w-4 h-4 text-blue-600" />;
        }
        return <FileText className="w-4 h-4 text-gray-600" />;
    };

    const handleApprove = () => {
        onApprove(request.id);
    };

    const handleReject = () => {
        if (rejectionReason.trim()) {
            onReject(request.id, rejectionReason);
            setRejectionReason('');
            setShowRejectConfirm(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-950 dark:to-green-950">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
                <div className="p-4">
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-xl text-gray-900 dark:text-gray-100">Vendor Verification Details</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Review and verify vendor registration</p>
                        </div>
                        <Badge
                            className={
                                request.approvalStatus === 'APPROVED'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300'
                                    : request.approvalStatus === 'REJECTED'
                                        ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300'
                            }
                        >
                            {request.approvalStatus}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 max-w-5xl mx-auto space-y-6 pb-24">
                {/* Business Information */}
                <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader>
                        <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center">
                            <Building className="w-5 h-5 mr-2" />
                            Business Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">Business Name</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.businessName}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">Registration Number</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.businessRegistrationNumber}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">GST Number</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.gstNumber}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">PAN Number</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.panNumber}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">User ID</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">#{request.userId}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">Request ID</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">#{request.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Service Details */}
                <Card className="border-green-200 dark:border-green-800">
                    <CardHeader>
                        <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            Service Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">Service Cities</label>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.serviceCities}</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Service Radius</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.serviceRadiusKm} km</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Daily Pickup Capacity</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.dailyPickupCapacity} pickups/day</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Max Weight Per Pickup</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{request.maxWeightPerPickupKg} kg</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Working Hours */}
                <Card className="border-purple-200 dark:border-purple-800">
                    <CardHeader>
                        <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center">
                            <Timer className="w-5 h-5 mr-2" />
                            Working Hours
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">Working Days</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {request.workingDays.map((day, index) => (
                                        <Badge key={index} variant="outline" className="bg-white dark:bg-gray-700">
                                            {day}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Start Time</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{formatTime(request.workingStartTime)}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">End Time</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{formatTime(request.workingEndTime)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* KYC Documents */}
                <Card className="border-orange-200 dark:border-orange-800">
                    <CardHeader>
                        <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            KYC Documents ({request.kycFiles.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {request.kycDocs && request.kycDocs.length > 0 ? (
                            <div className="grid gap-3">
                                {request.kycFiles.map((fileName, index) => {
                                    const base64Data = request.kycDocs?.[index];
                                    const hasData = base64Data && base64Data.length > 0;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                {getFileIcon(fileName)}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                                        {fileName}
                                                    </p>
                                                    {hasData && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {(base64Data.length / 1024).toFixed(1)} KB
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 ml-4">
                                                {hasData ? (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                            onClick={() => viewDocument(fileName, base64Data)}
                                                        >
                                                            <Eye className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                                                            View
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="hover:bg-green-50 dark:hover:bg-green-900/20"
                                                            onClick={() => downloadBase64File(base64Data, fileName)}
                                                        >
                                                            <Download className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                                                            Download
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Badge variant="outline" className="text-gray-500">
                                                        No data
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-3">
                                {request.kycFiles.map((file, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                                        {getFileIcon(file)}
                                        <span className="text-sm truncate flex-1">{file}</span>
                                        <Badge variant="outline" className="text-gray-500">
                                            No data
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Verification Status */}
                <Card className="border-gray-200 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Verification Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">KYC Status</label>
                                    <div className="mt-2">
                                        {request.kycVerified ? (
                                            <Badge className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
                                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                                Verified
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300">
                                                <Clock className="w-4 h-4 mr-1" />
                                                Pending
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Submitted On</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">{formatDate(request.createdAt)}</p>
                                </div>
                            </div>
                            {request.rejectionReason && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <label className="text-sm text-red-600 dark:text-red-400 font-semibold">Rejection Reason</label>
                                    <p className="text-red-700 dark:text-red-300 mt-2">{request.rejectionReason}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sticky Bottom Actions */}
            {request.approvalStatus === 'PENDING' && (
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-40">
                    <div className="max-w-5xl mx-auto">
                        {!showRejectConfirm ? (
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleApprove}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
                                >
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Approve Vendor
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 h-12"
                                    onClick={() => setShowRejectConfirm(true)}
                                >
                                    <XCircle className="w-5 h-5 mr-2" />
                                    Reject
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="font-medium text-gray-700 dark:text-gray-300">Rejection Reason</label>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setShowRejectConfirm(false);
                                            setRejectionReason('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Provide a detailed reason for rejection..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="min-h-[80px]"
                                />
                                <Button
                                    onClick={handleReject}
                                    disabled={!rejectionReason.trim()}
                                    variant="destructive"
                                    className="w-full h-12"
                                >
                                    Confirm Rejection
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Document Preview Dialog */}
            <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between pr-8">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <span>{selectedDocument?.fileName}</span>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                        {selectedDocument && getDocumentPreview(selectedDocument.fileName, selectedDocument.base64Data)}
                    </div>
                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            variant="outline"
                            onClick={() => selectedDocument && downloadBase64File(selectedDocument.base64Data, selectedDocument.fileName)}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setSelectedDocument(null)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
