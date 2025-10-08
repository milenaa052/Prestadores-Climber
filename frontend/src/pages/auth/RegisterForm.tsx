import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { AddressForm, AddressFormData } from './AddressForm';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radioGroup';
import { RegisterFormData } from '../../types';
import { ContractorForm } from './ContractorForm';
import { ProviderForm } from './ProviderForm';
import axios from 'axios';

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
    uf: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
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
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (formData.type === 'client' && !formData.cpf) {
      setError('CPF é obrigatório');
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (formData.type === 'provider' && !formData.cnpj) {
      setError('CNPJ é obrigatório');
      setTimeout(() => setError(""), 3000);
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
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        cep: formData.cep,
        state: formData.uf,
        city: formData.city,
        neighborhood: formData.neighborhood,
        street: formData.street,
        number: formData.number,
        complement: formData.complement
      }

      await axios.post("http://localhost:3000/api/address-registration", payload)
      navigate("/login");

    } catch (error) {
      setError("Erro ao cadastrar o endereço");
      setTimeout(() => setError(""), 3000);
    }

    const success = await register({ ...formData, active: true });

    if (success) {
      navigate("/login");
    } else {
      setError('Email já cadastrado');
      setTimeout(() => setError(""), 3000);
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

              {formData.type === 'provider' && (
                <ProviderForm 
                  formData={formData}
                  setFormData={setFormData}
                  onBack={() => setStep(1)}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  setError={setError}
                />
              )}

              {formData.type === 'client' && (
                <ContractorForm 
                  formData={formData}
                  setFormData={setFormData}
                  onBack={() => setStep(1)}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  setError={setError}
                />
              )}

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