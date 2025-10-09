export interface AddressData {
    street: string;
    uf: string;
    city: string;
    neighborhood: string;
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
            uf: data.uf || '',
            city: data.localidade || '',
            neighborhood: data.bairro || '',
            complement: data.complemento || '',
        };
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
}