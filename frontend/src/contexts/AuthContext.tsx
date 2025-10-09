import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/Api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'contractor' | 'provider';
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('climber_user');
    const token = localStorage.getItem('climber_token');
    
    if (savedUser && token) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        validateToken();
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:');
        localStorage.removeItem('climber_user');
        localStorage.removeItem('climber_token');
      }
    }
    setIsLoading(false);
  }, []);

  const validateToken = async () => {
    try {
      await api.get('/user');
    } catch (error) {
      console.error('Falha na validação do token');
      logout();
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await api.post('/login', { email, password });

      const { id, name, email: userEmail, role, token } = response.data;
      
      const userData: User = {
        id,
        name,
        email: userEmail,
        role,
        token
      };

      setUser(userData);
      localStorage.setItem('climber_user', JSON.stringify(userData));
      localStorage.setItem('climber_token', token);
      
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
      
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const apiError = error as { response?: { data?: { error?: string } } };
        if (apiError.response?.data?.error) {
          errorMessage = apiError.response.data.error;
        }
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('climber_user');
    localStorage.removeItem('climber_token');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}