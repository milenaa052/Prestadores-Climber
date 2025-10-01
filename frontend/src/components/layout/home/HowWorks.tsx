export function HowWorks() {
    const steps = [
        {
          number: '1',
          title: 'Escolha o Serviço',
          description: 'Selecione o tipo de serviço que você precisa.',
        },
        {
          number: '2',
          title: 'Veja os Prestadores',
          description: 'Analise perfis, avaliações e disponibilidade.',
        },
        {
          number: '3',
          title: 'Contrate com Segurança',
          description: 'Escolha o melhor prestador e contrate o serviço.',
        },
        {
          number: '4',
          title: 'Avalie a Experiência',
          description: 'Deixe sua avaliação para ajudar outros usuários.',
        },
    ];
    
    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Como funciona
                    </h2>

                    <p className="text-lg text-gray-600">
                        Processo simples e seguro para contratar serviços
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                                    {step.number}
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8"></div>
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};