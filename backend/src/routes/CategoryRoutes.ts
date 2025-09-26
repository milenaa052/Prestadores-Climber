import express from 'express'
import { createCategory, deleteCategory, getCategoryById, getCategory, updateCategory } from '../controllers/CategoryController.js'

const router = express.Router()

router.post("/Category-registration", createCategory)

router.get("/api/Category", getCategory)
router.get("/api/Category/:id", getCategoryById)
router.put("/api/Category/:id", updateCategory)
router.delete("/api/Category/:id", deleteCategory)

export default router