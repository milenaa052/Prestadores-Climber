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
    const [editCategory, setEditCategory] = useState<Categories | null>(null);
    const [editNameCategory, setEditNameCategory] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryDelete, setCategoryDelete] = useState<Categories | null>(null);

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

    const openEditModal = (category: Categories) => {
        setShowEditModal(true);
        setEditCategory(category);
        setEditNameCategory(category.name);
    }

    const handleEditCategory = async () => {
        try {
            if (!editCategory || !editNameCategory) {
                setAlertMessage('Digite um nome para a categoria');
                setAlertType('error');
                setShowAlert(true);
                setShowEditModal(true);
                setTimeout(() => setShowAlert(false), 3000);
                return;
            }

            const payload = { name: editNameCategory };
            await axios.put(`http://localhost:3000/api/category/${editCategory?.idCategory}`, payload);

            setAlertMessage('Categoria atualizada com sucesso!');
            setAlertType('success');
            setShowAlert(true);
            setShowEditModal(false);
            setEditCategory(null);
            setReload(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setAlertMessage('Erro ao atualizar categoria');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }

    const openDeleteModal = (category: Categories) => {
        setShowDeleteModal(true);
        setCategoryDelete(category);
    }

    const handleDeleteCategory = async () => {
        if (!categoryDelete) return
        try {

            await axios.delete(`http://localhost:3000/api/category/${categoryDelete.idCategory}`)

            setAlertMessage('Categoria deletada com sucesso!');
            setAlertType('success');
            setShowAlert(true);
            setShowDeleteModal(false);
            setReload(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setAlertMessage('Erro ao deletar categoria');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
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
                                            onClick={() => openEditModal(category)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="cursor-pointer"
                                            onClick={() => openDeleteModal(category)}
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
            {
                showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md transform transition-all scale-100 animate-fadeIn">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Editar Categoria</h3>

                            <Label htmlFor="edit-category" className="text-gray-700">Nome da categoria</Label>
                            <Input
                                id="edit-category"
                                value={editNameCategory}
                                onChange={(e) => setEditNameCategory(e.target.value)}
                                placeholder="Novo nome da categoria"
                                className="mb-4 mt-1"
                            />

                            <div className="flex justify-end space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditCategory(null);
                                    }}
                                    className="px-4 cursor-pointer"
                                >
                                    Voltar
                                </Button>

                                <Button onClick={handleEditCategory} className="px-4 cursor-pointer">
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
             {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md transform transition-all scale-100 animate-fadeIn">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Tem certeza que deseja excluir?</h3>

                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="outline"
                                onClick={() => { setShowDeleteModal(false) }}
                                className="px-4 cursor-pointer"
                            >
                                Voltar
                            </Button>

                            <Button onClick={handleDeleteCategory} className="px-4 cursor-pointer">
                                Excluir
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};