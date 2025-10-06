import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { AddressForm, AddressFormData } from './AddressForm';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radioGroup';
import InputMask from 'react-input-mask';
import { RegisterFormData } from '../../types';

export function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    type: 'client',
    cpf: '',
    cnpj: '',
    phone: '',
    password: '',
    cep: '',
    street: '',
    number: '',
    city: '',
    uf: '',
    complement: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.type === 'client' && !formData.cpf) {
      setError('CPF é obrigatório');
      return;
    }

    if (formData.type === 'provider' && !formData.cnpj) {
      setError('CNPJ é obrigatório');
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.cep || !formData.street || !formData.number || !formData.city || !formData.uf) {
      setError('Preencha todos os campos de endereço');
      setIsLoading(false);
      return;
    }

    const success = await register({ ...formData, active: true });

    if (success) {
      navigate("/login");
    } else {
      setError('Email já cadastrado');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Cadastre-se no Prestadores Climber</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}

          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              {formData.type === 'provider' && (
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={formData.cnpj}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, cnpj: e.target.value })}
                  >
                    {(inputProps: any) => <Input {...inputProps} id="cnpj" type="text" required placeholder="CNPJ" />}
                  </InputMask>
                </div>
              )}

              {formData.type === 'client' && (
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <InputMask
                    mask="999.999.999-99"
                    value={formData.cpf}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, cpf: e.target.value })}
                  >
                    {(inputProps: any) => <Input {...inputProps} id="cpf" type="text" required placeholder="CPF" />}
                  </InputMask>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                >
                  {(inputProps: any) => <Input {...inputProps} id="phone" type="tel" required placeholder="(99) 99999-9999" />}
                </InputMask>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Senha"
                />
              </div>

              <div className="space-y-3">
                <Label>Tipo de conta</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as 'provider' | 'client' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client">Contratante</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="provider" id="provider" />
                    <Label htmlFor="provider">Prestador de Serviços</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Próximo
              </Button>
            </form>
          )}

          {step === 2 && (
            <AddressForm
              formData={formData}
              setFormData={setFormData}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              setError={setError}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}