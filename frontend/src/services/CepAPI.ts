export interface AddressData {
  street: string;
  city: string;
  uf: string;
  complement: string;
}

export async function getAddressByCep(cep: string): Promise<AddressData | null> {
  
    const cepNumbers = cep.replace(/\D/g, '');
    if (cepNumbers.length !== 8) return null;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`);
        const data = await response.json();

        if (data.erro) return null;

        return {
            street: data.logradouro || '',
            city: data.localidade || '',
            uf: data.uf || '',
            complement: data.complemento || '',
        };
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
}