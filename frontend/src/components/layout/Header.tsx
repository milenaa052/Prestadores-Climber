import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from "../ui/avatar";
import { User } from "lucide-react";

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold text-gray-900 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Prestadores Climber
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <nav className="flex">

                {user?.type === 'client' && (
                  <Button
                    variant={location.pathname === "/services" ? "default" : "ghost"}
                    onClick={() => navigate("/services")}
                    className="cursor-pointer"
                  >
                    Serviços
                  </Button>
                )}
                
                <Button
                  variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer"
                >
                  Dashboard
                </Button>
              </nav>
            )}

            {isAuthenticated ? (
              <Avatar onClick={() => navigate("/dashboard")} className="cursor-pointer">
                <User className="w-5 h-5 text-gray-700" />
              </Avatar>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="cursor-pointer"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => navigate("/register")}
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