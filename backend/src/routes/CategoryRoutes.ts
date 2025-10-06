import express from 'express'
import { createCategory, deleteCategory, getCategoryById, getCategory, updateCategory } from '../controllers/CategoryController.js'

const router = express.Router()

router.post("/category-registration", createCategory)

router.get("/categories", getCategory)
router.get("/category/:id", getCategoryById)
router.put("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)

export default router