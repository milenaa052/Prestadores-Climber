import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { User } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export function Header({ onNavigate, currentView }: HeaderProps) {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold text-gray-900 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              Prestadores Climber
            </h1>
            
            {isAuthenticated && (
              <nav className="flex space-x-4">

                {user?.type === 'client' && (
                  <Button
                    variant={currentView === 'services' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('services')}
                    className="cursor-pointer"
                  >
                    Serviços
                  </Button>
                )}
                
                <Button
                  variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('dashboard')}
                  className="cursor-pointer"
                >
                  Dashboard
                </Button>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {user?.type === 'provider' ? 'Prestador' : 
                     user?.type === 'client' ? 'Contratante' : 'Admin'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                  className="cursor-pointer"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => onNavigate('register')}
                  className="cursor-pointer"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};