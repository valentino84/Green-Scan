import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ProfileCompletion } from './components/ProfileCompletion';
import { VendorBusinessDetails } from './components/VendorBusinessDetails';
import { VendorDocumentUpload } from './components/VendorDocumentUpload';
import { NgoOrganizationDetails } from './components/NgoOrganizationDetails';
import { NgoDocumentUpload } from './components/NgoDocumentUpload';
import { OnboardingCarousel } from './components/OnboardingCarousel';
import { DashboardUser } from './components/DashboardUser';
import { DashboardVendor } from './components/DashboardVendor';
import { DashboardAdmin } from './components/DashboardAdmin';
import { DashboardAssistant } from './components/DashboardAssistant';
import { DashboardAdvertisement } from './components/DashboardAdvertisement';
import { DashboardNgo } from './components/DashboardNgo';
import { Cart } from './components/Cart';
import { MyCarts } from './components/MyCarts';
import { Profile } from './components/Profile';
import { ItemScanner } from './components/ItemScanner';
import { Donate } from './components/Donate';
import { SchedulePickup } from './components/SchedulePickup';
import { FindVendor } from './components/FindVendor';
import { TrackAssistant } from './components/TrackAssistant';
import { Redeem } from './components/Redeem';
import { GreenCoinWallet } from './components/GreenCoinWallet';
import { VendorDirections } from './components/VendorDirections';
import { VendorPickups } from './components/VendorPickups';
import { VendorEarnings } from './components/VendorEarnings';
import { VendorVerificationDetails } from './components/VendorVerificationDetails';
import { PickupDetailsForm } from './components/PickupDetailsForm';
import { generateUIConfig } from './components/UIOrchestrator';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { Leaf } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState('login');
  const [userRole, setUserRole] = useState('END_USER');
  const [userLocation, setUserLocation] = useState('New York, NY');
  const [currentCartId, setCurrentCartId] = useState(1);
  const [navigationStack, setNavigationStack] = useState(['dashboard']);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [vendorBusinessData, setVendorBusinessData] = useState(null);
  const [ngoOrganizationData, setNgoOrganizationData] = useState(null);
  const [vendorApprovalStatus, setVendorApprovalStatus] = useState('pending');
  const [ngoApprovalStatus, setNgoApprovalStatus] = useState('pending');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationUserId, setRegistrationUserId] = useState('');
  const [selectedVendorVerificationRequest, setSelectedVendorVerificationRequest] = useState(null);
  const [currentCartData, setCurrentCartData] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setAppState('onboarding');
  };

  // console.log('Current User Role:', userRole);

  const handleRegisterSuccess = (role, email, userId) => {
    console.log('Registration Success Handler:', { role, email, userId });
    setUserRole(role);
    if (email) setRegistrationEmail(email);
    if (userId) setRegistrationUserId(userId);
    setAppState('profileCompletion');
  };

  const handleProfileComplete = (profileData) => {
    setUserProfileData(profileData);
    console.log('Profile Data:', profileData);
    if (userRole === 'VENDOR') {
      setAppState('vendorBusinessDetails');
    } else if (userRole === 'NGO') {
      setAppState('ngoOrganizationDetails');
    } else {
      setAppState('onboarding');
    }
  };

  const handleVendorBusinessComplete = (businessData) => {
    setVendorBusinessData(businessData);
    console.log('Vendor Business Data:', businessData);
    setAppState('vendorDocumentUpload');
  };

  const handleVendorDocumentsComplete = () => {
    console.log('Vendor documents uploaded, pending approval');
    setVendorApprovalStatus('pending');
    setAppState('onboarding');
  };

  const handleNgoOrganizationComplete = (ngoData) => {
    setNgoOrganizationData(ngoData);
    console.log('NGO Organization Data:', ngoData);
    setAppState('ngoDocumentUpload');
  };

  const handleNgoDocumentsComplete = () => {
    console.log('NGO documents uploaded, pending approval');
    setNgoApprovalStatus('pending');
    setAppState('onboarding');
  };

  const handleGoToRegister = () => setAppState('register');
  const handleGoToLogin = () => setAppState('login');
  const handleOnboardingComplete = () => setAppState('dashboard');

  const handleLogout = () => {
    setAppState('login');
    setUserRole('user');
  };

  const handleGoToCart = (cartId) => {
    if (cartId) setCurrentCartId(cartId);
    setAppState('cart');
  };

  const handleGoToMyCarts = () => setAppState('myCarts');
  const handleGoToCartFromMyCarts = (cartId) => {
    setCurrentCartId(cartId);
    setAppState('cart');
  };

  const handleBackToMyCarts = () => setAppState('myCarts');
  const handleBackToDashboard = () => setAppState('dashboard');

  const handleNavigateToState = (newState) => {
    setNavigationStack((prev) => [...prev, appState]);
    setAppState(newState);
  };

  const handleBackToPrevious = () => {
    if (navigationStack.length > 0) {
      const previousState = navigationStack[navigationStack.length - 1];
      setNavigationStack((prev) => prev.slice(0, -1));
      setAppState(previousState);
    } else {
      setAppState('dashboard');
    }
  };

  const handleGoToProfile = () => setAppState('profile');
  const handleGoToItemScanner = () => setAppState('itemScanner');
  const handleBackToCart = () => setAppState('cart');
  const handleGoToDonate = () => setAppState('donate');
  const handleGoToSchedulePickup = () => setAppState('schedulePickup');
  const handleGoToFindVendor = () => setAppState('findVendor');

  const handleGoToVendorDirections = (vendor) => {
    setSelectedVendor(vendor);
    handleNavigateToState('vendorDirections');
  };

  const handleSelectVendorForCart = (vendor) => {
    setSelectedVendor(vendor);
    setAppState('cart');
  };

  const handleGoToTrackAssistant = () => handleNavigateToState('trackAssistant');
  const handleGoToRedeem = () => setAppState('redeem');
  const handleGoToWallet = () => setAppState('wallet');
  const handleGoToVendorPickups = () => handleNavigateToState('vendorPickups');
  const handleGoToVendorEarnings = () => handleNavigateToState('vendorEarnings');
  const handleGoToVendorDashboard = () => setAppState('dashboard');
  const handleGoToVendorProfile = () => setAppState('profile');

  const handleToggleVendorApproval = () => {
    setVendorApprovalStatus((prev) => (prev === 'pending' ? 'approved' : 'pending'));
  };

  const handleNavigateToVendorVerification = (request) => {
    setSelectedVendorVerificationRequest(request);
    handleNavigateToState('vendorVerificationDetails');
  };

  const handleApproveVendorVerification = (requestId) => {
    console.log('Approved vendor verification request:', requestId);
    handleBackToPrevious();
  };

  const handleRejectVendorVerification = (requestId, reason) => {
    console.log('Rejected vendor verification request:', requestId, 'Reason:', reason);
    handleBackToPrevious();
  };

  const handleGoToPickupDetails = () => {
    const mockCartData = {
      id: 3,
      cartNumber: 'CART-1761037213581',
      status: 'DRAFT',
      totalEstimatedWeight: 3.2,
      totalEstimatedCoins: 512,
      items: [
        {
          id: 3,
          itemName: 'Ceiling Fan Blades (set of 3)',
          materialType: 'SCRAP_METAL',
          estimatedWeight: 1.2,
          estimatedCoins: 192,
          imageUrl: 'https://example.com/3img.jpg',
          status: 'PENDING_USER_CONFIRMATION'
        },
        {
          id: 4,
          itemName: 'Ceiling Fan Blades',
          materialType: 'SCRAP_METAL',
          estimatedWeight: 2,
          estimatedCoins: 320,
          imageUrl: 'https://example.com/4img.jpg',
          status: 'PENDING_USER_CONFIRMATION'
        }
      ]
    };
    setCurrentCartData(mockCartData);
    handleNavigateToState('pickupDetails');
  };

  const handleScheduleComplete = (pickupDetails) => {
    console.log('Pickup scheduled successfully:', pickupDetails);
    alert('Pickup scheduled successfully! 🎉');
    setSelectedVendor(null);
    setCurrentCartData(null);
    setAppState('dashboard');
  };

  const uiConfig = generateUIConfig({
    role: userRole === 'assistant' ? 'user' : userRole,
    location: userLocation,
    preferences: { ecoRewards: true, donations: true, pickups: true }
  });

  const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
  const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.4 };
  const logoVariants = { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.2, duration: 0.6, ease: 'easeOut' } };
  const formVariants = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4, duration: 0.5, ease: 'easeOut' } };

  return (
    <ThemeProvider defaultTheme="light" storageKey="greenscan-theme">
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-900 dark:via-gray-900 dark:to-emerald-900 transition-colors duration-500">
        <AnimatePresence mode="wait">
          {appState === 'login' && (
            <motion.div
              key="login"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen flex flex-col justify-center relative"
            >
              {/* Theme Toggle - Login Page */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute top-4 right-4"
              >
                <ThemeToggle />
              </motion.div>

              {/* App Logo/Header */}
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl"
                  >
                    <Leaf className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </motion.div>
                </div>
                <h1 className="text-green-800 dark:text-green-200 mb-2">GreenScan</h1>
                <p className="text-green-600 dark:text-green-400 text-sm">AI-Powered Recycling</p>
              </motion.div>

              <motion.div variants={formVariants} initial="initial" animate="animate">
                <LoginForm onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />
              </motion.div>
            </motion.div>
          )}

          {appState === 'register' && (
            <motion.div
              key="register"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen flex flex-col justify-center relative"
            >
              {/* Theme Toggle - Register Page */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute top-4 right-4"
              >
                <ThemeToggle />
              </motion.div>

              {/* App Logo/Header */}
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl"
                  >
                    <Leaf className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </motion.div>
                </div>
                <h1 className="text-green-800 dark:text-green-200 mb-2">GreenScan</h1>
                <p className="text-green-600 dark:text-green-400 text-sm">AI-Powered Recycling</p>
              </motion.div>

              <motion.div variants={formVariants} initial="initial" animate="animate">
                <RegisterForm onRegisterSuccess={handleRegisterSuccess} onGoToLogin={handleGoToLogin} />
              </motion.div>
            </motion.div>
          )}

          {appState === 'profileCompletion' && (
            <motion.div
              key="profileCompletion"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <ProfileCompletion
                onComplete={handleProfileComplete}
                onBack={handleGoToLogin}
              />
            </motion.div>
          )}

          {appState === 'vendorBusinessDetails' && (
            <motion.div
              key="vendorBusinessDetails"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <VendorBusinessDetails
                onComplete={handleVendorBusinessComplete}
                onBack={() => setAppState('profileCompletion')}
                email={registrationEmail || 'vendor@example.com'}
                userId={registrationUserId || 'mock-user-id'}
              />
            </motion.div>
          )}

          {appState === 'vendorDocumentUpload' && (
            <motion.div
              key="vendorDocumentUpload"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <VendorDocumentUpload
                onComplete={handleVendorDocumentsComplete}
                onBack={() => setAppState('vendorBusinessDetails')}
              />
            </motion.div>
          )}

          {appState === 'ngoOrganizationDetails' && (
            <motion.div
              key="ngoOrganizationDetails"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <NgoOrganizationDetails
                onComplete={handleNgoOrganizationComplete}
                onBack={() => setAppState('profileCompletion')}
                email={registrationEmail || 'ngo@example.org'}
                userId={registrationUserId || 'mock-user-id'}
              />
            </motion.div>
          )}

          {appState === 'ngoDocumentUpload' && (
            <motion.div
              key="ngoDocumentUpload"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <NgoDocumentUpload
                onComplete={handleNgoDocumentsComplete}
                onBack={() => setAppState('ngoOrganizationDetails')}
              />
            </motion.div>
          )}

          {appState === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <OnboardingCarousel onComplete={handleOnboardingComplete} role={userRole} />
            </motion.div>
          )}

          {appState === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {/* Render appropriate dashboard based on role */}
              {userRole === 'END_USER' && (
                <DashboardUser
                  onLogout={handleLogout}
                  location={userLocation}
                  onGoToCart={handleGoToCart}
                  onGoToMyCarts={handleGoToMyCarts}
                  onGoToProfile={handleGoToProfile}
                  onGoToDonate={handleGoToDonate}
                  onGoToSchedulePickup={handleGoToSchedulePickup}
                  onGoToFindVendor={handleGoToFindVendor}
                  onGoToTrackAssistant={handleGoToTrackAssistant}
                  onGoToRedeem={handleGoToRedeem}
                  onGoToWallet={handleGoToWallet}
                  onSelectVendor={handleSelectVendorForCart}
                />
              )}
              {userRole === 'VENDOR' && (
                <DashboardVendor
                  onLogout={handleLogout}
                  location={userLocation}
                  onGoToDashboard={handleGoToVendorDashboard}
                  onGoToPickups={handleGoToVendorPickups}
                  onGoToEarnings={handleGoToVendorEarnings}
                  onGoToProfile={handleGoToVendorProfile}
                  approvalStatus={vendorApprovalStatus}
                  onToggleApproval={handleToggleVendorApproval}
                />
              )}
              {userRole === 'ADMIN' && (
                <DashboardAdmin
                  onLogout={handleLogout}
                  location={userLocation}
                  onNavigateToVendorVerification={handleNavigateToVendorVerification}
                />
              )}
              {userRole === 'PICKUP_ASSISTANT' && (
                <DashboardAssistant onLogout={handleLogout} location={userLocation} />
              )}
              {userRole === 'ADS_COMPANY' && (
                <DashboardAdvertisement onLogout={handleLogout} location={userLocation} />
              )}
              {userRole === 'NGO' && (
                <DashboardNgo onLogout={handleLogout} location={userLocation} approvalStatus={ngoApprovalStatus} />
              )}
            </motion.div>
          )}

          {appState === 'cart' && (
            <motion.div
              key="cart"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Cart
                onBack={handleBackToDashboard}
                cartId={currentCartId}
                onGoToItemScanner={handleGoToItemScanner}
                selectedVendor={selectedVendor}
                onGoToPickupDetails={handleGoToPickupDetails}
              />
            </motion.div>
          )}

          {appState === 'myCarts' && (
            <motion.div
              key="myCarts"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <MyCarts
                onBack={handleBackToDashboard}
                onGoToCart={handleGoToCartFromMyCarts}
              />
            </motion.div>
          )}

          {appState === 'profile' && (
            <motion.div
              key="profile"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Profile onBack={handleBackToDashboard} />
            </motion.div>
          )}

          {appState === 'itemScanner' && (
            <motion.div
              key="itemScanner"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ItemScanner onBack={handleBackToCart} />
            </motion.div>
          )}

          {appState === 'donate' && (
            <motion.div
              key="donate"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Donate onBack={handleBackToDashboard} />
            </motion.div>
          )}

          {appState === 'schedulePickup' && (
            <motion.div
              key="schedulePickup"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <SchedulePickup onBack={handleBackToDashboard} />
            </motion.div>
          )}

          {appState === 'findVendor' && (
            <motion.div
              key="findVendor"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <FindVendor
                onBack={handleBackToDashboard}
                onGetDirections={handleGoToVendorDirections}
                onSelectVendor={handleSelectVendorForCart}
              />
            </motion.div>
          )}

          {appState === 'vendorDirections' && (
            <motion.div
              key="vendorDirections"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <VendorDirections
                onBack={handleBackToPrevious}
                vendor={selectedVendor}
                userLocation={userLocation}
              />
            </motion.div>
          )}

          {appState === 'trackAssistant' && (
            <motion.div
              key="trackAssistant"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <TrackAssistant onBack={handleBackToPrevious} />
            </motion.div>
          )}

          {appState === 'redeem' && (
            <motion.div
              key="redeem"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Redeem onBack={handleBackToDashboard} onGoToEarn={handleBackToDashboard} />
            </motion.div>
          )}

          {appState === 'wallet' && (
            <motion.div
              key="wallet"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <GreenCoinWallet onBack={handleBackToDashboard} />
            </motion.div>
          )}

          {appState === 'vendorPickups' && (
            <motion.div
              key="vendorPickups"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <VendorPickups onBack={handleBackToPrevious} />
            </motion.div>
          )}

          {appState === 'vendorEarnings' && (
            <motion.div
              key="vendorEarnings"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <VendorEarnings onBack={handleBackToPrevious} />
            </motion.div>
          )}

          {appState === 'vendorVerificationDetails' && selectedVendorVerificationRequest && (
            <motion.div
              key="vendorVerificationDetails"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <VendorVerificationDetails
                request={selectedVendorVerificationRequest}
                onBack={handleBackToPrevious}
                onApprove={handleApproveVendorVerification}
                onReject={handleRejectVendorVerification}
              />
            </motion.div>
          )}

          {appState === 'pickupDetails' && currentCartData && (
            <motion.div
              key="pickupDetails"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PickupDetailsForm
                onBack={handleBackToPrevious}
                onScheduleComplete={handleScheduleComplete}
                cartData={currentCartData}
                preSelectedVendor={selectedVendor}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}