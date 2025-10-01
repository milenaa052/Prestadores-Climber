import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/button';

interface ToStartProps {
  onNavigate: (view: string) => void;
}

export function ToStart({ onNavigate }: ToStartProps) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {!isAuthenticated && (
                <div 
                    className="py-16"
                    style={{ backgroundColor: "#000" }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Pronto para começar?
                        </h2>

                        <p className="text-xl text-blue-100 mb-8">
                            Cadastre-se gratuitamente e encontre o prestador ideal para você
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                variant="secondary"
                                onClick={() => onNavigate('register')}
                                className="text-lg px-8 py-3 hover:bg-white hover:text-blue-600 cursor-pointer"
                            >
                                Cadastrar como Cliente
                            </Button>
                            <Button 
                                size="lg"
                                variant="outline"
                                onClick={() => onNavigate('register')}
                                className="text-lg px-8 py-3 text-black border-white hover:bg-white hover:text-blue-600 cursor-pointer"
                            >
                                Cadastrar como Prestador
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};