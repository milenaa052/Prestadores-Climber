import { LogOut, Search } from "lucide-react";
import { Button } from "../../ui/button";
import { useAuth } from "../../../contexts/AuthContext";

interface ClientHeaderProps {
    onNavigate: (view: string) => void;
}

export function ClientHeader({ onNavigate }: ClientHeaderProps) {
    const { user, logout } = useAuth();

    return (
        <div className="mb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard do Cliente</h1>
                    <p className="text-lg text-gray-600 mt-2">Bem-vindo, {user?.name}</p>
                </div>

                <div className="flex row gap-4 items-center">
                    <Button onClick={() => onNavigate('services')} className="cursor-pointer">
                        <Search className="h-4 w-4" />
                        Buscar Serviços
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={logout}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};