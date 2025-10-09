import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { UserCheck, UserX } from 'lucide-react';
import { api } from "../../../services/Api";

interface ProvidersSectionProps {
    setAlertMessage: (msg: string) => void;
    setShowAlert: (show: boolean) => void;
    setAlertType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
}

interface Providers {
    idProvider: number;
    name: string;
    cnpjProvider: string;
    phone: string;
    email: string;
    password: string;
    photoUrl?: string;
    biography?: string;
    status: string;
    linkedin?: string;
    instagram?: string;
    validatedEmail?: boolean;
    emailValidationToken?: string;
    savedLogin?: boolean;
}

export function ProvidersSection({ setAlertMessage, setShowAlert, setAlertType }: ProvidersSectionProps) {
    const [providers, setProviders] = useState<Providers[]>([]);

    const getProviders = async () => {
        await api.get("providers")
        .then((response) => {
            setProviders(response.data);
        })
        .catch((error) => {
            setAlertMessage("Erro ao buscar prestadores!");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            console.log(error);
        })
    }

    useEffect(() => {
        getProviders();
    }, [])
    
    const toggleProviderStatus = (idProvider: number, status: boolean) => {
        setAlertMessage(`Prestador ${status ? 'ativado' : 'desativado'} com sucesso!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gerenciar Prestadores</CardTitle>

                <CardDescription>
                    Ative ou desative prestadores na plataforma
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {providers.length > 0 ? (
                        providers.map((provider) => (
                            <div key={provider.idProvider} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium">{provider.name}</h4>
                                    <p className="text-sm text-gray-600">{provider.email}</p>

                                    <div className="flex items-center space-x-2 mt-2">
                                        <Badge className={provider.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                            {provider.status ? 'Ativo' : 'Inativo'}
                                        </Badge>

                                        <Badge className={provider.savedLogin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                                            {provider.savedLogin ? 'Online' : 'Offline'}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        size="sm"
                                        variant={provider.status ? "destructive" : "default"}
                                        onClick={() => toggleProviderStatus(provider.idProvider, !provider.status)}
                                        className="cursor-pointer"
                                    >
                                        {provider.status ? (
                                            <>
                                                <UserX className="h-4 w-4 mr-1" />
                                                Desativar
                                            </>
                                        ) : (
                                            <>
                                                <UserCheck className="h-4 w-4 mr-1" />
                                                Ativar
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))
                    ): (
                        <div>
                            <p className="text-s text-gray-500">Nenhum prestador cadastrado</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};