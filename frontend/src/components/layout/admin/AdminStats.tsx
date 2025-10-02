import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Users, Settings, Star, UserCheck } from "lucide-react";
import { mockProviders, mockServices, mockRatings } from "../../../data/mockData";

export function AdminStats() {
    const totalProviders = mockProviders.length;
    const activeProviders = mockProviders.filter(p => p.active).length;
    const totalServices = mockServices.length;
    const activeServices = mockServices.filter(s => s.active).length;
    const totalRatings = mockRatings.length;
    const visibleRatings = mockRatings.filter(r => r.visible).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Prestadores</CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold">{totalProviders}</div>
                    <p className="text-xs text-muted-foreground">{activeProviders} ativos</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Serviços</CardTitle>
                    <Settings className="h-4 w-4 text-green-500" />
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold">{totalServices}</div>
                    <p className="text-xs text-muted-foreground">{activeServices} ativos</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold">{totalRatings}</div>
                    <p className="text-xs text-muted-foreground">{visibleRatings} visíveis</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taxa de Ativação</CardTitle>
                    <UserCheck className="h-4 w-4 text-purple-500" />
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold">
                        {Math.round((activeProviders / totalProviders) * 100)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Prestadores ativos</p>
                </CardContent>
            </Card>
        </div>
    );
};