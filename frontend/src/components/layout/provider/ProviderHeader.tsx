import { useState } from "react";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useAuth } from "../../../contexts/AuthContext"
import { LogOut } from 'lucide-react';

export function ProviderHeader() {
    const { user, logout } = useAuth();
    const [onlineStatus, setOnlineStatus] = useState(true);

    return (
        <div className="mb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard do Prestador</h1>
                    <p className="text-lg text-gray-600 mt-2">Bem-vindo, {user?.name}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="online-status">Status Online</Label>
                        <Switch
                            id="online-status"
                            checked={onlineStatus}
                            onCheckedChange={setOnlineStatus}
                        />
                    </div>

                    <Badge className={onlineStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {onlineStatus ? 'Online' : 'Offline'}
                    </Badge>

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