import express from "express"
import { createAdmin, getAdmin, getAdminById, updateAdmin } from "../controllers/AdminController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/admin-registration", createAdmin)

router.get("/admin", authMiddleware, getAdmin)
router.get("/admin/:id", authMiddleware, getAdminById)
router.put("/admin/:id", authMiddleware, updateAdmin)

export default router