
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreatorsBrowse from "./pages/CreatorsBrowse";
import CreatorProfile from "./pages/CreatorProfile";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import PortfolioSetup from "./pages/PortfolioSetup";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import PostProject from "./pages/PostProject";
import Projects from "./pages/Projects";
import GetStarted from "./pages/GetStarted";
import Subscription from "./pages/Subscription";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Payment from "./pages/Payment";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/creators" element={<CreatorsBrowse />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/portfolio-setup" element={<PortfolioSetup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/post-project" element={<PostProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
