import { useState } from 'react';
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
  const [currentView, setCurrentView] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    if (view !== 'providers') {
      setSelectedServiceId(null);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('providers');
  };

  const handleBackToServices = () => {
    setSelectedServiceId(null);
    setCurrentView('services');
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.type) {
      case 'provider':
        return <ProviderDashboard />;
      case 'client':
        return <ClientDashboard onNavigate={handleNavigation} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Tipo de usuário não reconhecido</div>;
    }
  };

  const renderContent = () => {
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

    if (!isAuthenticated) {
      switch (currentView) {
        case 'login':
          return <LoginForm onNavigate={handleNavigation} />;
        case 'register':
          return <RegisterForm onNavigate={handleNavigation} />;
        default:
          return <HomePage onNavigate={handleNavigation} />;
      }
    }

    switch (currentView) {
      case 'services':
        if (user?.type === 'client') {
          return <ServiceSelection onServiceSelect={handleServiceSelect} />;
        }
        break;
      case 'providers':
        if (user?.type === 'client' && selectedServiceId) {
          return (
            <ProviderList 
              serviceId={selectedServiceId} 
              onBack={handleBackToServices}
            />
          );
        }
        break;
      case 'dashboard':
        return renderDashboard();
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }

    return <HomePage onNavigate={handleNavigation} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigation} currentView={currentView} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};