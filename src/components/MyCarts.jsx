import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
const baseURL = "http://localhost:8080";
import { Separator } from './ui/separator';
import {
  ArrowLeft,
  ShoppingCart,
  Calendar,
  Package,
  Coins,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Truck,
  ChevronRight,
  User,
  Phone,
  Mail,
  Star,
  Weight,
  Recycle
} from 'lucide-react';

export function MyCarts({ onBack, onGoToCart }) {
  const [currentView, setCurrentView] = useState('list');
  const [selectedCartId, setSelectedCartId] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [userCarts, setUserCarts] = useState([]);
  // const [userCarts] = useState([
  //   {
  //     id: 1,
  //     status: 'draft',
  //     createdDate: '2024-12-17',
  //     items: [
  //       { id: 1, name: 'Plastic Bottle', category: 'Plastic', weight: 0.2, coinsPerKg: 15, totalCoins: 3 },
  //       { id: 2, name: 'Aluminum Can', category: 'Metal', weight: 0.1, coinsPerKg: 25, totalCoins: 3 },
  //       { id: 3, name: 'Glass Jar', category: 'Glass', weight: 0.3, coinsPerKg: 12, totalCoins: 4 }
  //     ],
  //     totalItems: 3,
  //     totalWeight: 0.6,
  //     estimatedCoins: 10
  //   },
  //   {
  //     id: 2,
  //     status: 'scheduled',
  //     createdDate: '2024-12-16',
  //     scheduledDate: '2024-12-19',
  //     items: [
  //       { id: 4, name: 'Cardboard Box', category: 'Paper', weight: 1.2, coinsPerKg: 8, totalCoins: 10 },
  //       { id: 5, name: 'Newspaper', category: 'Paper', weight: 0.5, coinsPerKg: 8, totalCoins: 4 },
  //       { id: 6, name: 'Plastic Container', category: 'Plastic', weight: 0.8, coinsPerKg: 15, totalCoins: 12 }
  //     ],
  //     totalItems: 3,
  //     totalWeight: 2.5,
  //     estimatedCoins: 26,
  //     vendorName: 'EcoVendor NYC',
  //     pickupAddress: '123 Green Street, Eco City'
  //   },
  //   {
  //     id: 3,
  //     status: 'in-progress',
  //     createdDate: '2024-12-15',
  //     scheduledDate: '2024-12-17',
  //     items: [
  //       { id: 7, name: 'Electronic Component', category: 'E-waste', weight: 2.0, coinsPerKg: 30, totalCoins: 60 },
  //       { id: 8, name: 'Battery Pack', category: 'E-waste', weight: 0.5, coinsPerKg: 50, totalCoins: 25 }
  //     ],
  //     totalItems: 2,
  //     totalWeight: 2.5,
  //     estimatedCoins: 85,
  //     vendorName: 'Green Collectors',
  //     pickupAddress: '456 Eco Lane, Green City'
  //   },
  //   {
  //     id: 4,
  //     status: 'completed',
  //     createdDate: '2024-12-10',
  //     completedDate: '2024-12-12',
  //     scheduledDate: '2024-12-12',
  //     pickupTime: '2:30 PM',
  //     items: [
  //       { id: 9, name: 'Plastic Bottles (5x)', category: 'Plastic', weight: 1.0, coinsPerKg: 15, totalCoins: 15 },
  //       { id: 10, name: 'Glass Bottles (3x)', category: 'Glass', weight: 1.5, coinsPerKg: 12, totalCoins: 18 },
  //       { id: 11, name: 'Metal Cans (8x)', category: 'Metal', weight: 0.8, coinsPerKg: 25, totalCoins: 20 }
  //     ],
  //     totalItems: 16,
  //     totalWeight: 3.3,
  //     estimatedCoins: 53,
  //     actualCoins: 58,
  //     vendorName: 'Recycle Pro',
  //     vendorAddress: '456 Vendor Plaza, Business District',
  //     vendorPhone: '+1-555-0123',
  //     pickupAddress: '789 Recycle Road, Eco City',
  //     pickupAssistant: {
  //       id: 'ast001',
  //       name: 'Mike Johnson',
  //       phone: '+1-555-0199',
  //       email: 'mike.j@recyclepro.com',
  //       rating: 4.8,
  //       totalPickups: 156
  //     },
  //     notes: 'Great condition items, bonus coins added for excellent sorting!'
  //   },
  //   {
  //     id: 5,
  //     status: 'completed',
  //     createdDate: '2024-12-05',
  //     completedDate: '2024-12-07',
  //     scheduledDate: '2024-12-07',
  //     pickupTime: '10:15 AM',
  //     items: [
  //       { id: 12, name: 'Cardboard (Large)', category: 'Paper', weight: 3.0, coinsPerKg: 8, totalCoins: 24 },
  //       { id: 13, name: 'Magazines', category: 'Paper', weight: 1.2, coinsPerKg: 8, totalCoins: 10 }
  //     ],
  //     totalItems: 2,
  //     totalWeight: 4.2,
  //     estimatedCoins: 34,
  //     actualCoins: 34,
  //     vendorName: 'EcoVendor NYC',
  //     vendorAddress: '321 Green Avenue, Eco District',
  //     vendorPhone: '+1-555-0145',
  //     pickupAddress: '123 Green Street, Eco City',
  //     pickupAssistant: {
  //       id: 'ast002',
  //       name: 'Sarah Chen',
  //       phone: '+1-555-0178',
  //       email: 'sarah.c@ecovendor.com',
  //       rating: 4.9,
  //       totalPickups: 203
  //     },
  //     notes: 'Paper items in excellent condition, processed efficiently.'
  //   },
  //   {
  //     id: 6,
  //     status: 'rejected',
  //     createdDate: '2024-12-01',
  //     scheduledDate: '2024-12-03',
  //     pickupTime: '1:45 PM',
  //     items: [
  //       { id: 14, name: 'Mixed Plastic', category: 'Plastic', weight: 2.0, coinsPerKg: 15, totalCoins: 30 }
  //     ],
  //     totalItems: 1,
  //     totalWeight: 2.0,
  //     estimatedCoins: 30,
  //     vendorName: 'Green Collectors',
  //     vendorAddress: '789 Collector Street, Green District',
  //     vendorPhone: '+1-555-0167',
  //     pickupAddress: '456 Eco Lane, Green City',
  //     rejectionReason: 'Items were contaminated and not suitable for recycling',
  //     pickupAssistant: {
  //       id: 'ast003',
  //       name: 'David Rodriguez',
  //       phone: '+1-555-0134',
  //       email: 'david.r@greencollectors.com',
  //       rating: 4.6,
  //       totalPickups: 89
  //     },
  //     notes: 'Please ensure items are properly cleaned before future pickups.'
  //   }
  // ]);

  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/v1/end_users/carts/me/status`,
          {
            params: {
              userId: userId,
              status: "DRAFT",
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Cart Status Response:", response.data);
        setUserCarts(response.data);
      } catch (error) {
        console.error("❌ Error fetching cart status:", error);
      }
    };

    fetchCartStatus();
  }, []); // [] means only once on mount

  const getStatusInfo = (status) => {
    switch (status) {
      case 'DRAFT':
        return { text: 'Draft', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: <Package className="w-4 h-4" /> };
      case 'SCHEDULED':
        return { text: 'Scheduled', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: <Calendar className="w-4 h-4" /> };
      case 'IN-PROGRESS':
        return { text: 'In Progress', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', icon: <Truck className="w-4 h-4" /> };
      case 'COMPLETED':
        return { text: 'Completed', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', icon: <CheckCircle className="w-4 h-4" /> };
      case 'REJECTED':
        return { text: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', icon: <XCircle className="w-4 h-4" /> };
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: <Package className="w-4 h-4" /> };
    }
  };

  const activeCarts = userCarts.filter(cart => ['DRAFT', 'SCHEDULED', 'IN-PROGRESS'].includes(cart.status));
  const completedCarts = userCarts.filter(cart => cart.status === 'COMPLETED');
  const rejectedCarts = userCarts.filter(cart => cart.status === 'REJECTED');
  const selectedCart = userCarts.find(cart => cart.id === selectedCartId);

  const handleCartClick = (cart) => {
    if (['DRAFT', 'SCHEDULED', 'IN-PROGRESS'].includes(cart.status)) onGoToCart(cart.id);
    else {
      setSelectedCartId(cart.id);
      setCurrentView('detail');
    }
  };


  const handleCreateNewCart = async () => {

    if (!userId) {
      toast.error("User ID not found! Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/v1/end_users/carts/empty`,
        null,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🟢 New Cart Created:", response.data);
      localStorage.setItem("cartId", response.data?.cart?._id || response.data?.id || 0);


      toast.success("New cart created successfully!");

      // Backend se ID nikal le
      const newCartId = response.data?.cart?._id || response.data?.id || 0;

      // Navigate to cart page
      onGoToCart(newCartId);
    } catch (error) {
      console.error("❌ Error creating new cart:", error);
      toast.error("Failed to create a new cart", {
        description: "Please try again later.",
      });
    }
  };

  // new code 
  // const handleCartClick = async (cart) => {
  //   const userId = localStorage.getItem("userId");

  //   try {
  //     // 🔥 Call your backend API when a cart is clicked
  //     const response = await axios.post(
  //       "http://localhost:8080/api/v1/end_users/carts/empty",
  //       null,
  //       {
  //         params: { userId }, // 👈 adds ?userId=...
  //       }
  //     );

  //     console.log("API Response:", response.data);
  //     toast.success("Cart emptied successfully!");

  //     // 🔁 Then go to cart or show details depending on status
  //     if (['draft', 'scheduled', 'in-progress'].includes(cart.status)) {
  //       onGoToCart(cart.id);
  //     } else {
  //       setSelectedCartId(cart.id);
  //       setCurrentView('detail');
  //     }

  //   } catch (error) {
  //     console.error("Error emptying cart:", error);
  //     toast.error("Failed to empty cart", {
  //       description: "Please try again later.",
  //     });
  //   }
  // };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCartId(null);
  };

  // 🟢 Keep rest of JSX code same (CartDetailView, CartCard, return block)

  const CartDetailView = ({ cart }) => {
    const statusInfo = getStatusInfo(cart.status);


    return (
      <div className="space-y-6">
        {/* Cart Header */}
        <Card className="border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge className={statusInfo.color}>
                  {statusInfo.icon}
                  <span className="ml-1">{statusInfo.text}</span>
                </Badge>
                <h2 className="text-green-800 dark:text-green-200">Cart #{cart.id}</h2>
              </div>
              <div className="text-right text-sm text-green-600 dark:text-green-400">
                <div>Created: {cart.createdAt}</div>
                {cart.completedDate && <div>Completed: {cart.completedDate}</div>}
                {cart.pickupTime && <div>Time: {cart.pickupTime}</div>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded">
                <div className="flex items-center justify-center mb-1">
                  <Package className="w-4 h-4 text-green-600 mr-1" />
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {cart.totalItems}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">Items</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded">
                <div className="flex items-center justify-center mb-1">
                  <Weight className="w-4 h-4 text-blue-600 mr-1" />
                </div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {cart.totalEstimatedWeight}kg
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Weight</p>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800 dark:to-blue-800 rounded">
              <div className="flex items-center justify-center mb-2">
                <Coins className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                  GreenCoins Earned
                </span>
              </div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {cart.actualCoins || cart.estimatedCoins}
                {cart.actualCoins && cart.actualCoins !== cart.estimatedCoins && (
                  <span className="text-sm text-green-600 dark:text-green-400 ml-2">
                    (Est: {cart.estimatedCoins})
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800 dark:text-green-200">
              <Recycle className="w-5 h-5 mr-2" />
              Recycled Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-700 dark:text-green-300">
                      {item.totalCoins} coins
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.weight}kg @ {item.coinsPerKg}/kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Information */}
        {cart.vendorName && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                <Package className="w-5 h-5 mr-2" />
                Vendor Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Company:</span>
                <span className="font-medium text-green-700 dark:text-green-300">{cart.vendorName}</span>
              </div>
              {cart.vendorAddress && (
                <div className="flex items-start justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Address:</span>
                  <span className="font-medium text-green-700 dark:text-green-300 text-right">
                    {cart.vendorAddress}
                  </span>
                </div>
              )}
              {cart.vendorPhone && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                  <span className="font-medium text-green-700 dark:text-green-300">{cart.vendorPhone}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pickup Assistant Information */}
        {cart.pickupAssistant && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                <User className="w-5 h-5 mr-2" />
                Pickup Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {cart.pickupAssistant.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {cart.pickupAssistant.phone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {cart.pickupAssistant.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-green-700 dark:text-green-300">
                    {cart.pickupAssistant.rating} ({cart.pickupAssistant.totalPickups} pickups)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pickup Details */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800 dark:text-green-200">
              <MapPin className="w-5 h-5 mr-2" />
              Pickup Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cart.pickupAddress && (
              <div className="flex items-start justify-between">
                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                <span className="font-medium text-green-700 dark:text-green-300 text-right">
                  {cart.pickupAddress}
                </span>
              </div>
            )}
            {cart.scheduledDate && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Scheduled:</span>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {cart.scheduledDate} {cart.pickupTime && `at ${cart.pickupTime}`}
                </span>
              </div>
            )}
            {cart.completedDate && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {cart.completedDate} {cart.pickupTime && `at ${cart.pickupTime}`}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rejection Reason or Notes */}
        {(cart.rejectionReason || cart.notes) && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                <Clock className="w-5 h-5 mr-2" />
                {cart.rejectionReason ? 'Rejection Details' : 'Additional Notes'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded ${cart.rejectionReason
                ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300'
                : 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                }`}>
                {cart.rejectionReason || cart.notes}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleBackToList}
            variant="outline"
            className="border-green-200 text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Carts
          </Button>
        </div>
      </div>
    );
  };

  const CartCard = ({ cart }) => {
    const statusInfo = getStatusInfo(cart.status);

    return (
      <Card
        key={cart.id}
        className="border-green-200 hover:bg-green-50 dark:hover:bg-green-900 transition-colors cursor-pointer"
        onClick={() => handleCartClick(cart)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Badge className={statusInfo.color}>
                {statusInfo.icon}
                <span className="ml-1">{statusInfo.text}</span>
              </Badge>
              <span className="text-sm text-green-600 dark:text-green-400">
                Cart #{cart.id}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="text-xs border-green-300 text-green-700">
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              <ChevronRight className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Created:</span>
              <span className="text-green-700 dark:text-green-300">{cart.createdAt.split("T")[0]}</span>
            </div>

            {cart.scheduledDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Scheduled:</span>
                <span className="text-green-700 dark:text-green-300">{cart.scheduledDate}</span>
              </div>
            )}

            {cart.completedDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                <span className="text-green-700 dark:text-green-300">{cart.completedDate}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Items:</span>
              <span className="text-green-700 dark:text-green-300">{cart.items.length} items • {cart.totalEstimatedWeight}kg</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">GreenCoins:</span>
              <span className="text-green-700 dark:text-green-300">
                {cart.actualCoins ? `${cart.actualCoins} (actual)` : `${cart.totalEstimatedCoins} (estimated)`}
              </span>
            </div>

            {cart.vendorName && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Vendor:</span>
                <span className="text-green-700 dark:text-green-300">{cart.vendorName}</span>
              </div>
            )}

            {cart.rejectionReason && (
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900 rounded text-xs text-red-700 dark:text-red-300">
                <strong>Rejection Reason:</strong> {cart.rejectionReason}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

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

            <Logo size="small" showText={false} animated={false} />

            <h1 className="text-green-800 dark:text-green-200">My Carts</h1>
          </div>

          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Show detail view if a cart is selected */}
        {currentView === 'detail' && selectedCart && (
          <CartDetailView cart={selectedCart} />
        )}

        {/* Show list view */}
        {currentView === 'list' && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {activeCarts.length}
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Active</p>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {completedCarts.length}
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {completedCarts.reduce((sum, cart) => sum + (cart.actualCoins || 0), 0)}
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Coins</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different cart categories */}
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid grid-cols-3 w-full bg-green-100 dark:bg-green-800">
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Active ({activeCarts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Completed ({completedCarts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  History ({rejectedCarts.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-6">
                {activeCarts.length > 0 ? (
                  activeCarts.map(cart => <CartCard key={cart.id} cart={cart} />)
                ) : (
                  <Card className="border-green-200">
                    <CardContent className="p-8 text-center">
                      <ShoppingCart className="w-16 h-16 text-green-300 mx-auto mb-4" />
                      <h3 className="text-green-800 dark:text-green-200 mb-2">No Active Carts</h3>
                      <p className="text-green-600 dark:text-green-400 text-sm mb-4">
                        Start recycling by creating a new cart!
                      </p>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onGoToCart(0)} // New cart
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Cart
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {completedCarts.length > 0 ? (
                  completedCarts.map(cart => <CartCard key={cart.id} cart={cart} />)
                ) : (
                  <Card className="border-green-200">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                      <h3 className="text-green-800 dark:text-green-200 mb-2">No Completed Carts</h3>
                      <p className="text-green-600 dark:text-green-400 text-sm">
                        Your completed recycling activities will appear here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4 mt-6">
                {rejectedCarts.length > 0 ? (
                  rejectedCarts.map(cart => <CartCard key={cart.id} cart={cart} />)
                ) : (
                  <Card className="border-green-200">
                    <CardContent className="p-8 text-center">
                      <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-gray-600 dark:text-gray-400 mb-2">No Rejected Carts</h3>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        Great! No carts have been rejected.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="border-green-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
              <CardContent className="p-4">
                <h3 className="text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Quick Actions
                </h3>
                <div className="flex space-x-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleCreateNewCart} // New cart
                  // onClick={() => onGoToCart(0)} // New cart //old code
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-green-200 text-green-700"
                    onClick={onBack}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}