import express from 'express'
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from '../controllers/ReviewController.js'

const router = express.Router()

router.post("/Review-registration", createReview)

router.get("/api/Review", getReviews)
router.get("/api/Review/:id", getReviewById)
router.put("/api/Review/:id", updateReview)
router.delete("/api/Review/:id", deleteReview)

export default router