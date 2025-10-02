import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Star } from "lucide-react";
import { Badge } from "../../ui/badge";

export function Requests() {
    const navigate = useNavigate();

    const serviceRequests = [
        {
            id: '1',
            service: 'Limpeza Residencial',
            provider: 'João Silva',
            date: '2024-01-20',
            status: 'completed',
            canRate: true,
        },
        {
            id: '2',
            service: 'Pintura',
            provider: 'João Silva',
            date: '2024-01-25',
            status: 'pending',
            canRate: false,
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
            completed: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
            cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return <Badge className={config.className}>{config.label}</Badge>;
    };

    return (
        <Card>
            <CardHeader>
              <CardTitle>Histórico de Solicitações</CardTitle>

              <CardDescription>
                Acompanhe seus serviços solicitados
              </CardDescription>
            </CardHeader>

            <CardContent>
                {serviceRequests.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                            Você ainda não solicitou nenhum serviço
                        </p>

                        <Button onClick={() => navigate("services")} className="cursor-pointer">
                            Encontrar Serviços
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {serviceRequests.map((request) => (
                            <div key={request.id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-medium">{request.service}</h4>
                                        <p className="text-sm text-gray-600">
                                            Prestador: {request.provider}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Data: {new Date(request.date).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end space-y-2">
                                        {getStatusBadge(request.status)}

                                        {request.canRate && request.status === 'completed' && (
                                            <Button size="sm" variant="outline" className="cursor-pointer">
                                            <Star className="h-4 w-4 mr-1" />
                                                Avaliar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};