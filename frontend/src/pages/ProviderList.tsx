import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, Clock, CheckCircle } from 'lucide-react';
import { Provider } from '../types';
import { mockProviders, mockServices } from '../data/mockData';

interface ProviderListProps {
  serviceId: string;
  onBack: () => void;
}

export function ProviderList({ serviceId, onBack }: ProviderListProps) {
  const service = mockServices.find(s => s.id === serviceId);
  const availableProviders = mockProviders.filter(
    provider => provider.services.includes(serviceId) && provider.active && provider.online
  );

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = {
      monday: 'Seg',
      tuesday: 'Ter',
      wednesday: 'Qua',
      thursday: 'Qui',
      friday: 'Sex',
      saturday: 'Sáb',
      sunday: 'Dom',
    };
    return days[day] || day;
  };

  const getAvailableDays = (provider: Provider) => {
    return Object.entries(provider.availability)
      .filter(([_, schedule]) => schedule.available)
      .map(([day, schedule]) => `${getDayName(day)} ${schedule.start}-${schedule.end}`)
      .join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4 cursor-pointer">
          ← Voltar aos Serviços
        </Button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Prestadores de {service?.name}
        </h2>

        <p className="text-lg text-gray-600">
          {availableProviders.length} prestadores online disponíveis
        </p>
      </div>

      {availableProviders.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg">
              Nenhum prestador online disponível para este serviço no momento.
            </p>

            <Button onClick={onBack} className="mt-4 cursor-pointer">
              Escolher Outro Serviço
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{provider.name}</CardTitle>

                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Online
                      </Badge>
                    </div>

                    <CardDescription className="text-gray-600">
                      {provider.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-gray-500">({provider.reviewCount} avaliações)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Disponibilidade:</span>
                  </div>

                  <p className="text-sm text-gray-700 ml-6">
                    {getAvailableDays(provider)}
                  </p>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1 cursor-pointer">
                    Contratar Serviço
                  </Button>

                  <Button variant="outline" className="flex-1 cursor-pointer">
                    Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};