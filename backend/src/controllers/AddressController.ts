import { Request, Response } from "express"
import AddressModel from "../models/AddressModel.js"

export const getAddress = async (req: Request, res: Response) => {
    const address = await AddressModel.findAll()
    return res.status(200).send(address)
}

export const getAddressById = async (req: Request<{ id: string }>, res: Response) => {
    const address = await AddressModel.findByPk(req.params.id)
    return res.status(200).json(address)
}

export const createAdress = async (req: Request, res: Response) => {
    try {
        const {
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        } = req.body

        if (!cep || !state || !city || !neighborhood || !street || !number || !complement) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const address = await AddressModel.create({
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        })

        return res.status(201).json(address)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updateAdress = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const {
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        } = req.body

        if (!cep || !state || !city || !neighborhood || !street || !number || !complement) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const address = await AddressModel.findByPk(req.params.id)

        if(!address) {
            return res.status(404)
                .json({error: "Adress not found"})
        }

        address.cep = cep
        address.state = state
        address.city = city
        address.neighborhood = neighborhood
        address.street = street
        address.number = number
        address.complement = complement

        await address.save()

        return res.status(200).json(address)

    }catch(error){
        return res.status(500).json("Internal server error " + error)
    }
}

export const deleteAddressById = async (req: Request<{ id: string}>, res: Response) => {  
    try {
        const address = await AddressModel.findByPk(req.params.id)
        
        if(!address) {
            return res.status(404)
                .json({error: "Address not found"})
        }

        await address.destroy()
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}