import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Star } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { mockRatings, mockServices } from "../../../data/mockData";

export function Reviews() {
    const { user } = useAuth();
    const myRatings = mockRatings.filter(r => r.clientId === user?.id);

    return (
        <Card>
            <CardHeader>
              <CardTitle>Minhas Avaliações</CardTitle>

              <CardDescription>
                Avaliações que você fez para prestadores
              </CardDescription>
            </CardHeader>

            <CardContent>
                {myRatings.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        Você ainda não fez nenhuma avaliação
                    </p>
                ) : (
                    <div className="space-y-4">
                        {myRatings.map((rating) => {
                            const service = mockServices.find(s => s.id === rating.serviceId);

                            return (
                                <div key={rating.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium">{service?.name}</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-4 w-4 ${
                                                            star <= (rating.clientRating || 0)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {new Date(rating.createdAt).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>

                                        {rating.clientComment && (
                                            <p className="text-gray-700 mt-2">{rating.clientComment}</p>
                                        )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};