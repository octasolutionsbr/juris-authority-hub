import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Areas from "./pages/Areas";
import AreaDetail from "./pages/AreaDetail";
import Team from "./pages/Team";
import LawyerProfile from "./pages/LawyerProfile";
import Opportunities from "./pages/Opportunities";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import AdminListings from "./pages/admin/Listings";
import AdminUsers from "./pages/admin/Users";
import AdminHearings from "./pages/admin/Hearings";
import AdminTeamMembers from "./pages/admin/TeamMembers";
import HearingPublic from "./pages/HearingPublic";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/areas/:areaId" element={<AreaDetail />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/equipe/:lawyerId" element={<LawyerProfile />} />
            <Route path="/oportunidades" element={<Opportunities />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/audiencia/:token" element={<HearingPublic />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
            <Route path="/admin/listings" element={<ProtectedRoute><AdminListings /></ProtectedRoute>} />
            <Route path="/admin/hearings" element={<ProtectedRoute><AdminHearings /></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute requireAdmin><AdminTeamMembers /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
