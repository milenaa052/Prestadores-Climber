import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export function Schedule() {
    const [availability, setAvailability] = useState({
        monday: { start: '08:00', end: '18:00', available: true },
        tuesday: { start: '08:00', end: '18:00', available: true },
        wednesday: { start: '08:00', end: '18:00', available: true },
        thursday: { start: '08:00', end: '18:00', available: true },
        friday: { start: '08:00', end: '18:00', available: true },
        saturday: { start: '08:00', end: '14:00', available: true },
        sunday: { start: '00:00', end: '00:00', available: false },
    });

    const dayNames = {
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo',
    };

    const handleAvailabilityChange = (day: string, field: string, value: string | boolean) => {
        setAvailability(prev => ({
        ...prev,
        [day]: {
            ...prev[day as keyof typeof prev],
            [field]: value,
        },
        }));
    };

    return (
        <Card>
            <CardHeader>
              <CardTitle>Horários de Atendimento</CardTitle>

              <CardDescription>
                Configure seus dias e horários de trabalho
              </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {Object.entries(availability).map(([day, schedule]) => (
                        <div key={day} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <Switch
                                checked={schedule.available}
                                onCheckedChange={(checked) => handleAvailabilityChange(day, 'available', checked)}
                            />

                            <div className="flex-1">
                                <Label className="font-medium">
                                    {dayNames[day as keyof typeof dayNames]}
                                </Label>
                            </div>

                            {schedule.available && (
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="time"
                                        value={schedule.start}
                                        onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                                        className="w-32"
                                    />

                                    <span>até</span>

                                    <Input
                                        type="time"
                                        value={schedule.end}
                                        onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                                        className="w-32"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Button className="mt-6 cursor-pointer">Salvar Horários</Button>
            </CardContent>
        </Card>
    );
};