import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardExpert from "./pages/DashboardExpert";
import DashboardNormal from "./pages/DashboardNormal";
import Ask from "./pages/Ask";
import Interact from "./pages/Interact";
import Draft from "./pages/Draft";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/expert" element={<ProtectedRoute><DashboardExpert /></ProtectedRoute>} />
            <Route path="/dashboard/normal" element={<ProtectedRoute><DashboardNormal /></ProtectedRoute>} />
            <Route path="/dashboard/ask" element={<ProtectedRoute><Ask /></ProtectedRoute>} />
            <Route path="/dashboard/interact" element={<ProtectedRoute><Interact /></ProtectedRoute>} />
            <Route path="/dashboard/draft" element={<ProtectedRoute><Draft /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
