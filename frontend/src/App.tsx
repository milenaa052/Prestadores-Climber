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
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterForm />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              !isAuthenticated ? ( <Navigate to="/login" />) 
              : user?.type === "provider" ? ( <ProviderDashboard /> ) 
              : user?.type === "client" ? ( <ClientDashboard />) 
              : user?.type === "admin" ? ( <AdminDashboard /> ) 
              : ( <div>Tipo de usuário inválido</div> )
            }
          />

          {/* Services and providers (for customers only) */}
          <Route
            path="/services"
            element={user?.type === "client" ? <ServiceSelection /> : <Navigate to="/dashboard" />}
          />
          
          <Route
            path="/providers/:serviceId"
            element={user?.type === "client" ? <ProviderList /> : <Navigate to="/dashboard" />}
          />
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