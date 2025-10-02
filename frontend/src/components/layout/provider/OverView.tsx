import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Star, Clock, Calendar } from 'lucide-react';

export function OverView() {
    const [description, setDescription] = useState('Profissional experiente em limpeza e pintura');
    const [selectedServices, setSelectedServices] = useState(['1', '3']);
    const [onlineStatus, setOnlineStatus] = useState(true);
    const averageRating = 4.8;
    const totalRatings = 12;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">{averageRating}</div>
                        <p className="text-xs text-muted-foreground">
                            {totalRatings} avaliações
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-500" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">{selectedServices.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Tipos de serviço
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                        <Clock className="h-4 w-4 text-green-500" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">{onlineStatus ? 'Online' : 'Offline'}</div>
                        <p className="text-xs text-muted-foreground">
                            Disponibilidade atual
                        </p>
                    </CardContent>
                </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Descrição do Perfil</CardTitle>

              <CardDescription>
                Esta descrição será exibida para os clientes
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva sua experiência e especialidades..."
                className="min-h-[100px]"
              />
              <Button className="mt-4 cursor-pointer">Salvar Descrição</Button>
            </CardContent>
          </Card>
        </>
    );
};