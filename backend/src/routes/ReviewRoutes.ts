import express from 'express'
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from '../controllers/ReviewController.js'

const router = express.Router()

router.post("/review-registration", createReview)

router.get("/reviews", getReviews)
router.get("/review/:id", getReviewById)
router.put("/review/:id", updateReview)
router.delete("/review/:id", deleteReview)

export default router