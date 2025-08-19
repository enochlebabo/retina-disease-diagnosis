
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import AuthCallback from "./pages/AuthCallback";
import { Navigate } from "react-router-dom";
import VisionAI from "./pages/VisionAI";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ClinicianLayout from "./layouts/ClinicianLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminPatients from "./pages/admin/Patients";
import AdminResults from "./pages/admin/Results";
import AdminSettings from "./pages/admin/Settings";
import ModelTraining from "./pages/admin/ModelTraining";
import UserDashboard from "./pages/user/UserDashboard";
import Analysis from "./pages/user/Analysis";
import Education from "./pages/user/Education";
import UserProfile from "./pages/user/UserProfile";
import ClinicianDashboard from "./pages/clinician/Dashboard";
import DiagnosisCenter from "./pages/clinician/DiagnosisCenter";
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
              <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/register" element={<Navigate to="/auth" replace />} />
              <Route path="/vision-ai" element={<VisionAI />} />
              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <AuthGuard requiredRole="admin">
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="patients" element={<AdminPatients />} />
                      <Route path="results" element={<AdminResults />} />
                      <Route path="model-training" element={<ModelTraining />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </AdminLayout>
                </AuthGuard>
              } />

              {/* Clinician Routes */}
              <Route path="/clinician/*" element={
                <AuthGuard requiredRole="clinician">
                  <ClinicianLayout>
                    <Routes>
                      <Route path="dashboard" element={<ClinicianDashboard />} />
                      <Route path="diagnosis" element={<DiagnosisCenter />} />
                      <Route path="patients" element={<AdminPatients />} />
                      <Route path="reports" element={<AdminResults />} />
                      <Route path="appointments" element={<Dashboard />} />
                      <Route path="research" element={<Education />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="*" element={<ClinicianDashboard />} />
                    </Routes>
                  </ClinicianLayout>
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
