import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/home/HomePage';
import { LoginForm } from './pages/auth/LoginForm';
import { RegisterForm } from './pages/auth/RegisterForm';
import { ServiceSelection } from './pages/ServiceSelection';
import { ProviderList } from './pages/ProviderList';
import { ProviderDashboard } from './pages/dashboard/ProviderDashboard';
import { ClientDashboard } from './pages/dashboard/ClientDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { Button } from "./components/ui/button";

function AppContent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterForm />} 
          />

          {/* Private Routes - Redirecionamento baseado no role */}
          <Route
            path="/dashboard"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" />
              ) : user?.role === "provider" ? (
                <ProviderDashboard />
              ) : user?.role === "contractor" ? (
                <ClientDashboard />
              ) : user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg text-red-600">Tipo de usuário inválido</p>
                    <Button onClick={() => useAuth().logout()} className="mt-4">
                      Sair
                    </Button>
                  </div>
                </div>
              )
            }
          />

          {/* Services and providers (for contractors only) */}
          <Route
            path="/services"
            element={user?.role === "contractor" ? <ServiceSelection /> : <Navigate to="/dashboard" />}
          />
          
          <Route
            path="/providers/:serviceId"
            element={user?.role === "contractor" ? <ProviderList /> : <Navigate to="/dashboard" />}
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
    
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}