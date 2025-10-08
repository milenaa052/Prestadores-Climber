import React, { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import InputMask from 'react-input-mask';
import { RegisterFormData } from '../../types';

export interface ContractorFormData {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
}

interface ContractorFormProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  onBack: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  setError: (msg: string) => void;
}

export const ContractorForm: React.FC<ContractorFormProps> = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  isLoading,
  setError
}) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                    id="name" 
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Seu nome completo" 
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="text" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="seu@email.com" 
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <InputMask
                    mask="999.999.999-99"
                    value={formData.cpf}
                    onChange={handleChange}
                    >
                    {(inputProps) => <Input {...inputProps} id="cpf" type="text" required placeholder="999.999.999-99" />}
                </InputMask>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <InputMask
                    mask="(99) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    >
                    {(inputProps) => <Input {...inputProps} id="phone" type="text" required placeholder="(99) 99999-9999" />}
                </InputMask>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                    id="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Senha" 
                />
            </div>
        </form>
    );
};