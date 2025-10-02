import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Plus } from 'lucide-react';
import { mockServices } from "../../../data/mockData";

export function ServicesSection() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [newService, setNewService] = useState({
        name: '',
        description: '',
        category: '',
    });

    const handleAddService = () => {
        if (!newService.name || !newService.description || !newService.category) {
            setAlertMessage('Preencha todos os campos para criar o serviço');
            setShowAlert(true);
            return;
        }

        setAlertMessage('Serviço criado com sucesso!');
        setShowAlert(true);
        setNewService({ name: '', description: '', category: '' });
        
        setTimeout(() => setShowAlert(false), 3000);
    };

      const toggleServiceStatus = (serviceId: string, active: boolean) => {
        setAlertMessage(`Serviço ${active ? 'ativado' : 'desativado'} com sucesso!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Criar Novo Serviço</CardTitle>

                    <CardDescription>
                        Adicione novos tipos de serviços à plataforma
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-name">Nome do Serviço</Label>
                            <Input
                                id="service-name"
                                value={newService.name}
                                onChange={(e) => setNewService({...newService, name: e.target.value})}
                                placeholder="Nome do serviço"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-category">Categoria</Label>
                            <Input
                                id="service-category"
                                value={newService.category}
                                onChange={(e) => setNewService({...newService, category: e.target.value})}
                                placeholder="Categoria do serviço"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="service-description">Descrição</Label>
                        <Textarea
                            id="service-description"
                            value={newService.description}
                            onChange={(e) => setNewService({...newService, description: e.target.value})}
                            placeholder="Descrição do serviço"
                        />
                    </div>

                    <Button onClick={handleAddService} className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Serviço
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Gerenciar Serviços Existentes</CardTitle>7

                    <CardDescription>
                        Ative ou desative serviços na plataforma
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {mockServices.map((service) => (
                            <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium">{service.name}</h4>

                                    <p className="text-sm text-gray-600">{service.description}</p>

                                    <Badge variant="secondary" className="mt-1">
                                        {service.category}
                                    </Badge>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Badge className={service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {service.active ? 'Ativo' : 'Inativo'}
                                    </Badge>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => toggleServiceStatus(service.id, !service.active)}
                                        className="cursor-pointer"
                                    >
                                        {service.active ? 'Desativar' : 'Ativar'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};