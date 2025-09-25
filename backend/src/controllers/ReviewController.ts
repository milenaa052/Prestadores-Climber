import { Request, Response } from "express"
import ReviewModel from "../models/ReviweModel.js"

export const getReviews = async (req: Request, res: Response) => {
    const reviews = await ReviewModel.findAll()
    return res.status(200).json(reviews) 
}  

export const getReviewById = async (req: Request<{ id: string }>, res: Response) => {
    const review = await ReviewModel.findByPk(req.params.id)
    return res.status(200).json(review)
}

export const createReview = async (req: Request, res: Response) => {
    try {
        const {
            idReview,
            ContractId,
            ServiceProviderReviewId,
            ScoreProvider,
            DepoimentProvider,
            ClientReviewId,
            ScoreClient,
            DepoimentClient,
            Status
        } = req.body

        if ( !idReview ||!ContractId || !ServiceProviderReviewId || !ScoreProvider || !DepoimentProvider || !ClientReviewId || !ScoreClient || !DepoimentClient) {
            return res.status(400)
                .json({ error: "All fields are required" })
        } 

        const review = await ReviewModel.create({
            idReview,
            ContractId,
            ServiceProviderReviewId,
            ScoreProvider,
            DepoimentProvider,
            ClientReviewId,
            ScoreClient,
            DepoimentClient,
            Status: "ACTIVE"
        })
        return res.status(201).json(review)
    } catch (error) { 
        return res.status(500).json("Internal server error " + error) } 
}

export const updateReview = async (req: Request<{ id: string }>, res: Response) => {  
    try {
        const {
            idReview,
            ContractId,
            ServiceProviderReviewId,
            ScoreProvider,  
            DepoimentProvider,
            ClientReviewId,
            ScoreClient,
            DepoimentClient,
            Status
        } = req.body

        if ( !idReview ||!ContractId || !ServiceProviderReviewId || !ScoreProvider || !DepoimentProvider || !ClientReviewId || !ScoreClient || !DepoimentClient || !Status) {
            return res.status(400)
                .json({ error: "All fields are requerid for update" })
        }

        const review = await ReviewModel.findByPk(req.params.id)

        if (!review) {
            return res.status(404).json({ error: "Review not found" })
        }

        review.idReview = idReview
        review.ContractId = ContractId
        review.ServiceProviderReviewId = ServiceProviderReviewId
        review.ScoreProvider = ScoreProvider
        review.DepoimentProvider = DepoimentProvider
        review.ClientReviewId = ClientReviewId
        review.ScoreClient = ScoreClient
        review.DepoimentClient = DepoimentClient
        review.Status = Status

        await review.save()

        return res.status(200).json(review)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}
export const deleteReview = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const review = await ReviewModel.findByPk(req.params.id)
        if (!review) {
            return res.status(404).json({ error: "Review not found" })
        }
        await review.destroy()
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }

}