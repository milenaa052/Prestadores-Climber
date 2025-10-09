import React, { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import InputMask from 'react-input-mask';
import { getAddressByCep } from '../../services/CepAPI';
import { RegisterFormData } from '../../types';

export interface AddressFormData {
  cep: string;
  street: string;
  number: string;
  city: string;
  uf: string;
  complement: string;
}

interface AddressFormProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  onBack: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  setError: (msg: string) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  isLoading,
  setError
}) => {

    useEffect(() => {
        const fetchAddress = async () => {
            if (formData.cep.replace(/\D/g, '').length === 8) {
            const address = await getAddressByCep(formData.cep);
            if (address) {
                setFormData(prev => ({
                    ...prev,
                    street: address.street,
                    uf: address.uf,
                    city: address.city,
                    neighborhood: address.neighborhood,
                    complement: address.complement,
                }));

                setError('');
            } else {
                setError('CEP não encontrado');
            }
            }
        };
        fetchAddress();
    }, [formData.cep, setFormData, setError]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <InputMask
          mask="99999-999"
          value={formData.cep}
          onChange={handleChange}
        >
          {(inputProps) => <Input {...inputProps} id="cep" type="text" required placeholder="CEP" />}
        </InputMask>
      </div>

      <div className="space-y-2">
        <Label htmlFor="uf">UF</Label>
        <Input 
            id="uf" 
            type="text" 
            value={formData.uf} 
            onChange={handleChange} 
            required 
            placeholder="UF" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Cidade</Label>
        <Input 
            id="city" 
            type="text" 
            value={formData.city} 
            onChange={handleChange} 
            required 
            placeholder="Cidade"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro</Label>
        <Input 
            id="neighborhood" 
            type="text" 
            value={formData.neighborhood} 
            onChange={handleChange} 
            required 
            placeholder="Bairro" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Rua</Label>
        <Input 
            id="street" 
            type="text" 
            value={formData.street} 
            onChange={handleChange} 
            required 
            placeholder="Rua" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="number">Número</Label>
        <Input 
            id="number" 
            type="text" 
            value={formData.number} 
            onChange={handleChange} 
            required 
            placeholder="Número" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="complement">Complemento</Label>
        <Input 
            id="complement" 
            type="text" 
            value={formData.complement} 
            onChange={handleChange} 
            placeholder="Complemento" 
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" className="cursor-pointer" onClick={onBack}>Voltar</Button>

        <Button type="submit" disabled={isLoading} className="cursor-pointer">
          {isLoading ? 'Criando conta...' : 'Criar Conta'}
        </Button>
      </div>
    </form>
  );
};