import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { AddressForm } from './AddressForm';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radioGroup';
import { RegisterFormData } from '../../types';
import { ContractorForm } from './ContractorForm';
import { ProviderForm } from './ProviderForm';
import axios from 'axios';
import { cnpj, cpf } from "cpf-cnpj-validator"

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

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('Todos os campos são obrigatórios!');
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (formData.type === 'client' && !formData.cpf) {
      setError('CPF é obrigatório');
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!cpf.isValid(formData.cpf)) {
      setError("CPF inválido ou inexistente");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (formData.type === 'provider' && !formData.cnpj) {
      setError('CNPJ é obrigatório');
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!cnpj.isValid(formData.cnpj)) {
      setError("CNPJ inválido ou inexistente");
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
      setError("Todos os campos são obrigatórios!");
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

      const addressResponse = await axios.post("http://localhost:3000/api/address-registration", payload);
      const addressId = addressResponse.data.idAddress;

      let userResponse;

      if (formData.type === 'client') {
        const contractorPayload = {
          addressId: addressId,
          name: formData.name,
          cpfContractor: formData.cpf,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          photUrl: '',
          validatedEmail: false,
          emailValidationToken: '',
          savedLogin: false
        };
        
        userResponse = await axios.post("http://localhost:3000/api/contractor-registration", contractorPayload);

      } else {
        const providerPayload = {
          addressId: addressId,
          name: formData.name,
          cnpjProvider: formData.cnpj,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          photUrl: '',
          biography: '',
          linkedin: '',
          instagram: '',
          validatedEmail: false,
          emailValidationToken: '',
          savedLogin: false
        };
        
        userResponse = await axios.post("http://localhost:3000/api/provider-registration", providerPayload);
      };

      const authSuccess = await register({ 
        ...formData, 
        active: true 
      });

      if (authSuccess) {
        navigate("/login");
      } else {
        setError("Erro ao criar conta!");
        setTimeout(() => setError(""), 3000);
      }

    } catch (error) {
      setError("Erro ao realizar cadastro. Tente novamente.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
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
                />
              )}

              {formData.type === 'client' && (
                <ContractorForm 
                  formData={formData}
                  setFormData={setFormData}
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