import { Request, Response } from "express"
import ServiceModel from "../models/ServiceModel.js"

export const getService = async (req: Request, res: Response) => {
    const services = await ServiceModel.findAll();
    return res.status(200).json(services);
}  

export const getServiceById = async (req: Request<{ id: string }>, res: Response) => {
    const services = await ServiceModel.findByPk(req.params.id);
    return res.status(200).json(services);
}

export const createService = async (req: Request, res: Response) => {
    try {
        const { categoryId, name } = req.body;

        if ( !categoryId || !name) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const service = await ServiceModel.create({
            categoryId,
            name,
            status: "ACTIVE"
        });

        return res.status(201).json(service);
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) }
}

export const updateService = async (req: Request<{ id: string }>, res: Response) => {  
    try {
        const { 
            categoryId,
            name,
            status
        } = req.body;

        if (!categoryId || !name || !status) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        if (status !== 'ACTIVE' && status !== 'INACTIVE') {
            return res.status(400).json({ error: "Invalid status. Must be 'ACTIVE' or 'INACTIVE'." });
        }

        const service = await ServiceModel.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" })
        }

        service.categoryId = categoryId;
        service.name = name;
        service.status = status;

        await service.save();
    
        return res.status(200).json(service);
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) }
}

export const deleteService = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const service = await ServiceModel.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" })
        } 

        await service.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json("Internal server error " + error) }   
}