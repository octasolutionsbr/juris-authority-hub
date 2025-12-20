import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Component to handle /admin redirect
const AdminRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }
  
  return <Navigate to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} replace />;
};

// Eager load only the Index page for fast initial load
import Index from "./pages/Index";

// Lazy load all other pages
const AreaDetail = lazy(() => import("./pages/AreaDetail"));
const Team = lazy(() => import("./pages/Team"));
const LawyerProfile = lazy(() => import("./pages/LawyerProfile"));
const Opportunities = lazy(() => import("./pages/Opportunities"));
const OpportunityDetail = lazy(() => import("./pages/OpportunityDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HearingPublic = lazy(() => import("./pages/HearingPublic"));

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProfile = lazy(() => import("./pages/admin/Profile"));
const AdminListings = lazy(() => import("./pages/admin/Listings"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminHearings = lazy(() => import("./pages/admin/Hearings"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Carregando...</div>
  </div>
);

// Configure QueryClient with optimized caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              
              <Route path="/areas/:areaId" element={<AreaDetail />} />
              <Route path="/equipe" element={<Team />} />
              <Route path="/equipe/:lawyerId" element={<LawyerProfile />} />
              <Route path="/oportunidades" element={<Opportunities />} />
              <Route path="/oportunidades/:id" element={<OpportunityDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/audiencia/:token" element={<HearingPublic />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRedirect />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/reset-password" element={<AdminResetPassword />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
              <Route path="/admin/listings" element={<ProtectedRoute><AdminListings /></ProtectedRoute>} />
              <Route path="/admin/hearings" element={<ProtectedRoute><AdminHearings /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;