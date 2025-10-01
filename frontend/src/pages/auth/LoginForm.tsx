import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, AlertDescription } from '../../components/ui/alert';

interface LoginFormProps {
  onNavigate: (view: string) => void;
}

export function LoginForm({ onNavigate }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      onNavigate('dashboard');
    } else {
      setError('Email ou senha inválidos');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Faça login para acessar sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Insira a sua senha"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full cursor-pointer mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-blue-600 hover:text-black cursor-pointer"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600 mb-2">Contas de teste:</p>
            <div className="text-xs space-y-1">
              <p><strong>Prestador:</strong> joao@provider.com</p>
              <p><strong>Cliente:</strong> maria@client.com</p>
              <p><strong>Admin:</strong> admin@climber.com</p>
              <p className="text-gray-500">Senha: qualquer</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}