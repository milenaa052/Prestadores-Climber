export function StatsSection() {
    return (
        <div 
            className="py-16"
            style={{ background: "linear-gradient(135deg, #f1f1f1ff 0%, #d6d6d6ff 100%)" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                        <div className="text-lg text-gray-600">Prestadores Ativos</div>
                    </div>

                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
                        <div className="text-lg text-gray-600">Serviços Realizados</div>
                    </div>

                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
                        <div className="text-lg text-gray-600">Avaliação Média</div>
                    </div>
                </div>
            </div>
        </div>
    );
};