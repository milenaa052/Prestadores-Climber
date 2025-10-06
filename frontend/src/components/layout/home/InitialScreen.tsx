import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { CheckCircle, Search, ArrowRight } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export function InitialScreen() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Prestadores
                        <span className="block text-blue-600">Climber</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Conectamos você aos melhores prestadores de serviços da sua região. 
                        Contrate com segurança, avalie com transparência.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {!isAuthenticated ? (
                            <>
                            <Button 
                                size="lg" 
                                onClick={() => navigate("/register")}
                                className="text-lg px-8 py-3 cursor-pointer"
                            >
                                Começar Agora
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Button 
                                variant="outline" 
                                size="lg"
                                onClick={() => navigate("/login")}
                                className="text-lg px-8 py-3 cursor-pointer hover:text-blue-600"
                            >
                                Fazer Login
                            </Button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-lg">Bem-vindo, {user?.name}!</span>
                                </div>
                                {user?.type === 'client' && (
                                    <Button 
                                        size="lg" 
                                        onClick={() => navigate("/services")}
                                        className="text-lg px-8 py-3"
                                    >
                                    <Search className="mr-2 h-5 w-5" />
                                        Encontrar Serviços
                                    </Button>
                                )}
                                    {user?.type === 'provider' && (
                                        <Button 
                                            size="lg" 
                                            onClick={() => navigate("/dashboard")}
                                            className="text-lg px-8 py-3"
                                        >
                                            Ir para Dashboard
                                        </Button>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};