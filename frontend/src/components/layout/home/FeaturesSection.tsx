import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Search, Star, Shield, Clock } from 'lucide-react';

export function FeaturesSection() {
    const features = [
        {
            icon: Search,
            title: 'Encontre Profissionais',
            description: 'Busque por serviços específicos e encontre prestadores qualificados perto de você.',
        },
        {
            icon: Star,
            title: 'Avaliações Confiáveis',
            description: 'Sistema de avaliação mútua que garante transparência e qualidade.',
        },
        {
            icon: Shield,
            title: 'Segurança Garantida',
            description: 'Prestadores verificados e sistema seguro de contratação.',
        },
        {
            icon: Clock,
            title: 'Atendimento Flexível',
            description: 'Prestadores com horários diversos para sua conveniência.',
        },
    ];

    return (
        <div 
            className="py-16"
            style={{ background: "linear-gradient(135deg, #f1f1f1ff 0%, #d6d6d6ff 100%)" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Por que escolher o Prestadores Climber?
                    </h2>

                    <p className="text-lg text-gray-600">
                        Uma plataforma completa e segura para contratação de serviços
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}