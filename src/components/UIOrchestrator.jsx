export function generateUIConfig(params) {
  const { role, location, preferences = {} } = params;

  // Location-specific CTAs
  const getLocationCTA = (role, location) => {
    if (location.toLowerCase().includes('delhi')) {
      switch (role) {
        case 'user': return 'Join Delhi Recycling Drive - Extra 50 coins!';
        case 'vendor': return 'Delhi Peak Hours - 15% more earnings!';
        case 'admin': return 'Delhi Region Performance Dashboard';
        default: return 'Start Recycling in Delhi';
      }
    }

    if (location.toLowerCase().includes('mumbai')) {
      switch (role) {
        case 'user': return 'Mumbai Clean City Challenge - Double rewards!';
        case 'vendor': return 'Mumbai Rush Active - High demand area!';
        case 'admin': return 'Mumbai Growth Analytics Available';
        default: return 'Start Recycling in Mumbai';
      }
    }

    // Default CTAs
    switch (role) {
      case 'user': return 'Start Recycling Now';
      case 'vendor': return 'Accept Pickup Requests';
      case 'admin': return 'View System Analytics';
      default: return 'Get Started';
    }
  };

  if (role === 'user') {
    return {
      header: "Welcome back, Eco-Warrior! 🌱",
      dashboardComponent: "DashboardUser",
      widgets: [
        { type: "coinBalance", position: "top" },
        { type: "vendorMap", position: "middle" },
        { type: "schedulePickup", position: "bottom" },
        ...(preferences.donations ? [{ type: "donationStore", position: "bottom" }] : []),
        ...(preferences.ecoRewards ? [{ type: "rewardsStore", position: "bottom" }] : [])
      ],
      cta: getLocationCTA('user', location)
    };
  }

  if (role === 'vendor') {
    return {
      header: "Welcome back, EcoVendor! 🚛",
      dashboardComponent: "DashboardVendor",
      widgets: [
        { type: "pickupRequests", position: "top" },
        { type: "earningSummary", position: "top" },
        { type: "liveUserMap", position: "middle" },
        { type: "assistantManagement", position: "bottom" }
      ],
      cta: getLocationCTA('vendor', location)
    };
  }

  if (role === 'admin') {
    return {
      header: "Admin Dashboard 👑",
      dashboardComponent: "DashboardAdmin",
      widgets: [
        { type: "userVendorStats", position: "top" },
        { type: "coinsDistributed", position: "top" },
        { type: "impactStats", position: "middle" },
        { type: "vendorManagement", position: "middle" },
        { type: "rewardStoreManagement", position: "bottom" }
      ],
      cta: getLocationCTA('admin', location)
    };
  }

  // Fallback for unknown roles
  return {
    header: "Welcome to GreenRecycle! 🌍",
    dashboardComponent: "DashboardUser",
    widgets: [
      { type: "coinBalance", position: "top" },
      { type: "vendorMap", position: "middle" },
      { type: "schedulePickup", position: "bottom" }
    ],
    cta: "Start Recycling Now"
  };
}

// Export the orchestrator function for external use
export const uiOrchestrator = {
  generateConfig: generateUIConfig
};
