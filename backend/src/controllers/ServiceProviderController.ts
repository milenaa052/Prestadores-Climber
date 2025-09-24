import { Request, Response } from "express"
import ServiceProviderModel from "../models/ServiceProviderModel.js"

export const getServiceProvider = async (req: Request, res: Response) => {
    const serviceProvider = await ServiceProviderModel.findAll()
    return res.status(200).send(serviceProvider)
}

export const getServiceProviderById = async (req: Request<{ id: string }>, res: Response) => {
    const serviceProvider = await ServiceProviderModel.findByPk(req.params.id)
    return res.status(200).json(serviceProvider)
}

export const createServiceProvider = async (req: Request, res: Response) => {
    try {
        const {
            providerId,
            serviceId,
            minimumValue,
            maximumValue,
            status
        } = req.body

        if (!providerId || !serviceId || !minimumValue || !maximumValue || !status ) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const serviceProvider = await ServiceProviderModel.create({
            providerId,
            serviceId,
            minimumValue,
            maximumValue,
            status: 1
        })

        return res.status(201).json(serviceProvider)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updateServiceProvider = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const {
            providerId,
            serviceId,
            minimumValue,
            maximumValue,
            status
        } = req.body

        if (!providerId || !serviceId || !minimumValue || !maximumValue || !status ) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const serviceProvider = await ServiceProviderModel.findByPk(req.params.id)

        if(!serviceProvider) {
            return res.status(404)
                .json({error: "Adress not found"})
        }

        serviceProvider.providerId = providerId
        serviceProvider.serviceId = serviceId
        serviceProvider.minimumValue = minimumValue
        serviceProvider.maximumValue = maximumValue
        serviceProvider.status = status

        await serviceProvider.save()

        return res.status(200).json(serviceProvider)

    }catch(error){
        return res.status(500).json("Internal server error " + error)
    }
}

export const deleteServiceProviderById = async (req: Request<{ id: string}>, res: Response) => {  
    try {
        const serviceProvider = await ServiceProviderModel.findByPk(req.params.id)
        
        if(!serviceProvider) {
            return res.status(404)
                .json({error: "Address not found"})
        }

        await serviceProvider.destroy()
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}