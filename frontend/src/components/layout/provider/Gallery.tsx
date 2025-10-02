import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Plus, Camera } from 'lucide-react';

export function Gallery() {
    return (
        <Card>
            <CardHeader>
              <CardTitle>Galeria de Trabalhos</CardTitle>

              <CardDescription>
                Adicione fotos dos seus serviços realizados
              </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />

                    <p className="text-gray-600 mb-4">
                        Clique para adicionar fotos dos seus trabalhos
                    </p>

                    <Button className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Fotos
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};