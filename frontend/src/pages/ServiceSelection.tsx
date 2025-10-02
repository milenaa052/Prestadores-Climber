import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockServices } from '../data/mockData';

interface ServiceSelectionProps {
  onServiceSelect: (serviceId: string) => void;
}

export function ServiceSelection({ onServiceSelect }: ServiceSelectionProps) {
  const categories = Array.from(new Set(mockServices.filter(s => s.active).map(s => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Selecione o Serviço Desejado
        </h2>

        <p className="text-lg text-gray-600">
          Escolha o tipo de serviço que você precisa e veja os prestadores disponíveis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServices
          .filter(service => service.active)
          .map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>

                    <CardDescription className="text-sm text-gray-500 mt-1">
                      {service.category}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <Button 
                  onClick={() => onServiceSelect(service.id)}
                  className="w-full cursor-pointer"
                >
                  Ver Prestadores
                </Button>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
};