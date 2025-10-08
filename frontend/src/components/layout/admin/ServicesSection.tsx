import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Select } from "../../ui/select";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Plus } from 'lucide-react';
import { mockServices, mockCategories } from "../../../data/mockData";
import axios from "axios";

interface ServicesSectionProps {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  setAlertType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
}
interface Category {
    idCategory: number;
    name: string;
}

interface Service {
    idService: number;
    name: string;
    categoryId: number;
    status: string;
}

export function ServicesSection({ setShowAlert, setAlertMessage, setAlertType }: ServicesSectionProps) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category [] >([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [services, setServices] = useState<Service [] >([]);

    const getCategoryByName = () => {
         axios.get(`http://localhost:3000/api/categories`)
        .then((response) => {
            setCategory(response.data);
        })
        .catch((error) => {
            console.error('Error fetching category:', error);
        });
    }
    useEffect(() => {
        getCategoryByName();
    }, [name]);

    const handleAddService = async () => {
        if (!name || !selectedCategory) {
            setAlertMessage('Prencha todos os campos para criar um serviço');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        try {
            const payload = {
                name: name,
                categoryId: Number(selectedCategory), 
            };
            await axios.post('http://localhost:3000/api/service-registration', payload);
            setAlertMessage('Serviço criado com sucesso!');
            setAlertType('success');
            setShowAlert(true);
            getServices();
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setAlertMessage('Erro ao cadastrar serviço!');
            setAlertType('error');
            setShowAlert(true);
        
            setTimeout(() => setShowAlert(false), 3000);  
        }
    };

    const getServices = () => {
        axios.get(`http://localhost:3000/api/services`)
        .then((response) => {
            setServices(response.data);
        })
        .catch ((error) => { 
            setAlertMessage('Erro ao buscar serviço!');
            setAlertType('error');
            setShowAlert(true);
        
            setTimeout(() => setShowAlert(false), 3000);
        }); 
    }; 
       useEffect(() => {
        getServices();
    },[]);

    const toggleServiceStatus = (idService: number, active: boolean) => {
        setAlertMessage(`Serviço ${active ? 'ativado' : 'desativado'} com sucesso!`);
        setAlertType('success');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Criar Novo Serviço</CardTitle>

                    <CardDescription>
                        Adicione novos tipos de serviços à plataforma
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-name">Nome do Serviço</Label>
                            <Input
                                id="service-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome do serviço"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service-category">Categoria</Label>

                            <Select
                                id="service-category"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                            >
                                <option value="">Selecione uma categoria</option>
                                {category.map((category) => (
                                    <option key={category.idCategory} value={category.idCategory}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    

                    <Button onClick={handleAddService} className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-1" />
                        Criar Serviço
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Gerenciar Serviços Existentes</CardTitle>

                    <CardDescription>
                        Ative ou desative serviços na plataforma
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {services.length > 0 ? (
                         services.map((service) => (
                            <div key={service.idService} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-medium">{service.name}</h4>

                                    <Badge variant="secondary" className="mt-1">
                                        {category.find(cat => cat.idCategory === service.categoryId)?.name || 'Categoria Desconhecida'}
                                    </Badge>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Badge className={service.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {service.status ? 'Ativo' : 'Inativo'}
                                    </Badge>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => toggleServiceStatus(service.idService, !service.status)}
                                        className="cursor-pointer"
                                    >
                                        {service.status ? 'Desativar' : 'Ativar'}
                                    </Button>
                                </div>
                            </div>
                        ))   
                        ) : (
                            <p className="text-sm text-gray-500">Nenhum serviço cadastrado.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};