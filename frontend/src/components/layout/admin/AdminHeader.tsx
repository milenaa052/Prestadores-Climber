import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export function AdminHeader() {
    const { user, logout } = useAuth();

    return (
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-lg text-gray-600 mt-2">Bem-vindo, {user?.name}</p>
            </div>

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
    );
};