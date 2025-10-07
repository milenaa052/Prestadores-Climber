import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { mockRatings, mockServices } from "../../../data/mockData";
import { Star, Eye, EyeOff } from 'lucide-react';

interface RatingsSectionProps {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  setAlertType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
}

export function RatingsSection({ setShowAlert, setAlertMessage, setAlertType }: RatingsSectionProps) {

    const toggleRatingVisibility = (ratingId: string, visible: boolean) => {
        setAlertMessage(`Avaliação ${visible ? 'ativada' : 'desativada'} com sucesso!`);
        setAlertType('success');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <Card>
            <CardHeader>
              <CardTitle>Moderar Avaliações</CardTitle>

              <CardDescription>
                Controle a visibilidade das avaliações na plataforma
              </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {mockRatings.map((rating) => {
                        const service = mockServices.find(s => s.id === rating.serviceId);

                        return (
                            <div key={rating.id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-medium">{service?.name}</h4>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm text-gray-600">Cliente:</span>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-3 w-3 ${
                                                            star <= (rating.clientRating || 0)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm text-gray-600">Prestador:</span>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-3 w-3 ${
                                                            star <= (rating.providerRating || 0)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Badge className={rating.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                            {rating.visible ? 'Visível' : 'Oculta'}
                                        </Badge>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => toggleRatingVisibility(rating.id, !rating.visible)}
                                            className="cursor-pointer"
                                        >
                                            {rating.visible ? (
                                                <>
                                                    <EyeOff className="h-4 w-4 mr-1" />
                                                    Ocultar
                                                </>
                                                ) : (
                                                <>
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Mostrar
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    {rating.clientComment && (
                                        <div>
                                            <p className="font-medium text-gray-700">Cliente:</p>
                                            <p className="text-gray-600">{rating.clientComment}</p>
                                        </div>
                                    )}

                                    {rating.providerComment && (
                                        <div>
                                            <p className="font-medium text-gray-700">Prestador:</p>
                                            <p className="text-gray-600">{rating.providerComment}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};