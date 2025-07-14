
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminPatients from "./pages/admin/Patients";
import AdminResults from "./pages/admin/Results";
import AdminSettings from "./pages/admin/Settings";
import UserDashboard from "./pages/user/UserDashboard";
import Analysis from "./pages/user/Analysis";
import Education from "./pages/user/Education";
import UserProfile from "./pages/user/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <AuthGuard requiredRole="admin">
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="patients" element={<AdminPatients />} />
                      <Route path="results" element={<AdminResults />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </AdminLayout>
                </AuthGuard>
              } />
              
              {/* User Routes */}
              <Route path="/dashboard" element={
                <AuthGuard requiredRole="user">
                  <UserLayout>
                    <UserDashboard />
                  </UserLayout>
                </AuthGuard>
              } />
              <Route path="/analysis" element={
                <AuthGuard requiredRole="user">
                  <UserLayout>
                    <Analysis />
                  </UserLayout>
                </AuthGuard>
              } />
              <Route path="/education" element={
                <AuthGuard requiredRole="user">
                  <UserLayout>
                    <Education />
                  </UserLayout>
                </AuthGuard>
              } />
              <Route path="/profile" element={
                <AuthGuard requiredRole="user">
                  <UserLayout>
                    <UserProfile />
                  </UserLayout>
                </AuthGuard>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
