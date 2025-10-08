import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Plus } from 'lucide-react';
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
    const [openModal, setOpenModal] = useState<null | 'edit' | 'delete'>(null);
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
            getCategories();
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
        setEditCategory(category);
        setEditNameCategory(category.name);
        setOpenModal('edit');
    };

    const handleEditCategory = async () => {
        try {
            if (!editCategory || !editNameCategory) {
                setAlertMessage('Digite um nome para a categoria');
                setAlertType('error');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
                return;
            }

            const payload = { name: editNameCategory };
            await axios.put(`http://localhost:3000/api/category/${editCategory?.idCategory}`, payload);

            setAlertMessage('Categoria atualizada com sucesso!');
            setAlertType('success');
            setShowAlert(true);
            setOpenModal(null);
            setEditCategory(null);
            getCategories();
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setAlertMessage('Erro ao atualizar categoria');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const openDeleteModal = (category: Categories) => {
        setCategoryDelete(category);
        setOpenModal('delete');
    };

    const handleDeleteCategory = async () => {
        if (!categoryDelete) return
        try {
            await axios.delete(`http://localhost:3000/api/category/${categoryDelete.idCategory}`)

            setAlertMessage('Categoria deletada com sucesso!');
            setAlertType('success');
            setShowAlert(true);
            setOpenModal(null);
            getCategories();
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setAlertMessage('Erro ao deletar categoria');
            setAlertType('error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const closeModal = () => {
        setOpenModal(null);
        setEditCategory(null);
        setCategoryDelete(null);
    };

    useEffect(() => {
        getCategories();
    }, [reload]);

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <>
            <div>
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
            </div>

            {openModal === 'edit' && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
                    onClick={closeModal}
                    style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }}
                >
                    <div 
                        className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-[90%] max-w-md mx-4 transition-all duration-300 transform scale-100"
                        onClick={handleModalClick}
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <Pencil className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900">
                                Editar Categoria
                            </h3>
                            <p className="mb-6 text-sm text-gray-500 text-center">
                                Altere o nome e salve para atualizar.
                            </p>
                            <div className="w-full mb-6">
                                <Label htmlFor="edit-category" className="text-gray-700 mb-2 block">
                                    Nome da categoria
                                </Label>
                                <Input
                                    id="edit-category"
                                    value={editNameCategory}
                                    onChange={(e) => setEditNameCategory(e.target.value)}
                                    placeholder="Novo nome da categoria"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex justify-center gap-4 w-full">
                                <Button
                                    variant="outline"
                                    onClick={closeModal}
                                    className="h-11 border-gray-300 bg-white px-6 font-medium text-gray-700 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    onClick={handleEditCategory}
                                    className="h-11 px-6 font-medium bg-blue-600 hover:bg-blue-700 text-white shadow cursor-pointer"
                                >
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {openModal === 'delete' && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
                    onClick={closeModal}
                    style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }}
                >
                    <div 
                        className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-[90%] max-w-md mx-4 transition-all duration-300 transform scale-100"
                        onClick={handleModalClick}
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <Trash className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                                Excluir Categoria
                            </h3>
                            <p className="mb-6 text-center text-gray-600">
                                Tem certeza que deseja excluir <span className="font-bold">{categoryDelete?.name}</span>?<br />
                                Esta ação não poderá ser desfeita.
                            </p>
                            <div className="flex justify-center gap-4 w-full">
                                <Button
                                    variant="outline"
                                    onClick={closeModal}
                                    className="h-11 border-gray-300 bg-white px-6 font-medium text-gray-700 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteCategory}
                                    className="px-6 rounded-lg font-semibold shadow text-white cursor-pointer"
                                >
                                    Excluir
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};