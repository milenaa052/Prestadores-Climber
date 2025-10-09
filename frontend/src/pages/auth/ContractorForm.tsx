import React from 'react';
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
}

interface InputMaskProps {
  id?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContractorForm: React.FC<ContractorFormProps> = ({
  formData,
  setFormData
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                    id="name" 
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Seu nome completo" 
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="seu@email.com" 
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <InputMask
                    mask="999.999.999-99"
                    value={formData.cpf}
                    onChange={handleCpfChange}
                >
                    {(inputProps: InputMaskProps) => (
                        <Input 
                            {...inputProps} 
                            id="cpf" 
                            type="text" 
                            placeholder="999.999.999-99" 
                        />
                    )}
                </InputMask>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <InputMask
                    mask="(99) 99999-9999"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                >
                    {(inputProps: InputMaskProps) => (
                        <Input 
                            {...inputProps} 
                            id="phone" 
                            type="text" 
                            placeholder="(99) 99999-9999" 
                        />
                    )}
                </InputMask>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                    id="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Sua senha" 
                />
                <p className="text-xs text-gray-500">A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais</p>
            </div>
        </div>
    );
};