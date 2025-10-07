import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Plus } from 'lucide-react';
import { mockCategories } from "../../../data/mockData";
import { Pencil, Trash } from "lucide-react";
import axios from "axios"

interface CategoriesSectionProps {
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
    setAlertType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
}

interface Categories {
    idCategory: number;
    name: string;
}

export function CategoriesSection({ setShowAlert, setAlertMessage, setAlertType }: CategoriesSectionProps) {
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState<Categories[]>([]);
    const [reload, setReload] = useState(false);

    const handleAddCategory = async () => {
        if (!newCategory) {
            setAlertMessage('Digite um nome para a categoria');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        try {

            const payload = { name: newCategory }
            await axios.post("http://localhost:3000/api/category-registration", payload)

            setAlertMessage('Categoria adicionada com sucesso!');
            setAlertType('success');
            setShowAlert(true);
            setNewCategory('');
            setReload(true);
            setTimeout(() => setShowAlert(false), 3000);

        } catch (error) {
            setAlertMessage('Erro ao criar categoria');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }

    };

    const getCategories = () => {
        axios.get("http://localhost:3000/api/categories")
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                setAlertMessage('Erro ao buscar categorias');
                setAlertType('error');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            })
    }

    useEffect(() => {
        getCategories();
    }, [reload]);

    return (
        <>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Adicionar Categoria</CardTitle>
                    <CardDescription>
                        Crie novas categorias para organizar seus serviços.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label htmlFor="category-name">Nome da categoria</Label>
                            <Input
                                id="category-name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Nome da categoria"
                            />
                        </div>
                    </div>

                    <Button onClick={handleAddCategory} className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-1" />
                        Criar Categoria
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Gerenciar Categorias Existentes</CardTitle>

                    <CardDescription>
                        Edite ou exclua categorias na plataforma
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.idCategory} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-medium">{category.name}</h4>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="cursor-pointer"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>Nenhuma categoria cadastrada</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};