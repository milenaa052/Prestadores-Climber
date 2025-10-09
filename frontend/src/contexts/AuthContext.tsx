import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/Api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'contractor' | 'provider';
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  type: 'client' | 'provider';
  cpf?: string;
  cnpj?: string;
  phone: string;
  password: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<boolean>;
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

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (!userData.name || !userData.email || !userData.password || !userData.phone) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Email inválido');
      }

      if (userData.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (userData.type === 'client' && (!userData.cpf || userData.cpf.length === 0)) {
        throw new Error('CPF é obrigatório para contratantes');
      }

      if (userData.type === 'provider' && (!userData.cnpj || userData.cnpj.length === 0)) {
        throw new Error('CNPJ é obrigatório para prestadores');
      }
      
      return true;
      
    } catch (error: unknown) {
      console.error('Register validation error:', error);
      
      let errorMessage = 'Erro ao validar dados do cadastro';
      
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
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
    register,
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