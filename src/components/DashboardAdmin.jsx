import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import PropTypes from 'prop-types';
import {
  Menu,
  Users,
  Truck,
  Coins,
  TrendingUp,
  BarChart3,
  Settings,
  Shield,
  Award,
  Globe,
  Home,
  UserCheck,
  Store,
  Clock,
  CheckCircle,
  XCircle,

  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Bell,
  Eye,
  Edit,
  Ban,
  Check,
  Send,
  Plus,
  Search,
  Filter,
  Gift,
  Package,
  Trash2,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle2,

  X,
  FileText,
  DollarSign,
  Users2,

  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Forward,
  Briefcase
} from 'lucide-react';

export function DashboardAdmin({ onLogout, location = "Global" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState < 'dashboard' | 'users' | 'notifications' | 'rewards' > ('dashboard');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerms, setSearchTerms] = useState({
    vendor: '',
    admin: '',
    assistant: '',
    ngo: '',
    advertisement: ''
  });

  const [rewardSearchTerm, setRewardSearchTerm] = useState('');
  // const [selectedReward, setSelectedReward] = useState < any > (null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  // const [notificationSubTab, setNotificationSubTab] = useState < 'management' | 'campaigns' > ('management');
  const [notificationSubTab, setNotificationSubTab] = useState('management');
  const [pendingCampaigns, setPendingCampaigns] = useState([
    {
      id: 'campaign_001',
      submittedBy: 'Green Earth NGO',
      submitterEmail: 'contact@greenearth.org',
      submitterRole: 'ngo',
      campaignType: 'awareness',
      title: 'Plastic-Free Ocean Initiative',
      description: 'Join our mission to reduce ocean plastic pollution. Educational campaign about proper plastic disposal and recycling.',
      targetAudience: 'All users',
      duration: '30 days',
      budget: '₹0 (NGO Initiative)',
      requestedVendors: ['All vendors in coastal areas'],
      attachments: ['Campaign_Proposal.pdf', 'Impact_Studies.pdf'],
      submittedAt: '2025-01-06T09:30:00Z',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'campaign_002',
      submittedBy: 'EcoAds Marketing',
      submitterEmail: 'team@ecoads.com',
      submitterRole: 'advertisement',
      campaignType: 'promotion',
      title: 'Green Shopping Rewards Program',
      description: 'Promote eco-friendly products with exclusive discounts for GreenScan users. Partnership with sustainable brands.',
      targetAudience: 'Active recyclers with 500+ GreenCoins',
      duration: '45 days',
      budget: '₹2,50,000',
      requestedVendors: ['Premium vendors in metro cities'],
      attachments: ['Marketing_Strategy.pdf', 'Brand_Partnerships.pdf', 'Budget_Breakdown.xlsx'],
      submittedAt: '2025-01-06T08:15:00Z',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'campaign_003',
      submittedBy: 'Clean Planet Initiative',
      submitterEmail: 'team@cleanplanet.org',
      submitterRole: 'ngo',
      campaignType: 'awareness',
      title: 'E-Waste Collection Drive',
      description: 'Special collection drive for electronic waste with educational workshops on proper e-waste disposal.',
      targetAudience: 'Users in IT hubs',
      duration: '15 days',
      budget: '₹50,000 (Government Grant)',
      requestedVendors: ['Vendors with e-waste handling capability'],
      attachments: ['Government_Approval.pdf', 'Workshop_Plan.pdf'],
      submittedAt: '2025-01-05T14:20:00Z',
      status: 'pending',
      priority: 'high'
    }
  ]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [campaignRejectionReason, setCampaignRejectionReason] = useState('');
  const [vendorSelectionOpen, setVendorSelectionOpen] = useState(false);
  const [selectedVendorsForCampaign, setSelectedVendorsForCampaign] = useState([]);
  const [availableVendors] = useState([
    { id: 'vendor_001', name: 'EcoCollect NYC', location: 'New York, NY', category: 'premium' },
    { id: 'vendor_002', name: 'Green Logistics LA', location: 'Los Angeles, CA', category: 'premium' },
    { id: 'vendor_003', name: 'Recycle Pro Mumbai', location: 'Mumbai, India', category: 'standard' },
    { id: 'vendor_004', name: 'Waste Warriors Delhi', location: 'Delhi, India', category: 'standard' },
    { id: 'vendor_005', name: 'Ocean Cleanup SF', location: 'San Francisco, CA', category: 'premium' },
    { id: 'vendor_006', name: 'E-Waste Experts Bangalore', location: 'Bangalore, India', category: 'specialist' }
  ]);
  const [rewards, setRewards] = useState([
    {
      id: 'reward_001',
      name: 'Amazon Gift Card',
      description: '₹500 Amazon Gift Card for online shopping',
      coinCost: "1000",
      category: 'gift_cards',
      status: 'available',
      quantity: "50",
      imageUrl: '/api/placeholder/150/150',
      expiryDate: '2025-12-31',
      terms: 'Valid for 1 year from date of issue'
    },
    {
      id: 'reward_002',
      name: 'Starbucks Voucher',
      description: '₹300 Starbucks Coffee Voucher',
      coinCost: "600",
      category: 'food_beverage',
      status: 'available',
      quantity: "50",
      imageUrl: '/api/placeholder/150/150',
      expiryDate: '2025-06-30',
      terms: 'Applicable at all Starbucks outlets'
    },
    {
      id: 'reward_003',
      name: 'Movie Tickets',
      description: 'BookMyShow movie tickets (2 tickets)',
      coinCost: "800",
      category: 'entertainment',
      status: 'coming_soon',
      quantity: "100",
      imageUrl: '/api/placeholder/150/150',
      expiryDate: '2025-09-30',
      terms: 'Valid at participating cinemas'
    },
    {
      id: 'reward_004',
      name: 'Eco-Friendly Bag',
      description: 'Sustainable jute shopping bag',
      coinCost: "1000",
      category: 'eco_products',
      status: 'available',
      quantity: "50",
      imageUrl: '/api/placeholder/150/150',
      expiryDate: '2026-01-31',
      terms: 'Physical product delivery'
    },
    {
      id: 'reward_005',
      name: 'Premium Subscription',
      description: 'Netflix Premium 1-month subscription',
      coinCost: "1200",
      category: 'subscriptions',
      status: 'out_of_stock',
      quantity: "0",
      imageUrl: '/api/placeholder/150/150',
      expiryDate: '2025-12-31',
      terms: 'Account activation required'
    }
  ]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'req_001',
      userId: 'user_456',
      userName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      requestedRole: 'vendor',
      submittedAt: '2025-01-06T10:30:00Z',
      businessName: 'Green Waste Solutions LLC',
      businessAddress: '123 Eco Street, New York, NY 10001',
      businessType: 'Waste Management & Recycling',
      experience: '5 years in commercial waste collection',
      documents: ['Business License', 'Insurance Certificate', 'Vehicle Registration'],
      status: 'pending'
    },
    {
      id: 'req_002',
      userId: 'user_789',
      userName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      requestedRole: 'assistant',
      submittedAt: '2025-01-06T09:15:00Z',
      experience: '3 years driver, familiar with waste collection routes',
      documents: ['Driver\'s License', 'Background Check', 'References'],
      status: 'pending'
    },
    {
      id: 'req_003',
      userId: 'user_321',
      userName: 'Michael Chen',
      email: 'michael.chen@adcompany.com',
      phone: '+1 (555) 456-7890',
      requestedRole: 'advertisement',
      submittedAt: '2025-01-06T08:45:00Z',
      businessName: 'EcoAd Marketing Agency',
      businessAddress: '456 Marketing Ave, Los Angeles, CA 90210',
      businessType: 'Digital Marketing & Advertising',
      companySize: '25-50 employees',
      campaignBudget: '$50,000 - $100,000 annually',
      documents: ['Company Registration', 'Portfolio', 'Client References'],
      status: 'pending'
    },
    {
      id: 'req_004',
      userId: 'user_654',
      userName: 'Emily Rodriguez',
      email: 'emily.r@greenlogistics.com',
      phone: '+1 (555) 234-5678',
      requestedRole: 'vendor',
      submittedAt: '2025-01-05T16:20:00Z',
      businessName: 'EcoLogistics Partners',
      businessAddress: '789 Sustainability Blvd, Austin, TX 78701',
      businessType: 'Logistics & Transportation',
      experience: '7 years in sustainable logistics',
      documents: ['Business License', 'Fleet Insurance', 'Environmental Certifications'],
      status: 'pending'
    }
  ]);

  const analytics = {
    totalUsers: 12847,
    totalVendors: 342,
    coinsDistributed: 2486520,
    plasticRecycled: 15670, // kg
    co2Saved: 47280 // kg
  };

  const recentActivity = [
    { type: "user_signup", count: 45, change: "+12%" },
    { type: "vendor_signup", count: 8, change: "+25%" },
    { type: "pickups_completed", count: 156, change: "+8%" },
    { type: "coins_distributed", count: 12540, change: "+15%" }
  ];

  const topVendors = [
    { name: "EcoVendor NYC", pickups: 89, rating: 4.9, status: "active" },
    { name: "Green Collectors", pickups: 67, rating: 4.8, status: "active" },
    { name: "Recycle Pro", pickups: 45, rating: 4.6, status: "pending" }
  ];

  // Mock data for all users (excluding regular users)
  const allUsers = [
    // Vendors
    {
      id: 'vendor_001',
      name: 'Bob Wilson',
      email: 'bob.wilson@recycleplus.com',
      role: 'vendor',
      status: 'active',
      joinDate: '2024-11-20',
      greenCoins: 5670,
      pickupsCompleted: 45,
      location: 'Los Angeles, CA'
    },
    {
      id: 'vendor_002',
      name: 'EcoCollect Services',
      email: 'contact@ecocollect.com',
      role: 'vendor',
      status: 'active',
      joinDate: '2024-10-15',
      greenCoins: 8900,
      pickupsCompleted: 78,
      location: 'Phoenix, AZ'
    },
    {
      id: 'vendor_003',
      name: 'Green Logistics LLC',
      email: 'info@greenlogistics.com',
      role: 'vendor',
      status: 'pending',
      joinDate: '2024-12-01',
      greenCoins: 2340,
      pickupsCompleted: 15,
      location: 'Denver, CO'
    },
    // Admins
    {
      id: 'admin_001',
      name: 'Carol Admin',
      email: 'carol.admin@greenscan.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-10',
      greenCoins: 0,
      pickupsCompleted: 0,
      location: 'Chicago, IL'
    },
    {
      id: 'admin_002',
      name: 'System Administrator',
      email: 'sysadmin@greenscan.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-05',
      greenCoins: 0,
      pickupsCompleted: 0,
      location: 'Remote'
    },
    // Assistants
    {
      id: 'assistant_001',
      name: 'David Helper',
      email: 'david.h@assistant.com',
      role: 'assistant',
      status: 'active',
      joinDate: '2024-10-05',
      greenCoins: 3200,
      pickupsCompleted: 67,
      location: 'Miami, FL'
    },
    {
      id: 'assistant_002',
      name: 'Lisa Rodriguez',
      email: 'lisa.r@helpers.com',
      role: 'assistant',
      status: 'active',
      joinDate: '2024-11-12',
      greenCoins: 2890,
      pickupsCompleted: 45,
      location: 'Dallas, TX'
    },
    {
      id: 'assistant_003',
      name: 'Mike Chen',
      email: 'mike.chen@assistants.com',
      role: 'assistant',
      status: 'inactive',
      joinDate: '2024-09-20',
      greenCoins: 1560,
      pickupsCompleted: 23,
      location: 'Atlanta, GA'
    },
    // NGOs
    {
      id: 'ngo_001',
      name: 'Green Earth NGO',
      email: 'contact@greenearth.org',
      role: 'ngo',
      status: 'active',
      joinDate: '2024-09-12',
      greenCoins: 0,
      pickupsCompleted: 120,
      location: 'Seattle, WA'
    },
    {
      id: 'ngo_002',
      name: 'EcoFuture Foundation',
      email: 'info@ecofuture.org',
      role: 'ngo',
      status: 'active',
      joinDate: '2024-08-25',
      greenCoins: 0,
      pickupsCompleted: 89,
      location: 'San Diego, CA'
    },
    {
      id: 'ngo_003',
      name: 'Clean Planet Initiative',
      email: 'team@cleanplanet.org',
      role: 'ngo',
      status: 'active',
      joinDate: '2024-07-30',
      greenCoins: 0,
      pickupsCompleted: 156,
      location: 'Washington, DC'
    },
    // Advertisement Companies
    {
      id: 'ad_001',
      name: 'EcoAds Marketing',
      email: 'team@ecoads.com',
      role: 'advertisement',
      status: 'active',
      joinDate: '2024-08-18',
      greenCoins: 0,
      pickupsCompleted: 0,
      location: 'Austin, TX'
    },
    {
      id: 'ad_002',
      name: 'Green Media Solutions',
      email: 'contact@greenmedia.com',
      role: 'advertisement',
      status: 'active',
      joinDate: '2024-09-05',
      greenCoins: 0,
      pickupsCompleted: 0,
      location: 'Nashville, TN'
    }
  ];
  const notifications = [
    {
      id: 'notif_001',
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Platform maintenance scheduled for tonight at 2 AM EST',
      priority: 'high',
      sent: false,
      createdAt: '2025-01-06T14:30:00Z',
      recipients: 'all'
    },
    {
      id: 'notif_002',
      type: 'promotion',
      title: 'Double GreenCoins Weekend',
      message: 'Earn double GreenCoins on all recycling activities this weekend!',
      priority: 'medium',
      sent: true,
      createdAt: '2025-01-05T09:00:00Z',
      recipients: 'users'
    },
    {
      id: 'notif_003',
      type: 'vendor',
      title: 'New Pickup Areas Available',
      message: 'Expanded service areas now available in downtown districts',
      priority: 'medium',
      sent: true,
      createdAt: '2025-01-04T16:20:00Z',
      recipients: 'vendors'
    },
    {
      id: 'notif_004',
      type: 'security',
      title: 'Security Update Required',
      message: 'Please update your passwords for enhanced security',
      priority: 'high',
      sent: false,
      createdAt: '2025-01-06T11:15:00Z',
      recipients: 'all'
    }
  ];

  const handleApproveRequest = (requestId) => {
    setPendingRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'approved' }
          : req
      )
    );
  };

  const handleRejectRequest = (request) => {
    setSelectedRequest(request);
    setRejectionDialogOpen(true);
  };
  // ✅ Corrected JSX Version

  const confirmRejectRequest = () => {
    if (selectedRequest && rejectionReason.trim()) {
      setPendingRequests(prev =>
        prev.map(req =>
          req.id === selectedRequest.id
            ? { ...req, status: 'rejected' }
            : req
        )
      );
      setRejectionDialogOpen(false);
      setRejectionReason('');
      setSelectedRequest(null);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'vendor': return <i className="w-4 h-4" />;
      case 'assistant': return <i className="w-4 h-4" />;
      case 'advertisement': return <i className="w-4 h-4" />;
      default: return <i className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'vendor':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300';
      case 'assistant':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300';
      case 'advertisement':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getUserRoleIcon = (role) => {
    switch (role) {
      case 'vendor': return <i className="w-4 h-4" />;
      case 'admin': return <i className="w-4 h-4" />;
      case 'assistant': return <i className="w-4 h-4" />;
      case 'ngo': return <i className="w-4 h-4" />;
      case 'advertisement': return <i className="w-4 h-4" />;
      default: return <i className="w-4 h-4" />;
    }
  };

  const getUserRoleBadgeColor = (role) => {
    switch (role) {
      case 'vendor':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300';
      case 'admin':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300';
      case 'assistant':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300';
      case 'ngo':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300';
      case 'advertisement':
        return 'bg-pink-100 text-pink-700 dark:bg-pink-800 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'system': return <i className="w-4 h-4" />;
      case 'promotion': return <i className="w-4 h-4" />;
      case 'vendor': return <i className="w-4 h-4" />;
      case 'security': return <i className="w-4 h-4" />;
      default: return <i className="w-4 h-4" />;
    }
  };

  const getNotificationPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300';
      case 'low':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getUsersByRole = (role) => {
    return allUsers.filter(user => user.role === role);
  };

  const getFilteredUsersByRole = (role) => {
    const users = getUsersByRole(role);
    const searchTerm = searchTerms[role]?.toLowerCase() || '';

    if (!searchTerm) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.location.toLowerCase().includes(searchTerm)
    );
  };

  const handleSearchChange = (role, value) => {
    setSearchTerms(prev => ({ ...prev, [role]: value }));
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'user': return 'Regular Users';
      case 'vendor': return 'Vendors';
      case 'admin': return 'Administrators';
      case 'assistant': return 'Pickup Assistants';
      case 'ngo': return 'NGO Partners';
      case 'advertisement': return 'Advertisement Companies';
      default: return '';
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'vendor': return 'Collection service providers';
      case 'admin': return 'Platform administrators';
      case 'assistant': return 'Pickup assistance staff';
      case 'ngo': return 'Non-profit organization partners';
      case 'advertisement': return 'Marketing and advertising partners';
      default: return '';
    }
  };

  // Reward management functions
  const getRewardStatusIcon = (status) => {
    switch (status) {
      case 'available': return <i className="w-4 h-4 text-green-600" />;
      case 'coming_soon': return <i className="w-4 h-4 text-yellow-600" />;
      case 'out_of_stock': return <i className="w-4 h-4 text-red-600" />;
      default: return <i className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRewardStatusBadgeColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300';
      case 'coming_soon':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getRewardCategoryIcon = (category) => {
    switch (category) {
      case 'gift_cards': return <i className="w-4 h-4" />;
      case 'food_beverage': return <i className="w-4 h-4" />;
      case 'entertainment': return <i className="w-4 h-4" />;
      case 'eco_products': return <i className="w-4 h-4" />;
      case 'subscriptions': return <i className="w-4 h-4" />;
      default: return <i className="w-4 h-4" />;
    }
  };

  const getFilteredRewards = () => {
    if (!rewardSearchTerm) return rewards;

    return rewards.filter(reward =>
      reward.name.toLowerCase().includes(rewardSearchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(rewardSearchTerm.toLowerCase()) ||
      reward.category.toLowerCase().includes(rewardSearchTerm.toLowerCase())
    );
  };

  const handleUpdateRewardStatus = (rewardId, newStatus) => {
    setRewards(prev =>
      prev.map(reward =>
        reward.id === rewardId
          ? { ...reward, status: newStatus }
          : reward
      )
    );
  };

  const handleUpdateRewardQuantity = (rewardId, newQuantity) => {
    setRewards(prev =>
      prev.map(reward =>
        reward.id === rewardId
          ? { ...reward, quantity: Math.max(0, newQuantity) }
          : reward
      )
    );
  };

  const handleDeleteReward = (rewardId) => {
    setRewards(prev => prev.filter(reward => reward.id !== rewardId));
  };

  // Campaign management functions
  const getCampaignTypeIcon = (type) => {
    switch (type) {
      case 'awareness': return <i className="w-4 h-4" />;
      case 'promotion': return <i className="w-4 h-4" />;
      default: return <i className="w-4 h-4" />;
    }
  };

  const getCampaignTypeBadgeColor = (type) => {
    switch (type) {
      case 'awareness':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300';
      case 'promotion':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleApproveCampaign = (campaignId) => {
    const campaign = pendingCampaigns.find(c => c.id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setVendorSelectionOpen(true);
    }
  };

  const handleRejectCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setCampaignDialogOpen(true);
  };

  const confirmRejectCampaign = () => {
    if (selectedCampaign && campaignRejectionReason.trim()) {
      setPendingCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === selectedCampaign.id
            ? { ...campaign, status: 'rejected' }
            : campaign
        )
      );
      setCampaignDialogOpen(false);
      setCampaignRejectionReason('');
      setSelectedCampaign(null);
    }
  };

  const handleSendCampaignToVendors = () => {
    if (selectedCampaign && selectedVendorsForCampaign.length > 0) {
      setPendingCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === selectedCampaign.id
            ? { ...campaign, status: 'approved' }
            : campaign
        )
      );
      setVendorSelectionOpen(false);
      setSelectedVendorsForCampaign([]);
      setSelectedCampaign(null);
    }
  };

  const toggleVendorSelection = (vendorId) => {
    setSelectedVendorsForCampaign(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-950 dark:to-green-950 pb-20">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-green-200 dark:border-green-700 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Logo size="small" showText={false} animated={false} />

            <div className="flex items-center space-x-1 text-green-700 dark:text-green-300">
              <Globe className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300">
              <Shield className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white w-64 h-full p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-green-800">Admin Panel</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Truck className="w-4 h-4 mr-2" />
                Vendor Management
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Store className="w-4 h-4 mr-2" />
                Rewards Store
              </Button>
              <Button variant="ghost" className="w-full justify-start text-green-700">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
              <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="p-4 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800 dark:to-green-800">
        <h2 className="text-green-800 dark:text-green-100 mb-1">Admin Dashboard 👑</h2>
        <p className="text-green-600 dark:text-green-300 text-sm">Monitor platform performance and manage ecosystem</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {activeTab === 'dashboard' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm">Total Users</p>
                      <p className="text-xl">{analytics.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm">Vendors</p>
                      <p className="text-xl">{analytics.totalVendors.toLocaleString()}</p>
                    </div>
                    <Truck className="w-6 h-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm">Coins Distributed</p>
                      <p className="text-xl">{analytics.coinsDistributed.toLocaleString()}</p>
                    </div>
                    <Coins className="w-6 h-6 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm">Growth</p>
                      <p className="text-xl">+15.2%</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card className="border-green-200 bg-gradient-to-r from-green-100 to-emerald-100">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl text-green-700">{analytics.plasticRecycled.toLocaleString()} kg</p>
                  <p className="text-sm text-green-600">Plastic Recycled</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-green-700">{analytics.co2Saved.toLocaleString()} kg</p>
                  <p className="text-sm text-green-600">CO₂ Saved</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Recent Activity (24h)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-green-800 capitalize">
                        {activity.type.replace('_', ' ')}
                      </p>
                      <p className="text-lg text-green-700">{activity.count.toLocaleString()}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${activity.change.startsWith('+')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {activity.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Verification Requests */}
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Pending Verification Requests
                  </div>
                  <Badge variant="secondary" className="bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-200">
                    {pendingRequests.filter(req => req.status === 'pending').length} pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingRequests.filter(req => req.status === 'pending').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No pending requests</p>
                  </div>
                ) : (
                  pendingRequests
                    .filter(req => req.status === 'pending')
                    .map((request) => (
                      <div key={request.id} className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700 rounded-lg p-4 space-y-3">
                        {/* Request Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">{request.userName}</h4>
                              <Badge className={getRoleBadgeColor(request.requestedRole)}>
                                {getRoleIcon(request.requestedRole)}
                                <span className="ml-1 capitalize">{request.requestedRole}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {request.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {request.phone}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatTimeAgo(request.submittedAt)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Business Information */}
                        {(request.businessName || request.businessAddress) && (
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                            {request.businessName && (
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium">{request.businessName}</span>
                              </div>
                            )}
                            {request.businessAddress && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{request.businessAddress}</span>
                              </div>
                            )}
                            {request.businessType && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Type:</strong> {request.businessType}
                              </div>
                            )}
                            {request.companySize && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Company Size:</strong> {request.companySize}
                              </div>
                            )}
                            {request.campaignBudget && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Annual Budget:</strong> {request.campaignBudget}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Experience */}
                        {request.experience && (
                          <div className="text-sm">
                            <strong className="text-gray-700 dark:text-gray-300">Experience:</strong>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{request.experience}</p>
                          </div>
                        )}

                        {/* Documents */}
                        {request.documents && request.documents.length > 0 && (
                          <div className="text-sm">
                            <strong className="text-gray-700 dark:text-gray-300">Documents Submitted:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {request.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectRequest(request)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Reject Request</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                  Please provide a reason for rejecting <strong>{selectedRequest?.userName}</strong>'s
                                  {' '}{selectedRequest?.requestedRole} application:
                                </p>
                                <Textarea
                                  placeholder="Enter rejection reason..."
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  className="min-h-[100px]"
                                />
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={confirmRejectRequest}
                                    disabled={!rejectionReason.trim()}
                                    variant="destructive"
                                    className="flex-1"
                                  >
                                    Confirm Rejection
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setRejectionDialogOpen(false);
                                      setRejectionReason('');
                                      setSelectedRequest(null);
                                    }}
                                    variant="outline"
                                    className="flex-1"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))
                )}
              </CardContent>
            </Card>

            {/* Vendor Management */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Top Vendors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topVendors.map((vendor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-sm text-green-800">{vendor.name}</p>
                      <p className="text-xs text-green-600">{vendor.pickups} pickups • ⭐ {vendor.rating}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={`${vendor.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                          }`}
                      >
                        {vendor.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="text-xs border-green-300 text-green-700">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reward Store Management */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Store className="w-5 h-5 mr-2" />
                  Reward Store Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                    <Award className="w-4 h-4 mr-2" />
                    Add Rewards
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Prices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Manage Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Header with total stats */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Manage Users
                  </div>
                  <Badge variant="secondary" className="bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200">
                    {allUsers.length} total users
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {['vendor', 'admin', 'assistant', 'ngo', 'advertisement'].map((role) => (
                    <div key={role} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center mb-1">
                        {getUserRoleIcon(role)}
                        <span className="ml-1 text-sm font-medium">{getRoleDisplayName(role)}</span>
                      </div>
                      <p className="text-lg font-semibold">{getUsersByRole(role).length}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Role-based user sections */}
            {['vendor', 'admin', 'assistant', 'ngo', 'advertisement'].map((role) => (
              <Card key={role} className={`border-${role === 'user' ? 'green' : role === 'vendor' ? 'blue' : role === 'admin' ? 'purple' : role === 'assistant' ? 'emerald' : role === 'ngo' ? 'amber' : 'pink'}-200`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-${role === 'user' ? 'green' : role === 'vendor' ? 'blue' : role === 'admin' ? 'purple' : role === 'assistant' ? 'emerald' : role === 'ngo' ? 'amber' : 'pink'}-800 dark:text-${role === 'user' ? 'green' : role === 'vendor' ? 'blue' : role === 'admin' ? 'purple' : role === 'assistant' ? 'emerald' : role === 'ngo' ? 'amber' : 'pink'}-200 flex items-center`}>
                      {getUserRoleIcon(role)}
                      <div className="ml-2">
                        <div className="flex items-center space-x-2">
                          <span>{getRoleDisplayName(role)}</span>
                          <Badge className={getUserRoleBadgeColor(role)}>
                            {getUsersByRole(role).length}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-normal mt-1">
                          {getRoleDescription(role)}
                        </p>
                      </div>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder={`Search ${getRoleDisplayName(role).toLowerCase()}...`}
                          value={searchTerms[role] || ''}
                          onChange={(e) => handleSearchChange(role, e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {getFilteredUsersByRole(role).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>
                        {searchTerms[role]
                          ? `No ${getRoleDisplayName(role).toLowerCase()} found matching "${searchTerms[role]}"`
                          : `No ${getRoleDisplayName(role).toLowerCase()} found`
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {getFilteredUsersByRole(role).map((user) => (
                        <div key={user.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h4>
                                <Badge
                                  variant="outline"
                                  className={user.status === 'active' ? 'border-green-300 text-green-700' : user.status === 'pending' ? 'border-yellow-300 text-yellow-700' : 'border-red-300 text-red-700'}
                                >
                                  {user.status}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {user.email}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {user.location}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Joined {new Date(user.joinDate).toLocaleDateString()}
                                </div>
                                {(user.role === 'vendor' || user.role === 'assistant') && (
                                  <div className="flex items-center">
                                    <Coins className="w-3 h-3 mr-1" />
                                    {user.greenCoins} GreenCoins
                                  </div>
                                )}
                              </div>

                              {(user.role === 'vendor' || user.role === 'assistant') && (
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <Truck className="w-3 h-3 mr-1" />
                                    {user.pickupsCompleted} pickups completed
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              {user.status === 'active' ? (
                                <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                  <Ban className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Notifications Management Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Sub-tab navigation */}
            <Card className="border-purple-200">
              <CardContent className="p-3">
                <div className="flex space-x-2">
                  <Button
                    variant={notificationSubTab === 'management' ? 'default' : 'outline'}
                    onClick={() => setNotificationSubTab('management')}
                    className="flex-1"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Management
                  </Button>
                  <Button
                    variant={notificationSubTab === 'campaigns' ? 'default' : 'outline'}
                    onClick={() => setNotificationSubTab('campaigns')}
                    className="flex-1"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Campaign Approvals
                    {pendingCampaigns.filter(c => c.status === 'pending').length > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white">
                        {pendingCampaigns.filter(c => c.status === 'pending').length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Management Section */}
            {notificationSubTab === 'management' && (
              <div className="space-y-6">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Create New Notification
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Notification
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        All Notifications
                      </div>
                      <Badge variant="secondary" className="bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-200">
                        {notifications.length} total
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {getNotificationIcon(notification.type)}
                                <h4 className="ml-2 font-medium text-gray-900 dark:text-gray-100">{notification.title}</h4>
                              </div>
                              <Badge className={getNotificationPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              <Badge variant={notification.sent ? "default" : "outline"}>
                                {notification.sent ? 'Sent' : 'Draft'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>To: {notification.recipients}</span>
                              <span>Created: {formatTimeAgo(notification.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            {!notification.sent && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <Send className="w-4 h-4 mr-1" />
                                Send
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Campaign Approvals Section */}
            {notificationSubTab === 'campaigns' && (
              <div className="space-y-6">
                <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900">
                  <CardHeader>
                    <CardTitle className="text-amber-800 dark:text-amber-200 flex items-center justify-between">
                      <div className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Pending Campaign Approvals
                      </div>
                      <Badge variant="secondary" className="bg-amber-200 text-amber-800 dark:bg-amber-700 dark:text-amber-200">
                        {pendingCampaigns.filter(c => c.status === 'pending').length} pending
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Review and approve campaign requests from NGOs and Advertisement Companies
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Campaign Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pendingCampaigns.filter(c => c.status === 'pending').length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No pending campaign requests</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {pendingCampaigns
                          .filter(c => c.status === 'pending')
                          .map((campaign) => (
                            <div key={campaign.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="space-y-4">
                                {/* Campaign Header */}
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{campaign.title}</h4>
                                      <Badge className={getCampaignTypeBadgeColor(campaign.campaignType)}>
                                        {getCampaignTypeIcon(campaign.campaignType)}
                                        <span className="ml-1 capitalize">{campaign.campaignType}</span>
                                      </Badge>
                                      <Badge className={getNotificationPriorityColor(campaign.priority)}>
                                        {campaign.priority}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                      <div className="flex items-center">
                                        <Building className="w-3 h-3 mr-1" />
                                        {campaign.submittedBy} ({campaign.submitterRole.toUpperCase()})
                                      </div>
                                      <div className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {formatTimeAgo(campaign.submittedAt)}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.description}</p>
                                  </div>
                                </div>

                                {/* Campaign Details */}
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                      <Users2 className="w-3 h-3 mr-2 text-gray-500" />
                                      <span className="font-medium">Target:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-400">{campaign.targetAudience}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Timer className="w-3 h-3 mr-2 text-gray-500" />
                                      <span className="font-medium">Duration:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-400">{campaign.duration}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                      <DollarSign className="w-3 h-3 mr-2 text-gray-500" />
                                      <span className="font-medium">Budget:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-400">{campaign.budget}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Truck className="w-3 h-3 mr-2 text-gray-500" />
                                      <span className="font-medium">Vendors:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-400">{campaign.requestedVendors.join(', ')}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Attachments */}
                                {campaign.attachments && campaign.attachments.length > 0 && (
                                  <div className="text-sm">
                                    <strong className="text-gray-700 dark:text-gray-300">Attachments:</strong>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {campaign.attachments.map((attachment, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          <FileText className="w-3 h-3 mr-1" />
                                          {attachment}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex space-x-2 pt-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApproveCampaign(campaign.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <ThumbsUp className="w-4 h-4 mr-1" />
                                    Approve & Send to Vendors
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejectCampaign(campaign)}
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <ThumbsDown className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Campaign Rejection Dialog */}
            <Dialog open={campaignDialogOpen} onOpenChange={setCampaignDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Reject Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Please provide a reason for rejecting <strong>{selectedCampaign?.title}</strong> from{' '}
                    <strong>{selectedCampaign?.submittedBy}</strong>:
                  </p>
                  <Textarea
                    placeholder="Enter rejection reason..."
                    value={campaignRejectionReason}
                    onChange={(e) => setCampaignRejectionReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={confirmRejectCampaign}
                      disabled={!campaignRejectionReason.trim()}
                      variant="destructive"
                      className="flex-1"
                    >
                      Confirm Rejection
                    </Button>
                    <Button
                      onClick={() => {
                        setCampaignDialogOpen(false);
                        setCampaignRejectionReason('');
                        setSelectedCampaign(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Vendor Selection Dialog */}
            <Dialog open={vendorSelectionOpen} onOpenChange={setVendorSelectionOpen}>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select Vendors for Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Select vendors to send <strong>{selectedCampaign?.title}</strong> campaign:
                  </p>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {availableVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedVendorsForCampaign.includes(vendor.id)
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => toggleVendorSelection(vendor.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{vendor.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.location}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {vendor.category}
                            </Badge>
                            {selectedVendorsForCampaign.includes(vendor.id) && (
                              <Check className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSendCampaignToVendors}
                      disabled={selectedVendorsForCampaign.length === 0}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Forward className="w-4 h-4 mr-2" />
                      Send to {selectedVendorsForCampaign.length} Vendor(s)
                    </Button>
                    <Button
                      onClick={() => {
                        setVendorSelectionOpen(false);
                        setSelectedVendorsForCampaign([]);
                        setSelectedCampaign(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Manage Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {/* Header with stats and add button */}
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Manage Rewards
                  </div>
                  <Badge variant="secondary" className="bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-200">
                    {rewards.length} rewards
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center mb-1">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium">Available</span>
                      </div>
                      <p className="text-lg font-semibold">{rewards.filter(r => r.status === 'available').length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 mr-1 text-yellow-600" />
                        <span className="text-sm font-medium">Coming Soon</span>
                      </div>
                      <p className="text-lg font-semibold">{rewards.filter(r => r.status === 'coming_soon').length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center mb-1">
                        <AlertCircle className="w-4 h-4 mr-1 text-red-600" />
                        <span className="text-sm font-medium">Out of Stock</span>
                      </div>
                      <p className="text-lg font-semibold">{rewards.filter(r => r.status === 'out_of_stock').length}</p>
                    </div>
                  </div>
                  <Button className="ml-4 bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Reward
                  </Button>
                </div>

                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search rewards by name, description, or category..."
                    value={rewardSearchTerm}
                    onChange={(e) => setRewardSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Rewards list */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  All Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getFilteredRewards().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Gift className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>
                      {rewardSearchTerm
                        ? `No rewards found matching "${rewardSearchTerm}"`
                        : 'No rewards found'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {getFilteredRewards().map((reward) => (
                      <div key={reward.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4 flex-1">
                            {/* Reward image placeholder */}
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              {getRewardCategoryIcon(reward.category)}
                              <span className="text-white text-xs ml-1">{reward.coinCost}</span>
                            </div>

                            {/* Reward details */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{reward.name}</h4>
                                <Badge className={getRewardStatusBadgeColor(reward.status)}>
                                  {getRewardStatusIcon(reward.status)}
                                  <span className="ml-1 capitalize">{reward.status.replace('_', ' ')}</span>
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{reward.description}</p>

                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Coins className="w-3 h-3 mr-1 text-yellow-500" />
                                  {reward.coinCost} GreenCoins
                                </div>
                                <div className="flex items-center">
                                  <Package className="w-3 h-3 mr-1" />
                                  Quantity: {reward.quantity}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Expires: {new Date(reward.expiryDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Award className="w-3 h-3 mr-1" />
                                  {reward.category.replace('_', ' ')}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-col space-y-2">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Quick actions */}
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs px-2"
                                onClick={() => handleUpdateRewardQuantity(reward.id, reward.quantity + 10)}
                              >
                                +10 Qty
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs px-2"
                                onClick={() => handleUpdateRewardQuantity(reward.id, reward.quantity - 10)}
                              >
                                -10 Qty
                              </Button>
                            </div>

                            {/* Status toggle */}
                            <div className="flex space-x-1">
                              {reward.status !== 'available' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs px-2 border-green-300 text-green-600"
                                  onClick={() => handleUpdateRewardStatus(reward.id, 'available')}
                                >
                                  Make Available
                                </Button>
                              )}
                              {reward.status !== 'coming_soon' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs px-2 border-yellow-300 text-yellow-600"
                                  onClick={() => handleUpdateRewardStatus(reward.id, 'coming_soon')}
                                >
                                  Coming Soon
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-green-200 dark:border-green-700 p-2">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-col space-y-1 ${activeTab === 'dashboard' ? 'text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-900' : 'text-green-600 dark:text-green-400'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-col space-y-1 ${activeTab === 'users' ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900' : 'text-green-600 dark:text-green-400'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Manage Users</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-col space-y-1 ${activeTab === 'notifications' ? 'text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-900' : 'text-green-600 dark:text-green-400'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-col space-y-1 ${activeTab === 'rewards' ? 'text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-900' : 'text-green-600 dark:text-green-400'}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs">Manage Rewards</span>
          </Button>
        </div>
      </div>
    </div>
  );
}