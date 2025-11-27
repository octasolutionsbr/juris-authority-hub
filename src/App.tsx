import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Areas from "./pages/Areas";
import AreaDetail from "./pages/AreaDetail";
import Team from "./pages/Team";
import LawyerProfile from "./pages/LawyerProfile";
import Opportunities from "./pages/Opportunities";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
