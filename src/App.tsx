import React, { useState } from "react";
import {
  Home,
  BarChart3,
  Coins,
  Link,
  TrendingUp,
  Users,
  LogOut,
  Search,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { cn } from "./components/ui/utils";
import { useAuth } from "./contexts/AuthContext";
import SignInWithGoogle from "./components/auth/SignInWithGoogle";

// Import page components
import HomePage from "./components/HomePage";
import DashboardPage from "./components/EnhancedDashboardPage";
import TokensPage from "./components/TokensPage";
import BlockchainPage from "./components/BlockchainPage";
import AnalyticsPage from "./components/EnhancedAnalyticsPage";
import AboutPage from "./components/AboutPage";

const navigation = [
  { name: "Home", icon: Home, id: "home" },
  {
    name: "Dashboard",
    icon: BarChart3,
    id: "dashboard",
    protected: true,
  },
  {
    name: "Tokens",
    icon: Coins,
    id: "tokens",
    protected: true,
  },
  {
    name: "Blockchain",
    icon: Link,
    id: "blockchain",
    protected: true,
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    id: "analytics",
    protected: true,
  },
  { name: "About", icon: Users, id: "about" },
];

// Search data for comprehensive search functionality
const searchData = [
  {
    id: "home",
    type: "page",
    title: "Home",
    keywords: ["home", "landing", "main", "start"],
  },
  {
    id: "dashboard",
    type: "page",
    title: "Dashboard",
    keywords: [
      "dashboard",
      "overview",
      "summary",
      "production",
      "energy",
      "forecast",
      "weather",
      "charts",
      "graphs",
      "anomaly",
      "detection",
    ],
  },
  {
    id: "tokens",
    type: "page",
    title: "Tokens & Trading",
    keywords: [
      "tokens",
      "trading",
      "slr",
      "balance",
      "buy",
      "sell",
      "transactions",
      "history",
      "market",
      "pairs",
      "portfolio",
    ],
  },
  {
    id: "blockchain",
    type: "page",
    title: "Blockchain",
    keywords: [
      "blockchain",
      "wallet",
      "network",
      "polygon",
      "ethereum",
      "connect",
      "metamask",
      "web3",
      "crypto",
      "settlement",
    ],
  },
  {
    id: "analytics",
    type: "page",
    title: "Analytics",
    keywords: [
      "analytics",
      "insights",
      "leaderboard",
      "community",
      "efficiency",
      "trends",
      "performance",
      "carbon",
      "impact",
      "forecast",
      "accuracy",
    ],
  },
  {
    id: "about",
    type: "page",
    title: "About",
    keywords: [
      "about",
      "team",
      "members",
      "project",
      "info",
      "contact",
      "developers",
    ],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  
  // Use Firebase Auth
  const { currentUser, balance, signOut } = useAuth();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const toggleSearchOverlay = () => {
    setShowSearchOverlay(!showSearchOverlay);
    if (!showSearchOverlay) {
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const closeSearchOverlay = () => {
    setShowSearchOverlay(false);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const getFilteredSearchResults = () => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return searchData
      .filter((item) => {
        // Check if user has access to protected pages
        const navItem = navigation.find((nav) => nav.id === item.id);
        if (navItem?.protected && !currentUser) return false;

        // Search in title and keywords
        return (
          item.title.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.includes(query))
        );
      })
      .slice(0, 5); // Limit to 5 results
  };

  const handleSearchNavigation = (pageId: string) => {
    handleNavigation(pageId);
    closeSearchOverlay();
  };

  const handleGetStarted = () => {
    if (currentUser) {
      setCurrentPage("dashboard");
    }
    // If not logged in, the user will see the SignInWithGoogle button on home page
  };

  const handleNavigation = (pageId: string) => {
    const navItem = navigation.find((item) => item.id === pageId);
    if (navItem?.protected && !currentUser) {
      // Stay on current page, user needs to sign in first
      return;
    }
    setCurrentPage(pageId);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentPage("home");
      setShowLogoutDialog(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderPage = () => {
    // Create a compatible user object for existing components
    const compatibleUser = currentUser ? {
      name: currentUser.displayName || 'User',
      email: currentUser.email,
      avatar: currentUser.displayName?.charAt(0) || 'U',
      totalTokens: balance,
      uid: currentUser.uid
    } : null;

    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onGetStarted={handleGetStarted}
            user={compatibleUser}
            onNavigateToAnalytics={() => setCurrentPage("analytics")}
            onNavigateToTokens={() => setCurrentPage("tokens")}
          />
        );
      case "dashboard":
        return <DashboardPage user={compatibleUser} />;
      case "tokens":
        return <TokensPage user={compatibleUser} />;
      case "blockchain":
        return <BlockchainPage user={compatibleUser} />;
      case "analytics":
        return <AnalyticsPage user={compatibleUser} />;
      case "about":
        return <AboutPage />;
      default:
        return (
          <HomePage
            onGetStarted={handleGetStarted}
            user={compatibleUser}
            onNavigateToAnalytics={() => setCurrentPage("analytics")}
            onNavigateToTokens={() => setCurrentPage("tokens")}
          />
        );
    }
  };

  // Filter navigation items based on auth state
  const visibleNavigation = navigation.filter(
    (item) => !item.protected || currentUser
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD43B] to-[#FFA500] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">⚡</span>
              </div>
              <div>
                <h1 className="text-lg text-gray-900">Ojas Coin</h1>
                <p className="text-xs text-gray-600">Solar Energy Trading</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200",
                      currentPage === item.id
                        ? "bg-[#FFD43B] text-gray-900 shadow-lg hover:bg-[#FFD43B]/90"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </Button>
                );
              })}

              {/* Search Button */}
              <Button
                variant="ghost"
                onClick={toggleSearchOverlay}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* User Info & Auth */}
              {currentUser ? (
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'User'}
                        className="w-8 h-8 rounded-xl border-2 border-[#FFD43B]"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm">
                          {currentUser.displayName?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="text-sm">
                      <p className="text-gray-900">
                        {currentUser.displayName || 'User'}
                      </p>
                      <p className="text-gray-500">{balance} SLR</p>
                    </div>
                  </div>
                  <AlertDialog
                    open={showLogoutDialog}
                    onOpenChange={setShowLogoutDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 p-2"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to logout?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be redirected to the home page and will need
                          to sign in again to access your dashboard.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLogout}
                          className="bg-[#FFD43B] hover:bg-[#FFD43B]/90 text-gray-900 rounded-xl"
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="ml-4">
                  <SignInWithGoogle />
                </div>
              )}
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" className="text-gray-600">
                <BarChart3 className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {showSearchOverlay && (
          <div className="fixed inset-0 z-60 bg-black/20 backdrop-blur-sm">
            <div className="pt-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search pages, features..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        closeSearchOverlay();
                      }
                    }}
                    autoFocus
                    className="pl-12 pr-12 py-4 text-lg rounded-2xl border-gray-200 focus:border-[#FFD43B] focus:ring-[#FFD43B] shadow-xl bg-white"
                  />
                  <Button
                    variant="ghost"
                    onClick={closeSearchOverlay}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </Button>
                </div>

                {/* Search Results */}
                {showSearchResults && getFilteredSearchResults().length > 0 && (
                  <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    {getFilteredSearchResults().map((item) => {
                      const navItem = navigation.find((nav) => nav.id === item.id);
                      const Icon = navItem?.icon || Home;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSearchNavigation(item.id)}
                          className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="p-3 bg-gradient-to-br from-[#FFD43B]/20 to-[#34A853]/20 rounded-xl">
                            <Icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <div className="flex-1">
                            <p className="text-base font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.keywords.slice(0, 3).join(", ")}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {searchQuery && getFilteredSearchResults().length === 0 && (
                  <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center">
                    <p className="text-gray-500">
                      No results found for "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex space-x-1 overflow-x-auto">
              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-xl whitespace-nowrap",
                      currentPage === item.id
                        ? "bg-[#FFD43B] text-gray-900"
                        : "text-gray-600"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show sign-in prompt for protected pages when not authenticated */}
        {!currentUser && navigation.find(nav => nav.id === currentPage)?.protected ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-8">
                Please sign in with your Google account to access this page.
              </p>
              <SignInWithGoogle />
            </div>
          </div>
        ) : (
          renderPage()
        )}
      </main>
    </div>
  );
}