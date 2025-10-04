import { Request, Response } from "express"
import ReviewModel from "../models/ReviewModel.js"

export const getReviews = async (req: Request, res: Response) => {
    const reviews = await ReviewModel.findAll();
    return res.status(200).json(reviews);
}  

export const getReviewById = async (req: Request<{ id: string }>, res: Response) => {
    const review = await ReviewModel.findByPk(req.params.id);
    return res.status(200).json(review);
}

export const createReview = async (req: Request, res: Response) => {
    try {
        const {
            contractId,
            serviceProviderReviewId,
            scoreProvider,
            depoimentProvider,
            clientReviewId,
            scoreClient,
            depoimentClient,
        } = req.body;

        if (!contractId || !serviceProviderReviewId || !scoreProvider || !depoimentProvider || !clientReviewId || !scoreClient || !depoimentClient) {
            return res.status(400)
                .json({ error: "All fields are required" })
        } 

        const review = await ReviewModel.create({
            contractId,
            serviceProviderReviewId,
            scoreProvider,
            depoimentProvider,
            clientReviewId,
            scoreClient,
            depoimentClient,
            status: "ACTIVE"
        });

        return res.status(201).json(review);

    } catch (error) { 
        return res.status(500).json("Internal server error " + error) } 
}

export const updateReview = async (req: Request<{ id: string }>, res: Response) => {  
    try {
        const {
            contractId,
            serviceProviderReviewId,
            scoreProvider,  
            depoimentProvider,
            clientReviewId,
            scoreClient,
            depoimentClient,
            status
        } = req.body;

        if (!contractId || !serviceProviderReviewId || !scoreProvider || !depoimentProvider || !clientReviewId || !scoreClient || !depoimentClient || !status) {
            return res.status(400)
                .json({ error: "All fields are requerid for update" })
        }

        const review = await ReviewModel.findByPk(req.params.id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" })
        }

        review.contractId = contractId;
        review.serviceProviderReviewId = serviceProviderReviewId;
        review.scoreProvider = scoreProvider;
        review.depoimentProvider = depoimentProvider;
        review.clientReviewId = clientReviewId;
        review.scoreClient = scoreClient;
        review.depoimentClient = depoimentClient;
        review.status = status;

        await review.save();

        return res.status(200).json(review)
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}
export const deleteReview = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const review = await ReviewModel.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" })
        }

        await review.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}