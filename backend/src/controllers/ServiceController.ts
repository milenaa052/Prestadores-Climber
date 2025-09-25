import { Request, Response } from "express"
import ServiceModel from "../models/ServiceModel.js"

export const getService = async (req: Request, res: Response) => {
    const services = await ServiceModel.findAll()
    return res.status(200).json(services) 
}  

export const getServiceById = async (req: Request<{ id: string }>, res: Response) => {
    const services = await ServiceModel.findByPk(req.params.id)
    return res.status(200).json(services)
}

export const createService = async (req: Request, res: Response) => {
    try {
        const {
            idService,
            CategoryId,
            Name,
            Status
        } = req.body

        if ( !idService ||!CategoryId || !Name) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const service = await ServiceModel.create({
            idService,
            CategoryId,
            Name,
            Status: "ACTIVE"
        })
        return res.status(201).json(service)
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) }
}

export const updateService = async (req: Request<{ id: string }>, res: Response) => {  
    try {
        const { 
            idService,
            CategoryId,
            Name,
            Status
        } = req.body

        if ( !idService ||!CategoryId || !Name || !Status) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const service = await ServiceModel.findByPk(req.params.id)
        if (!service) {
            return res.status(404).json({ error: "Service not found" })
        }

        service.idService = idService
        service.CategoryId = CategoryId
        service.Name = Name
        service.Status = Status

        await service.save()
    
        return res.status(200).json(service)
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) }
}

export const deleteService = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const service = await ServiceModel.findByPk(req.params.id)
        if (!service) {
            return res.status(404).json({ error: "Service not found" })
        } 

        await service.destroy() 
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json("Internal server error " + error) }   
}