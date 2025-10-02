import { Request, Response } from "express"
import CategoryModel from "../models/CategoryModel.js"

export const getCategory = async (req: Request, res: Response) => { 
    const categories = await CategoryModel.findAll();
    return res.status(200).json(categories); 
}

export const getCategoryById = async (req: Request<{ id: string }>, res: Response) => {
    const category = await CategoryModel.findByPk(req.params.id);
    return res.status(200).json(category);
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400)
                .json({ error: "Name field is mandatory" })
        }

        const category = await CategoryModel.create({ name })

        return res.status(201).json(category);
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) }
}

export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {  
    try {
        const { name } = req.body

        if (!name) { 
            return res.status(400)
                .json({ error: "Name field is mandatory" })
        }

        const category = await CategoryModel.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        category.name = name;
        await category.save();

        return res.status(200).json(category);
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) }
}

export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const category = await CategoryModel.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        await category.destroy();
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json("Internal server error " + error) }
}