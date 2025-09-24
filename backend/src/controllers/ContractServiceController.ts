import { Request, Response } from "express"
import ContractServiceModel from "../models/ContractServiceModel.js"

export const getContract = async (req: Request, res: Response) => {
    const contract = await ContractServiceModel.findAll()
    return res.status(200).send(contract)
}

export const getContractById = async (req: Request<{ id: string }>, res: Response) => {
    const contract = await ContractServiceModel.findByPk(req.params.id)
    return res.status(200).json(contract)
}

export const createContract = async (req: Request, res: Response) => {
    try {
        const {
            providerId,
            customerId,
            providerServiceId,
            dateService,
            startTime,
            endTime,
            status,
            value
        } = req.body

        if (!providerId || !customerId || !providerServiceId || !dateService || !startTime || !endTime || !status || !value) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const contract = await ContractServiceModel.create({
            providerId,
            customerId,
            providerServiceId,
            dateService,
            startTime,
            endTime,
            status: "PENDING",
            value
        })

        return res.status(201).json(contract)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updateContract = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const {
            providerId,
            customerId,
            providerServiceId,
            dateService,
            startTime,
            endTime,
            status,
            value
        } = req.body

        if (!providerId || !customerId || !providerServiceId || !dateService || !startTime || !endTime || !status || !value) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const contract = await ContractServiceModel.findByPk(req.params.id)

        if (!contract) {
            return res.status(404)
                .json({ error: "Contract not found" })
        }

        contract.providerId = providerId
        contract.customerId = customerId
        contract.providerServiceId = providerServiceId
        contract.dateService = dateService
        contract.startTime = startTime
        contract.endTime = endTime
        contract.status = status
        contract.value = value

        await contract.save()

        return res.status(200).json(contract)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const deleteContractById = async (req: Request<{ id: string}>, res: Response) => {  
    try {
        const contract = await ContractServiceModel.findByPk(req.params.id)
        
        if(!contract) {
            return res.status(404)
                .json({error: "Contract not found"})
        }

        await contract.destroy()
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}