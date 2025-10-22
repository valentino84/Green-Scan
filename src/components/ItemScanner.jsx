import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ThemeToggle } from './ThemeToggle';
import {
  ArrowLeft,
  Camera,
  Upload,
  Zap,
  CheckCircle,
  FileImage,
  Scan,
  Package,
  Scale,
  Tag
} from 'lucide-react';

export function ItemScanner({ onBack }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      setStream(mediaStream);
      setIsCameraMode(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      fileInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setSelectedImage(imageData);
      stopCamera();
      simulateAIScanning(imageData);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraMode(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result;
        setSelectedImage(imageData);
        simulateAIScanning(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIScanning = async (imageData) => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const mockItems = [
      {
        name: "Plastic Water Bottle",
        material: "PET Plastic",
        weight: 0.5,
        minWeight: 0.3,
        maxWeight: 0.8,
        coinsPerKg: 25,
        confidence: 94
      },
      {
        name: "Aluminum Can",
        material: "Aluminum",
        weight: 0.4,
        minWeight: 0.2,
        maxWeight: 0.6,
        coinsPerKg: 45,
        confidence: 89
      },
      {
        name: "Cardboard Box",
        material: "Corrugated Cardboard",
        weight: 1.2,
        minWeight: 0.8,
        maxWeight: 2.0,
        coinsPerKg: 15,
        confidence: 76
      },
      {
        name: "Glass Bottle",
        material: "Clear Glass",
        weight: 0.8,
        minWeight: 0.5,
        maxWeight: 1.2,
        coinsPerKg: 20,
        confidence: 91
      }
    ];

    const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
    setScannedItem(randomItem);
    setIsScanning(false);
  };

  const handleAddToCart = () => {
    console.log('Adding item to cart:', scannedItem);
    onBack();
  };

  const updateWeight = (newWeight) => {
    if (scannedItem && newWeight >= scannedItem.minWeight && newWeight <= scannedItem.maxWeight) {
      setScannedItem({
        ...scannedItem,
        weight: newWeight
      });
    }
  };

  if (isCameraMode) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 border-4 border-white rounded-lg shadow-lg">
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-white"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-white"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-white"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-white"></div>
              </div>
              <p className="text-white text-center mt-4 text-lg font-medium">
                Position item within the frame
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-center justify-between">
              <Button
                onClick={stopCamera}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Cancel
              </Button>

              <Button
                onClick={capturePhoto}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-full w-16 h-16 p-0"
              >
                <Camera className="w-8 h-8" />
              </Button>

              <div className="w-20"></div>
            </div>
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

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
            <h1 className="text-green-800 dark:text-green-200 font-semibold">Add Item</h1>
          </div>

          <ThemeToggle />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {!selectedImage && !isScanning && !scannedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="border-green-200 dark:border-green-700">
              <CardHeader className="text-center">
                <CardTitle className="text-green-800 dark:text-green-200 flex items-center justify-center">
                  <Scan className="w-6 h-6 mr-2" />
                  Scan Your Item
                </CardTitle>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Use AI to identify and weigh your recyclable items
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {isMobile ? (
                  <Button
                    onClick={startCamera}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 py-6"
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    Open Camera
                  </Button>
                ) : (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 py-6"
                  >
                    <Upload className="w-6 h-6 mr-3" />
                    Upload Image
                  </Button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="text-center">
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    Supported formats: JPG, PNG, WebP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <h4 className="text-green-800 dark:text-green-200 font-medium mb-2">
                  Tips for Best Results:
                </h4>
                <ul className="text-green-600 dark:text-green-400 text-sm space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Place item on plain background</li>
                  <li>• Keep the item fully visible</li>
                  <li>• Avoid shadows and reflections</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-sm mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
              </motion.div>

              <h3 className="text-green-800 dark:text-green-200 font-semibold mb-2">
                AI is analyzing your item...
              </h3>
              <p className="text-green-600 dark:text-green-400 text-sm">
                This may take a few seconds
              </p>

              <div className="mt-4 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        {scannedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {selectedImage && (
              <Card className="border-green-200 dark:border-green-700">
                <CardContent className="p-4">
                  <img
                    src={selectedImage}
                    alt="Scanned item"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            )}

            <Card className="border-green-200 dark:border-green-700">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Item Identified
                  <span className="ml-auto text-sm bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                    {scannedItem.confidence}% confidence
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">{scannedItem.name}</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">{scannedItem.material}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        {scannedItem.coinsPerKg} coins/kg
                      </p>
                      <p className="text-green-600 dark:text-green-400 text-sm">Coin rate</p>
                    </div>
                  </div>
                </div>

                {/* Weight Adjustment */}
                <div className="space-y-3">
                  <Label className="text-green-700 dark:text-green-300 flex items-center">
                    <Scale className="w-4 h-4 mr-2" />
                    Weight (kg)
                  </Label>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateWeight(Math.max(scannedItem.minWeight, scannedItem.weight - 0.1))}
                      disabled={scannedItem.weight <= scannedItem.minWeight}
                      className="w-10 h-10 p-0"
                    >
                      -
                    </Button>

                    <div className="flex-1">
                      <Input
                        type="number"
                        value={scannedItem.weight.toFixed(1)}
                        onChange={(e) => updateWeight(parseFloat(e.target.value))}
                        min={scannedItem.minWeight}
                        max={scannedItem.maxWeight}
                        step="0.1"
                        className="text-center"
                      />
                      <p className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
                        Range: {scannedItem.minWeight}kg - {scannedItem.maxWeight}kg
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateWeight(Math.min(scannedItem.maxWeight, scannedItem.weight + 0.1))}
                      disabled={scannedItem.weight >= scannedItem.maxWeight}
                      className="w-10 h-10 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Estimated Coins */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-300">Estimated Coins:</span>
                    <span className="text-green-800 dark:text-green-200 font-bold text-lg">
                      {(scannedItem.weight * scannedItem.coinsPerKg).toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>

                  <Button
                    onClick={() => {
                      setScannedItem(null);
                      setSelectedImage('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Scan Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
