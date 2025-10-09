import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Users, Settings, Star, UserCheck } from "lucide-react";
import { mockRatings } from "../../../data/mockData";
import { api } from "../../../services/Api";

interface StatsSectionProps {
    setAlertMessage: (msg: string) => void;
    setShowAlert: (show: boolean) => void;
    setAlertType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
}

interface Providers {
    idProvider: number;
    addressId: number;
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    password: string;
    photoUrl?: string;
    biography?: string;
    status: string;
    linkedin?: string;
    instagram?: string;
    validatedEmail?: string;
    emailValidationToken?: string;
    savedLogin?: string;
}

interface Service {
    idService: number;
    name: string;
    categoryId: number;
    status: string;
}

export function AdminStats({ setAlertMessage, setShowAlert, setAlertType }: StatsSectionProps) {
    const [providers, setProviders] = useState<Providers[]>([]);
    const [services, setServices] = useState<Service [] >([]);

    const getProviders = async () => {
        await api.get("providers")
        .then((response) => {
            setProviders(response.data);
        })
        .catch((error) => {
            setAlertMessage("Erro ao buscar prestadores!");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            console.log(error);
        })
    }

    const getServices = () => {
        api.get("/services")
        .then((response) => {
            setServices(response.data);
        })
        .catch ((error) => { 
            setAlertMessage('Erro ao buscar serviço!');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        })
    }

    useEffect(() => {
        getProviders();
        getServices();
    }, []);

    const totalProviders = providers.length;
    const activeProviders = providers.filter(providers => providers.status === "ACTIVE").length;
    const totalServices = services.length;
    const activeServices = services.filter(services => services.status === "ACTIVE").length;
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