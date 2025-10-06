import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { useAuth } from "../../../contexts/AuthContext";
import { mockRatings } from "../../../data/mockData";
import { Star } from 'lucide-react';

export function Reviews() {
    const { user } = useAuth();
    const myRatings = mockRatings.filter(r => r.providerId === user?.id);

    return (
        <Card>
            <CardHeader>
              <CardTitle>Avaliações Recebidas</CardTitle>
              <CardDescription>
                Veja o que seus clientes estão dizendo sobre você
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myRatings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Você ainda não recebeu avaliações
                </p>
              ) : (
                <div className="space-y-4">
                  {myRatings.map((rating) => (
                    <div key={rating.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
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
                        <span className="text-sm text-gray-500">
                          {new Date(rating.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {rating.clientComment && (
                        <p className="text-gray-700">{rating.clientComment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
        </Card>
    );
};