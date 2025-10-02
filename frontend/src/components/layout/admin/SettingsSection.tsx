import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";

export function SettingsSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Configurações da Plataforma</CardTitle>

                <CardDescription>
                    Ajustes gerais do sistema
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Aprovação automática de prestadores</Label>
                            <p className="text-sm text-gray-600">
                                Novos prestadores são ativados automaticamente
                            </p>
                        </div>

                        <Switch defaultChecked={false} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Moderação de avaliações</Label>
                            <p className="text-sm text-gray-600">
                                Avaliações precisam de aprovação para serem exibidas
                            </p>
                        </div>

                        <Switch defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Notificações por email</Label>
                            <p className="text-sm text-gray-600">
                                Enviar notificações por email para usuários
                            </p>
                        </div>

                        <Switch defaultChecked={true} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};