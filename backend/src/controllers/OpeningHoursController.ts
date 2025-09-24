import { Request, Response } from "express"
import OpeningHoursModel from "../models/OpeningHoursModel.js"

export const getOpeningHours = async (req: Request, res: Response) => {
    const hours = await OpeningHoursModel.findAll()
    return res.status(200).send(hours)
}

export const getOpeningHoursById = async (req: Request<{ id: string }>, res: Response) => {
    const hours = await OpeningHoursModel.findByPk(req.params.id)
    return res.status(200).json(hours)
}

export const createOpeningHour = async (req: Request, res: Response) => {
    try {
        const {
            providerId,
            weekDay,
            startTime,
            endTime
        } = req.body

        if (!providerId || !weekDay || !startTime || !endTime) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const hours = await OpeningHoursModel.create({
            providerId,
            weekDay,
            startTime,
            endTime
        })

        return res.status(201).json(hours)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updateOpeningHour = async (req: Request, res: Response) => {
    try {
        const {
            providerId,
            weekDay,
            startTime,
            endTime
        } = req.body

        if (!providerId || !weekDay || !startTime || !endTime) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const hours = await OpeningHoursModel.findByPk(req.params.id)

        if (!hours) {
            return res.status(404)
                .json({ error: "Opening hour not found" })
        }

        hours.providerId = providerId
        hours.weekDay = weekDay
        hours.startTime = startTime
        hours.endTime = endTime

        await hours.save()

        return res.status(200).json(hours)

    }catch(error){
        return res.status(500).json("Internal server error " + error)
    }
}

export const deleteOpeningHourById = async (req: Request<{ id: string}>, res: Response) => {  
    try {
        const hours = await OpeningHoursModel.findByPk(req.params.id)
        
        if(!hours) {
            return res.status(404)
                .json({error: "Opening hour found"})
        }

        await hours.destroy()
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}