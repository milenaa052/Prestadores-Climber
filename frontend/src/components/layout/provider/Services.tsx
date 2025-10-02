import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
import { Button } from '../../ui/button';
import { mockServices } from '../../../data/mockData';

export function Services() {
    const [selectedServices, setSelectedServices] = useState(['1', '3']);

    const handleServiceToggle = (serviceId: string) => {
        setSelectedServices(prev => 
        prev.includes(serviceId) 
            ? prev.filter(id => id !== serviceId)
            : [...prev, serviceId]
        );
    };

    return (
        <Card>
            <CardHeader>
              <CardTitle>Gerenciar Serviços</CardTitle>

              <CardDescription>
                Selecione os serviços que você oferece
              </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockServices.filter(s => s.active).map((service) => (
                        <div key={service.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                            <Switch
                                checked={selectedServices.includes(service.id)}
                                onCheckedChange={() => handleServiceToggle(service.id)}
                            />

                            <div className="flex-1">
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-gray-600">{service.description}</p>
                                <Badge variant="secondary" className="mt-1">
                                    {service.category}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className="mt-6 cursor-pointer">Salvar Serviços</Button>
            </CardContent>
        </Card>
    );
};