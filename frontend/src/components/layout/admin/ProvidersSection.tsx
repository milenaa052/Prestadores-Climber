import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { mockProviders } from "../../../data/mockData";
import { UserCheck, UserX } from 'lucide-react';

interface ProvidersSectionProps {
    setAlertMessage: (msg: string) => void;
    setShowAlert: (show: boolean) => void;
}

export function ProvidersSection({ setAlertMessage, setShowAlert }: ProvidersSectionProps) {
    const toggleProviderStatus = (providerId: string, active: boolean) => {
        setAlertMessage(`Prestador ${active ? 'ativado' : 'desativado'} com sucesso!`);
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
                    {mockProviders.map((provider) => (
                        <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium">{provider.name}</h4>
                                <p className="text-sm text-gray-600">{provider.email}</p>

                                <div className="flex items-center space-x-2 mt-2">
                                    <Badge className={provider.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {provider.active ? 'Ativo' : 'Inativo'}
                                    </Badge>

                                    <Badge className={provider.online ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                                        {provider.online ? 'Online' : 'Offline'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    variant={provider.active ? "destructive" : "default"}
                                    onClick={() => toggleProviderStatus(provider.id, !provider.active)}
                                    className="cursor-pointer"
                                >
                                    {provider.active ? (
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
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};