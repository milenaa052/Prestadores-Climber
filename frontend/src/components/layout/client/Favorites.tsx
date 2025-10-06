import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export function Favorites() {
    return (
        <Card>
            <CardHeader>
              <CardTitle>Prestadores Favoritos</CardTitle>
              
              <CardDescription>
                Seus prestadores favoritos para contratação rápida
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Você ainda não tem prestadores favoritos
              </p>
            </CardContent>
        </Card>
    );
};